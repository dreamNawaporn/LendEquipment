// models/borrow.js
const { DataTypes } = require("sequelize");
const sequelize = require("../util/db");
const User = require("./User.model"); // ให้แน่ใจว่าไฟล์ต้นฉบับถูกนำเข้า

const Borrow = sequelize.define(
  "borrows",
  {
    BorrowID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    BorrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ReturnDate: {
      type: DataTypes.DATE,
    },
    Status: {
      type: DataTypes.ENUM("ยืม", "คืนแล้ว"),
      allowNull: false,
      defaultValue: "ยืม",
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    EquipmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "equipment", // ให้แน่ใจว่าไฟล์ต้นฉบับถูกนำเข้า
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Borrow;
