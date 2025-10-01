btnGerarResultado = document.getElementById("btnSortear");

btnGerarResultado.addEventListener("click", gerarSorteio);

function gerarSorteio(){
    //objeto = {propriedade1: valor1, propriedade2: valor2, ...}
    //exemplo de objeto:
    candidatos = [
        { nome: "Jair Messias Bolsonaro", partido: "PL", imagem: "jair_bolsonaro.png" },
        { nome: "Luiz Inácio Lula da Silva", partido: "PT", imagem: "luiz_inacio_lula.png" },
        { nome: "Ciro Gomes", partido: "PDT", imagem: "ciro_gomes.png" },
        { nome: "Simone Tebet", partido: "MDB", imagem: "simone_tebet.png" }
    ];

    vetorIndice = [0, 1, 2, 3];

    numerosVotos = Math.round(Math.random() * 100); // sorteia um número entre 1 e 100
    vetorVotos = [numerosVotos, 100 - numerosVotos]; // vetor que vai armazenar os votos
    indicesSorteados = [];



    //============ cadidato 1 ==================
    //1ª - FORMA DE SORTEAR SEM REPETIÇÃO
    //INICIO
    //indiceCandidatoSorteado1 = Math.floor(Math.random() * vetorIndice.length);// 0 a 3
    //x = vetorIndice.splice(indiceCandidatoSorteado1, 1); // remove o índice sorteado do vetor

    //document.getElementById("candidatoSorteado1").innerHTML = candidatos[x].nome;
    //document.getElementById("partidoCandidato1").innerHTML = candidatos[x].partido;
    //document.getElementById("imagemCandidato1").src = 'img/' + candidatos[x].imagem;
    //FIM

    //2ª - FORMA DE SORTEAR SEM REPETIÇÃO
    //INICIO
    //indiceCandidatoSorteado1 = vetorIndice.splice(Math.floor(Math.random() * vetorIndice.length), 1)[0]; // remove o índice sorteado do vetor

    //document.getElementById("candidatoSorteado1").innerHTML = candidatos[indiceCandidatoSorteado1].nome;
    //document.getElementById("partidoCandidato1").innerHTML = candidatos[indiceCandidatoSorteado1].partido;
    //document.getElementById("imagemCandidato1").src = 'img/' + candidatos[indiceCandidatoSorteado1].imagem;
    //FIM


    //============ cadidato 2 ==================
    //1ª - FORMA DE SORTEAR SEM REPETIÇÃO
    //INICIO
    //indiceCandidatoSorteado2 = Math.floor(Math.random() * vetorIndice.length);// 0 a 3
    //x = vetorIndice.splice(indiceCandidatoSorteado2, 1); // remove o índice sorteado do vetor

    //document.getElementById("candidatoSorteado1").innerHTML = candidatos[x].nome;
    //document.getElementById("partidoCandidato1").innerHTML = candidatos[x].partido;
    //document.getElementById("imagemCandidato1").src = 'img/' + candidatos[x].imagem;
    //FIM

    //2ª - FORMA DE SORTEAR SEM REPETIÇÃO
    //INICIO
    //indiceCandidatoSorteado2 = vetorIndice.splice(Math.floor(Math.random() * vetorIndice.length), 1)[0]; // remove o índice sorteado do vetor

    //document.getElementById("candidatoSorteado2").innerHTML = candidatos[indiceCandidatoSorteado2].nome;
    //document.getElementById("partidoCandidato2").innerHTML = candidatos[indiceCandidatoSorteado2].partido;
    //document.getElementById("imagemCandidato2").src = 'img/' + candidatos[indiceCandidatoSorteado2].imagem;
    //FIM



    //======== FAZ TUDO DE UMA VEZ SÓ ==========
    //3 - ªFORMA DE SORTEAR SEM REPETIÇÃO
    //INICIO
    //para exibir os candidatos sorteados - usando loop com FOR
    for(i = 1; i <= 2; i++){
        indiceCandidatoSorteado = vetorIndice.splice(Math.floor(Math.random() * vetorIndice.length), 1)[0]; 
        indicesSorteados[i - 1] = indiceCandidatoSorteado; // armazena os índices sorteados em um veto
        document.getElementById("candidatoSorteado" + (i)).innerHTML = candidatos[indiceCandidatoSorteado].nome;
        document.getElementById("partidoCandidato" + (i)).innerHTML = candidatos[indiceCandidatoSorteado].partido;
        document.getElementById("imagemCandidato" + (i)).src = 'img/' + candidatos[indiceCandidatoSorteado].imagem;
        document.getElementById("percentualCandidato" + (i)).innerHTML = vetorVotos[i - 1].toFixed(1) + " %";

    }

    if(vetorVotos[0] == vetorVotos[1]){
        document.getElementById("candidatoVencedor").innerHTML = "EMPATE!";
    }else if(vetorVotos[0] > vetorVotos[1]){
        document.getElementById("candidatoVencedor").innerHTML = "Vencedor: " + candidatos[indicesSorteados[0]].nome + " - " + vetorVotos[0].toFixed(1);
    }else{
        document.getElementById("candidatoVencedor").innerHTML = "Vencedor: " + candidatos[indicesSorteados[1]].nome + " - " + vetorVotos[1].toFixed(1);
    }
}


