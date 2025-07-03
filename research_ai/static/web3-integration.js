// Fixed Web3 Integration for IPFS Payment System

// Contract configuration
const CONTRACT_ADDRESS = "0xfbc8ee7d9064c534d9be34ce75d542726d1f2fd1"; // Replace with your deployed contract address
const FILECOIN_TESTNET_CONFIG = {
    chainId: '0x4cb2f', // Filecoin Calibration testnet
    chainName: 'Filecoin Calibration',
    nativeCurrency: {
        name: 'testnet FIL',
        symbol: 'tFIL',
        decimals: 18
    },
    rpcUrls: ['https://api.calibration.node.glif.io/rpc/v1'],
    blockExplorerUrls: ['https://calibration.filfox.info/en']
};

const CONTRACT_ABI = [
    {
        "inputs": [{"internalType": "string", "name": "ipfsHash", "type": "string"}],
        "name": "payForVerification",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "user", "type": "address"},
            {"internalType": "string", "name": "ipfsHash", "type": "string"}
        ],
        "name": "hasUserPaidForVerification",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "verificationPrice",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// Global variables
let web3;
let contract;
let userAccount;

// Add Filecoin testnet to MetaMask if not already added
async function addFilecoinNetwork() {
    try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [FILECOIN_TESTNET_CONFIG]
        });
        console.log('Filecoin testnet added successfully');
        return true;
    } catch (error) {
        console.error('Failed to add Filecoin testnet:', error);
        return false;
    }
}

// Switch to Filecoin testnet
async function switchToFilecoinNetwork() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: FILECOIN_TESTNET_CONFIG.chainId }]
        });
        console.log('Switched to Filecoin testnet');
        return true;
    } catch (error) {
        if (error.code === 4902) {
            // Network not added yet, try to add it
            return await addFilecoinNetwork();
        }
        console.error('Failed to switch to Filecoin testnet:', error);
        return false;
    }
}

// Initialize Web3 and MetaMask
async function initializeWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            console.log('MetaMask detected, initializing...');
            
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Switch to Filecoin testnet
            const networkSwitched = await switchToFilecoinNetwork();
            if (!networkSwitched) {
                console.warn('Failed to switch to Filecoin testnet, continuing with current network');
            }
            
            // Initialize Web3
            web3 = new Web3(window.ethereum);
            
            // Get current account
            const accounts = await web3.eth.getAccounts();
            userAccount = accounts[0];
            console.log('Connected account:', userAccount);
            
            // Only initialize contract if we have a valid address
            if (CONTRACT_ADDRESS && CONTRACT_ADDRESS !== "YOUR_DEPLOYED_CONTRACT_ADDRESS") {
                contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
                console.log('Contract initialized:', CONTRACT_ADDRESS);
            } else {
                console.warn('Contract address not set or invalid');
            }
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts) => {
                userAccount = accounts[0];
                console.log('Account changed to:', userAccount);
            });
            
            // Listen for chain changes
            window.ethereum.on('chainChanged', (chainId) => {
                console.log('Chain changed to:', chainId);
                window.location.reload();
            });
            
            console.log('Web3 initialized successfully');
            return true;
        } catch (error) {
            console.error('Error initializing Web3:', error);
            showError('Failed to initialize Web3. Please check your MetaMask connection.');
            return false;
        }
    } else {
        showError('MetaMask is not installed. Please install MetaMask to use verification features.');
        return false;
    }
}

// Show error message to user
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <span class="error-text">${message}</span>
        </div>
    `;
    
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #f87171;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1100;
        max-width: 350px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.parentNode.removeChild(errorDiv);
                }
            }, 300);
        }
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <span class="success-text">${message}</span>
        </div>
    `;
    
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(34, 197, 94, 0.15);
        border: 1px solid rgba(34, 197, 94, 0.3);
        color: #4ade80;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1100;
        max-width: 350px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
            }, 300);
        }
    }, 3000);
}
// Check if user has paid for a specific IPFS hash
async function checkPaymentStatus(ipfsHash) {
    if (!contract || !userAccount || !ipfsHash) {
        console.warn('Missing contract, account, or IPFS hash');
        return false;
    }
    
    try {
        console.log('Checking payment status for:', ipfsHash);
        const hasPaid = await contract.methods.hasUserPaidForVerification(userAccount, ipfsHash).call();
        console.log('Payment status:', hasPaid);
        return hasPaid;
    } catch (error) {
        console.error('Error checking payment status:', error);
        return false;
    }
}

