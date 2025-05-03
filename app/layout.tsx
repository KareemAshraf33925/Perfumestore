import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientLayout from"../store/Layout"
export const metadata: Metadata = {
  title: "Perfume Store",
  description: "Perfume Store it website contains many perfumes",

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <head>
      </head>
      <body>
       
           <ClientLayout>
           <Header/>
            {children}
            <Footer/>
           </ClientLayout>
        
      </body>
    </html>
  );
}
