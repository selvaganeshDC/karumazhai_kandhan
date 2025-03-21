// models/User.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require('bcryptjs');

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "users",
    timestamps: true,
});

User.prototype.validPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = User;