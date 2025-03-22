'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignUpData, SignInData } from '@/types/auth';
import { createServiceRoleClient, createServerSupabaseClient } from '../supabase/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// サインアップ
export async function signUp(data: SignUpData) {
  const supabase = createServerSupabaseClient();

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // ユーザーテーブルにレコードを作成
  if (authData?.user) {
    const serviceClient = createServiceRoleClient();
    await serviceClient
      .from('users')
      .insert({
        id: authData.user.id,
        email: authData.user.email,
        created_at: new Date().toISOString(),
      });
  }

  return { success: true, user: authData?.user };
}

// サインイン
export async function signIn(data: SignInData) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // セッションの確認
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, error: "セッションの作成に失敗しました" };
  }

  return { success: true, user: authData?.user };
}

// サインアウト
export async function signOut() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();
  cookies().delete('supabase-auth-token');
  redirect('/login');
}

// 現在のセッション取得
export async function getSession() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    return null;
  }

  return data.session;
}
