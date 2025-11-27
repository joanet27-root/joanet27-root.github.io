// Año en el footer
document.getElementById('y').textContent = new Date().getFullYear();

// Carrusel
const images = ["assets/robots1.jpeg", "assets/robots2.jpeg", "assets/robots3.jpeg"];
const img = document.getElementById("carousel-image");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsWrap = document.querySelector(".dots");
let index = 0, timer = null;

images.forEach((_, i) => {
  const d = document.createElement("button");
  d.className = "dot" + (i === 0 ? " active" : "");
  d.type = "button";
  d.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(d);
});

const updateDots = () =>
  ([...dotsWrap.children]).forEach((d, i) => d.classList.toggle("active", i === index));

const goTo = (i) => {
  index = (i + images.length) % images.length;
  img.style.opacity = .25;
  setTimeout(() => {
    img.src = images[index];
    img.style.opacity = 1;
  }, 120);
  updateDots();
  restart();
};

const next = () => goTo(index + 1);
const prev = () => goTo(index - 1);
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

const start = () => { timer = setInterval(next, 5000); };
const stop = () => { if (timer) clearInterval(timer); };
const restart = () => { stop(); start(); };

const carousel = document.querySelector(".carousel");
carousel.addEventListener("mouseenter", stop);
carousel.addEventListener("mouseleave", start);
start();

// Traducciones EN/ES
const translations = {
  en: {
    header_title: `Joan Carrillo — Industrial Computer Engineering & Robotics`,
    header_sub: `Focused on control systems, computer vision and automation. Looking for junior roles in Europe (robotics / controls / software).`,
    chip_cv: `Computer Vision`,
    feat_title: `Featured Projects`,
    feat_text: `A brief selection of projects including code, videos and technical notes. See more on my <a href="https://github.com/joanet27-root" target="_blank" rel="noopener">GitHub</a>.`,
    btn_cv: `Download CV (PDF)`,
    p1_title: `Vision-based Manipulation (ROS2 + OpenCV)`,
    p1_text: `Object detection and pose estimation using OpenCV. Pick & place with ABB arm controlled via ROS2 nodes in Python.`,
    p2_title: `PLC + SCADA for Assembly Cell`,
    p2_text: `Sequential control, interlocks, and HMI. Simulated in Factory I/O with electrical documentation and fault handling.`,
    p3_title: `Mobile Robot Localization (EKF + LiDAR)`,
    p3_text: `Sensor fusion for differential robot using EKF and SLAM Toolbox for mapping and navigation.`,
    repo: `Repository`,
    video: `Video`,
    contact: `Contact`,
    copyright_prefix: `©`,
    built: `Built with GitHub Pages.`,
    tip: `Each repository includes a README file with images, requirements, and usage steps.`
  },
  es: {
    header_title: `Joan Carrillo — Ingeniería Informática Industrial y Robótica`,
    header_sub: `Enfocado en sistemas de control, visión por computador y automatización. Buscando puestos junior en Europa (robótica / control / software).`,
    chip_cv: `Visión por Computador`,
    feat_title: `Proyectos Destacados`,
    feat_text: `Selección de proyectos con código, vídeos y notas técnicas. Mira más en mi <a href="https://github.com/joanet27-root" target="_blank" rel="noopener">GitHub</a>.`,
    btn_cv: `Descargar CV (PDF)`,
    p1_title: `Manipulación basada en Visión (ROS2 + OpenCV)`,
    p1_text: `Detección de objetos y estimación de pose usando OpenCV. Pick & place con brazo ABB controlado mediante nodos ROS2 en Python.`,
    p2_title: `PLC + SCADA para Célula de Montaje`,
    p2_text: `Control secuencial, enclavamientos y HMI. Simulado en Factory I/O con documentación eléctrica y gestión de fallos.`,
    p3_title: `Localización de Robot Móvil (EKF + LiDAR)`,
    p3_text: `Fusión de sensores para robot diferencial usando EKF y SLAM Toolbox para mapeo y navegación.`,
    repo: `Repositorio`,
    video: `Vídeo`,
    contact: `Contacto`,
    copyright_prefix: `©`,
    built: `Desarrollado con GitHub Pages.`,
    tip: `Cada repositorio incluye un README con imágenes, requisitos y pasos de uso.`
  }
};

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  document.querySelectorAll('.lang-switch button[data-lang]').forEach((btn) => {
    const isActive = btn.getAttribute('data-lang') === lang;
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

const langButtons = document.querySelectorAll('.lang-switch button[data-lang]');
langButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    applyLanguage(lang);
  });
});

// Idioma inicial
applyLanguage('en');

// Control del vídeo de fondo con duración fija
const magicBtn = document.getElementById('magic-toggle');
const bgContainer = document.querySelector('.bg-container');
const bgVideo = document.getElementById('bg-video');

let magicTimeout = null;

function stopMagic() {
  if (!bgContainer.classList.contains('is-visible')) return;

  bgContainer.classList.remove('is-visible');
  magicBtn.setAttribute('aria-pressed', 'false');
  magicBtn.textContent = 'Click to Magic';

  if (magicTimeout) {
    clearTimeout(magicTimeout);
    magicTimeout = null;
  }

  bgVideo.pause();
  bgVideo.currentTime = 0;
}

function startMagic() {
  bgContainer.classList.add('is-visible');
  magicBtn.setAttribute('aria-pressed', 'true');
  magicBtn.textContent = 'Magic ON ✨';

  if (magicTimeout) {
    clearTimeout(magicTimeout);
    magicTimeout = null;
  }

  bgVideo.currentTime = 0;
  bgVideo.play().catch(() => {});

  magicTimeout = setTimeout(() => {
    stopMagic();
  }, 18000);
}

if (magicBtn && bgContainer && bgVideo) {
  magicBtn.addEventListener('click', () => {
    if (bgContainer.classList.contains('is-visible')) {
      stopMagic();
    } else {
      startMagic();
    }
  });

  bgVideo.addEventListener('ended', () => {
    stopMagic();
  });
}
