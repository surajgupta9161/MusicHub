# 🎵 MusicHub

MusicHub is a full-stack MERN CRUD web application where users can create an account, log in, and upload video content similar to Instagram (video-only platform). The project is currently under active development with role-based access control features being implemented.

---

## 🚀 Features

- 🔐 User Registration & Login
- 🎥 Video Upload (Available for all authenticated users)
- 📂 Fetch All Uploaded Videos
- 🌐 Global State Management using Context API
- 🔒 Protected Routes using JWT
- 🎨 Responsive UI with Tailwind CSS
- 🚧 Role-Based Access Control (Artist / User) – In Progress
- 🚧 Update & Delete features – In Progress

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security
- JSON Web Token (JWT)
- Role-Based Access Control (RBAC) – In Development

---

## 📡 API Routes

### 🔐 Authentication Routes
POST /api/auth/register  
POST /api/auth/login  

### 🎵 Music Routes
POST /api/auth/createmusic  
GET /api/auth/getMusics  

🚧 Under Development:
PUT /api/auth/updatemusic/:id  
DELETE /api/auth/deletemusic/:id  

---

## 📁 Project Structure

MusicHub  
│  
├── backend  
│   ├── src  
│   │   ├── controllers  
│   │   ├── models  
│   │   ├── routes  
│   │   ├── middleware  
│   │   └── services  
│   │  
│   ├── server.js  
│   └── .env  
│  
├── frontend  
│   ├── src  
│   │   ├── components  
│   │   ├── context  
│   │   ├── services  
│   │   ├── App.jsx  
│   │   └── main.jsx  
│   │  
│   └── .env  
│  
└── README.md  

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository

git clone https://github.com/surajgupta9161/MusicHub.git  

---

### 2️⃣ Backend Setup

cd backend  
npm install  

Create `.env` file inside backend folder:

PORT=3000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

Run backend server:

nodemon server.js  

---

### 3️⃣ Frontend Setup

cd frontend  
npm install  

Run frontend development server:

npm run dev  

---

## 🔒 Authentication Flow

- Users can register and log in.
- JWT token is generated after login.
- Context API manages authentication state globally.
- Protected routes verify token before allowing video upload.

---

## 🚧 Project Status

This project is under active development.

- Role-Based Access Control (Artist/User) is being implemented.
- Update and Delete functionalities are in progress.

---

## 👨‍💻 Author

Suraj Gupta  
GitHub: https://github.com/surajgupta9161  

---

⭐ If you like this project, consider giving it a star!
