import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const AnimatedCodingScene = () => {
  const [currentCode, setCurrentCode] = useState(0);
  
  const codeSnippets = [
    "function solve()",
    "  algorithm.run()",
    "  return result",
    "// AlgoHelix",
    "while(learning)",
    "  skills++",
    "success = true"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCode((prev) => (prev + 1) % codeSnippets.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Main Container */}
      <div className="relative w-80 h-80">
        
        {/* Floating Code Editor Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden"
        >
          {/* Editor Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm ml-4">algorithm.js</span>
          </div>
          
          {/* Code Area */}
          <div className="p-4 font-mono text-sm">
            {codeSnippets.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= currentCode ? 1 : 0.3,
                  x: 0,
                  color: index === currentCode ? '#00f5ff' : '#9ca3af'
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-2 text-gray-400"
              >
                <span className="text-purple-400 mr-2">{index + 1}</span>
                {line}
                {index === currentCode && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-1 text-cyan-400"
                  >
                    |
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Elements Around Editor */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
          className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg"
        >
          ⚡
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg"
        >
          🚀
        </motion.div>

        <motion.div
          animate={{ 
            x: [0, 10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute top-1/2 -right-6 w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-lg shadow-lg"
        >
          ✨
        </motion.div>

        {/* Binary Rain Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 400, opacity: [0, 1, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "linear"
              }}
              className="absolute text-cyan-400 text-xs font-mono"
              style={{ left: `${15 + i * 15}%` }}
            >
              {['1', '0', '1', '0', '1'].map((bit, j) => (
                <div key={j} className="mb-2">
                  {bit}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Glow Effect */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-xl"
        />
      </div>
    </div>
  );
};

export default AnimatedCodingScene;
