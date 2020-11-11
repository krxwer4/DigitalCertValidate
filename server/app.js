const express = require("express");
const multer = require("multer");
const fs = require("fs");
const bdps = require("body-parser");
const app = express();

app.use(bdps.json());
// app.use(
//   multer({
//     dest: __dirname + "/uploads/",
//     limits: {
//       fileSize: 100000,
//     },
//     onFileSizeLimit: function (file) {
//       console.log("Failed: " + file.originalname + " is limited");
//       fs.unlink(file.path);
//     },
//   })
// );

app.get("/", function (req, res) {
  // res.sendFile(__dirname + '/index.html')
  console.log("default path");
  res.send("<p>hello</p>");
});

app.post('/upload', function (req, res) {
  res.send(req.files)
})

app.listen(9876, function () {
  console.log("certificate-validate-server running on port 9876");
});
