import { createFileRoute } from "@tanstack/react-router";

import { EyeCarePage } from "@/components/hospital-site";
import { pageMetadata } from "@/lib/page-metadata";

export const Route = createFileRoute("/eye-care")({
  head: () => ({ meta: pageMetadata("Eye Care | Hendge Hospital, Nanded", "Explore eye examinations and ophthalmology services available at Hendge Hospital in Nanded.") }),
  component: EyeCarePage,
});