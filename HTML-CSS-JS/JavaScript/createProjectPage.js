async function getProjectPage() {

    var p_name = sessionStorage.getItem("game_name");
    var p_comment = sessionStorage.getItem("game_comment");
    var p_img = sessionStorage.getItem("game_img");

    var page_title = document.getElementsByClassName('game-name')[0]
    var game_title = document.getElementsByClassName('game-name')[1]
    page_title.textContent = p_name
    game_title.textContent = p_name

    var comment = document.getElementById('game-comment')
    comment.innerText = g_comment

    var img = document.getElementById('game-img')
    img.src = g_img
}

getGamePage()