import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, ArrowRight, Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <footer className="pt-16 sm:pt-24 pb-12 border-t border-slate-300/40 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 mb-16 sm:mb-20">
          <div className="col-span-1 md:col-span-12 lg:col-span-5 flex flex-col justify-between min-h-[160px] sm:min-h-[180px]">
            <div>
              <span className="caption-mono mb-3 block text-blue-600 dark:text-neon-green">Identity / Vol 01</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 leading-tight tracking-tight uppercase text-slate-900 dark:text-white">
                Abrahamic<br/>
                <span className="text-slate-400 dark:text-slate-600 italic">Faith Christian Assembly.</span>
              </h3>
            </div>
            <div className="flex gap-3 sm:gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 liquid-glass-button rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-green transition-colors cursor-pointer"
                  aria-label="Social Link"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="caption-mono mb-6 text-blue-600 dark:text-neon-green">Navigation</h4>
            <ul className="space-y-3 nav-label">
              <li><Link to="/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-green transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-green transition-colors">About Us</Link></li>
              <li><Link to="/ministries" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-green transition-colors">Ministries</Link></li>
              <li><Link to="/sermons" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-neon-green transition-colors">Sermons</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-2 border-l-0 md:border-l border-slate-300/40 dark:border-slate-800/60 pl-0 md:pl-8">
            <h4 className="caption-mono mb-6 text-blue-600 dark:text-neon-green">Direct Contact</h4>
            <ul className="space-y-4">
              <li className="flex flex-col">
                <span className="caption-mono text-[8px] opacity-70">Coordinates</span>
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300 mt-1">40.7128° N, 74.0060° W</span>
              </li>
              <li className="flex flex-col">
                <span className="caption-mono text-[8px] opacity-70">Direct</span>
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300 mt-1">hello@afca.studio</span>
              </li>
              <li className="flex flex-col">
                <span className="caption-mono text-[8px] opacity-70">Voice</span>
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300 mt-1">+234 703 227 6862</span>
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300 mt-1">+234 814 938 4363</span>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-3 border-l-0 lg:border-l border-slate-300/40 dark:border-slate-800/60 pl-0 lg:pl-8">
            <h4 className="caption-mono mb-6 text-blue-600 dark:text-neon-green">Updates / Newsletter</h4>
            
            {status === 'success' ? (
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-neon-green">
                  <Check size={16} strokeWidth={3} />
                  <span className="nav-label text-[9px] font-black">SUBSCRIBED SUCCESSFULLY</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                  Welcome to our assembly update network.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-[9px] caption-mono opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-3">
                  Stay synchronized with our latest events and chronicles.
                </p>
                <div className="relative flex flex-col gap-2.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER EMAIL ADDRESS"
                    className="w-full liquid-inset rounded-xl py-2.5 px-4 outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green transition-all text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-400"
                    disabled={status === 'submitting'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="liquid-glass-accent text-slate-950 px-6 py-2.5 rounded-xl font-black text-[9px] tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{status === 'submitting' ? 'CONFIGURING...' : 'SUBSCRIBE'}</span>
                    <ArrowRight size={12} strokeWidth={3} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-300/40 dark:border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="caption-mono text-[8px] text-center md:text-left text-slate-500">&copy; {new Date().getFullYear()} AFCA STUDIOS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-slate-300 dark:bg-slate-800"></div>
            <span className="caption-mono text-[8px] text-center md:text-left text-slate-500">Liquid Glass & Neumorphic Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
