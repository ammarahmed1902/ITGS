import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageHero({
    eyebrow,
    title,
    subtitle,
    breadcrumbs,
    image,
    children,
}: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    breadcrumbs?: { to?: string; label: string }[];
    image: string;
    children?: ReactNode;
}) {
    return (
        <section className="relative">
            <div className="relative h-[52vh] min-h-[380px] max-h-[560px] w-full overflow-hidden">
                <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/55 to-navy/80" />
                <div className="container-lux relative h-full flex flex-col justify-center text-white">
                    {breadcrumbs && (
                        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-white/70 flex items-center gap-1.5 flex-wrap">
                            {breadcrumbs.map((b, i) => (
                                <span key={i} className="inline-flex items-center gap-1.5">
                                    {b.to ? <Link to={b.to} className="hover:text-gold">{b.label}</Link> : <span className="text-gold">{b.label}</span>}
                                    {i < breadcrumbs.length - 1 && <ChevronRight size={12} />}
                                </span>
                            ))}
                        </nav>
                    )}
                    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
                    <h1 className="mt-2 text-4xl md:text-6xl font-display font-semibold max-w-3xl leading-[1.05]">{title}</h1>
                    {subtitle && <p className="mt-4 text-white/80 max-w-2xl text-lg">{subtitle}</p>}
                    {children}
                </div>
            </div>
        </section>
    );
}