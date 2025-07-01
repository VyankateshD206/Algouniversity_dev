import axios from 'axios';

const COMPILER_BASE_URL = import.meta.env.VITE_COMPILER_URL || 'https://localhost:8000';

// Create axios instance with default config
const compilerAPI = axios.create({
  baseURL: COMPILER_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
compilerAPI.interceptors.request.use(
  (config) => {
    console.log('Compiler API Request:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
compilerAPI.interceptors.response.use(
  (response) => {
    console.log('Compiler API Response:', response);
    return response;
  },
  (error) => {
    console.error('Compiler API Error:', error);
    
    // Enhanced error handling
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - your code might be taking too long to execute');
    }
    
    if (error.response?.status === 500) {
      throw new Error('Server error - please try again later');
    }
    
    if (error.response?.status === 429) {
      throw new Error('Too many requests - please wait before trying again');
    }
    
    if (!error.response) {
      throw new Error('Network error - please check your internet connection');
    }
    
    throw error;
  }
);

export const compilerService = {
  // Execute code
  executeCode: async (codeData) => {
    try {
      const response = await compilerAPI.post('/run', codeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check compiler service health
  checkHealth: async () => {
    try {
      const response = await compilerAPI.get('/');
      return response.data;
    } catch (error) {
      throw new Error('Compiler service is unavailable');
    }
  },

  // Get supported languages
  getSupportedLanguages: () => {
    return [
      { 
        key: 'cpp', 
        name: 'C++', 
        icon: '⚡', 
        color: 'from-blue-500 to-cyan-500',
        extension: 'cpp',
        template: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, AlgoHelix!" << endl;
    return 0;
}`
      },
      { 
        key: 'py', 
        name: 'Python', 
        icon: '🐍', 
        color: 'from-green-500 to-teal-500',
        extension: 'py',
        template: `# Welcome to AlgoHelix Compiler
print("Hello, AlgoHelix!")`
      },
      { 
        key: 'java', 
        name: 'Java', 
        icon: '☕', 
        color: 'from-orange-500 to-red-500',
        extension: 'java',
        template: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, AlgoHelix!");
    }
}`
      },
      { 
        key: 'c', 
        name: 'C', 
        icon: '🔧', 
        color: 'from-gray-500 to-blue-500',
        extension: 'c',
        template: `#include <stdio.h>

int main() {
    printf("Hello, AlgoHelix!\\n");
    return 0;
}`
      }
    ];
  }
};

export default compilerService;
