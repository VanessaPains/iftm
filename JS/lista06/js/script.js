window.addEventListener("DOMContentLoaded", function () {

    //CONST = quer dizer que é uma varial constante, vai ser sempre a mesma coisa
    //não pode ser alterada
    const TOTAL_CARTAS = 27;

    //const nivelDif = [4, 8, 12]; //4 pares = 8 cartas, 8 pares = 16 cartas, 12 pares = 24 cartas

    function main() {
        //btnSelecionar = this.document.getElementById("btnSelecionar");

        //dificuldade = this.document.getElementById("dificuldade");
        //btnSelecionar.addEventListener("click", exibirNivelDificuldade);

        //Parte 1
        var cartasBaralho = [];//vetor é sempre passado como referencia
        gerarCartasBaralho(cartasBaralho);
        console.log(cartasBaralho);
        document.getElementById("resultado_1").textContent = cartasBaralho;

        //Parte 2
        var paresCartas = [];
        sortearCartas(cartasBaralho, paresCartas);
        console.log(paresCartas);
        document.getElementById("resultado_2").textContent = paresCartas;

        //Parte 3
        var vetorEmbaralhado = [];
        vetorEmbaralhado = embaralharCartas(paresCartas);
        console.log(vetorEmbaralhado);
        document.getElementById("resultado_3").textContent = vetorEmbaralhado;

        //Parte 4
        console.log("Mostrando cartas:", vetorEmbaralhado);
        exibirCartas(vetorEmbaralhado);
        document.getElementById("container_cartas");

        //Parte 5
        //exibirNivelDificuldade();

    }

    ///Parte 1
    //Criar um vetor contendo números de 1 a 27. Os números corresponderão às cartas contidas 
    //no link acima. Exemplo de como ficará o vetor: vetorCartas = [1, 2, 3, 4, 5, 6, ...27]//
    function gerarCartasBaralho(cartasBaralho) {
        for (let i = 1; i <= TOTAL_CARTAS; i++) {
            cartasBaralho.push(i);
        }
    }



    //Parte 2
    //Criar um vetor contendo 4 pares de cartas sorteadas aleatoriamente dovetor criado na parte 1. 
    //Exemplo de como ficará o vetor: vetorPares = [3, 3, 15, 15, 27, 27, 1, 1] 
    //Obs.: As cartas podem se repetir. Ou seja, o par pode ser o mesmo de outro par.
    function sortearCartas(cartasBaralho, paresCartas) {
        for (let i = 0; i < 4; i++) {
            //sorteia uma carta aleatória
            let carta = cartasBaralho.splice(Math.floor(Math.random() * cartasBaralho.length), 1)[0];

            //adiciona duas vezes (faz o par)
            paresCartas.push(carta);
            paresCartas.push(carta);
        }
    }


    //Parte 3
    //Embaralhar as cartas dentro do vetor gerado na etapa anterior. Em relação aos 
    //exemplos da etapa anterior, o resultado ficaria assim:
    //vetorParesEmbaralhados = [1,21, 1, 21, 14, 7, 7, 14] vetorParesEmbaralhados = [9, 11, 8, 23, 23, 8, 11, 9]//
    function embaralharCartas(vetor) {
        let vetorAleatorio = [];
        let copiaVetor = [...vetor];
        for (let i = 0; i < vetor.length; i++) {
            vetorAleatorio.push(copiaVetor.splice(Math.floor(Math.random() * copiaVetor.length), 1)[0]);
        }
        return vetorAleatorio;
    }


    //Parte 4
    //Utilizar o vetor gerado na etapa anterior para exibir na página as
    //imagens das cartas do baralho correspondentes aos números armazenados 
    //no vetor. Por exemplo, em relação aos vetores abaixo, veja como ficaria 
    //as cartas na interface (página web):
    //vetorParesEmbaralhados = [1,21, 1, 21, 14, 7, 7, 14]//
    function exibirCartas(vetorEmbaralhado) {

        //vai pega o elemento HTML onde as cartas serão exibidas
        let container = document.getElementById("container_cartas");

        for (let i = 0; i < vetorEmbaralhado.length; i++) {
            let carta = document.createElement("img");
            carta.src = "img/" + vetorEmbaralhado[i] + ".png";
            carta.className = "carta1"; // Adiciona uma classe para estilização
            container.appendChild(carta);
        }
    }


    //Parte 5
    /*function exibirNivelDificuldade(){
        if(dificuldade.selectedIndex == 0){
            alert("Selecione um nível de dificuldade que deseja!");
        } else {
            sortearCartas(nivelDif[dificuldade.selectedIndex - 1]);
        }
    }*/
    
    
    main();

});
