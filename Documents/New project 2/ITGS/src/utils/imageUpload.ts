export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

/** Hard cap on the original upload before any compression. */
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

function getExtension(fileName: string): string {
  const dot = fileName.lastIndexOf('.');
  return dot === -1 ? '' : fileName.slice(dot).toLowerCase();
}

/** Validates a profile photo upload by MIME type / extension. */
export function isAllowedImageFile(file: { name: string; type: string }): boolean {
  if (file.type) {
    return ALLOWED_IMAGE_TYPES.includes(file.type);
  }
  return ALLOWED_IMAGE_EXTENSIONS.includes(getExtension(file.name));
}

/** Human readable size validation message, or null when the file is acceptable. */
export function validateImageFile(file: File): string | null {
  if (!isAllowedImageFile(file)) {
    return 'Please upload a JPG, PNG, WEBP, or GIF image.';
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return 'Image must be smaller than 5MB.';
  }
  return null;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to decode image.'));
    img.src = dataUrl;
  });
}

/**
 * Reads an image file and returns a compressed JPEG/PNG data URL constrained to
 * `maxDimension` on its longest edge. Keeps payloads small enough to persist in
 * JSON storage and render instantly. Animated GIFs are returned untouched.
 */
export async function fileToCompressedDataUrl(
  file: File,
  maxDimension = 512,
  quality = 0.85
): Promise<string> {
  const original = await readFileAsDataUrl(file);

  // Canvas would flatten GIF animation, so preserve the original for GIFs.
  if (file.type === 'image/gif') {
    return original;
  }

  let image: HTMLImageElement;
  try {
    image = await loadImage(original);
  } catch {
    return original;
  }

  const { width, height } = image;
  if (!width || !height) {
    return original;
  }

  const scale = Math.min(1, maxDimension / Math.max(width, height));
  const targetW = Math.round(width * scale);
  const targetH = Math.round(height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return original;
  }
  ctx.drawImage(image, 0, 0, targetW, targetH);

  // PNG preserves transparency; everything else compresses well as JPEG.
  const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  try {
    return canvas.toDataURL(outputType, quality);
  } catch {
    return original;
  }
}
