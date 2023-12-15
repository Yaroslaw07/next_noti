import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

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
    res.status(response.status).json(errorMessage);
    return;
  }

  const { accessToken, refreshToken } = await response.json();

  if (!accessToken || !refreshToken) {
    res.status(400).end("Invalid response from server");
    return;
  }

  setCookie({ res }, "accessToken", accessToken, {
    maxAge: +process.env.ACCESS_TOKEN_EXP_TIME!,
    path: "/",
  });

  setCookie({ res }, "refreshToken", refreshToken, {
    maxAge: +process.env.REFRESH_TOKEN_EXP_TIME!,
    path: "/",
    httpOnly: true,
  });

  return res.status(200).json({ message: "Signup successful" });
};

export default handler;
