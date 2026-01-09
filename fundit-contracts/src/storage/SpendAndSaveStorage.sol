// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SpendAndSaveStorage
 * @notice Storage contract for Spend & Save configurations
 * @dev Separates storage from logic for upgrade safety
 */
abstract contract SpendAndSaveStorage {
    
    struct SpendAndSaveConfig {
        bool enabled;
        bool isPercentage;
        uint256 value;
        uint256 minSpendThreshold;
        uint256 dailyCap;
        uint256 monthlyCap;
        uint256 dailySaved;
        uint256 monthlySaved;
        uint256 lastResetDay;
        uint256 lastResetMonth;
        uint256 destinationId;
        uint256 totalAutoSaved;
        uint256 transactionCount;
    }

    // User address => Configuration
    mapping(address => SpendAndSaveConfig) internal _userConfigs;
    
    // User address => Vault address
    mapping(address => address) internal _userVaults;
    
    // Track processed transactions to prevent duplicates
    mapping(bytes32 => bool) internal _processedTransactions;
    
    // Rate limiting: user => last auto-save timestamp
    mapping(address => uint256) internal _lastAutoSaveTime;
    
    // Rate limit cooldown (1 minute)
    uint256 internal constant RATE_LIMIT_COOLDOWN = 60;

    /**
     * @notice Reserved storage space for future upgrades
     */
    uint256[50] private __gap;
}
