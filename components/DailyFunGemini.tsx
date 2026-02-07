"use client";

import { useState } from "react";

type Props =
  | {
      type: "rose" | "chocolate" | "hug" | "mood" | "valentine";
      question: string;
      icon?: string;
      options: { label: string; value: string }[];
      pastelColor?: string;
    }
  | {
      type: "teddy";
      label: string;
      icon?: string;
      pastelColor?: string;
    };

export function DailyFunGemini(props: Props) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const pastelColor = props.pastelColor ?? "bg-rose-50 border-rose-200";

  const callApi = async (input: string) => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("/api/fun", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: props.type, input }),
      });
      const data = await res.json().catch(() => ({}));
      setResponse(typeof data?.message === "string" ? data.message : "Something sweet is in the air ✨");
    } catch {
      setResponse("Something sweet is in the air ✨");
    } finally {
      setLoading(false);
    }
  };

  if (props.type === "teddy") {
    return (
      <div className={`rounded-2xl border-2 ${pastelColor} p-4 mt-4`}>
        <button
          type="button"
          onClick={() => callApi("hug")}
          disabled={loading}
          className="flex items-center gap-2 text-sm font-medium text-stone-700 w-full justify-center py-2 rounded-xl bg-white/80 border border-rose-100 hover:bg-rose-50 hover:border-rose-200 transition-colors disabled:opacity-70"
        >
          <span aria-hidden>{props.icon ?? "🧸"}</span>
          {loading ? "Thinking… ✨" : props.label}
        </button>
        {response && !loading && (
          <p className="mt-3 text-sm text-stone-600 leading-relaxed animate-fade-slide-in">{response}</p>
        )}
      </div>
    );
  }

  const { question, options, icon } = props;
  if (response && !loading) {
    return (
      <div className={`rounded-2xl border-2 ${pastelColor} p-4 mt-4 animate-fade-slide-in`}>
        <p className="text-sm text-stone-600 leading-relaxed">{response}</p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border-2 ${pastelColor} p-4 mt-4`}>
      <p className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-3">
        {icon && <span aria-hidden>{icon}</span>}
        {question}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => callApi(opt.value)}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-white/80 border border-rose-100 text-stone-600 hover:bg-rose-50 hover:border-rose-200 transition-colors disabled:opacity-70"
          >
            {loading ? "Thinking… ✨" : opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
