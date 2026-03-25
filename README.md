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
# Example: https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/prod
NEXT_PUBLIC_API_URL=https://your-api-gateway-url
```

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

| Operation | Estimated Cost |
|---|---|
| Chat session (10 questions) | ~$0.05–$0.15 (Claude 3 Sonnet on Bedrock) |
| Report generation | ~$0.10–$0.30 (full dataset analysis) |

> Costs vary depending on the model selected in Bedrock and the volume of data processed.


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
# Ejemplo: https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/prod
NEXT_PUBLIC_API_URL=https://tu-api-gateway-url
```

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

| Operación | Costo estimado |
|---|---|
| Sesión de chat (10 preguntas) | ~$0.05–$0.15 (Claude 3 Sonnet en Bedrock) |
| Generación de reporte | ~$0.10–$0.30 (análisis completo del dataset) |

> Los costos varían según el modelo seleccionado en Bedrock y el volumen de datos procesados.