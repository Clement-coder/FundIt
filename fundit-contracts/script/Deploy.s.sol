// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/SpendAndSaveModule.sol";

/**
 * @title DeploySpendAndSave
 * @notice Deployment script for SpendAndSaveModule on Base
 * 
 * Usage:
 * 1. Set environment variables in .env file
 * 2. Run: forge script script/Deploy.s.sol:DeploySpendAndSave --rpc-url base --broadcast --verify
 * 
 * For testnet:
 * forge script script/Deploy.s.sol:DeploySpendAndSave --rpc-url base-sepolia --broadcast --verify
 */
contract DeploySpendAndSave is Script {
    
    // Base Mainnet USDC: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
    // Base Sepolia USDC: 0x036CbD53842c5426634e7929541eC2318f3dCF7e
    
    address constant BASE_MAINNET_USDC = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
    address constant BASE_SEPOLIA_USDC = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;
    
    SpendAndSaveModule public spendAndSave;
    
    function run() external {
        // Get deployer private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        // Get automation service address from environment
        address automationService = vm.envAddress("AUTOMATION_SERVICE_ADDRESS");
        
        // Determine which network we're on
        uint256 chainId = block.chainid;
        address usdcAddress;
        
        if (chainId == 8453) {
            // Base Mainnet
            usdcAddress = BASE_MAINNET_USDC;
            console.log("Deploying to Base Mainnet");
        } else if (chainId == 84532) {
            // Base Sepolia
            usdcAddress = BASE_SEPOLIA_USDC;
            console.log("Deploying to Base Sepolia");
        } else {
            revert("Unsupported network");
        }
        
        console.log("Deployer address:", deployer);
        console.log("USDC address:", usdcAddress);
        console.log("Automation service:", automationService);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy SpendAndSaveModule
        console.log("\n=== Deploying SpendAndSaveModule ===");
        spendAndSave = new SpendAndSaveModule(usdcAddress);
        console.log("SpendAndSaveModule deployed at:", address(spendAndSave));
        
        // Grant automation role
        console.log("\n=== Granting Automation Role ===");
        spendAndSave.grantAutomationRole(automationService);
        console.log("Automation role granted to:", automationService);
        
        // Verify setup
        console.log("\n=== Verifying Deployment ===");
        console.log("USDC address in contract:", address(spendAndSave.USDC()));
        console.log("Has automation role:", spendAndSave.hasRole(spendAndSave.AUTOMATION_ROLE(), automationService));
        console.log("Contract owner:", spendAndSave.owner());
        
        vm.stopBroadcast();
        
        // Save deployment info
        _saveDeploymentInfo(chainId, address(spendAndSave), usdcAddress, automationService);
        
        console.log("\n=== Deployment Complete ===");
        console.log("SpendAndSaveModule:", address(spendAndSave));
        console.log("\nNext steps:");
        console.log("1. Verify contract on BaseScan (if not auto-verified)");
        console.log("2. Update frontend with contract address");
        console.log("3. Configure automation service with contract address");
        console.log("4. Test with a small deposit first");
    }
    
    function _saveDeploymentInfo(
        uint256 chainId,
        address spendAndSaveAddress,
        address usdcAddress,
        address automationService
    ) internal {
        string memory networkName = chainId == 8453 ? "base" : "base-sepolia";
        string memory json = string.concat(
            '{\n',
            '  "network": "', networkName, '",\n',
            '  "chainId": ', vm.toString(chainId), ',\n',
            '  "timestamp": ', vm.toString(block.timestamp), ',\n',
            '  "contracts": {\n',
            '    "SpendAndSaveModule": "', vm.toString(spendAndSaveAddress), '",\n',
            '    "USDC": "', vm.toString(usdcAddress), '"\n',
            '  },\n',
            '  "automationService": "', vm.toString(automationService), '"\n',
            '}'
        );
        
        string memory filename = string.concat("deployments/", networkName, "-latest.json");
        vm.writeFile(filename, json);
        console.log("\nDeployment info saved to:", filename);
    }
}

