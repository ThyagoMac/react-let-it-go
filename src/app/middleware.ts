import { isLogged } from "@/helpers/AuthHandler";
import { NextRequest, NextResponse } from "next/server";

console.log("pipi");

// 1. Specify protected and public routes
const sellerRoutes = ["/test"];
//const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public

  const path = req.nextUrl.pathname;
  const logged = isLogged();
  const isProtectedRoute = sellerRoutes.includes(path);
  //const isPublicRoute = publicRoutes.includes(path);

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !logged) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
