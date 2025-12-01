import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Task = sequelize.define(
  "Task",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    status: {
      type: DataTypes.ENUM("pending", "done"),
      defaultValue: "pending",
    },

    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {}
);

// Association
Task.associate = (models) => {
  Task.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
};

export default Task;
