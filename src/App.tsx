import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Ministries } from './pages/Ministries';
import { Sermons } from './pages/Sermons';
import { DailyVerse } from './components/DailyVerse';
import { ConnectModal } from './components/ConnectModal';

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

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar onConnect={() => setIsConnectOpen(true)} />
        <main className="flex-grow">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/ministries" element={<Ministries />} />
              <Route path="/sermons" element={<Sermons />} />
            </Routes>
          </PageTransition>
          
          {/* Global AI component shown at the bottom of pages except Home (where it's integrated or optional) */}
          <SectionDivider />
          <DailyVerse />
        </main>
        <Footer />

        <ConnectModal 
          isOpen={isConnectOpen} 
          onClose={() => setIsConnectOpen(false)} 
        />
      </div>
    </Router>
  );
}

function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="h-px bg-gray-100 dark:bg-gray-800 w-full"></div>
    </div>
  );
}
