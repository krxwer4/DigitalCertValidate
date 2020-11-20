const express = require("express");
const multer = require("multer");
const fs = require("fs");
const bdps = require("body-parser");
const app = express();

var getSslCertificate = require("get-ssl-certificate");
getCert = async () =>  {
  await getSslCertificate.get(req.body.link).then(function (certificate) {
    console.log(certificate);

    console.log(certificate.issuer);

    console.log(certificate.valid_from);

    console.log(certificate.valid_to);

    console.log(certificate.pemEncoded);
  });
}

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
  // res.send("<p>hello</p>");
});

app.post("/upload", upload.single("file"), function (req, res, next) {
  console.log("upload");
  // console.log(req.file, req.body);
  res.contentType("application/pdf");
  // let data = fs.createReadStream(path.join(__dirname, req.file.path), "utf8");
  // const jsonObject = JSON.parse(data);
  // res.json(data);
  // data.pipe(res);
  let fileContent = fs.readFileSync(path.join(__dirname, req.file.path));
  console.log(fileContent)
  res.send(fileContent);
});

app.post("/registweb", function (req, res) {
  try {
    console.log("Hello ");
    console.log(req.body.link);
    getCert();
  } catch (err) {
    console.log(err);
  }
});

app.listen(9876, function () {
  console.log("certificate-validate-server running on port 9876");
});
