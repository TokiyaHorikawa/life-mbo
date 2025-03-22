import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL から code パラメータを削除
  requestUrl.searchParams.delete('code');

  // ダッシュボードにリダイレクト
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
