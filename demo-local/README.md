# Demos locales por empresa

El portal usa https://localhost:8443/demo. Cada empresa obtiene PostgreSQL, API, frontend, archivos y secretos propios. La identidad estable de Google recupera la misma empresa en los siguientes ingresos. La cuenta inicial se vincula durante el bootstrap de una base nueva, después de verificar Google. Los ingresos habituales siguen utilizando el broker y las sesiones de la API de esa empresa.

El subdominio usa el nombre normalizado de la empresa, por ejemplo `miempresa.demo.localhost:8443`. Los espacios pasan a guiones y los acentos se transliteran. Si el nombre está ocupado, se asigna `miempresa-2`, manteniendo el identificador interno y los recursos Docker exclusivos de cada empresa. Los nombres se reservan con un índice único y una transacción de escritura. El subdominio asignado permanece estable en los siguientes ingresos.

`DEMO_ORIGIN_TEMPLATE` admite `{subdomain}` y `{id}`. El formato previsto para producción es `https://{subdomain}.demo.zuzudev.pro`, que requiere su propia configuración DNS y TLS wildcard. El proxy incluido en esta carpeta corresponde al ensayo local.

Las demos existentes reciben un nombre mediante una migración del registro de control. El worker actualiza el origen de la API conservando el instante de disponibilidad y los volúmenes. El seed se ejecuta únicamente en el aprovisionamiento inicial. La URL local antigua con identificador largo redirige al nuevo dominio. El cambio de host requiere iniciar sesión en el nuevo origen.

## Preparación

Requiere Docker Desktop Linux, Python con cryptography y requests, y el checkout actualizado de zuzudev-erp. Desde la raíz del portfolio, ejecutar setup.py con --erp-root y --google-client apuntando al archivo web OAuth descargado. Los secretos permanecen en ese archivo original, montado solo para lectura en el broker. La configuración .env y los certificados se excluyen de Git y del contexto de build.

Sustituir la ruta del JSON por la del archivo descargado de Google.

```
python -m pip install cryptography requests
python demo-local/setup.py --erp-root F:/Proyectos/zuzudev-erp --google-client "C:/credenciales/google-client.json"
```

Google requiere estos retornos exactos en el mismo cliente web usado por el archivo descargado.

- https://localhost:8443/auth/signup/callback/google
- https://localhost:8443/auth/callback/google

Con el alta pública local habilitada, el alta y el login usan el retorno `/auth/signup/callback/google`. El broker distingue la operación mediante una transacción guardada en el servidor y verifica la cookie correspondiente. La ruta `/auth/callback/google` permanece disponible para instalaciones con el alta pública deshabilitada.

Para el ensayo, el certificado local se importa con autorización del usuario en Cert:\\CurrentUser\\Root. Caduca a los noventa días. La configuración local solo publica el puerto 8443 en 127.0.0.1. El certificado público también se usa como autoridad adicional dentro de las APIs. La clave privada permanece en certs y en el volumen local de certificados.

Preparar el volumen de certificados y construir las imágenes desde PowerShell, sustituyendo la ruta del ERP por la configurada.

```
docker volume create zd-demo-local-certs
docker run --rm -v "${PWD}/demo-local/certs:/source:ro" -v zd-demo-local-certs:/target alpine:3.22 cp /source/local.crt /source/local.key /target/
docker volume create zd-demo-local-ca
docker run --rm -v "${PWD}/demo-local/certs:/source:ro" -v zd-demo-local-ca:/target alpine:3.22 cp /source/local.crt /target/
docker build -f F:/Proyectos/zuzudev-erp/apps/api/Dockerfile -t zd-demo-local-api:dev F:/Proyectos/zuzudev-erp
docker build -f F:/Proyectos/zuzudev-erp/apps/web/Dockerfile --build-arg API_INTERNAL_URL=http://api:4000 -t zd-demo-local-web:dev F:/Proyectos/zuzudev-erp
docker compose --env-file demo-local/.env -f demo-local/compose.yml up -d --build
npm run dev --prefix apps/web
```

## Funcionamiento y límites del ensayo

El formulario bajo HTTPS envía el alta al control local. Google verifica la identidad y el correo antes de crear un trabajo durable. El worker aplica migraciones, ejecuta el seed y vincula al propietario. Publica la empresa únicamente después de comprobar ambas aplicaciones. Repetir el registro o ingresar desde “Ya tengo una demo” recupera la empresa existente.

Se admiten dos demos simultáneas en este ensayo. Las solicitudes adicionales permanecen pendientes. Cada trabajo permite tres intentos y tiene una exclusión temporal para recuperarse si se reinicia el worker. La API impide usar la demo después de veinte días desde su disponibilidad. El worker detiene los contenedores vencidos y conserva sus volúmenes. La eliminación definitiva requiere definir la política correspondiente para producción.

El worker es el único servicio con acceso al socket Docker. El broker recibe solicitudes y mantiene el registro de empresas y trabajos. Cada API conoce una sola base y utiliza secretos propios. El proxy se conecta a las redes de cada empresa para dirigir el tráfico por host. El volumen de control contiene credenciales y datos de contacto, por lo que su acceso queda reservado al administrador local.

Las invitaciones a empleados se implementarán sobre usuarios de la misma base de empresa. El registro inicial de esta entrega crea al propietario. El consentimiento de novedades es opcional y se registra con versión, fecha y origen. Las campañas y la baja deben integrarse antes de realizar envíos.

## Verificación

La prueba necesita dos cupos libres. Con una demo real activa y el límite predeterminado de dos, elevar temporalmente `MAX_DEMOS` a tres al recrear el worker. Al terminar, restaurar el límite original y recrear el worker. Las demos existentes conservan sus recursos durante ese cambio.

```
python demo-local/test_isolation.py
```

La prueba crea dos empresas ficticias mediante la cola administrativa, registra un cliente en una sola, intenta acceder y modificarlo desde la otra, intercambia sesiones y credenciales, comprueba el bloqueo de comunicación directa entre APIs y reinicia la primera base y API para verificar persistencia. Al finalizar elimina exclusivamente esos recursos ficticios. Un fallo conserva los recursos para diagnóstico.

Las pruebas de OAuth y registro están en deploy/auth-broker/test\_app.py y test\_signup.py del ERP. El ensayo real con Google se completa en el navegador. La prueba sintética usa la cola privada y conserva el requisito de OAuth en los endpoints públicos.

## Resultado del ensayo del 12 de noviembre de 2026

Se construyeron las imágenes Docker de API, frontend, broker y worker. Aprobaron TypeScript, ESLint, las 89 pruebas de API y las quince pruebas de broker y registro. La integración descartable verificó dos bases reales, sesiones y credenciales cruzadas, acceso a archivos subidos y persistencia de un cliente después de reiniciar su base y API. Los recursos de ensayo se eliminaron al terminar. También se verificaron la reserva de subdominios, los nombres repetidos, la migración de una empresa existente y la redirección del dominio antiguo.

El ingreso real con Google creó una empresa y el usuario confirmó el acceso al panel del ERP desde su subdominio local. Las URI guardadas en Google requirieron un nuevo intento después de su propagación. El certificado de desarrollo fue instalado en el almacén de confianza del usuario de Windows con su autorización.
