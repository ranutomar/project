const searchInput = document.querySelector("#searchInput");
const cards = document.querySelectorAll(".deal-card");
const darkModeBtn = document.querySelector(".login");
const heroImage = document.querySelector("#heroImage");
const categories = document.querySelectorAll(".cat");
const sections = document.querySelectorAll(".deals, .hero, .categories");
const viewButtons = document.querySelectorAll(".deals-header button");

const images = [
  "https://picsum.photos/seed/banner/1600/500",
  "https://picsum.photos/seed/banner2/1600/500",
  "https://picsum.photos/seed/banner3/1600/500",
  "https://picsum.photos/seed/banner4/1600/500"
];

let index = 0;
let darkMode = false;

searchInput.addEventListener("input", function () {
  const value = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const title = card.querySelector("h4").innerText.toLowerCase();
    card.classList.toggle("hidden", !title.includes(value));
  });
});

darkModeBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode", darkMode);
  darkModeBtn.textContent = darkMode ? "Light Mode" : "Dark Mode";
});

setInterval(() => {
  index = (index + 1) % images.length;
  heroImage.style.opacity = "0.4";

  setTimeout(() => {
    heroImage.src = images[index];
    heroImage.style.opacity = "1";
  }, 350);
}, 3500);

categories.forEach(cat => {
  cat.addEventListener("mouseenter", () => {
    cat.style.transform = "translateY(-8px)";
    cat.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
  });

  cat.addEventListener("mouseleave", () => {
    cat.style.transform = "translateY(0)";
    cat.style.boxShadow = "none";
  });
});

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.03)";
    card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.18)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
    card.style.boxShadow = "none";
  });
});

document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.transform = "scale(0)";
    circle.style.animation = "ripple 600ms linear";
    circle.style.backgroundColor = "rgba(255,255,255,0.7)";

    const oldRipple = button.querySelector(".ripple");
    if (oldRipple) oldRipple.remove();

    circle.classList.add("ripple");
    button.appendChild(circle);
  });
});

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerText = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2500);
}

viewButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    showNotification("Loading More Products...");
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach(section => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  observer.observe(section);
});