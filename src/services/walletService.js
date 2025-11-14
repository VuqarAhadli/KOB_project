/**
 * Wallet Service for MetaMask and other Ethereum wallet connections
 */

// Check if MetaMask is installed
export const isMetaMaskInstalled = () => {
  return (
    typeof window !== "undefined" && typeof window.ethereum !== "undefined"
  );
};

// Get the Ethereum provider
export const getEthereumProvider = () => {
  if (isMetaMaskInstalled()) {
    return window.ethereum;
  }
  return null;
};

// Sepolia Testnet Chain ID
const SEPOLIA_CHAIN_ID = "0xaa36a7"; // 11155111 in hex

// Switch to Sepolia testnet
export const switchToSepolia = async () => {
  try {
    if (!isMetaMaskInstalled()) {
      throw new Error(
        "MetaMask yüklənmiş deyil. Zəhmət olmasa MetaMask genişləndirməsini quraşdırın."
      );
    }

    const provider = getEthereumProvider();

    try {
      // Try to switch to Sepolia
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        // Add Sepolia network to MetaMask
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: SEPOLIA_CHAIN_ID,
              chainName: "Sepolia Test Network",
              nativeCurrency: {
                name: "Ether",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: [
                "https://rpc.sepolia.org",
                "https://sepolia.infura.io/v3/",
              ],
              blockExplorerUrls: ["https://sepolia.etherscan.io"],
            },
          ],
        });
      } else {
        throw switchError;
      }
    }
  } catch (error) {
    if (error.code === 4001) {
      throw new Error("İstifadəçi şəbəkə dəyişikliyini rədd etdi");
    }
    throw error;
  }
};

// Request account access
export const connectWallet = async () => {
  try {
    if (!isMetaMaskInstalled()) {
      throw new Error(
        "MetaMask yüklənmiş deyil. Zəhmət olmasa MetaMask genişləndirməsini quraşdırın."
      );
    }

    const provider = getEthereumProvider();

    // Switch to Sepolia testnet first
    await switchToSepolia();

    // Request account access
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length === 0) {
      throw new Error("Hesab seçilmədi");
    }

    const address = accounts[0];

    // Get chain ID
    const chainId = await provider.request({ method: "eth_chainId" });
    const chainIdNumber = parseInt(chainId, 16);

    return {
      address,
      chainId: chainIdNumber,
      provider,
    };
  } catch (error) {
    if (error.code === 4001) {
      throw new Error("İstifadəçi bağlantı istəyini rədd etdi");
    }
    throw error;
  }
};

// Get current connected account
export const getCurrentAccount = async () => {
  try {
    if (!isMetaMaskInstalled()) {
      return null;
    }

    const provider = getEthereumProvider();
    const accounts = await provider.request({ method: "eth_accounts" });

    if (accounts.length === 0) {
      return null;
    }

    return accounts[0];
  } catch (error) {
    console.error("Error getting current account:", error);
    return null;
  }
};

// Disconnect wallet (just clear local storage, actual disconnect is handled by MetaMask)
export const disconnectWallet = () => {
  // MetaMask doesn't have a disconnect method, so we just clear local data
  return true;
};

// Format address for display
export const formatAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Listen for account changes
export const onAccountsChanged = (callback) => {
  if (!isMetaMaskInstalled()) {
    return null;
  }

  const provider = getEthereumProvider();
  provider.on("accountsChanged", callback);

  return () => {
    provider.removeListener("accountsChanged", callback);
  };
};

// Listen for chain changes
export const onChainChanged = (callback) => {
  if (!isMetaMaskInstalled()) {
    return null;
  }

  const provider = getEthereumProvider();
  provider.on("chainChanged", callback);

  return () => {
    provider.removeListener("chainChanged", callback);
  };
};
