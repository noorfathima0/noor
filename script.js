// border sweep animation
const cards = document.querySelectorAll('.service-card');

cards.forEach(card => {
    const sweep = card.querySelector('.border-sweep');

    card.addEventListener('mouseenter', () => {
        sweep.style.transition = 'width 0.45s ease-out';
        sweep.style.width = '100%';
    });

    card.addEventListener('mouseleave', () => {
        sweep.style.transition = 'width 0.45s ease-out';
        sweep.style.width = '0%';
    });
});


/* ===========================
   SCROLL REVEAL FOR ABOUT
   =========================== */

// Select elements inside About section
const aboutRevealElements = document.querySelectorAll(
    ".about-title, .about-para, .stat-box, .about-image-box"
);

// Initial state
aboutRevealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "0.8s ease";
});

// Reveal on scroll
const revealAbout = () => {
    aboutRevealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
};

window.addEventListener("scroll", revealAbout);
revealAbout(); // fire once on load

/* ===========================
   SCROLL REVEAL: PROJECTS
   =========================== */

const projectItems = document.querySelectorAll(
    ".work-title, .work-item, .work-cta"
);

// initial state
projectItems.forEach((el, index) => {
    el.classList.add("project-reveal");
    el.style.transitionDelay = `${index * 0.15}s`; // stagger effect
});

// reveal on scroll
const revealProjects = () => {
    projectItems.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
            el.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", revealProjects);
revealProjects();


/* ===========================
   SCROLL REVEAL: CONTACT
   =========================== */

const contactElements = document.querySelectorAll(
    ".contact-title, .contact-sub, .contact-info p, .contact-form, .contact-btn"
);

contactElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = `1s cubic-bezier(.22,1,.36,1) ${index * 0.12}s`;
});

const revealContact = () => {
    contactElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
};

window.addEventListener("scroll", revealContact);
revealContact();


/* ===========================
   EMAILJS CONFIG + FORM HANDLER
   =========================== */

// Initialize EmailJS
emailjs.init("9YWuCgPx5M8U1CoKk");

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
        <svg class="loading-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg> Sending...
    `;
    submitBtn.disabled = true;

    emailjs.sendForm("service_ro5o7ju", "template_9gklrjn", this)
        .then(() => {
            Swal.fire({
                icon: 'success',
                iconColor: '#ff2a2a',
                title: 'Message Sent Successfully!',
                titleFont: 'Poppins, sans-serif',
                text: 'Thank you for reaching out. I\'ll get back to you as soon as possible.',
                background: '#050505',
                color: '#fff',
                confirmButtonText: 'Got It',
                confirmButtonColor: '#ff2a2a',
                customClass: {
                    popup: 'swal-theme-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-button'
                },
                backdrop: 'rgba(0, 0, 0, 0.85)',
                showClass: {
                    popup: 'swal-popup-animation'
                },
                hideClass: {
                    popup: 'swal-popout-animation'
                }
            });
            contactForm.reset();
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            Swal.fire({
                icon: 'error',
                iconColor: '#ff2a2a',
                title: 'Something Went Wrong',
                titleFont: 'Poppins, sans-serif',
                text: 'Failed to send your message. Please try again or email me directly.',
                background: '#050505',
                color: '#fff',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#ff2a2a',
                customClass: {
                    popup: 'swal-theme-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-button'
                },
                backdrop: 'rgba(0, 0, 0, 0.85)',
                showClass: {
                    popup: 'swal-popup-animation'
                },
                hideClass: {
                    popup: 'swal-popout-animation'
                }
            });
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
});

// Custom Cursor Logic//

const cursor = document.querySelector(".custom-cursor");
const shadow = document.querySelector(".cursor-shadow");

let mouseX = 0;
let mouseY = 0;

let shadowX = 0;
let shadowY = 0;

// Track mouse
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Main cursor follows instantly
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

// Animate shadow (smooth trailing)
function animateShadow() {
  shadowX += (mouseX - shadowX) * 0.15;
  shadowY += (mouseY - shadowY) * 0.15;

  shadow.style.left = shadowX + "px";
  shadow.style.top = shadowY + "px";

  requestAnimationFrame(animateShadow);
}

animateShadow();

const hoverElements = document.querySelectorAll("a, button");

hoverElements.forEach(el => {
  el.addEventListener("mouseenter", () => {
    shadow.style.transform = "translate(-50%, -50%) scale(1.5)";
    shadow.style.opacity = "0.6";
  });

  el.addEventListener("mouseleave", () => {
    shadow.style.transform = "translate(-50%, -50%) scale(1)";
    shadow.style.opacity = "1";
  });
});

/* ===========================
   PROCESS TIMELINE ANIMATION
   =========================== */

const processSteps = document.querySelectorAll('.process-step');
const processGrid = document.querySelector('.process-grid');

const processObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {

      // Animate timeline line
      if (entry.target === processGrid && entry.isIntersecting) {
        processGrid.classList.add('line-visible');
      }

      // Animate steps
      if (entry.target.classList.contains('process-step')) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          processObserver.unobserve(entry.target); // Animate once
        }
      }

    });
  },
  {
    threshold: 0.25,
    rootMargin: '0px 0px -80px 0px',
  }
);


// Observe timeline
if (processGrid) {
  processObserver.observe(processGrid);
}

// Observe each step
processSteps.forEach((step, index) => {

  step.style.transitionDelay = `${index * 0.15}s`;

  processObserver.observe(step);
});


/* ===========================
   SERVICES SCROLL REVEAL
   =========================== */

const serviceCards = document.querySelectorAll('.service-card-pro');

const serviceObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        serviceObserver.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.2,
    rootMargin: '0px 0px -60px 0px',
  }
);


serviceCards.forEach((card, index) => {

  // Stagger animation
  card.style.transitionDelay = `${index * 0.08 + 0.15}s`;

  serviceObserver.observe(card);

});

// Mobile expand for services

document.querySelectorAll('.service-card-pro').forEach(card => {

  card.addEventListener('click', () => {

    // Close others
    document.querySelectorAll('.service-card-pro').forEach(c => {
      if (c !== card) c.classList.remove('active');
    });

    // Toggle current
    card.classList.toggle('active');

  });

});
