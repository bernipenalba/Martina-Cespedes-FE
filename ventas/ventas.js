document.addEventListener('DOMContentLoaded', () => {
    const fechaActual = new Date().toLocaleDateString();
    document.getElementById('fechaActual').textContent = `Fecha: ${fechaActual}`;
  
    // Simular la obtención de datos del cliente y productos del backend
    /*const clientes = [
      { id: 1, nombre: 'Cliente 1' },
      { id: 2, nombre: 'Cliente 2' },
      // Añadir más clientes según sea necesario
    ];
  
    const productos = [
      { id: 1, nombre: 'Producto 1', precio: 10.0 },
      { id: 2, nombre: 'Producto 2', precio: 20.0 },
      // Añadir más productos según sea necesario
    ];
  */
    const clienteSelect = document.getElementById('cliente');
    const productoSelect = document.getElementById('producto');
    const productosTableBody = document.querySelector('#productosTable tbody');
    const montoTotalElement = document.getElementById('montoTotal');
    let productosSeleccionados = [];
  
    // Obtener clientes del backend
  fetch('/api/clientes')
  .then(response => response.json())
  .then(clientes => {
    clientes.forEach(cliente => {
      const option = document.createElement('option');
      option.value = cliente.id;
      option.textContent = cliente.nombre;
      clienteSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Error al obtener los clientes:', error));

  
  // Obtener productos del backend
  fetch('/api/productos')
    .then(response => response.json())
    .then(productos => {
      productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = producto.nombre;
        productoSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error al obtener los productos:', error));
  
    document.getElementById('agregarProductoBtn').addEventListener('click', () => {
      const productoId = parseInt(productoSelect.value);
      if (!productoId) return;
    
    // Obtener detalles del producto seleccionado
    fetch(`/api/productos/${productoId}`)
      .then(response => response.json())
      .then(producto => {
        const cantidad = 1;
       
        const productoExistente = productosSeleccionados.find(p => p.id === productoId);
        if (productoExistente) {
          productoExistente.cantidad += cantidad;
        } else {
          productosSeleccionados.push({ ...producto, cantidad });
        }
  
      actualizarTabla();
      });


    function actualizarTabla() {
      productosTableBody.innerHTML = '';
  
      let montoTotal = 0;
  
      productosSeleccionados.forEach(producto => {
        const tr = document.createElement('tr');
  
        const tdNombre = document.createElement('td');
        tdNombre.textContent = producto.nombre;
  
        const tdCantidad = document.createElement('td');
        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.value = producto.cantidad;
        inputCantidad.min = 1;
        inputCantidad.addEventListener('change', (e) => {
          producto.cantidad = parseInt(e.target.value);
          actualizarTabla();
        });
        tdCantidad.appendChild(inputCantidad);
  
        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = `$${producto.precio.toFixed(2)}`;
  
        const tdSubtotal = document.createElement('td');
        const subtotal = producto.precio * producto.cantidad;
        tdSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  
        const tdAcciones = document.createElement('td');
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
          productosSeleccionados = productosSeleccionados.filter(p => p.id !== producto.id);
          actualizarTabla();
        });
        tdAcciones.appendChild(btnEliminar);
  
        tr.appendChild(tdNombre);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdSubtotal);
        tr.appendChild(tdAcciones);
  
        productosTableBody.appendChild(tr);
  
        montoTotal += subtotal;
      });
  
      montoTotalElement.textContent = `Total: $${montoTotal.toFixed(2)}`;
    }
  
    document.getElementById('confirmarVentaBtn').addEventListener('click', () => {
      const clienteId = clienteSelect.value;
      if (!clienteId) {
        alert('Seleccione un cliente');
        return;
      }
  
      if (productosSeleccionados.length === 0) {
        alert('Agregue al menos un producto');
        return;
      }
  
      const venta = {
        clienteId,
        productos: productosSeleccionados,
        total: productosSeleccionados.reduce((sum, p) => sum + p.precio * p.cantidad, 0)
      };
  
      // Enviar los datos de la venta al backend
    fetch('/api/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(venta)
    })
    .then(response => {
      if (response.ok) {
        alert('Venta registrada exitosamente');
        location.reload(); // Reiniciar la página después de registrar la venta
      } else {
        alert('Error al registrar la venta');
      }
    })
    .catch(error => console.error('Error al registrar la venta:', error));
  });

  document.getElementById('cancelarVentaBtn').addEventListener('click', () => {
    location.reload(); // Reiniciar la página para cancelar la venta
  });
});
})