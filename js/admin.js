// async function cargarComentarios() {
//   try {
//     const res = await fetch('http://localhost:3030/api/admin/comentarios');
//     const comentarios = await res.json();

//     const tbody = document.getElementById('comentarios-body');
//     tbody.innerHTML = '';

//     comentarios.forEach(c => {
//       const tr = document.createElement('tr');

//       tr.innerHTML = `
//         <td>${c.id}</td>
//         <td>${c.estrellas}</td>
//         <td>${c.comentario || '-'}</td>
//         <td>${c.email || '-'}</td> 
//         <td>${new Date(c.creado_en).toLocaleString()}</td>
//         <td>
//           <button 
//             onclick="deleteComment(${c.id})"
//             style="background:linear-gradient(135deg,#ff4b5c,#ff1e40);
//                   color:white;
//                   font-weight:bold;
//                   border:none;
//                   border-radius:8px;
//                   padding:8px 14px;
//                   font-size:14px;
//                   cursor:pointer;
//                   box-shadow:0 3px 8px rgba(255,0,55,0.3);
//                   transition:all 0.25s ease-in-out"
//             onmouseover="this.style.background='linear-gradient(135deg,#e60026,#c4001e)';this.style.transform='scale(1.05)';this.style.boxShadow='0 4px 12px rgba(255,0,55,0.4)';"
//             onmouseout="this.style.background='linear-gradient(135deg,#ff4b5c,#ff1e40)';this.style.transform='scale(1)';this.style.boxShadow='0 3px 8px rgba(255,0,55,0.3)';"
//         >
//             🗑 Eliminar
//         </button>

//         </td>
//         <td>
//           <button 
//             onclick="highlightComment(${c.id}, this)"
//             style="background:linear-gradient(135deg,#4cafef,#2c88d9);
//                   color:white;
//                   font-weight:bold;
//                   border:none;
//                   border-radius:8px;
//                   padding:8px 14px;
//                   font-size:14px;
//                   cursor:pointer;
//                   box-shadow:0 3px 8px rgba(0,140,255,0.3);
//                   transition:all 0.25s ease-in-out"
//             onmouseover="this.style.background='linear-gradient(135deg,#2c88d9,#1a6fb5)';this.style.transform='scale(1.05)';this.style.boxShadow='0 4px 12px rgba(0,140,255,0.4)';"
//             onmouseout="this.style.background='linear-gradient(135deg,#4cafef,#2c88d9)';this.style.transform='scale(1)';this.style.boxShadow='0 3px 8px rgba(0,140,255,0.3)';"
//         >
//             ${c.destacado ? 'Quitar ⭐' : 'Destacar'}
//         </button>
//         </td>
//       `;

//       if (c.destacado) {
//         tr.style.backgroundColor = '#fff7d6';
//       }

//       tbody.appendChild(tr);
//     });
//   } catch (error) {
//     alert('Error al cargar los comentarios.');
//     console.error(error);
//   }
// }

// async function deleteComment(id) {
//   if (confirm('¿Eliminar este comentario?')) {
//     try {
//       await fetch(`http://localhost:3030/api/admin/comentarios/${id}`, {
//         method: 'DELETE'
//       });
//       cargarComentarios();
//     } catch (error) {
//       alert('Error al eliminar.');
//       console.error(error);
//     }
//   }
// }

// async function highlightComment(id, button) {
//   try {
//     const res = await fetch(`http://localhost:3030/api/admin/comentarios/${id}/destacar`, {
//       method: 'PATCH'
//     });
//     const result = await res.json();
//     button.textContent = result.destacado ? 'Quitar' : 'Destacar';
//     cargarComentarios();
//   } catch (error) {
//     alert('Error al destacar.');
//     console.error(error);
//   }
// }

// function filterComments() {
//   const search = document.getElementById('search').value.toLowerCase();
//   const star = document.getElementById('star-filter').value;
//   const rows = document.getElementById('comentarios-body').getElementsByTagName('tr');

//   for (let row of rows) {
//     const comentario = row.cells[2].textContent.toLowerCase();
//     const estrellas = row.cells[1].textContent;

//     const matchesSearch = comentario.includes(search);
//     const matchesStars = star ? estrellas === star : true;

//     row.style.display = matchesSearch && matchesStars ? '' : 'none';
//   }
// }

// document.addEventListener('DOMContentLoaded', cargarComentarios);

// async function cargarComentarios() {
//   try {
//     const res = await fetch('/api/comentarios');
//     const comentarios = await res.json();

//     const tabla = document.getElementById('tabla-comentarios');
//     tabla.innerHTML = '';

//     comentarios.forEach(c => {
//       const fila = document.createElement('tr');
//       fila.innerHTML = `
//         <td>${c.id}</td>
//         <td>${c.estrellas}</td>
//         <td>${c.comentario}</td>
//         <td>${c.email}</td>
//         <td>${new Date(c.creado_en).toLocaleString()}</td>
//       `;
//       tabla.appendChild(fila);
//     });
//   } catch (error) {
//     console.error('Error cargando comentarios:', error);
//   }
// }

// document.addEventListener('DOMContentLoaded', cargarComentarios);


// admin.js - versión robusta
// Recomendación: guardar en /js/admin.js (mismo path que admin.html usa)

// /js/admin.js - versión sin destacado
const API_BASE = '/api/admin';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatFecha(raw) {
  if (!raw) return '-';
  const d = new Date(raw);
  if (isNaN(d)) return String(raw);
  return d.toLocaleString(); // podés ajustar locale/format aquí
}

async function cargarComentarios() {
  try {
    const res = await fetch(`${API_BASE}/comentarios`);
    if (!res.ok) throw new Error('Error cargando comentarios');
    const comentarios = await res.json();

    const tbody = document.getElementById('comentarios-body');
    tbody.innerHTML = '';

    if (!comentarios.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:18px;color:#666">No hay comentarios.</td></tr>`;
      return;
    }

    comentarios.forEach(c => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${c.id}</td>
        <td>${c.estrellas}</td>
        <td style="white-space:pre-wrap;">${escapeHtml(c.comentario || '-')}</td>
        <td>${escapeHtml(c.email || '-')}</td>
        <td>${formatFecha(c.creado_en)}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteComment(${c.id})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    document.getElementById('comentarios-body').innerHTML =
      `<tr><td colspan="6" style="text-align:center;padding:18px;color:#c00">Error al cargar comentarios</td></tr>`;
  }
}

async function deleteComment(id) {
  if (!confirm('¿Eliminar este comentario?')) return;
  try {
    const res = await fetch(`${API_BASE}/comentarios/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('No se eliminó');
    await cargarComentarios();
  } catch (err) {
    console.error(err);
    alert('Error al eliminar el comentario.');
  }
}

// Filtros: buscador y filtro por estrellas (cliente)
function aplicarFiltros() {
  const q = (document.getElementById('search')?.value || '').toLowerCase().trim();
  const star = (document.getElementById('star-filter')?.value || '').trim();
  const rows = Array.from(document.getElementById('comentarios-body').rows);

  rows.forEach(row => {
    const texto = (row.cells[2].textContent + ' ' + row.cells[3].textContent).toLowerCase();
    const estrellas = row.cells[1].textContent.trim();
    const matchText = !q || texto.includes(q);
    const matchStar = !star || estrellas === star;
    row.style.display = (matchText && matchStar) ? '' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  cargarComentarios();
  const search = document.getElementById('search');
  const star = document.getElementById('star-filter');
  if (search) search.addEventListener('input', aplicarFiltros);
  if (star) star.addEventListener('change', aplicarFiltros);
});
