import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).end();
  }

  setCookie({ res }, "accessToken", "", {
    maxAge: 0,
    path: "/",
  });

  setCookie({ res }, "refreshToken", "", {
    maxAge: 0,
    path: "/",
  });

  return res.status(200).json({ message: "Logout successful" });
};

export default handler;
