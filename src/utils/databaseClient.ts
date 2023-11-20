import { createClient } from '@supabase/supabase-js';

const databaseurl = import.meta.env.VITE_SUPABASE_PROJECT_URL ?? '';
const databaseKey = import.meta.env.VITE_SUPABASE_KEY ?? '';

const supabase = createClient(databaseurl, databaseKey);

export default supabase;
