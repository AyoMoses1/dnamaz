import type { Metadata } from "next";
import "@/app/_styles/globals.css";
import { Josefin_Sans} from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dnamaz Dashboard",
  description: "Invest in your future with Dnamaz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        {children}
      </body>
    </html>
  );
}
