import "dotenv/config";
import mysql from "mysql2/promise";
import ogs from "open-graph-scraper";
import { Wasteof2Auth } from "wasteof-client";

export default defineEventHandler((event) => {
  const query = useQuery(event);
  const main = async () => {
    if (
      query.name &&
      query.url &&
      atob(event.req.headers["x-token"]) == process.env.ADMIN_PASSWORD
    ) {
      const connection = await mysql.createConnection({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: "frigidus",
        ssl: { rejectUnauthorized: true },
      });
      const wasteof = new Wasteof2Auth(
        "frigidus",
        process.env.WASTEOF_PASSWORD
      );
      const linkData = await ogs({ url: query.url }).then(
        (data) => data.result
      );
      await wasteof.login();
      await wasteof.post(
        `<p>Check out this new article on Frigidus, your tech news aggregate: <b>${
          query.name
        }</b></p><p><em>${
          (await linkData.ogDescription) ? await linkData.ogDescription : ""
        }</em></p><p>Read more on frigidus.micahlindley.com</p>`,
        null
      );
      const db = await connection.execute(
        `INSERT INTO Stories (Id, Name, Url, DateAdded) VALUES (NULL, "${decodeURIComponent(
          query.name
        )}", "${decodeURIComponent(query.url)}", "${new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}")`
      );
      return [await db, await linkData];
    } else {
      return false;
    }
  };
  return main();
});
