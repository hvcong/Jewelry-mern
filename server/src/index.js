const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const db = require("./configs/db");
const router = require("./routes");
const methodOverride = require("method-override");
const cors = require("cors");

db.connect();

app.use(cors());

//static files
app.use(express.static("public"));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// dùng các midleware để parse body cho resquest gửi lên sever
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

router(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App listening at: http://localhost:" + port);
});
