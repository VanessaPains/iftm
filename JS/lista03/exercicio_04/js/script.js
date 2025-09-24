btn = document.getElementById("btnSoma");
nota1 = parseFloat(document.getElementById("nota1").value);
nota2 = parseFloat(document.getElementById("nota2").value);

btn.addEventListener("click", exibirSoma);

function exibirSoma() {
    //vo pegar os valores digitados
    nota1 = Number(document.getElementById("nota1").value);
    nota2 = Number(document.getElementById("nota2").value);

    //aqui valido o intervalo 0 - 50 para cada bimestre
    if (nota1 < 0 || nota1 > 50 || nota2 < 0 || nota2 > 50) {
        alert("Cada nota bimestral deve estar entre 0 e 50 pontos.");
        return;
    }

    //aqui soma as notas
    soma = nota1 + nota2;

    //vamo verifica se está aprovado
    if (soma >= 60) {
        alert("APROVADO!");
    } else {
        alert("REPROVADO.");
    }
}



