import { useState } from "react";
import { Mail, Check } from "lucide-react";

export function Newsletter({ title = "Stay Updated with Islamabad Real Estate", subtitle = "New listings, market insights and exclusive off-market opportunities — straight to your inbox." }: { title?: string; subtitle?: string }) {
    const [email, setEmail] = useState("");
    const [done, setDone] = useState(false);

    return (
        <section className="relative py-20 bg-surface">
            <div className="container-lux">
                <div className="relative overflow-hidden rounded-3xl bg-navy px-6 sm:px-12 py-14 text-center shadow-luxe">
                    <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_20%,var(--gold),transparent_50%),radial-gradient(circle_at_80%_80%,var(--gold),transparent_50%)]" />
                    <div className="relative">
                        <p className="eyebrow">Newsletter</p>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-display font-semibold text-white max-w-2xl mx-auto">{title}</h2>
                        <p className="mt-3 text-white/70 max-w-xl mx-auto">{subtitle}</p>
                        <form
                            onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
                            className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-3"
                        >
                            <div className="relative flex-1">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@email.com"
                                    className="input-lux pl-11"
                                />
                            </div>
                            <button type="submit" className="btn-gold">
                                {done ? <><Check size={16} /> Subscribed</> : "Subscribe"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
