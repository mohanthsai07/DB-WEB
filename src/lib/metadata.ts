import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/constants";

export function createMetadata(title?: string): Metadata {
  return {
    title: title ? `${title} | ${SITE_NAME}` : SITE_NAME,
  };
}
