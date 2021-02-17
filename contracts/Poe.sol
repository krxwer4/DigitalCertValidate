pragma solidity ^0.5.0;

contract Poe {
    struct Record {
        bool status;
        address adderPub;
        uint256 mineTime;
        uint256 blockNumber;
    }
    struct School {
        string adderName;
    }
    mapping(string => Record) private docHashes;
    mapping(address => School) private adder;

    constructor() public {}

    function isValidHash(string memory hash) private pure returns (bool) {
        bytes memory b = bytes(hash);
        uint256 hashLength = 128;
        if (b.length != hashLength) return false;
        for (uint256 i = 0; i < hashLength; i++) {
            if (b[i] < "0") return false;
            if (b[i] > "9" && b[i] < "a") return false;
            if (b[i] > "f") return false;
        }
        return true;
    }

    function mapAdder(string memory schoolName) public {
        School memory newAdder = School(schoolName);
        adder[msg.sender] = newAdder;
    }

    function findCertificate(string memory hash)
        public
        view
        returns (
            bool,
            address,
            uint256,
            uint256,
            string memory
        )
    {
        return (
            docHashes[hash].status,
            docHashes[hash].adderPub,
            docHashes[hash].mineTime,
            docHashes[hash].blockNumber,
            adder[docHashes[hash].adderPub].adderName
        );
    }

    function addCertificate(string memory hash) public {
        require(isValidHash(hash));
        require(docHashes[hash].blockNumber == 0);
        Record memory newRecord = Record(true, msg.sender, now, block.number);
        docHashes[hash] = newRecord;
    }

    function toggleStatus(string memory hash) public {
        require(msg.sender == docHashes[hash].adderPub);
        if (docHashes[hash].status == true) {
            Record memory newRecord =
                Record(false, msg.sender, now, block.number);
            docHashes[hash] = newRecord;
        } else {
            Record memory newRecord =
                Record(true, msg.sender, now, block.number);
            docHashes[hash] = newRecord;
        }
    }
}
