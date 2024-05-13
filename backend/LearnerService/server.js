const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { success, error } = require("consola");

const { MONGO_URI, PORT } = require("./config/index");

//export routes
const enrollRoutes = require("./routes/enrollment");

const app = express();
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/enroll/", enrollRoutes);

//connecting to DB and starting server
const startApp = async () => {
  try {
    await mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        app.listen(PORT, () => {
          success({
            message: `Successfully connected to database and server running on ${PORT}`,
            badge: true,
          });
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  } catch (error) {
    error({ message: `Error connecting to database: ${error.message}` });
  }
};

startApp();
