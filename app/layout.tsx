import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // puedes agregar los que necesites
  variable: '--font-jost', // opcional: para usar como CSS variable
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Veso',
  description: 'Tienda en linea',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${jost.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
