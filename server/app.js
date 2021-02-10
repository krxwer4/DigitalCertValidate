const express = require("express");
const multer = require("multer");
const fs = require("fs");
const jsSHA = require("jssha");
const bdps = require("body-parser");
const app = express();
const Web3 = require("web3");
const myContract = require("../client/src/artifacts/Poe.json");
const HDWalletProvider = require('truffle-hdwallet-provider')
// const contJson = myContract;
const cors = require("cors");
require('dotenv').config()

app.use(cors());
app.options("*", cors());
// console.log(contArtifact)
app.use(bdps.json());

// console.log(process.env.MNEMONIC)
// const provider = new Web3.providers.HttpProvider("http://localhost:2805");
const provider = new HDWalletProvider(process.env.MNEMONIC,"https://rinkeby.infura.io/v3/b7a05df5e4ff4c05b767ad142933054e")
const web3 = new Web3(provider);
var id = {}
var contract = {}
const account = '0xe084FeA965b591a8AB68506FBafd66682DAda026'

const init = async () => {
  id = await web3.eth.net.getId();
  const deployNetwork = myContract.networks[id];
  contract = new web3.eth.Contract(myContract.abi, deployNetwork.address);
  // contract = new web3.eth.Contract(myContract.abi);
  console.log(contract.methods)
  // contract = await contract.deploy({data:myContract.bytecode}).send({from:account})
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

const hashing = async (file) =>{
  let readFile = await fs.readFileSync(path.join(__dirname, file.path));
  // console.log(req.file.path)
  let shaObj = new jsSHA("SHA-512", "ARRAYBUFFER");
  await shaObj.update(readFile);
  let hashFile = "0x" + (await shaObj.getHash("HEX"));
  
  return hashFile
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

app.get("/", function (req, res) {
  // res.sendFile(__dirname + '/index.html')
  console.log("default path");
  // res.send("<p>hello</p>");
});

app.post("/registcert", upload.single("file"), async function (req, res, next) {
  // console.log(req.body.account)
  hashFile = await hashing(req.file);
  console.log(account)
  if (req.file.filename.length > 0 && account !== 'undefine') {
    const receipt = await contract.methods.addCertificate(hashFile).send({
      from: account,
    });

    // res.send(hashfile);
    res.send(receipt);
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
