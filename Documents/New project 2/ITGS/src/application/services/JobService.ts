import { IJobRepository } from '../../domain/repositories/IJobRepository';
import { JobPost } from '../../domain/entities/JobPost';
import { JobApplication, ApplicationStatus } from '../../domain/entities/JobApplication';

export class JobService {
  constructor(private jobRepository: IJobRepository) {}

  async getAllJobs(): Promise<JobPost[]> {
    return this.jobRepository.getJobs();
  }

  async saveJob(job: JobPost): Promise<void> {
    return this.jobRepository.saveJob(job);
  }

  async deleteJob(id: string): Promise<void> {
    return this.jobRepository.deleteJob(id);
  }

  async getAllApplications(): Promise<JobApplication[]> {
    return this.jobRepository.getApplications();
  }

  async saveApplication(application: JobApplication): Promise<void> {
    return this.jobRepository.saveApplication(application);
  }

  async updateApplicationStatus(id: string, status: ApplicationStatus): Promise<void> {
    return this.jobRepository.updateApplicationStatus(id, status);
  }

  async deleteApplication(id: string): Promise<void> {
    return this.jobRepository.deleteApplication(id);
  }
}
