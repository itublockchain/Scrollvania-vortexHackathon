//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./GameAccount.sol";

contract GameAccountFactory {
    event AccountCreated(address account, address owner);
    address[] public accounts;
    mapping(address => address) public ownerToAccount;
    mapping(address => bool) public hasAccount;

    function createAccount(
        address owner,
        string memory userName
    ) public returns (address) {
        require(!hasAccount[owner], "Account already exists");
        GameAccount account = new GameAccount(owner, userName);
        emit AccountCreated(address(account), owner);
        accounts.push(address(account));
        ownerToAccount[owner] = address(account);
        hasAccount[owner] = true;
        return address(account);
    }
}