//eu solicito o nome completo do usuário
var nome = prompt(`Digite seu nome completo:`);

//aqui contamos a quantidade de caracteres (inclui espaços)
var quantidade = nome.length;

//aqui vamos escrever no corpo da página o resultado
document.write(`O nome informado possui ${quantidade} caracteres.`);
