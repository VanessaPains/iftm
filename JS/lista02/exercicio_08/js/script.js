//a qui Array com as opções dos jogadores
opcoes = ['Pedra', 'Papel', 'Tesoura'];

//aqui os sorteio dos jogadores - 0, 1 ou 2
sorteio1 = Math.floor(Math.random() * 3);
sorteio2 = Math.floor(Math.random() * 3);

//aqui criamos um array com os caminhos das imagens correspondentes
imagens = ['img/pedra.png', 'img/papel.png', 'img/tesoura.png'];

//aqui exibimos o título do jogo e deixamos centralizado
document.write('<div style="text-align: center;">');
document.write('<h1>JOGO JOKEMPÔ</h1>');

// aqui exibe as imagens sorteadas
document.write('<p>Jogador 1:</p>');
document.write(`<img src="${imagens[sorteio1]}" alt="${opcoes[sorteio1]}" width="100">`);

document.write('<p>Jogador 2:</p>');
document.write(`<img src="${imagens[sorteio2]}" alt="${opcoes[sorteio2]}" width="100">`);

// aqui mostra o resultado textual
document.write('<h3>Resultado do Jogo:</h3>');
document.write(`Jogador 1: ${opcoes[sorteio1]} <br>`);
document.write(`Jogador 2: ${opcoes[sorteio2]} <br><br>`);

// aqui mostra se determina o vencedor
if (sorteio1 == sorteio2) {
    document.write('Empate!');
} else if (
    (sorteio1 == 0 && sorteio2 == 2) ||
    (sorteio1 == 1 && sorteio2 == 0) ||
    (sorteio1 == 2 && sorteio2 == 1)
) {
    document.write('Jogador 1 Venceu!');
} else {
    document.write('Jogador 2 Venceu!');
}
