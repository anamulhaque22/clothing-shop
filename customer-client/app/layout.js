import AuthProvider from "@/services/auth/auth-provider";
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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
