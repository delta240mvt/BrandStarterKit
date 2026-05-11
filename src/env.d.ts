/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    activeSiteSlug: string | null;
    activeSiteId: number | null;
  }
}