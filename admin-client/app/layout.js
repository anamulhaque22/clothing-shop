import { ThemeProviders } from "@/contexts/ThemeContext";
import AuthProvider from "@/services/auth/auth-provider";
// import { Head } from "next/document";
import { Inter, Public_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const public_sans = Public_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <Head>
        <link rel="preload" href="/images/euphoria-white.png" as="image" />
        <link rel="preload" href="/images/euphoria.png" as="image" />
      </Head> */}
      <body className={`${inter.className} ${public_sans.className}`}>
        <AuthProvider>
          <ThemeProviders>{children}</ThemeProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
