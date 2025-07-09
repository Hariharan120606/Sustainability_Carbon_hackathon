import pkg from "pg"
import dotenv from "dotenv"
const {Pool} = pkg;
dotenv.config({ path: "../src/.env" });

console.log(process.env.DB_HOST);

const pool = new Pool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_DATABASE_INVENTORY,
    password : process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
})

pool.connect()
  .then(client => {
    console.log("✅ Initial database connection established");
    client.release(); // Important: release the client back to the pool
  })
  .catch(err => {
    console.error("❌ Failed to connect to the database:", err.message);
  });


export default pool;