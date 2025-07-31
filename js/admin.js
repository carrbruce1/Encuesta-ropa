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
        <td>${c.comentario ? c.comentario : '-'}</td>
        <td>${new Date(c.creado_en).toLocaleString()}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    alert('Error al cargar los comentarios.');
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', cargarComentarios);
