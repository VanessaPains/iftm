// aqui solicita usuario o valor mínimo (N)
n = parseInt(prompt("Digite o valor mínimo (N):"));

// aqui solicita usuario o valor máximo (M)
m = parseInt(prompt("Digite o valor máximo (M):"));

// Verifica apenas se N é menor que M
if (n < m) {
    // o Math.random() gera número aleatório entre 0 e 1
    // dai multiplicamos pelo tamanho do intervalo: (M - N + 1)
    // o Math.floor() arredonda para baixo
    // ai somamos N para que o menor valor seja N e o maior seja M
    numero = (Math.random() * (m - n + 1)) + n;

    // aqui eu exibo o número aleatório no corpo da página
    document.write("Número sorteado entre " + n + " e " + m + ": " + numero);
} else {
    // aqui caso N seja maior ou igual a M
    document.write("Erro: o valor mínimo deve ser menor que o valor máximo.");
}
