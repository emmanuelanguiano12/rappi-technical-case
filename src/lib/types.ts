export type ChartType = 'line' | 'bar';

export interface ChartSeries {
  key: string;
  label: string;
  color?: string;
}

export interface ChartData {
  type: ChartType;
  title: string;
  x_key: string;
  series: ChartSeries[];
  data: Record<string, unknown>[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  chart_data?: ChartData | null;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  session_id: string;
}

export interface ChatResponse {
  reply: string;
  chart_data?: ChartData | null;
  suggestions?: string[];
}

export interface ReportResponse {
  report: string;
  generated_at: string;
}
