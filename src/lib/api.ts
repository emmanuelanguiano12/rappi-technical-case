import type { ChatRequest, ChatResponse, ReportResponse } from './types';

// Base URLs — NEXT_PUBLIC_CHAT_URL and NEXT_PUBLIC_REPORT_URL take precedence over
// NEXT_PUBLIC_API_URL to allow Lambda Function URLs (no 29s timeout limit).
const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL ?? `${process.env.NEXT_PUBLIC_API_URL ?? ''}/chat`;
const REPORT_URL = process.env.NEXT_PUBLIC_REPORT_URL ?? `${process.env.NEXT_PUBLIC_API_URL ?? ''}/report`;

/**
 * Sends a user message to the Bedrock Agent via Lambda Chat.
 * Includes the session_id so the agent maintains conversational memory across turns.
 */
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

/**
 * Sends an already-generated report to the given email address via AWS SES.
 * The report markdown is passed in the request body — the Lambda handles the
 * email composition and delivery without re-generating the report.
 */
export async function sendReportByEmail(email: string, report: string): Promise<void> {
  const res = await fetch(REPORT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'send_email', email, report }),
  });

  if (!res.ok) {
    throw new Error(`Email error: ${res.status}`);
  }
}

/**
 * Triggers the automatic insights report generation.
 * The Lambda reads the dataset from S3, computes insights with pandas,
 * and generates a Markdown executive report using Claude via Bedrock.
 */
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
