'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Message } from '@/lib/types';
import { sendMessage } from '@/lib/api';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import SuggestionChips from './SuggestionChips';
import { Loader2 } from 'lucide-react';

// Default suggestions shown before the first message is sent.
const INITIAL_SUGGESTIONS = [
  '¿Cuáles son las 5 zonas con mayor Lead Penetration esta semana?',
  'Compara el Perfect Order entre zonas Wealthy y Non Wealthy en México',
  'Muestra la evolución de Gross Profit UE en las últimas 8 semanas',
  '¿Qué zonas tienen alto Lead Penetration pero bajo Perfect Order?',
  '¿Cuál es el promedio de Lead Penetration por país?',
  '¿Qué zonas crecen más en órdenes en las últimas 5 semanas?',
];

export default function ChatInterface() {
  // sessionId is generated once per tab mount — scopes Bedrock Agent memory to this conversation.
  const [sessionId] = useState<string>(() => uuidv4());
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message whenever messages or loading state changes.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  /**
   * Sends the user message, appends both user and assistant messages to the
   * conversation, and updates proactive suggestions from the agent response.
   */
  const handleSend = useCallback(async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSuggestions([]);
    setLoading(true);

    try {
      const res = await sendMessage({ message: content, session_id: sessionId });

      const assistantMsg: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: res.reply,
        chart_data: res.chart_data ?? null,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (res.suggestions?.length) {
        setSuggestions(res.suggestions);
      }
    } catch {
      const errorMsg: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: 'Ocurrió un error al procesar tu consulta. Por favor intenta de nuevo.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, sessionId]);

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-white">
        <div>
          <h1 className="font-semibold text-gray-900 text-sm">Rappi Analytics Assistant</h1>
          <p className="text-xs text-gray-400">Consulta métricas operacionales en lenguaje natural</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-gray-400">Online</span>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl font-bold">R</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">¿Qué quieres analizar hoy?</h2>
              <p className="text-sm text-gray-500 mt-1 max-w-sm">
                Haz preguntas sobre zonas, métricas, tendencias y más. Soporta consultas complejas.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}

        {loading && (
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
              <Loader2 size={14} className="text-orange-400 animate-spin" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions + Input */}
      <div className="border-t border-gray-100 bg-gray-50">
        <SuggestionChips
          suggestions={suggestions}
          onSelect={(s) => handleSend(s)}
        />
        <div className="px-6 py-4">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={() => handleSend()}
            disabled={loading}
          />
          <p className="text-xs text-gray-400 text-center mt-2">
            Presiona <kbd className="bg-gray-200 px-1 rounded text-gray-600">Enter</kbd> para enviar · <kbd className="bg-gray-200 px-1 rounded text-gray-600">Shift+Enter</kbd> para nueva línea
          </p>
        </div>
      </div>
    </div>
  );
}
