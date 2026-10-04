import Hero from '../components/home/Hero';
import ServicesPreview from '../components/home/ServicesPreview';
import WhyChooseSection from '../components/home/WhyChooseSection';
import CTASection from '../components/home/CTASection';
import {
  ConceptWorkSection,
  ConnectedModelSection,
  ExpertiseSection,
  HomeFaqSection,
  InsightsSection,
  SolutionsSection,
  WhyItgsSection,
} from '../components/home/HomepageSections';
import type { BlogPost } from '../domain/entities/BlogPost';
import { ApprovedCaseStudies, ApprovedIndustries, ApprovedProofBar, ApprovedTestimonials } from '../components/home/ApprovedContentSections';

type Props = {
  setActivePage: (page: string) => void;
  posts: BlogPost[];
  loading: boolean;
};

export default function HomePage({ setActivePage, posts, loading }: Props) {
  return (
    <>
      <Hero setActivePage={setActivePage} />
      <ApprovedProofBar />
      <ServicesPreview setActivePage={setActivePage} />
      <SolutionsSection setActivePage={setActivePage} />
      <ApprovedCaseStudies />
      <ConceptWorkSection setActivePage={setActivePage} />
      <ApprovedIndustries />
      <WhyChooseSection />
      <ConnectedModelSection />
      <ExpertiseSection />
      <WhyItgsSection />
      <ApprovedTestimonials />
      <InsightsSection posts={posts} loading={loading} setActivePage={setActivePage} />
      <HomeFaqSection />
      <CTASection setActivePage={setActivePage} />
    </>
  );
}
