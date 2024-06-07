document.addEventListener('DOMContentLoaded', async function() {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('tipo');
    const cajas = params.get('cajas');

    const resultadoSimulacionElement = document.getElementById('resultadoSimulacion');

    try {
        // Obtener la cantidad disponible de insumos y materias primas desde el backend
        const response = await fetch('/api/getStockDisponible');
        const stockDisponible = await response.json();

        // Lógica para calcular los insumos y materias primas necesarias
        let insumosNecesarios = calcularInsumosNecesarios(tipo, cajas);

        let puedeProducir = true;
        let mensaje = 'Puedes producir la siguiente cantidad de productos:\n';

        for (let insumo of insumosNecesarios) {
            if (stockDisponible[insumo.nombre] < insumo.cantidad) {
                puedeProducir = false;
                mensaje = `No se puede realizar la producción porque falta stock suficiente de ${insumo.nombre}.`;
                break;
            }
        }

        if (puedeProducir) {
            insumosNecesarios.forEach(insumo => {
                mensaje += `${insumo.nombre}: ${insumo.cantidad} unidades\n`;
            });
        }

        resultadoSimulacionElement.textContent = mensaje;

    } catch (error) {
        console.error('Error al obtener el stock disponible:', error);
        resultadoSimulacionElement.textContent = 'Error al obtener el stock disponible. Intente nuevamente más tarde.';
    }


    /*
    document.getElementById('produccionSimuladaForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        
        if (!puedeProducir) {
            alert(mensaje);
            return;
        }

        try {
            // Enviar la solicitud al backend para confirmar la producción y actualizar el stock
            const response = await fetch('/api/confirmarProduccion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tipo, cajas, insumosNecesarios })
            });

            if (response.ok) {
                alert('Producción confirmada y stock actualizado.');
                window.location.href = 'stock.html';
            } else {
                alert('Error al confirmar la producción. Intente nuevamente.');
            }
        } catch (error) {
            console.error('Error al confirmar la producción:', error);
            alert('Error al confirmar la producción. Intente nuevamente.');
        }
        
    });
    */
    function calcularInsumosNecesarios(tipo, cajas) {
        // Lógica para calcular los insumos necesarios según el tipo de producto y el tipo de caja
        // Esta función debe devolver un array de objetos con los insumos necesarios y sus cantidades
        // Ejemplo: [{ nombre: 'Alcohol', cantidad: 10 }, { nombre: 'Botellas', cantidad: 20 }, ...]
        
        // Esto es un ejemplo básico. Debes ajustar según tu lógica de negocio.
        let insumos = [];
        if (tipo === 'gin') {
            if (cajas === 'x4') {
                insumos.push({ nombre: 'Alcohol', cantidad: 4 });
                insumos.push({ nombre: 'Botellas', cantidad: 4 });
                insumos.push({ nombre: 'Cajas', cantidad: 1 });
            } else if (cajas === 'x6') {
                insumos.push({ nombre: 'Alcohol', cantidad: 6 });
                insumos.push({ nombre: 'Botellas', cantidad: 6 });
                insumos.push({ nombre: 'Cajas', cantidad: 1 });
            } else if (cajas === 'botella') {
                insumos.push({ nombre: 'Alcohol', cantidad: 1 });
                insumos.push({ nombre: 'Botellas', cantidad: 1 });
            }
        } else if (tipo === 'vermu') {
            if (cajas === 'x4') {
                insumos.push({ nombre: 'Alcohol', cantidad: 3 });
                insumos.push({ nombre: 'Botellas', cantidad: 4 });
                insumos.push({ nombre: 'Cajas', cantidad: 1 });
            } else if (cajas === 'x6') {
                insumos.push({ nombre: 'Alcohol', cantidad: 5 });
                insumos.push({ nombre: 'Botellas', cantidad: 6 });
                insumos.push({ nombre: 'Cajas', cantidad: 1 });
            } else if (cajas === 'botella') {
                insumos.push({ nombre: 'Alcohol', cantidad: 1 });
                insumos.push({ nombre: 'Botellas', cantidad: 1 });
            }
        }

        return insumos;
    }
});
