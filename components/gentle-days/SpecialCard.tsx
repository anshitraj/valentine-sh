"use client";

interface SpecialCardProps {
  emoji: string;
  title: string;
  children: React.ReactNode;
}

export default function SpecialCard({ emoji, title, children }: SpecialCardProps) {
  return (
    <div className="card-valentine card-hover-tilt rainbow-glow-hover p-6 bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--secondary))]/30">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{emoji}</span>
        <h3 className="font-serif text-lg font-semibold text-[hsl(var(--foreground))]">
          {title}
        </h3>
      </div>
      <div className="text-[hsl(var(--foreground))]/80 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
