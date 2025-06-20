// Marcar enlace activo
function marcarEnlaceActivo() {
  const currentUrl = window.location.pathname;
  document.querySelectorAll('#menu-principal li a').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref && currentUrl.includes(linkHref)) {
      link.classList.add('active');
    }
  });
}

// Cargar menú
fetch('menu.html')
  .then(response => response.text())
  .then(data => {
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
      menuContainer.innerHTML = data;
      marcarEnlaceActivo();

      const bugCount = document.getElementById("bugCount");
      if (bugCount) {
        bugCount.textContent = Math.floor(Math.random() * 9) + 1;
      }

      const toggleBtn = document.querySelector(".hamburger");
      const menu = document.getElementById("menu-principal");

      if (toggleBtn && menu) {
        // Mostrar/ocultar menú
        toggleBtn.addEventListener("click", () => {
          menu.classList.toggle("visible");
        });

        // Ocultar al hacer scroll hacia abajo
        let lastScrollTop = 0;
        window.addEventListener("scroll", () => {
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
          if (currentScroll > lastScrollTop && menu.classList.contains("visible")) {
            menu.classList.remove("visible");
          }
          lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });

        // Ocultar al hacer clic fuera del menú
        document.addEventListener("click", (e) => {
          const clickedInsideMenu = menu.contains(e.target);
          const clickedToggleBtn = toggleBtn.contains(e.target);
          if (!clickedInsideMenu && !clickedToggleBtn && menu.classList.contains("visible")) {
            menu.classList.remove("visible");
          }
        });
      }
    }
  })
  .catch(error => {
    console.error('Error al cargar el menú:', error);
  });

// Cargar footer
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.body.insertAdjacentHTML('beforeend', data);
  })
  .catch(error => {
    console.error('Error al cargar el footer:', error);
  });

// Inicializar tarjetas si existe la función
setTimeout(() => {
  if (typeof inicializarTarjetas === 'function') {
    inicializarTarjetas();
  }
}, 100);

// Formulario de hobbies (quiz)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quiz-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const preguntas = ["q1", "q2", "q3", "q4", "q5", "q6"];
      let respuestasMarcadas = 0;

      preguntas.forEach(p => {
        const marcada = document.querySelector(`input[name="${p}"]:checked`);
        if (marcada) respuestasMarcadas++;
      });

      if (respuestasMarcadas === 0) {
        alert("¡Porfa, responde al menos una pregunta del test!");
        return;
      }

      // Mostrar todas las tarjetas de hobbies
      const galeria = document.getElementById("tarjetas-hobbies");
      if (galeria) {
        galeria.style.display = "block";
        galeria.querySelectorAll(".gallery-item").forEach(card => {
          card.style.display = "block";
        });

        // Mensaje final
        let box = document.getElementById("resultado-quiz");
        if (!box) {
          box = document.createElement("div");
          box.id = "resultado-quiz";
          box.style.marginTop = "1.5rem";
          box.style.fontWeight = "bold";
          galeria.parentNode.insertBefore(box, galeria);
        }


      }
    });
  }
});

