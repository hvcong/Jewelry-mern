require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class AuthController {
  //[GET] /auth
  async index(req, res) {
    const userId = req.body.userId;

    if (!userId)
      return res.status(400).json({ success: false, message: "Token invalid" });

    try {
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      //all good
      return res.status(200).json({ success: true, message: "User is true" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // [POST] /auth/login
  async login(req, res) {
    let { username, password } = req.body;
    //simple validate
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing username or/and password" });
    }

    try {
      const user = await User.findOne({ username });
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "Username or password invalid" });

      //check password
      let check = await argon2.verify(user.password, password);
      if (!check)
        return res
          .status(400)
          .json({ success: false, message: "Username or password invalid" });

      //all good
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      user.password = undefined;

      return res
        .status(200)
        .json({
          success: true,
          message: "Login successfully",
          accessToken,
          user,
        });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // [POST] /auth/register
  async register(req, res) {
    let { username, password } = req.body;
    //simple validate
    if (!username || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Missing username or/and password",
          numError: 1,
        });
    }

    try {
      const user = await User.findOne({ username });
      if (user)
        return res
          .status(400)
          .json({
            success: false,
            message: "Username is already exists ",
            numError: 2,
          });

      //hash password
      const hashPassword = await argon2.hash(password);
      let newUser = new User({ username, password: hashPassword });

      if (!newUser)
        return res
          .status(400)
          .json({
            success: false,
            message: "Username or password invalid",
            numError: 3,
          });

      await newUser.save();

      // all good
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      newUser = newUser.toObject();
      delete newUser.password;

      return res
        .status(200)
        .json({
          success: true,
          message: "Create new user successfully",
          newUser,
          accessToken,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal server error",
          numError: 0,
        });
    }
  }

  // [GET] /auth/check
  async checkAccessToken(req, res) {
    const { userId } = req.body;

    try {
      const user = await User.findOne({ _id: userId }).select("-password");

      return res.status(200).json({ success: true, user });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // for admin

  // [GET] /users
  async getAllUser(req, res) {
    try {
      const users = await User.find({});
      //all good
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // [DELETE] /users/:id
  async deleteUser(req, res) {
    const id = req.params.id;

    try {
      await User.deleteOne({ _id: id });

      //all good
      return res
        .status(200)
        .json({ success: true, message: "Delete user successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new AuthController();
