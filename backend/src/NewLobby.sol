// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


/*Yapılacaklar

    oyları sıfırla - bunu bilmiyorum
    oyunu başlatan fonksiyon
    vampiri ata - nickname kullanarak random atama yapmayı çözmemiz gerekiyor
    oylamayı başlat - Bununla oyunu başlatan fonksiyon aynı 
    target addressten stringe dönecek-


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
    string[] public targets;
    uint public timeCounter;
    Player[] public players;
    mapping(string => Player) private playerMap;
    uint256 public playerCount;

    modifier countTime {
        require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet");
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
        // players.push(newPlayer);
        playerMap[newPlayer.nickname] = newPlayer;
        playerCount++;
     
     
        if(playerCount==10){
            // oyunu başlat
            uint randNum = block.timestamp; //burası olmaz çözüm bulmak gerekiyor
            players[randNum%2+1].role =Role.Vampire;
            players[randNum%2].role = Role.Vampire;
            emit gameStarted();
        }
    }
    
    
    function vote(string memory target) public countTime { //general voting function
        //require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet"); modifier added
        require(gunduz == true, "It is not day time");
        require(playerMap[target].role != Role.Dead, "You can't vote for a player who is not in the game");
        playerMap[target].votes++;
        targets.push(target);
        
        if(playerMap[target].votes > highestVote.voteNumber){
            highestVote.voteNumber = playerMap[target].votes;
            highestVote.playerNickname = target;
        }
        timeCounter = block.timestamp;
        gunduz = !gunduz;
        emit timeUpdate();
       
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
    
    
    function kill( string memory target, string memory vampire) private countTime{
       // require(block.timestamp <= timeCounter + 40 seconds, "Time has not passed yet");
        require(gunduz == false, "It is not night time");
        require(playerMap[vampire].role == Role.Vampire, "Only vampires can kill");
        require(playerMap[target].role != Role.Dead, "You can't kill a player who is not in the game");
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