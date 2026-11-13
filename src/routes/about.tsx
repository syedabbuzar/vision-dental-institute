import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/components/hospital-site";
import { pageMetadata } from "@/lib/page-metadata";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: pageMetadata("About Hendge Hospital | Nanded", "Learn about Hendge Hospital’s commitment to eye and dental care in Nanded since 2020.") }),
  component: AboutPage,
});