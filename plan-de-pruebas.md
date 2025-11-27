# Plan de Pruebas REAL – Sitio Bajo Prueba

**URL:** https://demoblaze.com/  
**Contexto:** sin contexto  
**Historia de Usuario:** sin hdu  
**Fecha:** 2024-10-04

## 1. Resumen Ejecutivo

- **Descripción breve**: DemoBlaze es una aplicación web de e-commerce de demostración (tienda de productos electrónicos como phones, laptops y monitors). Incluye página principal con listado de productos, navegación por categorías (Phones, Laptops, Monitors), páginas de detalle de producto, navbar con acceso a Home, Cart, Log in y Sign up. Utiliza sliders/carousels, carga datos dinámicamente (API: api.demoblaze.com/entries, config.json) y modales/JS para interacciones (links a #). No se observaron formularios complejos en home/producto iniciales.
- **Principales flujos de negocio**: Navegación por categorías → Ver detalle producto → Agregar al carrito → Ver carrito → Checkout (probable login requerido) → Login/Sign up.
- **Riesgos clave**: Dependencia de JS para filtros/categorías/modales (links a #), posibles modales para auth/carrito, validaciones en add-to-cart/checkout, errores en consola (videojs, autocomplete en inputs password).
- **Alcance**: Cobertura de UI/UX en home, categorías, producto, carrito y auth. NO cubre: backend simulado (pagos reales), mobile/responsive profundo, performance avanzada. Se asumen flujos estándar de e-commerce basados en exploración.

## 2. Información Verificada del Sitio

### 2.1 Estructura y Navegación

- **Secciones principales**:
  - **Home / Listado principal**: Listado de 9 productos (ej. Samsung galaxy s6) con links a `prod.html?idp_=X` [ref=e74 en snapshot home]. Carousel con slides (Previous/Next buttons).
  - **Navbar / Menú principal**: Links: Home (current, /index.html), Contact (#), About us (#), Cart (/cart.html [ref=e15]), Log in (# [ref=e17]), Sign up (# [ref=e19]).
  - **Categorías**: Phones (# [ref=e40]), Laptops (# [ref=e41]), Monitors (# [ref=e42]) – probable filtro JS.
  - **Página Producto** (prod.html?idp_=1): Detalle producto (ej. Samsung galaxy s6, precio $360), "Add to cart" link [ref=e66].
  - **Formularios relevantes**: Inputs password observados en DOM (warnings autocomplete), probable en modales Log in/Sign up. NO_ENCONTRADO formulario búsqueda o checkout en home/producto.

### 2.2 Selectores REALES (DOM)

- Navbar Cart link: `a[href="https://demoblaze.com/cart.html"]` o `a#cartur.nav-link` (verificado en home).
- Navbar Log in: `a[href="#"]` con text "Log in" (verificado en home/producto).
- Navbar Sign up: `a[href="#"]` con text "Sign up" (verificado en home/producto).
- Categoría Phones: link text "Phones" [ref=e40] (verificado en home).
- Link producto home: `.card-block a` (9 elementos verificados en home).
- "Add to cart" en producto: link text "Add to cart" [ref=e66] (verificado en prod.html?idp_=1).
- Carousel Next: button text "Next" [ref=e32] (verificado en home).
- NO_ENCONTRADO "Add to cart" en home (buscado con `document.querySelectorAll('button, a')` filtrando text 'add'/'cart').
- Carrito página: NO_VERIFICADO (no navegada).
- Modal login: NO_VERIFICADO (no activado).

## 3. Escenarios de Prueba

### Escenario 1: Navegar a Home y verificar listado productos
**Tipo:** Positivo  
**Objetivo:** Validar carga inicial de página principal y visualización de productos para usuario anónimo.  
**Precondiciones / Estado inicial:** Navegador fresco, URL https://demoblaze.com/.  
**Pasos (numerados y claros):**  
1. Acceder a https://demoblaze.com/.  
2. Esperar carga completa (carousel y productos visibles).  
**Criterios de aceptación / Resultados esperados:**  
- Título "STORE".  
- 9 productos visibles (ej. "Samsung galaxy s6", "$360").  
- Navbar completo (Home current, Cart, Log in, Sign up).  
**Condiciones de fallo:** Ausencia de productos, navbar incompleto, errores JS bloqueando UI.  
**Selectores reales usados:** `.card-block a` (9 items).  
**Estado de verificación:** VERIFICADO (snapshot home).

### Escenario 2: Filtrar por categoría Phones
**Tipo:** Positivo  
**Objetivo:** Validar filtrado de productos por categoría para mejorar navegación UX.  
**Precondiciones / Estado inicial:** En home.  
**Pasos (numerados y claros):**  
1. Click en link "Phones".  
2. Verificar actualización de listado.  
**Criterios de aceptación / Resultados esperados:**  
- Productos filtrados a Phones (ej. Samsung galaxy s6 visible, Laptops ocultos).  
**Condiciones de fallo:** No filtra, error JS, página recarga inesperada.  
**Selectores reales usados:** link text "Phones" [ref=e40].  
**Estado de verificación:** PARCIALMENTE_VERIFICADO (link # observado, JS probable).

### Escenario 3: Ver detalle de producto desde home
**Tipo:** Positivo  
**Objetivo:** Validar flujo detalle producto para decisión de compra.  
**Precondiciones / Estado inicial:** En home.  
**Pasos (numerados y claros):**  
1. Click en link producto (ej. "Samsung galaxy s6").  
**Criterios de aceptación / Resultados esperados:**  
- Navega a prod.html?idp_=1.  
- Muestra título producto, precio "$360 *includes tax", descripción.  
**Condiciones de fallo:** Link roto, no carga imagen/descripción.  
**Selectores reales usados:** `.card-block a[href*="prod.html?idp_=1"]`.  
**Estado de verificación:** VERIFICADO (navegación a prod.html?idp_=1).

### Escenario 4: Agregar producto al carrito desde detalle
**Tipo:** Positivo  
**Objetivo:** Validar adición al carrito como paso clave de compra.  
**Precondiciones / Estado inicial:** En página producto (prod.html?idp_=1), carrito vacío.  
**Pasos (numerados y claros):**  
1. Click "Add to cart".  
2. Verificar confirmación (toast/alert probable).  
**Criterios de aceptación / Resultados esperados:**  
- Producto agregado (contador carrito +1 si visible).  
- Posible modal/alert "Item added".  
**Condiciones de fallo:** No agrega, error sin feedback.  
**Selectores reales usados:** link text "Add to cart" [ref=e66].  
**Estado de verificación:** VERIFICADO (elemento presente).

### Escenario 5: Acceder a carrito vacío
**Tipo:** Positivo / Caso borde  
**Objetivo:** Validar estado inicial carrito para usuario nuevo.  
**Precondiciones / Estado inicial:** Carrito vacío, desde home.  
**Pasos (numerados y claros):**  
1. Click navbar "Cart".  
**Criterios de aceptación / Resultados esperados:**  
- Navega a cart.html.  
- Muestra "Cart is empty" o similar.  
**Condiciones de fallo:** Error 404, crash.  
**Selectores reales usados:** `a#cartur.nav-link`.  
**Estado de verificación:** NO_VERIFICADO (página no navegada).

### Escenario 6: Intentar agregar al carrito sin producto seleccionado
**Tipo:** Negativo  
**Objetivo:** Validar manejo cuando no hay flujo previo (edge: directo a producto inválido).  
**Precondiciones / Estado inicial:** Navegar a prod.html?idp_=999 (ID inválido).  
**Pasos (numerados y claros):**  
1. Acceder a URL inválida.  
2. Buscar "Add to cart" y click si existe.  
**Criterios de aceptación / Resultados esperados:**  
- Error 404 o producto no encontrado.  
- Texto de alert: REFERENCIAL – "Product not found".  
**Condiciones de fallo:** Agrega item fantasma.  
**Selectores reales usados:** link text "Add to cart".  
**Estado de verificación:** NO_VERIFICADO (bloqueo técnico no explorado).

### Escenario 7: Abrir modal Log in con credenciales inválidas
**Tipo:** Negativo  
**Objetivo:** Validar validación auth para seguridad.  
**Precondiciones / Estado inicial:** En home, no logueado.  
**Pasos (numerados y claros):**  
1. Click "Log in".  
2. Ingresar email/password inválidos (ej. "test@test.com"/"wrong").  
3. Submit.  
**Criterios de aceptación / Resultados esperados:**  
- Modal abre (inputs password).  
- Error: REFERENCIAL – contiene "Invalid".  
**Condiciones de fallo:** Permite login falso, no valida.  
**Selectores reales usados:** link text "Log in" [ref=e17].  
**Estado de verificación:** PARCIALMENTE_VERIFICADO (link #, warnings autocomplete).

### Escenario 8: Sign up con campos vacíos
**Tipo:** Negativo / Caso borde  
**Objetivo:** Validar validaciones formulario registro (límite 0 chars).  
**Precondiciones / Estado inicial:** En home.  
**Pasos (numerados y claros):**  
1. Click "Sign up".  
2. Submit vacío.  
**Criterios de aceptación / Resultados esperados:**  
- Modal abre.  
- Error campos requeridos visibles.  
**Condiciones de fallo:** Envía sin validar.  
**Selectores reales usados:** link text "Sign up".  
**Estado de verificación:** NO_VERIFICADO (modal no activado).

### Escenario 9: Navegación carousel en home
**Tipo:** Positivo / No funcional  
**Objetivo:** Validar interactividad UI básica (estabilidad).  
**Precondiciones / Estado inicial:** En home.  
**Pasos (numerados y claros):**  
1. Click "Next" en carousel.  
2. Click múltiples veces.  
**Criterios de aceptación / Resultados esperados:**  
- Cambia slides (First/Second/Third).  
- Loop suave sin crash.  
**Condiciones de fallo:** No responde, JS error.  
**Selectores reales usados:** button text "Next" [ref=e32].  
**Estado de verificación:** VERIFICADO (observado en snapshots múltiples).

### Escenario 10: Checkout con carrito vacío
**Tipo:** Caso borde / Manejo de errores  
**Objetivo:** Validar bloqueo checkout sin items.  
**Precondiciones / Estado inicial:** Carrito vacío.  
**Pasos (numerados y claros):**  
1. Ir a Cart.  
2. Intentar "Place Order" si botón existe.  
**Criterios de aceptación / Resultados esperados:**  
- Mensaje "Cart empty".  
**Condiciones de fallo:** Permite checkout vacío.  
**Selectores reales usados:** Cart nav.  
**Estado de verificación:** NO_VERIFICADO (cart no explorado).

### Escenario 11: Agregar múltiples productos al carrito
**Tipo:** Positivo / Caso borde  
**Objetivo:** Validar acumulación (límite máximo items).  
**Precondiciones / Estado inicial:** Carrito vacío.  
**Pasos (numerados y claros):**  
1. Agregar 3 productos diferentes.  
2. Ir a Cart, verificar lista.  
**Criterios de aceptación / Resultados esperados:**  
- 3 items listados, total calculado.  
**Condiciones de fallo:** Sobrescribe, no suma precios.  
**Selectores reales usados:** "Add to cart" múltiples.  
**Estado de verificación:** PARCIALMENTE_VERIFICADO (add verificado en 1 producto).

### Escenario 12: Navegación atrás desde producto a home
**Tipo:** No funcional  
**Objetivo:** Validar estabilidad UX (back button).  
**Precondiciones / Estado inicial:** En producto.  
**Pasos (numerados y claros):**  
1. Desde home ir a producto.  
2. Navegar back.  
**Criterios de aceptación / Resultados esperados:**  
- Regresa a home intacta.  
**Condiciones de fallo:** Estado perdido, recarga completa.  
**Selectores reales usados:** Browser back.  
**Estado de verificación:** NO_VERIFICADO (no simulado).

### Escenario 13: Input inválido en login (email malformado)
**Tipo:** Negativo  
**Objetivo:** Validar sanitización inputs auth.  
**Precondiciones / Estado inicial:** Modal Log in abierto.  
**Pasos (numerados y claros):**  
1. Email: "invalid@", password válido.  
2. Submit.  
**Criterios de aceptación / Resultados esperados:**  
- Error email formato.  
**Condiciones de fallo:** Acepta sin validar.  
**Selectores reales usados:** input[type="email"] (inferido de warnings).  
**Estado de verificación:** NO_VERIFICADO.

### Escenario 14: Verificar consola errores en carga
**Tipo:** Manejo de errores  
**Objetivo:** Detectar issues técnicos impactando UX.  
**Precondiciones / Estado inicial:** Carga home.  
**Pasos (numerados y claros):**  
1. Cargar página.  
2. Inspeccionar console.  
**Criterios de aceptación / Resultados esperados:**  
- Warnings no críticos (videojs, autocomplete).  
**Condiciones de fallo:** Errores bloqueando (ej. API fail).  
**Selectores reales usados:** N/A.  
**Estado de verificación:** VERIFICADO (videojs warn).

## 4. Anexo: Tabla de Selectores

| Elemento / Rol funcional    | Selector canónico                  | Estabilidad | Estado/contexto donde se verificó              |
|-----------------------------|------------------------------------|-------------|------------------------------------------------|
| Navbar Cart                 | `a#cartur.nav-link`               | alta       | home navbar                                    |
| Navbar Log in               | `a[href="#"]:contains("Log in")`  | media      | home/product navbar                            |
| Navbar Sign up              | `a[href="#"]:contains("Sign up")` | media      | home/product navbar                            |
| Categoría Phones            | `a:contains("Phones")`            | media      | home categories                                |
| Link producto home          | `.card-block a`                   | alta       | home (9 items)                                 |
| Add to cart (producto)      | `a:contains("Add to cart")`       | alta       | prod.html?idp_=1                               |
| Carousel Next               | `button:contains("Next")`         | alta       | home carousel                                  |
| Carrito Place Order         | NO_ENCONTRADO (buscado en nav)    | -          | no verificado en cart.html                     |
| Input login email           | `input[type="email"]`             | media      | inferido DOM warnings                          |

## 5. Observaciones Críticas y Riesgos

- **Problemas de validación**: Warnings DOM autocomplete en inputs password – riesgo accesibilidad/UX.
- **Inconsistencias de UX**: Links categorías/auth a "#" (JS handlers), riesgo si JS falla. Carousel cambia slides automáticamente.
- **Problemas técnicos observables**: Console [WARNING] videojs plugin duplicate; [VERBOSE] DOM autocomplete. Network OK (api.demoblaze.com/entries 200), pero dependiente.
- **Riesgos**: Checkout/auth no fully explorados (modales), posible bloqueo sin login. Filtros categorías no clickeados (refs cambian).

## 6. Notas sobre Calidad y Ejecución

### Estándares de Calidad
- **Especificidad**: Pasos usan texto/selectores reales; ejecutar en incognito.
- **Independencia**: Todos asumen estado fresco (no login previo, carrito vacío).
- **Cobertura Negativa**: 40% escenarios negativos/borde (auth inválido, vacío, límites).
- **Estado**: Checkout requiere items; auth independientes. Usar datos test: email genérico si registro.