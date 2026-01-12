// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../../src/security/EmergencyPause.sol";

// Mock contract to test EmergencyPause functionality
contract MockPausableContract is EmergencyPause {
    event CriticalOperationExecuted();

    function initializeOwner(address _owner) public {
        _transferOwnership(_owner);
    }

    function doCriticalOperation() public whenNotPaused {
        emit CriticalOperationExecuted();
    }

    function doAnotherOperation() public onlyWhenPaused {
        // This function can only be called when the contract is paused
    }
}

contract EmergencyPauseTest is Test {
    MockPausableContract public mockContract;
    address public owner;
    address public stranger;

    function setUp() public {
        owner = makeAddr("owner");
        stranger = makeAddr("stranger");

        mockContract = new MockPausableContract();
        vm.prank(address(this)); // Pretend deployer is the initial owner
        mockContract.initializeOwner(owner);
    }

    function test_InitialState_NotPaused() public {
        assertFalse(mockContract.paused(), "Contract should not be paused initially");
    }

    function test_EmergencyPause_Success_ByOwner() public {
        vm.prank(owner);
        vm.expectEmit(true, true, true, true);
        emit EmergencyPause.EmergencyPauseActivated(owner);
        mockContract.emergencyPause();

        assertTrue(mockContract.paused(), "Contract should be paused after emergencyPause");

        // Verify guarded function is blocked
        vm.expectRevert("Pausable: paused");
        mockContract.doCriticalOperation();
    }

    function test_EmergencyPause_Revert_ByStranger() public {
        vm.prank(stranger);
        vm.expectRevert("Ownable: caller is not the owner");
        mockContract.emergencyPause();

        assertFalse(mockContract.paused(), "Contract should remain unpaused");
    }

    function test_EmergencyUnpause_Success_ByOwner() public {
        // First, pause the contract
        vm.prank(owner);
        mockContract.emergencyPause();
        assertTrue(mockContract.paused(), "Contract should be paused before unpause");

        // Then, unpause
        vm.prank(owner);
        vm.expectEmit(true, true, true, true);
        emit EmergencyPause.EmergencyPauseDeactivated(owner);
        mockContract.emergencyUnpause();

        assertFalse(mockContract.paused(), "Contract should be unpaused after emergencyUnpause");

        // Verify guarded function is callable again
        vm.expectEmit(true, true, true, true);
        emit MockPausableContract.CriticalOperationExecuted();
        mockContract.doCriticalOperation();
    }

    function test_EmergencyUnpause_Revert_ByStranger() public {
        // First, pause the contract
        vm.prank(owner);
        mockContract.emergencyPause();
        assertTrue(mockContract.paused(), "Contract should be paused before unpause attempt by stranger");

        // Then, stranger tries to unpause
        vm.prank(stranger);
        vm.expectRevert("Ownable: caller is not the owner");
        mockContract.emergencyUnpause();

        assertTrue(mockContract.paused(), "Contract should remain paused");
    }

    function test_EmergencyPause_RevertWhenAlreadyPaused() public {
        vm.prank(owner);
        mockContract.emergencyPause(); // Pause once

        vm.expectRevert("Pausable: paused");
        mockContract.emergencyPause(); // Try to pause again
    }

    function test_EmergencyUnpause_RevertWhenNotPaused() public {
        // Contract is unpaused initially

        vm.prank(owner);
        vm.expectRevert("Pausable: not paused");
        mockContract.emergencyUnpause(); // Try to unpause
    }

    function test_CriticalOperation_WhenPaused_Reverts() public {
        vm.prank(owner);
        mockContract.emergencyPause();

        vm.expectRevert("Pausable: paused");
        mockContract.doCriticalOperation();
    }

    function test_CriticalOperation_WhenNotPaused_Succeeds() public {
        // Contract is not paused initially
        vm.expectEmit(true, true, true, true);
        emit MockPausableContract.CriticalOperationExecuted();
        mockContract.doCriticalOperation();
    }

    function test_OnlyWhenPausedModifier() public {
        // Should revert when not paused
        vm.expectRevert("Pausable: not paused");
        mockContract.doAnotherOperation();

        // Pause the contract
        vm.prank(owner);
        mockContract.emergencyPause();

        // Should succeed when paused
        mockContract.doAnotherOperation();
    }
}