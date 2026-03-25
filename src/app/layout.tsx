import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Rappi Analytics",
  description: "Chatbot de análisis operacional para equipos SP&A y Operations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Sidebar />
        <main className="ml-16 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
