// aqui vamos solicita o número de pessoas
numPessoas = parseInt(prompt("Digite o número de pessoas do grupo:"));

// aqui criamos um um array vazio para armazenar os nomes
nomes = [];

// aqui criei um Loop para coletar os nomes
for (i = 0; i < numPessoas; i++) {
    nome = prompt("Digite o nome da pessoa " + (i + 1) + ":");
    nomes.push(nome);
}

// aqui tem a função para embaralhar (Fisher-Yates)
function embaralhar(array) {
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// aqui vamos embaralha os nomes
embaralhar(nomes);

// Pega o div onde a lista será exibida
divLista = document.getElementById("lista-apresentacao");

// aqui vamos cria uma lista ordenada
ol = document.createElement("ol");

nomes.forEach(nome => {
    li = document.createElement("li");
    li.textContent = nome;
    ol.appendChild(li);
});

divLista.appendChild(ol);
