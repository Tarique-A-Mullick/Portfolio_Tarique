// ===============================
// PORTFOLIO SCRIPT
// ===============================

// Highlight active navigation link while scrolling

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
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

// ===============================
// Reveal animation while scrolling
// ===============================

const revealElements = document.querySelectorAll(".about, .skills, .projects, .contact");

function revealOnScroll() {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;
        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {
            element.classList.add("show");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ===============================
// Hero button click effect
// ===============================

const heroButton = document.querySelector(".btn");

if (heroButton) {

    heroButton.addEventListener("click", () => {

        console.log("Explore button clicked!");

    });

}

// ===============================
// Footer Year
// ===============================

const footer = document.querySelector("footer");

if (footer) {

    footer.innerHTML =
    `© ${new Date().getFullYear()} Ramij | All Rights Reserved`;

}