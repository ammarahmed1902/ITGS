import { JobPost } from '../../domain/entities/JobPost';
import { JobApplication } from '../../domain/entities/JobApplication';
import { IJobRepository } from '../../domain/repositories/IJobRepository';
import {
  deleteJobApplicationRemote,
  fetchJobApplications,
  submitJobApplication,
  updateJobApplicationStatus as updateRemoteStatus,
} from '../../api/applications';

const JOBS_STORAGE_KEY = 'itgs_job_posts';
const APPLICATIONS_STORAGE_KEY = 'itgs_job_applications';

const DEFAULT_JOB_POSTS: JobPost[] = [
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

function readFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadJobs(): JobPost[] {
  const stored = readFromStorage<JobPost[] | null>(JOBS_STORAGE_KEY, null);
  if (stored && stored.length > 0) return stored;
  writeToStorage(JOBS_STORAGE_KEY, DEFAULT_JOB_POSTS);
  return [...DEFAULT_JOB_POSTS];
}

function loadLocalApplications(): JobApplication[] {
  return readFromStorage<JobApplication[]>(APPLICATIONS_STORAGE_KEY, []);
}

function saveLocalApplications(applications: JobApplication[]): void {
  writeToStorage(APPLICATIONS_STORAGE_KEY, applications);
}

function mergeApplications(remote: JobApplication[], local: JobApplication[]): JobApplication[] {
  const map = new Map<string, JobApplication>();
  for (const app of local) map.set(app.id, app);
  for (const app of remote) map.set(app.id, app);
  return Array.from(map.values()).sort(
    (a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
  );
}

export class MockJobRepository implements IJobRepository {
  async getJobs(): Promise<JobPost[]> {
    return loadJobs();
  }

  async saveJob(job: JobPost): Promise<void> {
    const jobs = loadJobs();
    const index = jobs.findIndex((existing) => existing.id === job.id);
    const next =
      index !== -1
        ? jobs.map((existing, i) => (i === index ? job : existing))
        : [job, ...jobs];
    writeToStorage(JOBS_STORAGE_KEY, next);
  }

  async deleteJob(id: string): Promise<void> {
    writeToStorage(JOBS_STORAGE_KEY, loadJobs().filter((job) => job.id !== id));
  }

  async getApplications(): Promise<JobApplication[]> {
    const local = loadLocalApplications();
    try {
      const remote = await fetchJobApplications();
      if (remote.length > 0) {
        const merged = mergeApplications(remote, local);
        saveLocalApplications(merged);
        return merged;
      }
    } catch {
      /* fallback to local */
    }
    return local;
  }

  async saveApplication(application: JobApplication): Promise<void> {
    try {
      const result = await submitJobApplication({
        ...application,
        honeypot: '',
      });
      application = { ...application, id: result.id || application.id };
    } catch (err) {
      console.warn('[applications] Server submit failed, saving locally:', err);
    }

    const applications = loadLocalApplications();
    const index = applications.findIndex((existing) => existing.id === application.id);
    const next =
      index !== -1
        ? applications.map((existing, i) => (i === index ? application : existing))
        : [application, ...applications];
    saveLocalApplications(next);
  }

  async updateApplicationStatus(id: string, status: JobApplication['status']): Promise<void> {
    try {
      await updateRemoteStatus(id, status);
    } catch {
      /* local fallback */
    }
    saveLocalApplications(
      loadLocalApplications().map((application) =>
        application.id === id ? { ...application, status } : application
      )
    );
  }

  async deleteApplication(id: string): Promise<void> {
    try {
      await deleteJobApplicationRemote(id);
    } catch {
      /* local fallback */
    }
    saveLocalApplications(loadLocalApplications().filter((application) => application.id !== id));
  }
}
