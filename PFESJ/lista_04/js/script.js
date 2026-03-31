function incluirHTML() {
    const elementos = document.querySelectorAll('[data-include]');
    elementos.forEach(async el => {
        const arquivo = el.getAttribute('data-include');
        try {
            const resposta = await fetch(arquivo);
            const conteudo = await resposta.text();
            el.innerHTML = conteudo;
        } catch {
            el.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
        }
    });
}

document.addEventListener("DOMContentLoaded", incluirHTML);

