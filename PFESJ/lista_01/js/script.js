window.addEventListener('DOMContentLoaded', () => { // Executa quando o DOM estiver carregado
	const idades = [12, 45, 18, 23, 34, 17, 65]; // Vetor de idades de exemplo

	// a) Soma das idades — usando reduce e arrow function
	const somaIdades = idades.reduce((acumulador, atual) => acumulador + atual, 0); // Soma todos os valores do vetor
	const resSoma = document.getElementById('res-soma'); // O res-soma vem a do HTML da ID que foi declarada. Seleciona elemento onde exibiremos a soma
	if (resSoma) resSoma.textContent = `a) Soma das idades: ${somaIdades}`; // Atualiza o texto do elemento com a soma

	// b) Média aritmética simples — usando arrow function
	const mediaAritmetica = somaIdades / idades.length; // Calcula média simples
	const resMedia = document.getElementById('res-media'); // O res-media vem a do HTML da ID que foi declarada. Seleciona elemento onde exibiremos a média
	if (resMedia) resMedia.textContent = `b) Média aritmética: ${mediaAritmetica.toFixed(2)}`; // Exibe média com 2 casas decimais

	// c) Maior idade — usando reduce e arrow function
	const idadeMaxima = idades.reduce((maximo, atual) => (atual > maximo ? atual : maximo), idades[0]); // Encontra o maior valor
	const resMaior = document.getElementById('res-maior'); // O res-maior vem a do HTML da ID que foi declarada. Seleciona elemento para exibir a maior idade
	if (resMaior) resMaior.textContent = `c) Maior idade: ${idadeMaxima}`; // Exibe maior idade

	// d) Idades ímpares — usando filter e arrow function
	const idadesImpares = idades.filter(idade => idade % 2 !== 0); // Filtra números ímpares
	const resImpares = document.getElementById('res-impares'); // O res-impares vem a do HTML da ID que foi declarada. Seleciona elemento para exibir as idades ímpares
	if (resImpares) resImpares.textContent = `d) Idades ímpares: ${idadesImpares.length ? idadesImpares.join(', ') : 'Nenhuma'}`; // Exibe lista ou 'Nenhuma'

	// e) Verificar se todos são maiores de idade (>= 18) — usando every e arrow function
	const todosMaioresDeIdade = idades.every(idade => idade >= 18); // Checa se todos são >= 18
	const resTodosMaiores = document.getElementById('res-todos-maiores'); // O res-todos-maiores vem a do HTML da ID que foi declarada. Seleciona elemento para exibir o resultado
	if (resTodosMaiores) resTodosMaiores.textContent = `e) Todos maiores de idade? ${todosMaioresDeIdade}`; // Exibe true/false

	// f/g/h — entrada do usuário para idade mínima e operações relacionadas
	const inputIdadeMinima = document.getElementById('idadeMinima'); // O idadeMinima vem a do HTML da ID que foi declarada. Campo de entrada para idade mínima
	const botaoVerificarIdadeMinima = document.getElementById('verificarIdadeMinima'); // O verificarIdadeMinina vem do HTML da ID que foi declarada. Botão que dispara verificações
	const resTodosMaioresValor = document.getElementById('res-todos-maiores-valor'); // O res-todos-maiores-valor vem a do HTML da ID que foi declarada. Elemento para exibir resultado (f)
	const resMaioresOuIguais = document.getElementById('res-maiores-ou-iguais'); // O res-maiores-ou-iguais vem a do HTML da ID que foi declarada. Elemento para exibir lista (g)
	const resMediaMaioresOuIguais = document.getElementById('res-media-maiores-ou-iguais'); // O res-media-maiores-ou-iguais vem a do HTML da ID que foi declarada. Elemento para exibir média (h)

	if (botaoVerificarIdadeMinima && inputIdadeMinima && resTodosMaioresValor) { // Verifica se elementos existem
		botaoVerificarIdadeMinima.addEventListener('click', () => { // Adiciona listener ao botão
			const valor = parseInt(inputIdadeMinima.value, 10); // Lê e converte o valor do input para inteiro
			if (Number.isNaN(valor)) { // Valida entrada
				resTodosMaioresValor.textContent = `f) Valor inválido`; // Mostra erro se inválido
				return; // Sai do handler
			}

			// f) Verificar se todas as idades são >= valor informado pelo usuário — usando every()
			const todosMaiorOuIgual = idades.every(idade => idade >= valor); // Checa condição para todos
			resTodosMaioresValor.textContent = `f) Todos >= ${valor}? ${todosMaiorOuIgual}`; // Exibe resultado (true/false)

			// g) Exibir todas as idades maiores ou iguais ao valor informado — usando filter()
			const maioresOuIguais = idades.filter(idade => idade >= valor); // Filtra idades >= valor
			if (resMaioresOuIguais) resMaioresOuIguais.textContent = `g) Idades >= ${valor}: ${maioresOuIguais.length ? maioresOuIguais.join(', ') : 'Nenhuma'}`; // Exibe lista ou 'Nenhuma'

			// h) Média das idades das pessoas com idade >= valor informado — usar filter + reduce
			if (resMediaMaioresOuIguais) { // Se elemento existe
				if (maioresOuIguais.length === 0) { // Se não houver valores
					resMediaMaioresOuIguais.textContent = `h) Média: Nenhuma`; // Exibe 'Nenhuma'
				} else {
					const somaMaiores = maioresOuIguais.reduce((acc, cur) => acc + cur, 0); // Soma as idades filtradas
					const mediaMaiores = somaMaiores / maioresOuIguais.length; // Calcula média das filtradas
					resMediaMaioresOuIguais.textContent = `h) Média das idades >= ${valor}: ${mediaMaiores.toFixed(2)}`; // Exibe média com 2 casas
				}
			}
		});
	}
});
