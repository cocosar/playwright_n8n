# playwright_n8n

Proyecto para automatizar pruebas web con Playwright integrado en un entorno de n8n, incluyendo prompts de agentes para planificar, generar, sanear y corregir tests de manera asistida.

## Que incluye este repositorio

- Entorno Docker para ejecutar n8n con soporte para Playwright y Chromium.
- Configuracion de Playwright en TypeScript (`playwright.config.ts`).
- Ejemplos de tests en `tests/` para el sitio DemoBlaze.
- Prompts de agentes en `ai/` para:
  - planificacion de escenarios de prueba,
  - generacion de specs Playwright,
  - saneamiento de codigo generado,
  - healing/correccion de tests fallidos.
- Flujo de CI en GitHub Actions para ejecutar la suite Playwright.

## Estructura del proyecto

- `Dockerfile`: imagen base de n8n con dependencias de Playwright/Chromium y paquete `n8n-nodes-mcp`.
- `docker-compose.yml`: levanta n8n en `http://localhost:5678`, monta datos persistentes y el workspace del proyecto.
- `.env.example`: variable `PLAYWRIGHT_N8N_PATH` para montar el path local en el contenedor.
- `playwright.config.ts`: configuracion de tests (carpeta `tests/`, reporter HTML, Chromium en Docker).
- `plan-de-pruebas.md`: plan de pruebas funcional para DemoBlaze.
- `tests/`: specs de ejemplo generados para validaciones iniciales.
- `ai/`: prompts que orquestan comportamiento de agentes (planner, generator, sanitizer, healer).

## Requisitos

- Docker y Docker Compose.
- Node.js 18+ (si tambien queres correr Playwright fuera de Docker).

## Puesta en marcha

1. Clonar el repositorio:

```bash
git clone https://github.com/cocosar/playwright_n8n.git
cd playwright_n8n
```

2. Crear archivo de entorno:

```bash
cp .env.example .env
```

3. Editar `.env` y completar:

```dotenv
PLAYWRIGHT_N8N_PATH=/ruta/absoluta/a/playwright_n8n
```

4. Levantar n8n con Docker:

```bash
docker compose up -d --build
```

5. Abrir n8n en:

- `http://localhost:5678`

## Ejecucion de pruebas Playwright

En local (sin usar scripts de `package.json`):

```bash
npm install
npx playwright test
```

Para ver el reporte HTML:

```bash
npx playwright show-report
```

## CI

El workflow `.github/workflows/playwright.yml` ejecuta en cada push y pull request hacia `main` o `master`:

1. instalacion de dependencias,
2. instalacion de browsers de Playwright,
3. ejecucion de tests,
4. publicacion del artefacto `playwright-report`.

## Notas importantes

- La configuracion actual usa solo Chromium en Docker (Firefox/WebKit estan comentados en `playwright.config.ts`).
- El proyecto parece orientado a un flujo de generacion/curacion de tests desde n8n + MCP, no solo a escribir specs manualmente.
- Se incluyen archivos JSON de agentes n8n en la raiz para importar y reutilizar flujos.
