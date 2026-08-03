import localFont from "next/font/local";
import { Faculty_Glyphic } from "next/font/google";

export const facultyGlyphic = Faculty_Glyphic({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-faculty",
  display: "swap",
});

export const helveticaNeue = localFont({
  src: [
    {
      path: "../public/fonts/helvetica-neue/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/helvetica-neue/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
  display: "swap",
});

export const archimoto = localFont({
  src: [
    {
      path: "../public/fonts/archimoto/ArchimotoV00-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/archimoto/ArchimotoV00-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-archimoto",
  display: "swap",
});
