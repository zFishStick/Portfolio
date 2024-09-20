var allProjectsArray = []
const grid = document.getElementById('main-grid');
const containerWidth = grid.offsetWidth

var leftStyle, activeStyle, rightStyle;

var centerMatrix = new WebKitCSSMatrix();
var leftMatrix = new WebKitCSSMatrix();
var rightMatrix = new WebKitCSSMatrix();

var buttonClicked = 0;

async function getProjects() {
    try {
        const response = await fetch('/api/projects'); // Recupera i dati dalla collezione
        const projects = await response.json();

        //var visibleProjectsArray = [];
        var i = 0;
        var projColClass = "proj-col"

        projects.forEach(project => {
            if (i == 1) {
                projColClass = "focused-proj-col"
            }

            allProjectsArray[i] = project.name
            const col = document.createElement('a');
            col.classList.add(projColClass);

            switch (i) {
                case 0:
                    col.id = 'left'
                    break;
                case 1:
                    col.id = 'center'
                    break;
                case 2:
                    col.id = 'right'
                default:
                    break;
            }


            col.onclick = function (event) {
                event.preventDefault(); // Previeni la navigazione immediata
                setPageProject(project.name, project['short-description'], project['long-description']);
                window.location.href = "Html/Project-page.html"; // Naviga alla pagina dopo l'esecuzione
            };
            col.href = "Html/Project-page.html";
            col.textContent = project.name

            const img1 = document.createElement('img');
            img1.classList.add('proj-img')
            img1.src = project.img1;
            col.appendChild(img1)

            // Crea un div per il nome del gioco
            const row = document.createElement('div');
            row.classList.add('project-name');

            row.appendChild(col);
            grid.appendChild(col);
            i++;
            projColClass = "proj-col"
        });

    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
    }
}

getProjects();

function updateMainProjects(id) {
    buttonClicked++;
    let leftProject = document.getElementById('left')
    let rightProject = document.getElementById('right')
    let activeProject = document.getElementById('center')

    console.log("Prima della transizione: " + "Sinistra: " + leftProject.textContent);
    console.log("Prima della transizione: " + "Centro: " + activeProject.textContent);
    console.log("Prima della transizione: " + "Destra: " + rightProject.textContent);

    let elementWidth = activeProject.offsetWidth;
    let sideElementWidth = leftProject.offsetWidth

    if (id == "next") {
        var firstElement = allProjectsArray.pop();
        allProjectsArray.unshift(firstElement);   
    }
    else if (id == "prev") {

        var limit = 250
        console.log(containerWidth, elementWidth, sideElementWidth);
        console.log(containerWidth - elementWidth + limit);

        var centerToLeftSlide = 16.5
        var leftToRightSlide = 42.5
        var rightToCenterSlide = 10.05

        activeProject.className = "proj-col"
        rightProject.className = "focused-proj-col" 

        if (buttonClicked == 1) {
            leftProject.style.transform = `translateX(${leftToRightSlide}em)`;
            activeProject.style.transform = `translateX(-${centerToLeftSlide}em)`;     
            rightProject.style.transform = `translateX(-${rightToCenterSlide}em`;
        }
        else if (buttonClicked == 2){
            leftProject.style.transform = `translateX(${centerToLeftSlide}em)`
            activeProject.style.transform = `translateX(-${leftToRightSlide}em)`;
            rightProject.style.transform = `translateX(${rightToCenterSlide}em)`;
        }
        else{
            leftProject.style.transform = `translateX(0px)`;
            rightProject.style.transform = `translateX(0px)`;
            activeProject.style.transform = `translateX(0px)`;
            buttonClicked = 0;
        }

        console.log("btn:" + buttonClicked);
        
        leftProject.id = 'right'
        activeProject.id = 'left'
        rightProject.id = 'center'

    }
}


function setPageProject(proj_name, pro_desc, proj_long_desc) {
    sessionStorage.setItem("proj_name", proj_name);
    sessionStorage.setItem("proj_desc", pro_desc);
    sessionStorage.setItem("proj_img", proj_long_desc);
}