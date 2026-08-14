import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./BrandIcons";

export function SiteFooter() {
    return (
        <footer className="bg-navy text-white/80 pt-20 pb-8 mt-24">
            <div className="container-lux grid gap-12 lg:grid-cols-4">
                <div className="lg:col-span-1">
                    <Link to="/" className="inline-flex items-center">
                        <img
                            src="/logo-white.png"
                            alt="Apna Islamabad Homes — Trust | Invest | Grow"
                            className="h-20 sm:h-24 w-auto max-w-[220px] sm:max-w-[260px] object-contain object-left"
                        />
                    </Link>
                    <p className="mt-5 text-sm leading-relaxed">
                        Islamabad's trusted luxury real estate partner. Verified listings, expert consultants and end-to-end legal support.
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                        {[FacebookIcon, InstagramIcon, WhatsAppIcon].map((Icon, i) => (
                            <a key={i} href="#" aria-label="social" className="grid place-items-center h-9 w-9 rounded-full border border-white/15 hover:bg-gold hover:text-navy hover:border-gold transition">
                                <Icon size={15} />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-display font-semibold mb-4">Explore</h4>
                    <ul className="space-y-2.5 text-sm">
                        {[
                            ["/buy", "Buy Properties"],
                            ["/rent", "Rent Properties"],
                            ["/commercial", "Commercial"],
                            ["/new-projects", "New Projects"],
                            ["/agents", "Our Agents"],
                        ].map(([to, label]) => (
                            <li key={to}><Link to={to} className="hover:text-gold transition">{label}</Link></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-display font-semibold mb-4">Company</h4>
                    <ul className="space-y-2.5 text-sm">
                        {[
                            ["/about", "About Us"],
                            ["/blog", "Blog & Insights"],
                            ["/contact", "Contact"],
                            ["/list-your-property", "List Your Property"],
                        ].map(([to, label]) => (
                            <li key={to}><Link to={to} className="hover:text-gold transition">{label}</Link></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-display font-semibold mb-4">Get in Touch</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2.5"><MapPin size={16} className="text-gold mt-0.5 shrink-0" />Office No. 12, F-7 Markaz, Islamabad, Pakistan</li>
                        <li className="flex items-center gap-2.5"><Phone size={16} className="text-gold shrink-0" /><a href="tel:+923302748777" className="hover:text-gold">+92 330 2748777</a></li>
                        <li className="flex items-center gap-2.5"><Mail size={16} className="text-gold shrink-0" /><a href="mailto:info@apnaislamabadhomes.com" className="hover:text-gold">info@apnaislamabadhomes.com</a></li>
                    </ul>
                </div>
            </div>

            <div className="container-lux mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
                <p>© {new Date().getFullYear()} Apna Islamabad Homes. All rights reserved.</p>
                <p>Islamabad's Premium Real Estate · Verified · Trusted · Since 2014</p>
            </div>
        </footer>
    );
}