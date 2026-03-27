import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(de|en)/:path*",
    "/((?!_next|_vercel|api|favicon\\.ico|.*\\.[a-zA-Z]{2,}).*)",
  ],
};
