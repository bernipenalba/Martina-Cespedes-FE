document.getElementById('simularProduccionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const cajas = document.getElementById('cajas').value;

    // Redirigir a la página de producción simulada con los parámetros necesarios
    window.location.href = `produccion_simulada.html?tipo=${tipo}&cajas=${cajas}`;
});
