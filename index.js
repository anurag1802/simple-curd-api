const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const productRoute = require("./routes/product.route.js");

const port = process.env.PORT;
const mongodbPass = process.env.MONGODBPASS;

//middleware used to add json and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Welcome to api tutorials");
});

//first connect to database and then run the port if successfully connected to db
mongoose
  .connect(
    `mongodb+srv://anuragrmohanty:${mongodbPass}@backend-react-curd-api.1guyksz.mongodb.net/Node-API?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
    //listen to the port and make it run
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((e) => {
    console.log("Error connecting into database", e);
  });
