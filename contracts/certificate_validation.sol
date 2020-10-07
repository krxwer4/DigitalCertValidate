pragma solidity ^0.5.0;
// pragma experimental ABIEncoderV2;
contract CertValidate{
    address private deployerAddr;
    
    struct cert{
        uint256 regisDate;
        bytes32 hashNumber;
    }
    
    mapping(bytes32 => cert) private certList;
    
    constructor() public {
        deployerAddr = msg.sender;
    }
    
    modifier onlyDeployer(){
        require(msg.sender == deployerAddr);
        _;
    }
}
