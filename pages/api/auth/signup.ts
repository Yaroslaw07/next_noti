import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).end();
  }

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_APP_API_URL + "/auth/signup",
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }
    );

    const { accessToken, refreshToken } = response.data;

    if (!accessToken || !refreshToken) {
      res.status(400).end("Invalid response from server");
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
  } catch (error) {
    const err = error as AxiosError;
    res.status(err.status || 500).json({
      message:
        (err.response?.data as { message: string }).message || "Signup failed",
    });
  }
};

export default handler;
