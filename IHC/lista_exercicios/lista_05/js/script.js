/**
 * ============================================================================
 * JAVASCRIPT - USABILIDADE EM ELEMENTOS DE FORMULÁRIOS
 * Disciplina: Interface Humano-Computador | Prof. Dr. Wilton de Paula Filho
 * IFTM - Campus Uberlândia Centro
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Referências dos elementos do DOM
  const form = document.getElementById('formAtletismo');
  const primeiroNome = document.getElementById('primeiroNome');
  const sobrenome = document.getElementById('sobrenome');
  const dataNascimento = document.getElementById('dataNascimento');
  const idadeCalculada = document.getElementById('idadeCalculada');
  const peso = document.getElementById('peso');
  const altura = document.getElementById('altura');
  const valorImc = document.getElementById('valorImc');
  const textoImc = document.getElementById('textoImc');
  const cep = document.getElementById('cep');
  const estado = document.getElementById('estado');
  const cidade = document.getElementById('cidade');
  const celular = document.getElementById('celular');
  const telefone = document.getElementById('telefone');
  const tipoProva = document.getElementById('tipoProva');
  const campoProvaOutro = document.getElementById('campo-prova-outro');
  const tipoProvaOutro = document.getElementById('tipoProvaOutro');
  const radioPatrocinioSim = document.getElementById('patrocinio-sim');
  const radioPatrocinioNao = document.getElementById('patrocinio-nao');
  const nomePatrocinador = document.getElementById('nomePatrocinador');
  const dicaPatrocinador = document.getElementById('dicaPatrocinador');

  // Modais
  const modalConfirmacao = document.getElementById('modalConfirmacao');
  const btnModalCancelar = document.getElementById('btnModalCancelar');
  const btnModalConfirmar = document.getElementById('btnModalConfirmar');
  const modalSucesso = document.getElementById('modalSucesso');
  const mensagemSucesso = document.getElementById('mensagemSucesso');
  const btnFecharSucesso = document.getElementById('btnFecharSucesso');
  const btnLimpar = document.getElementById('btnLimpar');
  const btnAjudaTenis = document.getElementById('btnAjudaTenis');
  const modalAjuda = document.getElementById('modalAjuda');
  const btnFecharAjuda = document.getElementById('btnFecharAjuda');

  // Filtrar digitação para impedir números onde só aceita letras
  function aplicarFiltroApenasLetras(inputElement, nomeCampo) {
    inputElement.addEventListener('input', (e) => {
      const valorOriginal = e.target.value;
      const valorFiltrado = valorOriginal.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'-]/g, '');
      if (valorOriginal !== valorFiltrado) {
        e.target.value = valorFiltrado;
        mostrarErro(inputElement.id, 'Caractere numérico ou símbolo bloqueado.', 'Digite apenas letras para ' + nomeCampo + '.');
      } else {
        limparErro(inputElement.id);
      }
    });
  }

  aplicarFiltroApenasLetras(primeiroNome, 'o primeiro nome');
  aplicarFiltroApenasLetras(sobrenome, 'o sobrenome');
  aplicarFiltroApenasLetras(cidade, 'o nome da cidade');

  // Máscara para Data de Nascimento (dd/mm/aaaa)
  dataNascimento.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 5) {
      e.target.value = v.slice(0, 2) + '/' + v.slice(2, 4) + '/' + v.slice(4);
    } else if (v.length >= 3) {
      e.target.value = v.slice(0, 2) + '/' + v.slice(2);
    } else {
      e.target.value = v;
    }

    // Calcular idade automaticamente se a data estiver completa
    if (e.target.value.length === 10) {
      calcularIdadeECategoria(e.target.value);
    } else {
      idadeCalculada.value = 'Aguardando data completa (dd/mm/aaaa)...';
    }
  });

  // Função de cálculo de Idade e Categoria
  function calcularIdadeECategoria(dataStr) {
    const partes = dataStr.split('/');
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const ano = parseInt(partes[2], 10);
    const dNasc = new Date(ano, mes, dia);
    const hoje = new Date();

    if (isNaN(dNasc.getTime()) || dNasc > hoje || ano < 1920) {
      idadeCalculada.value = 'Data fora do período válido';
      return;
    }

    let idade = hoje.getFullYear() - dNasc.getFullYear();
    const difMes = hoje.getMonth() - dNasc.getMonth();
    if (difMes < 0 || (difMes === 0 && hoje.getDate() < dNasc.getDate())) {
      idade--;
    }

    let categoria = '';
    if (idade < 16) categoria = 'Sub-16 (Iniciante)';
    else if (idade <= 17) categoria = 'Sub-18 (Juvenil)';
    else if (idade <= 19) categoria = 'Sub-20 (Júnior)';
    else if (idade <= 34) categoria = 'Adulto (Principal)';
    else categoria = 'Master (Veterano)';

    idadeCalculada.value = idade + ' anos — Categoria: ' + categoria;
  }

  // Máscara para CEP (00000-000) e Preenchimento automático
  cep.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) {
      e.target.value = v.slice(0, 5) + '-' + v.slice(5);
    } else {
      e.target.value = v;
    }

    if (v.length === 8) {
      buscarCep(v);
    }
  });

  function buscarCep(codigoCep) {
    const cepStatus = document.getElementById('cep-status');
    cepStatus.textContent = 'Buscando endereço...';
    fetch('https://viacep.com.br/ws/' + codigoCep + '/json/')
      .then(res => res.json())
      .then(dados => {
        if (!dados.erro) {
          if (dados.uf) estado.value = dados.uf;
          if (dados.localidade) cidade.value = dados.localidade;
          cepStatus.textContent = '✓ Cidade e Estado preenchidos automaticamente!';
          setTimeout(() => { cepStatus.textContent = ''; }, 4000);
        } else {
          cepStatus.textContent = 'CEP não encontrado. Preencha manualmente.';
        }
      })
      .catch(() => {
        cepStatus.textContent = 'Falha ao buscar CEP. Preencha manualmente.';
      });
  }

  // Máscara para Celular ((00) 90000-0000)
  celular.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 7) {
      e.target.value = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
    } else if (v.length > 2) {
      e.target.value = '(' + v.slice(0, 2) + ') ' + v.slice(2);
    } else if (v.length > 0) {
      e.target.value = '(' + v;
    }
  });

  // Máscara para Telefone Fixo ((00) 0000-0000)
  telefone.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (v.length > 6) {
      e.target.value = '(' + v.slice(0, 2) + ') ' + v.slice(2, 6) + '-' + v.slice(6);
    } else if (v.length > 2) {
      e.target.value = '(' + v.slice(0, 2) + ') ' + v.slice(2);
    } else if (v.length > 0) {
      e.target.value = '(' + v;
    }
  });

  // Cálculo automático do IMC a partir do Peso e da Altura
  function atualizarImc() {
    const p = parseFloat(peso.value.replace(',', '.'));
    let h = parseFloat(altura.value.replace(',', '.'));
    if (h > 30) h = h / 100; // Corrige se digitou em cm

    if (p > 0 && h > 0.5 && h < 2.8) {
      const imc = (p / (h * h)).toFixed(1);
      valorImc.textContent = imc;
      if (imc < 18.5) textoImc.textContent = 'Abaixo do peso ideal';
      else if (imc < 25) textoImc.textContent = 'Peso atlético adequado';
      else if (imc < 30) textoImc.textContent = 'Sobrepeso';
      else textoImc.textContent = 'Acima da média';
    } else {
      valorImc.textContent = '--';
      textoImc.textContent = 'Informe peso e altura para calcular';
    }
  }

  peso.addEventListener('input', atualizarImc);
  altura.addEventListener('input', atualizarImc);

  // Exibição condicional para o campo Outro em Sexo
  document.querySelectorAll('input[name="sexo"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const box = document.getElementById('campo-sexo-outro');
      if (e.target.value === 'Outro') {
        box.classList.remove('escondido');
      } else {
        box.classList.add('escondido');
      }
    });
  });

  // Exibição condicional para Tipo de Prova "Outro"
  tipoProva.addEventListener('change', (e) => {
    if (e.target.value === 'Outro') {
      campoProvaOutro.classList.remove('escondido');
    } else {
      campoProvaOutro.classList.add('escondido');
    }
  });

  // Habilitação Progressiva (Responsive Enabling) do Patrocinador
  function atualizarPatrocinador() {
    if (radioPatrocinioSim.checked) {
      nomePatrocinador.disabled = false;
      nomePatrocinador.classList.remove('input-desabilitado');
      dicaPatrocinador.textContent = '(Obrigatório para atletas patrocinados)';
      nomePatrocinador.focus();
    } else {
      nomePatrocinador.disabled = true;
      nomePatrocinador.value = '';
      nomePatrocinador.classList.add('input-desabilitado');
      dicaPatrocinador.textContent = '(Habilitado se responder "Sim" acima)';
      limparErro('nomePatrocinador');
    }
  }

  radioPatrocinioSim.addEventListener('change', atualizarPatrocinador);
  radioPatrocinioNao.addEventListener('change', atualizarPatrocinador);

  // Exibição de mensagens de erro compostas por [ERRO] + [SOLUÇÃO]
  function mostrarErro(idCampo, textoErro, textoSolucao) {
    const el = document.getElementById(idCampo);
    const boxErro = document.getElementById('erro-' + idCampo);
    if (el) el.classList.add('input-invalido');
    if (boxErro) {
      boxErro.innerHTML = '<strong>' + textoErro + '</strong> ' + textoSolucao;
      boxErro.classList.add('visivel');
    }
  }

  function limparErro(idCampo) {
    const el = document.getElementById(idCampo);
    const boxErro = document.getElementById('erro-' + idCampo);
    if (el) el.classList.remove('input-invalido');
    if (boxErro) {
      boxErro.textContent = '';
      boxErro.classList.remove('visivel');
    }
  }

  // Interceptação do envio para exibir diálogo modal com foco no CANCELAR
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let errosEncontrados = 0;
    let primeiroElementoInvalido = null;

    // Validação: Primeiro Nome
    if (!primeiroNome.value.trim() || primeiroNome.value.trim().length < 2) {
      mostrarErro('primeiroNome', 'Primeiro nome incompleto.', 'Digite ao menos 2 letras sem números.');
      errosEncontrados++;
      if (!primeiroElementoInvalido) primeiroElementoInvalido = primeiroNome;
    } else {
      limparErro('primeiroNome');
    }

    // Validação: Sobrenome
    if (!sobrenome.value.trim() || sobrenome.value.trim().length < 2) {
      mostrarErro('sobrenome', 'Sobrenome não informado.', 'Digite seu sobrenome familiar neste campo.');
      errosEncontrados++;
      if (!primeiroElementoInvalido) primeiroElementoInvalido = sobrenome;
    } else {
      limparErro('sobrenome');
    }

    // Validação: Data de Nascimento
    const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regexData.test(dataNascimento.value.trim())) {
      mostrarErro('dataNascimento', 'Data de nascimento incorreta.', 'Digite a data no formato dia/mês/ano (dd/mm/aaaa).');
      errosEncontrados++;
      if (!primeiroElementoInvalido) primeiroElementoInvalido = dataNascimento;
    } else {
      limparErro('dataNascimento');
    }

    // Validação: Sexo
    const sexoMarcado = document.querySelector('input[name="sexo"]:checked');
    if (!sexoMarcado) {
      mostrarErro('sexo', 'Opção de sexo não assinalada.', 'Escolha uma das opções disponíveis de gênero.');
      errosEncontrados++;
    } else {
      limparErro('sexo');
    }

    // Validação: Estado
    if (!estado.value) {
      mostrarErro('estado', 'Estado (UF) não selecionado.', 'Abra a lista e selecione a sua Unidade Federativa.');
      errosEncontrados++;
      if (!primeiroElementoInvalido) primeiroElementoInvalido = estado;
    } else {
      limparErro('estado');
    }

    // Validação: Prova
    if (!tipoProva.value) {
      mostrarErro('tipoProva', 'Prova não selecionada.', 'Selecione a modalidade que disputará na competição.');
      errosEncontrados++;
      if (!primeiroElementoInvalido) primeiroElementoInvalido = tipoProva;
    } else {
      limparErro('tipoProva');
    }

    // Validação: Patrocinador
    if (!radioPatrocinioSim.checked && !radioPatrocinioNao.checked) {
      mostrarErro('possuiPatrocinador', 'Situação de patrocínio ausente.', 'Selecione se possui ou não patrocinador.');
      errosEncontrados++;
    } else if (radioPatrocinioSim.checked && !nomePatrocinador.value.trim()) {
      mostrarErro('nomePatrocinador', 'Patrocinador não informado.', 'Digite a empresa ou clube que te apoia.');
      errosEncontrados++;
      if (!primeiroElementoInvalido) primeiroElementoInvalido = nomePatrocinador;
    } else {
      limparErro('possuiPatrocinador');
      limparErro('nomePatrocinador');
    }

    // Se houver erro, direciona o foco para o primeiro campo com problema
    if (errosEncontrados > 0) {
      if (primeiroElementoInvalido) {
        primeiroElementoInvalido.focus();
        primeiroElementoInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Se estiver tudo correto, abre o modal de confirmação
    modalConfirmacao.classList.remove('escondido');
    // O botão de negação recebe o foco prioritário
    btnModalCancelar.focus();
  });

  // Fechar modal de confirmação
  btnModalCancelar.addEventListener('click', () => {
    modalConfirmacao.classList.add('escondido');
  });

  // Resposta Positiva de Sucesso
  btnModalConfirmar.addEventListener('click', () => {
    modalConfirmacao.classList.add('escondido');
    mensagemSucesso.textContent = 'Inscrição do participante ' + primeiroNome.value + ' ' + sobrenome.value + ' confirmada para ' + tipoProva.value + '!';
    modalSucesso.classList.remove('escondido');
    btnFecharSucesso.focus();
  });

  btnFecharSucesso.addEventListener('click', () => {
    modalSucesso.classList.add('escondido');
  });

  // Botão Limpar com confirmação para segurança dos dados
  btnLimpar.addEventListener('click', () => {
    if (confirm('Atenção: deseja realmente limpar todos os campos preenchidos do formulário?')) {
      form.reset();
      atualizarPatrocinador();
      idadeCalculada.value = 'Aguardando data...';
      valorImc.textContent = '--';
      textoImc.textContent = 'Informe peso e altura para calcular';
    }
  });

  // Modal de ajuda para calçados
  btnAjudaTenis.addEventListener('click', () => {
    modalAjuda.classList.remove('escondido');
  });
  btnFecharAjuda.addEventListener('click', () => {
    modalAjuda.classList.add('escondido');
  });
});

