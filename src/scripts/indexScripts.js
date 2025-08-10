// Логика для смартфонов и планшетов
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    // Обработка меню
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';

        // Сбрасываем активное состояние при открытии меню
        if (!isExpanded) {
            navLinks.forEach(item => item.classList.remove('active'));
        }
    });

    // Обработка кликов по ссылкам
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Убираем активный класс со всех ссылок
            navLinks.forEach(item => item.classList.remove('active'));

            // Добавляем активный класс к текущей ссылке
            this.classList.add('active');

            // Закрываем меню на мобильных
            if (window.innerWidth <= 768) {
                menuToggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Снимаем активное состояние при клике вне меню
    document.addEventListener('click', (e) => {
        const isNavClick = e.target.closest('nav') || e.target.closest('.menu-toggle');

        if (!isNavClick) {
            navLinks.forEach(item => item.classList.remove('active'));

            if (nav.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Автоматическая активация текущего раздела при скролле
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;

        // Убираем активное состояние у всех
        navLinks.forEach(link => link.classList.remove('active'));

        // Активируем соответствующий раздел
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });

    // Инициализация при загрузке
    window.dispatchEvent(new Event('scroll'));
});


// Трансформация header при скроллинге
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
    const header = document.getElementById('site-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// Центрирование при использование списка
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('header nav a[href^="#"]');
  const header = document.querySelector('header');
  const headerHeight = header.offsetHeight;

  // Плавный скролл при клике на пункт меню
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      if (targetId === 'media' || targetId === 'portfolio') {
        const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: topPos - headerHeight,
          behavior: 'smooth'
        });
      } else {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }

      history.pushState(null, '', `#${targetId}`);
    });
  });

  // Scroll-spy с использованием IntersectionObserver
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').slice(1);
    return document.getElementById(id);
  }).filter(Boolean); // убрать null

  const observerOptions = {
    root: null,
    rootMargin: `-${headerHeight}px 0px -50% 0px`,
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
