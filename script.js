//JS for exp section

const experiences = {
    orange: {
        date : "Septembre 2024 - Juillet 2026",
        title : "Technicienne d'intégration - en alternance",
        description : "Description of the job."
    },
    unicef : {
        date : "Octobre 2024 - Novembre 2025",
        title : "Jeune ambassadrice",
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
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
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

