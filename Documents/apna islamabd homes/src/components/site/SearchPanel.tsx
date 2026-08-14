import { Search, MapPin, Home, Bed, Ruler } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

const TABS = ["Buy", "Rent", "Commercial"] as const;

export function SearchPanel({ floating = false }: { floating?: boolean }) {
    const [tab, setTab] = useState<(typeof TABS)[number]>("Buy");
    const target = tab === "Buy" ? "/buy" : tab === "Rent" ? "/rent" : "/commercial";

    return (
        <div className={floating ? "container-lux relative -mt-28 z-20" : "container-lux"}>
            <div className="glass-panel rounded-2xl p-3 sm:p-5">
                <div className="flex gap-1 mb-4 border-b border-border/60 -mx-3 sm:-mx-5 px-3 sm:px-5">
                    {TABS.map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-5 py-3 text-sm font-semibold transition relative ${tab === t ? "text-navy" : "text-navy/50 hover:text-navy"}`}
                        >
                            {t}
                            {tab === t && <span className="absolute left-2 right-2 -bottom-px h-0.5 bg-gold" />}
                        </button>
                    ))}
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3" onSubmit={(e) => e.preventDefault()}>
                    <Field icon={<MapPin size={15} />} label="Location">
                        <select className="input-lux appearance-none">
                            <option>Any area</option>
                            <option>Sector F-6</option><option>Sector F-7</option><option>Sector F-8</option>
                            <option>DHA Islamabad</option><option>Bahria Town</option><option>Gulberg Greens</option>
                            <option>Blue Area</option>
                        </select>
                    </Field>
                    <Field icon={<Home size={15} />} label="Property Type">
                        <select className="input-lux appearance-none">
                            <option>Any type</option>
                            <option>House</option><option>Villa</option><option>Apartment</option>
                            <option>Penthouse</option><option>Plot</option><option>Farmhouse</option>
                            <option>Office</option><option>Shop</option>
                        </select>
                    </Field>
                    <Field icon={<Bed size={15} />} label="Bedrooms">
                        <select className="input-lux appearance-none">
                            <option>Any</option>
                            <option>1+</option><option>2+</option><option>3+</option><option>4+</option><option>5+</option>
                        </select>
                    </Field>
                    <Field icon={<Ruler size={15} />} label="Price / Area">
                        <select className="input-lux appearance-none">
                            <option>Any price</option>
                            <option>Under PKR 3 Cr</option>
                            <option>PKR 3 – 10 Cr</option>
                            <option>PKR 10 – 25 Cr</option>
                            <option>PKR 25 Cr+</option>
                        </select>
                    </Field>
                    <Link to={target} className="btn-gold h-full min-h-[52px]">
                        <Search size={16} /> Search Property
                    </Link>
                </form>
            </div>
        </div>
    );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-navy/60 flex items-center gap-1.5 mb-1.5">
                <span className="text-gold">{icon}</span>{label}
            </span>
            {children}
        </label>
    );
}
