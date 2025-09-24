btn = document.getElementById("btnDobro");
txtValor = document.getElementById("txtValor");

btn.addEventListener("click", exibirDobro);

//para eu exibir o dobro do valor digitado no campo de texto
function exibirDobro() {
    txtResultado.value = (txtValor.value) * 2;
}
