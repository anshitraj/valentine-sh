"use client";

import { useEffect, useRef, useState } from "react";
import type { DayKey } from "@/app/page";
import { useSound } from "@/contexts/SoundContext";
import { InteractiveBubble } from "./InteractiveBubble";
import { GiftBoxAnimation } from "./GiftBoxAnimation";
import { BalloonAnimation } from "./BalloonAnimation";
import { CakeCut } from "./CakeCut";
import { FunQuiz } from "./FunQuiz";
import { BirthdayWishResponse } from "./BirthdayWishResponse";
import { DailyFunGemini } from "./DailyFunGemini";
import { HoroscopeCard } from "./HoroscopeCard";

const SPOTIFY_BLEND_URL =
  "https://open.spotify.com/blend/taste-match/df58a5471be8f703?si=VW4TPopcQSCS0mCIZ9LGaA&fallback=getapp&blendDecoration=5f9c38d2";

const MICRO_SURPRISES = [
  "You're doing better than you think 🌸",
  "Reminder: eat properly today",
  "Small wins still count ✨",
];

type Props = {
  day: DayKey | null;
  onClose: () => void;
  showFeb8Birthday: boolean;
  setShowFeb8Birthday: (v: boolean) => void;
};

export function GiftModal({ day, onClose, showFeb8Birthday, setShowFeb8Birthday }: Props) {
  const { playGiftOpen, playBirthday } = useSound();
  const [boxComplete, setBoxComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [mounted, setMounted] = useState(false);
  const balloonsFired = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!day) {
      setBoxComplete(false);
      setShowContent(false);
      setShowFeb8Birthday(false);
      setShowBalloons(false);
      balloonsFired.current = false;
      return;
    }
    setBoxComplete(false);
    setShowContent(false);
  }, [day, setShowFeb8Birthday]);

  const handleBoxComplete = () => {
    setBoxComplete(true);
    if (day === 8) {
      setShowFeb8Birthday(true);
    } else {
      playGiftOpen();
      setShowContent(true);
    }
  };

  useEffect(() => {
    if (!boxComplete || day !== 8 || !showFeb8Birthday) return;
    const t = setTimeout(() => {
      setShowContent(true);
      if (!balloonsFired.current) {
        balloonsFired.current = true;
        playBirthday();
        setShowBalloons(true);
      }
    }, 1800);
    return () => clearTimeout(t);
  }, [boxComplete, day, showFeb8Birthday, playBirthday]);

  if (!mounted || day === null) return null;

  const isFeb8 = day === 8;
  const showBirthdayOverlay = isFeb8 && boxComplete && !showContent;

  return (
    <>
      {day && !boxComplete && (
        <GiftBoxAnimation onComplete={handleBoxComplete} />
      )}

      {boxComplete && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 animate-fade-in"
            onClick={onClose}
            aria-hidden
          />
          <div
            className={`fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-[2rem] shadow-modal-cute animate-slide-up sm:inset-auto sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:right-auto sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[2rem] sm:animate-modal-in ${
              day === 8 ? "bg-rose-100 border-2 border-rose-300" : "bg-white border border-stone-200/80"
            }`}
            style={{ backgroundColor: day === 8 ? "rgb(255 228 230)" : "rgb(255 255 255)" }}
            role="dialog"
            aria-modal="true"
            aria-label={`Gift for Feb ${day}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cute corner icons */}
            <span className="absolute left-4 top-4 text-xl opacity-40" aria-hidden>💕</span>
            <span className="absolute right-12 top-4 text-lg opacity-30" aria-hidden>🐼</span>
            {showBirthdayOverlay && (
              <div className="flex min-h-[280px] flex-col items-center justify-center px-6 py-10 text-center">
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-rose-700">
                  Happy Birthday, Srushti 🎉
                </p>
                <p className="mt-2 text-muted">Opening your gift...</p>
              </div>
            )}

            {showBalloons && day === 8 && (
              <BalloonAnimation onDone={() => setShowBalloons(false)} />
            )}

            {showContent && (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className={`absolute right-4 top-4 z-10 rounded-full p-2 transition-colors ${
                    day === 8 ? "text-rose-900 hover:bg-rose-300/80" : "text-muted hover:bg-rose-100 hover:text-rose-700"
                  }`}
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="p-6 pt-12 pb-8">
                  <DayContent day={day} />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

function DayContent({ day }: { day: DayKey }) {
  const [microSurprise] = useState(() =>
    MICRO_SURPRISES[Math.floor(Math.random() * MICRO_SURPRISES.length)]
  );
  const showSpotify = day === 10;

  switch (day) {
    case 7:
      return (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-semibold text-rose-700">Rose Day 🌹</h2>
          <p className="text-stone-600 text-sm">Anshit is sending you roses like this 💐</p>
          <div className="flex justify-center py-2">
            <img src="/rose.webp" alt="Roses" className="max-h-48 w-auto object-contain rounded-xl" />
          </div>
          <p className="text-stone-600 leading-relaxed">
            One rose for the start of this week — simple, sweet, and just for you.
          </p>
          <p className="text-stone-600 leading-relaxed">
            Here&apos;s to the small things that make days a little brighter 💗
          </p>
          <InteractiveBubble
            title="Roses are red and violets are blue, there's nothing in the world more prettier than you. Waise roses bhejoon kya? (click me) 🌹"
            icon="🌹"
            color="bg-rose-100 border-rose-200"
            yesNo
            yesText="Yaar abhi virtual se kaam chala lo, next baar Ahmedabad aajunga dene 🌹"
            noText="Koi baat nahi — virtual roses bhi dil se hain. Next time pakka! 💗"
          />
          <FunQuiz
            question="Pick one: Roses or Chocolates?"
            icon="🌹"
            options={[
              { label: "Roses", response: "Roses for you, Srushti — simple and lovely, just like you. Hope your day is as bright as you are." },
              { label: "Chocolates", response: "Chocolates it is, Srushti — sweet and a little indulgent. You deserve the good stuff." },
            ]}
            pastelColor="bg-rose-50 border-rose-200"
          />
          <p className="text-sm text-muted pt-2">{microSurprise}</p>
        </div>
      );
    case 8:
      return (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-semibold text-rose-800">
            Birthday 🎂
          </h2>
          <div className="flex justify-center py-2">
            <img src="/birthday.jpg" alt="Birthday" className="max-h-56 w-auto object-contain rounded-xl" />
          </div>
          <p className="text-stone-600 leading-relaxed">
            Today is Propose Day, but I won&apos;t make it heavy or awkward. I just wanted to say
            this:
          </p>
          <p className="text-stone-700 leading-relaxed font-medium">
            You seem genuinely sweet, and talking to you feels easy. I&apos;m glad we matched, and I
            hope today adds a small smile to your day 💗
          </p>
          <p className="text-sm text-muted pt-2">
            No expectations from this — just something I genuinely wanted to do.
          </p>
          <CakeCut />
          <div className="pt-2 border-t border-rose-200/60">
            <BirthdayWishResponse />
          </div>
          <p className="text-sm text-rose-600/80 pt-2 sparkle">{microSurprise}</p>
        </div>
      );

    case 9:
      return (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-semibold text-rose-700">Chocolate Day 🍫</h2>
          <div className="flex justify-center py-2">
            <img src="/chocolate.jpg" alt="Chocolate Day" className="max-h-48 w-auto object-contain rounded-xl" />
          </div>
          <p className="text-stone-600 leading-relaxed">
            Here is a little virtual chocolate moment for today. Imagine dark chocolate -- calm,
            classy, and comforting.
          </p>
          <FunQuiz
            question="Sweet tooth level?"
            icon="🍫"
            options={[
              { label: "Very sweet", response: "Srushti, you and very sweet go together. Hope today is as sweet as you are." },
              { label: "Balanced", response: "Balanced is the way, Srushti. A little bit of everything — just right." },
              { label: "Depends on mood", response: "Mood-based is totally valid, Srushti. Whatever you feel like today, go for it." },
            ]}
            pastelColor="bg-amber-50 border-amber-200"
          />
          <p className="text-sm text-muted">{microSurprise}</p>
        </div>
      );

    case 10:
      return (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-semibold text-rose-700">Teddy Day 🧸</h2>
          <div className="flex justify-center">
            <img
              src="/teddy.png"
              alt="Cute teddy"
              className="h-40 w-auto object-contain"
            />
          </div>
          <p className="text-stone-600 leading-relaxed">
            I could&apos;ve sent you a teddy... but I don&apos;t know your address 😅 So here&apos;s a
            virtual one. Sometimes honesty &gt; fake surprises.
          </p>
          <FunQuiz
            question="Tap to pick: what would you do with a teddy?"
            icon="🧸"
            options={[
              { label: "Hug it", response: "Virtual hug sent your way, Srushti. Hope it feels a little warmer." },
              { label: "Keep it on the bed", response: "Cozy vibes, Srushti. Perfect for calm nights." },
              { label: "Gift it forward", response: "That's really sweet of you, Srushti. The world needs more of that." },
            ]}
            pastelColor="bg-amber-50 border-amber-200"
          />
          <FunQuiz
            question="What's your favorite place to visit?"
            icon="🤔"
            options={[
              { label: "Shimla", response: "Mountains + coffee + cold weather? Solid choice 😌" },
              { label: "Himalayas", response: "Okay explorer ✈️ That's main-character energy." },
              { label: "Beach", response: "Vitamin sea person, I see 🌊" },
              { label: "Stay at home", response: "Honestly... elite answer." },
            ]}
            pastelColor="bg-amber-50 border-amber-200"
          />
          {showSpotify && <SpotifyCard />}
        </div>
      );

    case 11:
      return (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-semibold text-rose-700">Promise Day 🤝</h2>
          <div className="flex justify-center py-2">
            <img src="/promise.jpg" alt="Promise Day" className="max-h-48 w-auto object-contain rounded-xl" />
          </div>
          <p className="text-stone-600 leading-relaxed">
            No big promises. Just this one:
          </p>
          <p className="text-stone-700 font-medium">
            I&apos;ll keep this respectful, honest, and real. No rushing. No pretending.
          </p>
          <HoroscopeCard />
          <p className="text-sm text-muted">{microSurprise}</p>
        </div>
      );

    case 12:
      return (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-semibold text-rose-700">Hug Day 🤗</h2>
          <div className="flex justify-center py-2">
            <img src="/hugday.webp" alt="Hug Day" className="max-h-48 w-auto object-contain rounded-xl" />
          </div>
          <p className="text-stone-600 leading-relaxed">
            If virtual hugs actually worked, you&apos;d be getting one right now. Consider this a
            soft one 🙂
          </p>
          <DailyFunGemini
            type="hug"
            question="What kind of hug do you like?"
            icon="🤗"
            options={[
              { label: "Warm", value: "Warm" },
              { label: "Quick", value: "Quick" },
              { label: "Long", value: "Long" },
            ]}
            pastelColor="bg-pink-50 border-pink-200"
          />
        </div>
      );

    case 13:
      return (
        <div className="space-y-5">
          <h2 className="font-serif text-xl font-semibold text-rose-700">Mood & Care Day 🎭💧</h2>
          <FunQuiz
            question="Compliments or quality time?"
            icon="💬"
            options={[
              { label: "Compliments", response: "Words matter, Srushti. Fair." },
              { label: "Quality time", response: "Actions over words, Srushti. Mature answer." },
            ]}
            pastelColor="bg-sky-50 border-sky-200"
          />
          <FunQuiz
            question="How's your energy today?"
            icon="🎭"
            options={[
              { label: "High", response: "Love that energy, Srushti. Use it well." },
              { label: "Medium", response: "Medium is totally fine, Srushti. Steady wins." },
              { label: "Low", response: "Low days happen, Srushti. Be kind to yourself." },
            ]}
            pastelColor="bg-sky-50 border-sky-200"
          />
          <div className="space-y-3">
            <InteractiveBubble
              title="How are you feeling today?"
              icon="🎭"
              color="bg-pink-100 border-pink-200"
              responses={[
                "Whatever your mood is today, I hope something small makes it better 💗",
                "Some days don't need fixing. Just understanding.",
                "Gym day + water + protein = emotional stability 😄",
              ]}
              randomResponse
            />
            <InteractiveBubble
              title="Did you drink enough water today?"
              icon="💧"
              color="bg-sky-100 border-sky-200"
              yesNo
              yesText="Good. Hydration is attractive 😌"
              noText="Go drink water right now. Dehydration is not the vibe 😤💧"
            />
            <InteractiveBubble
              title="Gym done today?"
              icon="🏋️‍♀️"
              color="bg-amber-100 border-amber-200"
              yesNo
              yesText="Proud of you 💪✨"
              noText="Rest days count too. Just don't skip water 😄"
            />
          </div>
        </div>
      );

    case 14:
      return (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-semibold text-rose-700">Valentine&apos;s Day ❤️</h2>
          <p className="text-stone-600 leading-relaxed">
            7-14 doesn&apos;t matter. What matters is you.
          </p>
          <DailyFunGemini
            type="valentine"
            question="What do you enjoy more?"
            icon="❤️"
            options={[
              { label: "Talking", value: "Talking" },
              { label: "Listening", value: "Listening" },
              { label: "Both", value: "Both" },
            ]}
            pastelColor="bg-pink-50 border-pink-200"
          />
          <p className="text-stone-600 leading-relaxed">
            If you ever feel like continuing this conversation off here, WhatsApp works 🙂
          </p>
          <a
            href="https://wa.me/918739012274"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-white font-medium shadow soft hover:opacity-95 transition-opacity"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Open in WhatsApp
          </a>
        </div>
      );

    default:
      return null;
  }
}

function SpotifyCard() {
  return (
    <div className="mt-6 rounded-xl bg-stone-100/80 border border-stone-200 p-4">
      <p className="text-sm text-stone-600 mb-3">
        Join our Spotify Blend — our taste in music, mixed together. Gym-safe. Calm. Focus-friendly.
      </p>
      <a
        href={SPOTIFY_BLEND_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-[#1DB954] px-4 py-2.5 text-white text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Join Blend on Spotify 🎧
      </a>
    </div>
  );
}

