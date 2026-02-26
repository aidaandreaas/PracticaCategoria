document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".custom-dropdown");

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".custom-dropdown-toggle");

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });
  });

  // Cerrar cualquier dropdown si se hace click fuera
  document.addEventListener("click", () => {
    dropdowns.forEach(dropdown => dropdown.classList.remove("open"));
  });
});
