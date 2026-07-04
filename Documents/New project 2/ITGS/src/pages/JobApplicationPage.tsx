import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { JobPost } from '../domain/entities/JobPost';
import { JobApplication } from '../domain/entities/JobApplication';
import { isJobAcceptingApplications } from '../utils/jobUtils';
import { isAllowedDocumentFile, MAX_DOCUMENT_SIZE_BYTES } from '../utils/fileValidation';
import { isValidEmail } from '../utils/validation';
import PageMeta from '../components/PageMeta';
import StatusMessage from '../components/StatusMessage';
import { ROUTES } from '../config/site';

const readFileDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => (typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Unable to read file.')));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const JobApplicationPage = ({
  jobs,
  onSubmit,
}: {
  jobs: JobPost[];
  onSubmit: (application: JobApplication) => Promise<void>;
}) => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const job = jobs.find((item) => item.id === jobId);
  const canApply = job ? isJobAcceptingApplications(job) : false;

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', currentLocation: '',
    linkedin: '', portfolio: '', yearsExperience: '', currentSalary: '',
    lastCompanySalary: '', expectedSalary: '', reasonForLeaving: '',
    coverLetterText: '', availableJoinDate: '', additionalNotes: '',
    resumeFileName: '', resumeFileType: '', resumeDataUrl: '',
    coverLetterFileName: '', coverLetterFileType: '', coverLetterDataUrl: '',
    honeypot: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!job) {
    return (
      <>
        <PageMeta title="Job Not Found" noIndex path={`/careers/${jobId}/apply`} />
        <div className="pt-32 pb-24 bg-starfield min-h-screen">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-extrabold mb-4">Job Not Found</h1>
            <p className="text-steel mb-10">The selected job role was not found.</p>
            <Link to={ROUTES.careers} className="btn-primary px-10 py-4">Return to Careers</Link>
          </div>
        </div>
      </>
    );
  }

  if (!canApply) {
    return (
      <>
        <PageMeta title="Applications Closed" noIndex path={ROUTES.jobApply(job.id)} />
        <div className="pt-32 pb-24 bg-starfield min-h-screen">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-extrabold mb-4">Applications Closed</h1>
            <p className="text-steel mb-10">
              {job.status === 'Closed'
                ? `"${job.title}" is no longer accepting applications.`
                : `The application deadline for "${job.title}" has passed.`}
            </p>
            <Link to={ROUTES.job(job.id)} className="btn-primary px-10 py-4">Back to Role</Link>
          </div>
        </div>
      </>
    );
  }

  const handleResumeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = event.target.files?.[0];
    if (!file) return;
    if (!isAllowedDocumentFile(file)) { setError('Resume must be a PDF, DOC, or DOCX file.'); return; }
    if (file.size > MAX_DOCUMENT_SIZE_BYTES) { setError('Resume file must be under 5 MB.'); return; }
    const dataUrl = await readFileDataUrl(file);
    setForm((s) => ({ ...s, resumeFileName: file.name, resumeFileType: file.type, resumeDataUrl: dataUrl }));
  };

  const handleCoverLetterChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = event.target.files?.[0];
    if (!file) return;
    if (!isAllowedDocumentFile(file)) { setError('Cover letter must be a PDF, DOC, or DOCX file.'); return; }
    if (file.size > MAX_DOCUMENT_SIZE_BYTES) { setError('Cover letter file must be under 5 MB.'); return; }
    const dataUrl = await readFileDataUrl(file);
    setForm((s) => ({ ...s, coverLetterFileName: file.name, coverLetterFileType: file.type, coverLetterDataUrl: dataUrl }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (form.honeypot) { setSuccess('Application submitted successfully.'); return; }

    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.currentLocation ||
        !form.yearsExperience || !form.currentSalary || !form.expectedSalary ||
        !form.reasonForLeaving || !form.availableJoinDate) {
      setError('Please complete all required fields before submitting.');
      return;
    }
    if (!isValidEmail(form.email)) { setError('Please enter a valid email address.'); return; }
    if (!form.resumeDataUrl) { setError('Please upload your resume before submitting.'); return; }

    const application: JobApplication = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      jobId: job.id, jobTitle: job.title,
      firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone,
      currentLocation: form.currentLocation, linkedin: form.linkedin, portfolio: form.portfolio,
      yearsExperience: form.yearsExperience, currentSalary: form.currentSalary,
      lastCompanySalary: form.lastCompanySalary, expectedSalary: form.expectedSalary,
      reasonForLeaving: form.reasonForLeaving,
      resumeFileName: form.resumeFileName, resumeFileType: form.resumeFileType, resumeDataUrl: form.resumeDataUrl,
      coverLetterText: form.coverLetterText, coverLetterFileName: form.coverLetterFileName,
      coverLetterFileType: form.coverLetterFileType, coverLetterDataUrl: form.coverLetterDataUrl,
      availableJoinDate: form.availableJoinDate, additionalNotes: form.additionalNotes,
      status: 'New',
      appliedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    try {
      setSubmitting(true);
      await onSubmit(application);
      setSuccess('Application submitted successfully. Our team will review it and be in touch soon.');
      setTimeout(() => navigate(ROUTES.careers), 2500);
    } catch {
      setError('There was an error submitting your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { id: 'firstName', label: 'First Name', required: true },
    { id: 'lastName', label: 'Last Name', required: true },
    { id: 'email', label: 'Email Address', required: true, type: 'email' },
    { id: 'phone', label: 'Phone Number', required: true, type: 'tel' },
    { id: 'currentLocation', label: 'Current Location', required: true },
    { id: 'linkedin', label: 'LinkedIn Profile URL', required: false, type: 'url' },
    { id: 'portfolio', label: 'Portfolio URL', required: false, type: 'url' },
    { id: 'yearsExperience', label: 'Years of Experience', required: true },
    { id: 'currentSalary', label: 'Current Salary', required: true },
    { id: 'lastCompanySalary', label: 'Last Company Salary', required: false },
    { id: 'expectedSalary', label: 'Expected Salary', required: true },
    { id: 'availableJoinDate', label: 'Available Joining Date', required: true, type: 'date' },
  ] as const;

  return (
    <>
      <PageMeta title={`Apply – ${job.title}`} description={`Submit your application for ${job.title} at ITGS.`} path={ROUTES.jobApply(job.id)} noIndex />
      <div className="pt-32 pb-24 bg-starfield min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <Link to={ROUTES.job(job.id)} className="inline-flex items-center gap-2 text-steel text-sm mb-10 hover:text-electric transition-colors">
            <ArrowRight size={14} className="rotate-180" aria-hidden="true" /> Back to Role
          </Link>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12">
            <div className="card-premium space-y-8">
              <div>
                <span className="text-electric font-bold uppercase tracking-[0.35em] text-xs">Apply Now</span>
                <h1 className="text-3xl md:text-4xl font-extrabold mt-3">{job.title}</h1>
                <p className="text-steel mt-4 leading-relaxed">Complete the form below. Every submission is treated with confidentiality.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="hidden" aria-hidden="true">
                  <input type="text" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={(e) => setForm({ ...form, honeypot: e.target.value })} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  {fields.map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">
                        {field.label}{field.required ? ' *' : ''}
                      </label>
                      <input
                        id={field.id}
                        type={'type' in field ? field.type : 'text'}
                        required={field.required}
                        value={form[field.id as keyof typeof form] as string}
                        onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="reasonForLeaving" className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">Reason for Leaving *</label>
                  <textarea id="reasonForLeaving" required rows={3} value={form.reasonForLeaving} onChange={(e) => setForm({ ...form, reasonForLeaving: e.target.value })} className="input-field resize-none" />
                </div>
                <div>
                  <label htmlFor="resume" className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">Resume / CV Upload *</label>
                  <input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-electric/10 file:text-electric file:font-bold" />
                  {form.resumeFileName && <p className="text-steel text-sm mt-2">Uploaded: {form.resumeFileName}</p>}
                </div>
                <div>
                  <label htmlFor="coverLetterFile" className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">Cover Letter Upload</label>
                  <input id="coverLetterFile" type="file" accept=".pdf,.doc,.docx" onChange={handleCoverLetterChange} className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-electric/10 file:text-electric file:font-bold" />
                </div>
                <div>
                  <label htmlFor="coverLetterText" className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">Cover Letter Message</label>
                  <textarea id="coverLetterText" rows={5} value={form.coverLetterText} onChange={(e) => setForm({ ...form, coverLetterText: e.target.value })} className="input-field resize-none" />
                </div>
                {error && <StatusMessage variant="error" message={error} />}
                {success && <StatusMessage variant="success" message={success} />}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={ROUTES.job(job.id)} className="btn-outline-light px-8 py-4 text-center">Review Job</Link>
                  <button type="submit" className="btn-primary px-10 py-4 flex-1 flex items-center justify-center gap-2" disabled={submitting}>
                    {submitting ? (<><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Submitting...</>) : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
            <aside className="space-y-6">
              <div className="card-premium">
                <h2 className="text-xl font-bold mb-4">Application Checklist</h2>
                <ul className="space-y-3 text-steel text-sm">
                  {['Attach your latest resume (PDF or Word).', 'Include expected salary and availability.', 'Double-check contact details before submitting.'].map((item) => (
                    <li key={item} className="flex gap-2"><span className="text-electric">•</span>{item}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApplicationPage;
