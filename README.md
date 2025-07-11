# 📝 Coddy App

**Coddy App** is a secure document management platform where users can register, log in, reset their passwords, and create personal documents. Users can only view, update, or manage the documents they have created. It's a great starting point for a collaborative or personal knowledge base app.

---

## 🌐 Live URLs
- **Frontend API**: [https://coddy-app-1.onrender.com](https://coddy-app-1.onrender.com)  
 
- **Backend API**: [https://coddy-app-dl6q.onrender.com](https://coddy-app-dl6q.onrender.com)


- **Frontend Demo Video**: [Watch Demo](https://drive.google.com/file/d/1f7bvou6KWGF3BwiFvXMkXKzLFDLEIOwE/view?usp=sharing)  


> 📌 Replace the demo link with your actual video later.

---

## 🚀 Features

### 🔐 Authentication
- User **registration** and **login** with JWT.
- **Forgot Password** functionality: Sends a secure reset link to the registered email.
- **Reset Password**: The link contains a **valid token** and redirects to a reset form. Once the user enters a new password, it gets updated securely.

### 📄 Document Management
- Create a new document.
- View only **documents created by the logged-in user**.
- Update or modify **own documents** only.
- Data is protected by authentication middleware.

---

## 🧩 Tech Stack

- **Frontend**: React.js (replaceable with any SPA)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Email Service**: Nodemailer (Gmail-based)
- **Deployment**: Render for backend

---

## 🛠️ Getting Started

Follow these steps to run the project locally:

### 🔧 Prerequisites
- Node.js & npm
- MongoDB Atlas or local MongoDB server
- Git

### 🚀 Setup Instructions

1. **Clone the repository**

```bash frontend
git clone https://github.com/your-username/coddy-app.git
cd coddy-app
cd client/my-vue-app
npm install
npm run dev

```bash backend
git clone https://github.com/your-username/coddy-app.git
cd coddy-app
cd server
npm install
npm run dev

```
## Make sure Add .env file in ./server root
PORT=Portno
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173


