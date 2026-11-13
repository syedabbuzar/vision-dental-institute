import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/components/hospital-site";
import { pageMetadata } from "@/lib/page-metadata";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: pageMetadata("Contact Hendge Hospital | Nanded", "Call, get directions or send an appointment enquiry to Hendge Hospital in Nanded.") }),
  component: ContactPage,
});