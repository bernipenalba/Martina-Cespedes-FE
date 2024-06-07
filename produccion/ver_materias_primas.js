document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/materias-primas')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('materiasPrimasTable').querySelector('tbody');
        data.forEach(materiaPrima => {
          const row = document.createElement('tr');
  
          Object.values(materiaPrima).forEach(text => {
            const cell = document.createElement('td');
            cell.textContent = text;
            row.appendChild(cell);
          });
  
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error:', error));
  });
  