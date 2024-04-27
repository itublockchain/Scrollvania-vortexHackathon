// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


/*Yapılacaklar

    oyları sıfırla
    oyunu başlatan fonksiyon
    vampiri ata
    oylamayı başlat



 */


contract Lobby {
    enum Role {
        Vampire,
        Villager,
        Dead
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
    uint256 public playerCount;

    modifier countTime {
        require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet");
        _;
    }

    bool public gunduz = false;
    HighestVote private highestVote;

    event vampireFound(address vampireAddress);
    event gameStarted;
    event murdered(address victim);

    function joinLobby(
        string memory _nickName
    ) external payable {
        require(msg.value == 0.0001 ether, "Transaction failed");
        require(playerCount<10,"The lobby is full!";)

        // rol atasana elemana


        Player memory newPlayer = Player({
            nickname: _nickName,
            userID: msg.sender,
            role: Role.Villager,
            votes: 0
        });
        // players.push(newPlayer);
        playerMap[msg.sender] = newPlayer;
        playerCount++;
     
     /*timeCounter = block.timestamp;
     if(players.length == 10){
        //fonksiyon döndür
     }*/ 
        if(playerCount==10){
            // oyunu başlat
            uint randNum = block.timestamp;
            players[randNum%2+1].role =Role.Vampire;
            players[randNum].role = Role.Vampire;



            emit gameStarted;
        }
    }
    
    
    function vote(address target) public countTime { //general voting function
        //require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet"); modifier added
        require(gunduz == true, "It is not day time");
        require(playerMap[target].role != Role.None, "You can't vote for a player who is not in the game");
        playerMap[target].votes++;
        targets.push(target);
        
        if(playerMap[target].votes > highestVote.voteNumber){
            highestVote.voteNumber = playerMap[target].votes;
            highestVote.playerAddress = target;
        }
        timeCounter = block.timestamp;
        gunduz = !gunduz;
        emit timeUpdate();
       
    }

    function dispatch() internal {//dispacth the villager with the highest vote
        
        if(playerMap[highestVote.playerAddress].role==Role.Vampyre){
            emit vampireFound(highestVote.playerAddress);
            return;
        }
        playerMap[highestVote.playerAddress].role=Role.Dead;
        highestVote.voteNumber=0;
        highestVote.playerAddress="";
    }
    
    
    function kill(address target) private countTime{
       // require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet");
        require(gunduz == false, "It is not night time");
        require(playerMap[msg.sender].role == Role.Vampire, "Only vampires can kill");
        require(playerMap[target].role != Role.None, "You can't kill a player who is not in the game");
      /*  playerMap[target].votes++;
        targets.push(target);
        for(uint i = 0; i < targets.length; i++){
            if(playerMap[targets[i]].votes > playerMap[targets[i+1]].votes){
                highestVote.voteNumber = playerMap[targets[i]].votes;
            }
        }

        for(uint i = 0; i < targets.length; i++){
            if(playerMap[targets[i]].votes == highestVote.voteNumber){
                playerMap[targets[i]].role = Role.None;
            }
        }
        */


        playerMap[target].role=Role.Dead;
        emit murdered(target);
        timeCounter = block.timestamp;
        gunduz == gunduz;
        emit timeUpdate();
        
    }


}