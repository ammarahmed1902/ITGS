export type Agent = {
  id: string;
  name: string;
  title: string;
  experience: string;
  stat: string;
  photo: string;
  phone: string;
  whatsapp: string;
  bio: string;
  specialties: string[];
};

export const agents: Agent[] = [
  {
    id: "ali-khan",
    name: "Ali Khan",
    title: "Senior Property Consultant",
    experience: "12 Years Experience",
    stat: "150+ Deals Closed",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    phone: "+92 330 2748777",
    whatsapp: "+92 330 2748777",
    bio: "Ali specialises in luxury villas and prime-sector residential deals across F-6, F-7 and F-8.",
    specialties: ["Luxury Homes", "Investment", "Sector F"],
  },
  {
    id: "sarah-ahmed",
    name: "Sarah Ahmed",
    title: "Investment Advisor",
    experience: "9 Years Experience",
    stat: "120+ Happy Clients",
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    phone: "+92 300 2345678",
    whatsapp: "+92 300 2345678",
    bio: "Sarah advises overseas Pakistanis on high-yield residential and apartment investments.",
    specialties: ["Apartments", "Overseas Clients", "ROI Analysis"],
  },
  {
    id: "usman-malik",
    name: "Usman Malik",
    title: "Commercial Specialist",
    experience: "10 Years Experience",
    stat: "200+ Properties Sold",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    phone: "+92 300 3456789",
    whatsapp: "+92 300 3456789",
    bio: "Usman leads commercial acquisitions in Blue Area, F-10 and I-8 with proven ROI.",
    specialties: ["Commercial", "Blue Area", "Plazas"],
  },
  {
    id: "hira-siddiqui",
    name: "Hira Siddiqui",
    title: "Rental Manager",
    experience: "7 Years Experience",
    stat: "300+ Rentals Placed",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    phone: "+92 300 4567890",
    whatsapp: "+92 300 4567890",
    bio: "Hira runs the rentals desk for corporate lets, diplomatic housing and furnished apartments.",
    specialties: ["Rentals", "Corporate", "Furnished"],
  },
];

export const getAgent = (id: string) => agents.find((a) => a.id === id);
