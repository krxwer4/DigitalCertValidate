var PoeContract = artifacts.require("Poe");
module.exports = function(deployer) {
deployer.deploy(PoeContract);
};