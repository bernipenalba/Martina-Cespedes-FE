document.addEventListener('DOMContentLoaded', () => {
    const userId = 1; // Reemplaza con la lógica para obtener el ID del usuario a editar
    const apiUrl = `http://localhost:3000/usuarios/${userId}`;
  
    // Función para obtener los datos del usuario
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('apellido').value = data.apellido;
        document.getElementById('dni').value = data.dni;
        document.getElementById('email').value = data.email;
        document.getElementById('telefono').value = data.telefono;
        document.getElementById('tipoUsuario').value = data.tipoUsuario;
      })
      .catch(error => console.error('Error:', error));
  
    // Función para enviar los datos actualizados del usuario
    document.getElementById('editarUsuarioForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const updatedUser = {
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        dni: document.getElementById('dni').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        tipoUsuario: document.getElementById('tipoUsuario').value.trim()
      };
  
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      })
        .then(response => response.json())
        .then(data => {
          alert('Usuario actualizado exitosamente');
          // Redirigir a otra página si es necesario
          // window.location.href = 'usuarios.html';
        })
        .catch(error => console.error('Error:', error));
    });
  });
  