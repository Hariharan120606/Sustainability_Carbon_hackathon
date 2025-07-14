Sustainability Carbon Hackathon

A full‑stack application to monitor, visualize, and optimize carbon emissions across warehouse logistics. Built for the Walmart‑sponsored hackathon.

🚀 Table of Contents

Tech Stack

Features

Architecture

Getting Started

Prerequisites

Environment Variables

Installation & Running

Project Structure

Scripts

Contributing

License

🛠 Tech Stack

Frontend: React, Redux Toolkit, React Router, Tailwind CSS, Chart.js, Recharts, React‑Leaflet, @react-google-maps/api

Backend: Node.js, Express, PostgreSQL (pg), JWT, Bcrypt

Route Optimization: Python (optimizer.py with Dijkstra’s algorithm or custom logic)

Utilities: Axios, CORS, Dotenv, Express‑Validator

⭐ Features

User Authentication: JWT-based register, login, profile, password update

Warehouse & Product Management: CRUD APIs for warehouses and products

Route Optimization: Calculate optimized routes and estimate carbon savings

Interactive Map: Visualize warehouses and routes on Leaflet + Google Maps

Carbon Emission Dashboard: Real-time metrics, facility-level insights, interactive charts

Responsive Design: Mobile and desktop layouts with Tailwind CSS

🏗 Architecture

[React Frontend] ←─ HTTP/Axios ─→ [Express API] ←─ PostgreSQL ─→ [Database]
                             ↓
                      [Python Optimizer]

Frontend: runs on http://localhost:3000

Backend: runs on http://localhost:5001

Optimizer: invoked via Node.js child_process.exec

🏁 Getting Started

Prerequisites

Node.js v18+

Python 3.8+

PostgreSQL server

Environment Variables

Create a .env file in the backend/ directory:

DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inventory_db
JWT_SECRET=your_jwt_secret

Installation & Running

Clone the repo



git clone https://github.com/Shivam2005Goel/Sustainability_Carbon_hackathon.git
cd Sustainability_Carbon_hackathon


2. **Backend setup**
   ```bash
cd backend
npm install
# (Optional) install Python deps: pip install networkx
npm start  # starts API on port 5001

Frontend setup



cd ../
npm install
npm start  # opens http://localhost:3000


---

## 📂 Project Structure


/├─ backend/                # Express API
│   ├─ config/db.js        # Postgres pool setup
│   ├─ routes/             # Route definitions
│   ├─ controllers/        # Business logic
│   ├─ middleware/         # Auth, validations
│   ├─ optimizer.py        # Route optimization script
│   └─ index.js            # Server entrypoint
│
├─ public/                 # Static assets
│
├─ src/                    # React app
│   ├─ components/         # UI components
│   ├─ features/           # Redux slices & thunks
│   ├─ App.js              # Root component
│   └─ index.js            # Client entrypoint
│
├─ package.json            # Frontend dependencies & scripts
├─ backend/package.json     # Backend dependencies & scripts
└─ README.md               # Project documentation


---

## ⚙️ Scripts

| Script           | Location  | Description                                    |
| ---------------- | --------- | ---------------------------------------------- |
| `npm start`      | `/`       | Starts frontend dev server (port 3000)         |
| `npm run build`  | `/`       | Builds frontend for production (in `/build`)   |
| `npm test`       | `/`       | Runs frontend tests                            |
| `npm start`      | `backend/`| Starts Express API (port 5001)                 |

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m "Add YourFeature"`)
4. Push (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
