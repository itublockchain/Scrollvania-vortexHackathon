// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./Lobby.sol";

contract LobbyFactory {
    mapping(address => address) public ownerToLobby;
    struct LobbyInfo {
        address owner;
        address lobbyAddress;
        bool gameFinished;
    }
    LobbyInfo[] public deployedLobbies;
    mapping(address => uint256) public lobbyToIndex;



    
    function createLobby() public {
        Lobby newLobby = new Lobby();

        deployedLobbies.push(LobbyInfo(msg.sender, address(newLobby), false));
        ownerToLobby[msg.sender] = address(newLobby);
    }

    function updateLobbyInfo(address _lobbyAddress, bool _gameFinished) public {
        deployedLobbies[lobbyToIndex[_lobbyAddress]].gameFinished = _gameFinished;
    }

    function getDeployedLobbies() public view returns (LobbyInfo[] memory) {
        return deployedLobbies;
    }
}
