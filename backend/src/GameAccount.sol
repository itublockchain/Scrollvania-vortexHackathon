// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@account-abstraction/core/EntryPoint.sol";
import "@account-abstraction/interfaces/IAccount.sol";



contract GameAccount is IAccount {
    
    
    address public owner;
    string public userName = "Emojan";
    

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

    

   
}


