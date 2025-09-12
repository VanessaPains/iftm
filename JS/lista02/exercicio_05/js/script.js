// aqui vamos solicitar ao usuário o número de passageiros
numPassageiros = parseInt(prompt("Digite o número de passageiros:"));

// aqui crio um array vazio para armazenar os nomes
nomes = [];

// aqui crio um array vazio para armazenar as idades
idades = [];

// aqui vamos fazer um loop para coletar os nomes e idades de cada passageiro
for (i = 0; i < numPassageiros; i++) {
    // aqui vamos solicita o nome do passageiro
    nome = prompt("Digite o nome do passageiro " + (i + 1) + ":");
    nomes.push(nome); // Adiciona o nome ao array de nomes

    // aqui vamos solicita a idade do passageiro
    idade = parseInt(prompt("Digite a idade de " + nome + ":"));
    idades.push(idade); // Adiciona a idade ao array de idades
}

//o OF serve para percorrer todos os elementos do array
// aqui vamos calcular a soma das idades
somaIdades = 0;
for (idade of idades) {
    somaIdades += idade;
}
mediaIdades = somaIdades / numPassageiros;


// aqui vamos calcula a idade média
mediaIdades = somaIdades / numPassageiros;

// aqui vamos sorteia um passageiro para ganhar o almoço
// o Math.random() gera número decimal entre 0 e 1
// ai multiplicamos pelo tamanho do array e usamos Math.floor() para obter índice válido
indiceSorteado = Math.floor(Math.random() * nomes.length);
vencedor = nomes[indiceSorteado];

// aqui vamos exibe todos os passageiros para conferir
document.write("<h2>Passageiros cadastrados:</h2>");
for (i = 0; i < nomes.length; i++) {
    document.write((i + 1) + ". " + nomes[i] + " - " + idades[i] + " anos<br>");
}

// ai vamos exibe os resultados na página
document.write("<h2>Resultado da excursão</h2>");
document.write("Idade média dos passageiros: " + mediaIdades.toFixed(2) + "<br>");
document.write("Passageiro sorteado para ganhar o almoço: " + vencedor);
