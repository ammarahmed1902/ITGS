const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

const EXTENSION_TO_MIME: Record<string, string[]> = {
  '.pdf': ['application/pdf'],
  '.doc': ['application/msword'],
  '.docx': [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

export function getFileExtension(fileName: string): string {
  const dot = fileName.lastIndexOf('.');
  if (dot === -1) {
    return '';
  }
  return fileName.slice(dot).toLowerCase();
}

/** Validates resume/cover-letter uploads by extension and MIME type. */
export function isAllowedDocumentFile(file: File): boolean {
  const extension = getFileExtension(file.name);
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return false;
  }

  const allowedMimes = EXTENSION_TO_MIME[extension];
  if (!file.type) {
    return true;
  }

  return allowedMimes.includes(file.type);
}

export const MAX_DOCUMENT_SIZE_BYTES = 5 * 1024 * 1024;
