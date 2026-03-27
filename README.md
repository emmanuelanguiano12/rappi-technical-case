# Rappi Analytics Assistant — Frontend

Web interface for Rappi's AI-powered operational analytics system. Enables SP&A and Operations teams to query metrics in natural language and generate automatic executive reports.

## Features

### 💬 Conversational Chat (`/chat`)
- Natural language queries over operational metrics (Lead Penetration, Perfect Orders, Gross Profit UE, etc.)
- Rich-format responses: tables, lists, and markdown
- **Inline charts** automatically rendered for trends (line) and comparisons (bar)
- Proactive analysis suggestions after each response
- Conversational memory per session (unique `session_id` per tab)

### 📊 Automatic Insights (`/report`)
- One-click AI-generated executive report
- Detects anomalies, concerning trends, benchmarks, and correlations
- Rendered Markdown with executive summary and actionable recommendations
- Export report as `.md`

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | Tailwind CSS v4 + Lucide React |
| Charts | Recharts |
| Markdown | react-markdown + remark-gfm |
| Backend | AWS API Gateway + Lambda + Bedrock |

## Project Structure

```
src/
  lib/
    types.ts          # Shared TypeScript types
    api.ts            # Backend communication layer
  components/
    layout/
      Sidebar.tsx     # Side navigation
    chat/
      ChatInterface.tsx   # Chat orchestrator
      MessageBubble.tsx   # Message bubbles with markdown
      MessageChart.tsx    # Inline charts (Recharts)
      ChatInput.tsx       # Auto-resize input
      SuggestionChips.tsx # Proactive suggestion chips
    report/
      ReportView.tsx  # Executive report view
  app/
    chat/page.tsx     # Route /chat
    report/page.tsx   # Route /report
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file at the project root (or edit the existing one):

```env
# API Gateway base URL — no trailing slash
NEXT_PUBLIC_API_URL=https://your-api-gateway-url

# Lambda Function URL for chat (bypasses API Gateway 29s timeout)
NEXT_PUBLIC_CHAT_URL=https://your-chat-lambda-url.lambda-url.us-east-1.on.aws

# Lambda Function URL for report generation (bypasses API Gateway 29s timeout)
NEXT_PUBLIC_REPORT_URL=https://your-report-lambda-url.lambda-url.us-east-1.on.aws
```

> `NEXT_PUBLIC_CHAT_URL` and `NEXT_PUBLIC_REPORT_URL` take precedence over `NEXT_PUBLIC_API_URL`. If not set, the app falls back to `{NEXT_PUBLIC_API_URL}/chat` and `{NEXT_PUBLIC_API_URL}/report`.

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — automatically redirects to `/chat`.

### 4. Production build

```bash
npm run build
npm start
```

## API Contracts

The frontend consumes two backend endpoints:

### `POST /chat`
```json
// Request
{ "message": "string", "session_id": "string" }

