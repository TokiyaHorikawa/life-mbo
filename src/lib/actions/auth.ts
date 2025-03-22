'use server'

import { redirect } from 'next/navigation';
import { SignUpData, SignInData } from '@/types/auth';
import { createServiceRoleClient, createClient } from '../supabase/server';

// サインアップ
export async function signUp(data: SignUpData) {
  const supabase = createClient();

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
  const supabase = createClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, user: authData?.user };
}

// サインアウト
export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

// 現在のセッション取得
export async function getSession() {
  const supabase = createClient();

  // 安全な方法でユーザー情報のみを取得
  const { data } = await supabase.auth.getUser();

  // ユーザーがいない場合はnullを返す
  if (!data.user) {
    return null;
  }

  // セッションと同等の形式のオブジェクトを作成して返す
  return {
    user: data.user,
    // その他のセッション関連の情報
    expires_at: 0, // ダミー値
    access_token: ''  // ダミー値
  };
}
