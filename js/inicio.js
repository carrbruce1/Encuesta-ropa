document.addEventListener('DOMContentLoaded', () => {
  let selectedRating = 0;

  const stars = document.querySelectorAll('.star');
  const ratingText = document.getElementById('rating-text');
  const ratingBar = document.getElementById('rating-bar');
  const commentSection = document.getElementById('comment-section');
  const lowRatingSection = document.getElementById('low-rating-message');

  const submitBtn = document.getElementById('submit-btn');
  const improvementBtn = lowRatingSection ? lowRatingSection.querySelector('button') : null;

  function resetForm() {
    selectedRating = 0;
    stars.forEach((s) => {
      s.classList.remove('text-yellow-400');
      s.classList.add('text-gray-300');
    });

    ratingText.innerText = 'Selecciona tu calificación';
    ratingBar.style.width = '0%';
    ratingBar.classList.add('hidden');

    commentSection.classList.add('hidden');
    if (lowRatingSection) lowRatingSection.classList.add('hidden');

    const commentEl = document.getElementById('comment');
    if (commentEl) commentEl.value = '';

    const improvementEl = document.getElementById('improvement-comment');
    if (improvementEl) improvementEl.value = '';

    const emailEl = document.getElementById('email');
    if (emailEl) emailEl.value = '';
  }

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      selectedRating = index + 1;

      stars.forEach((s, i) => {
        s.classList.toggle('text-yellow-400', i < selectedRating);
        s.classList.toggle('text-gray-300', i >= selectedRating);
      });

      ratingText.innerText = `Tu calificación: ${selectedRating}/5`;
      ratingBar.style.width = `${selectedRating * 20}%`;
      ratingBar.classList.remove('hidden');

      if (selectedRating >= 4) {
        if (commentSection) commentSection.classList.remove('hidden');
        if (lowRatingSection) lowRatingSection.classList.add('hidden');
      } else {
        if (commentSection) commentSection.classList.add('hidden');
        if (lowRatingSection) lowRatingSection.classList.remove('hidden');
      }
    });
  });

  // Función común para enviar feedback
  async function enviarFeedback(payload) {
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data.message || 'Ocurrió un error al enviar tu comentario.');
        return { ok: false, data };
      }

      return { ok: true, data };
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al enviar tu comentario.');
      return { ok: false, data: null };
    }
  }

// Enviar comentario positivo
if (submitBtn) {
  submitBtn.addEventListener('click', async () => {
    const comment = document.getElementById('comment')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';

    if (!selectedRating) {
      alert('Por favor seleccioná una calificación.');
      return;
    }

    const { ok, data } = await enviarFeedback({
      estrellas: selectedRating,
      comentario: comment,
      email: email
    });

    if (ok) {
      alert('¡Gracias por tu comentario!');
      resetForm();
      if (data && data.redirect) window.open(data.redirect, '_blank');
    }
  });
}

// Enviar comentario negativo
if (improvementBtn) {
  improvementBtn.addEventListener('click', async () => {
    const comment = document.getElementById('improvement-comment')?.value.trim() || '';
    const email = document.getElementById('email-low')?.value.trim() || '';

    if (!selectedRating) {
      alert('Por favor seleccioná una calificación.');
      return;
    }

    const { ok } = await enviarFeedback({
      estrellas: selectedRating,
      comentario: comment,
      email: email
    });

    if (ok) {
      alert('Gracias por ayudarnos a mejorar.');
      resetForm();
    }
  });
}


});
