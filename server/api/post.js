import "dotenv/config";
import og from "opengraph-fetcher";
import { Wasteof2Auth } from "wasteof-client";
export default defineEventHandler((event) => {
  const main = async () => {
    const query = useQuery(event);
    let wasteof = new Wasteof2Auth("frigidus", process.env.WASTEOF_PASSWORD);
    if (
      query.name &&
      query.url &&
      atob(event.req.headers["x-token"]) == process.env.ADMIN_PASSWORD
    ) {
      await og.fetch(query.url, (g) => {
        wasteof.login().then(async () => {
          await wasteof.post(
            `Check out this new article on Frigidus, your tech news aggregate: ${
              query.title
            }<br>${g.description ? g.description : ""}`,
            null
          );
        });
      });
    }
    return true;
  };
  return main();
});
