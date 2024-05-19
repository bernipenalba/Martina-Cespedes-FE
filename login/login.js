// Función para manejar el inicio de sesión del administrador
function iniciarSesionAdmin() {
  // Redirigir a la página principal del administrador
  localStorage.setItem("tipoUsuario", "administrador");
  window.location.href = "../Administrador.html";
}

/*
// Función para manejar el inicio de sesión del encargado de producción
function iniciarSesionProduccion() {
  // Redirigir a la página principal del encargado de producción
  localStorage.setItem("tipoUsuario", "produccion");
  window.location.href = "../EncargadoProduccion.html";
}

// Función para manejar el inicio de sesión del encargado de ventas
function iniciarSesionVentas() {
  // Redirigir a la página principal del encargado de ventas
  localStorage.setItem("tipoUsuario", "ventas");
  window.location.href = "../EncargadoVentas.html";
}
*/