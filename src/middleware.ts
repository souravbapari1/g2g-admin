import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  console.log(req.auth);

  // Protect the /account page
  if (pathname.startsWith("/dashboard") && req.auth?.user?.role != "ADMIN") {
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
