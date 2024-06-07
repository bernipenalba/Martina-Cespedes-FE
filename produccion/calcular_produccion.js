document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calcularProduccionForm');
    const alcoholInput = document.getElementById('alcohol');
    const alcoholError = document.getElementById('alcoholError');
  
    // Obtener el stock disponible de alcohol del backend
    async function obtenerStockAlcohol() {
      try {
        const response = await fetch('URL_DEL_BACKEND_STOCK_ALCOHOL'); // Reemplaza con la URL correcta
        if (response.ok) {
          const data = await response.json();
          return data.stockAlcohol; // Asegúrate de que el backend devuelva el stock de alcohol en esta propiedad
        } else {
          console.error('Error al obtener el stock de alcohol');
          return null;
        }
      } catch (error) {
        console.error('Error de red:', error);
        return null;
      }
    }
  
    form.addEventListener('submit', async (event) => { // Marcar la función de callback como async
      event.preventDefault();
  
      const alcohol = parseFloat(alcoholInput.value.trim());
      let valid = true;
  
      // Obtener el stock disponible de alcohol
      const stockDisponible = await obtenerStockAlcohol();
      if (stockDisponible === null) {
        alert('No se pudo obtener el stock de alcohol. Inténtalo de nuevo más tarde.');
        return;
      }
  
      // Validar cantidad de alcohol
      if (isNaN(alcohol) || alcohol <= 0) {
        showError('alcoholError', 'La cantidad de alcohol debe ser un número positivo.');
        valid = false;
      } else if (alcohol > stockDisponible) {
        showError('alcoholError', `La cantidad de alcohol no debe exceder el stock disponible de ${stockDisponible} litros.`);
        valid = false;
      } else {
        clearError('alcoholError');
      }
  
      if (valid) {
        // Almacenar datos en localStorage para usarlos en la próxima página
        const data = {
          tipo: document.getElementById('tipo').value,
          alcohol,
          cajas: document.getElementById('cajas').value,
          descripcion: document.getElementById('descripcion').value
        };
        localStorage.setItem('produccionData', JSON.stringify(data));
        window.location.href = 'produccion_calculada.html';
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
  