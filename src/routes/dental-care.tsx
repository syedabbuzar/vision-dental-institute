import { createFileRoute } from "@tanstack/react-router";

import { DentalCarePage } from "@/components/hospital-site";
import { pageMetadata } from "@/lib/page-metadata";

export const Route = createFileRoute("/dental-care")({
  head: () => ({ meta: pageMetadata("Dental Care | Hendge Hospital, Nanded", "Explore dental care and treatment services available at Hendge Hospital in Nanded.") }),
  component: DentalCarePage,
});