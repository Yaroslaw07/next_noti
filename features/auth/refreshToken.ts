import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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

    const decodedAccessToken = jwt.decode(accessToken) as jwt.JwtPayload;
    const accessTokenExpTime = decodedAccessToken?.exp;

    if (!accessTokenExpTime) {
      return { ok: false };
    }

    const remainingTime = accessTokenExpTime - Math.floor(Date.now() / 1000);

    setCookie({ res }, "accessToken", accessToken, {
      maxAge: remainingTime,
      path: "/",
    });

    const decodedRefreshToken = jwt.decode(refreshToken) as jwt.JwtPayload;
    const refreshTokenExpTime = decodedRefreshToken?.exp;

    if (!refreshTokenExpTime) {
      return { ok: false };
    }

    const refreshTokenRemainingTime =
      refreshTokenExpTime - Math.floor(Date.now() / 1000);

    setCookie({ res }, "refreshToken", refreshToken, {
      maxAge: refreshTokenRemainingTime,
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
