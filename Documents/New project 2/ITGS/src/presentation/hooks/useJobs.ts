import { useState, useEffect, useCallback } from 'react';
import { JobPost } from '../../domain/entities/JobPost';
import { JobApplication } from '../../domain/entities/JobApplication';
import { jobService } from '../../di';

export const useJobs = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [jobData, applicationData] = await Promise.all([
      jobService.getAllJobs(),
      jobService.getAllApplications(),
    ]);
    setJobs(jobData);
    setApplications(applicationData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveJob = async (job: JobPost) => {
    await jobService.saveJob(job);
    await fetchData();
  };

  const deleteJob = async (id: string) => {
    await jobService.deleteJob(id);
    await fetchData();
  };

  const saveApplication = async (application: JobApplication) => {
    await jobService.saveApplication(application);
    await fetchData();
  };

  const updateApplicationStatus = async (id: string, status: JobApplication['status']) => {
    await jobService.updateApplicationStatus(id, status);
    await fetchData();
  };

  const deleteApplication = async (id: string) => {
    await jobService.deleteApplication(id);
    await fetchData();
  };

  return {
    jobs,
    applications,
    loading,
    saveJob,
    deleteJob,
    saveApplication,
    updateApplicationStatus,
    deleteApplication,
  };
};
