const certVal = require('./certValW3.js');
const commandLineArgs = require('command-line-args');

const cmdOptions = [
  {
    name: "add",
    alias: "a",
    type: String
  },
  {
    name: "find",
    alias: "f",
    type: String
  },
  {
    name: "toggle",
    alias: "t",
    type: String
  }

];
const options = commandLineArgs(cmdOptions);

certVal.init();

if (options.add) {
    console.log("Sending hash for file: " + options.add);
    let hash = certVal.calculateHash(options.add);
    console.log("SHA-512 hash value: " + hash);
    certVal.sendHash(hash, function(error, tx) {
    console.log("Transaction ID: " + tx);
  });
}
else if (options.find) {
  console.log("Looking up hash for file: " + options.find);
  let hash = certVal.calculateHash(options.find);
  console.log("SHA-512 hash value: " + hash);
  certVal.findHash(hash, function (error, result) {
    if (result.blockNumber!=0)
    {
        if(result.status !=0){
            console.log("Certificate Status: Usable");
        }
        else{
            console.log("Certificate Status: Revoked");
        }
        
        console.log("Adder Address: "+result.adderPub);
        console.log("Has value found at block No.: " + result.blockNumber);
        console.log("Add time: " + result.mineTime);
      
    }
    else console.log("Hash value not found on blockchain");
  });
}
else if (options.toggle) {
    console.log("Toggling Certificate status for : " + options.toggle);
    let hash = certVal.calculateHash(options.toggle);
    console.log("SHA-512 hash value: " + hash);
    certVal.toggleCert(hash, function(error, tx) {
    console.log("Transaction ID: " + tx);
    });
  }
else {
  console.log("Illegal command line options");
}