import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function CtaBand({
    eyebrow = "Ready to move?",
    title,
    subtitle,
    primary,
    secondary,
}: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    primary: { to: string; label: string };
    secondary?: { to: string; label: string };
}) {
    return (
        <section className="relative bg-navy text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.12),transparent_50%)]" />
            <div className="container-lux relative py-20 text-center">
                <p className="eyebrow">{eyebrow}</p>
                <h2 className="mt-3 text-3xl md:text-5xl font-display font-semibold max-w-3xl mx-auto leading-tight">{title}</h2>
                {subtitle && <p className="mt-4 text-white/70 max-w-2xl mx-auto">{subtitle}</p>}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link to={primary.to} className="btn-gold">{primary.label}</Link>
                    {secondary && <Link to={secondary.to} className="btn-outline-light">{secondary.label}</Link>}
                </div>
            </div>
        </section>
    );
}

export function SectionHeading({
    eyebrow, title, subtitle, align = "center", children,
}: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    align?: "center" | "left";
    children?: ReactNode;
}) {
    return (
        <div className={`mb-12 ${align === "center" ? "text-center max-w-2xl mx-auto" : ""}`}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-semibold text-navy leading-tight">{title}</h2>
            {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
            {children}
        </div>
    );
}