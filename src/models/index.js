import User from "./User.js";
import Task from "./Task.js";

const models = { User, Task };

// run associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export default models;
