---
layout: page
title: DNS Callbacks
---

# DNS Callbacks

El módulo **DNS Callbacks** permite confirmar interacciones OOB (out-of-band) cuando un objetivo realiza **resoluciones DNS** hacia tu infraestructura.

Esto es clave para escenarios como:

- Blind SSRF (solo DNS)
- XXE
- Command Injection
- Backends que hacen “fetch” silencioso
- Clientes que no devuelven nada por HTTP

---

## 🧠 Cómo funciona (resumen)

Introspector levanta un **listener DNS** en **UDP/53**.  
Cuando el objetivo resuelve un subdominio bajo tu dominio (ej: `abc123.tudominio.com`), Introspector:

- recibe la query
- extrae el subdominio/token
- registra el evento en el Admin UI

---

## ⚙️ Configuración con tu propio dominio (VPS + DNS)

### Requisitos

- Un VPS con IP pública (ej: `X.X.X.X`)
- Un dominio tuyo (ej: `example.com`)
- Acceso al panel DNS de tu registrador/Cloudflare/etc.
- Puertos abiertos:
  - **UDP 53** (DNS)
  - **TCP 80/443** (HTTP callbacks / Admin UI si aplica)

---

## ⚠️ Importante (config dentro del proyecto)

✅ **La configuración de DNS en Introspector se cambia en el archivo: `core_state.py`.**  
Dentro de ese archivo encontrarás el bloque `DNS_CONFIG`. Ajústalo con tu **IP pública** y tu **dominio base**:

```python
DNS_CONFIG = {
    "listen_ip": "0.0.0.0",
    "listen_port": 53,                    # usa 53 en VPS real (o 5353 en local)
    "mode": "A",                          # "A" o "NXDOMAIN"
    "reply_ip": "138.197.112.130",        # IP del VPS
    "domain_base": "introspector.d3.lu",  # ej: "xx.domain.com"
    "log_file": "dns_queries.log",
    "seen_file": "tokens_seen.json"
}

## Configura el DNS en tu proveedor (GoDaddy, etc.) — SIN ESTO no llegan callbacks

Aunque ya hayas configurado `core_state.py`, **los callbacks DNS NO llegan “por arte de magia”**:  
tu dominio tiene que apuntar a la **IP pública del VPS** en el panel DNS (GoDaddy en tu caso).

**Wildcard A record (tokens)**
- **Type:** `A`
- **Name:** `*.introspector`
- **Value:** `X.X.X.X`

> Esto es exactamente el estilo de tu captura: `*.introspector -> IP`

✅ Si usas esta opción, en `core_state.py` pon:

```text
domain_base = "introspector.tudominio.com"
