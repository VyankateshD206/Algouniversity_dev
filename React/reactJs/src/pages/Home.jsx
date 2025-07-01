import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import AnimatedCodingScene from '../Components/AnimatedCodingScene';
import AIIntegrations from './AIIntegrations';
import { useState, useEffect } from 'react';

const features = [
  {
    title: 'Secure Authentication',
    desc: 'Your data and progress are protected with secure login and HTTPS encryption.',
    icon: '🔐',
    color: 'from-green-400 to-blue-500'
  },
  {
    title: 'Interactive Problemset',
    desc: 'Solve coding problems filtered by difficulty and tags.',
    icon: '🧩',
    color: 'from-purple-400 to-pink-500'
  },
  {
    title: 'AI-Powered Support',
    desc: 'Hints, suggestions, and code feedback powered by AI.',
    icon: '🤖',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    title: 'Online Compiler',
    desc: 'Run your code in multiple languages right from the browser.',
    icon: '⚡',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    title: 'Contest Scheduler',
    desc: 'Stay updated with upcoming contests and challenges.',
    icon: '🏆',
    color: 'from-red-400 to-pink-500'
  },
  {
    title: 'Global Leaderboard',
    desc: 'Compete with developers worldwide and track your progress.',
    icon: '🌍',
    color: 'from-indigo-400 to-purple-500'
  },
];

const CodeFloatingElement = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: [0, 1, 1, 0], 
        y: [50, -20, -40, -100],
        x: [0, 10, -5, 15]
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: 2
      }}
      className="absolute text-2xl font-mono text-purple-400 pointer-events-none"
    >
      {['{ }', '[ ]', '< >', '( )', '+=', '=>', '&&', '||'][Math.floor(Math.random() * 8)]}
    </motion.div>
  );
};

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.5,
      size: Math.random() * 4 + 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: [particle.x + '%', (particle.x + 20) + '%'],
            y: [particle.y + '%', (particle.y - 30) + '%'],
          }}
          transition={{
            duration: 8,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
          style={{ width: particle.size, height: particle.size }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white min-h-screen relative">
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="relative flex flex-col-reverse lg:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto overflow-hidden">
        {/* Floating Code Elements */}
        <div className="absolute top-20 left-20">
          <CodeFloatingElement delay={0} />
        </div>
        <div className="absolute top-40 right-40">
          <CodeFloatingElement delay={1} />
        </div>
        <div className="absolute bottom-40 left-40">
          <CodeFloatingElement delay={2} />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 z-10"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Welcome to
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-8"
            >
              AlgoHelix
            </motion.div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-2xl lg:text-3xl mb-8 text-gray-300 font-light"
          >
            <Typewriter
              words={[
                'Code. Solve. Conquer.',
                'Master Algorithms.',
                'Ace Your Interviews.',
                'Compete Globally.',
                'Build Your Future.',
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl text-gray-400 mb-8 leading-relaxed"
          >
            Spiral into success with our revolutionary coding platform. 
            Master algorithms, solve complex problems, and elevate your programming skills to new heights.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              href="/dashboard/problemset"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 text-center shadow-lg"
            >
              Start Your Journey
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/dashboard/problems"
              className="inline-block border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 text-center"
            >
              Explore Problems
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Animated Coding Scene */}
        <motion.div 
          initial={{ opacity: 0, x: 50, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:w-1/2 mb-10 lg:mb-0 relative"
        >
          <AnimatedCodingScene />
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Why Choose AlgoHelix?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the future of competitive programming with our innovative features
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl"
                     style={{ backgroundImage: `linear-gradient(135deg, ${feature.color})` }}>
                </div>
                
                <div className="relative bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl mb-4 inline-block"
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: idx * 0.1 + 0.5 }}
                    className={`h-1 bg-gradient-to-r ${feature.color} rounded-full mt-6`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative py-20 px-6 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Problems Solved' },
              { number: '5K+', label: 'Active Users' },
              { number: '500+', label: 'Contests Held' },
              { number: '50+', label: 'Countries' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* AI Integrations Carousel */}
      <AIIntegrations />
    </div>
  );
}
