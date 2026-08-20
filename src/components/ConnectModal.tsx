import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Heart, CheckCircle2 } from 'lucide-react';

export type MessageType = 'General Inquiry' | 'Prayer Request' | 'Volunteer Interest';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMessageType?: MessageType;
}

export function ConnectModal({ isOpen, onClose, defaultMessageType = 'General Inquiry' }: ConnectModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [messageType, setMessageType] = useState<MessageType>(defaultMessageType);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMessageType(defaultMessageType);
      setIsSubmitted(false);
      setIsSubmitting(false);
    }
  }, [isOpen, defaultMessageType]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        if (isOpen) {
          onClose();
          setFullName('');
          setEmail('');
          setNotes('');
          setIsSubmitted(false);
        }
      }, 2000);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-blue-950/60 dark:bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="liquid-glass-lg w-full max-w-lg rounded-3xl relative overflow-hidden flex flex-col my-auto z-10 max-h-[92vh] liquid-sheen"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="p-6 sm:p-10 md:p-12 overflow-y-auto">
              <div className="mb-6 sm:mb-8 pr-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 text-slate-900 dark:text-white leading-[0.95] uppercase tracking-tight">
                  LET'S <span className="text-blue-600 dark:text-neon-green italic">CONNECT.</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 font-light text-sm sm:text-base">
                  {messageType === 'Volunteer Interest' 
                    ? 'Thank you for your heart to serve! Fill out the form below to join our team.' 
                    : "We'd love to hear from you, pray with you, or welcome you to our family."}
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full liquid-inset mx-auto flex items-center justify-center text-neon-green">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Received!</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
                    We have received your {messageType.toLowerCase()} and will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-1.5">
                    <label className="caption-mono text-[8px] opacity-70">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full liquid-inset rounded-2xl py-3 px-4 outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green transition-all text-slate-900 dark:text-white font-medium text-sm sm:text-base placeholder:text-slate-400" 
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="caption-mono text-[8px] opacity-70">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full liquid-inset rounded-2xl py-3 px-4 outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green transition-all text-slate-900 dark:text-white font-medium text-sm sm:text-base placeholder:text-slate-400" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="caption-mono text-[8px] opacity-70">Message Type</label>
                    <div className="relative">
                      <select 
                        value={messageType}
                        onChange={(e) => setMessageType(e.target.value as MessageType)}
                        className="w-full liquid-inset rounded-2xl py-3 px-4 outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green transition-all text-slate-900 dark:text-white font-medium text-sm sm:text-base appearance-none cursor-pointer"
                      >
                        <option value="General Inquiry" className="bg-[#edf2f7] dark:bg-[#181d26] text-slate-900 dark:text-white">General Inquiry</option>
                        <option value="Prayer Request" className="bg-[#edf2f7] dark:bg-[#181d26] text-slate-900 dark:text-white">Prayer Request</option>
                        <option value="Volunteer Interest" className="bg-[#edf2f7] dark:bg-[#181d26] text-slate-900 dark:text-white">Volunteer Interest</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="caption-mono text-[8px] opacity-70">Message / Note (Optional)</label>
                    <textarea 
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={messageType === 'Volunteer Interest' ? 'Let us know which department or area you are interested in...' : 'How can we assist or pray for you?'}
                      className="w-full liquid-inset rounded-2xl py-3 px-4 outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green transition-all text-slate-900 dark:text-white font-medium text-sm placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full liquid-glass-accent text-slate-950 py-4 sm:py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? 'SENDING...' : (
                        <>
                          SUBMIT {messageType === 'Volunteer Interest' ? 'INTEREST' : 'REQUEST'} <Send size={14} strokeWidth={3} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-6 pt-5 border-t border-slate-300/40 dark:border-slate-800/60 text-center">
                <p className="caption-mono text-[8px] flex items-center justify-center gap-2 text-slate-500">
                  <Heart size={10} className="text-red-500 fill-current shrink-0" /> PROUDLY SERVING SINCE 1995
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
