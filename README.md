# 🔐 SecureVault - MERN Stack Password Manager

A secure Password Manager built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). SecureVault allows users to register, log in, and safely manage their passwords with JWT-based authentication.

---

## 🚀 Features

- 🔑 User Registration
- 🔐 User Login
- 🔒 JWT Authentication
- 🛡️ Protected Routes
- ➕ Add Password
- 👀 View Saved Passwords
- ✏️ Edit Password
- 🗑️ Delete Password
- 🔍 Search Passwords
- 📋 Copy Password to Clipboard
- 👁️ Show / Hide Password
- 🚪 Logout

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- React Hot Toast
- React Icons
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt.js

---

## 📂 Project Structure

```
SecureVault/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/pawanbisht6201/Secure-Vault.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

---

## 📸 Screenshots

Add screenshots of:

- Login Page
- Register Page
- Dashboard
- Add Password
- Edit Password
- Search Password

---

## 📈 Future Improvements

- Password Generator
- Password Encryption
- Responsive UI
- Dark / Light Theme
- Dashboard Statistics
- Deployment on Vercel & Render

---

## 👨‍💻 Author

**Pawan Bisht**

B.Tech CSE (Pre-Final Year)

GitHub: https://github.com/pawanbisht6201

---

## ⭐ If you like this project, give it a Star!
