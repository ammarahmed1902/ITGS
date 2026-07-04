import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import { ROUTES } from '../config/site';
import { TeamMember, getTeamInitials } from '../domain/entities/TeamMember';

interface TeamPageProps {
  team: TeamMember[];
  loading: boolean;
}

function TeamImage({ src, alt, initials }: { src?: string; alt: string; initials: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="w-full aspect-[3.7/5] bg-gradient-to-br from-deep-blue to-midnight flex items-center justify-center">
        <span className="text-5xl font-extrabold text-white/80">{initials}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-full aspect-[3.7/5] object-cover object-top group-hover:scale-105 transition-transform duration-500"
      referrerPolicy="no-referrer"
    />
  );
}

const TeamPage = ({ team, loading }: TeamPageProps) => {
  const activeMembers = [...team]
    .filter((m) => m.status === 'Active')
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <PageMeta title="Our Team" description="Meet the global experts behind ITGS technology solutions." path={ROUTES.team} />
      <div className="pt-32 pb-24 bg-starfield min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <PageHeader
            eyebrow="Leadership"
            title="The Minds Behind ITGS"
            description="A global team of experts dedicated to your success."
          />

          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3 text-steel">
              <Loader2 size={28} className="animate-spin text-electric" />
              <p>Loading our team…</p>
            </div>
          ) : activeMembers.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {activeMembers.map((member) => (
                <article key={member.id} className="group relative overflow-hidden rounded-3xl bg-white shadow-lg">
                  <TeamImage src={member.photo} alt={member.fullName} initials={getTeamInitials(member.fullName)} />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent pointer-events-none" aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-white font-bold text-lg">{member.fullName}</h2>
                    <p className="text-cyan text-sm">{member.role}</p>
                    {member.department && (
                      <p className="text-white/60 text-xs mt-1">{member.department}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-steel text-lg">Our team details are being updated. Please check back soon.</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <Link to={ROUTES.careers} className="btn-primary px-10 py-4">Join Our Team</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPage;
