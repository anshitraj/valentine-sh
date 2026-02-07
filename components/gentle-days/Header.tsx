"use client";

import { Heart } from "lucide-react";
import { HeaderPanda } from "@/components/CuteDecorations";
import { SoundToggle } from "@/components/SoundToggle";

export default function Header() {
  return (
    <header className="relative text-center py-12 px-4">
      <div className="absolute right-4 top-4 z-10">
        <SoundToggle />
      </div>
      <div className="inline-flex items-center justify-center gap-2 mb-4">
        <Heart className="w-6 h-6 text-[hsl(var(--primary))] animate-pulse-soft" />
        <Heart className="w-8 h-8 text-[hsl(var(--heart))] animate-float" />
        <Heart className="w-6 h-6 text-[hsl(var(--primary))] animate-pulse-soft" />
      </div>
      <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[hsl(var(--foreground))] mb-3 inline-flex items-center justify-center gap-1 flex-wrap">
        Valentine&apos;s Week <span className="text-gradient-rose">💕</span>
        <HeaderPanda />
      </h1>
      <p className="text-[hsl(var(--muted-foreground))] text-lg font-light">
        A small surprise, one day at a time
      </p>
    </header>
  );
}
