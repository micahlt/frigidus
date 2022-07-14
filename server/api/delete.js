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
      query.id &&
      parseInt(query?.id) &&
      atob(event.req.headers["x-token"]) == process.env.ADMIN_PASSWORD
    ) {
      await connection.execute(`DELETE FROM Stories WHERE Id=${query.id}`);
      return true;
    } else {
      return false;
    }
  };
  return main();
});
