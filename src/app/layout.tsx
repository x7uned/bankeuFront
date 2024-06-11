import type { Metadata } from "next";
import "./globals.css";
import { HeaderContainer } from "./components/header/header";
import { StoreProvider } from "@/redux/StoreProvider";

export const metadata: Metadata = {
  title: "PigBank",
  description: "Pigbank literally",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <StoreProvider>
      <html lang="en">
        <body>
            <HeaderContainer />
            {children}
        </body>
      </html>
    </StoreProvider>
  );
}
