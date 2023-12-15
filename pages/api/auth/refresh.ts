import { refreshTokens } from "@/shared/refreshToken";
import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie, parseCookies } from "nookies";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).end();
  }

  const cookieRefreshToken = parseCookies({ req }).refreshToken;

  if (cookieRefreshToken === undefined) {
    destroyCookie({ res }, "refreshToken");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { ok } = await refreshTokens(req, res);

  if (!ok) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    return res.status(200).json({ message: "Refresh successful" });
  }
};

export default handler;
