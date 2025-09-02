//aqui solicita um valor inteiro positivo maior que zero. 
//o 10 serve para converter a string para inteiro
var x = parseInt(prompt(`Digite um número inteiro positivo (maior que zero):`), 10);

//aqui vai valida se o número é maior que zero e é um número válido 
//o isNaN serve para valida se é um número
if (isNaN(x) || x <= 0) {
    alert("Número inválido! Por favor, digite um inteiro maior que zero.");
} else {
    //aqui solicita o nome completo
    var nome = prompt("Digite seu nome completo:");

    //aqui exibe o nome X vezes no corpo da página, cada um em uma linha
    for (var i = 0; i < x; i++) {
        document.write(nome + "<br>");
    }
}
