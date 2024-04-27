// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";
import {Event} from "../src/EventContract.sol";

contract DeployEventContract is Script {
    function run() external returns (Event) {
        vm.startBroadcast();

        Event eventContract = new Event();

        vm.stopBroadcast();
        return eventContract;
    }
}