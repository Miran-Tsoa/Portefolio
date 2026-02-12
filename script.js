// Common JS

const reveals = document.querySelectorAll(".reveal");

const revealAnimation = new IntersectionObserver(
    conditions => {
        conditions.forEach(condition => {
            if (condition.isIntersecting) {
                condition.target.classList.add("visible");
            }
        })
    },
    {
        threshold: 0.2
    }
);

reveals.forEach(reveal => revealAnimation.observe(reveal));


// JS for about section

const welcomeText = "SOYEZ LA BIENVENUE,"
const welcomeSpeed = 100;
let index = 0;

const welcomeType = document.getElementById("typewelcome");

function typeEffect() {
    if (index<welcomeText.length) {
        welcomeType.textContent+=welcomeText.charAt(index);
        index++;
        setTimeout(typeEffect, welcomeSpeed);
    }
}

typeEffect();


//JS for exp section

const experiences = {
    orange: {
        date : "Septembre 2024 - Juillet 2026",
        title : "Technicienne d'intégration - en alternance",
        description : `
            <p>Intervention sur le terrain pour mettre en place des solutions réseaux. Transformation des besoins techniques en une installation complète:</p>
            <ul>
                <li>Paramètrage <span>complet des équipements réseaux</span>. (switchs, firewall, routeur) </li>
                <li>Mise en service de <span>solutions de téléphonies IP</span></li>
                <li><span>Conception et déploiement d'une application web</span> (Stack PHP, JS, HTML/CSS) pour <span>automatiser</span> le suivi des stocks et des licences logiciels.</li>
                <li>Accompagnement et échange avec les clients.</li>
                <li>Rédaction de <span>comptes-rendus </span> pour assurer un suivi.</li>
            </ul>
            <p>Une expérience qui m'a permis de lier expertise terrain, développement d'outils sur mesure et gestion de la relation client.</p>
        `
    },
    unicef : {
        date : "Octobre 2024 - Novembre 2025",
        title : "Jeune ambassadrice - bénévolat",
        description: `
            <p>Une expérience humaine et formatrice qui m'a permis de développer mes capacités de communicationet d'organisation au service d'une cause internationale au sein de UNICEF FRANCE:</p>
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
const jobDate = document.querySelector(".jobdate");
const jobtitle = document.querySelector(".jobtitle");
const jobdescr = document.querySelector(".jobdescr");

//event listener

buttons.forEach(button => {
    button.addEventListener("click", ()=>{
        buttons.forEach(btn => btn.classList.remove("expactive"));
        button.classList.add("expactive");
        let content = button.dataset.exp;
        upExp(content);
    });
});

//function 

function animateList() {
    const listItems = document.querySelectorAll(".jobdescr ul li");
    listItems.forEach((listItem, index) => {
        listItem.classList.remove("active");

        setTimeout(() => {
            listItem.classList.add("active");
        }, index * 200);
    });
}

function upExp (content) {
    jobDate.textContent = experiences[content].date;
    jobtitle.textContent = experiences[content].title;
    jobdescr.innerHTML = experiences[content].description;
    animateList();
};

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

//initialize exp

upExp("orange");




//JS for edu section

const educations = {
    2020 : {
        title : "DIPLOME DE BACCALAUREAT - Option Mathematiques et physiques",
        place : "Lycée Gallieni d'Andoalo - Madagascar",
        description : `
            <p class="dipdescr">Apprentissage d'une <span>méthodologie de travail rigoureuse</span> à travers la résolution de problèmes complexes en mathématiques.</p>
            <p class="dipdescr">Développement d'<span>un esprit de synthèse et d'une capacité d'adaptation</span> face à des sujets techniques et théoriques variés.</p>
        `
    },
    2023 : {
        title : "CLASSE PREPARATOIRE AUX ECOLES INGENIEURS",
        place : "Ecole Supérieur Polytechnique d'Antananarivo - Madagascar",
        description : `
            <p class="dipdescr">Capacité à <span>gérer une charge d'apprentissage importante</span> et à maintenir une productivité constante sous pression.</p>
            <p class="dipdescr">Développement d'une <span>aisance avec les concepts abstraits</span> à travers l'algèbre et les calculs vectoriels</p>
            <p class="dipdescr">Développement de la <span>logique informatique en développement</span> avec des algorithmes et Fortran</p>
        `
    },
    2024 : {
        title : "Première année en BTS GEMEAU - Gestion et Maîtrise de l'eau",
        place : "Lycée Emile Boyer de la Giroday - La Réunion",
        description : `
            <p class="dipdescr">Adaptation réussie à un nouvel environnement professionnel et académique suite à une <span>mobilité internationale</span> vers La Réunion.</p>
            <p class="dipdescr">Utilisation de l'<span>outil SIG (Système d'Information Géographique)</span> : gestion de bases de données spatiales et cartographie de réseaux d'infrastructure.</p>
            <p class="dipdescr">Investigation et identification des facteurs de dysfonctionnements majeurs (inondations / ruptures de flux).</p>
            <p class="dipdescr"><span>Conception de projets</span> en bureau d'étude (retenues colinéaires) incluant l'<span>analyse des risques</span>.</p>
        `
    },
    2026 : {
        title : "BTS SIO - Services Informatiques aux Organisation, option SISR Solution d'Infrastructure Systèmes et Réseaux",
        place : "EDN - Ecole du Numérique - CCI île de La Réunion",
        description : `
            <p class="dipdescr">Acquisition <span>des socles fondamentaux en conception d'infrastructures</span> (Modèle OSI/ et TCP/IP), la maîtrise de la virtualisation système et l'administration de domaine.</p>
            <p class="dipdescr"><span>Sécurisation des flux distants</span> et du management des services informatiques (VPN/IPSEC, Firewall).</p>
            <p class="dipdescr">Attestation <span>MOOC </span> de l'<span>ANSII</span></p>
        `
    }
}

const eduButtons = document.querySelectorAll(".edudate button");
const edTitle = document.querySelector(".edtitle");
const edPlace = document.querySelector(".edplace");
const edDescription = document.querySelector(".eddescription");

//event listener

eduButtons.forEach(eduButton => {
    eduButton.addEventListener("click", ()=> {
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
}

//init education

upEdu("2026")


//JS for project animation

const Items = {
    project1: {
        title : "Administration de Windows Server",
        description : "Description of the project."
    },
    project2: {
        title : "Administration de Proxmox",
        description : "Description of the project."
    },
    project3: {
        title: "",
        description : ""
    },
    project4: {
        title: "",
        description: "",
    },
    project5: {
        title: "APPLICATION DE GESTION DE STOCK",
        description: "Description of the project."
    },
    project6: {
        title: "APPLICATION DE GESTION D'ASSURANCE LOGICIEL",
        description: "Description of the project."
    }
}

const projects = document.querySelectorAll(".item");
const projectSection = document.getElementById("project");
const projectLists = document.querySelectorAll(".item");
const popup = document.querySelector(".popup");
const popupContent = document.querySelector(".projectPopup");
const close = document.getElementById("close");
const popupTitle = document.querySelector(".popupTitle h1");
const popupDescription = document.querySelector(".popupDescription p");

//Observer

const projectAnimation = new IntersectionObserver(
    conditions => {
        conditions.forEach(condition => {
            if (condition.isIntersecting) {
                projects.forEach((projectItem, index) => {
                    setTimeout(() => {
                        projectItem.classList.add("visible");
                    }, index*300);
                })

                projectAnimation.unobserve(condition.target);
            }
        })
    },
    {
    threshold: 0.2
    }
);

projectAnimation.observe(projectSection);



// JS for skill section

const skillContent = document.querySelectorAll(".skillcontent div")

//function

function animateSkill() {
    skillContent.forEach((listSkill, index) => {
        listSkill.classList.remove("active");
        setTimeout(() => {
            listSkill.classList.add("active");
        }, index * 300);
    });
}

//observer

const skillSection = document.getElementById("skill")
const skillObserver = new IntersectionObserver((conditions) => {
    conditions.forEach(condition => {
        if (condition.isIntersecting) {
            animateSkill();
            skillObserver.unobserve(condition.target);
        }
    });
}, { threshold: 0.5 });

skillObserver.observe(skillSection);


// JS For popup

//event listener for popup

projectLists.forEach(projectList => {
    projectList.addEventListener("click", ()=> {
        popup.classList.add("active")
        let popupItem = projectList.dataset.pro;
        upPopup(popupItem);
    })
})

close.addEventListener("click", ()=> {
    popup.classList.remove("active")
})

popup.addEventListener("click", ()=> {
    popup.classList.remove("active")
})

popupContent.addEventListener("click", (event)=> {
    event.stopPropagation();
})

//function 

function upPopup(popupItem) {
    popupTitle.textContent = Items[popupItem].title;
    popupDescription.textContent = Items[popupItem].description;
}