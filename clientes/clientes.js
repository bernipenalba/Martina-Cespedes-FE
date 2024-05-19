document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('crearClienteForm');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Evitar el envío del formulario tradicional

    // Limpiar mensajes de error previos
    clearErrors();
  
    // Obtener los valores de los inputs y eliminar espacios en blanco
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const email = document.getElementById('email').value.trim();
    const segmento = document.getElementById('segmento').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const provincia = document.getElementById('provincia').value.trim();
    const localidad = document.getElementById('localidad').value.trim();
    const comentario = document.getElementById('comentario');
  
    
// Validaciones
let valid = true;

if (!/^[A-Za-z\s]{3,}$/.test(nombre)) {
  showError('nombreError', 'El nombre debe tener al menos 3 letras y no debe contener números ni caracteres especiales.');
  valid = false;
}

if (!/^[A-Za-z\s]{3,}$/.test(apellido)) {
  showError('apellidoError', 'El apellido debe tener al menos 3 letras y no debe contener números ni caracteres especiales.');
  valid = false;
}

if (!/^\d{8}$/.test(dni)) {
  showError('dniError', 'El DNI debe ser una cadena de exactamente 8 números.');
  valid = false;
}

if (!/^\d{10}$/.test(telefono)) {
  showError('telefonoError', 'El número de teléfono debe ser una cadena de exactamente 10 números.');
  valid = false;
}

if (valid) {
  // Crear un objeto con los datos del formulario
  const cliente = {
    nombre,
    apellido,
    dni,
    email,
    segmento,
    telefono,
    direccion,
    provincia,
    localidad,
    comentario
  };

  // Enviar los datos al backend usando fetch
  fetch('URL_DEL_BACKEND', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Cliente creado exitosamente');
      form.reset();
    } else {
      alert('Error al crear el cliente');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al crear el cliente');
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