import { config } from "@/config.js";
import "@/css/animations.css";
import "@/css/common.css";
import "@/css/theme.css";
import AuthGuard from "@/providers/AuthGuard.jsx";
import NextAuthProvider from "@/providers/NextAuthProvider.jsx";
import NotificationProvider from "@/providers/NotificationProvider.jsx";
import ReduxProvider from "@/providers/StoreProvider.jsx";
import ThemeProvider from "@/providers/ThemeProvider.jsx";
import { Plus_Jakarta_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";

const PlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--plus-jakarta-sans",
});

export async function generateMetadata() {
  try {
    const res = await fetch(config.apiBaseUrl + "/general-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      return {
        title: "Workdear",
        description: "Made with love by Workdear",
      };
    }

    const data = await res.json();

    return {
      title: data.site_name,
      description: data.site_description,
      icons: {
        icon: config.fileBaseUrl + data.site_favicon,
      },
      openGraph: {
        type: "website",
        url: config.siteUrl,
        title: data.site_name,
        description: data.site_description,
        siteName: data.site_name,
        images: [
          {
            url: config.fileBaseUrl + data.site_favicon,
            width: 1200,
            height: 630,
            alt: data.site_name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.site_name,
        description: data.site_description,
        images: [config.fileBaseUrl + data.site_favicon],
      },
    };
  } catch (error) {
    return {
      title: "Workdear",
      description: "Made with love by Workdear",
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={PlusJakartaSans.className}>
        <NextAuthProvider>
          <ReduxProvider>
            <ThemeProvider>
              <AuthGuard>
                <NotificationProvider>{children}</NotificationProvider>
              </AuthGuard>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                toastClassName="toastify-toast"
                progressClassName="toastify-progress"
              />
            </ThemeProvider>
            <NextTopLoader showSpinner={false} color="#2ea3b4" />
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
