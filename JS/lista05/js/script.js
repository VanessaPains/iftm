
//======= INICIO INCLUIR CONTEUDO HTML EM PAGINA EXTERNAS ============
// Função para incluir conteúdo HTML de arquivos externos
function incluirHTML() {
    const elementos = document.querySelectorAll('[data-include]');
    elementos.forEach(async el => {
        const arquivo = el.getAttribute('data-include');
        try {
            const resposta = await fetch(arquivo);
            const conteudo = await resposta.text();
            el.innerHTML = conteudo;
        } catch (e) {
            el.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
        }
    });
}
document.addEventListener("DOMContentLoaded", incluirHTML);
//======= FIM INCLUIR CONTEUDO HTML EM PAGINA EXTERNAS ============



document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenuUl = document.querySelector(".nav-menu ul");

    if (menuToggle && navMenuUl) {
        menuToggle.addEventListener("click", function () {
            navMenuUl.classList.toggle("open");
        });
    }
});
