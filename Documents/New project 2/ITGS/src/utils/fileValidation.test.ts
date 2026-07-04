import { describe, it, expect } from 'vitest';
import { isAllowedDocumentFile, getFileExtension } from './fileValidation';

describe('fileValidation', () => {
  it('detects file extensions', () => {
    expect(getFileExtension('resume.pdf')).toBe('.pdf');
    expect(getFileExtension('resume.PDF')).toBe('.pdf');
    expect(getFileExtension('noextension')).toBe('');
  });

  it('accepts valid pdf uploads', () => {
    const file = new File(['content'], 'resume.pdf', { type: 'application/pdf' });
    expect(isAllowedDocumentFile(file)).toBe(true);
  });

  it('rejects invalid extensions', () => {
    const file = new File(['content'], 'resume.exe', { type: 'application/pdf' });
    expect(isAllowedDocumentFile(file)).toBe(false);
  });

  it('rejects mismatched mime types', () => {
    const file = new File(['content'], 'resume.pdf', { type: 'text/plain' });
    expect(isAllowedDocumentFile(file)).toBe(false);
  });
});
