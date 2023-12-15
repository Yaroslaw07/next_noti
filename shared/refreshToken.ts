import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

interface RefreshTokensResponse {
  ok: boolean;
  accessToken?: string;
  refreshToken?: string;
}

export async function refreshTokens(
  req:
    | NextApiRequest
    | (IncomingMessage & {
        cookies: NextApiRequestCookies;
      })
    | NextRequest,
  res: NextApiResponse | ServerResponse | NextResponse
): Promise<RefreshTokensResponse> {
  const refreshToken = parseCookies({ req }).refreshToken;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ refreshToken: refreshToken }),
    }
  );

  if (response.ok) {
    const { accessToken, refreshToken } = await response.json();

    setCookie({ res }, "accessToken", accessToken, {
      maxAge: +process.env.ACCESS_TOKEN_EXP_TIME!,
      path: "/",
    });

    setCookie({ res }, "refreshToken", refreshToken, {
      maxAge: +process.env.REFRESH_TOKEN_EXP_TIME!,
      path: "/",
      httpOnly: true,
    });

    return {
      ok: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } else {
    destroyCookie({ res }, "refreshToken");
    return { ok: false };
  }
}
