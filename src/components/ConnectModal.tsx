import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Heart } from 'lucide-react';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-zinc-950 w-full max-w-lg rounded-none shadow-2xl relative overflow-hidden flex flex-col border border-gray-100 dark:border-zinc-800"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors dark:text-white"
            >
              <X size={20} />
            </button>

            <div className="p-12">
              <div className="mb-10">
                <span className="caption-mono block mb-4">Request / Form 01</span>
                <h2 className="text-4xl font-black mb-2 dark:text-white leading-[0.9] uppercase tracking-tighter">
                  LET'S <span className="text-blue-700 dark:text-neon-green italic">CONNECT.</span>
                </h2>
                <p className="text-gray-500 font-light text-lg">We'd love to hear from you or pray for you.</p>
              </div>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="caption-mono text-[8px] opacity-60">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 py-3 focus:border-neon-green outline-none transition-colors dark:text-white font-medium text-lg placeholder:text-gray-300 dark:placeholder:text-zinc-800" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="caption-mono text-[8px] opacity-60">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 py-3 focus:border-neon-green outline-none transition-colors dark:text-white font-medium text-lg placeholder:text-gray-300 dark:placeholder:text-zinc-800" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="caption-mono text-[8px] opacity-60">Message type</label>
                  <select className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 py-3 focus:border-neon-green outline-none transition-colors dark:text-white font-medium text-lg appearance-none">
                    <option>General Inquiry</option>
                    <option>Prayer Request</option>
                    <option>Volunteer Interest</option>
                  </select>
                </div>

                <div className="space-y-2 pt-6">
                  <button 
                    className="w-full bg-neon-green text-zinc-950 py-6 rounded-none font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:brightness-110 transition shadow-xl neon-shadow"
                  >
                    SEND REQUEST <Send size={16} strokeWidth={3} />
                  </button>
                </div>
              </form>

              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-zinc-900 text-center">
                <p className="caption-mono text-[8px] flex items-center justify-center gap-2">
                  <Heart size={10} className="text-red-500 fill-current" /> PROUDLY SERVING SINCE 1995
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
