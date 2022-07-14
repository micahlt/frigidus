import "dotenv/config";
import mysql from "mysql2/promise";

export default defineEventHandler((event) => {
  const q = useQuery(event);
  const main = async () => {
    const connection = await mysql.createConnection({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: "frigidus",
      ssl: { rejectUnauthorized: true },
    });
    if (parseInt(q.page)) {
      const [res] = await connection.query(
        `SELECT * FROM Stories ORDER BY Id DESC LIMIT 10 OFFSET ${Number(
          (q.page - 1) * 10
        )}`
      );
      return res;
    } else {
      return false;
    }
  };
  return main();
});
