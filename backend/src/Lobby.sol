// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

//import "./LobbyFactory.sol";
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
        bool isPaid;
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
    uint256 public villagerCount = 8;
    uint256 public voteCount;
    uint256 public vampireCount;
    //LobbyFactory public lobbyFactory= LobbyFactory(0xdC1707b63dC69f36A4a8434C33a5f9228106d1AD);

    modifier countTime {
        require(block.timestamp <= timeCounter + 40 minutes, "Time has not passed yet");
        _;
    }

    bool public gunduz = false;
    HighestVote public highestVote;

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
            votes: 0,
            isPaid:false
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
        if(voteCount == villagerCount + vampireCount){
            if(playerMap[highestVote.playerNickname].role == Role.Vampire){
                vampireCount--;
                if(vampireCount == 0){
                    gameFinished = true;
                    //lobbyFactory.updateLobbyInfo(address(this),gameFinished);
                }
            }
            else{
                villagerCount--;
                if(villagerCount == 0){
                    gameFinished = true;
                    //lobbyFactory.updateLobbyInfo(address(this),gameFinished);
                }
            }

            for(uint i = 0; i < players.length;i++){
            playerMap[players[i].nickname].votes = 0;
            }

            delete playerMap[highestVote.playerNickname];
            delete highestVote;
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
            villagerCount--;

            if(villagerCount == 0){
            gameFinished = true;
            //lobbyFactory.updateLobbyInfo(address(this),gameFinished);
            }
            voteCount = 0;
            delete highestVote;
        timeCounter = block.timestamp;
        gunduz = !gunduz;
        emit timeUpdate();
    }
    }

    function payout() public{
        require(gameFinished,"The game is still going on!!");
        require(!addresstoplayerMap[msg.sender].isPaid,"You are already paid!!");
        if(villagerCount==0){
            require(addresstoplayerMap[msg.sender].role==Role.Vampire,"You are not vampire!");
            payable(msg.sender).transfer(address(this).balance/2);
            addresstoplayerMap[msg.sender].isPaid=true;
        }
        else{
            require(addresstoplayerMap[msg.sender].role==Role.Villager,"You are not villager!");
            payable(msg.sender).transfer(address(this).balance/8);
            addresstoplayerMap[msg.sender].isPaid=true;

        }
    }
}