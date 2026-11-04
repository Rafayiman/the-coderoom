import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { site, organisationJsonLd, pageMeta } from "@/config/site";
import { LogoMark } from "@/components/shared/Logo";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

function ErrorLayout({
  code,
  title,
  text,
  children,
}: {
  code: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center text-foreground">
      <LogoMark className="h-12 w-12" />
      <span className="eyebrow mt-8">{code}</span>
      <h1 className="t-h2 mt-4 max-w-md">{title}</h1>
      <p className="mt-4 max-w-sm text-muted-foreground">{text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <ErrorLayout
      code="404"
      title="Page not found"
      text="The page you are looking for does not exist or has moved."
    >
      <Link to="/" className="btn btn-primary">
        Back to home
      </Link>
      <Link to="/projects" className="btn btn-outline">
        View projects
      </Link>
    </ErrorLayout>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <ErrorLayout
      code="Error"
      title="Something went wrong"
      text="Please try again, or head back to the homepage."
    >
      <button
        type="button"
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="btn btn-primary"
      >
        Try again
      </button>
      <Link to="/" className="btn btn-outline">
        Back to home
      </Link>
    </ErrorLayout>
  );
}

const defaults = pageMeta(site.name, site.description, "/");

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...defaults.meta,
      { name: "author", content: site.name },
      { name: "theme-color", content: "#ffffff" },
      { property: "og:site_name", content: site.name },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg?v=cr3", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-32.png?v=cr3", sizes: "32x32", type: "image/png" },
      { rel: "icon", href: "/favicon.png?v=cr3", sizes: "any", type: "image/png" },
      { rel: "shortcut icon", href: "/favicon.ico?v=cr3" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=cr3" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          // Static, developer-authored JSON: no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd()) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useSmoothScroll();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
