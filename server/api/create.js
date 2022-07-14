import "dotenv/config";
import mysql from "mysql2/promise";

export default defineEventHandler((event) => {
  const query = useQuery(event);
  const main = async () => {
    const connection = await mysql.createConnection({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: "frigidus",
      ssl: { rejectUnauthorized: true },
    });
    if (
      query.name &&
      query.url &&
      atob(event.req.headers["x-token"]) == process.env.ADMIN_PASSWORD
    ) {
      await connection.execute(
        `INSERT INTO Stories (Id, Name, Url, DateAdded) VALUES (NULL, "${decodeURIComponent(
          query.name
        )}", "${decodeURIComponent(query.url)}", "${new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}")`
      );
      return true;
    } else {
      return false;
    }
  };
  return main();
});
