import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { type ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

type CreateClientOptions = {
  cookieStore?: {
    getAll: () => Array<{ name: string; value: string }>
    set?: (name: string, value: string, options?: Partial<ResponseCookie>) => void
  }
}

// createClient関数 - 引数なしでの呼び出しと、cookieStoreを指定しての呼び出しの両方をサポート
export const createClient = (options?: CreateClientOptions) => {
  // 引数がない場合はデフォルトでcookies()を使用
  const cookieStore = options?.cookieStore || cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set?.(name, value, options)
            })
          } catch (error) {
            // Handle cookies in edge functions
          }
        }
      },
    }
  )
}

// サービスロール用のクライアント
export const createServiceRoleClient = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      cookies: {
        getAll() {
          return []
        },
        setAll() {
          // サービスロールでは何もしない
        }
      }
    }
  )
}
