import type { ChatRequest, ChatResponse, ReportResponse } from './types';

const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL ?? `${process.env.NEXT_PUBLIC_API_URL ?? ''}/chat`;
const REPORT_URL = process.env.NEXT_PUBLIC_REPORT_URL ?? `${process.env.NEXT_PUBLIC_API_URL ?? ''}/report`;

export async function sendMessage(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(CHAT_URL, {
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
  const res = await fetch(REPORT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Report error: ${res.status}`);
  }

  return res.json() as Promise<ReportResponse>;
}
