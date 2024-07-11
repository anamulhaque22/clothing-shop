import { ThemeProviders } from "@/contexts/ThemeContext";
import { Inter, Public_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const public_sans = Public_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${public_sans.className}`}>
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
