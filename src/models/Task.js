import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Task = sequelize.define("Task", {
  user_id: DataTypes.INTEGER,
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM("pending", "done"),
    defaultValue: "pending",
  },
  due_date: DataTypes.DATE,
});

User.hasMany(Task, {
  foreignKey: "user_id",
  as: "tasks",
  onDelete: "CASCADE",
});
Task.belongsTo(User, {
  foreignKey:"user_id",
  as: "user",
})

export default Task;
