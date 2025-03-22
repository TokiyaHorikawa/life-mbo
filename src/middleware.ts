import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const createSupabaseClient = (
  request: NextRequest,
  response: NextResponse,
) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const cookieOptions: {
    get(name: string): string | undefined;
    set(name: string, value: string, options: CookieOptions): void;
    remove(name: string, options: CookieOptions): void;
  } = {
    get(name: string) {
      return request.cookies.get(name)?.value;
    },
    set(name: string, value: string, options: CookieOptions) {
      response.cookies.set({ name, value, ...options });
    },
    remove(name: string, options: CookieOptions) {
      response.cookies.delete({ name, ...options });
    },
  };

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: cookieOptions,
  });
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createSupabaseClient(req, res);

  // セッションの更新を確実に行う
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return res;
}

// すべてのルートでミドルウェアを実行（特定のパスを除外）
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
