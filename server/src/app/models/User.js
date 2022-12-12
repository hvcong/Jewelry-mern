const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "admin",
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//plugins

module.exports = mongoose.model("users", UserSchema);
