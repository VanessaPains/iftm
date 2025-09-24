
btnSomar = document.getElementById("btnSoma");
btnSubtrair = document.getElementById("btnSub");
btnMultiplicar = document.getElementById("btnMult");
btnDividir =  document.getElementById("btnDiv");


btnSomar.addEventListener("click", somar);
btnSubtrair.addEventListener("click", subtrair);
btnMultiplicar.addEventListener("click", multiplicar);
btnDividir.addEventListener("click", dividir);

//para eu somar
function somar() {
    valor1 = document.getElementById("valor1").value;
    valor2 = document.getElementById("valor2").value;

    if (valor1 === "" || valor2 === "") {
        alert("Digite os dois valores!");
        return;
    }

    document.getElementById("resultado").value = Number(valor1) + Number(valor2);
}

//para subtrair
function subtrair() {
    valor1 = document.getElementById("valor1").value;
    valor2 = document.getElementById("valor2").value;

    if (valor1 === "" || valor2 === "") {
        alert("Digite os dois valores!");
        return;
    }

    document.getElementById("resultado").value = (valor1) - (valor2);
}

//para multiplicar
function multiplicar() {
    valor1 = document.getElementById("valor1").value;
    valor2 = document.getElementById("valor2").value;

    if (valor1 === "" || valor2 === "") {
        alert("Digite os dois valores!");
        return;
    }

    document.getElementById("resultado").value = (valor1) * (valor2);
}

//para eu dividir
function dividir() {
    valor1 = document.getElementById("valor1").value;
    valor2 = document.getElementById("valor2").value;

    if (valor1 === "" || valor2 === "") {
        alert("Digite os dois valores!");
        return;
    }

    if ((valor2) === 0) {
        alert("Não é possível dividir por zero!");
        return;
    }

    document.getElementById("resultado").value = (valor1) / (valor2);
}
