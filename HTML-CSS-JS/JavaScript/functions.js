const path = "HTML-CSS-JS/Html/"
const section = document.querySelectorAll("section")
const menu_sections = ["home", "biografia", "formazione", "contatti"]

loadBiography()
loadFormation()
loadContacts()

function loadBiography() {
    $(document).ready(function(){
        $("#biografia").load(path + "Biography.html");
    });
}

function loadFormation() {
    $(document).ready(function(){
        $("#formazione").load(path + "Formation.html");
    });
}

function loadContacts() {
    $(document).ready(function(){
        $("#contatti").load(path + "Contacts.html");
    });
}

// Funzione per mostrare o nascondere gli elementi in base allo scroll del mouse
function updateElementVisibility() {
    const hiddenElements = document.querySelectorAll('.fade, .fade1');
    
    hiddenElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      if ((elementTop+100) < windowHeight && elementBottom > 0) {
        element.classList.remove('fade');
        element.classList.add('fade1');
      } else {
        element.classList.remove('fade1');
        element.classList.add('fade');
      }
    });


  }
  
  window.addEventListener('scroll', updateElementVisibility);
  
  updateElementVisibility();



