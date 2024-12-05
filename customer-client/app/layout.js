import SnackbarProvider from "@/components/snackbar-provider";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wish-list-context";
import AuthProvider from "@/services/auth/auth-provider";
import queryClient from "@/services/react-query/query-client";
import QueryClientProvider from "@/services/react-query/query-client-provider";
import GoogleAuthProvider from "@/services/social-auth/google/google-auth-provider";
import font from "./font";
import "./globals.css";

function conbineFontVariable(font) {
  let fontVariable = "";
  for (const key in font) {
    fontVariable += `${font[key].variable} `;
  }
  return fontVariable;
}

export const generateMetadata = async () => {
  return {
    title: "Euphoria Fashion",
    description: "Euphoria Fashion is a fashion store",
  };
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${conbineFontVariable(font)}  bg-white`}>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <SnackbarProvider maxSnack={3}>
            <AuthProvider>
              <GoogleAuthProvider>
                <CartProvider>
                  <WishlistProvider>{children}</WishlistProvider>
                </CartProvider>
              </GoogleAuthProvider>
            </AuthProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
