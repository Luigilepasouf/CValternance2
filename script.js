document.addEventListener('DOMContentLoaded', function () {
  // Animation pour les sections avec la classe 'animate-section'
  const sections = document.querySelectorAll('.animate-section');
  const observer = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
              }
          });
      },
      { threshold: 0.1 } // Le seuil détermine quand l'animation se déclenche
  );

  sections.forEach((section) => {
      observer.observe(section);
  });

  // Gestion des sliders pour l'expérience et l'éducation
  const experienceSlider = document.querySelector('.experience-slider');
  const educationSlider = document.querySelector('.education-slider');
  [experienceSlider, educationSlider].forEach((slider) => {
      if (slider) {
          const items = slider.children;
          // Duplique les éléments pour créer un défilement infini
          Array.from(items).forEach((item) => {
              const clone = item.cloneNode(true);
              slider.appendChild(clone);
          });
          // Ajuste la durée de l'animation en fonction du nombre d'éléments
          const totalItems = slider.children.length;
          const animationDuration = totalItems * 5; // 5 secondes par élément
          slider.style.animationDuration = `${animationDuration}s`;
      }
  });

  // Gestion de l'accordéon des compétences
  const skillToggles = document.querySelectorAll('.skill-toggle');
  skillToggles.forEach((toggle) => {
      toggle.addEventListener('click', function () {
          this.classList.toggle('active');
          const content = this.nextElementSibling;
          content.classList.toggle('active');
          if (content.classList.contains('active')) {
              content.style.maxHeight = content.scrollHeight + 'px';
          } else {
              content.style.maxHeight = 0;
          }
          // Ferme les autres compétences ouvertes
          skillToggles.forEach((otherToggle) => {
              if (otherToggle !== this) {
                  otherToggle.classList.remove('active');
                  const otherContent = otherToggle.nextElementSibling;
                  otherContent.classList.remove('active');
                  otherContent.style.maxHeight = 0;
              }
          });
      });
  });

  // Animation du texte de la machine à écrire
  const typewriterText = `Vous considérez l'alternance comme un investissement d'avenir pour votre entreprise. Vous envisagez de recruter un alternant pour le faire monter en compétence comme ingénieur développement fullstack ou ingénieur logiciel pour l'intégrer durablement dans votre équipe. La mission et le projet que vous lui confiez s'inscrivent dans le développement de votre entreprise permettant une montée en compétence progressive grâce à un plan de professionnalisation cohérent avec le programme du Master of science développement cloud et mobile de Supinfo. Alors organisons un échange pour mieux nous connaître et construire une collaboration réussie. Pour préparer notre échange, partagez des informations sur votre projet et votre entreprise grâce au formulaire de contact à suivre.`;
  const typewriterElement = document.getElementById('typewriter-text');
  let i = 0;
  function typeWriter() {
      if (i < typewriterText.length) {
          typewriterElement.innerHTML = typewriterText.substring(0, i + 1) + '<span class="typewriter-cursor"></span>';
          i++;
          setTimeout(typeWriter, 30); // Ajustez cette valeur pour modifier la vitesse de frappe
      } else {
          typewriterElement.innerHTML = typewriterText + '<span class="typewriter-cursor"></span>';
      }
  }
  const typeObserver = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  typeWriter();
                  typeObserver.unobserve(entry.target);
              }
          });
      },
      { threshold: 0.1 }
  );
  typeObserver.observe(document.getElementById('call-to-action'));

  // Gestion du formulaire de contact
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('Formulaire soumis');
      form.reset();
      alert('Merci pour votre message. Nous vous contacterons bientôt.');
  });

  // Gestion des boutons "En savoir plus"
  const buttons = document.querySelectorAll('.details-button');
  buttons.forEach((button) => {
      button.addEventListener('click', function () {
          const detailsId = this.getAttribute('data-details');
          const detailsContent = document.getElementById(detailsId);
          // Basculer la visibilité du contenu
          if (detailsContent.style.display === 'block') {
              detailsContent.style.display = 'none';
          } else {
              detailsContent.style.display = 'block';
          }
      });
  });
});
