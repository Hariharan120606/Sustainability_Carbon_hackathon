import express from "express";
const router = express.Router();
import pool from "../config/db.js";

//GET ALL THE WAREHOUSES
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM warehouses ORDER BY id");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ADD A WAREHOUSE
router.post("/addwarehouse", async (req, res) => {
  const {
    id,
    name,
    location,
    address,
    manager_id,
    size,
    energyEfficiency,
    waterUsage,
    wasteReduction,
    solarPanels,
    greenCertification,
    carbonFootprint,
    sustainabilityScore,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO warehouses (
        id, manager_id, name, location, address, size, energyEfficiency, waterUsage, wasteReduction, solarPanels,
        greenCertification, carbonFootprint, sustainabilityScore
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13
      ) RETURNING *`,
      [
        id,
        manager_id,
        name,
        location,
        address,
        size,
        energyEfficiency,
        waterUsage,
        wasteReduction,
        solarPanels,
        greenCertification,
        carbonFootprint,
        sustainabilityScore,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET A WAREHOUSE MANAGED BY A MANAGER
router.get("/manager/:manager_id", async (req, res) => {
  const managerId = req.params.manager_id;

  try {
    const result = await pool.query(
      `SELECT * FROM warehouses WHERE manager_id = $1 ORDER BY id`,
      [managerId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No warehouses found for this manager" });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE A WAREHOUSE BY ID
router.delete("/deletewarehouse/:id", async (req, res) => {
  const warehouseId = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM warehouses WHERE id = $1 RETURNING *",
      [warehouseId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Warehouse not found" });
    }

    res
      .status(200)
      .json({ message: "Warehouse deleted", warehouse: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
