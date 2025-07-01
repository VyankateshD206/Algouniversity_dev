import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { handleLogout } from '../utilities/utils';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Welcome to AlgoHelix!', time: '2m ago' },
    { id: 2, type: 'info', message: 'New contest available', time: '5m ago' }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: '🏠', gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Problems', path: '/dashboard/problemset', icon: '🧩', gradient: 'from-purple-500 to-pink-500' },
    { name: 'Compiler', path: '/dashboard/compiler', icon: '⚡', gradient: 'from-green-500 to-emerald-500' },
    { name: 'Contests', path: '/dashboard/contests', icon: '🏆', gradient: 'from-yellow-500 to-orange-500' },
    { name: 'Submissions', path: '/dashboard/submissions', icon: '📊', gradient: 'from-indigo-500 to-purple-500' },
    { name: 'Leaderboard', path: '/dashboard/leaderboard', icon: '👑', gradient: 'from-red-500 to-pink-500' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo with enhanced animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg relative overflow-hidden"
              >
                {/* Animated helix pattern */}
                <motion.div
                  animate={{ 
                    rotate: -360,
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 3, repeat: Infinity }
                  }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 border-2 border-white/20 rounded-xl transform rotate-12" />
                  <div className="absolute inset-1 border border-white/30 rounded-lg transform -rotate-12" />
                </motion.div>
                
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                />
                <span className="relative z-10">⚡</span>
              </motion.div>
              
              {/* Pulsing glow effect */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-500/30 rounded-xl blur-md"
              />
            </div>
            
            <div className="hidden sm:block">
              <motion.h1 
                whileHover={{ 
                  backgroundPosition: ['0%', '100%'],
                }}
                transition={{ duration: 1 }}
                className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-300% animate-gradient-x"
              >
                AlgoHelix
              </motion.h1>
              <div className="flex items-center space-x-2">
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-gray-400 -mt-1 font-medium"
                >
                  Spiral into Excellence
                </motion.p>
                {/* Live status indicator */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center space-x-1"
                >
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-xs text-green-400 font-medium">LIVE</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => navigate(item.path)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  isActivePath(item.path)
                    ? 'text-white bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/40 backdrop-blur-sm'
                }`}
              >
                <motion.span 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-sm"
                >
                  {item.icon}
                </motion.span>
                <span className="text-sm font-semibold">{item.name}</span>
                
                {/* Active indicator */}
                {isActivePath(item.path) && (
                  <>
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 rounded-xl`}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${item.gradient} rounded-full`}
                    />
                  </>
                )}
                
                {/* Hover glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-5 rounded-xl blur-sm`}
                />
              </motion.button>
            ))}
          </div>

          {/* Right Side - User Menu */}
          <div className="flex items-center space-x-4">
            {/* Coding Progress Indicator */}
            <div className="hidden xl:flex items-center space-x-3 px-4 py-2 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/30">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                <span className="text-xs text-gray-400">Coding Streak</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-20 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
                  />
                </div>
                <span className="text-xs text-green-400 font-medium">7 days</span>
              </div>
            </div>

            {/* Notifications */}
            <div className="hidden lg:block relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-gray-800/50"
              >
                <span className="text-xl">🔔</span>
                {notifications.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
                  >
                    {notifications.length}
                  </motion.div>
                )}
              </motion.button>
            </div>

            {/* Quick Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard/compiler')}
                className="group relative px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 overflow-hidden"
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <span className="relative z-10 flex items-center space-x-2">
                  <span>⚡</span>
                  <span>Quick Compile</span>
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard/problemset')}
                className="group relative px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <span className="relative z-10 flex items-center space-x-2">
                  <span>🧩</span>
                  <span>Solve</span>
                </span>
              </motion.button>
            </div>

            {/* User Profile */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
              >
                {user ? (
                  <>
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-white text-sm font-medium">{user.name}</p>
                      <p className="text-gray-400 text-xs">{user.email}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-gray-400 text-sm">👤</span>
                    </div>
                    <span className="text-gray-400 text-sm">Guest</span>
                  </div>
                )}
                <motion.div
                  animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400"
                >
                  ▼
                </motion.div>
              </motion.button>

              {/* User Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden"
                  >
                    {user ? (
                      <>
                        <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-gray-700/50">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-white font-medium">{user.name}</p>
                              <p className="text-gray-400 text-sm">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-2">
                          <button onClick={() => navigate('/dashboard')} className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
                            <span className="text-cyan-400">📊</span>
                            <span className="text-white">Dashboard</span>
                          </button>
                          <button onClick={() => navigate('/profile')} className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
                            <span className="text-purple-400">⚙️</span>
                            <span className="text-white">Profile Settings</span>
                          </button>
                          <button onClick={() => navigate('/achievements')} className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
                            <span className="text-yellow-400">🏅</span>
                            <span className="text-white">Achievements</span>
                          </button>
                        </div>
                        
                        <div className="border-t border-gray-700/50 p-2">
                          <button
                            onClick={() => handleLogout(dispatch, navigate)}
                            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors duration-200 text-red-400 hover:text-red-300"
                          >
                            <span>🚪</span>
                            <span>Logout</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-4">
                        <p className="text-gray-400 text-sm mb-3">Not logged in</p>
                        <div className="space-y-2">
                          <button onClick={() => navigate('/login')} className="block w-full text-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
                            Sign In
                          </button>
                          <button onClick={() => navigate('/register')} className="block w-full text-center px-4 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-all duration-300">
                            Sign Up
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : ''}`}></span>
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-lg rounded-b-xl border-t border-gray-800"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActivePath(item.path)
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
