"use client";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n";

export default function CookieBanner({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("li-cookie")) setVisible(true);
  }, []);
  if (!visible) return null;
  const close = (v: "accept" | "decline") => {
    localStorage.setItem("li-cookie", v);
    setVisible(false);
  };
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 bg-ink text-bone p-6 shadow-2xl">
      <p className="text-sm leading-relaxed text-bone/85">{dict.cookie.text}</p>
      <div className="flex gap-3 mt-4">
        <button onClick={() => close("accept")} className="btn btn-light text-bone border-bone">{dict.cookie.accept}</button>
        <button onClick={() => close("decline")} className="text-xs uppercase tracking-[0.2em] text-bone/60 hover:text-bone">{dict.cookie.decline}</button>
      </div>
    </div>
  );
}
