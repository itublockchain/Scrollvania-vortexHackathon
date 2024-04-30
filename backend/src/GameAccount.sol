// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@account-abstraction/core/EntryPoint.sol";
import "@account-abstraction/interfaces/IAccount.sol";
import "./Lobby.sol";

contract GameAccount is IAccount {
    uint256 public count;
    address public owner;
    string public userName;

    constructor(address _owner, string memory _userName) {
        owner = _owner;
        userName = _userName;
    }

    function validateUserOp(
        PackedUserOperation calldata,
        bytes32,
        uint256
    ) external virtual override returns (uint256 validationData) {
        return 0;
    }

    function increment() public {
        count++;
    }

    function fundMe() public payable {
        
    }

    function getLobby(address lobbyAddress) internal pure returns (Lobby) {
        Lobby lobby = Lobby(lobbyAddress);
        return lobby;
    }

    function joinLobby(address lobbyAddress,string memory nickName) public payable{
      Lobby  lobby = getLobby(lobbyAddress);
      lobby.joinLobby{value: 0.0001 ether}(nickName);
    }

    function kill(address lobbyAddress,string memory target) public {
        Lobby lobby = getLobby(lobbyAddress);
        lobby.kill(target);
    }

    function vote(address lobbyAddress,string memory target) public {
        Lobby lobby = getLobby(lobbyAddress);
        lobby.vote(target);
    }
    
    function payout(address lobbyAddress) public {
        Lobby lobby = getLobby(lobbyAddress);
        lobby.payout();
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    
    
        


}
