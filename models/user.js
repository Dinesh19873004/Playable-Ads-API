const bcrypt=require('bcryptjs');

module.exports=(sequelize, DataTypes) => {
    const User=sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Hash password before saving
    User.beforeCreate(async (user) => {
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(user.password, salt);
    });

    return User;
};
