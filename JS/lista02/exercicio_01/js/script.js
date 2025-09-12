
// A função Math.random() gera um número aleatório decimal entre 0 e 1
// Exemplo: 0.1234, 0.9876...

// Multiplicamos por 10 para "aumentar" esse intervalo para 0 até 9.999...
// Exemplo: 0.9876 * 10 = 9.876

// Math.floor() arredonda o número para baixo (descarta as casas decimais)
// Exemplo: Math.floor(9.876) = 9

// Somamos +1 para que o intervalo vá de 1 até 10
// (sem o +1 ficaria de 0 até 9)
//ficaria assim se fosse para arredondar
//numero = Math.floor(Math.random() * 10) + 1;

numero = (Math.random() * 10) + 1;

// aqui o body sera escrito com document.write() - esta em desuso
// ele mostra o numero aleatorio
document.write("Número sorteado aleatoriamente: " + numero);
