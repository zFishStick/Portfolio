async function createProjectPage() {

    var p_name = sessionStorage.getItem("proj_name");
    var p_comment = sessionStorage.getItem("proj_desc");
    var p_img = sessionStorage.getItem("proj_img");

    var page_title = document.getElementsByClassName('proj_name')[0]
    var proj_title = document.getElementsByClassName('proj_name')[1]
    page_title.textContent = p_name
    proj_title.textContent = p_name

    var comment = document.getElementById('proj_desc')
    comment.innerText = p_comment

    var img = document.getElementById('proj_img')
    img.textContent = p_img

}

createProjectPage()