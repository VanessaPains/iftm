//  aqui vamos sorteia um número entre 1 e 6
numero = Math.floor(Math.random() * 6) + 1;

// aqui vou criar um array com os links das imagens correspondentes a cada número
// aqui vamos substitua os links abaixo pelas imagens que desejar
imagens = [
    "img/nro_01.png", // índice 0 -> número 1
    "img/nro_02.png", // número 2
    "img/nro_03.png", // número 3
    "img/nro_04.png", // número 4
    "img/nro_05.png", // número 5
    "img/nro_06.png"  // número 6
];

//  aqui  como o array começa em índice 0, usamos (numero - 1)
imagemSorteada = imagens[numero - 1];

// agora eu exibe a imagem correspondente ao número sorteado
document.write("<h2>Dado sorteado: " + numero + "</h2>");
document.write("<img src='" + imagemSorteada + "' alt='Dado " + numero + "' width='100'>");
