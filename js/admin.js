async function cargarComentarios() {
  try {
    const res = await fetch('http://localhost:3030/api/admin/comentarios');
    const comentarios = await res.json();

    const tbody = document.getElementById('comentarios-body');
    tbody.innerHTML = '';

    comentarios.forEach(c => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${c.id}</td>
        <td>${c.estrellas}</td>
        <td>${c.comentario || '-'}</td>
        <td>${c.email || '-'}</td> 
        <td>${new Date(c.creado_en).toLocaleString()}</td>
        <td>
          <button 
            onclick="deleteComment(${c.id})"
            style="background:linear-gradient(135deg,#ff4b5c,#ff1e40);
                  color:white;
                  font-weight:bold;
                  border:none;
                  border-radius:8px;
                  padding:8px 14px;
                  font-size:14px;
                  cursor:pointer;
                  box-shadow:0 3px 8px rgba(255,0,55,0.3);
                  transition:all 0.25s ease-in-out"
            onmouseover="this.style.background='linear-gradient(135deg,#e60026,#c4001e)';this.style.transform='scale(1.05)';this.style.boxShadow='0 4px 12px rgba(255,0,55,0.4)';"
            onmouseout="this.style.background='linear-gradient(135deg,#ff4b5c,#ff1e40)';this.style.transform='scale(1)';this.style.boxShadow='0 3px 8px rgba(255,0,55,0.3)';"
        >
            🗑 Eliminar
        </button>

        </td>
        <td>
          <button 
            onclick="highlightComment(${c.id}, this)"
            style="background:linear-gradient(135deg,#4cafef,#2c88d9);
                  color:white;
                  font-weight:bold;
                  border:none;
                  border-radius:8px;
                  padding:8px 14px;
                  font-size:14px;
                  cursor:pointer;
                  box-shadow:0 3px 8px rgba(0,140,255,0.3);
                  transition:all 0.25s ease-in-out"
            onmouseover="this.style.background='linear-gradient(135deg,#2c88d9,#1a6fb5)';this.style.transform='scale(1.05)';this.style.boxShadow='0 4px 12px rgba(0,140,255,0.4)';"
            onmouseout="this.style.background='linear-gradient(135deg,#4cafef,#2c88d9)';this.style.transform='scale(1)';this.style.boxShadow='0 3px 8px rgba(0,140,255,0.3)';"
        >
            ${c.destacado ? 'Quitar ⭐' : 'Destacar'}
        </button>
        </td>
      `;

      if (c.destacado) {
        tr.style.backgroundColor = '#fff7d6';
      }

      tbody.appendChild(tr);
    });
  } catch (error) {
    alert('Error al cargar los comentarios.');
    console.error(error);
  }
}

async function deleteComment(id) {
  if (confirm('¿Eliminar este comentario?')) {
    try {
      await fetch(`http://localhost:3030/api/admin/comentarios/${id}`, {
        method: 'DELETE'
      });
      cargarComentarios();
    } catch (error) {
      alert('Error al eliminar.');
      console.error(error);
    }
  }
}

// // async function hideComment(id) {
// //   try {
// //     await fetch(`http://localhost:3030/api/admin/comentarios/${id}/ocultar`, {
// //       method: 'PATCH'
// //     });
// //     alert('Comentario ocultado.');
// //     cargarComentarios();
// //   } catch (error) {
// //     alert('Error al ocultar.');
// //     console.error(error);
// //   }
// }

async function highlightComment(id, button) {
  try {
    const res = await fetch(`http://localhost:3030/api/admin/comentarios/${id}/destacar`, {
      method: 'PATCH'
    });
    const result = await res.json();
    button.textContent = result.destacado ? 'Quitar' : 'Destacar';
    cargarComentarios();
  } catch (error) {
    alert('Error al destacar.');
    console.error(error);
  }
}

function filterComments() {
  const search = document.getElementById('search').value.toLowerCase();
  const star = document.getElementById('star-filter').value;
  const rows = document.getElementById('comentarios-body').getElementsByTagName('tr');

  for (let row of rows) {
    const comentario = row.cells[2].textContent.toLowerCase();
    const estrellas = row.cells[1].textContent;

    const matchesSearch = comentario.includes(search);
    const matchesStars = star ? estrellas === star : true;

    row.style.display = matchesSearch && matchesStars ? '' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', cargarComentarios);

async function cargarComentarios() {
  try {
    const res = await fetch('/api/comentarios');
    const comentarios = await res.json();

    const tabla = document.getElementById('tabla-comentarios');
    tabla.innerHTML = '';

    comentarios.forEach(c => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${c.id}</td>
        <td>${c.estrellas}</td>
        <td>${c.comentario}</td>
        <td>${c.email}</td>
        <td>${new Date(c.creado_en).toLocaleString()}</td>
      `;
      tabla.appendChild(fila);
    });
  } catch (error) {
    console.error('Error cargando comentarios:', error);
  }
}

document.addEventListener('DOMContentLoaded', cargarComentarios);
