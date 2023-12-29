import { createClient } from '@supabase/supabase-js';

const databaseurl = (import.meta.env.VITE_SUPABASE_PROJECT_URL ?? '') as string;
const databaseKey = (import.meta.env.VITE_SUPABASE_KEY ?? '') as string;

const supabase = createClient(databaseurl, databaseKey);

export default supabase;
