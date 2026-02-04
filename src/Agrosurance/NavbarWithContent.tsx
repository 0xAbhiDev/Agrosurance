import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { 
  FaWallet, FaLeaf, FaUserCircle, FaBars, FaTimes, 
  FaCloudRain, FaTemperatureHigh, FaTint, FaUmbrella,
  FaUsers, FaInfoCircle, FaSignInAlt, FaChartLine,
  FaSeedling, FaSun, FaWind
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    ethereum?: any;
  }
}

type WalletInfo = {
  address: string | null;
  balance: string | null;
};

type NavItem = {
  id: string;
  label: string;
  icon: JSX.Element;
  content: JSX.Element;
};

async function loadBlockChainData() {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const balance = await provider.getBalance(accounts[0]);

      console.log('Accounts:', accounts);
      console.log('Balance:', ethers.formatEther(balance));
    } else {
      console.error('Ethereum provider not found. Please install MetaMask.');
    }
  } catch (error) {
    console.error('Error loading blockchain data:', error);
  }
}

// Floating Background Elements Component
function FloatingElements() {
  const elements = [
    // Leaves floating around
    { icon: FaLeaf, delay: 0, duration: 20, x: 10, y: 15, size: 'text-6xl', color: 'text-green-200' },
    { icon: FaLeaf, delay: 2, duration: 25, x: 85, y: 25, size: 'text-5xl', color: 'text-gray-400' },
    { icon: FaLeaf, delay: 4, duration: 22, x: 65, y: 75, size: 'text-7xl', color: 'text-green-400' },
    { icon: FaLeaf, delay: 6, duration: 18, x: 30, y: 55, size: 'text-4xl', color: 'text-green-300' },
    { icon: FaLeaf, delay: 8, duration: 24, x: 90, y: 45, size: 'text-5xl', color: 'text-green-200' },
    { icon: FaLeaf, delay: 1, duration: 21, x: 5, y: 80, size: 'text-6xl', color: 'text-gray-400' },
    { icon: FaLeaf, delay: 3, duration: 19, x: 95, y: 10, size: 'text-5xl', color: 'text-green-400' },
    { icon: FaLeaf, delay: 5, duration: 23, x: 50, y: 30, size: 'text-4xl', color: 'text-green-300' },
    
    // Seedlings/Plants
    { icon: FaSeedling, delay: 2, duration: 26, x: 20, y: 20, size: 'text-7xl', color: 'text-green-200' },
    { icon: FaSeedling, delay: 4, duration: 22, x: 75, y: 60, size: 'text-6xl', color: 'text-gray-400' },
    { icon: FaSeedling, delay: 6, duration: 20, x: 40, y: 85, size: 'text-5xl', color: 'text-green-400' },
    { icon: FaSeedling, delay: 8, duration: 24, x: 15, y: 40, size: 'text-8xl', color: 'text-green-300' },
    { icon: FaSeedling, delay: 1, duration: 25, x: 88, y: 70, size: 'text-6xl', color: 'text-green-200' },
    
    // Additional nature elements
    { icon: FaSun, delay: 0, duration: 30, x: 92, y: 8, size: 'text-8xl', color: 'text-yellow-300' },
    { icon: FaCloudRain, delay: 3, duration: 28, x: 25, y: 12, size: 'text-7xl', color: 'text-green-300' },
    { icon: FaTint, delay: 5, duration: 15, x: 70, y: 35, size: 'text-5xl', color: 'text-green-400' },
    { icon: FaWind, delay: 2, duration: 17, x: 45, y: 65, size: 'text-6xl', color: 'text-gray-400' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle farm field pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 50px,
          rgba(34, 197, 94, 0.2) 50px,
          rgba(34, 197, 94, 0.2) 51px
        )`
      }}></div>
      
      {elements.map((elem, index) => (
        <motion.div
          key={index}
          className={`absolute ${elem.color} opacity-15`}
          style={{ left: `${elem.x}%`, top: `${elem.y}%` }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.3, 0.9, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: elem.duration,
            delay: elem.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <elem.icon className={elem.size} />
        </motion.div>
      ))}
      
      {/* Falling leaves effect */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`falling-${i}`}
          className="absolute text-green-200 opacity-15"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `-10%`,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <FaLeaf className="text-4xl" />
        </motion.div>
      ))}
    </div>
  );
}

export default function AgrosurancePlatform() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    address: null,
    balance: null,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  // Add San Francisco font
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      
      * {
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const balance = await provider.getBalance(accounts[0]);

        setWalletInfo({
          address: `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
          balance: ethers.formatEther(balance).substring(0, 5),
        });

        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const navItems: NavItem[] = [
    {
      id: 'about',
      label: 'About Us',
      icon: <FaInfoCircle className="mr-2" />,
      content: <AboutSection />
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaChartLine className="mr-2" />,
      content: <DashboardSection />
    },
    {
      id: 'policies',
      label: 'Policies',
      icon: <FaUmbrella className="mr-2" />,
      content: <PoliciesSection />
    },
    {
      id: 'signup',
      label: 'Sign Up',
      icon: <FaSignInAlt className="mr-2" />,
      content: <SignUpSection connectWallet={connectWallet} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black relative">
      <FloatingElements />
      
      {/* Navbar */}
      <nav className="bg-gray-900 bg-opacity-70 backdrop-blur-xl border-b border-gray-800 text-white shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and main nav */}
            <div className="flex items-center">
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }} 
                transition={{ duration: 0.5 }}
                className="flex items-center cursor-pointer"
              >
                <FaLeaf className="h-8 w-8 text-green-400" />
                <motion.span 
                  className="ml-2 text-xl font-semibold text-white"
                  animate={{ 
                    opacity: [1, 0.95, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Agrosurance
                </motion.span>
              </motion.div>

              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium ${
                        activeSection === item.id ? 'bg-gray-700' : 'hover:bg-gray-700 hover:bg-opacity-60'
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon}
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Wallet connection */}
            <div className="flex items-center">
              {isConnected ? (
                <motion.div
                  className="hidden md:flex items-center space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                    whileHover={{ scale: 1.05 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 0px rgba(255,255,255,0.3)",
                        "0 0 10px rgba(255,255,255,0.5)",
                        "0 0 0px rgba(255,255,255,0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {walletInfo.balance} ETH
                  </motion.div>
                  <motion.div
                    className="flex items-center bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 px-3 py-1 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaUserCircle className="mr-2" />
                    <span>{walletInfo.address}</span>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.button
                  onClick={connectWallet}
                  className="hidden cursor-pointer md:flex items-center bg-green-900 bg-opacity-30 backdrop-blur-md border border-green-7000 hover:bg-gray-700 hover:bg-opacity-60 px-4 py-2 rounded-xl text-sm font-medium text-white font-medium"
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaWallet className="mr-2" />
                  Connect Wallet
                </motion.button>
              )}

              {/* Mobile menu button */}
              <motion.button
                onClick={toggleMenu}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-white hover:bg-gray-700 hover:bg-opacity-60 focus:outline-none"
                whileTap={{ scale: 0.9, rotate: 90 }}
              >
                {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-xl border-b border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center w-full text-left px-3 py-2 rounded-xl text-base font-medium ${
                      activeSection === item.id ? 'bg-gray-700' : 'hover:bg-gray-700 hover:bg-opacity-60'
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    {item.icon}
                    {item.label}
                  </motion.button>
                ))}
                {isConnected ? (
                  <motion.div
                    className="pt-4 pb-2 border-t border-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-center px-3 py-2 text-sm">
                      <FaUserCircle className="mr-2" />
                      <span className="truncate">{walletInfo.address}</span>
                    </div>
                    <div className="px-3 py-1 text-sm">Balance: {walletInfo.balance} ETH</div>
                  </motion.div>
                ) : (
                  <motion.button
                    onClick={connectWallet}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white font-medium bg-green-900 bg-opacity-30 backdrop-blur-md border border-green-7000 hover:bg-gray-700 hover:bg-opacity-60"
                    whileHover={{ scale: 1.02 }}
                  >
                    <FaWallet className="mr-2" />
                    Connect Wallet
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.find(item => item.id === activeSection)?.content}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 bg-opacity-70 backdrop-blur-xl border-t border-gray-800 text-white py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <FaLeaf className="mr-2" />
                </motion.div>
                Agrosurance
              </h3>
              <p className="text-gray-400">
                Decentralized crop protection powered by blockchain technology.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map(item => (
                  <li key={item.id}>
                    <motion.button 
                      onClick={() => handleNavClick(item.id)}
                      className="text-gray-400 hover:text-white flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">support@agrosurance.io</p>
              <p className="text-gray-400 mt-2">Farmers DAO, Decentralized</p>
            </motion.div>
          </div>
          <motion.div 
            className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p>© {new Date().getFullYear()} Agrosurance. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm bg-opacity-80 backdrop-blur-sm border border-gray-600 border-opacity-30 p-6 rounded-2xl shadow"
      >
        <div className="text-center mb-8">
          <motion.div 
            className="flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FaLeaf className="text-green-400 text-4xl mr-3" />
            </motion.div>
            <motion.h1 
              className="text-4xl tracking-tight font-semibold text-white"
              animate={{ 
                backgroundImage: [
                  "linear-gradient(to right, #16a34a, #15803d)",
                  "linear-gradient(to right, #15803d, #16a34a)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Agrosurance
            </motion.h1>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Revolutionizing Agricultural Insurance Through Blockchain Technology
          </motion.p>
        </div>

        <div className="prose max-w-none text-gray-300">
          <motion.h2 
            className="text-3xl tracking-tight font-semibold text-white mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            At Agrosurance, we're committed to protecting farmers against nature's unpredictability. 
            Our platform provides automated insurance coverage for:
          </motion.p>
          <motion.ul 
            className="list-disc pl-6 mt-2 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {['Natural Disasters (Floods, Droughts, Cyclones, Storms)', 'Crop Yield Reduction', 'Extreme Weather Events', 'Pest Outbreaks'].map((item, index) => (
              <motion.li
                key={item}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ x: 5, color: "#16a34a" }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm bg-opacity-80 backdrop-blur-sm border border-gray-600 border-opacity-30 p-6 rounded-2xl shadow"
      >
        <h2 className="text-3xl tracking-tight font-semibold text-white mb-6">How We Protect Your Crops</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: <FaLeaf className="text-green-400 text-4xl tracking-tight mb-3" />,
              title: "1. Policy Creation",
              description: "Customize coverage based on crop type, location, and risk factors"
            },
            {
              icon: <FaCloudRain className="text-green-400 text-4xl tracking-tight mb-3" />,
              title: "2. Real-Time Monitoring",
              description: "24/7 tracking using satellite data and IoT sensors"
            },
            {
              icon: <FaUmbrella className="text-yellow-600 text-4xl tracking-tight mb-3" />,
              title: "3. Automatic Claims",
              description: "Smart contracts trigger payouts when thresholds are breached"
            },
            {
              icon: <FaWallet className="text-purple-600 text-4xl tracking-tight mb-3" />,
              title: "4. Instant Payouts",
              description: "Receive funds directly in your crypto wallet within minutes"
            }
          ].map((step, index) => (
            <motion.div
              key={step.title}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm p-4 rounded-2xl text-center"
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {step.icon}
              </motion.div>
              <h3 className="font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm bg-opacity-80 backdrop-blur-sm border border-gray-600 border-opacity-30 p-6 rounded-2xl shadow"
      >
        <h2 className="text-3xl tracking-tight font-semibold text-white mb-6">Our Technology</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              bg: "bg-green-900 bg-opacity-30 backdrop-blur-md border border-green-700",
              title: "Smart Contracts",
              titleColor: "text-white",
              description: "Self-executing insurance policies stored on the Ethereum blockchain. Terms are transparent and unchangeable once deployed."
            },
            {
              bg: "bg-blue-900 bg-opacity-30 backdrop-blur-md border border-blue-600",
              title: "Data Oracles",
              titleColor: "text-white",
              description: "Integrates real-time data from trusted sources",
              list: ["India Meteorological Department", "NASA Earth Observatory", "Local IoT Sensors"]
            },
            {
              bg: "bg-purple-900 bg-opacity-30 backdrop-blur-md border border-purple-600",
              title: "Mobile Access",
              titleColor: "text-white",
              description: "Farmer-friendly mobile interface with SMS alerts and multilingual support for rural accessibility."
            }
          ].map((tech, index) => (
            <motion.div
              key={tech.title}
              className={`${tech.bg} p-4 rounded-2xl`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, 1, -1, 0],
                transition: { duration: 0.3 }
              }}
            >
              <h3 className={`font-semibold ${tech.titleColor} mb-2`}>{tech.title}</h3>
              <p className="text-gray-400">{tech.description}</p>
              {tech.list && (
                <ul className="list-disc pl-5 mt-2">
                  {tech.list.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm bg-opacity-80 backdrop-blur-sm border border-gray-600 border-opacity-30 p-6 rounded-2xl shadow"
      >
        <h2 className="text-3xl tracking-tight font-semibold text-white mb-6">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Abhishek Sharma",
              role: "Co-Founder & CTO",
              bio: "Blockchain architect with 10+ years in fintech solutions",
              expertise: "Smart Contracts, DeFi Systems"
            },
            {
              name: "Utkarsh Saxena",
              role: "Head of Agriculture",
              bio: "Agricultural economist and former FAO consultant",
              expertise: "Crop Risk Modeling"
            },
            {
              name: "Sharad",
              role: "Lead Developer",
              bio: "Full-stack developer specializing in Web3 applications",
              expertise: "DApp Development"
            }
          ].map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm p-4 rounded-2xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <div className="flex items-center mb-3">
                <motion.div 
                  className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center text-white font-semibold mr-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {member.name.charAt(0)}
                </motion.div>
                <div>
                  <h3 className="font-semibold text-white">{member.name}</h3>
                  <p className="text-green-400 text-sm">{member.role}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-2">{member.bio}</p>
              <motion.div 
                className="bg-green-900 bg-opacity-20 px-2 py-1 rounded text-xs text-white"
                whileHover={{ scale: 1.05 }}
              >
                {member.expertise}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Partnerships */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm bg-opacity-80 backdrop-blur-sm border border-gray-600 border-opacity-30 p-6 rounded-2xl shadow"
      >
        <h2 className="text-3xl tracking-tight font-semibold text-white mb-6">Trusted Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          {['ISRO', 'IMD', 'UN FAO', 'ETH Foundation'].map((partner, index) => (
            <motion.div
              key={partner}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-xl p-4 rounded-2xl text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "#f0fdf4",
                transition: { duration: 0.2 }
              }}
            >
              <span className="font-medium text-gray-300">{partner}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center py-8"
      >
        <motion.h3 
          className="text-xl font-semibold text-white mb-4"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Ready to Protect Your Crops?
        </motion.h3>
        <motion.button
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 40px rgba(22, 163, 74, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-gray-700 text-white px-8 py-3 rounded-2xl font-medium"
        >
          Get Started Now
        </motion.button>
      </motion.div>
    </div>
  );
}

// Dashboard Section Component
function DashboardSection() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm bg-opacity-80 backdrop-blur-sm border border-gray-600 border-opacity-30 p-6 rounded-2xl shadow"
      >
        <h2 className="text-3xl tracking-tight font-semibold text-white mb-4 flex items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <FaChartLine className="mr-2" />
          </motion.div>
          Farm Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-green-900 bg-opacity-30 backdrop-blur-md border border-green-700 p-4 rounded-2xl"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold text-white mb-2">Active Policies</h3>
            <motion.p 
              className="text-4xl tracking-tight font-semibold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              2
            </motion.p>
          </motion.div>
          <motion.div 
            className="bg-blue-900 bg-opacity-30 backdrop-blur-md border border-blue-600 p-4 rounded-2xl"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold text-white mb-2">Total Coverage</h3>
            <motion.p 
              className="text-4xl tracking-tight font-semibold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              8 ETH
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <WeatherSection />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm bg-opacity-80 backdrop-blur-sm border border-gray-600 border-opacity-30 p-6 rounded-2xl shadow"
      >
        <h2 className="text-3xl tracking-tight font-semibold text-white mb-4 flex items-center">
          <FaUmbrella className="mr-2" />
          Recent Policies
        </h2>
        <PolicySection />
      </motion.div>
    </div>
  );
}

// Policies Section Component
function PoliciesSection() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm bg-opacity-80 backdrop-blur-sm border border-gray-600 border-opacity-30 p-6 rounded-2xl shadow"
      >
        <h2 className="text-3xl tracking-tight font-semibold text-white mb-2">Available Insurance Plans</h2>
        <p className="text-gray-400 mb-6">
          Protect your crops with our decentralized insurance policies. Premiums are calculated
          based on your location, crop type, and historical weather patterns.
        </p>
        <PolicySection expanded />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm bg-opacity-80 backdrop-blur-sm border border-gray-600 border-opacity-30 p-6 rounded-2xl shadow"
      >
        <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaLeaf className="text-green-400 text-3xl tracking-tight mb-3" />,
              title: "Select Your Crop",
              description: "Choose from our range of supported crops and coverage options"
            },
            {
              icon: <FaCloudRain className="text-green-400 text-3xl tracking-tight mb-3" />,
              title: "Set Parameters",
              description: "Define the weather conditions that trigger your policy"
            },
            {
              icon: <FaWallet className="text-yellow-600 text-3xl tracking-tight mb-3" />,
              title: "Secure Coverage",
              description: "Pay your premium and get protected instantly"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm p-4 rounded-2xl"
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  {item.icon}
                </motion.div>
                <h4 className="font-medium text-white">{item.title}</h4>
                <p className="text-gray-400 text-sm mt-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Sign Up Section Component
function SignUpSection({ connectWallet }: { connectWallet: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    farmLocation: '',
    cropType: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    connectWallet();
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm bg-opacity-80 backdrop-blur-sm border border-gray-600 border-opacity-30 p-8 rounded-2xl shadow-lg"
      >
        <motion.h2 
          className="text-3xl tracking-tight font-semibold text-white mb-6 text-center"
          animate={{ 
            textShadow: [
              "0 0 0px rgba(22, 163, 74, 0)",
              "0 0 20px rgba(22, 163, 74, 0.3)",
              "0 0 0px rgba(22, 163, 74, 0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Join Agrosurance
        </motion.h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Full Name', name: 'name', type: 'text' },
            { label: 'Email Address', name: 'email', type: 'email' },
            { label: 'Farm Location', name: 'farmLocation', type: 'text' }
          ].map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-1">{field.label}</label>
              <motion.input
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-600 rounded-xl focus:ring-green-500 focus:border-gray-600"
                required
                whileFocus={{ scale: 1.02, borderColor: "#16a34a" }}
              />
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-1">Primary Crop Type</label>
            <motion.select
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-xl focus:ring-green-500 focus:border-gray-600"
              required
              whileFocus={{ scale: 1.02, borderColor: "#16a34a" }}
            >
              <option value="">Select a crop</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Corn">Corn</option>
              <option value="Soybean">Soybean</option>
              <option value="Cotton">Cotton</option>
            </motion.select>
          </motion.div>
          
          <motion.button
            type="submit"
            className="w-full bg-gray-700 hover:bg-green-700 text-white py-2 px-4 rounded-xl font-medium flex items-center justify-center"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(22, 163, 74, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: [
                "0 0 0px rgba(22, 163, 74, 0.2)",
                "0 0 20px rgba(22, 163, 74, 0.4)",
                "0 0 0px rgba(22, 163, 74, 0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaWallet className="mr-2" />
            Sign Up & Connect Wallet
          </motion.button>
        </form>
        
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account? <motion.button 
            className="text-green-400 font-medium"
            whileHover={{ scale: 1.1 }}
          >
            Sign In
          </motion.button>
        </p>
      </motion.div>
    </div>
  );
}

// Weather Section Component
function WeatherSection() {
  const weatherData = [
    { icon: <FaTemperatureHigh />, title: 'Temperature', value: '28°C', trend: '↑', color: 'text-white' },
    { icon: <FaCloudRain />, title: 'Rainfall', value: '2.5mm', trend: '↓', color: 'text-green-400' },
    { icon: <FaTint />, title: 'Soil Moisture', value: '65%', trend: '→', color: 'text-green-400' },
  ];

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm bg-opacity-80 backdrop-blur-sm border border-gray-600 border-opacity-30 rounded-xl shadow-md p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <h2 className="text-3xl tracking-tight font-semibold mb-4 flex items-center">
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaCloudRain className="mr-2" />
        </motion.div>
        Current Weather Conditions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {weatherData.map((item, index) => (
          <motion.div
            key={item.title}
            className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              y: -5
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-center text-gray-400 mb-2">
              <motion.div
                className={item.color}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                {item.icon}
              </motion.div>
              <h3 className="ml-2 text-sm font-medium">{item.title}</h3>
            </div>
            <div className="flex items-center">
              <motion.span 
                className="text-3xl tracking-tight font-semibold text-white"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                {item.value}
              </motion.span>
              <motion.span 
                className="ml-2 text-sm font-medium text-gray-400"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {item.trend}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Policy Section Component
function PolicySection({ expanded = false }) {
  const policies = [
    { cropType: 'Wheat', coverage: '5 ETH', premium: '0.5 ETH', status: 'Active' },
    { cropType: 'Rice', coverage: '3 ETH', premium: '0.3 ETH', status: 'Pending' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm">
          <tr>
            {['Crop Type', 'Coverage', 'Premium', 'Status'].map((header) => (
              <motion.th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {header}
              </motion.th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-800 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm bg-opacity-80 backdrop-blur-sm border border-gray-600 border-opacity-30 divide-y divide-gray-700">
          {policies.map((policy, index) => (
            <motion.tr
              key={policy.cropType}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="hover:bg-gray-700 hover:bg-opacity-60 bg-opacity-50 backdrop-blur-xl bg-opacity-50 backdrop-blur-sm"
              whileHover={{ 
                scale: 1.01,
                backgroundColor: "#f9fafb"
              }}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {policy.cropType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {policy.coverage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {policy.premium}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <motion.span 
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    policy.status === 'Active' 
                      ? 'bg-green-900 bg-opacity-20 text-white' 
                      : 'bg-yellow-100 text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    boxShadow: policy.status === 'Active' 
                      ? [
                          "0 0 0px rgba(22, 163, 74, 0.3)",
                          "0 0 10px rgba(22, 163, 74, 0.5)",
                          "0 0 0px rgba(22, 163, 74, 0.3)"
                        ]
                      : [
                          "0 0 0px rgba(234, 179, 8, 0.3)",
                          "0 0 10px rgba(234, 179, 8, 0.5)",
                          "0 0 0px rgba(234, 179, 8, 0.3)"
                        ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {policy.status}
                </motion.span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}