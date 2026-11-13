# Entrada HTTPS de producción en Docker

El origen de producción está separado del ensayo local. Nginx sirve el portfolio compilado y recibe HTTPS en `127.0.0.1:9444`. El servicio cloudflared de Windows puede conectarse a ese puerto; no se publica en la red local ni se abren puertos del router. El portal previsto es `https://demo.zuzudev.pro/demo` y cada empresa usa `https://miempresa.demo.zuzudev.pro`.

## Estado actual

Nginx y el broker están levantados en Docker, sin publicación del túnel. El aprovisionador de producción permanece desactivado. El registro de empresas y sus volúmenes son independientes del ensayo local; esta preparación no copia ni migra sus datos. Las imágenes de ERP configuradas inicialmente son las construidas y probadas durante el ensayo. Antes de activar el servicio público se deben fijar versiones de entrega, respaldar los datos que se quieran conservar y realizar las pruebas públicas de Google y aislamiento.

## Preparación y arranque

Desde la raíz del portfolio, usando el JSON original descargado de Google:

```powershell
python demo-production/setup.py --erp-root F:/Proyectos/zuzudev-erp --google-client C:/credenciales/google-client.json
docker compose --env-file demo-production/.env -f demo-production/compose.yml up -d --build broker proxy
python demo-production/check_gateway.py
```

El script crea `.env`, un certificado de origen de 90 días firmado por una CA privada y el volumen `zd-demo-production-ca`, que contiene únicamente el certificado público de la CA. La clave de firma de la CA se descarta. Los archivos privados no se incluyen en Git ni en las imágenes. Nginx recibe la clave de su certificado; las APIs solo reciben el certificado público para comprobar el broker interno.

El worker admite `DEMO_PROJECT_PREFIX`, `DEMO_PROXY_CONTAINER` y `DEMO_CA_VOLUME`. Producción utiliza el prefijo `zd-prod-demo-`; el ensayo conserva `zd-demo-`. Cada empresa sigue recibiendo PostgreSQL, API, frontend y archivos separados. Solo el worker monta el socket Docker y no tiene una entrada HTTP pública.

## Conectar el túnel existente

El servicio Windows actual usa configuración remota. `cloudflared.example.yml` documenta los valores equivalentes; guardarlo en esta carpeta no modifica ese servicio. En Cloudflare se necesitan dos rutas publicadas:

| Host público | Servicio de origen |
| --- | --- |
| `demo.zuzudev.pro` | `https://127.0.0.1:9444` |
| `*.demo.zuzudev.pro` | `https://127.0.0.1:9444` |

En ambas configurar `Origin Server Name` como `demo.zuzudev.pro`, `CA Pool` con la ruta absoluta de `demo-production/certs/ca.crt` y mantener **No TLS Verify desactivado**. La cuenta del servicio Windows debe poder leer ese archivo público. Conservar el encabezado HTTP Host original, sin reemplazarlo por el dominio del portal: Nginx lo utiliza para resolver cada empresa en el registro. No publicar directamente los puertos del broker, API, PostgreSQL o Docker. No crear una regla que omita autenticación.

El certificado del origen no reemplaza al certificado público de Cloudflare. Con DNS completo, Universal SSL cubre `*.zuzudev.pro`, pero no `*.demo.zuzudev.pro`. Antes de publicar, comprobar la cobertura del certificado de borde y el tipo de zona. Durante la revisión el dominio usaba servidores DNS de Vercel; cualquier cambio de DNS debe conservar los registros existentes. No se ha modificado DNS ni contratado un certificado o plan.

Referencias oficiales: [verificación del origen](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/origin-parameters/) y [límites de Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/limitations/).

## Controles implementados

- TLS 1.2 y 1.3, sin tickets de sesión TLS; HSTS inicial de un día en producción.
- Rechazo de nombres TLS y Host desconocidos. La resolución de una demo requiere un registro listo y vigente del host exacto. Un nombre de empresa no se transforma directamente en una dirección de API.
- Cookies y sesiones emitidas por la API de cada empresa. Nginx no agrega `Domain` ni comparte cookies entre subdominios.
- Límites de tamaño y tiempos de espera, protección contra incrustación y encabezados contra detección de tipos y filtración de URL por Referer.
- Sin logs de URL de solicitudes en Nginx, para evitar almacenar códigos OAuth. Los errores de solicitud también se descartan; diagnosticar con las comprobaciones de salud y `nginx -t` sin registrar códigos ni datos privados.

El recorrido público utiliza HTTPS entre navegador y Cloudflare, el transporte cifrado del túnel y HTTPS con certificado verificado entre cloudflared y Nginx. Dentro de Docker, Nginx se comunica por HTTP con broker y aplicaciones a través de redes privadas; PostgreSQL usa su red privada. Esta configuración no implementa TLS en todos los enlaces internos de Docker.

## Activación pendiente

Registrar en Google los retornos exactos `https://demo.zuzudev.pro/auth/signup/callback/google` y `https://demo.zuzudev.pro/auth/callback/google`. El alta pública habilitada usa el primero para ambas operaciones. El portal y ese callback comparten host para conservar la correlación de sus cookies. El CTA del portfolio principal debe dirigir al portal publicado.

