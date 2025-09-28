import {Sequelize, DataTypes} from "sequelize";
import dotenv from "dotenv";
import UserModel from "./user.js";
import ProjectModel from "./project.js";
import AnalyticsModel from "./analytics.js";

dotenv.config();

const sequelize=new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
});

const db={};

// Initialize models
db.User=UserModel(sequelize, DataTypes);
db.Project=ProjectModel(sequelize, DataTypes);
db.Analytics=AnalyticsModel(sequelize, DataTypes); // ✅ use DataTypes

// Associations

// User ↔ Project
db.User.hasMany(db.Project, {foreignKey: "userId"});
db.Project.belongsTo(db.User, {foreignKey: "userId"});

// Project ↔ Analytics
db.Project.hasMany(db.Analytics, {foreignKey: "projectId"});
db.Analytics.belongsTo(db.Project, {foreignKey: "projectId"});

// Attach sequelize instance and Sequelize class
db.sequelize=sequelize;
db.Sequelize=Sequelize;

export default db;
