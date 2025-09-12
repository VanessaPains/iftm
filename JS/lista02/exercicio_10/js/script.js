// aqui o número total de cartas disponíveis
const totalCartas = 27;

// aqui vamos sorteia um número aleatório entre 1 e 27
cartaSorteada = Math.floor(Math.random() * totalCartas) + 1;

// aqui vamos define o caminho da imagem correspondente
caminhoImagem = `img/carta${cartaSorteada}.png`;

// aqui vou exibe a carta sorteada no corpo da página
document.write("<h2>Carta Sorteada:</h2>");
document.write(`<img src="${caminhoImagem}" alt="Carta ${cartaSorteada}" width="150">`);
document.write(`<p>Esta é a carta número: ${cartaSorteada}</p>`);
