//importa as funções que fazem requisições na API (filmes e gêneros)
import { getFilmesPopulares, getGeneros } from "./cineCriticaAPI.js";

//aqui a URL base para carregar as imagens dos filmes
const IMG_URL = "https://image.tmdb.org/t/p/w500";

//oo array global para armazenar os filmes recebidos da API
let listaFilmes = [];

//o objeto global para mapear ID do gênero -> Nome do gênero
let mapaGenerosGlobal = {};


//esse é o evento que dispara quando toda a página HTML é carregada
window.addEventListener('DOMContentLoaded', () => {

    //seleciona os elementos do menu no HTML
    const btnMenu = document.getElementById("btnMenu");
    const menu = document.getElementById("menuLateral");
    const fecharMenu = document.getElementById("fecharMenu");
    const itensMenu = document.querySelectorAll(".menu li");

    //evento de clique no botão ☰ (abre ou fecha o menu)
    btnMenu.addEventListener("click", () => {
        menu.classList.toggle("ativo"); // adiciona/remove a classe "ativo"
    });

    //esse eento de clique no botão X (fecha o menu)
    fecharMenu.addEventListener("click", () => {
        menu.classList.remove("ativo"); // remove a classe "ativo"
    });

    //fecha o menu quando clicar fora dele
    window.addEventListener("click", (e) => {
        // Se o clique NÃO foi dentro do menu nem no botão ☰
        if (!menu.contains(e.target) && !btnMenu.contains(e.target)) {
            menu.classList.remove("ativo"); // fecha o menu
        }
    });

    //adiciona evento de clique em cada item
    itensMenu.forEach(item => {
        item.addEventListener("click", () => {

            //esse remove classe ativo de todos
            itensMenu.forEach(i => i.classList.remove("ativo"));

            //ele adiciona no clicado
            item.classList.add("ativo");
        });

    });

    //vai chhama a função que carrega os filmes
    mostrarFilmes();
});


//FUNÇÃO PRINCIPAL: busca e exibe os filmes
const mostrarFilmes = async () => {
    try {

        // Faz requisição para API e aguarda resposta
        const filmes = await getFilmesPopulares();
        const generos = await getGeneros();

        // Armazena os filmes na variável global
        listaFilmes = filmes;

        // Limpa o mapa de gêneros antes de preencher
        mapaGenerosGlobal = {};

        // Percorre cada gênero e cria um mapa (id -> nome)
        generos.forEach(g => {
            mapaGenerosGlobal[g.id] = g.name;
        });

        // Ordena os filmes pela nota (do maior para o menor)
        const filmesOrdenados = filmes
            .slice(0, 10) // pega apenas os 10 primeiros
            .sort((a, b) => b.vote_average - a.vote_average);

        // Seleciona a div onde os filmes serão exibidos
        const boxFilmes = document.getElementById("boxFilmes");

        // Cria o HTML dos filmes dinamicamente
        boxFilmes.innerHTML = filmesOrdenados.map((filme, index) => `
            
            <!-- Card de cada filme -->
            <div class="cardRanking" onclick="mostrarDetalhes(${filme.id})">
                
                <!-- Número do ranking -->
                <span class="rankingNumero">${index + 1}</span>

                <!-- Imagem do filme -->
                <img src="${IMG_URL + filme.poster_path}" alt="${filme.title}">
            
            </div>

        `).join('');

    } catch (erro) {
        // Caso dê erro na API
        console.error("Erro ao carregar filmes:", erro);
    }
};


//FUNÇÃO: mostra os detalhes do filme clicado
window.mostrarDetalhes = (id) => {

    //esse procura o filme pelo ID dentro da lista
    const filme = listaFilmes.find(f => f.id === id);

    //esse seleciona a área de detalhes no HTML
    const detalhes = document.getElementById("detalhesFilme");

    //aqui converte os IDs de gênero em nomes usando o mapa
    const generos = filme.genre_ids
        .map(id => mapaGenerosGlobal[id]) // troca id por nome
        .join(", "); // junta em texto separado por vírgula

    //aqui vai monta o HTML com as informações do filme
    detalhes.innerHTML = `
        <div class="detalhesContainer">

            <!-- Imagem grande do filme -->
            <div class="detalhesImagem">
                <img src="${IMG_URL + filme.poster_path}">
            </div>

            <!-- Informações do filme -->
            <div class="detalhesInfo">

                <!-- Título -->
                <h2>${filme.title}</h2>

                <!-- Nota -->
                <p class="nota">⭐ Nota: ${filme.vote_average}</p>

                <!-- Gêneros -->
                <p class="generos">🎭 ${generos}</p>

                <!-- Descrição -->
                <p class="descricao">${filme.overview}</p>


                <!- BOTÕES -->
                <div class="acoesDetalhes">
                    <!-- Voltar ao topo -->
                    <button onclick="window.scrollTo({top:0, behavior:'smooth'})">
                        ⬆ Voltar ao topo
                    </button>
                </div>

            </div>
        </div>
    `;

    //esse faz a página rolar suavemente até a área de detalhes
    detalhes.scrollIntoView({ behavior: "smooth" });
};