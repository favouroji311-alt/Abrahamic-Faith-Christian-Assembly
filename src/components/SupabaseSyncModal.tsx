import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Database, 
  Key, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Plus, 
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { 
  getStoredSupabaseConfig, 
  saveSupabaseConfig, 
  insertSermonToSupabase,
  DEFAULT_SUPABASE_URL,
  INITIAL_SERMONS
} from '../lib/supabase';

interface SupabaseSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshData: () => void;
}

export function SupabaseSyncModal({ isOpen, onClose, onRefreshData }: SupabaseSyncModalProps) {
  const currentConfig = getStoredSupabaseConfig();
  const [supabaseUrl, setSupabaseUrl] = useState(currentConfig.url);
  const [anonKey, setAnonKey] = useState(currentConfig.anonKey);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'config' | 'add' | 'sql'>('config');
  const [isCopiedSql, setIsCopiedSql] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Sermon form state
  const [title, setTitle] = useState('School of Wealth Vol 1 Part 11');
  const [speaker, setSpeaker] = useState('Rev. Abraham');
  const [date, setDate] = useState('September 2026');
  const [tag, setTag] = useState('Wealth & Finances');
  const [description, setDescription] = useState('School of Wealth Volume 1 Part 11 - Biblical principles for financial dominion, supernatural provision, and wealth creation.');
  const [audioUrl, setAudioUrl] = useState(INITIAL_SERMONS[0].audio_file_url || '');

  const sqlSchemaCode = `-- Supabase SQL to create the sermons table and enable public reads
CREATE TABLE IF NOT EXISTS public.sermons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  speaker TEXT,
  date TEXT,
  tag TEXT,
  description TEXT,
  audio_file_url TEXT NOT NULL,
  duration TEXT DEFAULT 'Audio',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;

-- Allow public read access so visitors can stream sermons
CREATE POLICY "Allow public read on sermons"
  ON public.sermons
  FOR SELECT
  TO public
  USING (true);

-- Allow insert access with anon key (or restrict to authenticated users)
CREATE POLICY "Allow anon insert on sermons"
  ON public.sermons
  FOR INSERT
  TO public
  WITH CHECK (true);
`;

  const handleSaveConfig = () => {
    saveSupabaseConfig(supabaseUrl, anonKey);
    setStatusMessage({
      type: 'success',
      text: 'Supabase configuration saved! Reloading sermon catalog...'
    });
    setTimeout(() => {
      onRefreshData();
    }, 400);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchemaCode);
    setIsCopiedSql(true);
    setTimeout(() => setIsCopiedSql(false), 2000);
  };

  const handleInsertSermon = async (e: FormEvent) => {
    e.preventDefault();
    if (!audioUrl || !title) {
      setStatusMessage({ type: 'error', text: 'Title and Audio File URL are required.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const result = await insertSermonToSupabase({
      title,
      speaker,
      date,
      tag,
      description,
      audio_file_url: audioUrl,
      duration: 'Audio'
    });

    setIsSubmitting(false);

    if (result.success) {
      setStatusMessage({
        type: 'success',
        text: 'Successfully inserted sermon into Supabase "sermons" table!'
      });
      onRefreshData();
    } else {
      setStatusMessage({
        type: 'error',
        text: result.error || 'Failed to insert sermon into Supabase table. Ensure your anon key is set and table exists.'
      });
    }
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
            className="liquid-glass-lg w-full max-w-2xl rounded-3xl relative overflow-hidden flex flex-col my-auto z-10 max-h-[92vh] liquid-sheen"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="p-6 sm:p-8 md:p-10 overflow-y-auto">
              <div className="mb-6 pr-8">
                <div className="flex items-center gap-2 mb-1">
                  <Database size={18} className="text-blue-600 dark:text-neon-green" />
                  <span className="caption-mono !text-[9px] text-blue-600 dark:text-neon-green font-bold">
                    DATABASE & STORAGE
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  SUPABASE <span className="text-blue-600 dark:text-neon-green italic">INTEGRATION.</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 font-light text-xs sm:text-sm mt-1">
                  Manage your Supabase connection, add audio files to the <code className="font-mono text-blue-600 dark:text-neon-green font-bold">sermons</code> table, or review table schema.
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex gap-2 p-1.5 liquid-inset rounded-2xl mb-6">
                <button
                  onClick={() => { setActiveTab('config'); setStatusMessage(null); }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'config'
                      ? 'liquid-glass text-blue-600 dark:text-neon-green shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Connection Settings
                </button>
                <button
                  onClick={() => { setActiveTab('add'); setStatusMessage(null); }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'add'
                      ? 'liquid-glass text-blue-600 dark:text-neon-green shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Add to Table
                </button>
                <button
                  onClick={() => { setActiveTab('sql'); setStatusMessage(null); }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'sql'
                      ? 'liquid-glass text-blue-600 dark:text-neon-green shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  SQL Schema
                </button>
              </div>

              {statusMessage && (
                <div className={`p-4 rounded-2xl mb-5 flex items-start gap-3 text-xs ${
                  statusMessage.type === 'success' 
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                    : statusMessage.type === 'error'
                    ? 'bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300'
                    : 'bg-blue-500/10 border border-blue-500/30 text-blue-700 dark:text-blue-300'
                }`}>
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Tab 1: Connection Config */}
              {activeTab === 'config' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="caption-mono text-[8px] opacity-80 flex items-center justify-between">
                      <span>SUPABASE PROJECT URL</span>
                      <span className="text-blue-600 dark:text-neon-green font-bold">Auto-detected from Storage</span>
                    </label>
                    <input
                      type="text"
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      placeholder={DEFAULT_SUPABASE_URL}
                      className="w-full liquid-inset rounded-2xl py-3 px-4 font-mono text-xs outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="caption-mono text-[8px] opacity-80 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Key size={10} /> SUPABASE ANON PUBLIC KEY
                      </span>
                      <a
                        href="https://supabase.com/dashboard/project/lduxhzivaczcwxephfwx/settings/api"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 dark:text-neon-green hover:underline flex items-center gap-1"
                      >
                        Find in Supabase Dashboard <ExternalLink size={10} />
                      </a>
                    </label>
                    <input
                      type="password"
                      value={anonKey}
                      onChange={(e) => setAnonKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full liquid-inset rounded-2xl py-3 px-4 font-mono text-xs outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green text-slate-900 dark:text-white"
                    />
                    <p className="caption-mono !text-[8px] text-slate-500 pt-1">
                      Found in: Project Settings &rarr; API &rarr; Project API keys &rarr; <code>anon public</code>
                    </p>
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      onClick={handleSaveConfig}
                      className="flex-1 liquid-glass-accent text-slate-950 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 size={16} /> Save Configuration
                    </button>
                    <button
                      onClick={() => onRefreshData()}
                      className="liquid-glass-button px-4 py-3.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 cursor-pointer"
                      title="Reload from table"
                    >
                      <RefreshCw size={14} /> Reload Data
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Add Sermon directly to Supabase */}
              {activeTab === 'add' && (
                <form onSubmit={handleInsertSermon} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="caption-mono text-[8px] opacity-80">Sermon Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full liquid-inset rounded-2xl py-2.5 px-4 text-xs font-medium outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="caption-mono text-[8px] opacity-80">Speaker / Preacher</label>
                      <input
                        type="text"
                        value={speaker}
                        onChange={(e) => setSpeaker(e.target.value)}
                        className="w-full liquid-inset rounded-2xl py-2.5 px-4 text-xs font-medium outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="caption-mono text-[8px] opacity-80">Category / Series Tag</label>
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="w-full liquid-inset rounded-2xl py-2.5 px-4 text-xs font-medium outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="caption-mono text-[8px] opacity-80 flex items-center justify-between">
                      <span>Audio Storage File URL (Supabase Signed/Public URL)</span>
                      <span className="text-emerald-500 font-bold">Audio Verified</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={audioUrl}
                      onChange={(e) => setAudioUrl(e.target.value)}
                      placeholder="https://lduxhzivaczcwxephfwx.supabase.co/storage/v1/object/sign/sermons/..."
                      className="w-full liquid-inset rounded-2xl py-2.5 px-4 font-mono text-[11px] outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="caption-mono text-[8px] opacity-80">Description</label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full liquid-inset rounded-2xl py-2.5 px-4 text-xs outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-neon-green text-slate-900 dark:text-white resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full liquid-glass-accent text-slate-950 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>SAVING TO SUPABASE...</>
                      ) : (
                        <>
                          <UploadCloud size={16} /> Save to Supabase sermons table
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Tab 3: SQL Schema */}
              {activeTab === 'sql' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Run this in your Supabase SQL Editor if your table isn't created yet:
                    </p>
                    <button
                      onClick={handleCopySql}
                      className="liquid-glass-button px-3 py-1.5 rounded-full text-xs font-bold text-blue-600 dark:text-neon-green flex items-center gap-1.5 cursor-pointer"
                    >
                      {isCopiedSql ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      {isCopiedSql ? 'Copied!' : 'Copy SQL'}
                    </button>
                  </div>

                  <div className="relative">
                    <pre className="liquid-inset p-4 rounded-2xl text-[11px] font-mono text-slate-800 dark:text-slate-200 overflow-x-auto max-h-60 leading-relaxed">
                      {sqlSchemaCode}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
