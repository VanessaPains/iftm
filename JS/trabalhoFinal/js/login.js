import { consultarUser } from "./storage.js";

window.addEventListener("DOMContentLoaded", function () {

    const btnEntrar = document.getElementById("btnEntrar");
    const usuario = document.getElementById("usuario");
    const senha = document.getElementById("senha");

    const CHAVE = "usuariosJogo";

    btnEntrar.addEventListener("click", () => {

        const resultado = consultarUser(CHAVE, {
            usuario: usuario.value,
            senha: senha.value
        });

        // Se login ok → mostrar alerta e redirecionar quando clicar no botão
        if (resultado.sucesso) {

            // Salva quem está logado
            localStorage.setItem("usuarioLogado", usuario.value);

            alertWifi(resultado.mensagem, false, 0, "", 30, "jogo.html"); 
        }
        else {
            // Se login NÃO ok → apenas mostra a mensagem, sem redirecionar
            alertWifi(resultado.mensagem, false, 0, "", 30, "");
        }
    });
});