// Response
{
  "reply": "string",
  "chart_data": {
    "type": "line | bar",
    "title": "string",
    "x_key": "string",
    "series": [{ "key": "string", "label": "string", "color": "string?" }],
    "data": [{ ... }]
  } | null,
  "suggestions": ["string"] | null
}
```

### `POST /report`
```json
// Response
{ "report": "string (markdown)", "generated_at": "ISO 8601 string" }
```

## Estimated Cost per Use

Model: **Claude 3.5 Haiku** (`us.anthropic.claude-3-5-haiku-20241022-v1:0`) via Amazon Bedrock cross-region inference.

| Operation | Estimated Cost |
|---|---|
| Chat message (single question) | ~$0.001–$0.005 (Haiku input + output tokens) |
| Chat session (10 questions) | ~$0.01–$0.05 |
| Report generation | ~$0.02–$0.08 (full dataset analysis + report output) |

> Costs vary based on response length and number of tool calls made by the agent per question.


## Funcionalidades

### 💬 Chat conversacional (`/chat`)
- Preguntas en lenguaje natural sobre métricas operacionales (Lead Penetration, Perfect Orders, Gross Profit UE, etc.)
- Respuestas con formato enriquecido: tablas, listas y markdown
- **Gráficos inline** automáticos para tendencias (línea) y comparaciones (barra)
- Sugerencias proactivas de análisis después de cada respuesta
- Memoria conversacional por sesión (`session_id` único por pestaña)

### 📊 Insights automáticos (`/report`)
- Reporte ejecutivo generado por IA con un clic
- Detecta anomalías, tendencias preocupantes, benchmarks y correlaciones
- Formato Markdown renderizado con resumen ejecutivo y recomendaciones accionables
- Exportación del reporte en `.md`

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | Tailwind CSS v4 + Lucide React |
| Gráficos | Recharts |
| Markdown | react-markdown + remark-gfm |
| Backend | AWS API Gateway + Lambda + Bedrock |

## Estructura del proyecto

```
src/
  lib/
    types.ts          # Tipos TypeScript compartidos
    api.ts            # Capa de comunicación con el backend
  components/
    layout/
      Sidebar.tsx     # Navegación lateral
    chat/
      ChatInterface.tsx   # Orquestador del chat
      MessageBubble.tsx   # Burbujas de mensaje con markdown
      MessageChart.tsx    # Gráficos inline (Recharts)
      ChatInput.tsx       # Input con auto-resize
      SuggestionChips.tsx # Chips de sugerencias proactivas
    report/
      ReportView.tsx  # Vista del reporte ejecutivo
  app/
    chat/page.tsx     # Ruta /chat
    report/page.tsx   # Ruta /report
```

## Cómo levantar el proyecto

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto (o edita el existente):

```env
# URL base del API Gateway sin trailing slash
NEXT_PUBLIC_API_URL=https://tu-api-gateway-url

# Lambda Function URL para el chat (sin límite de 29s de API Gateway)
NEXT_PUBLIC_CHAT_URL=https://tu-chat-lambda-url.lambda-url.us-east-1.on.aws

# Lambda Function URL para el reporte (sin límite de 29s de API Gateway)
NEXT_PUBLIC_REPORT_URL=https://tu-report-lambda-url.lambda-url.us-east-1.on.aws
```

> `NEXT_PUBLIC_CHAT_URL` y `NEXT_PUBLIC_REPORT_URL` tienen prioridad sobre `NEXT_PUBLIC_API_URL`. Si no están definidas, el app usa `{NEXT_PUBLIC_API_URL}/chat` y `{NEXT_PUBLIC_API_URL}/report` como fallback.

### 3. Levantar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — redirige automáticamente a `/chat`.

### 4. Build de producción

```bash
npm run build
npm start
```

## Contratos de API

El frontend consume dos endpoints del backend:

### `POST /chat`
```json
// Request
{ "message": "string", "session_id": "string" }

// Response
{
  "reply": "string",
  "chart_data": {
    "type": "line | bar",
    "title": "string",
    "x_key": "string",
    "series": [{ "key": "string", "label": "string", "color": "string?" }],
    "data": [{ ... }]
  } | null,
  "suggestions": ["string"] | null
}
```

### `POST /report`
```json
// Response
{ "report": "string (markdown)", "generated_at": "ISO 8601 string" }
```

## Costo estimado por uso

Modelo: **Claude 3.5 Haiku** (`us.anthropic.claude-3-5-haiku-20241022-v1:0`) vía Amazon Bedrock cross-region inference.

| Operación | Costo estimado |
|---|---|
| Mensaje de chat (pregunta individual) | ~$0.001–$0.005 (tokens de entrada + salida de Haiku) |
| Sesión de chat (10 preguntas) | ~$0.01–$0.05 |
| Generación de reporte | ~$0.02–$0.08 (análisis completo del dataset + reporte) |

> Los costos varían según la longitud de la respuesta y el número de tool calls que el agente realice por pregunta.