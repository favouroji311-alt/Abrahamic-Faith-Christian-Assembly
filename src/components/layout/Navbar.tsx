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
      const stored = localStorage.getItem('afca_theme');
      if (stored) {
        return stored === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check initial state and sync DOM
    const stored = localStorage.getItem('afca_theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored ? stored === 'dark' : systemDark;
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Listen to browser theme changes if user hasn't explicitly set a preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      const userTheme = localStorage.getItem('afca_theme');
      if (!userTheme) {
        setIsDark(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    try {
      localStorage.setItem('afca_theme', newDark ? 'dark' : 'light');
    } catch {}
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-3 sm:px-6 py-3 sm:py-5',
        isScrolled ? 'py-2 sm:py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center liquid-glass rounded-full px-4 sm:px-8 py-2.5 sm:py-3.5 liquid-sheen">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link to="/" className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white group flex items-center gap-2.5 shrink-0">
            <span className="w-2.5 h-2.5 bg-neon-green rounded-full shadow-[0_0_10px_#39ff14] group-hover:scale-125 transition-transform"></span>
            AFCA.STUDIO
          </Link>
          <div className="hidden md:flex h-4 w-px bg-slate-300/60 dark:bg-slate-700/60"></div>
          <span className="hidden lg:block caption-mono text-[8px] opacity-70">Apostolic / Assembly</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  'nav-label text-[10px] px-4 py-2 rounded-full transition-all duration-200',
                  isActive
                    ? 'liquid-inset text-blue-600 dark:text-neon-green font-black shadow-inner'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/30 dark:hover:bg-white/5'
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          <div className="flex items-center gap-2.5 ml-2">
            <button
              onClick={toggleTheme}
              className="liquid-glass-button p-2.5 rounded-full text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-green transition-colors cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
            </button>
            <button 
              onClick={onConnect}
              className="liquid-glass-accent px-6 py-2 rounded-full nav-label text-[10px] font-black text-slate-950 transition-all cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 md:hidden">
          <button 
            onClick={toggleTheme} 
            className="liquid-glass-button p-2.5 rounded-full text-slate-800 dark:text-slate-200"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="liquid-glass-button p-2.5 rounded-full text-slate-900 dark:text-white"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 liquid-glass-lg rounded-3xl p-6 md:hidden max-w-7xl mx-auto liquid-sheen"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'text-sm font-bold tracking-wide uppercase py-3 px-4 rounded-xl transition-all',
                      isActive 
                        ? 'liquid-inset text-blue-600 dark:text-neon-green font-black' 
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
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
                className="mt-2 liquid-glass-accent text-slate-950 px-6 py-3.5 rounded-2xl font-black text-center uppercase text-xs tracking-widest active:scale-95 transition-transform cursor-pointer"
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
