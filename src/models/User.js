import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

// Association (ghadi t3ayet 3liha mn models/index.js)
User.associate = (models) => {
  User.hasMany(models.Task, {
    foreignKey: "userId",
    as: "tasks",
    onDelete: "CASCADE",
  });
};

export default User;
