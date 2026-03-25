'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateReport } from '@/lib/api';
import { Loader2, RefreshCw, Download } from 'lucide-react';

function downloadMarkdown(content: string) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rappi-insights-${new Date().toISOString().slice(0, 10)}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportView() {
  const [report, setReport] = useState<string | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const res = await generateReport();
      setReport(res.report);
      setGeneratedAt(res.generated_at);
    } catch {
      setError('No se pudo generar el reporte. Verifica la conexión con el backend.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-white">
        <div>
          <h1 className="font-semibold text-gray-900 text-sm">Insights Automáticos</h1>
          <p className="text-xs text-gray-400">Reporte ejecutivo generado por IA · Análisis de todas las zonas</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {report && (
            <button
              onClick={() => downloadMarkdown(report)}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
            >
              <Download size={13} />
              Exportar MD
            </button>
          )}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs bg-orange-500 text-white rounded-lg px-3 py-1.5 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <RefreshCw size={13} />
            )}
            {loading ? 'Generando…' : report ? 'Regenerar' : 'Generar Reporte'}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {!report && !loading && !error && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
              <RefreshCw size={28} className="text-gray-400" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Sin reporte generado</h2>
              <p className="text-sm text-gray-500 mt-1 max-w-sm">
                Haz clic en <strong>Generar Reporte</strong> para analizar automáticamente todas las zonas e identificar anomalías, tendencias y oportunidades.
              </p>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <Loader2 size={32} className="text-orange-500 animate-spin" />
            <div>
              <p className="font-medium text-gray-800">Analizando datos operacionales…</p>
              <p className="text-sm text-gray-500 mt-1">Esto puede tardar unos segundos</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {report && !loading && (
          <div>
            {generatedAt && (
              <p className="text-xs text-gray-400 mb-4">
                Generado el {new Date(generatedAt).toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' })}
              </p>
            )}
            <article className="prose prose-sm max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-table:text-sm">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-base font-semibold text-gray-900 mt-6 mb-2 flex items-center gap-2">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-sm font-semibold text-gray-800 mt-4 mb-1">{children}</h3>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4 rounded-xl border border-gray-200">
                      <table className="min-w-full text-xs">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
                  th: ({ children }) => (
                    <th className="px-4 py-2.5 text-left font-semibold text-gray-600 border-b border-gray-200">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-2.5 text-gray-700 border-b border-gray-100 last:border-0">{children}</td>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-orange-400 bg-orange-50 pl-4 py-2 my-3 rounded-r-lg text-sm text-orange-800">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 text-orange-600 text-xs px-1.5 py-0.5 rounded font-mono">{children}</code>
                  ),
                  ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-2">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-700 text-sm leading-relaxed">{children}</li>,
                  p: ({ children }) => <p className="text-gray-700 text-sm leading-relaxed mb-3">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  hr: () => <hr className="border-gray-200 my-6" />,
                }}
              >
                {report}
              </ReactMarkdown>
            </article>
          </div>
        )}
      </div>
    </div>
  );
}
