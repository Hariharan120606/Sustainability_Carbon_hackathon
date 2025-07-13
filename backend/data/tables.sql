CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  userid VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Product (
    product_id INT PRIMARY KEY,      
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    brand VARCHAR(50),
    price DECIMAL(12, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity >= 0),    
    manufacture_date DATE,
    expiry_date DATE,
    warehouse_id INT NOT NULL,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);