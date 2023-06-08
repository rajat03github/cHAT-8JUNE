const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`Mongo DB Connected with ${process.env.MONGO_URI}`);
  } catch (error) {
    console.log(`ERROR : ${error.message} `);
  }
};

module.exports = connectDB;
