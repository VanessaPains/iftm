// aqui vamos criar um array vazio para guardar os números
numeros = [];

// aqui fazemos um for para sortear 6 números aleatórios entre 1 e 60
for (i = 0; i < 6; i++) {
    numero = Math.floor(Math.random() * 60) + 1;
    numeros.push(numero); //ele adiciona ao array
}

//aqui vamos exibe os números no corpo da página
//o JOIN serve para colocar um separador entre os números
document.write("Sugestão de números da Mega-Sena: " + numeros.join(" - "));
