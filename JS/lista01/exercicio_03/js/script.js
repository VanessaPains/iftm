//vai solicita o nome completo
var nome = prompt(`Digite seu nome completo:`);

//vamos solicita a idade
var idade = parseInt(prompt(`Digite sua idade:`), 10);

//vou so Verifica se é maior ou igual a 18 anos
if (idade >= 18) {
    alert(nome + `, você já POSSUI idade para tirar carteira de motorista.`);
} else {
    var falta = 18 - idade;
    alert(nome + `, você ainda NÃO POSSUI idade para tirar carteira, ainda falta(m) ${falta} ano(s).`);
}
