document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  const menuItems = document.querySelectorAll('.menu li');
  const menuLinks = document.querySelectorAll('.menu a');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const toggleMobileMenu = (shouldOpen) => {
    const isOpening = typeof shouldOpen === 'boolean' ? shouldOpen : !hamburger.classList.contains('active');

    hamburger.classList.toggle('active', isOpening);
    menu.classList.toggle('active', isOpening);

    if (isMobile) {
      menuItems.forEach((item, index) => {
        if (isOpening) {
          setTimeout(() => {
            item.style.opacity = '1';
          }, index * 100);
        } else {
          item.style.opacity = '0';
        }
      });
    }
  };

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMobileMenu();
  });

  if (isMobile) {
    menuLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        toggleMobileMenu(false);

        setTimeout(() => {
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        }, 300);
      });
    });

    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (isMobile) return;

      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  function animateOnScroll() {
    const elements = document.querySelectorAll('.servico-card, .contato-info, .whatsapp-cta');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const animationPoint = 150;

      if (elementPosition < windowHeight - animationPoint) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  function initAnimations() {
    const elements = document.querySelectorAll('.servico-card, .contato-info, .whatsapp-cta');
    elements.forEach(element => {
      element.style.transition = 'all 0.5s ease';
    });
    animateOnScroll();
  }

  const contactForm = document.querySelector('.contato-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
      this.reset();
    });
  }

  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', initAnimations);
  setTimeout(animateOnScroll, 300);
});
