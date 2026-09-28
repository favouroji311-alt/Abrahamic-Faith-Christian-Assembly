import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Ministries } from './pages/Ministries';
import { Sermons } from './pages/Sermons';
import { NotFound } from './pages/NotFound';
import { DailyVerse } from './components/DailyVerse';
import { ConnectModal, type MessageType } from './components/ConnectModal';
import { AudioProvider } from './context/AudioContext';
import { AudioPlayer } from './components/AudioPlayer';

function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [connectMessageType, setConnectMessageType] = useState<MessageType>('General Inquiry');

  const handleOpenConnect = (type: MessageType = 'General Inquiry') => {
    setConnectMessageType(type);
    setIsConnectOpen(true);
  };

  return (
    <AudioProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen relative overflow-x-hidden">
          {/* Ambient Liquid Mesh Layer for Refraction */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-br from-blue-400/20 via-cyan-300/15 to-emerald-400/10 dark:from-blue-600/15 dark:via-cyan-500/10 dark:to-emerald-500/10 blur-3xl animate-liquid-float-1" />
            <div className="absolute top-1/3 -right-32 w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-br from-emerald-300/20 via-lime-300/15 to-teal-400/10 dark:from-neon-green/10 dark:via-emerald-500/10 dark:to-cyan-600/10 blur-3xl animate-liquid-float-2" />
            <div className="absolute -bottom-40 left-1/4 w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-tr from-cyan-400/15 via-blue-400/15 to-indigo-400/10 dark:from-cyan-700/10 dark:via-blue-800/10 dark:to-emerald-800/10 blur-3xl animate-liquid-pulse" />
          </div>

          <Navbar onConnect={() => handleOpenConnect('General Inquiry')} />
          <main className="flex-grow">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home onOpenConnect={handleOpenConnect} />} />
                <Route path="/about" element={<About />} />
                <Route path="/ministries" element={<Ministries onOpenConnect={handleOpenConnect} />} />
                <Route path="/sermons" element={<Sermons />} />
                <Route path="*" element={<NotFound onOpenConnect={handleOpenConnect} />} />
              </Routes>
            </PageTransition>
            
            {/* Global AI component shown at the bottom of pages */}
            <SectionDivider />
            <DailyVerse />
          </main>
          <Footer />

          {/* Persistent Docked Audio Player */}
          <AudioPlayer />

          <ConnectModal 
            isOpen={isConnectOpen} 
            defaultMessageType={connectMessageType}
            onClose={() => setIsConnectOpen(false)} 
          />
        </div>
      </Router>
    </AudioProvider>
  );
}

function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 my-10 sm:my-16">
      <div className="h-px bg-slate-300/40 dark:bg-slate-800/60 w-full"></div>
    </div>
  );
}
