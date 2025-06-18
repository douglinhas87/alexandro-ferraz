function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

window.addEventListener('scroll', function() {
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
});

window.addEventListener('load', function() {
  const elements = document.querySelectorAll('.servico-card, .contato-info, .whatsapp-cta');
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
  });
  const event = new Event('scroll');
  window.dispatchEvent(event);
});

const contactForm = document.querySelector('.contato-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
    this.reset();
  });
}
