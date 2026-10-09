// Common JS

const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

const reveals = document.querySelectorAll(".reveal");

reveals.forEach(reveal => {
    const siblings = Array.from(reveal.parentElement.children).filter(el => el.classList.contains("reveal"));
    const position = siblings.indexOf(reveal);
    if (siblings.length > 1 && position > 0) {
        reveal.style.setProperty("--d", `${Math.min(position, 5) * 0.08}s`);
    }
});

const revealAnimation = new IntersectionObserver(
    conditions => {
        conditions.forEach(condition => {
            if (condition.isIntersecting) {
                condition.target.classList.add("visible");
                revealAnimation.unobserve(condition.target);
            }
        })
    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    }
);

reveals.forEach(reveal => revealAnimation.observe(reveal));

const header = document.querySelector("header");
const progress = document.querySelector(".scroll-progress");

function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    header.classList.toggle("scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const navLinks = document.querySelectorAll(".menu > ul > li > a");
const spySections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        }
    });
}, { rootMargin: "-45% 0px -50% 0px" });

spySections.forEach(section => spyObserver.observe(section));

// JS for hamburger menu

const hamburger = document.getElementById("hamburger");
const menu = document.querySelector("header .menu");

function setMenu(open) {
    hamburger.classList.toggle("active", open);
    menu.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
    header.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
}

hamburger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));

// Close hamburger menu
menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
});

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

function syncThemeIcon() {
    const light = root.classList.contains("light-mode");
    themeIcon.classList.toggle("fa-sun", !light);
    themeIcon.classList.toggle("fa-moon", light);
}

syncThemeIcon();

themeToggle.addEventListener("click", () => {
    const apply = () => {
        root.classList.toggle("light-mode");
        syncThemeIcon();
        try {
            localStorage.setItem("theme", root.classList.contains("light-mode") ? "light" : "dark");
        } catch (e) { }
    };

    if (document.startViewTransition && !reducedMotion) {
        const rect = themeToggle.getBoundingClientRect();
        root.style.setProperty("--vt-x", `${rect.left + rect.width / 2}px`);
        root.style.setProperty("--vt-y", `${rect.top + rect.height / 2}px`);
        document.startViewTransition(apply);
    } else {
        apply();
    }
});

// JS for about section

const welcomeText = "ENCHANTÉ, MOI C'EST MIRAN !"
const welcomeSpeed = 55;
let index = 0;

const welcomeType = document.getElementById("typewelcome");

function typeEffect() {
    if (index < welcomeText.length) {
        welcomeType.textContent += welcomeText.charAt(index);
        index++;
        setTimeout(typeEffect, welcomeSpeed);
    }
}

if (reducedMotion) {
    welcomeType.textContent = welcomeText;
} else {
    setTimeout(typeEffect, 350);
}

const portrait = document.querySelector(".portrait");
const portraitFrame = document.querySelector(".portrait-frame");

if (portrait && finePointer && !reducedMotion) {
    portrait.addEventListener("pointermove", e => {
        const r = portrait.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        portraitFrame.style.setProperty("--ry", `${x * 10}deg`);
        portraitFrame.style.setProperty("--rx", `${-y * 10}deg`);
    });
    portrait.addEventListener("pointerleave", () => {
        portraitFrame.style.setProperty("--ry", "0deg");
        portraitFrame.style.setProperty("--rx", "0deg");
    });
}

