btnLimpar = document.getElementById("btnLimpar");
btnEntrar = document.getElementById("btnEntrar");

btnLimpar.addEventListener("click", limpar);
btnEntrar.addEventListener("click", entrar);


//para validar o formulario
function entrar() {
    login = document.getElementById("login").value.trim();
    senha = document.getElementById("senha").value;
    confirmaSenha = document.getElementById("confirmaSenha").value;

    //1ª - Primeira validação: login não pode estar vazio
    if (login === "") {
        alert("O campo Login não pode estar vazio!");
        return;
    }

    //2ª - Segunda validação: senhas iguais
    if (senha !== confirmaSenha) {
        alert("As senhas não conferem! Digite novamente.");
        document.getElementById("senha").value = "";
        document.getElementById("confirmaSenha").value = "";
        return;
    }

    alert("Todos os campos foram digitados corretamente!");
};

//para limpar o formulario
function limpar() {
    document.getElementById("login").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("confirmaSenha").value = "";
};
