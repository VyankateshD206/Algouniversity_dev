import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRef } from "react";
import { motion } from "framer-motion";

const aiFeatures = [
  {
    title: "Smart Code Suggestions",
    desc: "AI analyzes your code and suggests improvements in real-time.",
    icon: "✨",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    title: "Automated Test Case Generation",
    desc: "Generate edge cases and tests automatically with AI insights.",
    icon: "🧪",
    gradient: "from-green-400 to-blue-500",
  },
  {
    title: "Hints Generation",
    desc: "Get AI-generated hints for faster problem-solving.",
    icon: "💡",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    title: "Code Explanation",
    desc: "Understand what your code is doing with instant AI explanations.",
    icon: "📖",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    title: "Performance Analysis",
    desc: "AI-powered complexity analysis and optimization suggestions.",
    icon: "⚡",
    gradient: "from-red-400 to-pink-500",
  },
  {
    title: "Bug Detection",
    desc: "Intelligent bug detection and suggested fixes powered by AI.",
    icon: "🐛",
    gradient: "from-indigo-400 to-purple-500",
  },
];

export default function AIIntegrations() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative py-20 px-4 text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            AI-Powered Development
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the future of coding with our advanced AI integrations designed to accelerate your learning
          </p>
        </motion.div>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 p-3 rounded-full z-10 shadow-lg backdrop-blur-sm"
            onClick={() => scroll("left")}
          >
            <FaArrowLeft className="text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-cyan-500 p-3 rounded-full z-10 shadow-lg backdrop-blur-sm"
            onClick={() => scroll("right")}
          >
            <FaArrowRight className="text-white" />
          </motion.button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {aiFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                }}
                className="group relative min-w-[300px] max-w-[300px]"
              >
                {/* Glowing background effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl`}></div>
                
                <div className="relative bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl mb-4 inline-block"
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {feature.desc}
                  </p>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: idx * 0.1 + 0.5 }}
                    className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg"
          >
            Experience AI-Powered Coding
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
