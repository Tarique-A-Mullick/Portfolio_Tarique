/* =========================================================
   RAMIJ PORTFOLIO
   Main JavaScript
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-xmark"></i>'
            : '<i class="fas fa-bars"></i>';

    });


    /* Close menu when a link is clicked */

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fas fa-bars"></i>';

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fas fa-bars"></i>';

        }

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks =
    document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealSections =
    document.querySelectorAll(".section");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.08
        }
    );


revealSections.forEach(section => {

    revealObserver.observe(section);

});


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");

const submitButton =
    document.getElementById("submitButton");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            /* Check that Formspree ID has been replaced */

            if (
                contactForm.action.includes(
                    "YOUR_FORMSPREE_ID"
                )
            ) {

                showFormStatus(
                    "error",
                    "Please configure the Formspree form endpoint first."
                );

                return;

            }


            const originalButtonHTML =
                submitButton.innerHTML;


            submitButton.disabled = true;

            submitButton.innerHTML = `
                <span>Sending...</span>
                <i class="fas fa-spinner fa-spin"></i>
            `;


            try {

                const formData =
                    new FormData(contactForm);


                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    showFormStatus(
                        "success",
                        "Message sent successfully! Thank you for reaching out."
                    );


                    contactForm.reset();

                } else {

                    const data =
                        await response.json();

                    let message =
                        "Something went wrong. Please try again.";

                    if (
                        data &&
                        data.errors
                    ) {

                        message =
                            data.errors
                                .map(error => error.message)
                                .join(", ");

                    }

                    showFormStatus(
                        "error",
                        message
                    );

                }

            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );

                showFormStatus(
                    "error",
                    "Unable to send the message. Please try again later."
                );

            }


            submitButton.disabled = false;

            submitButton.innerHTML =
                originalButtonHTML;

        }
    );

}


/* =========================================================
   FORM STATUS
========================================================= */

function showFormStatus(type, message) {

    if (!formStatus) return;

    formStatus.className =
        `form-status ${type}`;

    formStatus.textContent =
        message;

}


/* =========================================================
   FOOTER YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}
