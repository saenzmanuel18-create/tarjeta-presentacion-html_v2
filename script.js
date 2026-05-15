document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = document.querySelectorAll(".profile-card, .availability-panel, .panel");
    const animatedItems = document.querySelectorAll(".tag, .project-card, .cert-card, .contact-link");
    const tiltCard = document.querySelector("[data-tilt-card]");
    const typedText = document.getElementById("typedText");
    const certCarousel = document.querySelector("[data-cert-carousel]");
    const prevCert = document.querySelector("[data-cert-prev]");
    const nextCert = document.querySelector("[data-cert-next]");
    const copyEmail = document.querySelector("[data-copy-email]");
    const copyStatus = document.getElementById("copyStatus");

    if (!reduceMotion) {
        sections.forEach((section, index) => {
            section.style.opacity = "0";
            section.style.transform = "translateY(14px) scale(0.985)";
            section.style.transition = "opacity 0.55s ease, transform 0.55s ease";

            window.setTimeout(() => {
                section.style.opacity = "1";
                section.style.transform = "translateY(0) scale(1)";
            }, 80 * index);
        });

        animatedItems.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(8px)";
            item.style.transition = "opacity 0.35s ease, transform 0.35s ease";

            window.setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }, 260 + 28 * index);
        });
    }

    if (tiltCard && !reduceMotion) {
        tiltCard.addEventListener("mousemove", (event) => {
            const rect = tiltCard.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateX = ((y / rect.height) - 0.5) * -5;
            const rotateY = ((x / rect.width) - 0.5) * 5;

            tiltCard.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
            tiltCard.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
            tiltCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        tiltCard.addEventListener("mouseleave", () => {
            tiltCard.style.transform = "";
            tiltCard.style.setProperty("--mouse-x", "50%");
            tiltCard.style.setProperty("--mouse-y", "50%");
        });
    }

    if (typedText && !reduceMotion) {
        const phrases = [
            "creando interfaces web claras",
            "automatizando procesos con n8n",
            "integrando Firebase y Apps Script",
            "listo para oportunidades junior"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const typeLoop = () => {
            const currentPhrase = phrases[phraseIndex];
            typedText.textContent = currentPhrase.slice(0, charIndex);

            if (!deleting && charIndex < currentPhrase.length) {
                charIndex += 1;
                window.setTimeout(typeLoop, 58);
                return;
            }

            if (!deleting && charIndex === currentPhrase.length) {
                deleting = true;
                window.setTimeout(typeLoop, 1200);
                return;
            }

            if (deleting && charIndex > 0) {
                charIndex -= 1;
                window.setTimeout(typeLoop, 28);
                return;
            }

            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            window.setTimeout(typeLoop, 220);
        };

        typeLoop();
    }

    if (certCarousel && prevCert && nextCert) {
        const scrollCerts = (direction) => {
            certCarousel.scrollBy({
                left: direction * 320,
                behavior: reduceMotion ? "auto" : "smooth"
            });
        };

        prevCert.addEventListener("click", () => scrollCerts(-1));
        nextCert.addEventListener("click", () => scrollCerts(1));
    }

    if (copyEmail && copyStatus) {
        copyEmail.addEventListener("click", async () => {
            const email = copyEmail.dataset.copyEmail;
            const originalText = copyStatus.textContent;

            try {
                await navigator.clipboard.writeText(email);
                copyStatus.textContent = "Email copiado al portapapeles: " + email;
            } catch (error) {
                copyStatus.textContent = "Email: " + email;
            }

            window.setTimeout(() => {
                copyStatus.textContent = originalText;
            }, 3500);
        });
    }
});
