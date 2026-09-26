import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  tag: string;
  description: string;
  audio_file_url?: string;
  duration?: string;
  created_at?: string;
}

// User's Supabase project URL derived from the storage URL provided
export const DEFAULT_SUPABASE_URL = 'https://lduxhzivaczcwxephfwx.supabase.co';

// Key can come from Vite env var, localStorage, or be empty until configured
const STORAGE_KEY_URL = 'app_supabase_url';
const STORAGE_KEY_ANON = 'app_supabase_anon_key';

export function getStoredSupabaseConfig() {
  const metaEnv = (import.meta as any).env || {};
  const url = 
    (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY_URL)) ||
    (metaEnv.VITE_SUPABASE_URL as string) || 
    DEFAULT_SUPABASE_URL;

  const anonKey = 
    (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY_ANON)) ||
    (metaEnv.VITE_SUPABASE_ANON_KEY as string) || 
    '';

  return { url, anonKey };
}

export function saveSupabaseConfig(url: string, anonKey: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
    localStorage.setItem(STORAGE_KEY_ANON, anonKey.trim());
    supabaseClientInstance = null; // reset cached client
  }
}

let supabaseClientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getStoredSupabaseConfig();
  if (!url || !anonKey) {
    return null;
  }
  if (!supabaseClientInstance) {
    try {
      supabaseClientInstance = createClient(url, anonKey);
    } catch (e) {
      console.error('Failed to initialize Supabase client:', e);
      return null;
    }
  }
  return supabaseClientInstance;
}

// Pre-seeded sermon catalog including the user's requested 'School of Wealth Vol 1 Part 11'
export const INITIAL_SERMONS: Sermon[] = [
  {
    id: 'school-of-wealth-vol-1-prt11',
    title: 'School of Wealth Vol 1 Part 11',
    speaker: 'Rev. Abraham',
    date: 'September 2026',
    tag: 'Wealth & Finances',
    description: 'Divine spiritual principles for financial empowerment, supernatural provision, and covenant wealth creation for Kingdom impact.',
    audio_file_url: 'https://lduxhzivaczcwxephfwx.supabase.co/storage/v1/object/sign/sermons/School%20of%20wealth/School%20of%20Wealth%20vol%201%20prt11.mp3?token=eyJraWQiOiI5NTZiODZjMS05ZTA3LTQ5ZDktYTUyYS1iNjE5MGVjYTg0MWYiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzZXJtb25zL1NjaG9vbCBvZiB3ZWFsdGgvU2Nob29sIG9mIFdlYWx0aCB2b2wgMSBwcnQxMS5tcDMiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzkwNDU2MTU4LCJleHAiOjIxMDU4MTYxNTh9.387tiMvgonIJ_xT1encMiVSybg1Bq_5yulr1kRdZ6ERdaxJxV0cqj-R7jt3DNp_4RV2gB0N-w1u5jJp2e37DjA',
    duration: '55:20',
  },
  {
    id: 'faith-that-moves-mountains',
    title: 'Faith That Moves Mountains',
    speaker: 'Rev. Abraham',
    date: 'April 20, 2026',
    tag: 'Faith',
    description: 'Discover how to activate the mustard-seed faith that overcomes every obstacle in your path.',
    audio_file_url: 'https://lduxhzivaczcwxephfwx.supabase.co/storage/v1/object/sign/sermons/School%20of%20wealth/School%20of%20Wealth%20vol%201%20prt11.mp3?token=eyJraWQiOiI5NTZiODZjMS05ZTA3LTQ5ZDktYTUyYS1iNjE5MGVjYTg0MWYiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzZXJtb25zL1NjaG9vbCBvZiB3ZWFsdGgvU2Nob29sIG9mIFdlYWx0aCB2b2wgMSBwcnQxMS5tcDMiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzkwNDU2MTU4LCJleHAiOjIxMDU4MTYxNTh9.387tiMvgonIJ_xT1encMiVSybg1Bq_5yulr1kRdZ6ERdaxJxV0cqj-R7jt3DNp_4RV2gB0N-w1u5jJp2e37DjA',
    duration: '42:15',
  },
  {
    id: 'the-power-of-prayer',
    title: 'The Power of Prayer',
    speaker: 'Pst. Sarah',
    date: 'April 13, 2026',
    tag: 'Prayer',
    description: 'Understanding the spiritual mechanics of dynamic communication with our Heavenly Father.',
    duration: '38:40',
  },
  {
    id: 'walking-in-love',
    title: 'Walking in Love',
    speaker: 'Rev. Abraham',
    date: 'April 06, 2026',
    tag: 'Love',
    description: 'A deep dive into the true meaning of Agape love and how it transforms our relationships.',
    duration: '45:10',
  },
  {
    id: 'living-a-life-of-purpose',
    title: 'Living a Life of Purpose',
    speaker: 'Pst. David',
    date: 'March 30, 2026',
    tag: 'Purpose',
    description: 'Uncovering the divine assignment God has placed on your life for this generation.',
    duration: '50:00',
  },
  {
    id: 'overcoming-fear-with-faith',
    title: 'Overcoming Fear with Faith',
    speaker: 'Rev. Abraham',
    date: 'March 23, 2026',
    tag: 'Faith',
    description: 'Strategies for standing firm when anxiety and fear try to cloud your vision.',
    duration: '47:20',
  },
  {
    id: 'the-joy-of-salvation',
    title: 'The Joy of Salvation',
    speaker: 'Pst. Sarah',
    date: 'March 16, 2026',
    tag: 'Salvation',
    description: 'Reclaiming the wonder and excitement of our first encounter with the Grace of God.',
    duration: '36:50',
  }
];

