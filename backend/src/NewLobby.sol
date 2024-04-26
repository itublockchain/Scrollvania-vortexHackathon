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

    event timeUpdate();
    address[] public targets;
    uint public timeCounter;
    Player[] public players;
    mapping(address => Player) public playerMap;

    bool public gunduz = false;

    

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
    }
    
    
    function vote(address target) public {
        require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet");
        require(gunduz == true, "It is not day time");
        require(playerMap[msg.sender].role != Role.None, "Only villagers can vote");
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
        gunduz = !gunduz;
        emit timeUpdate();
       
    }

   
    function kill() public {
        require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet");
        require(gunduz == false, "It is not night time");
        timeCounter = block.timestamp;
        gunduz = !gunduz;
        emit timeUpdate();
        
    }


}
