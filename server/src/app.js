'use strict';
var PORT = process.env.PORT || 9876;
const express = require("express");
const serverless = require("serverless-http");
const path = require('path');
const multer = require("multer");
const fs = require("fs");
const jsSHA = require("jssha");
const bdps = require("body-parser");
const app = express();
const Web3 = require("web3");
const myContract = require("../artifacts/Poe.json");
const HDWalletProvider = require("truffle-hdwallet-provider");
// const contJson = myContract;
const cors = require("cors");
const router = express.Router();
require("dotenv").config();

app.use(cors());
app.options("*", cors());
app.use(bdps.json());
app.use("/.netlify/functions/app",router);

// const provider = new Web3.providers.HttpProvider("http://localhost:2805");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const infuraTestnetUrl = "https://rinkeby.infura.io/v3/b7a05df5e4ff4c05b767ad142933054e"
const ganacheLocalUrl = "http://127.0.0.1:2805"
const ganacheMnemonic = process.env.GANACHE_MNE

const init = async (pvk) => {
  const provider = new HDWalletProvider(
    // ganacheMnemonic,
    pvk,
    infuraTestnetUrl
  );
  const web3 = new Web3(provider);

  return web3;
};

//HTTP://127.0.0.1:2805
// console.log(contract.methods.findCertificate(hashFile).call())

const hashing = async (file) => {
  let readFile = await fs.readFileSync(path.join(__dirname, file.path));
  // console.log(req.file.path)
  let shaObj = new jsSHA("SHA-512", "ARRAYBUFFER");
  await shaObj.update(readFile);
  let hashFile = await shaObj.getHash("HEX");
  return hashFile;
};

const zeroPad = (num) => {
  if (num < 10) {
    num = num.toString();
    num = "0" + num;
  }
  return num;
};

