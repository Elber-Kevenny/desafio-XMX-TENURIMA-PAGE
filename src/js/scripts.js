document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.testimonials__track');
  const prevBtn = document.querySelector('.testimonials__nav--prev');
  const nextBtn = document.querySelector('.testimonials__nav--next');

  if (!track || !prevBtn || !nextBtn) return;

  /**
   * Calcula a distância de rolagem por clique (Largura do Card + Gap)
   */
  const getScrollAmount = () => {
    const card = track.querySelector('.testimonials__card');
    if (!card) return 0;

    // Obtém o gap computado no CSS (32px no desktop ou 16px no mobile)
    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.gap) || 32;

    return card.offsetWidth + gap;
  };

  // Clique no botão Avançar
  nextBtn.addEventListener('click', () => {
    const scrollAmount = getScrollAmount();
    // Margem de erro de 5px para evitar problemas com decimais de scroll
    const maxScroll = track.scrollWidth - track.clientWidth - 10;

    if (track.scrollLeft >= maxScroll) {
      // Se chegou no último card, volta para o primeiro
      track.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else {
      track.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  });

  // Clique no botão Voltar
  prevBtn.addEventListener('click', () => {
    const scrollAmount = getScrollAmount();

    if (track.scrollLeft <= 4) {
      // Se está no primeiro card, vai para o último
      track.scrollTo({
        left: track.scrollWidth,
        behavior: 'smooth'
      });
    } else {
      track.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // Seleciona o botão de scroll e a seção alvo
  const scrollBtn = document.querySelector('.hero__scroll-btn');
  const aboutSection = document.querySelector('#about') || document.querySelector('.about');

  if (scrollBtn && aboutSection) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault(); 


      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
});