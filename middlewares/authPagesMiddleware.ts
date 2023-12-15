import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

import { CustomMiddleware } from "@/types/middleware";

export function authPagesMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    if (!request.nextUrl.pathname.startsWith("/auth")) {
      return middleware(request, event, NextResponse.next());
    }

    if (request.cookies.get("refreshToken") !== undefined) {
      console.log();
      return middleware(
        request,
        event,
        NextResponse.redirect(new URL("/vaults", request.url))
      );
    }

    return middleware(request, event, NextResponse.next());
  };
}