Después de comprobar DNS, certificado público, túnel, retornos Google, respaldos y versiones de imágenes, activar el worker mediante el perfil `provisioning`. No ejecutar ese paso mientras esos requisitos estén pendientes:

```powershell
docker compose --env-file demo-production/.env -f demo-production/compose.yml --profile provisioning up -d --build
```

La política actual limita las solicitudes de alta por la dirección que ve el broker. Con el túnel, varias personas pueden aparecer con la misma dirección del conector; antes de una campaña hay que configurar y probar la identificación de IP desde el proxy de confianza, sin confiar en encabezados enviados libremente por clientes.

## Renovación y verificación

El certificado generado vence a los 90 días. Antes de vencer, preparar un nuevo conjunto en una ubicación privada, actualizar el certificado público que confían cloudflared y las APIs y recargar Nginx. El script de preparación conserva los certificados existentes y no los renueva automáticamente. No borrar ni reemplazar archivos en uso sin preparar la transición de confianza. Para operación sostenida queda pendiente automatizar la renovación y su alerta.

`check_gateway.py` comprueba contra el Nginx real el certificado con su CA, portal, configuración de demos, encabezados y rechazo de empresa inexistente, endpoint interno, Host y nombre TLS desconocidos. `--local` verifica el entorno de ensayo. No desactiva la validación TLS ni modifica DNS.

Validado el 12 de noviembre de 2026: build del portal dentro de Docker, `nginx -t` y comprobaciones de ambos gateways. Las pruebas públicas del túnel y los proveedores siguen pendientes.


## Refuerzo del aislamiento — 13 de noviembre de 2026

Cada empresa conserva tres contenedores permanentes. Ahora tiene dos redes internas con modo de gateway `isolated`: `-edge` conecta frontend, API y Nginx; `-data` conecta exclusivamente API y PostgreSQL. Nginx no se conecta a la red de datos. El frontend y la API no tienen ruta de salida externa y se ejecutan con todas las capacidades Linux descartadas. El proxy sigue conectado a su red de control para llegar al broker y atender el túnel. Esto limita los contenedores de la demo; no constituye aislamiento frente a un administrador del host o un Docker comprometido.

La API utiliza `demo_app`, con una contraseña distinta de la administrativa, y permisos de conexión, uso de esquema y lectura/escritura de datos. No es superusuario, no crea bases ni roles, no modifica el esquema y no accede a `_prisma_migrations`. La contraseña de ejecución se deriva con HMAC del secreto exclusivo de esa base y se entrega únicamente como URL de conexión de la API. La API puede modificar los datos de su empresa, por lo que una API comprometida sigue siendo un riesgo para esa empresa.

Las migraciones pasan a una tarea temporal `migrate`, ejecutada por el worker con las credenciales administrativas. Esa tarea se elimina al terminar. La API arranca directamente, sin ejecutar migraciones. Cada actualización que cambie el esquema debe ejecutar nuevamente la tarea de mantenimiento y aplicar los permisos correspondientes; reiniciar la API no migra la base.

El cambio de plantilla se aplica a nuevas demos. Para una empresa existente hay una operación administrativa explícita, desde el contenedor worker actualizado:

```powershell
docker exec zd-demo-local-worker-1 python worker.py --harden-existing IDENTIFICADOR_DE_32_HEXADECIMALES
```

La operación detiene API y frontend, guarda un `pg_dump -Fc` privado en `/data/backups` del volumen de control, prepara redes y permisos y vuelve a arrancar los servicios. No ejecuta seed ni bootstrap y conserva los volúmenes, `ready_at` y `expires`. Al retirar una red antigua reinicia el proxy compartido para renovar el mapeo de su puerto en Docker Desktop; realizar esta operación durante una ventana de mantenimiento, porque puede interrumpir brevemente las demás demos. Si falla, hay que revisar la instancia y restaurar el respaldo cuando corresponda antes de reabrirla. Los respaldos contienen datos de clientes y requieren acceso restringido y política de retención.

Las pruebas de integración crean dos empresas descartables, comprueban permisos SQL, inaccesibilidad de PostgreSQL desde frontend y proxy, conexiones salientes de muestra, credenciales y sesiones cruzadas, archivos y persistencia tras reinicio. Las sondas de red son pruebas concretas, no un barrido completo de la LAN. La red `isolated` evita asignar una dirección al bridge, además de impedir rutas externas; requiere un Docker Engine compatible. Referencia: [modos de gateway de Docker](https://docs.docker.com/engine/network/port-publishing/#gateway-modes).

Verificado en Docker Desktop el 13 de noviembre: dos demos descartables aprobaron permisos, datos y sesiones cruzadas, archivos y persistencia. Se actualizó la demo existente con respaldo previo; conservó los 4 clientes, 8 productos, usuario, fecha de disponibilidad y vencimiento. Respondieron el login, la salud de la API y la consulta de proveedores a través del broker HTTPS. El puerto HTTPS del host fue accesible desde una red Docker común y rechazado desde la API y frontend aislados. Las pruebas públicas de Cloudflare y el nuevo ingreso real con Google siguen pendientes.
