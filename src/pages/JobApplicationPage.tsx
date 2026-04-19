import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { JobPost } from '../domain/entities/JobPost';
import { JobApplication } from '../domain/entities/JobApplication';

const allowedResumeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const readFileDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Unable to read file.'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

const JobApplicationPage = ({
  jobId,
  jobs,
  setActivePage,
  onSubmit,
}: {
  jobId: string;
  jobs: JobPost[];
  setActivePage: (page: string) => void;
  onSubmit: (application: JobApplication) => Promise<void>;
}) => {
  const job = jobs.find((item) => item.id === jobId);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentLocation: '',
    linkedin: '',
    portfolio: '',
    yearsExperience: '',
    currentSalary: '',
    lastCompanySalary: '',
    expectedSalary: '',
    reasonForLeaving: '',
    coverLetterText: '',
    availableJoinDate: '',
    additionalNotes: '',
    resumeFileName: '',
    resumeFileType: '',
    resumeDataUrl: '',
    coverLetterFileName: '',
    coverLetterFileType: '',
    coverLetterDataUrl: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!job) {
    return (
      <div className="pt-32 pb-24 bg-starfield min-h-screen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
          <p className="text-steel mb-10">The selected job role was not found.</p>
          <button onClick={() => setActivePage('Careers')} className="btn-primary px-10 py-4">
            Return to Careers
          </button>
        </div>
      </div>
    );
  }

  const handleResumeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (!allowedResumeTypes.includes(file.type)) {
      setError('Resume must be a PDF, DOC, or DOCX file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Resume file must be under 5 MB.');
      return;
    }
    const dataUrl = await readFileDataUrl(file);
    setForm((state) => ({
      ...state,
      resumeFileName: file.name,
      resumeFileType: file.type,
      resumeDataUrl: dataUrl,
    }));
  };

  const handleCoverLetterChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (!allowedResumeTypes.includes(file.type)) {
      setError('Cover letter must be a PDF, DOC, or DOCX file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Cover letter file must be under 5 MB.');
      return;
    }
    const dataUrl = await readFileDataUrl(file);
    setForm((state) => ({
      ...state,
      coverLetterFileName: file.name,
      coverLetterFileType: file.type,
      coverLetterDataUrl: dataUrl,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.currentLocation || !form.yearsExperience || !form.currentSalary || !form.expectedSalary || !form.reasonForLeaving || !form.availableJoinDate) {
      setError('Please complete all required fields before submitting.');
      return;
    }

    if (!form.resumeDataUrl) {
      setError('Please upload your resume before submitting the application.');
      return;
    }

    const application: JobApplication = {
      id: Date.now().toString(),
      jobId: job.id,
      jobTitle: job.title,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      currentLocation: form.currentLocation,
      linkedin: form.linkedin,
      portfolio: form.portfolio,
      yearsExperience: form.yearsExperience,
      currentSalary: form.currentSalary,
      lastCompanySalary: form.lastCompanySalary,
      expectedSalary: form.expectedSalary,
      reasonForLeaving: form.reasonForLeaving,
      resumeFileName: form.resumeFileName,
      resumeFileType: form.resumeFileType,
      resumeDataUrl: form.resumeDataUrl,
      coverLetterText: form.coverLetterText,
      coverLetterFileName: form.coverLetterFileName,
      coverLetterFileType: form.coverLetterFileType,
      coverLetterDataUrl: form.coverLetterDataUrl,
      availableJoinDate: form.availableJoinDate,
      additionalNotes: form.additionalNotes,
      status: 'New',
      appliedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    try {
      setSubmitting(true);
      await onSubmit(application);
      setSuccess('Application submitted successfully. Our team will review it and be in touch soon.');
      setTimeout(() => setActivePage('Careers'), 1800);
    } catch (err) {
      setError('There was an unexpected error submitting your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <button onClick={() => setActivePage(`Job:${job.id}`)} className="inline-flex items-center gap-2 text-steel text-sm mb-10 hover:text-electric transition-colors">
          <ArrowRight size={14} className="rotate-180" /> Back to Role
        </button>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12">
          <div className="card-premium p-10 space-y-8">
            <div className="space-y-4">
              <span className="text-electric font-bold uppercase tracking-[0.35em] text-xs">Apply Now</span>
              <h1 className="text-4xl font-black">{job.title}</h1>
              <p className="text-steel text-lg leading-relaxed">Complete the form below to submit your application for this role. We treat every submission with confidentiality and care.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: 'First Name', name: 'firstName', required: true },
                  { label: 'Last Name', name: 'lastName', required: true },
                  { label: 'Email Address', name: 'email', required: true, type: 'email' },
                  { label: 'Phone Number', name: 'phone', required: true, type: 'tel' },
                  { label: 'Current Location', name: 'currentLocation', required: true },
                  { label: 'LinkedIn Profile URL', name: 'linkedin', required: false, type: 'url' },
                  { label: 'Portfolio URL', name: 'portfolio', required: false, type: 'url' },
                  { label: 'Years of Experience', name: 'yearsExperience', required: true },
                  { label: 'Current Salary', name: 'currentSalary', required: true },
                  { label: 'Last Company Salary', name: 'lastCompanySalary', required: false },
                  { label: 'Expected Salary', name: 'expectedSalary', required: true },
                  { label: 'Available Joining Date', name: 'availableJoinDate', required: true, type: 'date' },
                ].map((field) => (
                  <label key={field.name} className="block">
                    <span className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">{field.label}{field.required ? ' *' : ''}</span>
                    <input
                      type={field.type || 'text'}
                      value={(form as any)[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                      placeholder={field.label}
                    />
                  </label>
                ))}
              </div>

              <div className="grid gap-6">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">Resume / CV Upload *</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                    className="w-full text-sm text-steel"
                  />
                  {form.resumeFileName && <p className="text-steel text-sm mt-2">Uploaded: {form.resumeFileName}</p>}
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">Cover Letter Upload</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCoverLetterChange}
                    className="w-full text-sm text-steel"
                  />
                  {form.coverLetterFileName && <p className="text-steel text-sm mt-2">Uploaded: {form.coverLetterFileName}</p>}
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">Cover Letter / Additional Message</span>
                  <textarea
                    rows={6}
                    value={form.coverLetterText}
                    onChange={(e) => setForm({ ...form, coverLetterText: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all resize-none"
                    placeholder="Optional message or cover letter text"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">Additional Notes</span>
                  <textarea
                    rows={4}
                    value={form.additionalNotes}
                    onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all resize-none"
                    placeholder="Anything else you want the hiring team to know"
                  />
                </label>
              </div>

              {error && <div className="rounded-3xl bg-red-50 border border-red-100 px-6 py-4 text-red-600">{error}</div>}
              {success && <div className="rounded-3xl bg-green-50 border border-green-100 px-6 py-4 text-green-700">{success}</div>}

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <button type="button" onClick={() => setActivePage(`Job:${job.id}`)} className="btn-outline px-8 py-4 w-full sm:w-auto">
                  Review Job
                </button>
                <button type="submit" className="btn-primary px-12 py-4 w-full sm:w-auto" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold mb-5">Application Checklist</h2>
              <ul className="space-y-4 text-steel">
                {[
                  'Attach your latest resume in PDF or Word format.',
                  'Provide a brief cover letter or message to highlight your fit.',
                  'Include expected salary and joining availability.',
                  'Double-check your contact details before submitting.',
                ].map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-electric font-black">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-premium p-8 bg-electric/5 border border-electric/10">
              <h3 className="text-xl font-bold mb-4">Role Summary</h3>
              <div className="space-y-3 text-steel">
                <p><span className="font-bold text-midnight">Position:</span> {job.title}</p>
                <p><span className="font-bold text-midnight">Location:</span> {job.location}</p>
                <p><span className="font-bold text-midnight">Deadline:</span> {job.deadline}</p>
                <p><span className="font-bold text-midnight">Status:</span> {job.status}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
