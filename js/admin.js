// /js/admin.js
async function cargarComentarios() {
  try {
    // Ruta relativa: funciona tanto local como en deploy (si el backend y frontend están en el mismo host)
    const res = await fetch('/api/admin/comentarios', {
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) {
      throw new Error(`Error al pedir comentarios: ${res.status} ${res.statusText}`);
    }

    const comentarios = await res.json();

    const tbody = document.getElementById('comentarios-body');
    tbody.innerHTML = '';

    if (!comentarios || comentarios.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:20px; color:#666;">
            No hay comentarios todavía.
          </td>
        </tr>
      `;
      return;
    }

    comentarios.forEach(c => {
      const fecha = c.creado_en ? new Date(c.creado_en).toLocaleString() : '-';
      const comentarioText = c.comentario ? escapeHtml(c.comentario) : '-';
      const emailText = c.email ? escapeHtml(c.email) : '-';
      const destacado = c.destacado ? 'Sí' : 'No';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${c.id}</td>
        <td>${c.estrellas}</td>
        <td style="max-width:400px; white-space:pre-wrap;">${comentarioText}</td>
        <td>${emailText}</td>
        <td>${fecha}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteComment(${c.id})">Eliminar</button>
          <button class="btn btn-primary" onclick="highlightComment(${c.id}, this)">${c.destacado ? 'Quitar ⭐' : 'Destacar'}</button>
        </td>
      `;

      if (c.destacado) {
        tr.style.backgroundColor = '#fff7d6';
      }

      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
    const tbody = document.getElementById('comentarios-body');
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding:20px; color:#c00;">
          Error al cargar comentarios. Mirá la consola para más info.
        </td>
      </tr>
    `;
  }
}

async function deleteComment(id) {
  if (!confirm('¿Eliminar este comentario?')) return;

  try {
    const res = await fetch(`/api/admin/comentarios/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('No se pudo eliminar');
    await cargarComentarios();
  } catch (err) {
    alert('Error al eliminar. Mirá consola.');
    console.error(err);
  }
}

async function highlightComment(id, button) {
  try {
    const res = await fetch(`/api/admin/comentarios/${id}/destacar`, { method: 'PATCH' });
    if (!res.ok) throw new Error('No se pudo destacar');
    const json = await res.json();
    button.textContent = json.destacado ? 'Quitar ⭐' : 'Destacar';
    await cargarComentarios();
  } catch (err) {
    alert('Error al destacar. Mirá consola.');
    console.error(err);
  }
}

// pequeña función para escapar HTML y evitar inyección visual
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

document.addEventListener('DOMContentLoaded', cargarComentarios);