/**
 * Fetches sermons from Supabase 'sermons' table if configured.
 * Automatically maps standard column names and falls back to INITIAL_SERMONS.
 */
export async function fetchSermonsFromSupabase(): Promise<{
  sermons: Sermon[];
  isFromSupabase: boolean;
  error?: string;
}> {
  const client = getSupabaseClient();
  
  if (!client) {
    return {
      sermons: INITIAL_SERMONS,
      isFromSupabase: false,
      error: 'Supabase Anon Key not set. Showing local catalog with School of Wealth Vol 1 Part 11.'
    };
  }

  try {
    const { data, error } = await client
      .from('sermons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error querying Supabase sermons table:', error.message);
      return {
        sermons: INITIAL_SERMONS,
        isFromSupabase: false,
        error: error.message
      };
    }

    if (!data || data.length === 0) {
      return {
        sermons: INITIAL_SERMONS,
        isFromSupabase: true,
        error: 'Table is empty. Showing initial catalog including School of Wealth Vol 1 Part 11.'
      };
    }

    // Map table row fields flexibly in case user named columns slightly differently
    const mapped: Sermon[] = data.map((row: any) => ({
      id: String(row.id || row.sermon_id || Math.random().toString(36).substring(7)),
      title: row.title || row.sermon_title || 'Untitled Sermon',
      speaker: row.speaker || row.preacher || row.pastor || 'Pastor',
      date: row.date || row.sermon_date || new Date(row.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tag: row.tag || row.topic || row.series || 'General',
      description: row.description || row.desc || row.summary || '',
      audio_file_url: row.audio_file_url || row.audio_url || row.audio || row.file_url || row.url || '',
      duration: row.duration || 'Audio',
      created_at: row.created_at
    }));

    // Ensure 'School of Wealth Vol 1 Part 11' is present if user wants to play it
    const hasSchoolOfWealth = mapped.some(
      s => s.title.toLowerCase().includes('school of wealth') || 
           s.audio_file_url?.includes('School%20of%20Wealth%20vol%201%20prt11')
    );

    const merged = hasSchoolOfWealth ? mapped : [INITIAL_SERMONS[0], ...mapped];

    return {
      sermons: merged,
      isFromSupabase: true
    };
  } catch (err: any) {
    console.error('Failed to fetch from Supabase:', err);
    return {
      sermons: INITIAL_SERMONS,
      isFromSupabase: false,
      error: err?.message || 'Network error fetching Supabase sermons'
    };
  }
}

/**
 * Inserts a new sermon into the Supabase table.
 */
export async function insertSermonToSupabase(sermon: Omit<Sermon, 'id'>): Promise<{ success: boolean; data?: any; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: 'Supabase client is not configured with an Anon Key.' };
  }

  try {
    const { data, error } = await client
      .from('sermons')
      .insert([
        {
          title: sermon.title,
          speaker: sermon.speaker,
          date: sermon.date,
          tag: sermon.tag,
          description: sermon.description,
          audio_file_url: sermon.audio_file_url,
          duration: sermon.duration || 'Audio'
        }
      ])
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to insert sermon' };
  }
}
