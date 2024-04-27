// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Lobby {
    enum Role {
        Vampyre,
        Villager,
        None
    }

    struct Player {
        string nickname;
        address userID;
        Role role;
        uint256 votes;
    }

    struct HighestVote{
        uint256 voteNumber;
        address playerAddress;
    }

    event timeUpdate();
    address[] public targets;
    uint public timeCounter;
    Player[] public players;
    mapping(address => Player) public playerMap;

    modifier countTime {
        require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet");
        _;
    }

    bool public gunduz = false;

    event vampireFound(address vampireAddress);

    function joinLobby(
        string memory _nickName
    ) external payable {
        require(msg.value == 0.0001 ether, "Transaction failed");
        Player memory newPlayer = Player({
            nickname: _nickName,
            userID: msg.sender,
            role: Role.None,
            votes: 0
        });
        // players.push(newPlayer);
        playerMap[msg.sender] = newPlayer;
     
     timeCounter = block.timestamp;
     if(players.length == 10){
        //fonksiyon döndür
     }
    }
    
    internal HighestVote highestVote;
    function vote(address target) public countTime { //general voting function
        //require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet"); modifier added
        require(gunduz == true, "It is not day time");
        require(playerMap[target].role != Role.None, "You can't vote for a player who is not in the game");
        playerMap[target].votes++;
        targets.push(target);
        
        highestVote.voteNumber=max(highestVote.voteNumber, playerMap[target].votes);
        if(highestVote.voteNumber==playerMap[target].votes){
            highestVote.playerAddress=target;
        }


       // uint256 highestVote;
       /* for(uint i = 0; i < targets.length; i++){
            if(playerMap[targets[i]].votes > playerMap[targets[i+1]].votes){
                highestVote = playerMap[targets[i]].votes;
            }
        }*/





      /*  for(uint i = 0; i < targets.length; i++){
            if(playerMap[targets[i]].votes == highestVote){
                playerMap[targets[i]].role = Role.None;
            }
        }*/
        

        timeCounter = block.timestamp;
        gunduz = !gunduz;
        emit timeUpdate();
       
    }

    function dispatch() internal {//dispacth the villager with the highest vote
        
        if(playerMap[highestVote.playerAddress].role==Role.Vampyre){
            emit vampireFound(highestVote.playerAddress);
            return;
        }
        playerMap[highestVote.playerAddress].role=Role.None;
    }
    
    
    function kill() public countTime{
       // require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet");
        require(gunduz == false, "It is not night time");
        require(playerMap[msg.sender].role == Role.Vampyre, "Only vampyres can vote");
        require(playerMap[target].role != Role.None, "You can't vote for a player who is not in the game");
        playerMap[target].votes++;
        targets.push(target);
        uint256 highestVote;
        for(uint i = 0; i < targets.length; i++){
            if(playerMap[targets[i]].votes > playerMap[targets[i+1]].votes){
                highestVote = playerMap[targets[i]].votes;
            }
        }

        for(uint i = 0; i < targets.length; i++){
            if(playerMap[targets[i]].votes == highestVote){
                playerMap[targets[i]].role = Role.None;
            }
        }
        
        timeCounter = block.timestamp;
        gunduz == gunduz;
        emit timeUpdate();
        
    }


}