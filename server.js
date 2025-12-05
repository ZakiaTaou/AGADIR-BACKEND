import express from "express";
import sequelize from "./src/config/database.js";
import "./src/models/Task.js";
import "./src/models/User.js";

import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js"

const app = express();
app.use(express.json());

const PORT = 6000;

app.use("/api/auth", authRoutes);
app.use('/api/tasks', taskRoutes);

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced successfully!"))
  .catch((err) => console.log("Error DB: ", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
