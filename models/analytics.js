// models/analytics.js
export default (sequelize, DataTypes) => {
    const Analytics=sequelize.define("Analytics", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        eventType: {
            type: DataTypes.ENUM("play", "click", "impression"),
            allowNull: false,
        },
    });
    return Analytics;
};
