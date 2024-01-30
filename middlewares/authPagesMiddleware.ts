import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

import { CustomMiddleware } from "@/types/middlewareTypes";

export function authPagesMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    if (!request.nextUrl.pathname.startsWith("/auth")) {
      return middleware(request, event, NextResponse.next());
    }

    if (request.cookies.get("refreshToken") !== undefined) {
      return middleware(
        request,
        event,
        NextResponse.redirect(new URL("/vaults", request.url))
      );
    }

    return middleware(request, event, NextResponse.next());
  };
}