const preparingOutput = (receipt) => {
  const receiptTime = parseInt(receipt[2]);
  const rcTimeToDatetime = new Date(receiptTime * 1000);
  const time =
    rcTimeToDatetime.getHours() +
    ":" +
    zeroPad(rcTimeToDatetime.getMinutes()) +
    ":" +
    rcTimeToDatetime.getSeconds();
  const date =
    rcTimeToDatetime.getDate() +
    " " +
    months[rcTimeToDatetime.getMonth()] +
    " " +
    rcTimeToDatetime.getFullYear();
  var certInformation = {};
  certInformation.status = receipt[0] ? "Usable" : "Revoke";
  certInformation.addBy = receipt[1];
  certInformation.dateAdded = date + " " + time + " UTC";
  certInformation.blocknumber = receipt[3];
  certInformation.adderPublicKeyLinkCheck = receipt[4];
  return certInformation;
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
const path = require("path");

router.get("/", function (req, res) {
  // res.sendFile(__dirname + '/index.html')
  // console.log("default path");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.send("<p>oat-pejoy-api</p>");
});

router.get("/test", function (req, res) {
  // res.sendFile(__dirname + '/index.html')
  // console.log("default path");
  res.send("<p>oat-pejoy-api/test</p>");
});

router.post("/gethash", upload.single("file"), async function (req, res, next) {
  const hashFile = await hashing(req.file);
  res.send(hashFile);
});

router.post("/registcert", upload.single("file"), async function (req, res, next) {
  const hashFile = await hashing(req.file);
  // console.log(hashFile);
  const web3 = await init(req.body.pvk)
    .then(console.log("provider create"))
    .catch("can't create provider");
  const id = await web3.eth.net.getId();
  const deployNetwork = myContract.networks[id];
  const contract = new web3.eth.Contract(myContract.abi, deployNetwork.address);
  // console.log(contract.methods);
  const account = await web3.eth.getAccounts();
  console.log(account);
  if (req.file.filename.length > 0 && account !== "undefine") {
    const receipt = await contract.methods
      .addCertificate(hashFile)
      .send({
        from: account[0],
      })
      .catch((e) => {
        console.log(
          e + "Can't registered.This Certificate is already in blockchain."
        );
      });

    if (receipt !== undefined) {
      console.log(receipt);
      res.send(receipt.events.Added);
    }
    else{
      res.send("Can't registered.This Certificate is already in blockchain.")
    }
  } else {
    res.status(400).json("regist err");
  }
});

router.post(
  "/validatecert",
  upload.single("file"),
  async function (req, res, next) {
    // console.log(req.body.account)
    try {
      console.log(req.body);
      const hashFile = await hashing(req.file);
      console.log(hashFile);
      const web3 = await init(process.env.MNEMONIC)
        .then(console.log("provider create"))
        .catch("can't create provider");
      const id = await web3.eth.net.getId();
      const deployNetwork = myContract.networks[id];
      const contract = new web3.eth.Contract(
        myContract.abi,
        deployNetwork.address
      );
      // console.log(contract.methods);
      const account = await web3.eth.getAccounts();
      // console.log(account);
      if (req.file.filename.length > 0 && account !== "undefine") {
        const receipt = await contract.methods.findCertificate(hashFile).call();

        console.log(receipt);
        if (receipt[0]) {
          var pubkey = req.body.pubkey
          if (pubkey.substring(0, 2) !== "0x"){
            pubkey = "0x" + pubkey
          }
          if (receipt[1] === pubkey) {
            //preparing output
            const certInformation = preparingOutput(receipt);
            res.send(certInformation);
          } else if (receipt[1] !== pubkey) {
            res.send(
              `This certificate is available in blockchain but not registered by this public key : ${req.body.pubkey}`
            );
          }
        } else if (!receipt[0] && receipt[2] !== "0") {
          const certInformation = preparingOutput(receipt);
          res.send(certInformation);
        } else if (!receipt[0] && receipt[2] === "0") {
          res.send("This certificate is NOT AVAILABLE in blockchain");
        }
      } else {
        res.status(400).json("validate err");
      }
    } catch (err) {
      console.log(`validate error : ${err}`);
    }
  }
);

router.post("/togglecert", upload.single("file"), async function (req, res, next) {
  // console.log(req.body.account)
  try {
    const hashFile = await hashing(req.file);
    console.log(hashFile);
    const web3 = await init(req.body.pvk)
      .then(console.log("provider create"))
      .catch("can't create provider");
    const id = await web3.eth.net.getId();
    const deployNetwork = myContract.networks[id];
    const contract = new web3.eth.Contract(
      myContract.abi,
      deployNetwork.address
    );
    // console.log(contract.methods);
    const account = await web3.eth.getAccounts();
    // console.log(account);
    if (req.file.filename.length > 0 && account !== "undefine") {
      const receipt = await contract.methods
        .toggleStatus(hashFile)
        .send({ from: account[0] });
      console.log(receipt);
      res.send(`${hashFile}\'s status toggled`);
    } else {
      res.status(400).json("validate err");
    }
  } catch (err) {
    console.log(`toggle error : ${err}`);
  }
});

router.post("/registweb", upload.none(), async function (req, res, next) {
  try {
    console.log("webreg " + req.body.link);
    const web3 = await init(req.body.pvk)
      .then(console.log("provider create"))
      .catch("can't create provider");
    const id = await web3.eth.net.getId();
    const deployNetwork = myContract.networks[id];
    const contract = new web3.eth.Contract(
      myContract.abi,
      deployNetwork.address
    );
    const account = await web3.eth.getAccounts();
    if (req.body.link !== "" || req.body.link !== "undefined") {
      const receipt = await contract.methods
        .mapAdder(req.body.link)
        .send({ from: account[0] });
      console.log(receipt);
      res.send(receipt.events.Mapped);
    }
  } catch (err) {
    console.log(`web regist error : ${err}`);
    res.send("web regist error");
  }
});

app.listen(PORT, function () {
  console.log(`certificate-validate-server running on port ${PORT}`);
});

module.exports = app;
module.exports.handler = serverless(app);
