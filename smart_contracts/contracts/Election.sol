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

contract Election is Ownable {

    struct Elections {
        uint _id;
        uint _year;
        uint _categoryId;
    }

    struct Category {
        uint _id;
        string _name;
    }

    struct Candidate {
        uint _id;
        string _name;
        string _bio;
        uint _partyId;
        uint _electionId;
        bool _doesExist;
    }

    struct Party {
        uint _id;
        string _name;
        string _slug;
    }

    struct Voters {
        uint _id;
        address _address;
    }

    struct Votes {
        uint _id;
        uint _voterId;
        uint _candidateId;
        uint _electionId;
    }

    mapping(uint => Elections) private elections;

    mapping(uint => Category) private categories;

    mapping(uint => Candidate) private candidates;

    mapping(uint => Party) private party;

    mapping(uint => Voters) private voters;

    mapping(uint => Votes) private votes;

    mapping(address => bool) private voted;


    event ElectionCreated(uint _id, uint _year, uint _categoryId);

    event CategoryCreated(uint _id, string _name);

    event CandidateAdded(uint _id, string _name, string _bio, uint _partyId, uint _electionId, bool _doesExist);

    event PartyCreated(uint _id, string _party, string _partySlug);

    event VotersAdded(uint _id, address _address);

    event VotesAdded(uint _id, uint _voterId, uint _candidateId, uint _electionId);

    event Voted(uint _candidateId);


    uint candidateIndex;

    uint numVoters;

    uint numVotes;

    uint numParties;

    uint numElections;

    uint numCategory;


    function createElection(uint _year, string memory _type) public onlyOwner {

        elections[numElections] = Elections(numElections, _year, numCategory);
        categories[numCategory] = Category(numCategory, _type);

        emit ElectionCreated(numElections, _year, numCategory),
        emit CategoryCreated(numCategory, _type); 

        numElections ++;
        numCategory ++;
    }

    function addCandidate(string memory _name, string memory _bio , string memory _party, string memory _partySlug, uint _electionId) public onlyOwner {

        candidates[candidateIndex]._id = candidateIndex;
        candidates[candidateIndex]._name = _name;
        candidates[candidateIndex]._bio = _bio;
        candidates[candidateIndex]._partyId = numParties;
        candidates[candidateIndex]._electionId = _electionId;
        candidates[candidateIndex]._doesExist = true;

        party[numParties] = Party(numParties, _party, _partySlug);

        emit CandidateAdded(candidateIndex, _name, _bio, numParties, _electionId, true);
        emit PartyCreated(numParties, _party, _partySlug);

        candidateIndex ++;
        numParties ++;
    }

    function vote(uint _candidateId) public {

        require(!voted[msg.sender], "You have already voted");
        require(candidates[_candidateId]._doesExist == true, "Invalid candidate");

        voted[msg.sender] = true;

        voters[numVoters]._id = numVoters;
        voters[numVoters]._address = msg.sender;

        votes[numVotes]._id = numVotes;
        votes[numVotes]._voterId = numVoters;
        votes[numVotes]._candidateId = _candidateId;
        votes[numVotes]._electionId = candidates[_candidateId]._electionId;

        emit Voted(_candidateId);
        emit Voters(numVoters, msg.sender);
        emit Votes(numVotes, numVoters, _candidateId, candidates[_candidateId]._electionId);

        numVoters++;
        numVotes++;
    }

    function totalVotes(uint _candidateId) public view returns(uint) {
        uint numOfVotes = 0;
        for (uint i = 0; i < numVoters; i++) {

            if (votes[i]._candidateId == _candidateId) {
                numOfVotes++;
            }
        }
        return numOfVotes;
    }

    function getNumOfCandidates() public view returns(uint) {
        return candidateIndex;
    }

    function getNumOfParty() public view returns(uint) {
        return numParties;
    }

    function getNumOfVoters() public view returns(uint) {
        return numVoters;
    }

    function getCandidate(uint _Id) public view returns(uint, string memory, string memory, uint, uint) {
        return (_Id, candidates[_Id]._name, candidates[_Id]._bio, candidates[_Id]._partyId, candidates[_Id]._electionId);
    }
}