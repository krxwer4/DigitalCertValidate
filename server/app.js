const express = require("express");
const multer = require("multer");
const fs = require("fs");
const jsSHA = require("jssha");
const bdps = require("body-parser");
const app = express();
const Web3 = require("web3");
const myContract = require("../client/src/artifacts/Poe.json");
// const contJson = myContract;
const cors = require("cors");

app.use(cors());
app.options("*", cors());
// console.log(contArtifact)
app.use(bdps.json());

const provider = new Web3.providers.HttpProvider("http://localhost:2805");
const web3 = new Web3(provider);
var id = {}
var contract = {}

const init = async () => {
  id = await web3.eth.net.getId();
  // const contAddr = "0x3bfF0bfCE2a6630542DF02305832dcDaE8ed6C2b";
  const deployNetwork = myContract.networks[id];
  // console.log(deployNetwork)
  contract = new web3.eth.Contract(myContract.abi, deployNetwork.address);
  // console.log(contract.methods)
};

init();

// var getSslCertificate = require("get-ssl-certificate");
// getCert = async () => {
//   await getSslCertificate.get(req.body.link).then(function (certificate) {
//     console.log(certificate);

//     console.log(certificate.issuer);

//     console.log(certificate.valid_from);

//     console.log(certificate.valid_to);

//     console.log(certificate.pemEncoded);
//   });
// };

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

app.get("/", function (req, res) {
  // res.sendFile(__dirname + '/index.html')
  console.log("default path");
  // res.send("<p>hello</p>");
});

app.post("/gethash", upload.single("file"), async function (req, res, next) {
  // console.log("regist certificate");
  // console.log(req.file.path)
  // console.log(req.file.filename)
  // const account = await web3.eth.getAccounts();
  console.log(req.body.account)
  if (req.file.filename.length > 0 && req.body.account !== 'undefine') {
    let readFile = await fs.readFileSync(path.join(__dirname, req.file.path));
    // console.log(req.file.path)
    let shaObj = new jsSHA("SHA-512", "ARRAYBUFFER");
    await shaObj.update(readFile);
    let hashFile = "0x" + (await shaObj.getHash("HEX"));
    // console.log(hashFile);
    // res.contentType("text");
    const receipt = await contract.methods.addCertificate(hashFile).send({
      from: req.body.account,
    });
    // res.send(hashfile);
    res.send(receipt)
  } else {
    res.status(400).json("regist err");
  }
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
