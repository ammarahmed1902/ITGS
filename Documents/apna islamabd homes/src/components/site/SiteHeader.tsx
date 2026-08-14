import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Phone, Mail, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import { SiteLogo } from "./SiteLogo";

const NAV = [
    { to: "/", label: "Home" },
    { to: "/buy", label: "Buy" },
    { to: "/rent", label: "Rent" },
    { to: "/commercial", label: "Commercial" },
    { to: "/new-projects", label: "New Projects" },
    { to: "/agents", label: "Agents" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className="sticky top-0 z-50">
            {/* Top info bar */}
            <div className="hidden md:block bg-navy text-white/80 text-xs">
                <div className="container-lux flex items-center justify-between py-2">
                    <div className="flex items-center gap-5">
                        <span className="inline-flex items-center gap-1.5"><MapPin size={12} className="text-gold" />Office No. 12, F-7 Markaz, Islamabad</span>
                        <a href="tel:+923302748777" className="inline-flex items-center gap-1.5 hover:text-gold transition"><Phone size={12} className="text-gold" />+92 330 2748777</a>
                        <a href="mailto:info@apnaislamabadhomes.com" className="inline-flex items-center gap-1.5 hover:text-gold transition"><Mail size={12} className="text-gold" />info@apnaislamabadhomes.com</a>
                        <span className="inline-flex items-center gap-1.5"><Clock size={12} className="text-gold" />Mon–Sat · 9 AM–7 PM</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <a href="#" aria-label="Facebook" className="hover:text-gold transition"><FacebookIcon size={14} /></a>
                        <a href="#" aria-label="Instagram" className="hover:text-gold transition"><InstagramIcon size={14} /></a>
                        <a href="#" aria-label="WhatsApp" className="hover:text-gold transition"><WhatsAppIcon size={14} /></a>
                    </div>
                </div>
            </div>

            {/* Main nav */}
            <div className={`transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"}`}>
                <div className="container-lux flex items-center justify-between gap-6 py-4">
                    <Link to="/" className="flex items-center shrink-0" aria-label="Apna Islamabad Homes home">
                        <SiteLogo />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {NAV.map((n) => (
                            <Link
                                key={n.to}
                                to={n.to}
                                className="relative px-3 py-2 text-sm font-medium text-navy/80 hover:text-navy transition"
                                activeProps={{ className: "text-navy" }}
                                activeOptions={{ exact: n.to === "/" }}
                            >
                                {({ isActive }) => (
                                    <>
                                        {n.label}
                                        <span className={`absolute left-3 right-3 -bottom-0.5 h-0.5 bg-gold origin-center transition-transform ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                                    </>
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Link to="/list-your-property" className="btn-gold hidden sm:inline-flex text-sm">List Your Property</Link>
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="lg:hidden grid place-items-center h-10 w-10 rounded-md border border-border text-navy"
                            aria-label={open ? "Close menu" : "Open menu"}
                        >
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile sheet */}
            {open && (
                <div className="lg:hidden fixed inset-0 top-[57px] bg-navy text-white z-40 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                    <div className="container-lux py-8 flex flex-col gap-1">
                        {NAV.map((n) => (
                            <Link
                                key={n.to}
                                to={n.to}
                                onClick={() => setOpen(false)}
                                className="py-3 border-b border-white/10 font-display text-lg"
                            >
                                {n.label}
                            </Link>
                        ))}
                        <Link to="/list-your-property" onClick={() => setOpen(false)} className="btn-gold mt-6">List Your Property</Link>
                        <div className="mt-8 space-y-2 text-sm text-white/70">
                            <div className="flex items-center gap-2"><Phone size={14} className="text-gold" />+92 330 2748777</div>
                            <div className="flex items-center gap-2"><Mail size={14} className="text-gold" />info@apnaislamabadhomes.com</div>
                            <div className="flex items-center gap-2"><MapPin size={14} className="text-gold" />Office No. 12, F-7 Markaz</div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}