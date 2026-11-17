import { render, screen } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { PageHero } from "@/components/hospital-site";
import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches the home page and each hospital information page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    for (const path of ["/", "/about", "/eye-care", "/dental-care", "/services", "/gallery", "/contact", "/admin"]) {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId, `expected ${path} to match a content page`).not.toBe(rootRouteId);
    }
  });

  it("uses descriptive alt text on hero images", () => {
    render(
      <PageHero
        kicker="Dental care"
        title={<>Care for every <span>kind of smile.</span></>}
        copy="Explore dental services at Hendge Hospital."
        image="/test-dental.jpg"
        imageAlt="Natural teeth and gums under a gentle dental scan"
      />,
    );

    expect(screen.getByRole("img", { name: "Natural teeth and gums under a gentle dental scan" })).toBeInTheDocument();
    expect(document.querySelector('img[alt=""]')).toBeNull();
  });
});
