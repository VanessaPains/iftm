//seleciona todos os elementos com a classe candidato
candidatos = document.querySelectorAll('.candidato');
votos = [0, 0, 0, 0];

//aqui é uma funcao para atualizar destaque do líder
function atualizarLider() {
    //pega o maior numero de votos
    //percorre todos os candidatos e seus indices
    maxVotos = Math.max(...votos);

    //esse forEach percorre todos os candidatos e seus indices
    candidatos.forEach((cand, idx) => {
        //o remove serve para remover a classe lider de todos os candidatos 
        //no w3schools fala que é melhor usar remove do que set porque
        //se usar set, pode acabar adicionando a classe mais de uma vez
        //e o remove remove todas as ocorrencias da classe
        cand.classList.remove('lider');

        //se o numero de votos do candidato for igual ao maior numero de votos
        if (votos[idx] === maxVotos && maxVotos > 0) {

            //o classList.add serve para adicionar a classe lider ao candidato que esta com mais votos
            //assim ele fica com o destaque diferente dos outros
            //no w3schools fala que é melhor usar add do que set porque
            //se usar set, pode acabar adicionando a classe mais de uma vez
            //e o add adiciona a classe apenas uma vez
            cand.classList.add('lider');
        }

        //no w3schools fala que é melhor usar textContent do que innerHTML porque
        //o textContent é mais seguro e rapido, ja que ele nao interpreta o conteudo como HTML
        //e o innerHTML interpreta o conteudo como HTML, o que pode ser um problema de seguranca
        //se o conteudo vier de uma fonte nao confiavel
        //entao aqui ele atualiza o numero de votos na tela
        cand.querySelector('.votos').textContent = votos[idx] + ' votos';
    });
}

//aqui ao clicar na imagem, adiciona número aleatório de votos
candidatos.forEach(cand => {
    cand.addEventListener('click', function() {
        index = parseInt(cand.dataset.index);
        votosAleatorios = Math.floor(Math.random() * 10) + 1; // +1 a 10 votos
        votos[index] += votosAleatorios;
        atualizarLider();
    });
});
