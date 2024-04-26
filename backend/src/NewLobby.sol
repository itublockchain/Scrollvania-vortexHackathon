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
    ) external payable returns (string memory) {
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
        require(gunduz == true, "It is not night time");
        require(playerMap[msg.sender].role != Role.None, "Only villagers can vote");
        require(playerMap[target].role != Role.None, "You can't vote for a player who is not in the game");
        playerMap[target].votes++;
        targets.push(target);
        for(uint i = 0; i < targets.length; i++){
            if(targets[i] == target){
                return;
            }
        }
        
        

        timeCounter = block.timestamp;
        gunduz = !gunduz;
        emit timeUpdate();
       

    }

   
    function kill() public {
        require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet");
        require(gunduz == false, "It is not day time");
        timeCounter = block.timestamp;
        gunduz = !gunduz;
        emit timeUpdate();
        
    }


}
