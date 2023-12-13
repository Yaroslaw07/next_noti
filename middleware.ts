import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { parseCookies } from "nookies";

export const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (
      request.cookies.get("accessToken") &&
      request.cookies.get("refreshToken")
    ) {
      return NextResponse.redirect(new URL("/vaults", request.url));
    }

    const refreshToken = request.cookies.get("refreshToken");

    if (!refreshToken) {
      return NextResponse.next();
    }

    const response = await fetch(
      request.nextUrl.protocol + request.nextUrl.host + "/api/auth/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refreshToken=${refreshToken.value}`,
        },
        credentials: "include",
      }
    );

    return response.ok
      ? NextResponse.redirect(new URL("/vaults", request.url), {
          headers: {
            "set-cookie": response.headers.get("set-cookie")!,
          },
        })
      : NextResponse.next({
          headers: {
            "set-cookie": "refreshToken=; Max-Age=0; Path=/",
          },
        });
  }

  if (
    request.nextUrl.pathname.startsWith("/vaults") ||
    request.nextUrl.pathname.startsWith("/note")
  ) {
    if (
      request.cookies.get("accessToken") &&
      request.cookies.get("refreshToken")
    ) {
      return NextResponse.next();
    }

    const refreshToken = request.cookies.get("refreshToken");

    if (!refreshToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const response = await fetch(
      request.nextUrl.protocol + request.nextUrl.host + "/api/auth/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refreshToken=${refreshToken.value}`,
        },
        credentials: "include",
      }
    );

    return response.ok
      ? NextResponse.next({
          headers: {
            "set-cookie": response.headers.get("set-cookie")!,
          },
        })
      : NextResponse.redirect(new URL("/auth/login", request.url), {
          headers: {
            "set-cookie": "refreshToken=; Max-Age=0; Path=/",
          },
        });
  }

  return NextResponse.next();
};
