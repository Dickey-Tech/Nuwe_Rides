const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});
document.getElementById("year").textContent = new Date().getFullYear();


// Hero vehicle slideshow: slow automatic fade, with manual arrows and dots.
const heroSlides = [...document.querySelectorAll(".hero-slide")];
const slideDots = [...document.querySelectorAll(".slide-dot")];
const slideNumber = document.querySelector(".hero-index");
const hero = document.querySelector(".hero");
let activeSlide = 0;
let slideTimer;

function showHeroSlide(index) {
  if (!heroSlides.length) return;
  activeSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, i) => slide.classList.toggle("active", i === activeSlide));
  slideDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === activeSlide);
    dot.setAttribute("aria-pressed", String(i === activeSlide));
  });
  if (slideNumber) {
    slideNumber.innerHTML = `${String(activeSlide + 1).padStart(2, "0")} <span>/</span> ${String(heroSlides.length).padStart(2, "0")}`;
  }
}

function startHeroTimer() {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => showHeroSlide(activeSlide + 1), 5000);
}

document.querySelector(".prev-slide")?.addEventListener("click", () => {
  showHeroSlide(activeSlide - 1);
  startHeroTimer();
});
document.querySelector(".next-slide")?.addEventListener("click", () => {
  showHeroSlide(activeSlide + 1);
  startHeroTimer();
});
slideDots.forEach((dot, i) => dot.addEventListener("click", () => {
  showHeroSlide(i);
  startHeroTimer();
}));
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) startHeroTimer();
