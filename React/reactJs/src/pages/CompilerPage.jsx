import React from 'react';
import { motion } from 'framer-motion';
import ModernCompiler from '../Components/ModernCompiler';

const CompilerPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/40 backdrop-blur-lg border-b border-gray-700/50"
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                Code Compiler
              </h1>
              <p className="text-gray-400 text-lg">
                Write, compile, and execute code in multiple programming languages
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden md:flex space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">4</div>
                <div className="text-sm text-gray-400">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">∞</div>
                <div className="text-sm text-gray-400">Executions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-gray-400">Available</div>
              </div>
            </div>
          </div>
          
          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 flex flex-wrap gap-4"
          >
            {[
              { icon: '⚡', text: 'Fast Execution', color: 'text-yellow-400' },
              { icon: '🔒', text: 'Secure Environment', color: 'text-green-400' },
              { icon: '💾', text: 'Save & Download', color: 'text-blue-400' },
              { icon: '🎨', text: 'Syntax Highlighting', color: 'text-purple-400' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center space-x-2 bg-gray-700/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-600/30"
              >
                <span className={`text-lg ${feature.color}`}>{feature.icon}</span>
                <span className="text-gray-300 text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Compiler Component */}
      <div className="relative">
        <ModernCompiler />
      </div>
    </motion.div>
  );
};

export default CompilerPage;
