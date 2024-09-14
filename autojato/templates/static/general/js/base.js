document.addEventListener('DOMContentLoaded', function() {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    let searchBtn = document.querySelector("#searchBtn"); // Adicionei a classe 'bx-search' no HTML para o botão de pesquisa

    if (sidebar && closeBtn && searchBtn) {
        closeBtn.addEventListener("click", () => {
            sidebar.classList.toggle("open");
            menuBtnChange();
        });

        searchBtn.addEventListener("click", () => {
            sidebar.classList.toggle("open");
            menuBtnChange();
        });

        function menuBtnChange() {
            if (sidebar.classList.contains("open")) {
                closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
            } else {
                closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
            }
        }
    } else {
        console.log("Um ou mais elementos não foram encontrados.");
    }
});
