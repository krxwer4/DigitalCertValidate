pragma solidity ^0.5.0;

contract Poe {
    struct Record {
        bool status;
        address adderPub;
        uint256 mineTime;
        uint256 blockNumber;
    }
    mapping(string => Record) private docHashes;

    constructor() public {}

    function addCertificate(string memory hash) public {
        Record memory newRecord = Record(true, msg.sender, now, block.number);
        docHashes[hash] = newRecord;
    }

    function findCertificate(string memory hash)
        public
        view
        returns (
            bool,
            address,
            uint256,
            uint256
        )
    {
        return (
            docHashes[hash].status,
            docHashes[hash].adderPub,
            docHashes[hash].mineTime,
            docHashes[hash].blockNumber
        );
    }

    function toggleStatus(string memory hash) public {
        if (msg.sender == docHashes[hash].adderPub) {
            if (docHashes[hash].status == true) {
                Record memory newRecord = Record(
                    false,
                    msg.sender,
                    now,
                    block.number
                );
                docHashes[hash] = newRecord;
            } else {
                Record memory newRecord = Record(
                    true,
                    msg.sender,
                    now,
                    block.number
                );
                docHashes[hash] = newRecord;
            }
        }
    }
}
