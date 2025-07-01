import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism-dark.css';
import LoadingSpinner from './LoadingSpinner';
import { compilerService } from '../Services/compilerService';

const ModernCompiler = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [isServiceHealthy, setIsServiceHealthy] = useState(true);
  const editorRef = useRef(null);

  const supportedLanguages = compilerService.getSupportedLanguages();
  const currentLanguageConfig = supportedLanguages.find(lang => lang.key === language);

  // Get syntax highlighter for current language
  const getSyntaxHighlighter = (language) => {
    switch (language) {
      case 'cpp':
      case 'c':
        return languages.clike;
      case 'java':
        return languages.clike;
      case 'py':
        return languages.python;
      case 'js':
        return languages.javascript;
      default:
        return languages.clike;
    }
  };

  // Initialize with template code
  useEffect(() => {
    const langConfig = supportedLanguages.find(lang => lang.key === language);
    setCode(langConfig?.template || '');
    setOutput('');
    setError('');
  }, [language]);

  // Check service health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await compilerService.checkHealth();
        setIsServiceHealthy(true);
      } catch (error) {
        setIsServiceHealthy(false);
        console.warn('Compiler service health check failed:', error);
      }
    };
    
    checkHealth();
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setOutput('');
    setError('');
  };

  const executeCode = async () => {
    if (!code.trim()) {
      setError('Please enter some code to execute');
      return;
    }

    if (!isServiceHealthy) {
      setError('Compiler service is currently unavailable. Please try again later.');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    try {
      const result = await compilerService.executeCode({
        code,
        input,
        language
      });

      if (result && result.output !== undefined) {
        setOutput(result.output || 'No output generated');
      } else {
        setError('No output received from server');
      }
    } catch (error) {
      console.error('Execution error:', error);
      setError(error.message || 'Failed to execute code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearEditor = () => {
    const langConfig = supportedLanguages.find(lang => lang.key === language);
    setCode(langConfig?.template || '');
    setOutput('');
    setError('');
    setInput('');
  };

  const downloadCode = () => {
    const langConfig = supportedLanguages.find(lang => lang.key === language);
    const extension = langConfig?.extension || 'txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `algohelix-code.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getQuickExample = (type) => {
    const examples = {
      hello: {
        cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, AlgoHelix!" << endl;
    return 0;
}`,
        py: `print("Hello, AlgoHelix!")`,
        java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, AlgoHelix!");
    }
}`,
        c: `#include <stdio.h>

int main() {
    printf("Hello, AlgoHelix!\\n");
    return 0;
}`
      },
      loop: {
        cpp: `#include <iostream>
using namespace std;

int main() {
    for(int i = 0; i < 5; i++) {
        cout << "Number: " << i << endl;
    }
    return 0;
}`,
        py: `for i in range(5):
    print(f"Number: {i}")`,
        java: `public class Main {
    public static void main(String[] args) {
        for(int i = 0; i < 5; i++) {
            System.out.println("Number: " + i);
        }
    }
}`,
        c: `#include <stdio.h>

int main() {
    for(int i = 0; i < 5; i++) {
        printf("Number: %d\\n", i);
    }
    return 0;
}`
      }
    };
    
    return examples[type][language] || examples[type]['cpp'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Service Status Indicator */}
        {!isServiceHealthy && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <div className="flex items-center space-x-2 text-red-400">
              <span>⚠️</span>
              <span>Compiler service is currently unavailable. Some features may not work.</span>
            </div>
          </motion.div>
        )}

        {/* Main Compiler Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left Panel - Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="xl:col-span-2 space-y-4"
          >
            
            {/* Language Selector and Controls */}
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                
                {/* Language Tabs */}
                <div className="flex space-x-2">
                  {supportedLanguages.map((langConfig) => (
                    <motion.button
                      key={langConfig.key}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLanguageChange(langConfig.key)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                        language === langConfig.key
                          ? `bg-gradient-to-r ${langConfig.color} text-white shadow-lg`
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                      }`}
                    >
                      <span>{langConfig.icon}</span>
                      <span>{langConfig.name}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Editor Controls */}
                <div className="flex items-center space-x-3">
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="px-3 py-1 bg-gray-700 text-white rounded-lg text-sm border border-gray-600 focus:border-cyan-400 focus:outline-none"
                  >
                    <option value={12}>12px</option>
                    <option value={14}>14px</option>
                    <option value={16}>16px</option>
                    <option value={18}>18px</option>
                  </select>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearEditor}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm transition-colors duration-300"
                  >
                    Clear
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadCode}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors duration-300"
                  >
                    Download
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 overflow-hidden">
              <div className="bg-gray-900/50 px-4 py-2 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-4">
                      main.{currentLanguageConfig?.extension || 'txt'}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    Lines: {code.split('\n').length}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Editor
                  ref={editorRef}
                  value={code}
                  onValueChange={setCode}
                  highlight={(code) => highlight(code, getSyntaxHighlighter(language))}
                  padding={20}
                  style={{
                    fontFamily: '"Fira Code", "Fira Mono", Consolas, monospace',
                    fontSize: fontSize,
                    backgroundColor: 'transparent',
                    minHeight: '400px',
                    color: '#ffffff',
                  }}
                  placeholder="Write your code here..."
                  className="focus:outline-none"
                />
              </div>
            </div>

            {/* Execute Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={executeCode}
              disabled={loading || !isServiceHealthy}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                loading || !isServiceHealthy
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : `bg-gradient-to-r ${currentLanguageConfig?.color || 'from-cyan-500 to-purple-500'} text-white shadow-lg hover:shadow-xl`
              }`}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" color="cyan" />
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <span>▶️</span>
                  <span>Run Code</span>
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Right Panel - Input/Output */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            
            {/* Input Section */}
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 overflow-hidden">
              <div className="bg-gray-900/50 px-4 py-2 border-b border-gray-700/50">
                <h3 className="text-white font-semibold flex items-center space-x-2">
                  <span>📝</span>
                  <span>Input</span>
                </h3>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input for your program..."
                className="w-full h-32 p-4 bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none"
              />
            </div>

            {/* Output Section */}
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 overflow-hidden flex-1">
              <div className="bg-gray-900/50 px-4 py-2 border-b border-gray-700/50">
                <h3 className="text-white font-semibold flex items-center space-x-2">
                  <span>💻</span>
                  <span>Output</span>
                </h3>
              </div>
              
              <div className="p-4 min-h-64">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center h-32"
                    >
                      <LoadingSpinner size="lg" color="cyan" />
                    </motion.div>
                  ) : error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4"
                    >
                      <div className="flex items-start space-x-2">
                        <span className="text-red-500">❌</span>
                        <div>
                          <div className="font-semibold mb-1">Error</div>
                          <div className="text-sm">{error}</div>
                        </div>
                      </div>
                    </motion.div>
                  ) : output ? (
                    <motion.div
                      key="output"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-4"
                    >
                      <div className="flex items-start space-x-2 mb-2">
                        <span className="text-green-500">✅</span>
                        <div className="font-semibold">Output</div>
                      </div>
                      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
                        {output}
                      </pre>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-400 text-center py-8"
                    >
                      <div className="text-4xl mb-2">🚀</div>
                      <div>Click "Run Code" to see output here</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Quick Examples */}
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <span>⚡</span>
                <span>Quick Examples</span>
              </h3>
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCode(getQuickExample('hello'))}
                  className="w-full text-left px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-sm text-gray-300 transition-colors duration-300"
                >
                  Hello World
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCode(getQuickExample('loop'))}
                  className="w-full text-left px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-sm text-gray-300 transition-colors duration-300"
                >
                  Loop Example
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernCompiler;
