import React from 'react'

const Footer = ()=>{
    return (
        <>
<footer className="relative text-center py-12 mt-20 bg-gradient-to-t from-gray-900 to-transparent">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  AlgoHelix
                </h3>
                <p className="text-gray-400 text-sm">Spiral into coding excellence</p>
              </div>
              
              <div className="flex space-x-6">
                <a href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">About</a>
                <a href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Contact</a>
                <a href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Privacy</a>
                <a href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Terms</a>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} AlgoHelix — Crafted with 💜 using MERN Stack & TailwindCSS
              </p>
            </div>
          </div>
        </footer>
        </>
    )
}

export default Footer;