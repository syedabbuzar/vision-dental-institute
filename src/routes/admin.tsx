import { createFileRoute } from "@tanstack/react-router";

import { GalleryManagerPage } from "@/components/hospital-site";
import { pageMetadata } from "@/lib/page-metadata";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: pageMetadata("Local Gallery Manager | Hendge Hospital", "Manage gallery images in this browser for the Hendge Hospital preview."),
  }),
  component: GalleryManagerPage,
});