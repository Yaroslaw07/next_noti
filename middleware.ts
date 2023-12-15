import { chain } from "@/middlewares/chain";
import { authPagesMiddleware } from "./middlewares/authPagesMiddleware";
import { protectedRoutesMiddleware } from "./middlewares/protectedRoutesMiddleware";

export default chain([authPagesMiddleware, protectedRoutesMiddleware]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
