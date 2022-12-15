const startDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const express = require("express");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { send } = require("express/lib/response");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

//configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail server: " + config.get("mail.host"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startDebugger("morgan enabled");
}

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port} ...`);
});
