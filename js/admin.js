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

const API_BASE = '/api/admin'; // ruta base para las requests

// debounce simple
function debounce(fn, wait = 250) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

// Mensajes temporales (toast simple)
function showToast(msg, type = 'info', timeout = 2500) {
  let box = document.getElementById('__toast_box');
  if (!box) {
    box = document.createElement('div');
    box.id = '__toast_box';
    box.style.position = 'fixed';
    box.style.right = '20px';
    box.style.bottom = '20px';
    box.style.zIndex = 9999;
    document.body.appendChild(box);
  }
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.padding = '10px 14px';
  el.style.marginTop = '8px';
  el.style.borderRadius = '8px';
  el.style.boxShadow = '0 6px 18px rgba(0,0,0,0.08)';
  el.style.color = '#fff';
  el.style.fontWeight = '600';
  el.style.minWidth = '140px';
  if (type === 'error') el.style.background = '#ef4444';
  else if (type === 'success') el.style.background = '#10b981';
  else el.style.background = '#374151';
  box.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'all .25s ease';
    el.style.opacity = 0;
    el.style.transform = 'translateX(20px)';
    setTimeout(() => el.remove(), 300);
  }, timeout);
}

// Escapa HTML básico
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Devuelve string fecha legible, soporta distintos nombres de campo
function formatFecha(row) {
  const raw = row.creado_en ?? row.creado_at ?? row.created_at ?? row.creado ?? null;
  if (!raw) return '-';
  // si viene ya como string ISO o timestamp
  try {
    const d = new Date(raw);
    if (isNaN(d)) return String(raw);
    return d.toLocaleString();
  } catch {
    return String(raw);
  }
}

let comentariosCache = []; // cache para filtrar sin volver a pedir al backend

// Carga y pinta la tabla
async function cargarComentarios() {
  try {
    const res = await fetch(`${API_BASE}/comentarios`, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`Error ${res.status} ${res.statusText} ${txt}`);
    }
    const datos = await res.json();
    if (!Array.isArray(datos)) {
      throw new Error('Respuesta inválida del servidor');
    }
    comentariosCache = datos;
    pintarComentarios(datos);
  } catch (err) {
    console.error('Error cargarComentarios:', err);
    showToast('Error al cargar comentarios (revisá logs).', 'error', 4000);
    const tbody = document.getElementById('comentarios-body');
    if (tbody) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:18px;color:#c00">No se pudieron cargar los comentarios</td></tr>`;
    }
  }
}

// Pinta filas en base pasada (array)
function pintarComentarios(lista) {
  const tbody = document.getElementById('comentarios-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!lista.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:18px;color:#666">No hay comentarios.</td></tr>`;
    return;
  }

  lista.forEach(c => {
    const fecha = formatFecha(c);
    const comentarioText = c.comentario ? escapeHtml(c.comentario) : '-';
    const emailText = c.email ? escapeHtml(c.email) : '-';
    const destacado = c.destacado ? true : false;

    const tr = document.createElement('tr');
    if (destacado) tr.style.backgroundColor = '#fff7d6';

    tr.innerHTML = `
      <td style="width:60px; font-weight:600;">${c.id}</td>
      <td style="width:90px;">${c.estrellas}</td>
      <td style="max-width:480px; white-space:pre-wrap;">${comentarioText}</td>
      <td style="width:200px">${emailText}</td>
      <td style="width:180px">${fecha}</td>
      <td style="width:200px; display:flex; gap:8px;">
        <button class="btn btn-danger" data-id="${c.id}" aria-label="Eliminar">Eliminar</button>
        <button class="btn btn-primary" data-id="${c.id}" data-dest="${destacado ? 1 : 0}" aria-label="Destacar">
          ${destacado ? 'Quitar ⭐' : 'Destacar'}
        </button>
      </td>
    `;

    // Delego eventos a los botones para evitar problemas con innerHTML en cada render
    tbody.appendChild(tr);
  });

  // Asignar listeners a botones (después de pintar)
  tbody.querySelectorAll('button.btn-danger').forEach(btn => {
    btn.removeEventListener('click', onClickEliminar);
    btn.addEventListener('click', onClickEliminar);
  });
  tbody.querySelectorAll('button.btn-primary').forEach(btn => {
    btn.removeEventListener('click', onClickDestacar);
    btn.addEventListener('click', onClickDestacar);
  });
}

// Handler eliminar
async function onClickEliminar(e) {
  const id = e.currentTarget.dataset.id;
  if (!id) return;
  if (!confirm('¿Seguro querés eliminar este comentario?')) return;
  try {
    const res = await fetch(`${API_BASE}/comentarios/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`Error al eliminar: ${res.status} ${txt}`);
    }
    showToast('Comentario eliminado', 'success', 1600);
    await cargarComentarios();
  } catch (err) {
    console.error('Eliminar error:', err);
    showToast('Error al eliminar', 'error', 3000);
  }
}

// Handler destacar (toggle)
async function onClickDestacar(e) {
  const btn = e.currentTarget;
  const id = btn.dataset.id;
  if (!id) return;
  try {
    btn.disabled = true;
    const res = await fetch(`${API_BASE}/comentarios/${id}/destacar`, { method: 'PATCH' });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`Error destacar: ${res.status} ${txt}`);
    }
    const json = await res.json().catch(() => ({}));
    const isDest = json.destacado === true || json.destacado === 1;
    showToast(isDest ? 'Comentario destacado' : 'Se quitó destacado', 'success', 1400);
    await cargarComentarios();
  } catch (err) {
    console.error('Destacar error:', err);
    showToast('Error al destacar', 'error', 3000);
  } finally {
    btn.disabled = false;
  }
}

// Filtrado cliente (buscador + estrellas)
function aplicarFiltros() {
  const q = (document.getElementById('search')?.value || '').trim().toLowerCase();
  const star = (document.getElementById('star-filter')?.value || '').trim();

  const filtrado = comentariosCache.filter(c => {
    const texto = ((c.comentario || '') + ' ' + (c.email || '')).toLowerCase();
    const matchText = !q || texto.includes(q);
    const matchStar = !star || String(c.estrellas) === String(star);
    return matchText && matchStar;
  });

  pintarComentarios(filtrado);
}

// Bind de filtros con debounce
function setupFiltros() {
  const search = document.getElementById('search');
  const star = document.getElementById('star-filter');
  if (search) search.addEventListener('input', debounce(aplicarFiltros, 200));
  if (star) star.addEventListener('change', aplicarFiltros);
  // también opción de botón "Filtrar" si existe
  const filterBtn = document.querySelector('.controls button');
  if (filterBtn) filterBtn.addEventListener('click', aplicarFiltros);
}

document.addEventListener('DOMContentLoaded', () => {
  setupFiltros();
  cargarComentarios();
});
