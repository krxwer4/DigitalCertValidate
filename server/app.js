const express = require("express");
const multer = require("multer");
const fs = require("fs");
const jsSHA = require("jssha");
const bdps = require("body-parser");
const app = express();
const Web3 = require("web3");
const myContract = require("../client/src/artifacts/Poe.json");
const HDWalletProvider = require("truffle-hdwallet-provider");
// const contJson = myContract;
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.options("*", cors());
app.use(bdps.json());

// const provider = new Web3.providers.HttpProvider("http://localhost:2805");
// const account = '0xe084FeA965b591a8AB68506FBafd66682DAda026'

const init = async (pvk) => {
  const provider = new HDWalletProvider(
    // process.env.MNEMONIC,
    pvk,
    "https://rinkeby.infura.io/v3/b7a05df5e4ff4c05b767ad142933054e"
  );
  const web3 = new Web3(provider);

  return web3;
};

// console.log(contract.methods.findCertificate(hashFile).call())

const hashing = async (file) => {
  let readFile = await fs.readFileSync(path.join(__dirname, file.path));
  // console.log(req.file.path)
  let shaObj = new jsSHA("SHA-512", "ARRAYBUFFER");
  await shaObj.update(readFile);
  let hashFile = "0x" + (await shaObj.getHash("HEX"));

  return hashFile;
};

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
  const hashFile = await hashing(req.file);
  res.send(hashFile);
});

app.post("/registcert", upload.single("file"), async function (req, res, next) {
  // console.log(req.body.account)
  const hashFile = await hashing(req.file);
  console.log(hashFile);
  const web3 = await init(req.body.pvk);
  const id = await web3.eth.net.getId();
  const deployNetwork = myContract.networks[id];
  const contract = new web3.eth.Contract(myContract.abi, deployNetwork.address);
  console.log(contract.methods)
  const account = await web3.eth.getAccounts();
  console.log(account)
  if (req.file.filename.length > 0 && account !== "undefine") {
    const receipt = await contract.methods.addCertificate(hashFile).send({
      from: account[0],
    });
    console.log(receipt);
    res.send(receipt);
  } else {
    res.status(400).json("regist err");
  }
  
  //0x05344357796d6ddf4933de1eeb3a164ac0c71da602bac87d7831ef984073b8cb9f6c2c0300df7fe37eb8c55ff1f19324441f66b6b04a73f55f918dc260441796
  // const read = await contract.methods.findCertificate(hashFile).call();
  // console.log(read);
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
