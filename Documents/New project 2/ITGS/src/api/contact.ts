export interface SubmitContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface SubmitContactResponse {
  ok: true;
  id: string;
  message: string;
}

export async function submitContactForm(
  input: SubmitContactInput
): Promise<SubmitContactResponse> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof payload.error === 'string'
        ? payload.error
        : 'Failed to send message. Please try again later.'
    );
  }

  return payload as SubmitContactResponse;
}
