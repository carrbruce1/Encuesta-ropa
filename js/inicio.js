document.addEventListener('DOMContentLoaded', () => {
  let selectedRating = 0;

  const stars = document.querySelectorAll('.star');
  const ratingText = document.getElementById('rating-text');
  const ratingBar = document.getElementById('rating-bar');
  const commentSection = document.getElementById('comment-section');
  const lowRatingSection = document.getElementById('low-rating-message');

  const submitBtn = document.getElementById('submit-btn');
  const improvementBtn = lowRatingSection.querySelector('button');

  function resetForm() {
    // Reset estrellas
    selectedRating = 0;
    stars.forEach((s) => {
      s.classList.remove('text-yellow-400');
      s.classList.add('text-gray-300');
    });

    // Reset texto y barra
    ratingText.innerText = '';
    ratingBar.style.width = '0';
    ratingBar.classList.add('hidden');

    // Ocultar secciones
    commentSection.classList.add('hidden');
    lowRatingSection.classList.add('hidden');

    // Limpiar inputs
    document.getElementById('comment').value = '';
    document.getElementById('improvement-comment').value = '';
  }

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      selectedRating = index + 1;

      // Visually fill in stars
      stars.forEach((s, i) => {
        s.classList.toggle('text-yellow-400', i < selectedRating);
        s.classList.toggle('text-gray-300', i >= selectedRating);
      });

      // Rating bar + text
      ratingText.innerText = `Tu calificación: ${selectedRating} estrella${selectedRating > 1 ? 's' : ''}`;
      ratingBar.style.width = `${selectedRating * 20}%`;
      ratingBar.classList.remove('hidden');

      // Mostrar secciones según estrellas
      if (selectedRating >= 4) {
        commentSection.classList.remove('hidden');
        lowRatingSection.classList.add('hidden');
      } else {
        commentSection.classList.add('hidden');
        lowRatingSection.classList.remove('hidden');
      }
    });
  });

  // Enviar comentario positivo
  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
      const comment = document.getElementById('comment').value.trim();

      try {
        const res = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            estrellas: selectedRating,
            comentario: comment,
          }),
        });

        const data = await res.json();

        alert('¡Gracias por tu comentario!');
        resetForm(); // ✅ Limpiar todo

        if (res.ok && data.redirect) {
          window.open(data.redirect, '_blank');
        }

      } catch (err) {
        alert('Ocurrió un error al enviar tu comentario.');
      }
    });
  }

  // Enviar comentario negativo
  if (improvementBtn) {
    improvementBtn.addEventListener('click', async () => {
      const comment = document.getElementById('improvement-comment').value.trim();

      try {
        const res = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            estrellas: selectedRating,
            comentario: comment,
          }),
        });

        if (res.ok) {
          alert('Gracias por ayudarnos a mejorar.');
          resetForm(); // ✅ Limpiar también
        } else {
          alert('Hubo un problema al guardar tu comentario.');
        }
      } catch (err) {
        alert('Error al enviar comentario.');
      }
    });
  }
});
