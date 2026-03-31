//essa e a função para buscar filmes populares
const getFilmesPopulares = async () => {

    const API_KEY = "5a8cbdbfc17515245a1dde6081b54790";

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados.results; //vai retorna lista de filmes
    }
    catch (error) {
        console.log(error.message);
        return [];
    }
}


//essa e a função para buscar gêneros
const getGeneros = async () => {

    const API_KEY = "5a8cbdbfc17515245a1dde6081b54790";

    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados.genres;
    }
    catch (error) {
        console.log(error.message);
        return [];
    }
}


//ess e a exportação
export { getFilmesPopulares, getGeneros };
