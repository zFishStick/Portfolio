async function getProjects() {
    try {
        const response = await fetch('/api/projects'); // Recupera i dati dalla collezione
        const projects = await response.json();

        const grid = document.getElementById('main-grid');

        projects.forEach(project => {
            const col = document.createElement('div');
            col.classList.add('g-col-6', 'g-col-md-4');

            const img_link = document.createElement('a');
            img_link.classList.add('img-link');
            img_link.onclick = function () {
                setPageProject(project.name, project.short-description, project.img)
            };
            img_link.href = "Project-page.html"

            // Crea l'elemento <img> e assegna l'URL dell'immagine
            const img = document.createElement('img');
            img.classList.add('project-img');
            img.src = project.img; // Assegna direttamente l'URL dell'immagine
            img.alt = project.name; // Imposta un alt tag con il nome del gioco

            img_link.appendChild(img);
            col.appendChild(img_link);

            // Crea un div per il nome del gioco
            const row = document.createElement('div');
            row.classList.add('project-name');
            row.textContent = project.name; // Assegna direttamente il nome del gioco
            col.appendChild(row);

            grid.appendChild(col);
        });
    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
    }
}

// Carica i dati quando la pagina è pronta
window.onload = getProjects;

function setPageProject(proj_name, pro_desc, proj_img) {
    sessionStorage.setItem("proj_name", proj_name);
    sessionStorage.setItem("proj_desc", pro_desc);
    sessionStorage.setItem("proj_img", proj_img);
}