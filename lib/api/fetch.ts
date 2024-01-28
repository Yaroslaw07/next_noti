import { refreshTokens } from "@/features/auth/refreshToken";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

async function fetchCall(
  ctx: GetServerSidePropsContext,
  url: string,
  options: RequestInit
) {
  const cookies = parseCookies(ctx);
  let accessToken = cookies.accessToken;

  if (!accessToken) {
    const refreshTokenResponse = cookies.refreshToken
      ? await refreshTokens(ctx.req, ctx.res)
      : null;

    if (!cookies.refreshToken && !refreshTokenResponse!.ok) {
      ctx.res.writeHead(302, { Location: "/auth/login" });
      ctx.res.end();
      return;
    }

    accessToken = refreshTokenResponse!.accessToken!;
  }

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(
    process.env.NEXT_PUBLIC_APP_API_URL! + url,
    options
  );

  return response;
}

export default fetchCall;
