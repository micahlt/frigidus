import og from "opengraph-fetcher";
export default defineEventHandler((event) => {
  const main = async () => {
    const query = useQuery(event);
    const res = await og.fetch(query.url, (g) => {
      return g;
    });
    return res;
  };
  return main();
});
