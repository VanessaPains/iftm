window.addEventListener("DOMContentLoaded", function () {

    //aqui são os elementos de entradas que representa dos dados do formulario html
    let txtDataNasc = document.getElementById("txtDataNasc");
    let txtCpf = document.getElementById("txtCpf");
    let txtNrMatricula = document.getElementById("txtNrMatricula");
    let txtCodDisciplinaV1 = document.getElementById("txtCodDisciplinaV1");
    let txtCodDisciplinaV2 = document.getElementById("txtCodDisciplinaV2");
    let txtCodDisciplinaV3 = document.getElementById("txtCodDisciplinaV3");
    let txtCodDisciplinaV4 = document.getElementById("txtCodDisciplinaV4");
    let txtNomeCampus = document.getElementById("txtNomeCampus");
    let txtTelefoneV1 = document.getElementById("txtTelefoneV1");
    let txtTelefoneV2 = document.getElementById("txtTelefoneV2");
    let txtAltura = document.getElementById("txtAltura");
    let txtFaturamentoAnual = document.getElementById("txtFaturamentoAnual");
    let txtCronometro = document.getElementById("txtCronometro");
    let txtSenha = document.getElementById("txtSenha");

    document.getElementById("btnValidarDataNasc").addEventListener("click", validarDataNasc);
    document.getElementById("btnValidarCpf").addEventListener("click", validarCpf);
    document.getElementById("btnValidarNrMatricula").addEventListener("click", validarNrMatricula);
    document.getElementById("btnValidarCodDisciplinaV1").addEventListener("click", validarCodDisciplinaV1);
    document.getElementById("btnValidarCodDisciplinaV2").addEventListener("click", validarCodDisciplinaV2);
    document.getElementById("btnValidarCodDisciplinaV3").addEventListener("click", validarCodDisciplinaV3);
    document.getElementById("btnValidarCodDisciplinaV4").addEventListener("click", validarCodDisciplinaV4);
    document.getElementById("btnValidarNomeCampus").addEventListener("click", validarNomeCampus);
    document.getElementById("btnValidarTelefoneV1").addEventListener("click", validarTelefoneV1);
    document.getElementById("btnValidarTelefoneV2").addEventListener("click", validarTelefoneV2);
    document.getElementById("btnValidarAltura").addEventListener("click", validarAltura);
    document.getElementById("btnValidarFaturamentoAnual").addEventListener("click", validarFaturamentoAnual);
    document.getElementById("btnValidarCronometro").addEventListener("click", validarCronometro);
    document.getElementById("btnValidarSenha").addEventListener("click", validarSenha);
    


    //a)- validadar a data de nascimento no formato dd/mm/aaaa ou dd/mm/aa.
    function validarDataNasc() {
        let padrao = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4}|\d{2})$/;

        if (padrao.test(txtDataNasc.value)) {
            alert("A Data de Nascimento: " + txtDataNasc.value + " é Valida.");
        } else {
            alert("A Data de Nascimento: " + txtDataNasc.value + " é Invalida.");
        }
    }

    //b)- validar o CPF no formato xxx.xxx.xxx-xx
    function validarCpf(){
        let padrao = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

        if (padrao.test(txtCpf.value)) {
            alert("O CPF: " + txtCpf.value + " é Valido.");
        } else {
            alert("O CPF: " + txtCpf.value + " é Invalido.");
        }
    }

    //c)- validar o numero de matricula - IFTM-xxx/xxx-yy ou iftm-xxx/xxx-yy.
    function validarNrMatricula(){
        let padrao = /^(I|i)(F|f)(T|t)(M|m)-\d{3}\/\d{3}-[a-z]{2}$/i;

        if (padrao.test(txtNrMatricula.value)) {
            alert("O Número de Matrícula: " + txtNrMatricula.value + " é Valido.");
        } else {
            alert("O Número de Matrícula: " + txtNrMatricula.value + " é Invalido.");
        }
    }

    //d)- validar codigo disciplina MT-xx.xxx-IFTM ou mt-xx.xxx-iftm
    function validarCodDisciplinaV1() {
        let padrao = /^(M|m)(T|t)-\d{2}\.\d{3}-(I|i)(F|f)(T|t)(M|m)$/i;

        if (padrao.test(txtCodDisciplinaV1.value)) {
            alert("O Código da Disciplina V1: " + txtCodDisciplinaV1.value + " é Valido.");
        } else {
            alert("O Código da Disciplina V1: " + txtCodDisciplinaV1.value + " é Invalido.");
        }
    }

    //e)- validar codigo matricula MT-xx.xxx-IFTM ou MT-xx.xxx-iftm
    function validarCodDisciplinaV2(){
        let padrao = /^[M][T]-\d{2}\.\d{3}-(I|i)(F|f)(T|t)(M|m)$/;

        if (padrao.test(txtCodDisciplinaV2.value)) {
            alert("O Código da Disciplina V2: " + txtCodDisciplinaV2.value + " é Valido.");
        } else {
            alert("O Código da Disciplina V2: " + txtCodDisciplinaV2.value + " é Invalido.");
        }
    }

    //f)- validar codigo matricula M T-xx.xxx-I F T M ou m t-xx.xxx-i f t m - maximo 1 espaco entre as letras {0,1}
    function validarCodDisciplinaV3(){
        let padrao = /^[M|m]\s{1,1}[T|t]-\d{2}\.\d{3}-(I|i)\s{1,1}(F|f)\s{1,1}(T|t)\s{1,1}(M|m)$/i;

        if (padrao.test(txtCodDisciplinaV3.value)) {
            alert("O Código da Disciplina V3: " + txtCodDisciplinaV3.value + " é Valido.");
        } else {
            alert("O Código da Disciplina V3: " + txtCodDisciplinaV3.value + " é Invalido.");
        }
    }

    //g)- validar codivo matricula  - M T-09.015-i f t m Uberlândia ou M T-09.015-i f t m Uberlândia Centro
    function validarCodDisciplinaV4(){
        let padrao = /^[Mm]\s?[Tt]-\d{2}\.\d{3}-\s?[Ii]\s?[Ff]\s?[Tt]\s?[Mm]\s(Uberlândia(?: Centro)?)$/;

        if (padrao.test(txtCodDisciplinaV4.value)) {
            alert("O Código da Disciplina V4: " + txtCodDisciplinaV4.value + " é Valido.");
        } else {
            alert("O Código da Disciplina V4: " + txtCodDisciplinaV4.value + " é Invalido.");
        }
    }

    //h)- validar nome do compus IFTM - IFTM campus Uberlândia ou IFTM campus 09 Uberlândia Centro.
    function validarNomeCampus(){
        let padrao = /^IFTM campus Uberlândia(?: Centro)?$/i;

        if (padrao.test(txtNomeCampus.value)) {
            alert("O Nome do Campus: " + txtNomeCampus.value + " é Valido.");
        } else {
            alert("O Nome do Campus: " + txtNomeCampus.value + " é Invalido.");
        }
    }

    //i)- validar telefone - +55(34)xxxxx-xxxx
    function validarTelefoneV1() {
        let padrao = /^\+\d{2}\(\d{2}\)\d{5}-\d{4}$/;

        if (padrao.test(txtTelefoneV1.value)) {
            alert("O Telefone V1: " + txtTelefoneV1.value + " é Valido.");
        } else {
            alert("O Telefone V1: " + txtTelefoneV1.value + " é Invalido.");
        }
    }

    //j)- validar telefone - +55(34)xxxxx-xxxx ou +55(034)xxxxx-xxxx
    function validarTelefoneV2() {
        let padrao = /^\+\d{2}\(\d{2,3}\)\s?\d{5}-\d{4}$/;
        

        if (padrao.test(txtTelefoneV2.value)) {
            alert("O Telefone V2: " + txtTelefoneV2.value + " é Valido.");
        } else {
            alert("O Telefone V2: " + txtTelefoneV2.value + " é Invalido.");
        }
    }

    //k)- validar altura - 1.50 ou 1,50 até 2.50 ou 2,50
    function validarAltura(){
        let padrao = /^(1[.,](?:[3-9]\d*)|2[.,](?:[0-4]\d*|5))$/;

        if (padrao.test(txtAltura.value)) {
            alert("A Altura: " + txtAltura.value + " é Valida.");
        } else {
            alert("A Altura: " + txtAltura.value + " é Invalida.");
        }
    }

    //l)- validar faturamento anual - R$X.XXX,XX ou R$X.XXX.XXX,XX ou R$X.XXX.XXX.XXX,XX
    function validarFaturamentoAnual(){
        let padrao = /^(?:R\$ ?)?\d{1,3}(?:\.\d{3}){0,3},\d{1,2}$/;

        if (padrao.test(txtFaturamentoAnual.value)) {
            alert("O Faturamento Anual: " + txtFaturamentoAnual.value + " é Valido.");
        } else {
            alert("O Faturamento Anual: " + txtFaturamentoAnual.value + " é Invalido.");
        }
    }

    //m)- validar cronometro - HH:MM:SS:CC (HH 00 a 23, MM 00 a 59, SS 00 a 59, CC 00 a 99)
    function validarCronometro(){
        let padrao = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d:\d{2}$/;
        
        if (padrao.test(txtCronometro.value)) {
            alert("O Cronometro: " + txtCronometro.value + " é Valido.");
        } else {
            alert("O Cronometro: " + txtCronometro.value + " é Invalido.");
        }
    }


    function validarSenha(){
        // deixa eu entender
        // - Dois formatos permitidos: X&W.Y.Z-U,V.T ou X&W.Y-U,V.T (Z é opcional)
        // - X: somente caracteres [A-Za-z0-9._-], deve conter pelo menos um de . _ - e mais pelo menos 5 caracteres alfanuméricos antes do '&'
        // - W: letras de a até p (maiúsculas/minúsculas), ao menos 1
        // - Y: vogais minúsculas, ao menos 1
        // - Z: opcional, letras (qualquer caixa) e/ou dígitos 0-5
        // - U: ao menos 1 caractere que NÃO seja dígito
        // - V: exatamente 2 caracteres não alfanuméricos
        // - T: ao menos 1 caractere diferente de 'a', 'b', '0', '1'

        let padrao = /^(?=(?:[^&]*[A-Za-z0-9]){5,})(?=[^&]*[._-])([A-Za-z0-9._-]+)&([A-Pa-p]+)\.([aeiou]+)(?:\.([A-Za-z0-5]+))?-([^0-9]+),([^A-Za-z0-9]{2})\.([^ab01]+)$/;
;

        //123A0.&de.Ab-/12.c3
        if (padrao.test(txtSenha.value)) {
            alert("A Senha: " + txtSenha.value + " é Valida.");
        } else {
            alert("A Senha: " + txtSenha.value + " é Invalida.");
        }
    }

    
});
