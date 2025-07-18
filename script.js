window.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");

  function setTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    toggle.src = isDark ? "sun.png" : "moon.png";
    localStorage.setItem("darkMode", isDark);
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("darkMode") === "true";
  setTheme(savedTheme);

  // Toggle on click
  toggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");
    setTheme(isDark);
  });

  // ===== CLOCK FIX =====
  const hourHand = document.querySelector('[data-hour-hand]');
  const minuteHand = document.querySelector('[data-minute-hand]');
  const secondHand = document.querySelector('[data-second-hand]');

  function setClock() {
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);
  }

  function setRotation(element, rotationRatio) {
    if (element) {
      element.style.setProperty('--rotation', rotationRatio * 360);
    }
  }

  setClock(); // Run once immediately
  setInterval(setClock, 1000); // Then every second
});
