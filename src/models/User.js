import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Task from "./Task.js";

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
});

User.hasMany(Task, {
  foreignKey: "userId",
  as: "tasks",
  onDelete: "CASCADE",
});

export default User;
