import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', color = 'cyan' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colors = {
    cyan: 'border-cyan-400',
    purple: 'border-purple-500',
    blue: 'border-blue-500',
    green: 'border-green-500'
  };

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`
          ${sizes[size]} 
          border-2 
          ${colors[color]} 
          border-t-transparent 
          rounded-full
        `}
      />
    </div>
  );
};

export default LoadingSpinner;
