import express from "express";
const router = express.Router();
import pool from "../config/db.js";


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM product ORDER BY product_id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ POST add new product
router.post('/addproduct', async (req, res) => {
  const {
    product_id, name, category, brand, price,
    quantity, manufacture_date,
    expiry_date, warehouse_id
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO product 
      (product_id, name, category, brand, price, quantity, manufacture_date, expiry_date, warehouse_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [product_id, name, category, brand, price, quantity, manufacture_date, expiry_date, warehouse_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ GET products by warehouse ID
router.get('/:warehouseId', async (req, res) => {
  const { warehouseId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM product WHERE warehouse_id = $1',
      [warehouseId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products by warehouse:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ DELETE a product by ID
router.delete('/deleteproduct/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM product WHERE product_id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted', id });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ PUT update product (price or quantity or both)
router.put('/updateproduct/:id', async (req, res) => {
  const { id } = req.params;
  const { price, quantity } = req.body;

  try {
    const result = await pool.query(
      `UPDATE Product SET 
        price = COALESCE($1, price),
        quantity = COALESCE($2, quantity)
      WHERE product_id = $3
      RETURNING *`,
      [price, quantity, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
