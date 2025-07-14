# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Sustainability Carbon Hackathon

A full‑stack application made to monitor, visualize, and optimize carbon emissions across warehouse logistics. Built as part of the Walmart‑sponsored hackathon, this project features:

- **User Authentication** (JWT + Express)
- **Warehouse & Product Management** (PostgreSQL)
- **Route Optimization** (Python script)
- **Interactive Maps & Charts** (React + Leaflet + Google Maps + Chart.js)
- **Real‑time Carbon Emission Dashboard** (Redux + Chart.js)

---

## 🚀 Table of Contents

1. [Demo](#-demo)  
2. [Tech Stack](#-tech-stack)  
3. [Features](#-features)  
4. [Architecture](#-architecture)  
5. [Getting Started](#-getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Environment Variables](#environment-variables)  
   - [Installation & Running](#installation--running)  
6. [Project Structure](#-project-structure)  
7. [Available Scripts](#-available-scripts)  
8. [Contributing](#-contributing)  
9. [License](#-license)  

---

## 🎬 Demo

![Dashboard Screenshot](./public/screenshot-carbon-dashboard.png)  
*(Replace with your own screenshot)*

---

## 🛠 Tech Stack

- **Frontend**: React, Redux Toolkit, React Router, Tailwind CSS, Chart.js, Recharts, React‑Leaflet, @react-google-maps/api  
- **Backend**: Node.js, Express, PostgreSQL (`pg`), Mongoose (for any NoSQL extensions), JWT, Bcrypt  
- **Route Optimization**: Python (optimizer.py using Dijkstra’s or custom logic)  
- **Utilities**: Axios, CORS, Dotenv, Express‑Validator  

---

## ⭐ Features

- **User Management**  
  - Register, Login, Profile & Password Update (JWT protected)  
- **Warehouse & Product APIs**  
  - CRUD operations for warehouses & products via RESTful endpoints  
- **Route Optimization**  
  - Send `start` & `end` coordinates → returns optimized path & estimated carbon savings  
- **Interactive Map**  
  - Visualize warehouses & optimized route on Leaflet + Google Maps overlay  
- **Carbon Emission Dashboard**  
  - Total & average emissions, facility‑level metrics, interactive bar charts  
- **Statistics & Reporting**  
  - Recharts for time‑series and distribution charts  
- **Responsive UI**  
  - Mobile & desktop friendly layouts  

---

## 🏗 Architecture



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
