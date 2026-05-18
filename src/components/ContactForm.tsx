"use client";
import { useState } from "react";
import type { Dictionary } from "@/i18n";

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return <p className="serif text-2xl">{dict.contact.form.success}</p>;
  }

  const f = dict.contact.form;
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
      <div>
        <label className="block mb-2">{f.name}</label>
        <input required type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className="block mb-2">{f.email}</label>
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label className="block mb-2">{f.phone}</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label className="block mb-2">{f.subject}</label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <div className="md:col-span-2">
        <label className="block mb-2">{f.message}</label>
        <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <label className="md:col-span-2 flex items-start gap-3 normal-case tracking-normal text-xs text-muted">
        <input type="checkbox" required className="w-auto mt-1" />
        <span>{f.consent}</span>
      </label>
      <div className="md:col-span-2 flex items-center gap-6">
        <button type="submit" className="btn" disabled={status === "loading"}>
          {status === "loading" ? "…" : dict.cta.send}
        </button>
        {status === "error" && (
          <span className="text-sm" style={{ color: "#c4922a" }}>Versand fehlgeschlagen. Bitte versuchen Sie es erneut.</span>
        )}
      </div>
    </form>
  );
}
