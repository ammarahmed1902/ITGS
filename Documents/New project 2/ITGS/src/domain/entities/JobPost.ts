export type JobStatus = 'Open' | 'Closed';
export type JobType = 'Full Time' | 'Part Time' | 'Remote' | 'Contract' | 'Internship';

export interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  jobType: JobType;
  experienceRequired: string;
  salaryRange?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  deadline: string;
  status: JobStatus;
  image: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  postedAt: string;
}
