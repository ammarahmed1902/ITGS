import { JobPost } from '../domain/entities/JobPost';

/** Returns true when the job is open and the application deadline has not passed. */
export function isJobAcceptingApplications(job: JobPost): boolean {
  if (job.status !== 'Open') {
    return false;
  }

  const deadline = new Date(job.deadline);
  if (Number.isNaN(deadline.getTime())) {
    return true;
  }

  const endOfDeadline = new Date(deadline);
  endOfDeadline.setHours(23, 59, 59, 999);
  return endOfDeadline >= new Date();
}
