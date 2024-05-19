document.addEventListener("DOMContentLoaded", function () {
  // Obtener el tipo de usuario del almacenamiento local o de donde lo almacenes
  const tipoUsuario = localStorage.getItem("tipoUsuario");

  // Obtener el elemento del menú lateral
  const sidebarMenu = document.getElementById("sidebar-Menu");

  // Definir los elementos del menú según el tipo de usuario
  let menuItems = [];
  switch (tipoUsuario) {
    case "administrador":
      menuItems = [
        {
          nombre: "Clientes",
          url: "/clientes/clientes.html",
        },
        "Producción",
        "Ventas",
        "Stock",
        "Movimientos",
      ];
      break;
    case "ventas":
      menuItems = ["Ventas", "Stock"];
      break;
    case "produccion":
      menuItems = ["Producción", "Stock", "Movimientos"];
      break;
    default:
      menuItems = [];
      break;
  }

  // Generar los elementos del menú
  menuItems.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.url;
    a.textContent = item.nombre;
    li.appendChild(a);
    sidebarMenu.appendChild(li);
  });
});
