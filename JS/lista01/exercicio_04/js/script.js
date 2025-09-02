//eu vou solicita as notas do 1º e 2º bimestres
var nota1 = parseFloat(prompt(`Digite a nota do 1º bimestre:`));
var nota2 = parseFloat(prompt(`Digite a nota do 2º bimestre:`));

//vou calcula a soma das notas
var soma = nota1 + nota2;

//vamos verifica se o aluno foi aprovado ou reprovado
if (soma >= 60.0) {
    alert(`Parabéns! Você foi APROVADO com ${soma} pontos.`);
} else {
    var falta = 60.0 - soma;
    alert(`Você foi REPROVADO com ${soma} pontos.\nFaltaram ${falta.toFixed(1)} ponto(s) para ser aprovado.`);
}
