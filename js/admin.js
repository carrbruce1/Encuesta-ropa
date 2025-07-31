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
        <td>${new Date(c.creado_en).toLocaleString()}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteComment(${c.id})">Eliminar</button>
        </td>
        <td>
          <button class="btn btn-primary" onclick="highlightComment(${c.id}, this)">
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
