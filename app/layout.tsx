import type { Metadata } from "next";
import "./globals.css";
import { FloatingBubbles } from "@/components/FloatingBubbles";
import { CuteDecorations } from "@/components/CuteDecorations";
import { PandaBubbleTrigger } from "@/components/PandaBubbleTrigger";
import { SoundProvider } from "@/contexts/SoundContext";
import { PandaBubbleProvider } from "@/contexts/PandaBubbleContext";

export const metadata: Metadata = {
  title: "Valentine's Week — For Srushti",
  description: "A little something for each day.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen font-sans text-stone-700 relative flex flex-col">
        <SoundProvider>
          <PandaBubbleProvider>
            <FloatingBubbles />
            <CuteDecorations />
            <PandaBubbleTrigger />
            <div className="relative z-10 flex-1">{children}</div>
            <footer className="py-6 text-center">
              <p className="text-xs text-stone-500/80">
                Created with love by Anshit ❤️
              </p>
            </footer>
          </PandaBubbleProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
