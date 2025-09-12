// prompt() exibe uma caixa de diálogo pedindo ao usuário que digite algo
// aqui pedimos para ele informar o valor máximo N
n = prompt("Digite o valor máximo (N) para gerar um número aleatório:");

// aqui o parseInt() converte o valor digitado (que é string) para número inteiro
n = parseInt(n);

// aqui eu verificamos se o valor informado é um número válido
if (!isNaN(n) && n > 0) {
    // o Math.random() gera um número decimal aleatório entre 0 e 1
    // dai multiplicamos pelo valor máximo N e usamos Math.floor()
    // para arredondar para baixo. Somamos +1 para que o intervalo vá de 1 até N
    numero = Math.floor(Math.random() * n) + 1;

    // aqui exibe o número aleatório no corpo da página
    document.write("Número sorteado entre 1 e " + n + ": " + numero);
} else {
    // aqui coqueii caso o usuário não informe um número válido
    document.write("Por favor, digite um número válido maior que 0.");
}
