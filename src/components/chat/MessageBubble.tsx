'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message } from '@/lib/types';
import MessageChart from './MessageChart';
import { Bot, User } from 'lucide-react';

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex items-end gap-2 justify-end">
        <div className="max-w-[75%] bg-orange-500 text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm">
          {message.content}
        </div>
        <div className="shrink-0 w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
          <User size={14} className="text-orange-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <div className="shrink-0 w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center mt-0.5">
        <Bot size={14} className="text-orange-400" />
      </div>
      <div className="max-w-[85%]">
        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-800 shadow-sm">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ children }) => (
                <div className="overflow-x-auto my-2">
                  <table className="min-w-full text-xs border-collapse">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-50">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="px-3 py-2 text-left font-semibold text-gray-600 border-b border-gray-200">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-3 py-2 text-gray-700 border-b border-gray-100">
                  {children}
                </td>
              ),
              p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
              code: ({ children }) => (
                <code className="bg-gray-100 text-orange-600 text-xs px-1.5 py-0.5 rounded font-mono">
                  {children}
                </code>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        {message.chart_data && <MessageChart chart={message.chart_data} />}
      </div>
    </div>
  );
}
