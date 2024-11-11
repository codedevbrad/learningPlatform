import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

// Custom middleware to run functions based on the route and request method
export default async function middleware(req) {
  const url = req.nextUrl;
  const path = url.pathname;
  const method = req.method;

  // Only execute middleware logic for PUT, POST, PATCH, DELETE requests (data-modifying actions)
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {

    // Check if the path starts with /admin
    if (path.startsWith('/admin')) {
      // Run some admin-specific logic for actions like POST, PUT, PATCH, DELETE
      console.log('Admin route logic executed for action method:', method);
      // Add more admin-related middleware logic here
    }

    // Check if the path starts with /authed
    if (path.startsWith('/authed')) {
      // Run some authenticated-specific logic for actions like POST, PUT, PATCH, DELETE
      console.log('Authed route logic executed for action method:', method);
      // Add more authed-related middleware logic here
    }
  }

  // Default Clerk middleware logic
  return clerkMiddleware()(req);
}

export const config = {
  matcher: [
    '/admin((?!.*\\..*|_next).*)',  // Matches all /admin routes
    '/authed/(.*)',                 // Matches any routes that follow after /authed/
    '/((?!.*\\..*|_next).*)',        // Keeps the rest of your existing matcher rules
    '/',
    '/(api|trpc)(.*)',
  ],
}; 