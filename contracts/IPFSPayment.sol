// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract IPFSPayment {
    address public owner;
    uint256 public verificationPrice = 0.01 ether; // 0.01 tFIL
    
    mapping(address => mapping(string => bool)) public paidVerifications;
    
    event PaymentReceived(address indexed user, string ipfsHash, uint256 amount);
    event PaymentWithdrawn(address indexed owner, uint256 amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
    
    function payForVerification(string memory ipfsHash) external payable {
        require(msg.value >= verificationPrice, "Insufficient payment");
        require(!paidVerifications[msg.sender][ipfsHash], "Already paid for this verification");
        
        paidVerifications[msg.sender][ipfsHash] = true;
        
        emit PaymentReceived(msg.sender, ipfsHash, msg.value);
    }
    
    function hasUserPaidForVerification(address user, string memory ipfsHash) external view returns (bool) {
        return paidVerifications[user][ipfsHash];
    }
    
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        payable(owner).transfer(balance);
        emit PaymentWithdrawn(owner, balance);
    }
    
    function updatePrice(uint256 newPrice) external onlyOwner {
        verificationPrice = newPrice;
    }
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}