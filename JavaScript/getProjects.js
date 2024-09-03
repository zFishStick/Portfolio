async function getProjects() {
    try {
        const response = await fetch('/api/projects'); // Recupera i dati dalla collezione
        const projects = await response.json();

        const grid = document.getElementById('main-grid');

        projects.forEach(project => {
            const col = document.createElement('div');
            col.classList.add('g-col-6', 'g-col-md-4');

            const proj_link = document.createElement('a');
            proj_link.classList.add('proj_link');
            proj_link.onclick = function (event) {
                event.preventDefault(); // Previeni la navigazione immediata
                setPageProject(project.name, project['short-description'], project['long-description']);
                window.location.href = "Html/Project-page.html"; // Naviga alla pagina dopo l'esecuzione
            };
            proj_link.href = "Html/Project-page.html";
            proj_link.textContent = project.name;

            // Crea un div per il nome del gioco
            const row = document.createElement('div');
            row.classList.add('project-name');

            row.appendChild(proj_link);
            col.appendChild(row);

            grid.appendChild(col);
        });
    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
    }
}

getProjects();

function setPageProject(proj_name, pro_desc, proj_long_desc) {
    sessionStorage.setItem("proj_name", proj_name);
    sessionStorage.setItem("proj_desc", pro_desc);
    sessionStorage.setItem("proj_img", proj_long_desc);
}