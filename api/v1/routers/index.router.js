const taskRouter = require("./task.router");

module.exports = (app) => {

  const version = "/api/v1";

  app.use(`${version}/tasks`, taskRouter);
  
};
