const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const visitorRouter = require("./routes/visitorRoutes");

const app = express();

app.use(
  cors({
    origin: ["https://jeeva-madhaiyan.netlify.app"],
  })
);
app.use((req, res, next) => {
  req.header(
    "Access-Controll-Allow-Origin",
    "https://jeeva-madhaiyan.netlify.app"
  );
  res.header(
    "Access-Controll-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ),
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", visitorRouter);

module.exports = app;
