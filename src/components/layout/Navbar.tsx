import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface NavbarProps {
  onConnect: () => void;
}

export function Navbar({ onConnect }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Initial sync
    const isDarkTheme = document.documentElement.classList.contains('dark');
    setIsDark(isDarkTheme);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Sermons', path: '/sermons' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-6',
        isScrolled ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-zinc-950/5 dark:bg-white/5 backdrop-blur-md rounded-full px-8 py-3 border border-white/10">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-black tracking-tighter dark:text-white group flex items-center gap-2">
            <span className="w-2 h-2 bg-neon-green rounded-full group-hover:animate-pulse"></span>
            AFCA.STUDIO
          </Link>
          <div className="hidden md:flex h-4 w-px bg-white/20"></div>
          <span className="hidden lg:block caption-mono text-[8px] opacity-40">Apostolic / Vol 01</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  'nav-label text-[9px] transition-all hover:text-neon-green',
                  isActive ? 'text-blue-700 dark:text-neon-green font-black' : 'text-gray-400'
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={12} /> : <Moon size={12} />}
            </button>
            <button 
              onClick={onConnect}
              className="px-6 py-2 bg-zinc-950 dark:bg-neon-green text-white dark:text-zinc-950 rounded-full nav-label text-[9px] font-black hover:scale-105 transition-all"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme} 
            className="text-gray-600 dark:text-white hover:text-neon-green transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-900 dark:text-white hover:text-neon-green transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'text-lg font-black tracking-tighter transition-colors uppercase',
                      isActive ? 'text-blue-700 dark:text-neon-green' : 'text-gray-500 dark:text-white'
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onConnect();
                }}
                className="bg-zinc-950 dark:bg-neon-green text-white dark:text-blue-900 px-6 py-4 rounded-none font-black text-center uppercase text-sm tracking-widest"
              >
                Connect With Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
