//aui esta os elementos da pagina que serao manipulados que sao o personagem e a mensagem
//que ira aparecer abaixo do personagem
personagem = document.getElementById("personagem");
mensagem = document.getElementById("mensagem");


//esse variavel ira servir para controlar se o estado do personagem esta fixo ou nao
//se estiver fixo, o personagem nao ira mudar de estado ao 
// passar o mouse por cima ou tirar o mouse de cima
//se nao estiver fixo, o personagem ira mudar de estado ao passar o 
// mouse por cima ou tirar o mouse de cima
estadoFixo = false;

//essa é a funcao que ira ser chamada quando o usuario tirar o mouse de cima do personagem
//ela ira mudar o estado do personagem para pensativo e mudar a mensagem para
//"zzzzzzzzz!"
function estadoPensativo() {
    if (!estadoFixo) {
        personagem.src = "img/Pensativo-transparente.png";
        mensagem.textContent = "zzzzzzzzz!";
        personagem.className = "";
    }
}

//essa é a funcao que ira ser chamada quando o usuario passar o mouse por cima do personagem
//ela ira mudar o estado do personagem para assustado e mudar a mensagem para
//"O que você quer?"
function estadoAssustado() {
    if (!estadoFixo) {
        personagem.src = "img/Assustado-transparente.png";
        mensagem.textContent = "O que você quer?";
        personagem.className = "";
    }
}

//essa é a funcao que ira ser chamada quando o usuario nao digitar nada ou cancelar o prompt
//ela ira mudar o estado do personagem para nervoso, mudar a mensagem para
//"Não me faça perder o meu tempo!" e adicionar a classe de animação tremer
function estadoNervoso() {
    personagem.src = "img/Nervoso-transparente.png";
    mensagem.textContent = "Não me faça perder o meu tempo!";
    personagem.className = "tremer";
    estadoFixo = true;
    
}

//essa é a funcao que ira ser chamada quando o usuario digitar o nome
//ela ira mudar o estado do personagem para alegre, mudar a mensagem para
//"nome, seja bem-vindo!" e adicionar a classe de animação mexerDeUmLadoParaOutro
function estadoAlegre(nome) {
    personagem.src = "img/Alegre-transparente.png";
    mensagem.textContent = `${nome}, seja bem-vindo!`;
    personagem.className = "mexerDeUmLadoParaOutro";
    estadoFixo = true;
}

//aqui sera os eventos que serve para chamar as funcoes de estado
personagem.addEventListener("mouseover", estadoAssustado);//mouseover = passar o mouse por cima
personagem.addEventListener("mouseout", estadoPensativo);//mouseout = tirar o mouse de cima

//aqui ao clicar no personagem, ele pede o nome e dependendo do que for digitado
//ele ira chamar a funcao de estado correspondente
//ou seja, se for vazio ou cancelar, chama a funcao de estadoNervoso
//se for digitado algo, chama a funcao de estadoAlegre
personagem.addEventListener("click", () => {
    nome = prompt("Digite seu nome:");
    estadoFixo = false; // Libera para novo estado

    if (nome === null || nome.trim() === "") {
        estadoNervoso();
        

    } else {
        estadoAlegre(nome.trim());
        
        
    }
    
});

// Estado inicial
estadoPensativo();


