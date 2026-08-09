import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const title = "Disciplinas de ADS | Prof.ª Miriã Corrêa";
  const description = "Portal das disciplinas FBD, FTW e BDA, com conteúdos e atividades organizados por semana.";

  return {
    metadataBase,
    title,
    description,
    openGraph: { title, description, type: "website", locale: "pt_BR", images: [{ url: "/og.png", width: 1536, height: 1024, alt: "FBD, FTW e BDA — Prof.ª Miriã Corrêa" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
