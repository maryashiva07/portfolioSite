/* PORTFOLIO CONFIG */

const portfolioLinks = {
  nirogaGithub: "https://github.com/maryashiva07/NirogaHub",

  nirogaLive: "https://nirogahub-1.onrender.com/",

  chitchatGithub: "https://github.com/maryashiva07/chatApp",

  chitchatLive: "https://chatapp-5eke.onrender.com/",

  expenseGithub: "https://github.com/maryashiva07/expenseTrackerX",

  expenseLive: "https://expensetrackerx.onrender.com/",
};

/* DOM */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

const navItems = document.querySelectorAll(".nav-link");

const hero = document.getElementById("home");

const heroPhoto = document.getElementById("heroPhoto");

/*  MOBILE MENU */

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

/* CLOSE MOBILE MENU */

/* CLOSE MOBILE MENU WHEN CLICKING OUTSIDE */

document.addEventListener("click", (event) => {
  if (
    navLinks &&
    menuToggle &&
    navLinks.classList.contains("open") &&
    !navLinks.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});


navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* SMOOTH SCROLL */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

/* ACTIVE NAV LINK */

const sections = document.querySelectorAll("main section[id]");

const updateActiveNav = () => {
  const scrollPosition = window.scrollY + 140;

  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = section.id;
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", updateActiveNav, { passive: true });

/* PHOTO */

const updateHeroPhoto = () => {
  if (!hero || !heroPhoto || window.innerWidth <= 768) {
    heroPhoto.classList.remove("photo-sticky-active");

    return;
  }

  const heroTop = hero.offsetTop;

  const heroHeight = hero.offsetHeight;

  const scrollInsideHero = window.scrollY - heroTop;

  const stickyLimit = heroHeight * 0.3;

  if (scrollInsideHero >= 0 && scrollInsideHero <= stickyLimit) {
    heroPhoto.classList.add("photo-sticky-active");
  } else {
    heroPhoto.classList.remove("photo-sticky-active");
  }
};

window.addEventListener("scroll", updateHeroPhoto, { passive: true });

window.addEventListener("resize", updateHeroPhoto);

/*  PROJECT LINKS */

document.querySelectorAll("[data-link]").forEach((link) => {
  const key = link.dataset.link;

  const url = portfolioLinks[key];

  if (!url || url === "#") {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      alert("Add your actual project link in script.js");
    });

    return;
  }

  link.href = url;
});

/* CURRENT YEAR*/

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/*INITIAL */

updateActiveNav();

updateHeroPhoto();






/* SCROLL ANIMATION */

const revealElements = document.querySelectorAll(
  ".section-heading, " +
  ".about-content, " +
  ".skill-card, " +
  ".experience-card, " +
  ".project-card, " +
  ".achievement-card, " +
  ".education-card, " +
  ".contact-content"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Animate once when the element first enters view
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -35px 0px"
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
