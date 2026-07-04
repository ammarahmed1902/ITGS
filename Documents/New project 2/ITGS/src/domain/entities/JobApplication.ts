export type ApplicationStatus = 'New' | 'Shortlisted' | 'Interview Scheduled' | 'Rejected' | 'Hired';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentLocation: string;
  linkedin?: string;
  portfolio?: string;
  yearsExperience: string;
  currentSalary: string;
  lastCompanySalary: string;
  expectedSalary: string;
  reasonForLeaving: string;
  resumeFileName: string;
  resumeFileType: string;
  resumeDataUrl: string;
  coverLetterText?: string;
  coverLetterFileName?: string;
  coverLetterFileType?: string;
  coverLetterDataUrl?: string;
  availableJoinDate: string;
  additionalNotes?: string;
  status: ApplicationStatus;
  appliedAt: string;
}
