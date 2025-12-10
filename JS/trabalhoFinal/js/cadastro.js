import { cadastrarUser } from "./storage.js";

const CHAVE = "usuariosJogo";

window.addEventListener("DOMContentLoaded", function () {

    const usuario = document.getElementById("usuario");
    const senha = document.getElementById("senha");
    const confirmar = document.getElementById("confirmarSenha");
    const btnCadastrar = document.getElementById("btnCadastrar");

    btnCadastrar.addEventListener("click", () => {

        if (senha.value !== confirmar.value) {
            alert("As senhas não coincidem!"); // ← trocado
            return;
        }

        const resultado = cadastrarUser(CHAVE, {
            usuario: usuario.value,
            senha: senha.value
        });

        alert(resultado.mensagem);  // ← trocado

        if (resultado.sucesso) {
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        }
    });
});
