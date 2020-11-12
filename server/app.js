const express = require("express");
const multer = require("multer");
const fs = require("fs");
const bdps = require("body-parser");
const app = express();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
const path = require("path");

app.use(bdps.json());

app.get("/", function (req, res) {
  // res.sendFile(__dirname + '/index.html')
  console.log("default path");
  res.send("<p>hello</p>");
});

// app.post('/upload', function (req, res) {
//   res.send(req.files)
// })

app.post("/upload", upload.single("file"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log("upload");
  console.log(req.file, req.body);
  let data = fs.createReadStream(path.join(__dirname, req.file.path), "utf8");
  // const jsonObject = JSON.parse(data);
  res.json(data);
});

app.listen(9876, function () {
  console.log("certificate-validate-server running on port 9876");
});
