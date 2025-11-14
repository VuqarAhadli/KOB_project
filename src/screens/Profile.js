import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Building,
  Mail,
  Phone,
  Edit,
  Save,
  X,
  Lock,
  Calendar,
  Shield,
  Wallet,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import {
  connectWallet,
  isMetaMaskInstalled,
  getCurrentAccount,
  formatAddress,
  onAccountsChanged,
  onChainChanged,
} from "../services/walletService";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });
  const [success, setSuccess] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || "",
        company: parsedUser.company || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
      });

      // Check if wallet is already connected
      if (parsedUser.walletAddress) {
        setWalletAddress(parsedUser.walletAddress);
        setChainId(parsedUser.chainId);
      } else {
        // Try to get current account
        getCurrentAccount().then((address) => {
          if (address) {
            setWalletAddress(address);
          }
        });
      }
    }

    // Listen for account changes
    const unsubscribeAccounts = onAccountsChanged((accounts) => {
      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        // Update user data
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          const updatedUser = {
            ...parsedUser,
            walletAddress: address,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      } else {
        setWalletAddress("");
      }
    });

    // Listen for chain changes
    const unsubscribeChain = onChainChanged((chainId) => {
      const chainIdNumber = parseInt(chainId, 16);
      setChainId(chainIdNumber);
      // Update user data
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        const updatedUser = {
          ...parsedUser,
          chainId: chainIdNumber,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    });

    return () => {
      if (unsubscribeAccounts) unsubscribeAccounts();
      if (unsubscribeChain) unsubscribeChain();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    setSuccess("Profil məlumatları uğurla yeniləndi!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      company: user?.company || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setSuccess("");
    try {
      if (!isMetaMaskInstalled()) {
        setSuccess("");
        alert(
          "MetaMask yüklənmiş deyil. Zəhmət olmasa MetaMask genişləndirməsini quraşdırın.\n\nMetaMask yükləmək üçün: https://metamask.io"
        );
        setIsConnecting(false);
        return;
      }

      const walletData = await connectWallet();
      const { address, chainId: chain } = walletData;

      setWalletAddress(address);
      setChainId(chain);

      // Update user data
      const updatedUser = {
        ...user,
        walletAddress: address,
        chainId: chain,
        provider: user?.provider || "wallet",
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccess("Cüzdan uğurla bağlandı!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setSuccess("");
      alert(error.message || "Cüzdan bağlantısında xəta baş verdi.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectWallet = () => {
    setWalletAddress("");
    setChainId(null);
    const updatedUser = {
      ...user,
      walletAddress: null,
      chainId: null,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setSuccess("Cüzdan bağlantısı kəsildi");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getChainName = (chainId) => {
    const chains = {
      1: "Ethereum Mainnet",
      5: "Goerli Testnet",
      11155111: "Sepolia Testnet",
      137: "Polygon",
      80001: "Mumbai Testnet",
      56: "BSC",
      97: "BSC Testnet",
    };
    return chains[chainId] || `Chain ID: ${chainId}`;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Profil</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            ← Geri
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-gray-200">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user.name || "İstifadəçi"}
              </h2>
              <p className="text-gray-600 mb-2">
                {user.company || "Şirkət adı yoxdur"}
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" />
                <span>{user.email || "Email yoxdur"}</span>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Redaktə et</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Saxla</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Ləğv et</span>
                </button>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Ad və Soyad</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Adınızı daxil edin"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded-lg text-gray-900">
                  {user.name || "Məlumat yoxdur"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>Şirkət adı</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Şirkət adını daxil edin"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded-lg text-gray-900">
                  {user.company || "Məlumat yoxdur"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email ünvanınızı daxil edin"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded-lg text-gray-900">
                  {user.email || "Məlumat yoxdur"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Telefon</span>
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+994 XX XXX XX XX"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded-lg text-gray-900">
                  {user.phone || "Məlumat yoxdur"}
                </p>
              )}
            </div>
          </div>

          {/* Account Info Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Hesab Məlumatları</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Hesab növü</p>
                <p className="font-medium text-gray-900">Freemium</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1 flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Qeydiyyat tarixi</span>
                </p>
                <p className="font-medium text-gray-900">
                  {new Date().toLocaleDateString("az-AZ", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Təhlükəsizlik</span>
            </h3>
            <div className="space-y-3">
              <button className="w-full md:w-auto px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Şifrəni dəyiş
              </button>
              <p className="text-sm text-gray-500">
                Demo rejimdə şifrə dəyişikliyi funksiyası aktiv deyil
              </p>
            </div>
          </div>

          {/* Wallet Connection Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Wallet className="w-5 h-5" />
              <span>Kripto Cüzdan</span>
            </h3>

            {walletAddress ? (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Bağlı cüzdan</p>
                        <p className="font-mono text-sm font-semibold text-gray-900">
                          {formatAddress(walletAddress)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyAddress}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                      title="Kopyala"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {chainId && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">Şəbəkə</p>
                      <p className="text-sm font-medium text-gray-900">
                        {getChainName(chainId)}
                      </p>
                    </div>
                  )}

                  <div className="mt-3 flex items-center space-x-2">
                    <a
                      href={
                        chainId === 11155111
                          ? `https://sepolia.etherscan.io/address/${walletAddress}`
                          : `https://etherscan.io/address/${walletAddress}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <span>
                        {chainId === 11155111
                          ? "Sepolia Etherscan-də görüntülə"
                          : "Etherscan-də görüntülə"}
                      </span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleDisconnectWallet}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Cüzdanı ayır</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    MetaMask və ya digər Ethereum cüzdanınızı bağlayın
                  </p>
                  <button
                    onClick={handleConnectWallet}
                    disabled={isConnecting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>
                      {isConnecting ? "Bağlanır..." : "MetaMask ilə bağla"}
                    </span>
                  </button>
                </div>

                {!isMetaMaskInstalled() && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800 mb-2">
                      <strong>MetaMask yüklənmiş deyil</strong>
                    </p>
                    <p className="text-xs text-yellow-700 mb-3">
                      MetaMask genişləndirməsini quraşdırmaq üçün:
                    </p>
                    <a
                      href="https://metamask.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <span>metamask.io</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
