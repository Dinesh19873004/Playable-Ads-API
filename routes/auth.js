import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../models/index.js";

dotenv.config();
const router=express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
        const {email, password}=req.body;

        // Check if user exists
        const existingUser=await db.User.findOne({where: {email}});
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const user=await db.User.create({email, password});
        res.json({message: "User registered successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const {email, password}=req.body;

        const user=await db.User.findOne({where: {email}});
        if (!user) return res.status(400).json({message: "User not found"});

        const isMatch=await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Invalid password"});

        const token=jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.json({message: "Login successfull", token});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

export default router;
