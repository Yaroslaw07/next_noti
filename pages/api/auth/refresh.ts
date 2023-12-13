import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).end();
  }

  const cookieRefreshToken = parseCookies({ req }).refreshToken;

  if (cookieRefreshToken === undefined) {
    destroyCookie({ res }, "refreshToken");

    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_APP_API_URL + "/auth/refresh",
      {
        refreshToken: cookieRefreshToken,
      }
    );

    const { accessToken, refreshToken } = response.data;

    setCookie({ res }, "accessToken", accessToken, {
      maxAge: +process.env.ACCESS_TOKEN_EXP_TIME!,
      path: "/",
    });

    setCookie({ res }, "refreshToken", refreshToken, {
      maxAge: +process.env.REFRESH_TOKEN_EXP_TIME!,
      path: "/",
      httpOnly: true,
    });

    return res.status(200).json({ message: "Refresh token successful" });
  } catch (error) {
    destroyCookie({ res }, "refreshToken");
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default handler;
