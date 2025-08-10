// Центрирование при использование кнопок
document.addEventListener('DOMContentLoaded', () => {
  const heroButtons = document.querySelectorAll('.hero__buttons a[href^="#"]');

  heroButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      // Плавная прокрутка к центру элемента
      targetEl.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      // Обновление URL без перезагрузки страницы
      history.replaceState(null, '', targetId);
    });
  });
});