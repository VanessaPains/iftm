import { userTable } from './userTables.js';


window.addEventListener('DOMContentLoaded', () => {

        // EXERCICIO 01
        // 1) Nome e idade maiores de 18 anos
        const nomeIdadeMaioresDeIdade = userTable
                .filter(user => user.idade >= 18)
                .map(user => `${user.nome} (${user.idade} anos)`);

        const resNomeIdadeMaioresDeIdade = document.getElementById('res-nome-idade-maiores-de-idade');
        resNomeIdadeMaioresDeIdade.textContent = `a) Nome e idade maiores de 18 anos: ${nomeIdadeMaioresDeIdade.join(', ')}`;



        // 2) Exibir os nomes de todas as pessoas do sexo masculino
        const nomesMasculinos = userTable
                .filter(user => user.sexo === "M")
                .map(user => user.nome);

        const resNomesMasculinos = document.getElementById('res-nomes-masculinos');
        resNomesMasculinos.textContent = `2) Nomes das pessoas do sexo masculino: ${nomesMasculinos.join(', ')}`;



        // 3) Pessoa com o maior salário
        const pessoaMaiorSalario = userTable.reduce((maior, user) =>
                user.salario > maior.salario ? user : maior
        );

        const resMaiorSalario = document.getElementById('res-maior-salario');
        resMaiorSalario.textContent =
                `3) Pessoa com maior salário: ${pessoaMaiorSalario.nome},
                        Idade: ${pessoaMaiorSalario.idade},
                        Sexo: ${pessoaMaiorSalario.sexo},
                        Salário: ${pessoaMaiorSalario.salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;



        // 4) Há alguma mulher que ganha acima de 5000?
        const existeMulherAcima5000 = userTable.some(user =>
                user.sexo === "F" && user.salario > 5000
        );

        const resMulherAcima5000 = document.getElementById('res-mulher-5000');
        resMulherAcima5000.textContent = `4) Há alguma mulher que ganha acima de R$ 5.000,00? ${existeMulherAcima5000 ? "Sim" : "Não"}`;




        // 5) Média salarial dos homens e das mulheres

        // Mulheres
        const mulheres = userTable.filter(user => user.sexo === "F");
        const mediaMulheres = mulheres.reduce((total, user) => total + user.salario, 0) / mulheres.length;


        // Homens
        const homens = userTable.filter(user => user.sexo === "M");
        const mediaHomens =  homens.reduce((total, user) => total + user.salario, 0) / homens.length;


        const resMediaSalarios = document.getElementById('res-media-salarios');
        resMediaSalarios.textContent = `5) Média salarial: Mulheres: ${mediaMulheres.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} | Homens: ${mediaHomens.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;

});
