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
    <footer className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white border-t border-gray-100 dark:border-zinc-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="col-span-1 md:col-span-12 lg:col-span-5 flex flex-col justify-between min-h-[180px]">
            <div>
              <span className="caption-mono mb-4 block">Identity / Vol 01</span>
              <h3 className="text-4xl md:text-5xl font-black mb-8 leading-none tracking-tighter uppercase">
                Abrahamic<br/>
                <span className="text-gray-200 dark:text-zinc-800 italic">Faith Christian Assembly.</span>
              </h3>
            </div>
            <div className="flex gap-8 group">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-neon-green transition-colors"
                >
                  <Icon size={24} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="caption-mono mb-8">Navigation</h4>
            <ul className="space-y-4 nav-label">
              <li><Link to="/" className="text-gray-500 hover:text-blue-700 dark:hover:text-neon-green transition">Home</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-blue-700 dark:hover:text-neon-green transition">About Us</Link></li>
              <li><Link to="/ministries" className="text-gray-500 hover:text-blue-700 dark:hover:text-neon-green transition">Ministries</Link></li>
              <li><Link to="/sermons" className="text-gray-500 hover:text-blue-700 dark:hover:text-neon-green transition">Sermons</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-2 border-l border-gray-100 dark:border-zinc-900 pl-8">
            <h4 className="caption-mono mb-8">Digital Contact</h4>
            <ul className="space-y-6">
              <li className="flex flex-col">
                <span className="caption-mono text-[8px] opacity-40">Coordinates</span>
                <span className="text-sm font-mono mt-1">40.7128° N, 74.0060° W</span>
              </li>
              <li className="flex flex-col">
                <span className="caption-mono text-[8px] opacity-40">Direct</span>
                <span className="text-sm font-mono mt-1">hello@afca.studio</span>
              </li>
              <li className="flex flex-col">
                <span className="caption-mono text-[8px] opacity-40">Voice</span>
                <span className="text-sm font-mono mt-1">+234 703 227 6862</span>
                <span className="text-sm font-mono mt-1">+234 814 938 4363</span>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-3 border-l lg:border-l border-gray-100 dark:border-zinc-900 pl-8">
            <h4 className="caption-mono mb-8">Updates / Newsletter</h4>
            
            {status === 'success' ? (
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-2 text-blue-700 dark:text-neon-green">
                  <Check size={16} strokeWidth={3} />
                  <span className="nav-label text-[9px] font-black">SUBSCRIBED SUCCESSFULLY</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-light leading-relaxed">
                  Welcome to the inner circle. We will keep you updated with latest sermons and assemblies.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-[9px] caption-mono opacity-50 hover:opacity-100 transition-opacity"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-light leading-relaxed mb-4">
                  Stay synchronized with our latest events, teachings, and community chronicles.
                </p>
                <div className="relative flex flex-col gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER EMAIL ADDRESS"
                    className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 py-3 focus:border-neon-green outline-none transition-colors text-xs font-mono dark:text-white placeholder:text-gray-300 dark:placeholder:text-zinc-800"
                    disabled={status === 'submitting'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="mt-2 w-full bg-zinc-950 dark:bg-neon-green hover:brightness-110 active:scale-[0.98] transition-all text-white dark:text-zinc-950 px-6 py-3 font-black text-[9px] tracking-widest uppercase flex items-center justify-center gap-2"
                  >
                    <span>{status === 'submitting' ? 'CONFIGURING...' : 'SUBSCRIBE'}</span>
                    <ArrowRight size={12} strokeWidth={3} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="caption-mono text-[8px]">&copy; {new Date().getFullYear()} AFCA STUDIOS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-gray-200 dark:bg-zinc-800"></div>
            <span className="caption-mono text-[8px]">Designed for high-impact communication.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
