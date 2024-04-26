// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./NewLobby.sol";

contract LobbyFactory {
    address[] public deployedLobbies;
    mapping(address => address) public ownerToLobby;


    function createLobby() public {
        address newLobby = address(new Lobby());
        deployedLobbies.push(newLobby);
        ownerToLobby[msg.sender] = newLobby;
    }


    function getDeployedLobbies() public view returns (address[] memory) {
        return deployedLobbies;
    }
}