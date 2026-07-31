# 🎵 MusicHub

MusicHub is a **full-stack MERN Role-Based Music Streaming Platform** where **Artists** can upload, edit, and delete their own music/videos, while **Users** can securely browse and watch uploaded content.

The application uses **JWT Authentication**, **Role-Based Authorization**, **MongoDB**, and a **responsive React frontend** to provide a secure and smooth user experience.

---

## 🚀 Features

- 🔐 User Registration & Login
- 🎭 Role-Based Access Control (Artist / User)
- 🎥 Artists can Upload Music/Videos
- ✏️ Artists can Edit their own uploaded content
- 🗑️ Artists can Delete their own uploaded content
- 👀 Users can Browse & Watch Videos
- 📂 Fetch All Uploaded Videos
- 🌐 Global State Management using Context API
- 🔒 Protected Routes using JWT Authentication
- 🎨 Responsive UI built with Tailwind CSS
- ⚡ Improved UI & Better User Experience

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
- Role-Based Access Control (RBAC)
- Protected Routes
- Authorization for Edit & Delete Operations

### Media Storage

- ImageKit

---

## 📡 API Routes

### 🔐 Authentication

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/getuser
```

### 🎵 Music

```
POST   /api/auth/music
GET    /api/auth/allMusic
PATCH  /api/auth/editMusic/:id
DELETE /api/auth/deleteMusic/:id
```

---

## 📁 Project Structure

```
MusicHub
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── DB
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── services
│   │
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── Assets
│   │   ├── Components
│   │   ├── Context
│   │   ├── Utils
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── README.md
```

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/surajgupta9161/MusicHub.git
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend server.

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔒 Authentication Flow

- Users can register and log in securely.
- JWT tokens are generated after successful login.
- Context API manages authentication state globally.
- Protected routes verify authentication before allowing access.
- Artists can upload, edit, and delete only their own music/videos.
- Users can browse and watch uploaded content.

---

## 🚀 Latest Updates

- ✅ Added **Edit Music** functionality for artists.
- ✅ Added **Delete Music** functionality with proper authorization.
- ✅ Improved the overall UI for a cleaner and smoother experience.
- ✅ Enhanced CRUD workflow and user interactions.
- ✅ Better authorization and protected API handling.

---

## 🌐 Live Demo

**Live Website:**  
https://musichub-2.onrender.com/

**GitHub Repository:**  
https://github.com/surajgupta9161/MusicHub

---

## 👨‍💻 Author

**Suraj Gupta**

GitHub: https://github.com/surajgupta9161

---

⭐ If you like this project, don't forget to **Star** the repository!
