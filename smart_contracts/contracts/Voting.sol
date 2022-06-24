//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Ownable {
    address public _owner;

    constructor() public {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(isOwner(), "You are not the owner");
        _;
    }

    function isOwner() public view returns(bool) {
        return (msg.sender == _owner);
    }
}

contract Voting is Ownable {

    struct Candidate {
        uint _id;
        string _name;
        string _party;
        string _bio;
        uint _voteCount;
    }

    mapping(uint => Candidate) public candidates;

    mapping(address => bool) public voted;

    event Voted(uint _candidateId);

    uint public candidateIndex;

    uint public totalVoters;

    function addCandidate(string memory _name, string memory _party, string memory _bio ) public onlyOwner {
        candidates[candidateIndex]._id = candidateIndex;
        candidates[candidateIndex]._name = _name;
        candidates[candidateIndex]._party = _party;
        candidates[candidateIndex]._bio = _bio;
        
        candidateIndex++;
    }

    function vote(uint _candidateId) public {
        require(!voted[msg.sender], "You have already voted");
        require(_candidateId <= candidateIndex, "Invalid candidate");

        voted[msg.sender] = true;
        totalVoters ++;

        candidates[_candidateId]._voteCount ++;

        emit Voted(_candidateId);
    }
}
