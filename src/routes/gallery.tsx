import { createFileRoute } from "@tanstack/react-router";

import { GalleryPage } from "@/components/hospital-site";
import { pageMetadata } from "@/lib/page-metadata";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: pageMetadata("Hospital Gallery | Hendge Hospital", "View photographs of Hendge Hospital, its eye care facilities, team and community work in Nanded.") }),
  component: GalleryPage,
});