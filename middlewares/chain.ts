import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware, MiddlewareFactory } from "../types/middlewareTypes";

export function chain(
  functions: MiddlewareFactory[],
  index = 0
): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);

    return current((request, event, response) => {
      if (response.status >= 300 && response.status < 400) {
        return response;
      }

      return next(request, event, response);
    });
  }

  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    return response;
  };
}
