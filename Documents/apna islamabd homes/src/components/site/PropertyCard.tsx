import { Link } from "@tanstack/react-router";
import { Bed, Bath, Maximize, Heart, Share2, MapPin } from "lucide-react";
import type { Property } from "@/data/properties";
import { getAgent } from "@/data/agents";

export function PropertyCard({ property }: { property: Property }) {
    const agent = getAgent(property.agentId);
    return (
        <article className="card-lux group flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={property.image}
                    alt={`${property.title} in ${property.location}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 top-0 p-3 flex items-start justify-between">
                    <div className="flex flex-wrap gap-1.5">
                        {property.badges.map((b) => (
                            <span key={b} className={b === "Featured" || b === "Hot Property" ? "badge-gold" : "badge-navy"}>{b}</span>
                        ))}
                    </div>
                    <div className="flex gap-1.5">
                        <button aria-label="Save to wishlist" className="grid place-items-center h-9 w-9 rounded-full bg-white/90 backdrop-blur text-navy hover:bg-gold transition"><Heart size={15} /></button>
                        <button aria-label="Share" className="grid place-items-center h-9 w-9 rounded-full bg-white/90 backdrop-blur text-navy hover:bg-gold transition"><Share2 size={15} /></button>
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent">
                    <div className="text-white font-display font-semibold text-xl">{property.price}</div>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-semibold text-lg text-navy leading-snug">{property.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground inline-flex items-center gap-1.5"><MapPin size={13} className="text-gold" />{property.location}</p>

                <div className="mt-4 flex items-center gap-4 text-xs text-navy/70">
                    {property.beds !== undefined && <span className="inline-flex items-center gap-1"><Bed size={14} className="text-gold" />{property.beds} Beds</span>}
                    {property.baths !== undefined && <span className="inline-flex items-center gap-1"><Bath size={14} className="text-gold" />{property.baths} Baths</span>}
                    <span className="inline-flex items-center gap-1"><Maximize size={14} className="text-gold" />{property.area}</span>
                </div>

                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                    {agent && (
                        <div className="flex items-center gap-2">
                            <img src={agent.photo} alt={agent.name} className="h-8 w-8 rounded-full object-cover" />
                            <div className="leading-tight">
                                <div className="text-xs font-medium text-navy">{agent.name}</div>
                                <div className="text-[10px] text-muted-foreground">{property.type}</div>
                            </div>
                        </div>
                    )}
                    <Link to="/contact" className="text-xs font-semibold text-navy hover:text-gold transition inline-flex items-center gap-1">
                        View Details →
                    </Link>
                </div>
            </div>
        </article>
    );
}