import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected route patterns (platform tools, dashboard, workspaces)
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/tools(.*)",
  "/projects(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // If Clerk publishable key is not configured, allow pass-through for local sandbox evaluation
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
