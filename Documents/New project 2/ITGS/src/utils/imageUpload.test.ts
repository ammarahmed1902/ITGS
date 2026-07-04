import { describe, it, expect } from 'vitest';
import {
  isAllowedImageFile,
  validateImageFile,
  MAX_IMAGE_SIZE_BYTES,
} from './imageUpload';

describe('isAllowedImageFile', () => {
  it('accepts common image MIME types', () => {
    expect(isAllowedImageFile({ name: 'a.jpg', type: 'image/jpeg' })).toBe(true);
    expect(isAllowedImageFile({ name: 'a.png', type: 'image/png' })).toBe(true);
    expect(isAllowedImageFile({ name: 'a.webp', type: 'image/webp' })).toBe(true);
    expect(isAllowedImageFile({ name: 'a.gif', type: 'image/gif' })).toBe(true);
  });

  it('rejects non-image MIME types', () => {
    expect(isAllowedImageFile({ name: 'a.pdf', type: 'application/pdf' })).toBe(false);
    expect(isAllowedImageFile({ name: 'a.exe', type: 'application/octet-stream' })).toBe(false);
  });

  it('falls back to extension when MIME type is empty', () => {
    expect(isAllowedImageFile({ name: 'photo.PNG', type: '' })).toBe(true);
    expect(isAllowedImageFile({ name: 'notes.txt', type: '' })).toBe(false);
  });
});

describe('validateImageFile', () => {
  function fakeFile(type: string, size: number, name = 'photo.png'): File {
    return { name, type, size } as File;
  }

  it('returns null for a valid, small image', () => {
    expect(validateImageFile(fakeFile('image/png', 1024))).toBeNull();
  });

  it('rejects files that are too large', () => {
    const result = validateImageFile(fakeFile('image/png', MAX_IMAGE_SIZE_BYTES + 1));
    expect(result).toMatch(/5MB/);
  });

  it('rejects disallowed types', () => {
    const result = validateImageFile(fakeFile('application/pdf', 1024, 'a.pdf'));
    expect(result).toMatch(/JPG|PNG|WEBP|GIF/);
  });
});
