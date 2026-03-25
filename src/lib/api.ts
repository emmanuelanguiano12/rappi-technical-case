import type { ChatRequest, ChatResponse, ReportResponse } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export async function sendMessage(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new Error(`Chat error: ${res.status}`);
  }

  return res.json() as Promise<ChatResponse>;
}

export async function generateReport(): Promise<ReportResponse> {
  const res = await fetch(`${API_BASE}/report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Report error: ${res.status}`);
  }

  return res.json() as Promise<ReportResponse>;
}
