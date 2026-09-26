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

// Storage URL provided for School of Wealth Vol 1 Part 11
export const SCHOOL_OF_WEALTH_AUDIO_URL = 
  'https://lduxhzivaczcwxephfwx.supabase.co/storage/v1/object/sign/sermons/School%20of%20wealth/School%20of%20Wealth%20vol%201%20prt11.mp3?token=eyJraWQiOiI5NTZiODZjMS05ZTA3LTQ5ZDktYTUyYS1iNjE5MGVjYTg0MWYiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzZXJtb25zL1NjaG9vbCBvZiB3ZWFsdGgvU2Nob29sIG9mIFdlYWx0aCB2b2wgMSBwcnQxMS5tcDMiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzkwNDU2MTU4LCJleHAiOjIxMDU4MTYxNTh9.387tiMvgonIJ_xT1encMiVSybg1Bq_5yulr1kRdZ6ERdaxJxV0cqj-R7jt3DNp_4RV2gB0N-w1u5jJp2e37DjA';

const DEFAULT_DB_URL = 'https://lduxhzivaczcwxephfwx.supabase.co';

let clientInstance: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  const metaEnv = (import.meta as any).env || {};
  const url = (metaEnv.VITE_SUPABASE_URL as string) || DEFAULT_DB_URL;
  const key = (metaEnv.VITE_SUPABASE_ANON_KEY as string) || '';

  if (!url || !key) return null;
  if (!clientInstance) {
    try {
      clientInstance = createClient(url, key);
    } catch {
      return null;
    }
  }
  return clientInstance;
}

// Sermon catalog featuring the real sermon 'School of Wealth Vol 1 Part 11'
export const INITIAL_SERMONS: Sermon[] = [
  {
    id: 'school-of-wealth-vol-1-prt11',
    title: 'School of Wealth Vol 1 Part 11',
    speaker: 'Pastor Benwuk',
    date: 'September 2026',
    tag: 'Wealth & Finances',
    description: 'School of Wealth Volume 1 Part 11 - Biblical principles for financial dominion, supernatural provision, and wealth creation for Kingdom impact.',
    audio_file_url: SCHOOL_OF_WEALTH_AUDIO_URL,
    duration: '55:20',
  }
];

/**
 * Fetches sermons catalog.
 */
export async function fetchSermons(): Promise<{ sermons: Sermon[] }> {
  const client = getClient();
  if (!client) {
    return { sermons: INITIAL_SERMONS };
  }

  try {
    const { data, error } = await client
      .from('sermons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return { sermons: INITIAL_SERMONS };
    }

    const mapped: Sermon[] = data.map((row: any) => ({
      id: String(row.id || row.sermon_id || Math.random().toString(36).substring(7)),
      title: row.title || row.sermon_title || 'Untitled Sermon',
      speaker: row.speaker || row.preacher || row.pastor || 'Pastor Benwuk',
      date: row.date || row.sermon_date || new Date(row.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tag: row.tag || row.topic || row.series || 'General',
      description: row.description || row.desc || row.summary || '',
      audio_file_url: row.audio_file_url || row.audio_url || row.audio || row.file_url || row.url || '',
      duration: row.duration || 'Audio',
      created_at: row.created_at
    }));

    const hasSchoolOfWealth = mapped.some(
      s => s.title.toLowerCase().includes('school of wealth') || 
           s.audio_file_url?.includes('School%20of%20Wealth%20vol%201%20prt11')
    );

    const merged = hasSchoolOfWealth ? mapped : [INITIAL_SERMONS[0], ...mapped];

    return { sermons: merged };
  } catch {
    return { sermons: INITIAL_SERMONS };
  }
}
