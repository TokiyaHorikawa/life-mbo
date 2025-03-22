import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URLまたはキーが設定されていません');
  }

  return createClient(supabaseUrl, supabaseKey);
};

// クライアントサイドでの使用のために、シングルトンインスタンスを作成
export const supabase = createSupabaseClient();
