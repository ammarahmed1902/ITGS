import { JobPost } from '../entities/JobPost';
import { JobApplication, ApplicationStatus } from '../entities/JobApplication';

export interface IJobRepository {
  getJobs(): Promise<JobPost[]>;
  saveJob(job: JobPost): Promise<void>;
  deleteJob(id: string): Promise<void>;
  getApplications(): Promise<JobApplication[]>;
  saveApplication(application: JobApplication): Promise<void>;
  updateApplicationStatus(id: string, status: ApplicationStatus): Promise<void>;
  deleteApplication(id: string): Promise<void>;
}
