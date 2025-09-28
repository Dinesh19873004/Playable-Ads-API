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

// Models
db.User=UserModel(sequelize, DataTypes);
db.Project=ProjectModel(sequelize, DataTypes);

// Relations
db.User.hasMany(db.Project);
db.Project.belongsTo(db.User);
db.Analytics=AnalyticsModel(sequelize, Sequelize);

db.Project.hasMany(db.Analytics, {foreignKey: "projectId"});
db.Analytics.belongsTo(db.Project, {foreignKey: "projectId"});

db.sequelize=sequelize;
db.Sequelize=Sequelize;

export default db;
