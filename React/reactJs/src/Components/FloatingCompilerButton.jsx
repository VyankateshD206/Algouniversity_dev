import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FloatingCompilerButton = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <motion.button
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
          boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)"
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/dashboard/compiler')}
        className="group relative w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-xl flex items-center justify-center text-white font-bold text-2xl overflow-hidden"
      >
        {/* Animated background */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
          className="absolute inset-0 bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 opacity-30"
        />
        
        {/* Shine effect */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
        />
        
        {/* Icon */}
        <motion.span
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="relative z-10"
        >
          ⚡
        </motion.span>
        
        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap"
        >
          Quick Compiler
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default FloatingCompilerButton;
