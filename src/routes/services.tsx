import { createFileRoute } from "@tanstack/react-router";

import { ServicesPage } from "@/components/hospital-site";
import { pageMetadata } from "@/lib/page-metadata";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: pageMetadata(
      "Services | Hendge Hospital, Nanded",
      "Explore eye care, dental services, optical support and checkups available at Hendge Hospital in Nanded.",
    ),
  }),
  component: ServicesPage,
});
