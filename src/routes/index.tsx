import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/hospital-site";
import { pageMetadata } from "@/lib/page-metadata";

export const Route = createFileRoute("/")({
  head: () => ({ meta: pageMetadata("Hendge Hospital | Eye & Dental Care in Nanded", "Explore thoughtful eye and dental care at Hendge Hospital in Nanded, Maharashtra.") }),
  component: HomePage,
});
