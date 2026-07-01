document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".v1-stats-number");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const counter = entry.target;
                const target = +counter.dataset.target;
                const symbol = counter.dataset.symbol || "";

                let current = 0;

                const updateCounter = () => {

                    const increment = target / 120;

                    current += increment;

                    if (current < target) {

                        counter.innerText =
                            Math.ceil(current) + symbol;

                        requestAnimationFrame(updateCounter);

                    } else {

                        counter.innerText =
                            target + symbol;

                    }

                };

                updateCounter();

                observer.unobserve(counter);

            }

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));

});

// active 

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-scroll");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

document.querySelectorAll(".offcanvas .nav-link").forEach(link => {

    link.addEventListener("click", () => {

        const offcanvas =
            bootstrap.Offcanvas.getInstance(
                document.getElementById("mobileMenu")
            );

        if(offcanvas){
            offcanvas.hide();
        }

    });

});