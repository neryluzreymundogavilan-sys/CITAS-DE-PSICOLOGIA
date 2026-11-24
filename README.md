# PsicoCare

Proyecto web demostrativo para agendar y administrar citas psicológicas.

## Archivos
- `index.html`: estructura de la aplicación.
- `css/styles.css`: estilos personalizados y animaciones.
- `js/app.js`: lógica de acceso de demostración, citas, panel administrativo y controles multimedia.
- `assets/favicon.svg`: icono del sitio.

## Ejecutar en local
Abre `index.html` en un navegador. Para una prueba más estable, puedes usar la extensión **Live Server** de Visual Studio Code.

## Publicar en GitHub Pages
1. Crea un repositorio en GitHub.
2. Sube el contenido de esta carpeta (no solamente el ZIP).
3. Entra a **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`, y guarda.
6. Espera a que GitHub Pages publique el sitio.

## Acceso demostrativo
- Administrador: `admin`
- Contraseña: `admin1234`
- Paciente: usa el formulario o el botón de cuenta demo.

## Importante: alcance y seguridad
Esta versión conserva el comportamiento del código entregado y utiliza `localStorage`: los registros se guardan solamente en el navegador y dispositivo donde se crean. No existe una base de datos compartida ni sincronización entre usuarios.

El acceso administrativo es demostrativo: las credenciales están en el código del navegador y **no constituye autenticación segura**. No uses datos personales ni información clínica real en esta versión.

La pantalla remota de la videollamada es una representación visual de demostración; la cámara local y la opción de compartir pantalla dependen de los permisos del navegador. No hay conexión de audio/video entre dos usuarios ni cifrado de extremo a extremo real.

Para usarlo como servicio real se necesita un backend con autenticación segura, base de datos, control de acceso, protección de datos sensibles y un servicio de videollamadas real. GitHub Pages solamente aloja archivos estáticos.
