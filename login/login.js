// Función para manejar el inicio de sesión del administrador
function iniciarSesionAdmin() {
  // Redirigir a la página principal del administrador
  localStorage.setItem("tipoUsuario", "administrador");
  window.location.href = "../Administrador.html";
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpiar mensajes de error previos
    clearErrors();

    // Obtener los valores de los inputs y eliminar espacios en blanco
    const dni = document.getElementById('dni').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validaciones
    let valid = true;

    if (!/^\d{8}$/.test(dni)) {
      showError('dniError', 'El DNI debe ser una cadena de exactamente 8 números.');
      valid = false;
    }

    if (password.length < 5) {
      showError('passwordError', 'La contraseña debe tener al menos 5 caracteres.');
      valid = false;
    }

    if (valid) {
      // Enviar los datos al backend usando fetch
      fetch('URL_DEL_BACKEND/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dni, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Redirigir a la página del administrador
          window.location.href = 'administrador.html';
        } else {
          showError('loginError', 'DNI o contraseña incorrectos.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showError('loginError', 'Error al iniciar sesión.');
      });
    }
  });

  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
      element.textContent = '';
      element.style.display = 'none';
    });
  }
});





















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