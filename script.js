// Common JS

const reveals = document.querySelectorAll(".reveal");

const revealAnimation = new IntersectionObserver(
    conditions => {
        conditions.forEach(condition => {
            if (condition.isIntersecting) {
                condition.target.classList.add("visible");
            } else {
                condition.target.classList.remove("visible")
            };
        })
    },
    {
        threshold: 0.05
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
        description : "Description of the job."
    },
    unicef : {
        date : "Octobre 2024 - Novembre 2025",
        title : "Jeune ambassadrice - bénévolat",
        description: "Description of the job"
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
        const content = button.dataset.exp;
        upExp(content);
    });
});

//function 

function upExp (content) {
    jobDate.textContent = experiences[content].date;
    jobtitle.textContent = experiences[content].title;
    jobdescr.textContent = experiences[content].description;
};

//initialize exp

upExp("orange");

//addAnimation







//JS for edu section

const educations = {
    2020 : {
        title : "DIPLOME DE BACCALAUREAT - Option Mathematiques et physiques",
        place : "Lycée Gallieni d'Andoalo - Madagascar",
        description : "Description of 2020 course."
    },
    2023 : {
        title : "PREPARATION INGENIEUR - scientifiques",
        place : "Ecole Supérieur Polytechnique d'Antananarivo - Madagascar",
        description : "Description of 2023 course."
    },
    2024 : {
        title : "BTS GEMEAU - Gestion et Maîtrise de l'eau",
        place : "Lycée Emile Boyer de la Giroday - La Réunion",
        description : "Description of 2024 course."
    },
    2026 : {
        title : "BTS SIO - Services Informatiques aux Organisation, option SISR Solution d'Infrastructure Systèmes et Réseaux",
        place : "EDN - Ecole du Numérique - CCI île de La Réunion",
        description : "Description of 2026 course."
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
        const eduContent = eduButton.dataset.edu;
        upEdu(eduContent);
    });
});

//function

function upEdu(eduContent) {
    edTitle.textContent = educations[eduContent].title;
    edPlace.textContent = educations[eduContent].place;
    edDescription.textContent = educations[eduContent].description;
}

//init education

upEdu("2026")


//JS for project animation

const projects = document.querySelectorAll(".item");
const projectSection = document.getElementById("project");

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