// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Scrollvania {
    
    enum Role {
        Vampyre,
        Villager,
        None
    }

    struct Player {
        string nickname;
        address userID;
        Role role;
    }

    struct Lobby {
        uint playerCount;
        address[] players;
    }

    Lobby[] public lobbies;
    Player[] internal players;

    function createAccount(string memory _nickname, address _userID) external {
        Player memory newPlayer = Player({
            nickname: _nickname,
            userID: _userID,
            role: Role.None
        });
        players.push(newPlayer);
    }

    function createLobby() public payable returns (string memory) {
    require(msg.value == 0.0001 ether, "Transaction failed");
    payable(msg.sender).transfer(0.0001 ether);

    Lobby memory newLobby = Lobby({
        playerCount: 1,
        players: new address[](0)
    });

    lobbies.push(newLobby);
    lobbies[lobbies.length-1].players.push(msg.sender);
    
    return "Lobby created successfully";
}

    function joinLobby() external payable returns (string memory) {
        require(msg.value == 0.0001 ether, "Transaction failed");
        for (uint i = 0; i < lobbies.length; i++) {
            for (uint j = 0; j < 10; j++) {
                require(lobbies[i].players[j] != msg.sender, "Player already in a lobby");
            }
        }
        if (lobbies.length == 0 || lobbies[lobbies.length - 1].playerCount == 10) {
            createLobby();
        } else {
            payable(msg.sender).transfer(0.0001 ether);
            lobbies[lobbies.length - 1].players.push(msg.sender);
            lobbies[lobbies.length - 1].playerCount++;
        }
        return "Joined successfully";
    }

    function vote() external {}

    function kill() external {}
}
