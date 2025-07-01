import { Typewriter } from 'react-simple-typewriter';
import Lottie from 'lottie-react';
import aiBot from '../assets/ai-bot.json'; // download a Lottie file for this
import AIIntegrations from './AIIntegrations';
import Footer from '../Components/Footer';

const features = [
  {
    title: 'Secure Authentication',
    desc: 'Your data and progress are protected with secure login and HTTPS encryption.',
  },
  {
    title: 'Interactive Problemset',
    desc: 'Solve coding problems filtered by difficulty and tags.',
  },
  {
    title: 'AI-Powered Support',
    desc: 'Hints, suggestions, and code feedback powered by AI.',
  },
  {
    title: 'Online Compiler',
    desc: 'Run your code in multiple languages right from the browser.',
  },
  {
    title: 'Contest Scheduler',
    desc: 'Stay updated with upcoming contests and challenges.',
  },
];

export default function LandingPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">AlgoHelix</span>
          </h1>
          <h2 className="text-2xl mb-6 text-gray-300">
            <Typewriter
              words={[
                'Solve Problems.',
                'Compete in Contests.',
                'Get AI Suggestions.',
                'Become Interview Ready.',
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
          <p className="text-gray-400 mb-6">
            Your all-in-one platform to improve coding skills, prepare for interviews, and compete globally.
          </p>
          <a
            href="/login"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded"
          >
            Get Started
          </a>
        </div>

        {/* AI Bot Lottie */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <Lottie animationData={aiBot} loop={true} />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="bg-gray-800 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
          <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-blue-500/40 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Integrations Carousel */}
      <AIIntegrations />
      <Footer/>
    </div>
  );
}
