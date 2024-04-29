// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


/*Yapılacaklar

    oyları sıfırla - bunu bilmiyorum 

 */


contract Lobby {
    enum Role {
        Vampire,
        Villager,
        Dead
    }

    struct Player {
        string nickname;
        address userAddress;
        Role role;
        uint256 votes;
    }

    struct HighestVote{
        uint256 voteNumber;
        string playerNickname;
    }

    event timeUpdate();
    bool public gameFinished = false;
    string[] public targets;
    uint public timeCounter;
    Player[] public players;
    mapping(string => Player) public playerMap;
    mapping(address => Player) public addresstoplayerMap;
    uint256 public playerCount;
    uint256 public voteCount;
    uint256 public vampireCount;

    modifier countTime {
        require(block.timestamp <= timeCounter + 40 minutes, "Time has not passed yet");
        _;
    }

    bool public gunduz = false;
    HighestVote private highestVote;

    event vampireFound(string vampireNickname);
    event gameStarted();
    event murdered(string victim);
    event Dispacth(string suspect);

    function joinLobby(
        string memory _nickName
    ) external payable {
        require(msg.value == 0.0001 ether, "Transaction failed");
        require(playerCount<10,"The lobby is full!");

            Player memory newPlayer = Player({
            nickname: _nickName,
            userAddress: msg.sender,
            role: Role.Villager,
            votes: 0
        });
        players.push(newPlayer);
        playerMap[newPlayer.nickname] = newPlayer;
        addresstoplayerMap[msg.sender] = newPlayer;
        playerCount++;
     
     
        if(playerCount==10){
            timeCounter = block.timestamp;
            uint randNum = block.timestamp; //burası olmaz çözüm bulmak gerekiyor
            playerMap[players[randNum%9+1].nickname].role = Role.Vampire;
            playerMap[players[randNum%9].nickname].role = Role.Vampire;
            addresstoplayerMap[players[randNum%9+1].userAddress].role = Role.Vampire;
            addresstoplayerMap[players[randNum%9].userAddress].role = Role.Vampire;
            players[randNum%9+1].role = Role.Vampire;
            players[randNum%9].role = Role.Vampire;
            playerCount = 8;
            vampireCount = 2;
            emit gameStarted();
        }
    }
    
    
    function vote(string memory target) public countTime { //general voting function
        //require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet"); modifier added
        require(gunduz == true, "It is not day time");
        require(playerMap[target].role != Role.Dead, "You can't vote for a player who is not in the game");
        playerMap[target].votes++;
        voteCount++;
        targets.push(target);
        
        if(playerMap[target].votes > highestVote.voteNumber){
            highestVote.voteNumber = playerMap[target].votes;
            highestVote.playerNickname = target;
        }
        if(voteCount == playerCount + vampireCount){
            if(playerMap[highestVote.playerNickname].role == Role.Vampire){
                vampireCount--;
                if(vampireCount == 0){
                    gameFinished = true;
                }
            }
            else{
                playerCount--;
                if(playerCount == 0){
                    gameFinished = true;
                }
            }

            for(uint i = 0; i < players.length;i++){
            playerMap[players[i].nickname].votes = 0;
            }

            delete playerMap[highestVote.playerNickname];
            voteCount = 0;
        timeCounter = block.timestamp;
        gunduz = !gunduz;
        emit timeUpdate();
       }
    }

    function dispatch() internal {//dispacth the villager with the highest vote
        
        if(playerMap[highestVote.playerNickname].role==Role.Vampire){
            emit vampireFound(highestVote.playerNickname);
            return;
            //eğer iki vampir de bulunduysa oyunu bitir
        }
        playerMap[highestVote.playerNickname].role=Role.Dead;
        highestVote.voteNumber=0;
        emit Dispacth(highestVote.playerNickname);
    }
    
    
    function kill( string memory target) public countTime{
       // require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet");
        require(gunduz == false, "It is not night time");
        require(addresstoplayerMap[msg.sender].role == Role.Vampire, "Only vampires can kill");
        require(playerMap[target].role != Role.Dead, "You can't kill a player who is not in the game");
        require(playerMap[target].role != Role.Vampire,"You can't kill a vampire");
        playerMap[target].votes++;
        voteCount++;
        targets.push(target);

       if(playerMap[target].votes > highestVote.voteNumber){
            highestVote.voteNumber = playerMap[target].votes;
            highestVote.playerNickname = target;
        }

       if(voteCount == vampireCount){

            for(uint i = 0; i < players.length;i++){
            playerMap[players[i].nickname].votes = 0;
            }

            delete playerMap[highestVote.playerNickname];
            for(uint i = 0; i < players.length;i++){
            playerCount--;

            if(playerCount == 0){
            gameFinished = true;
            }
            voteCount = 0;
        timeCounter = block.timestamp;
        gunduz = !gunduz;
        emit timeUpdate();
       }
        
    }
    }
}