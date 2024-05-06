document.addEventListener('DOMContentLoaded', function() {
    const adminBtn = document.getElementById('admin-btn');
    const salesBtn = document.getElementById('sales-btn');
    const productionBtn = document.getElementById('production-btn');
  
    adminBtn.addEventListener('click', function() {
      // Redirigir a la página del administrador
      window.location.href = '/login/loginAdm.html';
    });
  
    salesBtn.addEventListener('click', function() {
      // Redirigir a la página del encargado de ventas
      window.location.href = '/login/loginVta.html';
    });
  
    productionBtn.addEventListener('click', function() {
      // Redirigir a la página del encargado de producción
      window.location.href = '/login/loginProd.html';
    });
  });
  



