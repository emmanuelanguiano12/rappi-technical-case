export type ChartType = 'line' | 'bar';

/** Defines a single data series to render in a chart (line or bar). */
export interface ChartSeries {
  key: string;    // matches the data key in ChartData.data rows
  label: string;  // displayed in the chart legend
  color?: string; // optional hex color; falls back to COLORS palette
}

/**
 * Structured chart payload returned by the Bedrock Agent when the response
 * includes data suitable for visualization (trends, comparisons, rankings).
 */
export interface ChartData {
  type: ChartType;
  title: string;
  x_key: string;          // key used as the X axis (e.g. "week", "zone")
  series: ChartSeries[];
  data: Record<string, unknown>[];
}

/** Represents a single message in the chat conversation. */
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  chart_data?: ChartData | null;
  timestamp: Date;
}

/** Payload sent to the Lambda Chat endpoint on each user turn. */
export interface ChatRequest {
  message: string;
  session_id: string; // unique per browser tab — enables Bedrock Agent memory
}

/** Response from the Lambda Chat endpoint. */
export interface ChatResponse {
  reply: string;
  chart_data?: ChartData | null;
  suggestions?: string[];  // proactive follow-up questions suggested by the agent
}

/** Response from the Lambda Report endpoint. */
export interface ReportResponse {
  report: string;        // full Markdown executive report
  generated_at: string;
}
