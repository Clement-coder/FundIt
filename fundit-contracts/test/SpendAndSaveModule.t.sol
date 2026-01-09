// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/SpendAndSaveModule.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockUSDC
 * @notice Mock USDC token for testing
 */
contract MockUSDC is ERC20 {
    constructor() ERC20("USD Coin", "USDC") {
        _mint(msg.sender, 1_000_000 * 10**6); // 1M USDC
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

/**
 * @title MockSavingsVault
 * @notice Mock vault for testing
 */
contract MockSavingsVault {
    address public owner;
    
    constructor(address _owner) {
        owner = _owner;
    }

    function depositFlexible(uint256) external pure {}
    function depositTarget(uint256, uint256) external pure {}
}

/**
 * @title SpendAndSaveModuleTest
 * @notice Comprehensive test suite for SpendAndSaveModule
 */
contract SpendAndSaveModuleTest is Test {
    SpendAndSaveModule public spendAndSave;
    MockUSDC public usdc;
    MockSavingsVault public vault;
    
    address public owner;
    address public user1;
    address public user2;
    address public automationService;
    
    // Test constants
    uint256 constant INITIAL_BALANCE = 10_000 * 10**6; // 10,000 USDC
    uint256 constant MIN_THRESHOLD = 10 * 10**6; // 10 USDC
    uint256 constant DAILY_CAP = 50 * 10**6; // 50 USDC
    uint256 constant MONTHLY_CAP = 500 * 10**6; // 500 USDC

    event SpendAndSaveEnabled(
        address indexed user,
        bool isPercentage,
        uint256 value,
        uint256 minSpendThreshold,
        uint256 dailyCap,
        uint256 monthlyCap,
        uint256 timestamp
    );

    event AutoSaveTriggered(
        address indexed user,
        uint256 originalSpendAmount,
        uint256 savedAmount,
        uint256 timestamp,
        uint256 newTotalSaved,
        bytes32 transactionHash
    );

    event AutoSaveSkipped(
        address indexed user,
        uint256 originalSpendAmount,
        string reason,
        uint256 timestamp
    );

    function setUp() public {
        owner = address(this);
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");
        automationService = makeAddr("automationService");

        // Deploy contracts
        usdc = new MockUSDC();
        spendAndSave = new SpendAndSaveModule(address(usdc));
        
        // Setup automation service
        spendAndSave.grantAutomationRole(automationService);
        
        // Fund users
        usdc.mint(user1, INITIAL_BALANCE);
        usdc.mint(user2, INITIAL_BALANCE);
        
        // Create vaults for users
        vault = new MockSavingsVault(user1);
    }

    
}