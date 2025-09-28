import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./models/index.js";

import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/project.js";
import assetRoutes from "./routes/assets.js";
import renderRoutes from "./routes/render.js";
import jobsRouter from "./routes/jobs.js";
import analyticsRouter from "./routes/analytics.js";



dotenv.config();
const app=express();
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/", assetRoutes);
app.use("/", renderRoutes);
app.use("/jobs", jobsRouter);
app.use("/analytics", analyticsRouter);

const startServer=async () => {
    try {
        await db.sequelize.authenticate();
        console.log("Database connected...");
        await db.sequelize.sync({alter: true});
        console.log("Tables synced successfully");

        app.listen(process.env.PORT||5000, () => {
            console.log(`Server running on port ${process.env.PORT||5000}`);
        });
    } catch (err) {
        console.error("Unable to connect to DB:", err);
    }
};

startServer();
