import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { WeekTheme } from "@/components/cruise/WeekTheme";
import { PwaBoot } from "@/components/pwa/PwaBoot";
import appCss from "../styles.css?url";
import resetCss from "../cruise-reset.css?url";
import motionCss from "../cruise-motion.css?url";

const APP_NAME = "BIG CRUISE";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "format-detection", content: "telephone=no" },
      { title: APP_NAME },
      {
        name: "description",
        content: "BIG CRUISE. Games on your phone. Where the cruise lives.",
      },
      { name: "theme-color", content: "#0B0B0B" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: resetCss },
      { rel: "stylesheet", href: motionCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-midnight text-bone">
        <PreviewHostBridge />
        <PwaBoot />
        <WeekTheme />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
