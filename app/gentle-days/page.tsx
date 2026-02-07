"use client";

import Image from "next/image";
import Header from "@/components/gentle-days/Header";
import DayCard from "@/components/gentle-days/DayCard";
import SpecialCard from "@/components/gentle-days/SpecialCard";
import MoodCheck from "@/components/gentle-days/MoodCheck";
import WhatsAppButton from "@/components/gentle-days/WhatsAppButton";
import Link from "next/link";

export default function GentleDaysPage() {
  return (
    <div className="min-h-screen">
      <div className="container max-w-2xl mx-auto px-4 pb-16 relative">
        <nav className="pt-4 flex justify-center">
          <Link
            href="/"
            className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
          >
            ← View as calendar
          </Link>
        </nav>
        <Header />

        <div className="space-y-6">
          <DayCard date="Feb 7" dayName="Friday" title="Rose Day" emoji="🌹">
            <p className="text-[hsl(var(--foreground))]/80 text-sm leading-relaxed">
              One rose for the start of this week — simple, sweet, and just for you.
            </p>
            <p className="text-[hsl(var(--foreground))]/80 text-sm leading-relaxed mt-2">
              Here&apos;s to the small things that make days a little brighter 💗
            </p>
          </DayCard>

          <DayCard
            date="Feb 8"
            dayName="Saturday"
            title="Birthday"
            emoji="🎂"
            special
          >
            <div className="space-y-4">
              <p className="font-serif text-2xl text-[hsl(var(--foreground))]">
                Happy Birthday, Srushti 🎉
              </p>
              <p className="text-[hsl(var(--foreground))]/80 text-sm leading-relaxed">
                I just wanted to say this:
              </p>
              <p className="text-[hsl(var(--foreground))]/80 text-sm leading-relaxed">
                You seem genuinely sweet, and talking to you feels easy. I&apos;m glad we matched,
                and I hope today adds a small smile to your day 💗
              </p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-6 italic border-t border-[hsl(var(--border))] pt-4">
                No expectations from this — just something I genuinely wanted to do.
              </p>
            </div>
          </DayCard>

          <DayCard date="Feb 9" dayName="Sunday" title="Chocolate Day" emoji="🍫">
            <p className="text-[hsl(var(--foreground))]/80 text-sm leading-relaxed">
              Here is a little virtual chocolate moment for today.
              <br />
              <br />
              Imagine dark chocolate -- calm, classy, and comforting.
            </p>
          </DayCard>

          <DayCard date="Feb 10" dayName="Monday" title="Teddy Day" emoji="🧸">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Image
                  src="/teddy.png"
                  alt="Cute teddy bear holding a heart"
                  width={160}
                  height={160}
                  className="object-contain rounded-2xl"
                />
              </div>
              <p className="text-[hsl(var(--foreground))]/80 text-sm leading-relaxed text-center">
                I could&apos;ve sent you a teddy...
                <br />
                but I don&apos;t know your address 😅
              </p>
              <p className="text-[hsl(var(--foreground))]/80 text-sm leading-relaxed text-center">
                So here&apos;s a virtual one.
                <br />
                Sometimes honesty &gt; fake surprises.
              </p>
            </div>
          </DayCard>

          <SpecialCard emoji="🏋️‍♀️" title="Quick Gym Check">
            <div className="space-y-3">
              <p>Quick check:</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] text-sm">
                  Water ✓
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] text-sm">
                  Protein ✓
                </span>
              </div>
              <p className="mt-3">
                If yes — proud of you.
                <br />
                If not — this is your reminder 😌
              </p>
            </div>
          </SpecialCard>

          <DayCard date="Feb 11" dayName="Tuesday" title="Promise Day" emoji="🤝">
            <div className="space-y-3">
              <p className="text-[hsl(var(--foreground))]/80 text-sm leading-relaxed">
                No big promises.
                <br />
                Just this one:
              </p>
              <p className="text-[hsl(var(--foreground))] text-base leading-relaxed font-medium">
                I&apos;ll keep this respectful, honest, and real.
                <br />
                No rushing. No pretending.
              </p>
            </div>
          </DayCard>

          <DayCard date="Feb 12" dayName="Wednesday" title="Hug Day" emoji="🤗">
            <p className="text-[hsl(var(--foreground))]/80 text-sm leading-relaxed">
              If virtual hugs actually worked,
              <br />
              you&apos;d be getting one right now.
              <br />
              <br />
              Consider this a gentle one 🙂
            </p>
          </DayCard>

          <SpecialCard emoji="🎶" title="This song reminded me of you today">
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden bg-[hsl(var(--secondary))]/50 aspect-video flex items-center justify-center">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/bo_efYhYU2A"
                  title="Calm song for you"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-xs text-[hsl(var(--muted-foreground))] italic">
                Imagine this playing during a calm walk or post-gym cooldown.
              </p>
            </div>
          </SpecialCard>

          <DayCard date="Feb 13" dayName="Thursday" title="Mood Check" emoji="🎭">
            <MoodCheck />
          </DayCard>

          <DayCard
            date="Feb 14"
            dayName="Friday"
            title="Valentine's Day"
            emoji="❤️"
            special
          >
            <div className="space-y-4">
              <p className="text-[hsl(var(--foreground))]/80 text-sm leading-relaxed">
                7-14 doesn&apos;t matter.
                <br />
                What matters is <span className="font-semibold text-[hsl(var(--foreground))]">you</span>.
              </p>
              <p className="text-[hsl(var(--foreground))]/80 text-sm leading-relaxed">
                If you ever feel like continuing this conversation off here,
                <br />
                WhatsApp works 🙂
              </p>
              <WhatsAppButton />
            </div>
          </DayCard>
        </div>

        <footer className="text-center mt-16 pt-8 border-t border-[hsl(var(--border))]">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Made with 💗 for someone special</p>
        </footer>
      </div>
    </div>
  );
}

