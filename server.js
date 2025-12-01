import express from "express";
import sequelize from "./src/config/database.js";
import models from "./src/models/index.js";  // <<< مهم جدا

const app = express();
app.use(express.json());

const PORT = 6000;

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced successfully!"))
  .catch((err) => console.log("Error DB: ", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
