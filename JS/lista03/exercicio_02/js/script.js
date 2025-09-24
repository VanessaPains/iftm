btn = document.getElementById("btnExibir");
txtNome = document.getElementById("txtNome");

btn.addEventListener("click", exibirNome);

//para exibir o nome digitado no campo de texto em letras maiúsculas
function exibirNome() {
    alert(txtNome.value.toUpperCase());
}


