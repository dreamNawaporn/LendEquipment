// models/equipment.js
const { DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const Equipment = sequelize.define(
  "equipment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ใช้งานได้", "ซ่อม", "เปลี่ยนอุปกรณ์"),
      allowNull: false,
      defaultValue: "ใช้งานได้",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Equipment;
