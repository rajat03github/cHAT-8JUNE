const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database");
const app = express();
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB(); //database mongoDB
app.use(cors());
app.use(express.json()); //allow server to access the sent data

//rOUTER
app.use("/api/auth", userRoutes); //after /api/auth/ will be in userRoutes

//Creating server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Sever is Connected with ${PORT}`);
});
