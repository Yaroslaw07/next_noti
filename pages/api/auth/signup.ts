import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";
import jwt from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL + "/auth/signup";
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }),
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    console.log(response);
    res.status(response.status).json(errorMessage);
    return;
  }

  const { accessToken, refreshToken } = await response.json();

  if (!accessToken || !refreshToken) {
    res.status(400).end("Invalid response from server");
    return;
  }

  const decodedAccessToken = jwt.decode(accessToken) as jwt.JwtPayload;
  const accessTokenExpTime = decodedAccessToken?.exp;

  if (!accessTokenExpTime) {
    res.status(400).end("Invalid access token");
    return;
  }

  const remainingTime = accessTokenExpTime - Math.floor(Date.now() / 1000);

  setCookie({ res }, "accessToken", accessToken, {
    maxAge: remainingTime,
    path: "/",
  });

  const decodedRefreshToken = jwt.decode(refreshToken) as jwt.JwtPayload;
  const refreshTokenExpTime = decodedRefreshToken?.exp;

  if (!refreshTokenExpTime) {
    res.status(400).end("Invalid refresh token");
    return;
  }

  const refreshTokenRemainingTime =
    refreshTokenExpTime - Math.floor(Date.now() / 1000);

  setCookie({ res }, "refreshToken", refreshToken, {
    maxAge: refreshTokenRemainingTime,
    path: "/",
    httpOnly: true,
  });

  return res.status(200).json({ message: "Signup successful" });
};

export default handler;
