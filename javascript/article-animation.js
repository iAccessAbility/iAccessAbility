document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('a[href^="#"]');

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

                target.classList.add("highlighted");
                setTimeout(() => {
                    target.classList.remove("highlighted");
                }, 3000);
            }
        });
    });
});
