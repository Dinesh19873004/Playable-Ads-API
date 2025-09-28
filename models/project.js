// models/project.js
export default (sequelize, DataTypes) => {
    const Project=sequelize.define("Project", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        userId: {   // 👈 important for associations
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Project;
};
