// aqui o total de cartas disponíveis no baralho (1 a 27)
const totalCartas = 27;

// a função para gerar um array com 12 cartas aleatórias únicas
function sortearCartas() {
    let todasCartas = []; // Array para armazenar os números das cartas sorteadas
    while (todasCartas.length < 12) {
        let carta = Math.floor(Math.random() * totalCartas) + 1;
        // Garante que não haja repetição
        if (!todasCartas.includes(carta)) {
            todasCartas.push(carta);
        }
    }
    return todasCartas;
}

// aqui vamos sorteia as 12 cartas
cartasSorteadas = sortearCartas();

// aqui vamos  divide as cartas entre os 4 jogadores (3 cartas cada)
jogadores = [
    cartasSorteadas.slice(0, 3),   // Jogador 1
    cartasSorteadas.slice(3, 6),   // Jogador 2
    cartasSorteadas.slice(6, 9),   // Jogador 3
    cartasSorteadas.slice(9, 12)   // Jogador 4
];

//aqui exibimos o título do jogo e deixamos centralizado
document.write('<h1>JOGUE TRUCO</h1>');
document.write('<h3>Cartas sorteadas</h3>');

// Exibe as cartas de cada jogador
for (let i = 0; i < jogadores.length; i++) {
    document.write(`<div><strong><h2>Cartas do Jogador ${i + 1}:</h2></strong> `);
    jogadores[i].forEach(carta => {
        document.write(`<img src="img/carta${carta}.png" alt="Carta ${carta}" width="80"> `);
    });
    document.write("</div><br>");
}
