import bcrypt from 'https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/+esm';


//1. vamos carregar a pagina
window.addEventListener('DOMContentLoaded', () => {
    carregarUsuarios();//eu carrego os ususrio com a funcao

    const form = document.getElementById("formLogin");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        validarLogin(username, password);
    });
});

//2.Função que busca o JSON
const carregarUsuarios = async () => {
    //esse minha url la no github, onde tem o json com os usuarios e as senhas
    const url = "https://vanessapains.github.io/iftm/PFESJ/APIs/login/senha.json";

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao acessar o JSON");
        }

        const usuarios = await resposta.json();
        console.log("Usuários carregados:");
        console.log(usuarios);

        //gerar as hashs dos usuários
        gerarHashUsuarios(usuarios);

    } catch (erro) {
        console.log("Erro ao ler o JSON:", erro.message);
    }
};

//3. funcao que gera hash (fica fora, separada)
const gerarHashUsuarios = (usuarios) => {

    const usuariosHash = usuarios.map(user => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);

        return {
            username: user.username,
            password: hash
        };
    });

    //so pra mostrar no console f12
    console.log("Usuários com senha criptografada:");
    console.log(usuariosHash);
};

//----------------------------------------------------
//AGORA PARETE DO FORMULARIO
//4. funcao para validar o login (fica fora, separada)

const validarLogin = async (username, password) => {
    //ese meu url com as senha criptocrafadas, salva no meu github
    const url = "https://vanessapains.github.io/iftm/PFESJ/APIs/login/senhaBcrypt.json";

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao acessar JSON");
        }

        const usuarios = await resposta.json();

        const usuarioEncontrado = usuarios.find(u => u.username === username);//find para achar o usuario
        //se não achar os usuarios, mostra a mensagem de erro
        if (!usuarioEncontrado) {
            mostrarMensagem("Usuário não encontrado", "red");
            alert("Usuário não encontrado", "red");
            return;
        }

        const senhaValida = bcrypt.compareSync(password, usuarioEncontrado.password);
        //se a senha for valida ou não. mostrar erro ou sucesso
        if (senhaValida) {
            mostrarMensagem("Login realizado com sucesso!", "green");
            alert("Login realizado com sucesso!", "green");
        } else {
            mostrarMensagem("Senha incorreta", "red");
            alert("Senha incorreta", "red");
        }

    } catch (erro) {
        console.log("Erro no login:", erro.message);//se tudo der errado mostrar o porque
    }
};

//para testar. deu certo. alem de ser alert mostrar é uma mensagem abaixo no formulario.
const mostrarMensagem = (texto, cor) => {
    const msg = document.getElementById("mensagem");
    msg.innerText = texto;
    msg.style.color = cor;
};

