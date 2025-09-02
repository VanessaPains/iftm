//aqui vou solicita os valores RGB
var r = parseInt(prompt(`Digite o valor de R (0 a 255):`), 10);
var g = parseInt(prompt(`Digite o valor de G (0 a 255):`), 10);
var b = parseInt(prompt(`Digite o valor de B (0 a 255):`), 10);

//aqui fazermos para que os valores fiquem no intervalo [0,255]
if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    document.write(`<p style='color:red; text-align:center;'>Valores inválidos! Digite apenas números entre 0 e 255.</p>`);
} else {
    //aqui vou monta a cor em formato rgb(r,g,b)
    var cor = `rgb(${r},${g},${b})`;

    //aqui eu vou mostra o texto com a cor escolhida
    document.write(`<h1 style='color:${cor}; text-align:center;'>Fundamentos de Web Design II</h1>`);
}
