import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  console.log(req.auth);

  // Protect the /account page
  if (pathname.startsWith("/dashboard")) {
    if (!req.auth?.user) {
      const url = new URL("/login", req.url);
      return NextResponse.redirect(url);
    }

    if (req.auth?.user?.role == "ADMIN") {
      return NextResponse.next();
    }

    if (req.auth?.user?.role == "MANAGER") {
      return NextResponse.next();
    }

    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }
  if (pathname.startsWith("/employee") && req.auth?.user?.role != "EMPLOYEE") {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }
  // Default response
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/employee/:path*"],
};
