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

    Player[] public players;

    function createAccount(string memory _nickname, address _userID) external {}

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
        players.push(newPlayer);
    }
}
