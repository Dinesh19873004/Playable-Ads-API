# 🎬 Media Processing API (Node.js + PostgreSQL + BullMQ)

This project provides a backend API for:

- ✅ **User authentication** (register & login with JWT)  
- ✅ **Project & Asset management** (upload images/videos)  
- ✅ **Asynchronous rendering** with **BullMQ** + FFmpeg  
- ✅ **Analytics tracking** for project events (play, click, impression)  

Built with **Node.js**, **Express**, **Sequelize**, **PostgreSQL**, **BullMQ (Redis)**, and **FFmpeg**.  

---

🛠️ Tech Stack

Node.js + Express

PostgreSQL + Sequelize

Redis + BullMQ

FFmpeg (via execa or @ffmpeg/ffmpeg)

JWT Authentication

Multer for file uploads

✨ That’s it! You now have a full backend for auth, uploads, rendering, job tracking, and analytics.

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


start worker 
node worker/renderWorker.js

POST /auth/register
Request

{
  "email": "user@example.com",
  "password": "Password123"
}

response 


{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}

/auth/login

{
  "email": "user@example.com",
  "password": "Password123"
}


{
  "token": "jwt.token.value"
}


/projects

authorization jwt token of user

{
    "title": "second Add agency for Dinesh",
    "description": "second description agency for Dinesh"
}

{
    "id": 1,
    "title": "second Add agency for Dinesh",
    "description": "second description agency for Dinesh",
    "userId": 1,
    "updatedAt": "2025-09-28T11:49:54.416Z",
    "createdAt": "2025-09-28T11:49:54.416Z"
}

Upload Asset

POST /projects/:id/assets

Requires JWT token

Accepts multipart/form-data with field: asset

{
  "message": "File uploaded",
  "path": "uploads/1758989738392.png"
}


🎥 Rendering (Async Jobs)
Enqueue Render Job

POST /projects/:id/render

{
  "message": "Render job enqueued",
  "jobId": "f84a2c4c-1a23-4e98-b3d5-04c97e2c1f10",
  "inputFile": "uploads/1758989738392.png",
  "outputFile": "outputs/1758989986070-rendered.mp4"
}


Check Job Status

GET /jobs/:id

Response (examples)

⏳ Waiting:

{
  "id": "f84a2c4c-1a23-4e98-b3d5-04c97e2c1f10",
  "state": "waiting",
  "progress": 0,
  "result": null,
  "failedReason": null
}


✅ Completed:

{
  "id": "f84a2c4c-1a23-4e98-b3d5-04c97e2c1f10",
  "state": "completed",
  "progress": 100,
  "result": "outputs/1758989986070-rendered.mp4",
  "failedReason": null
}


❌ Failed:

{
  "id": "f84a2c4c-1a23-4e98-b3d5-04c97e2c1f10",
  "state": "failed",
  "progress": 0,
  "result": null,
  "failedReason": "Error message"
}


📊 Analytics
Log Event

POST /analytics

Request

{
  "projectId": 1,
  "eventType": "play"
}


(eventType must be one of: play, click, impression)

Response

{
  "message": "Event recorded",
  "event": {
    "id": "c1b13f20-3a21-4d32-92f3-2f0c2a47bb1b",
    "projectId": 1,
    "eventType": "play",
    "createdAt": "2025-09-27T11:00:00.123Z"
  }
}







