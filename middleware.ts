import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/posts/:path*", "/new/:path*"],
};