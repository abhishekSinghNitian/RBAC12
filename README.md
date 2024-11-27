# Role-Based Access Control (RBAC) Project

This is a full-stack Role-Based Access Control (RBAC) application, built to manage users and roles with proper access rights. The project is divided into two parts: the **frontend** and the **backend**. 

The frontend is developed using **React**, while the backend is built with **Node.js** and **Express**, using **MongoDB** as the database.

---

## Features
- User Authentication and Authorization
- Admin Panel for managing users and roles
- Secure storage of sensitive information using environment variables
- Role-based access control for specific resources and actions

---

## Prerequisites
Ensure you have the following installed on your system:
- Node.js
- npm or yarn
- MongoDB instance (local or cloud)

---

## Project Structure

##Backend setup
cd backend
npm install
PORT=5000
MONGODB_URI=your-mongodb-uri
SECRET_KEY=your-secret-key
npm start

##Frontend Setup
cd client
npm install
npm run dev
Admin Credentials

Use the following credentials to log in as an Admin:

    Email: abhishek123@gmail.com
    Password: 12345

Environment Variables

The .env file should include:

    PORT: The port for the backend server.
    MONGODB_URI: Connection string for the MongoDB database.
    SECRET_KEY: Secret key for token encryption.

Technologies Used

    Frontend: React, Vite
    Backend: Node.js, Express
    Database: MongoDB
    Authentication: JSON Web Tokens (JWT)



