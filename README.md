# 🎬 Media Processing API (Node.js + PostgreSQL + BullMQ)

This project provides a backend API for:

- ✅ **User authentication** (register & login with JWT)  
- ✅ **Project & Asset management** (upload images/videos)  
- ✅ **Asynchronous rendering** with **BullMQ** + FFmpeg  
- ✅ **Analytics tracking** for project events (play, click, impression)  

Built with **Node.js**, **Express**, **Sequelize**, **PostgreSQL**, **BullMQ (Redis)**, and **FFmpeg**.  

---

## 🚀 Setup

1. **Install dependencies**
```bash
npm install

.env 
DATABASE_URL=postgres://user:password@localhost:5432/mydb
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379

await db.sequelize.sync();

node server.js


