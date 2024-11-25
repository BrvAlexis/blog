import { createSearchParamsCache } from "nuqs/server";
import { NextRequest } from "next/server";

export const searchParamsCache = createSearchParamsCache({
  getRequest: () => globalThis.request as NextRequest,
}); 