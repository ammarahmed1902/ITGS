import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/site/SiteHeader";
import { SiteFooter } from "../components/site/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 text-5xl font-display font-semibold text-navy">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-gold">Return home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-display font-semibold text-navy">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">Please try again or return home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-gold">Try again</button>
          <a href="/" className="btn-outline-navy">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Apna Islamabad Homes | Luxury Real Estate in Islamabad" },
      { name: "description", content: "Buy, sell, rent and invest in Islamabad's finest luxury properties with verified listings and trusted expert consultants." },
      { name: "author", content: "Apna Islamabad Homes" },
      { name: "keywords", content: "Islamabad real estate, luxury property Islamabad, buy house F-7, DHA Islamabad, Bahria Town, commercial Blue Area" },
      { property: "og:title", content: "Apna Islamabad Homes | Luxury Real Estate in Islamabad" },
      { property: "og:description", content: "Buy, sell, rent and invest in Islamabad's finest luxury properties with verified listings and trusted expert consultants." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_PK" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0A2342" },
      { name: "twitter:title", content: "Apna Islamabad Homes | Luxury Real Estate in Islamabad" },
      { name: "twitter:description", content: "Buy, sell, rent and invest in Islamabad's finest luxury properties with verified listings and trusted expert consultants." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e0004976-3f7c-4ab9-abfd-c19447cc7183/id-preview-814b8d90--060b199a-79f7-44d2-881f-a413ff6c74dd.lovable.app-1782905873428.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e0004976-3f7c-4ab9-abfd-c19447cc7183/id-preview-814b8d90--060b199a-79f7-44d2-881f-a413ff6c74dd.lovable.app-1782905873428.png" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "canonical", href: "https://apnaislamabadhomes.com/" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
