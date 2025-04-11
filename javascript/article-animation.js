document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  // Handle incoming links with hash on page load
  window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          // Scroll into center
          target.scrollIntoView({ behavior: "smooth", block: "center" });

          // Highlight effect
          target.classList.add("highlighted");
          setTimeout(() => {
            target.classList.remove("highlighted");
          }, 3000);
        }
      }, 300); // Delay to ensure page is ready
    }
  });

  // Handle same-page anchor clicks
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const headerOffset = window.innerHeight / 2 - target.offsetHeight / 2;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        // Highlight effect
        target.classList.add("highlighted");
        setTimeout(() => {
          target.classList.remove("highlighted");
        }, 3000);
      }
    });
  });
});
