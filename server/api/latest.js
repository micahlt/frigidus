import "dotenv/config";
import mysql from "mysql2/promise";

export default defineEventHandler((event) => {
  const main = async () => {
    const connection = await mysql.createConnection({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: "frigidus",
      ssl: { rejectUnauthorized: true },
    });
    const [res] = await connection.query("SELECT * FROM Stories");
    return res;
  };
  return main();
});