// Process payment for IPFS verification
async function processPayment(ipfsHash) {
    if (!contract || !userAccount) {
        showError('Please connect your MetaMask wallet first');
        return false;
    }
    
    if (!ipfsHash) {
        showError('Invalid IPFS hash');
        return false;
    }
    
    try {
        console.log('Processing payment for:', ipfsHash);
        
        // Get current price from contract
        const priceInWei = await contract.methods.verificationPrice().call();
        console.log('Price in wei:', priceInWei);
        
        // Estimate gas
        const gasEstimate = await contract.methods.payForVerification(ipfsHash).estimateGas({
            from: userAccount,
            value: priceInWei
        });
        console.log('Gas estimate:', gasEstimate);
        
        // Send payment transaction
        const transaction = await contract.methods.payForVerification(ipfsHash).send({
            from: userAccount,
            value: priceInWei,
            gas: Math.floor(gasEstimate * 1.2) // Add 20% buffer
        });
        
        console.log('Payment successful:', transaction.transactionHash);
        return true;
    } catch (error) {
        console.error('Payment failed:', error);
        
        // Handle specific error cases
        if (error.message.includes('insufficient funds')) {
            showError('Insufficient tFIL balance. Please add more tFIL to your wallet.');
        } else if (error.message.includes('user rejected')) {
            showError('Transaction cancelled by user.');
        } else {
            showError('Payment failed. Please try again.');
        }
        return false;
    }
}

// Show payment modal
function showPaymentModal(ipfsHash) {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.className = 'payment-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Blockchain Verification</h3>
                <p>Verify this AI response's authenticity and immutability on the decentralized web.</p>
                <p>
                    Once verified, this response will be permanently stored on IPFS with cryptographic proof of integrity.
                    <small>Secure • Transparent • Immutable</small>
                </p>
                <div class="verification-benefits">
                    <div class="benefit-item">
                        <span>Tamper-proof verification</span>
                    </div>
                    <div class="benefit-item">
                        <span>Decentralized storage</span>
                    </div>
                    <div class="benefit-item">
                        <span>Instant blockchain confirmation</span>
                    </div>
                </div>
                <p>
                    Verification cost: <span class="price-highlight">0.01 tFIL</span>
                    <small>Connected to Filecoin Calibration Testnet</small>
                </p>
                <div class="modal-buttons">
                    <button id="pay-btn" class="pay-button">
                        <span class="button-text">Pay & Verify</span>
                    </button>
                    <button id="cancel-btn" class="cancel-button">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add enhanced button event listeners
        const payButton = document.getElementById('pay-btn');
        const cancelButton = document.getElementById('cancel-btn');
        
        payButton.addEventListener('click', async () => {
            // Add loading state
            payButton.classList.add('loading');
            payButton.disabled = true;
            
            const success = await processPayment(ipfsHash);
            
            if (success) {
                // Show success state briefly before closing
                payButton.classList.remove('loading');
                payButton.innerHTML = '<span class="button-text">Payment Successful!</span>';
                payButton.style.background = 'linear-gradient(135deg, #065f46 0%, #047857 100%)';
                payButton.style.borderColor = 'rgba(110, 231, 183, 0.3)';
                
                setTimeout(() => {
                    document.body.removeChild(modal);
                    resolve(true);
                }, 1500);
            } else {
                // Reset button on failure
                payButton.classList.remove('loading');
                payButton.disabled = false;
                payButton.innerHTML = '<span class="button-text">Pay & Verify</span>';
            }
        });
        
        cancelButton.addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve(false);
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                resolve(false);
            }
        });
        
        // Add escape key handler
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', escapeHandler);
                resolve(false);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    });
}


// Enhanced verify function with payment check
async function verifyWithPayment(ipfsHash) {
    console.log('Verify with payment called for:', ipfsHash);
    
    // Initialize Web3 if not already done
    if (!web3) {
        console.log('Web3 not initialized, initializing...');
        const initialized = await initializeWeb3();
        if (!initialized) {
            console.error('Failed to initialize Web3');
            return;
        }
    }
    
    // Check if contract is available
    if (!contract) {
        showError('Smart contract not available. Please check your connection.');
        return;
    }
    
    try {
        // Check if user has already paid for this verification
        const hasPaid = await checkPaymentStatus(ipfsHash);
        
        if (hasPaid) {
            console.log('User has already paid, redirecting to IPFS');
            showSuccess('Opening verified response on IPFS...');
            // User has already paid, redirect to IPFS
            const ipfsUrl = `https://gateway.lighthouse.storage/ipfs/${ipfsHash}`;
            window.open(ipfsUrl, '_blank');
        } else {
            console.log('User needs to pay');
            // User needs to pay
            const paymentSuccess = await showPaymentModal(ipfsHash);
            
            if (paymentSuccess) {
                console.log('Payment successful, redirecting to IPFS');
                showSuccess('Payment confirmed! Opening verified response...');
                // Payment successful, redirect to IPFS
                const ipfsUrl = `https://gateway.lighthouse.storage/ipfs/${ipfsHash}`;
                window.open(ipfsUrl, '_blank');
            }
        }
    } catch (error) {
        console.error('Error in verifyWithPayment:', error);
        showError('Verification failed. Please try again.');
    }
}