document.addEventListener('DOMContentLoaded', async () => {
    const produccionData = JSON.parse(localStorage.getItem('produccionData'));
  
    if (!produccionData) {
      alert('No hay datos de producción disponibles. Redirigiendo...');
      window.location.href = 'calcular_produccion.html';
      return;
    }
  
    const tipoProduccion = produccionData.tipo;
    const alcoholNecesario = produccionData.alcohol;
    const tipoCajas = produccionData.cajas;
    const descripcion = produccionData.descripcion;
  
    document.getElementById('tipoProduccion').textContent = `Tipo de Producción: ${tipoProduccion}`;
    document.getElementById('alcoholNecesario').textContent = `Alcohol Necesario: ${alcoholNecesario} litros`;
    document.getElementById('tipoCajas').textContent = `Tipo de Cajas: ${tipoCajas}`;
    document.getElementById('descripcion').textContent = `Descripción: ${descripcion}`;
  
    // Aquí deberías obtener las cantidades necesarias de cada insumo del backend
    let insumosNecesarios;
    try {
      const response = await fetch('URL_DEL_BACKEND_OBTENER_INSUMOS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tipo: tipoProduccion, alcohol: alcoholNecesario, cajas: tipoCajas })
      });
      
      if (response.ok) {
        insumosNecesarios = await response.json();
      } else {
        alert('Error al obtener los insumos necesarios. Inténtalo de nuevo.');
        window.location.href = 'calcular_produccion.html';
        return;
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red al intentar obtener los insumos necesarios. Inténtalo de nuevo.');
      window.location.href = 'calcular_produccion.html';
      return;
    }
  
    // Mostrar la cantidad de cajas que se pueden producir
    const cajasProducidas = Math.floor(alcoholNecesario / insumosNecesarios.alcoholPorCaja);
    document.getElementById('cajasProducidas').textContent = `Cajas Producidas: ${cajasProducidas}`;
  
    document.getElementById('confirmarProduccionBtn').addEventListener('click', async () => {
      // Validar disponibilidad de insumos/materias primas
      try {
        const response = await fetch('URL_DEL_BACKEND_VERIFICAR_STOCK', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ insumos: insumosNecesarios })
        });
  
        if (response.ok) {
          const result = await response.json();
          if (result.exito) {
            // Realizar la producción
            const responseProduccion = await fetch('URL_DEL_BACKEND_EJECUTAR_PRODUCCION', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ insumos: insumosNecesarios })
            });
  
            if (responseProduccion.ok) {
              alert('Producción confirmada y ejecutada con éxito.');
              window.location.href = 'produccion.html'; // Redirigir a la página de producción o a otra página de confirmación
            } else {
              alert('Error al ejecutar la producción. Inténtalo de nuevo.');
            }
          } else {
            alert(`No se puede ejecutar la producción: ${result.mensaje}`);
          }
        } else {
          alert('Error al verificar el stock. Inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error de red:', error);
        alert('Error de red al intentar verificar el stock. Inténtalo de nuevo.');
      }
    });
  
    document.getElementById('cancelarProduccionBtn').addEventListener('click', () => {
      window.location.href = 'produccion.html'; // Redirigir a la página de producción o a la página anterior
    });
  });
  