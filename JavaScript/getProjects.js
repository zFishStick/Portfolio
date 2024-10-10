var arrayProjects = []
const container = document.getElementById('projects-container');
var currentIndex = 0;
var buttonClicked = 0;

async function getProjects() {
  try {
    const response = await fetch('/api/projects'); // Recupera i dati dalla collezione
    const projects = await response.json();

    let i = 0;

    projects.forEach(project => {
      arrayProjects[i] = {
        name: project.name,
        img: project.img1,
        shortDesc: project['short-description'],
        longDesc: project['long-description']
      };
      i++;
    });
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }

}

async function initialize() {
  await getProjects(); // Aspetta che i progetti siano caricati
  updateVisibleProjects(); // Ora aggiorna i progetti visibili
}

initialize()

function updateVisibleProjects() {
  const projectMappings = [
    { divId: 'left-div', projectId: 'left'},
    { divId: 'center-div', projectId: 'center'},
    { divId: 'right-div', projectId: 'right'},
    { divId: 'other-div', projectId: 'other'}
  ];

  setTimeout(() => {
    projectMappings.forEach((mapping, index) => {
      const projectDiv = document.getElementById(mapping.divId);
      const projectImg = projectDiv.querySelector(`#${mapping.projectId}`);

      const projectData = arrayProjects[(currentIndex + index) % arrayProjects.length]; // Usa l'indice corretto
      console.log(projectData);

      if (projectData) {
        projectImg.src = projectData.img; // Assicurati che `projectData.img` sia l'immagine corretta
        if (index == 1) {
          projectImg.onclick = function (event) {
            event.preventDefault(); // Previene la navigazione immediata
            setPageProject(projectData.name, projectData.shortDesc, projectData.longDesc);
            window.location.href = "Html/Project-page.html"; // Naviga alla pagina dopo l'esecuzione
            projectImg.href = "Html/Project-page.html";
          };
        }
      }



    });
  }, 500);
}



function leftToRight() {

  currentIndex = (currentIndex - 1 + arrayProjects.length) % arrayProjects.length;
  console.log(currentIndex);

  updateVisibleProjects();

  var blue = document.getElementById('right-div')
  var green = document.getElementById('center-div')
  var red = document.getElementById('left-div')
  var yellow = document.getElementById('other-div')

  blue.classList.add("rightToOther")

  green.classList.add("centerToRight")

  red.classList.add("leftToCenter")

  yellow.classList.add('otherToLeft')

  setTimeout(() => {
    blue.classList.remove("rightToOther")
    green.classList.remove("centerToRight")
    red.classList.remove("leftToCenter")
    yellow.classList.remove('otherToLeft')
  }, 500)

}

function rightToLeft() {
  currentIndex = (currentIndex + 1) % arrayProjects.length;
  updateVisibleProjects();

  var blue = document.getElementById('right-div')
  var green = document.getElementById('center-div')
  var red = document.getElementById('left-div')
  var yellow = document.getElementById('other-div')

  blue.classList.add("rightToCenter")

  green.classList.add("centerToLeft")

  red.classList.add("leftToOther")

  yellow.classList.add('otherToRight')

  setTimeout(() => {
    blue.classList.remove("rightToCenter")
    green.classList.remove("centerToLeft")
    red.classList.remove("leftToOther")
    yellow.classList.remove('otherToRight')
  }, 500)
}

updateVisibleProjects();


function setPageProject(proj_name, pro_desc, proj_long_desc) {
  sessionStorage.setItem("proj_name", proj_name);
  sessionStorage.setItem("proj_desc", pro_desc);
  sessionStorage.setItem("proj_img", proj_long_desc);
}