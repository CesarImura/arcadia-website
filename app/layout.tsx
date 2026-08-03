import type { ReactNode } from "react";
import {
  archimoto,
  facultyGlyphic,
  helveticaNeue,
} from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${helveticaNeue.variable} ${archimoto.variable} ${facultyGlyphic.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
