import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession, decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const session = request.cookies.get('session')?.value;
    const payload = session ? await decrypt(session) : null;

    // Protected Admin Routes
    if (path.startsWith('/admin')) {
        if (!payload || payload.role !== 'admin') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Protected Client Routes
    if (path.startsWith('/mi-dashboard')) {
        if (!payload) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Auth Routes (redirect if already logged in)
    if (path === '/login' || path === '/register') {
        if (payload) {
            if (payload.role === 'admin') {
                return NextResponse.redirect(new URL('/admin/rifas', request.url));
            } else {
                return NextResponse.redirect(new URL('/mi-dashboard', request.url));
            }
        }
    }

    // Update session expiration (only if not redirecting)
    return await updateSession(request) || NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
