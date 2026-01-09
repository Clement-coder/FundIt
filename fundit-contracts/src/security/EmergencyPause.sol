// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title EmergencyPause
 * @notice Emergency pause functionality for the contract
 * @dev Allows owner to pause critical operations in case of emergency
 */
abstract contract EmergencyPause is Pausable, Ownable {
    event EmergencyPauseActivated(address indexed by);
    event EmergencyPauseDeactivated(address indexed by);

    /**
     * @notice Pause all operations
     */
    function emergencyPause() external onlyOwner {
        _pause();
        emit EmergencyPauseActivated(msg.sender);
    }

    /**
     * @notice Unpause all operations
     */
    function emergencyUnpause() external onlyOwner {
        _unpause();
        emit EmergencyPauseDeactivated(msg.sender);
    }
}
