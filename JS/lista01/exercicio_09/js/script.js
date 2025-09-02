//vamos solicita a expressão matemática ao usuário
var expressao = prompt(`Digite uma expressão matemática, por exemplo: ((5*8)-9)`);

try {
    //aqui vamos valia a expressão usando eval
    var resultado = eval(expressao);

    //aqui vou mostra o resultado em um alerta
    alert(`O resultado da expressão é: ${resultado}`);
} catch (erro) {
    //aqui mensagem de erro caso a expressão seja inválida
    alert(`Expressão inválida! Por favor, digite uma expressão matemática correta.`);
}
