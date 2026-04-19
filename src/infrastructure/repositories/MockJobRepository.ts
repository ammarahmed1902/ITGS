import { JobPost } from '../../domain/entities/JobPost';
import { JobApplication } from '../../domain/entities/JobApplication';
import { IJobRepository } from '../../domain/repositories/IJobRepository';

let JOB_POSTS: JobPost[] = [
  {
    id: 'j1',
    title: 'Senior Cloud Security Engineer',
    department: 'Security Engineering',
    location: 'Remote / Global',
    jobType: 'Full Time',
    experienceRequired: '7+ years',
    salaryRange: '$140k - $180k',
    description: 'Lead enterprise-grade security strategy for cloud-native architecture, compliance, and incident response.',
    responsibilities: [
      'Design and implement cloud security controls across AWS and Azure.',
      'Build automated threat detection and response workflows.',
      'Partner with engineering teams to secure CI/CD pipelines.',
      'Mentor junior security engineers and establish best practices.',
    ],
    requirements: [
      '7+ years in cloud security or infrastructure engineering.',
      'Expertise with AWS, Azure or GCP security services.',
      'Hands-on experience with SIEM, SSO, and IAM tooling.',
      'Strong communication skills for cross-functional programs.',
    ],
    benefits: [
      'Fully remote work with flexible hours.',
      'Comprehensive medical, vision, and dental coverage.',
      'Continued education stipend and leadership training.',
      'High-impact work on a globally distributed team.',
    ],
    deadline: 'June 30, 2026',
    status: 'Open',
    image: 'https://picsum.photos/seed/job-1/1200/700',
    slug: 'senior-cloud-security-engineer',
    metaTitle: 'Senior Cloud Security Engineer | ITGS Careers',
    metaDescription: 'Lead security strategy for cloud-native enterprise architecture in a remote-first global team.',
    postedAt: 'May 20, 2026',
  },
  {
    id: 'j2',
    title: 'Lead Product Designer',
    department: 'Product Design',
    location: 'London, UK',
    jobType: 'Full Time',
    experienceRequired: '5+ years',
    salaryRange: '£90k - £120k',
    description: 'Create premium product experiences that establish authority and trust for global B2B customers.',
    responsibilities: [
      'Own end-to-end design for strategic SaaS features.',
      'Run design sprints and user research programs.',
      'Partner with product and engineering teams.',
      'Develop design systems for enterprise-grade products.',
    ],
    requirements: [
      '5+ years of digital product design experience.',
      'Portfolio of enterprise SaaS products.',
      'Strong visual, interaction, and UX writing skills.',
      'Experience mentoring design teams.',
    ],
    benefits: [
      'Premium wellness allowance and flexible PTO.',
      'On-site studio days and remote work balance.',
      'Market-leading pension and equity programs.',
      'Access to global innovation workshops.',
    ],
    deadline: 'July 7, 2026',
    status: 'Open',
    image: 'https://picsum.photos/seed/job-2/1200/700',
    slug: 'lead-product-designer',
    metaTitle: 'Lead Product Designer | ITGS Careers',
    metaDescription: 'Design premium enterprise experiences for global technology leaders.',
    postedAt: 'May 14, 2026',
  },
  {
    id: 'j3',
    title: 'Growth Marketing Analyst',
    department: 'Growth',
    location: 'New York, NY',
    jobType: 'Contract',
    experienceRequired: '3+ years',
    salaryRange: '$70k - $95k',
    description: 'Drive acquisition and retention initiatives for high-velocity global campaigns.',
    responsibilities: [
      'Build reporting dashboards and growth forecasts.',
      'Execute paid social and performance campaigns.',
      'Run experiments to increase qualified pipeline.',
      'Collaborate with data science to optimize attribution models.',
    ],
    requirements: [
      '3+ years in growth, acquisition, or performance marketing.',
      'Experience with GA4, Meta Ads, and analytics tools.',
      'Strong SQL and experimentation skills.',
      'Comfort in fast-paced cross-functional teams.',
    ],
    benefits: [
      'Contract conversion opportunities for the right candidate.',
      'Healthcare stipend and coworking credits.',
      'Flexible work schedules to support productivity.',
      'Access to premium analytics and marketing tooling.',
    ],
    deadline: 'June 15, 2026',
    status: 'Closed',
    image: 'https://picsum.photos/seed/job-3/1200/700',
    slug: 'growth-marketing-analyst',
    metaTitle: 'Growth Marketing Analyst | ITGS Careers',
    metaDescription: 'Lead acquisition and retention campaigns with high-performance analytics.',
    postedAt: 'May 1, 2026',
  },
];

let JOB_APPLICATIONS: JobApplication[] = [];

export class MockJobRepository implements IJobRepository {
  async getJobs(): Promise<JobPost[]> {
    return [...JOB_POSTS];
  }

  async saveJob(job: JobPost): Promise<void> {
    const index = JOB_POSTS.findIndex((existing) => existing.id === job.id);
    if (index !== -1) {
      JOB_POSTS[index] = job;
    } else {
      JOB_POSTS = [job, ...JOB_POSTS];
    }
  }

  async deleteJob(id: string): Promise<void> {
    JOB_POSTS = JOB_POSTS.filter((job) => job.id !== id);
  }

  async getApplications(): Promise<JobApplication[]> {
    return [...JOB_APPLICATIONS];
  }

  async saveApplication(application: JobApplication): Promise<void> {
    const index = JOB_APPLICATIONS.findIndex((existing) => existing.id === application.id);
    if (index !== -1) {
      JOB_APPLICATIONS[index] = application;
    } else {
      JOB_APPLICATIONS = [application, ...JOB_APPLICATIONS];
    }
  }

  async updateApplicationStatus(id: string, status: JobApplication['status']): Promise<void> {
    JOB_APPLICATIONS = JOB_APPLICATIONS.map((application) =>
      application.id === id ? { ...application, status } : application
    );
  }

  async deleteApplication(id: string): Promise<void> {
    JOB_APPLICATIONS = JOB_APPLICATIONS.filter((application) => application.id !== id);
  }
}
