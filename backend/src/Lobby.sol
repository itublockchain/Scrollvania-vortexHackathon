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
        uint256 votes;
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
            role: Role.None,
            votes:0
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

    

  function vote(uint lobbyIndex, address target) external {
    // İlgili lobiyi kontrol edelim
    require(lobbyIndex < lobbies.length, "Invalid lobby index");

    // Oyuncunun oy verdiği hedefin oy sayısını artırma
    for (uint i = 0; i < players.length; i++) {
        if (players[i].userID == msg.sender) {
            require(players[i].role == Role.Villager, "Only villagers can vote");

            bool targetExists = false;
            for (uint j = 0; j < lobbies[lobbyIndex].players.length; j++) {
                if (lobbies[lobbyIndex].players[j] == target) {
                    targetExists = true;
                    break;
                }
            }
            require(targetExists, "Target player is not in the lobby");

            // Oy verme işlemi
            for (uint k = 0; k < players.length; k++) {
                if (players[k].userID == target) {
                    // Hedef oyuncunun oy sayısını artırma
                    players[k].votes++;
                    break;
                }
            }
            break;
        }
    }

    // Oyların sayımı ve asılacak oyuncunun belirlenmesi
    if (lobbies[lobbyIndex].playerCount == 10) {
        address targetPlayer;
        uint maxVotes = 0;
        for (uint m = 0; m < lobbies[lobbyIndex].players.length; m++) {
            for (uint n = 0; n < players.length; n++) {
                if (lobbies[lobbyIndex].players[m] == players[n].userID) {
                    if (players[n].votes > maxVotes) {
                        targetPlayer = players[n].userID;
                        maxVotes = players[n].votes;
                    }
                    break;
                }
            }
        }

        // Asılacak oyuncunun rolünü güncelleme
        for (uint p = 0; p < players.length; p++) {
            if (players[p].userID == targetPlayer) {
                if (players[p].role == Role.Vampyre) {
                    players[p].role = Role.None;
                } else {
                   
                    players[p].role = Role.None;
                }
                break;
            }
        }
    }
}


function kill(uint lobbyIndex, address target) external {
    // İlgili lobiyi kontrol edelim
    require(lobbyIndex < lobbies.length, "Invalid lobby index");

    // Oyuncunun öldürme yetkisine sahip olup olmadığını kontrol edelim
    for (uint i = 0; i < players.length; i++) {
        if (players[i].userID == msg.sender) {
            require(players[i].role == Role.Vampyre, "Only vampires can kill");
            break;
        }
    }

    // Hedef oyuncunun rolünü "None" olarak güncelleme
    for (uint j = 0; j < players.length; j++) {
        if (players[j].userID == target) {
            players[j].role = Role.None;
            break;
        }
    }
}

}


  