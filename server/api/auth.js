import "dotenv/config";
export default defineEventHandler((event) => {
  const main = async () => {
    const password = event.req.headers["x-password"];
    if (process.env.ADMIN_PASSWORD === password) {
      return btoa(password);
    } else {
      return false;
    }
  };
  return main();
});
