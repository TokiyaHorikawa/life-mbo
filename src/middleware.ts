import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createClient({
    cookieStore: {
      getAll: () => request.cookies.getAll(),
      set: (name, value, options) => {
        request.cookies.set(name, value)
        response = NextResponse.next({
          request,
        })
        response.cookies.set(name, value, options)
      }
    }
  })

  await supabase.auth.getUser()

  return response
}

// すべてのルートでミドルウェアを実行（特定のパスを除外）
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
