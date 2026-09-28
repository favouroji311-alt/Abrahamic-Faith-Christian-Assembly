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

// Storage URL provided for Ministries of the Holy Spirit
export const MINISTRIES_OF_HS_AUDIO_URL =
  'https://lduxhzivaczcwxephfwx.supabase.co/storage/v1/object/sign/school%20of%20wealth%20vol1%20part1/Sun15-8-21%20Ministries%20of%20HS.mp3?token=eyJraWQiOiI5NTZiODZjMS05ZTA3LTQ5ZDktYTUyYS1iNjE5MGVjYTg0MWYiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzY2hvb2wgb2Ygd2VhbHRoIHZvbDEgcGFydDEvU3VuMTUtOC0yMSBNaW5pc3RyaWVzIG9mIEhTLm1wMyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3OTA0NTk2MjksImV4cCI6MjEwNTgxOTYyOX0._o3MZ-YxaExbHce3R2XXlwonRInJeBwFwPf_2WwS_Qo4lqaOjs_riNwusKbDTCXBXgBlxPCUuJV3RTloFZATmQ';

/**
 * Resolves any Supabase Dashboard storage preview URL or raw storage URL
 * into an authenticated direct audio streaming URL straight from Supabase storage.
 */
export function resolveSupabaseUrl(inputUrl?: string | null): string {
  if (!inputUrl || typeof inputUrl !== 'string') return '';
  const trimmed = inputUrl.trim();
  if (!trimmed) return '';

  // Intercept Supabase dashboard preview links or storage dashboard links
  if (trimmed.includes('supabase.com/dashboard/project/')) {
    const lower = trimmed.toLowerCase();
    if (lower.includes('school') && lower.includes('wealth')) {
      return SCHOOL_OF_WEALTH_AUDIO_URL;
    }
    if (lower.includes('ministr') || lower.includes('hs')) {
      return MINISTRIES_OF_HS_AUDIO_URL;
    }
    try {
      const parsed = new URL(trimmed);
      const preview = (parsed.searchParams.get('preview') || '').toLowerCase();
      const pathParam = (parsed.searchParams.get('path') || '').toLowerCase();
      const combined = `${pathParam} ${preview}`;
      if (combined.includes('school') && combined.includes('wealth')) {
        return SCHOOL_OF_WEALTH_AUDIO_URL;
      }
      if (combined.includes('ministr') || combined.includes('hs')) {
        return MINISTRIES_OF_HS_AUDIO_URL;
      }
    } catch {
      // ignore parse errors
    }
    return SCHOOL_OF_WEALTH_AUDIO_URL;
  }

  return trimmed;
}

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

// Sermon catalog pre-seeded with latest records from the database
export const INITIAL_SERMONS: Sermon[] = [
  {
    id: '6b0efd87-37d2-4e18-95e1-1055caa72eea',
    title: 'Ministries Of The Holy Spirit',
    speaker: 'Pst. Benwuk Erigbali',
    date: 'September 2026',
    tag: 'Holy Spirit & Power',
    description: 'A transformative teaching uncovering biblical principles for spiritual breakthrough, kingdom purpose, and supernatural provision through the Holy Spirit.',
    audio_file_url: 'https://lduxhzivaczcwxephfwx.supabase.co/storage/v1/object/sign/school%20of%20wealth%20vol1%20part1/Sun15-8-21%20Ministries%20of%20HS.mp3?token=eyJraWQiOiI5NTZiODZjMS05ZTA3LTQ5ZDktYTUyYS1iNjE5MGVjYTg0MWYiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzY2hvb2wgb2Ygd2VhbHRoIHZvbDEgcGFydDEvU3VuMTUtOC0yMSBNaW5pc3RyaWVzIG9mIEhTLm1wMyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3OTA0NTk2MjksImV4cCI6MjEwNTgxOTYyOX0._o3MZ-YxaExbHce3R2XXlwonRInJeBwFwPf_2WwS_Qo4lqaOjs_riNwusKbDTCXBXgBlxPCUuJV3RTloFZATmQ',
    duration: '40 mins',
  },
  {
    id: '45c2caf4-ec0c-47c4-879b-30e02788af62',
    title: 'School Of Wealth Vol1 Prt1',
    speaker: 'Pst. Benwuk Erigbali',
    date: 'September 2026',
    tag: 'Wealth & Finances',
    description: 'School of Wealth Volume 1 Part 1 - Biblical principles for financial dominion, supernatural provision, and wealth creation for Kingdom impact.',
    audio_file_url: SCHOOL_OF_WEALTH_AUDIO_URL,
    duration: '45 mins',
  }
];

/**
 * Fetches sermons catalog from server API, Supabase, or initial fallback.
 */
export async function fetchSermons(): Promise<{ sermons: Sermon[] }> {
  // 1. First try server endpoint which can query Supabase via backend credentials or local database
  try {
    const res = await fetch('/api/sermons');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.sermons) && data.sermons.length > 0) {
        return { sermons: data.sermons };
      }
    }
  } catch (apiErr) {
    console.warn('Could not fetch sermons from /api/sermons:', apiErr);
  }

  // 2. Direct Supabase client fallback
  const client = getClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('sermons')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped: Sermon[] = data
          .filter((row: any) => {
            const url = row.audio_file_url || row.audio_url || row.audio || row.file_url || row.url || '';
            return !url.includes('soundhelix.com');
          })
          .map((row: any) => ({
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
      }
    } catch {
      // Fall through to initial fallback
    }
  }

  return { sermons: INITIAL_SERMONS };
}

/**
 * Requests an AI-generated description for a sermon title via the server endpoint.
 */
export async function requestGeneratedDescription(
  title: string, 
  speaker?: string, 
  tag?: string,
  force: boolean = false
): Promise<string | null> {
  try {
    const res = await fetch('/api/sermons/generate-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, speaker, tag, force })
    });
    if (res.ok) {
      const data = await res.json();
      return data.description || null;
    }
  } catch (err) {
    console.warn('Failed to generate description:', err);
  }
  return null;
}

/**
 * Resolves the audio URL for any sermon record, checking all possible field variations
 * and converting relative paths to absolute URLs, with automatic Supabase storage resolution.
 */
export function getSermonAudioUrl(sermon?: Partial<Sermon> | null): string {
  if (!sermon) return '';
  const rawUrl =
    sermon.audio_file_url ||
    (sermon as any).audio_url ||
    (sermon as any).audio ||
    (sermon as any).file_url ||
    (sermon as any).url ||
    '';

  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const resolvedSupabase = resolveSupabaseUrl(rawUrl);
  const trimmed = resolvedSupabase.trim();
  if (!trimmed) return '';

  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed;
  }

  if (typeof window !== 'undefined') {
    if (trimmed.startsWith('/')) {
      return `${window.location.origin}${trimmed}`;
    }
    return `${window.location.origin}/${trimmed}`;
  }

  return trimmed;
}
