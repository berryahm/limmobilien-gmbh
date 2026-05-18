"use client";
import { useState } from "react";
import type { Dictionary } from "@/i18n";

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };
  if (sent) {
    return <p className="serif text-2xl">{dict.contact.form.success}</p>;
  }
  const f = dict.contact.form;
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
      <div>
        <label className="block mb-2">{f.name}</label>
        <input required type="text" />
      </div>
      <div>
        <label className="block mb-2">{f.email}</label>
        <input required type="email" />
      </div>
      <div>
        <label className="block mb-2">{f.phone}</label>
        <input type="tel" />
      </div>
      <div>
        <label className="block mb-2">{f.subject}</label>
        <input type="text" />
      </div>
      <div className="md:col-span-2">
        <label className="block mb-2">{f.message}</label>
        <textarea required rows={5} />
      </div>
      <label className="md:col-span-2 flex items-start gap-3 normal-case tracking-normal text-xs text-muted">
        <input type="checkbox" required className="w-auto mt-1" />
        <span>{f.consent}</span>
      </label>
      <div className="md:col-span-2">
        <button type="submit" className="btn">{dict.cta.send}</button>
      </div>
    </form>
  );
}
