---
layout: page
title: Redirect Following
parent: Examples
nav_order: 1
---

## Redirect Following

En SSRF (especialmente **blind SSRF**), una de las preguntas más importantes no es solo *“¿hubo callback?”*, sino **cómo se comporta el cliente que está haciendo el fetch**.  
Si ese cliente **sigue redirecciones**, se abren escenarios prácticos que pueden marcar la diferencia entre un SSRF “limitado” y un SSRF con **bypass** o **mayor alcance**.

Introspector detecta esto **de forma pasiva** usando un patrón muy común: muchos clientes (workers, headless browsers, bots de preview, parsers de documentos) solicitan automáticamente **`/favicon.ico`** cuando visitan un dominio.

---

## ¿Por qué importa seguir redirects en SSRF?

Cuando un backend sigue `301/302`:

- **Bypass de allowlists**: hay implementaciones que validan únicamente la **URL inicial** (por ejemplo, “solo permite dominios confiables”), pero no controlan el destino final luego de un redirect.  
  Si el cliente sigue redirects, puedes “entrar” por un dominio permitido y terminar en un destino distinto.

- **Encadenamiento de redirects (redirect chains)**: puedes usar endpoints intermedios controlados por ti para:
  - medir comportamiento del cliente,
  - ajustar el destino dinámicamente,
  - y dirigir el flujo a distintos targets en función de lo que observes (sin depender del response).

- **Mejor fingerprint del fetcher**: seguir o no seguir redirects es una señal fuerte para identificar si estás frente a:
  - un headless browser real,
  - un link preview bot,
  - un worker con librería HTTP estricta,
  - o un componente que solo valida/resolvea.

En resumen: **seguir redirects suele aumentar la “superficie” que el SSRF puede alcanzar**.

---

## Cómo lo valida Introspector (pasivo)

Cuando un cliente toca `introspector.sh/favicon.ico`, Introspector responde con una **302** hacia un endpoint de verificación:

- `GET /favicon.ico`  → **302** → `/favicon-followed`

Si el cliente **sigue** la redirección, realizará una segunda request a `/favicon-followed`.  
En ese momento Introspector marca el evento con **FOLLOW REDIRECT** (evidencia clara de que el fetcher sigue redirects).

Luego, para evitar loops y mantener el flujo realista, `/favicon-followed` redirige una vez más:

- `GET /favicon-followed` → **302** → `/index.ico`

---

## Flujo completo (cadena de redirect)

```text
Cliente SSRF (bot/worker/headless)
        │
        ├── GET /favicon.ico
        │        └── 302 Location: /favicon-followed
        │
        ├── GET /favicon-followed        (solo si sigue redirects)
        │        └── 302 Location: /index.ico
        │
        └── GET /index.ico               (fetch final)
