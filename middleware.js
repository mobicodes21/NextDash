import { NextResponse } from "next/server";

/**
 * Middleware to protect dashboard routes by checking authentication status.
 *
 * This function intercepts requests to protected routes and checks if the user is logged in
 * by reading the `isLoggedIn` cookie. If the user is not authenticated, they are redirected to the login page.
 *
 * @param {NextRequest} req - The incoming request object from Next.js.
 * @returns {NextResponse} - A redirect response if unauthorized, or the original request otherwise.
 */
export function middleware(req) {
  const isLoggedIn = req.cookies.get("isLoggedIn")?.value; // Read the authentication status from cookies
  const url = req.nextUrl.clone(); // Clone the URL object to modify path if needed

  // Check if the current route is under /dashboard and user is not authenticated
  if (url.pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      url.pathname = "/login"; // Redirect to login page if not logged in
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // Allow the request to continue if authenticated
}

// Configure the matcher to apply this middleware only to /dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
