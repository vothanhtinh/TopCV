import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/test'];

export default function middleware(req: NextRequest) {
  const isAuthenticated = true;
  if (isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(`${absoluteURL.toString()}`);
  }
}
