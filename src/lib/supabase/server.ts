// server-side Supabase
import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export function getSupabaseServer(): SupabaseClient<any, any, any> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  if (!url || !anon) throw new Error('Supabase env not configured');
  return createClient(url, anon);
}

export function getSupabaseAdmin(): SupabaseClient<any, any, any> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  if (!url || !service) throw new Error('Admin env not configured');
  return createClient(url, service, { auth: { persistSession: false } });
}
