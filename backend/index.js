import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js"
import authRoutes from "./routes/auth.js"
import warehouseRoutes from "./routes/warehouse.js"

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",async (req,res)=>{
   const result = await pool.query("SELECT current_database()");
   res.send(`Database name is : ${result.rows[0].current_database}`);
})

app.post("/optimize", (req, res) => {
  const payload = JSON.stringify(req.body);
  console.log("🔹 Incoming payload:", payload);

  const py = spawn("python", ["route_optimizer.py"]); // use "python3" if needed

  let result = "";
  let errorOutput = "";

  // Write JSON to stdin of Python
  py.stdin.write(payload);
  py.stdin.end();

  // Read stdout (Python's result)
  py.stdout.on("data", (data) => {
    result += data.toString();
  });

  // Capture stderr for debugging
  py.stderr.on("data", (data) => {
    errorOutput += data.toString();
    console.error("🔻 Python stderr:", data.toString());
  });

  // On process end, try to parse the result
  py.on("close", (code) => {
    if (code !== 0) {
      console.error(`Python process exited with code ${code}`);
      return res.status(500).send(`Python error: ${errorOutput}`);
    }

    try {
      const parsed = JSON.parse(result);
      console.log("✅ Python response:", parsed);
      res.json(parsed);
    } catch (err) {
      console.error("❌ JSON parse error:", err.message);
      console.error("🔸 Raw output:", result);
      res.status(500).send("Failed to parse Python response");
    }
  });
});


app.use('/api/auth', authRoutes);
app.use('/warehouse', warehouseRoutes);


app.listen(5001, () => {
  console.log("🚀 Server running on http://localhost:5001");
});
