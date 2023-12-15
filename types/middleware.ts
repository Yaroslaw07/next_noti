import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { NextMiddlewareResult } from "next/dist/server/web/types";

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type MiddlewareFactory = (
  middleware: CustomMiddleware
) => CustomMiddleware;
