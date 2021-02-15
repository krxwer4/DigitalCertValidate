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
  // if (req.secure) {
  //   console.log("secure");
  // } else if (!req.secure) {
  //   console.log("not secure");
  // }
  // console.log(req.body.account)
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
    console.log(account);
    if (req.file.filename.length > 0 && account !== "undefine") {
      const receipt = await contract.methods.addCertificate(hashFile).send({
        from: account[0],
      });
      console.log(receipt);
      res.send(receipt);
    } else {
      res.status(400).json("regist err");
    }
});

app.post(
  "/validatecert",
  upload.single("file"),
  async function (req, res, next) {
    // console.log(req.body.account)
    try {
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
          if (receipt[1] === req.body.pubkey) {
            res.send(receipt);
          } else if (receipt[1] !== req.body.pubkey) {
            res.send(
              `we have this certificate on blockchain but not regist by this pubkey : ${req.body.pubkey}`
            );
          }
        } else if (!receipt[0]) {
          res.send("not validate");
        }
      } else {
        res.status(400).json("validate err");
      }
    } catch (err) {
      console.log(`validate error : ${err}`);
    }
  }
);

app.post("/togglecert", upload.single("file"), async function (req, res, next) {
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

app.post("/registweb", async function (req, res) {
  try {
    console.log(req.body.link);
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
        .linkMatch(req.body.link)
        .send({ from: account[0] });
    }
  } catch (err) {
    console.log(`web regist error : ${err}`);
  }
});

app.listen(9876, function () {
  console.log("certificate-validate-server running on port 9876");
});
