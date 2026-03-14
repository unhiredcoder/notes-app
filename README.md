# 📝 Multi-User Notes App

A full‑stack note‑taking application where users can securely register, log in, and manage their personal notes.  
Built with **Express.js** + **MongoDB** on the backend, **React** + **Vite** on the frontend, and styled with **TailwindCSS**.  
Features JWT authentication, password hashing, and full CRUD operations for notes.

---

## ✨ Features

- ✅ **User Authentication** – Register and login with email/password (passwords hashed with bcrypt)
- 🔐 **JWT Tokens** – Secure, token‑based session management (stored in localStorage)
- 📒 **Personal Notes** – Create, read, update, and delete notes – each user sees only their own notes
- 🎨 **Modern UI** – Clean, responsive design with TailwindCSS and Lucide icons
- ⚡ **Fast Development** – Vite for frontend, Express with nodemon for backend
- 📱 **Mobile Friendly** – Fully responsive layout

---

## 🛠️ Tech Stack

**Frontend**  
- React (with hooks) + Vite  
- React Router v6  
- TailwindCSS  
- Axios  
- Lucide React (icons)

**Backend**  
- Node.js + Express  
- MongoDB + Mongoose  
- JSON Web Token (JWT)  
- bcrypt  
- CORS  

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- Git

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/unhiredcoder/notes-app.git
cd notes-app
```

#### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/notes-app
JWT_SECRET=your_super_secret_key_change_this
```

Start the backend server:
```bash
npm run dev   # runs on http://localhost:5000
```

#### 3. Frontend setup

Open a new terminal:
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend dev server:
```bash
npm run dev   # runs on http://localhost:3000
```

Now open http://localhost:3000 in your browser.

---

## 🔐 Environment Variables

**Backend `.env`**

| Variable | Description | Example |
|---|---|---|
| PORT | Port the backend listens on | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/notes-app |
| JWT_SECRET | Secret key for signing JWT tokens | mySuperSecretKey |

**Frontend `.env`**

| Variable | Description | Example |
|---|---|---|
| VITE_API_URL | Base URL of the backend API | http://localhost:5000/api |

---

## 📁 Folder Structure
```text
multi-user-notes-app/
├── backend/
│   ├── controllers/        # Route handlers (auth, notes)
│   ├── middleware/         # JWT verification
│   ├── models/             # Mongoose models (User, Note)
│   ├── routes/             # Express routes
│   ├── db.js               # Database connection
│   ├── server.js           # Entry point
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/      # Navbar, NoteCard, NoteForm
    │   ├── pages/           # Login, Register, Dashboard
    │   ├── utils/           # Axios instance (api.js)
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css        # Tailwind imports
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## 📡 API Endpoints (Backend)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /api/auth/register | Register a new user | ❌ |
| POST | /api/auth/login | Login and receive JWT | ❌ |
| GET | /api/notes | Get all notes of logged‑in user | ✅ |
| POST | /api/notes | Create a new note | ✅ |
| PUT | /api/notes/:id | Update a note | ✅ |
| DELETE | /api/notes/:id | Delete a note | ✅ |

All protected endpoints require the `Authorization: Bearer <token>` header.
