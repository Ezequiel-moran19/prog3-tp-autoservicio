<h1>prog3-tp-autoservicio</h1>
<p>Este proyecto consiste en el desarrollo de un sistema de autoservicio que permite a los usuarios comprar productos de dos tipos diferentes pertenecientes al mismo rubro (no comida), a través de una interfaz web <strong>responsive</strong>.</p>

<hr>

<h2>Autoservicio App – Trabajo Práctico de Programación III</h2>

<h2>Proyectos</h2>

<p><strong>Frontend:</strong> Interfaz web para clientes. Permite ver productos, agregarlos al carrito, finalizar compras y generar un ticket en PDF.</p>

<p><strong>Backend:</strong> Servidor en Node.js con Express que ofrece:</p>
<ul>
  <li>API REST en JSON para gestión de productos, ventas y usuarios.</li>
  <li>Vistas HTML (EJS) para el panel de administrador con alta, baja, modificación y activación de productos.</li>
</ul>

<p>El sistema es <strong>responsive</strong>, funcionando correctamente en computadoras y dispositivos móviles.</p>

<hr>

<h2>Funcionalidades principales</h2>

<h3>Cliente / Usuario</h3>
<ul>
  <li>Pantalla de bienvenida con ingreso de nombre.</li>
  <li>Visualización de productos divididos en dos categorías.</li>
  <li>Carrito de compras con agregar/quitar productos y cantidades.</li>
  <li>Confirmación de compra mediante modal.</li>
  <li>Generación de ticket con los productos comprados, fecha y nombre del usuario.</li>
  <li>Descarga del ticket en PDF.</li>
  <li>Cambio de tema claro / oscuro con persistencia.</li>
  <li>Navegación entre pantallas mediante botones.</li>
  <li>Paginación de productos.</li>
  <li>Botón de acceso al panel de administración.</li>
</ul>

<hr>

<h3>Administrador</h3>
<ul>
  <li>Login con usuario y contraseña (botón de acceso rápido para testers).</li>
  <li>Dashboard con listado de productos por categoría.</li>
  <li>Alta de nuevos productos con imagen.</li>
  <li>Edición de productos existentes.</li>
  <li>Baja lógica (desactivar) y activación de productos.</li>
  <li>Persistencia de cambios en la base de datos.</li>
</ul>

<hr>

<h2>Backend – API y vistas</h2>
<ul>
  <li>Node.js + Express</li>
  <li>Renderizado con EJS</li>
  <li>Base de datos relacional con relación muchos a muchos entre productos y ventas (ORM: <strong>Sequelize</strong>)</li>
  <li>Contraseñas encriptadas con bcrypt</li>
  <li>Endpoints API REST en JSON, estructurados siguiendo MVC</li>
  <li>Validación de datos mediante middlewares</li>
  <li>Paginación de productos mediante parámetros en la API</li>
  <li>Carga y almacenamiento de imágenes de productos</li>
</ul>

<hr>

<h2>Flujo de la aplicación</h2>

<h3>Flujo del cliente</h3>
<ol>
  <li>Ingreso de nombre en pantalla de bienvenida.</li>
  <li>Visualización de productos por categoría.</li>
  <li>Agregar/quitar productos y cantidades en el carrito.</li>
  <li>Confirmación de compra mediante modal.</li>
  <li>Generación y descarga del ticket en PDF.</li>
  <li>Reinicio de proceso al salir del ticket.</li>
</ol>

<hr>

<h3>Flujo del administrador</h3>
<ol>
  <li>Login con usuario y contraseña (o acceso rápido).</li>
  <li>Acceso al dashboard con listado de productos.</li>
  <li>Alta, baja lógica, edición y activación de productos.</li>
  <li>Cambios reflejados inmediatamente en la base de datos y frontend.</li>
</ol>
