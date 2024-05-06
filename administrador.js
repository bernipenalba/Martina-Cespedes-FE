/*document.addEventListener('DOMContentLoaded', function() {
    const toggleMenuBtn = document.getElementById('toggleMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const userOptions = document.getElementById('userOptions');
  
    toggleMenuBtn.addEventListener('click', function() {
      sidebar.classList.toggle('show');
    });
  
    userOptions.addEventListener('click', function() {
      // Aquí puedes añadir la lógica para las opciones de usuario, como cerrar sesión
      console.log('Opción de usuario seleccionada');
    });
  });*/
  

  document.addEventListener('DOMContentLoaded', function() {
    const toggleMenuBtn = document.getElementById('toggleMenuBtn');
    const userOptions = document.getElementById('userOptions');
  
    toggleMenuBtn.addEventListener('click', function() {
      userOptions.classList.toggle('show');
    });
  });
  