import { refreshTokens } from "@/shared/refreshToken";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

async function customFetch(
  ctx: GetServerSidePropsContext,
  url: string,
  options: RequestInit
) {
  const cookies = parseCookies(ctx);
  let accessToken = cookies.accessToken;

  if (!accessToken) {
    const refreshTokenResponse = await refreshTokens(ctx.req, ctx.res);

    if (!refreshTokenResponse.ok) {
      ctx.res.writeHead(302, { Location: "/auth/login" });
      ctx.res.end();
      return;
    }

    accessToken = refreshTokenResponse.accessToken!;
  }

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(
    process.env.NEXT_PUBLIC_APP_API_URL! + url,
    options
  );

  return response;
}

export default customFetch;