if (finePointer) {
    document.querySelectorAll(".spotlight").forEach(card => {
        card.addEventListener("pointermove", e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - r.left}px`);
            card.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
    });
}

if (finePointer && !reducedMotion) {
    document.querySelectorAll(".magnetic").forEach(el => {
        el.addEventListener("pointermove", e => {
            const r = el.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
        });
        el.addEventListener("pointerleave", () => {
            el.style.transform = "";
        });
    });
}

//JS for exp section

const experiences = {
    orangeSolution: {
        date: "Septembre 2026 - Aujourd'hui",
        title: "Spécialiste solution - en alternance",
        description: `
            <p>Nouvelle alternance chez Orange, en parallèle de mon <span>Bachelor Cybersécurité</span> à Epitech.</p>
        `
    },
    orange: {
        date: "Septembre 2024 - Juillet 2026",
        title: "Technicienne d'intégration - en alternance",
        description: `
            <p>Intervention sur le terrain pour mettre en place des solutions réseaux. Transformation des besoins techniques en une installation complète:</p>
            <ul>
                <li>Paramétrage <span>complet des équipements réseaux</span>. (switchs, firewall, routeurs) </li>
                <li>Mise en service de <span>solutions de téléphonie IP</span></li>
                <li><span>Conception et déploiement d'une application web</span> (Stack PHP, JS, HTML/CSS) pour <span>automatiser</span> le suivi des stocks et des licences logicielles.</li>
                <li>Accompagnement et échange avec les clients.</li>
                <li>Rédaction de <span>comptes-rendus </span> pour assurer un suivi.</li>
            </ul>
            <p>Une expérience qui m'a permis de lier expertise terrain, développement d'outils sur mesure et gestion de la relation client.</p>
        `
    },
    unicef: {
        date: "Octobre 2024 - Novembre 2025",
        title: "Jeune ambassadrice - bénévolat",
        description: `
            <p>Une expérience humaine et formatrice qui m'a permis de développer mes capacités de communication et d'organisation au service d'une cause internationale au sein de l'UNICEF FRANCE:</p>
            <ul>
                <li><span>Animation d'ateliers</span> et <span>présentation</span> des droits de l'enfant auprès de différents publics.</li>
                <li><span>Promotion des actions</span> de l'UNICEF lors d'événements locaux.</li>
                <li><span>Collaboration avec d'autres bénévoles</span> pour mener à bien des projets solidaires.</li>
            </ul>
            <p>Un engagement citoyen qui a développé mon autonomie, ma prise de parole en public et mon esprit de collaboration.</p>
        `
    }
};

const buttons = document.querySelectorAll(".expplace button");
const tabIndicator = document.querySelector(".tab-indicator");
const jobDate = document.querySelector(".jobdate");
const jobtitle = document.querySelector(".jobtitle");
const jobdescr = document.querySelector(".jobdescr");

//event listener

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => {
            btn.classList.remove("expactive");
            btn.setAttribute("aria-selected", "false");
        });
        button.classList.add("expactive");
        button.setAttribute("aria-selected", "true");
        moveIndicator(button);
        let content = button.dataset.exp;
        upExp(content, true);
    });
});

//function

function moveIndicator(button) {
    tabIndicator.style.height = `${button.offsetHeight}px`;
    tabIndicator.style.width = `${button.offsetWidth}px`;
    tabIndicator.style.transform = `translate(${button.offsetLeft}px, ${button.offsetTop}px)`;
}

function animateList() {
    const listItems = document.querySelectorAll(".jobdescr ul li");
    listItems.forEach((listItem, index) => {
        listItem.classList.remove("active");

        setTimeout(() => {
            listItem.classList.add("active");
        }, 150 + index * 120);
    });
}

function upExp(content, animate = false) {
    jobDate.textContent = experiences[content].date;
    jobtitle.textContent = experiences[content].title;
    jobdescr.innerHTML = experiences[content].description;
    if (animate) {
        requestAnimationFrame(() => {
            animateList();
        });
    }
}

//observer
const expObserver = new IntersectionObserver((conditions) => {
    conditions.forEach(condition => {
        if (condition.isIntersecting) {
            animateList();
            expObserver.unobserve(condition.target);
        }
    });
}, { threshold: 0.2 });

expObserver.observe(jobdescr);

// init exp function
upExp("orangeSolution", false);
const activeExp = document.querySelector(".expplace .expactive");
moveIndicator(activeExp);
window.addEventListener("resize", () => moveIndicator(document.querySelector(".expplace .expactive")));


//JS for edu section

const educations = {
    2020: {
        title: "DIPLÔME DE BACCALAURÉAT - Option Mathématiques et physiques",
        place: "Lycée Gallieni d'Andoalo - Madagascar",
        description: `
            <p class="dipdescr">Apprentissage d'une <span>méthodologie de travail rigoureuse</span> à travers la résolution de problèmes complexes en mathématiques.</p>
            <p class="dipdescr">Développement d'<span>un esprit de synthèse et d'une capacité d'adaptation</span> face à des sujets techniques et théoriques variés.</p>
        `
    },
    2023: {
        title: "CLASSE PRÉPARATOIRE INTÉGRÉE",
        place: "École Supérieure Polytechnique d'Antananarivo - Madagascar",
        description: `
            <p class="dipdescr">Capacité à <span>gérer une charge d'apprentissage importante</span> et à maintenir une productivité constante sous pression.</p>
            <p class="dipdescr">Développement d'une <span>aisance avec les concepts abstraits</span> à travers l'algèbre et les calculs vectoriels.</p>
            <p class="dipdescr">Développement de la <span>logique informatique en développement</span> avec des algorithmes et Fortran.</p>
        `
    },
    2024: {
        title: "Première année en BTS GEMEAU - Gestion et Maîtrise de l'eau",
        place: "Lycée Emile Boyer de la Giroday - La Réunion",
        description: `
            <p class="dipdescr">Adaptation réussie à un nouvel environnement professionnel et académique suite à une <span>mobilité internationale</span> vers La Réunion.</p>
            <p class="dipdescr">Utilisation de l'<span>outil SIG (Système d'Information Géographique)</span> : gestion de bases de données spatiales et cartographie de réseaux d'infrastructure.</p>
            <p class="dipdescr">Investigation et identification des facteurs de dysfonctionnements majeurs (inondations / ruptures de flux).</p>
            <p class="dipdescr"><span>Conception de projets</span> en bureau d'étude (retenues colinéaires) incluant l'<span>analyse des risques</span>.</p>
        `
    },
    2026: {
        title: "BTS SIO - Services Informatiques aux Organisations, option SISR Solutions d'Infrastructure Systèmes et Réseaux",
        place: "EDN - École du Numérique - CCI île de La Réunion",
        description: `
            <p class="dipdescr">Conception d'<span>architectures virtualisées</span>, <span>segmentation</span> réseau et <span>gestion centralisée</span> des environnements.</p>
            <p class="dipdescr">Déploiement de <span>pare-feux</span> et configuration de <span>tunnels VPN.</span></p>
            <p class="dipdescr">Élaboration de <span>schémas détaillés</span> et <span>rédaction de procédures</span> d'exploitation technique.</p>
            <p class="dipdescr">Analyse de besoin et gestion de projet.</p>
        `
    },
    2027: {
        title: "BACHELOR CYBERSÉCURITÉ - 3ème année",
        place: "Epitech",
        description: `
            <p class="dipdescr">Spécialisation en <span>cybersécurité</span>.</p>
            <p class="dipdescr"><span>Piscine Epitech</span> : immersion intensive en <span>programmation C</span>.</p>
        `
    }
}

const eduButtons = document.querySelectorAll(".edudate button");
const edTitle = document.querySelector(".edtitle");
const edPlace = document.querySelector(".edplace");
const edDescription = document.querySelector(".eddescription");
const edBigYear = document.querySelector(".edu-bigyear");
const timelineFill = document.querySelector(".timeline-fill");

//event listener

eduButtons.forEach(eduButton => {
    eduButton.addEventListener("click", () => {
        eduButtons.forEach(edubtn => edubtn.classList.remove("eduactive"));
        eduButton.classList.add("eduactive");
        let eduContent = eduButton.dataset.edu;
        upEdu(eduContent);
    });
});

//function

function upEdu(eduContent) {
    edTitle.textContent = educations[eduContent].title;
    edPlace.textContent = educations[eduContent].place;
    edDescription.innerHTML = educations[eduContent].description;
    edBigYear.textContent = eduContent;

    const all = Array.from(eduButtons);
    const position = all.findIndex(btn => btn.dataset.edu === eduContent);
    all.forEach((btn, i) => {
        btn.classList.toggle("passed", i <= position);
        btn.setAttribute("aria-selected", i === position);
    });
    timelineFill.style.setProperty("--progress", position / (all.length - 1));
}

//init education

upEdu("2027")


//JS for project section
// Folder cards

const folderCards = document.querySelectorAll('.folder-card');

const folderObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const index = Array.from(folderCards).indexOf(card);
            setTimeout(() => {
                card.classList.add('folder-visible');
            }, index * 150);
            folderObserver.unobserve(card);
        }
    });
}, { threshold: 0.15 });

folderCards.forEach(card => folderObserver.observe(card));


// JS for Modals

const modalButtons = document.querySelectorAll('[data-modal]');
const modalOverlays = document.querySelectorAll('.modal-overlay');
let lastFocused = null;

function openModal(modal) {
    lastFocused = document.activeElement;
    modal.classList.add('modal-active');
    modal.querySelector('.modal-container').scrollTop = 0;
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.querySelector('.modal-close').focus(), 50);
}

function closeModal(modal) {
    modal.classList.remove('modal-active');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
}

// Open modal
modalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const modal = document.getElementById(btn.dataset.modal);
        if (modal) openModal(modal);
    });
});

// Close modal via close button
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => closeModal(closeBtn.closest('.modal-overlay')));
});

// Close modal via overlay click
modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay);
    });
});

// Close modal / menu via Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalOverlays.forEach(overlay => {
            if (overlay.classList.contains('modal-active')) closeModal(overlay);
        });
        if (menu.classList.contains("open")) setMenu(false);
    }
});
