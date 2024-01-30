import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

import { CustomMiddleware } from "@/types/middlewareTypes";

export function protectedRoutesMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    if ((request as any).next?.res.finished) {
      return NextResponse.next();
    }

    if (
      !request.nextUrl.pathname.startsWith("/vaults") &&
      !request.nextUrl.pathname.startsWith("/note")
    ) {
      return middleware(request, event, NextResponse.next());
    }

    if (!request.cookies.get("refreshToken")) {
      return middleware(
        request,
        event,
        NextResponse.redirect(new URL("/auth/login", request.url))
      );
    }

    return middleware(request, event, NextResponse.next());
  };
}
