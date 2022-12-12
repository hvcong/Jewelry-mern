const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

async function connect() {
  console.log(process.env.DB_USERNAME);
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-jewelry.8pe2v.mongodb.net/mern-jewelry?retryWrites=true&w=majority`,
      {
        // useCreateIndex: true,
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
      }
    );
    console.log("Connect DB successfully!!");
  } catch (error) {
    console.log("Connect DB failed!!", error);
    process.exit(1);
  }
}

module.exports = { connect };
