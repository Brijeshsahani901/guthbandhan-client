// components/TypingIndicator.jsx
import { motion } from "framer-motion";

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-gray-500">typing</span>
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TypingIndicator;