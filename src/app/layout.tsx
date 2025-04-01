import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Personal portfolio showcasing my work and skills",
};

const themeScript = `
  let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  let theme = localStorage.getItem('theme');
  
  if (!theme) {
    if (darkQuery.matches) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  } else {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen bg-[#ffffff] dark:bg-[#111827] text-[#111827] dark:text-[#ffffff] transition-colors duration-200">
            <Navbar />
            {children}
            <Footer />
            <Toaster position="bottom-right" toastOptions={{
              className: 'border border-gray-200 dark:border-gray-800',
              duration: 5000,
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
              },
            }} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
