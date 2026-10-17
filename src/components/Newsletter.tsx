"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setState("error");
          return;
        }
        setState("done");
        setEmail("");
      }}
      className="w-full max-w-md"
    >
      <div className="flex items-center gap-2 border-b border-ink/25 pb-2 focus-within:border-ink transition-colors">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          placeholder="your@email.com"
          aria-label="Email address"
          className="w-full bg-transparent py-2 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase text-cream transition hover:bg-clay"
        >
          {state === "done" ? "Joined" : "Join"}
        </button>
      </div>
      <p
        aria-live="polite"
        className={`mt-2 text-[11px] ${
          state === "error" ? "text-clay" : state === "done" ? "text-sage" : "text-ink-soft"
        }`}
      >
        {state === "error"
          ? "That email doesn’t look right — try again?"
          : state === "done"
            ? "You’re on the list. Look out for the next drop."
            : "One letter a month. New pieces, restocks, nothing else."}
      </p>
    </form>
  );
}
