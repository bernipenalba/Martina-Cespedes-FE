document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('crearMateriaPrimaForm');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const nombre = document.getElementById('nombre').value.trim();
      const descripcion = document.getElementById('descripcion').value.trim();
      const medida = document.getElementById('medida').value;
      const cantidad = document.getElementById('cantidad').value.trim();
  
      let valid = true;
  
      // Validar nombre
      if (!/^[A-Za-z\s]{3,}$/.test(nombre)) {
        showError('nombreError', 'El nombre debe tener al menos 3 letras y no debe contener números ni caracteres especiales.');
        valid = false;
      } else {
        clearError('nombreError');
      }
  
      // Validar cantidad
      if (!/^\d+$/.test(cantidad)) {
        showError('cantidadError', 'La cantidad debe ser un número.');
        valid = false;
      } else {
        clearError('cantidadError');
      }
  
      if (valid) {
        const materiaPrima = {
          nombre,
          descripcion,
          medida,
          cantidad: parseInt(cantidad, 10)
        };
  
        try {
          // Aquí se enviarán los datos al backend
          const response = await fetch('URL_DEL_BACKEND', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(materiaPrima)
          });
  
          if (response.ok) {
            alert('Materia Prima creada exitosamente');
            window.location.href = 'materias_primas.html';
          } else {
            alert('Error al crear la Materia Prima');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error al crear la Materia Prima');
        }
      }
    });
  
    function showError(elementId, message) {
      const errorElement = document.getElementById(elementId);
      errorElement.textContent = message;
      errorElement.style.color = 'red';
      errorElement.style.fontSize = '12px';
    }
  
    function clearError(elementId) {
      const errorElement = document.getElementById(elementId);
      errorElement.textContent = '';
    }
  });
  