/**
 * ============================================================
 * JAVASCRIPT PURO (VANILLA JS) - SEM DEPENDÊNCIAS
 * Formulário e Avaliação Heurística de Usabilidade (IHC)
 * IFTM - Campus Uberlândia Centro
 * ============================================================
 */

// Banco de dados com as 9 perguntas, dicas do avaliador e respostas oficiais
const QUESTIONS = [
  {
    id: 1,
    category: "Fundamentos",
    question: "Em linhas gerais, qual é a intenção básica de se avaliar uma interface de software (web ou desktop)?",
    hint: "Foque no objetivo prático da inspeção: identificar elementos que causam obstáculos, confusão ou desrespeito aos princípios de usabilidade, examinando o impacto da interface sobre o usuário.",
    officialAnswer: "A intenção básica é identificar elementos da interface que possam causar dificuldades aos usuários, seja por não respeitarem princípios de usabilidade ou por provocarem confusão e resultados inesperados durante a utilização do sistema. A avaliação busca examinar a funcionalidade do sistema, os efeitos da interface sobre o usuário e identificar problemas específicos de design."
  },
  {
    id: 2,
    category: "História & Autoria",
    question: "O método de avaliação da usabilidade de interfaces de software, Avaliação Heurística, foi desenvolvido por quem e em qual ano?",
    hint: "Pense na dupla pioneira nos anos 90: Jakob... e Rolf... no início da década (1990), como uma alternativa ágil e de baixo custo (Discount Usability).",
    officialAnswer: "O método foi desenvolvido por Jakob Nielsen e Rolf Molich, em 1990, como uma alternativa de baixo custo para avaliar a usabilidade de interfaces de software."
  },
  {
    id: 3,
    category: "Avaliadores",
    question: "Os testes de usabilidade, utilizando o método de Avaliação Heurística, são realizados por qual tipo de perfil de pessoa?",
    hint: "Os avaliadores usam princípios (heurísticas) como guia. Pense se é obrigatório ter diploma ou pós-graduação avançada em usabilidade, ou se iniciantes também participam.",
    officialAnswer: "São realizados por avaliadores, que examinam o sistema ou protótipo com base em um conjunto de princípios de usabilidade (heurísticas). Esses avaliadores não precisam necessariamente ser especialistas em usabilidade, podendo ser pessoas iniciantes ou com pouca experiência na área."
  },
  {
    id: 4,
    category: "Processo & Etapas",
    question: "Quantas e quais são as etapas do método de Avaliação Heurística? Descreva cada uma delas de forma sucinta.",
    hint: "São 5 etapas sequenciais: 1. Planejamento (Requisitos) → 2. Apresentação (Introdução) → 3. Inspeção (Avaliação da interface) → 4. Reunião de consenso (Discussão) → 5. Entrega dos dados (Resultados).",
    officialAnswer: "O método possui cinco etapas principais:\n\n1. Definição dos requisitos da avaliação: definir o objeto que será avaliado, os avaliadores, os objetivos, o escopo e os recursos necessários.\n\n2. Introdução: apresentar aos avaliadores as informações sobre a avaliação, seus objetivos, as heurísticas que serão utilizadas e os materiais de apoio, como formulários, exemplos e manuais.\n\n3. Avaliação da interface: os avaliadores utilizam e inspecionam a interface em busca de problemas de usabilidade, registrando todos os problemas encontrados.\n\n4. Discussão: os avaliadores e, opcionalmente, os desenvolvedores, reúnem-se para discutir os problemas identificados e atribuir um grau de severidade a eles.\n\n5. Apresentação dos resultados: apresentar os problemas encontrados e identificar aqueles considerados mais graves, que deverão ser corrigidos."
  },
  {
    id: 5,
    category: "Avaliadores",
    question: "Qual a recomendação de Nielsen em relação à quantidade de pessoas escolhidas para avaliar a usabilidade das interfaces, utilizando o método de A.H.? Qual foi a justificativa utilizada por ele para se chegar a esta conclusão?",
    hint: "Lembre-se da curva de retorno decrescente de Nielsen: um número específico (5 avaliadores) que detecta entre 60% e 80% das falhas com o melhor custo-benefício financeiro e de tempo.",
    officialAnswer: "Nielsen recomenda a utilização de cinco avaliadores. Segundo os estudos apresentados no PDF, com três a cinco avaliadores é possível encontrar aproximadamente 60% a 80% dos problemas de usabilidade de uma interface.\n\nA justificativa é que diferentes avaliadores identificam diferentes problemas. Assim, utilizar várias pessoas aumenta a quantidade de problemas encontrados. Entretanto, acima de cinco avaliadores, o custo aumenta e os resultados adicionais passam a ser menores. Por isso, cinco avaliadores representam uma boa relação entre custo e benefício."
  },
  {
    id: 6,
    category: "Avaliadores",
    question: "Segundo Nielsen, qual deve ser o nível de experiência dos avaliadores envolvidos no método de Avaliação Heurística?",
    hint: "Pense na importância da diversidade: não é obrigatório ser especialista; avaliadores novatos e inexperientes com frequência encontram problemas graves e óbvios que pessoas experientes deixam passar.",
    officialAnswer: "Segundo Nielsen, não é obrigatório que os avaliadores sejam especialistas em usabilidade. Podem ser utilizadas pessoas experientes ou iniciantes, pois ambas conseguem identificar problemas importantes na interface.\n\nO documento destaca que avaliadores iniciantes também conseguem encontrar problemas graves que, algumas vezes, passam despercebidos pelos mais experientes. Nielsen considera interessante utilizar um grupo diversificado de avaliadores, independentemente do nível de conhecimento de cada um."
  },
  {
    id: 7,
    category: "Heurísticas",
    question: "Quantas e quais são as heurísticas utilizadas no método de Avaliação Heurística?",
    hint: "São 10 heurísticas clássicas revisadas em 1994. Envolvem minimalismo visual, mundo real, reconhecimento x relembrança, consistência, status do sistema, controle/undo, atalhos, mensagens de erro, prevenção e documentação.",
    officialAnswer: "O método utiliza 10 heurísticas, revisadas por Jakob Nielsen em 1994. São elas:\n\n1. Estética e design minimalista: evitar informações desnecessárias na interface, mantendo apenas o que é relevante para o usuário.\n2. Coerência do sistema com o mundo real: utilizar palavras, expressões e conceitos familiares ao usuário, seguindo uma ordem natural e lógica.\n3. Reconhecimento ao invés de relembrança: deixar opções, informações e instruções visíveis, evitando que o usuário precise memorizar informações.\n4. Consistência e padrões: manter padrões e elementos consistentes, para que o usuário não precise adivinhar o significado de diferentes palavras ou ações.\n5. Visibilidade do status do sistema: manter o usuário informado sobre o que está acontecendo no sistema, oferecendo feedback adequado.\n6. Controle do usuário e liberdade de opções: permitir que o usuário desfaça ações e saia facilmente de situações indesejadas.\n7. Flexibilidade e eficiência de uso: oferecer atalhos e recursos que facilitem e agilizem a utilização do sistema, principalmente para usuários experientes.\n8. Ajudar usuários a reconhecer, diagnosticar e corrigir erros: apresentar mensagens de erro claras, indicando o problema e sugerindo como resolvê-lo.\n9. Prevenção de erros: desenvolver a interface de maneira que os erros sejam evitados antes mesmo de acontecerem.\n10. Ajuda e documentação: disponibilizar ajuda e documentação de fácil acesso, com informações claras e orientadas às tarefas do usuário."
  },
  {
    id: 8,
    category: "Fundamentos",
    question: "Quais são as vantagens em se utilizar o método de Avaliação Heurística?",
    hint: "Pense em 5 fatores essenciais: orçamento financeiro reduzido, velocidade de execução, simplicidade de aprendizado, eficácia na descoberta de falhas e flexibilidade para escolher o escopo.",
    officialAnswer: "De acordo com o PDF, as principais vantagens são:\n- Baixo custo: não exige grandes investimentos para sua realização.\n- Rapidez: pode ser aplicado em um curto período de tempo.\n- Facilidade de aplicação e compreensão: é um método simples e fácil de aprender.\n- Identificação de problemas: permite descobrir falhas e dificuldades existentes na interface.\n- Delimitação do escopo da avaliação: possibilita direcionar a análise para aspectos específicos da interface."
  },
  {
    id: 9,
    category: "Instrumentação",
    question: "Quais informações podem ser úteis no questionário utilizado na etapa de avaliação individual?",
    hint: "Os 5 dados úteis para catalogar um problema: 1. O que aconteceu (descrição detalhada); 2. Qual heurística foi violada; 3. O que o avaliador fez para encontrar a falha; 4. Impacto/gravidade (severidade); e 5. Sugestão de correção (opcional).",
    officialAnswer: "O questionário utilizado na avaliação individual deve conter informações que permitam registrar e analisar os problemas de usabilidade encontrados pelos avaliadores.\n\nSegundo o PDF, são úteis as seguintes informações:\n- Descrição do problema: explicar detalhadamente qual problema foi encontrado na interface.\n- Tipo de problema: identificar qual princípio ou heurística de usabilidade foi desrespeitado.\n- Como o problema foi descoberto: registrar as ações realizadas pelo avaliador que levaram à identificação do problema.\n- Grau de severidade: indicar a gravidade do problema e o impacto que ele pode causar ao usuário.\n- Possível solução: apresentar uma sugestão de melhoria para corrigir o problema (essa informação é opcional, pois não é o objetivo principal da avaliação)."
  }
];

// Chaves de armazenamento LocalStorage
const STORAGE_PREFIX = 'iftm_vanilla_';
let isFinalized = sessionStorage.getItem(`${STORAGE_PREFIX}is_finalized`) === 'true';

let appDialogResolver = null;
let dialogReturnFocus = null;

function showAppDialog(title, message, confirmText = 'Entendi', cancelText = '') {
  const dialog = document.getElementById('app-dialog');
  const titleElement = document.getElementById('dialog-title');
  const messageElement = document.getElementById('dialog-message');
  const confirmButton = document.getElementById('dialog-confirm');
  const cancelButton = document.getElementById('dialog-cancel');

  if (appDialogResolver) finishAppDialog(false);

  titleElement.textContent = title;
  messageElement.textContent = message;
  confirmButton.textContent = confirmText;
  cancelButton.hidden = !cancelText;
  if (cancelText) cancelButton.textContent = cancelText;
  dialogReturnFocus = document.activeElement;
  dialog.hidden = false;
  if (cancelText) cancelButton.focus();
  else confirmButton.focus();

  return new Promise(resolve => {
    appDialogResolver = resolve;
  });
}

function finishAppDialog(confirmed) {
  const dialog = document.getElementById('app-dialog');
  const resolver = appDialogResolver;
  appDialogResolver = null;
  dialog.hidden = true;
  if (dialogReturnFocus instanceof HTMLElement && dialogReturnFocus.isConnected) {
    dialogReturnFocus.focus();
  }
  if (resolver) resolver(confirmed);
}

function initAppDialog() {
  const dialog = document.getElementById('app-dialog');
  document.getElementById('dialog-confirm').addEventListener('click', () => finishAppDialog(true));
  document.getElementById('dialog-cancel').addEventListener('click', () => finishAppDialog(false));
  dialog.addEventListener('click', event => {
    if (event.target === dialog) finishAppDialog(false);
  });
  document.addEventListener('keydown', event => {
    if (!dialog.hidden && event.key === 'Escape') finishAppDialog(false);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAppDialog();
  initParticipantForm();
  renderQuestions();
  initToolbar();
});

function initParticipantForm() {
  const fields = ['nome', 'matricula', 'turma', 'data'];
  fields.forEach(field => {
    const el = document.getElementById(`part-${field}`);
    if (el) {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}part_${field}`);
      if (saved) el.value = saved;
      el.disabled = isFinalized;
      el.addEventListener('input', (e) => {
        localStorage.setItem(`${STORAGE_PREFIX}part_${field}`, e.target.value);
      });
    }
  });

}

// Renderização das questões, gabarito e ações do questionário
function renderQuestions(filterTerm = '') {
  const container = document.getElementById('questions-list');
  if (!container) return;

  container.innerHTML = '';
  const term = filterTerm.toLowerCase().trim();

  const filtered = QUESTIONS.filter(q => {
    if (!term) return true;
    return q.question.toLowerCase().includes(term) || q.hint.toLowerCase().includes(term);
  });

  if (isFinalized) {
    const finalizedBanner = document.createElement('div');
    finalizedBanner.className = 'finalized-card no-print';
    finalizedBanner.innerHTML = `
      <h3 style="color:#166534; font-size:1.1rem; font-weight:800; margin-bottom:0.25rem;">Questionário finalizado</h3>
      <p style="color:#14532d; font-size:0.825rem;">Confira abaixo o gabarito. Quando terminar, use o botão no final para iniciar um novo questionário.</p>
    `;
    container.appendChild(finalizedBanner);
  }

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'card';
    empty.style.textAlign = 'center';
    empty.style.color = '#64748b';
    empty.style.padding = '3rem';
    empty.innerText = `Nenhuma questão encontrada para "${filterTerm}".`;
    container.appendChild(empty);
  }

  filtered.forEach(q => {
    const card = document.createElement('article');
    card.className = 'card';
    card.id = `q-${q.id}`;

    const savedUserAnswer = localStorage.getItem(`${STORAGE_PREFIX}ans_${q.id}`) || '';
    const savedStatus = localStorage.getItem(`${STORAGE_PREFIX}status_${q.id}`) || 'pending';

    card.innerHTML = `
      <div class="question-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="q-badge">${q.id < 10 ? '0' + q.id : q.id}</span>
          <span class="q-category">${q.category}</span>
        </div>
        <div class="no-print" style="display: flex; gap: 0.35rem;">
          <!-- Botão de Dica -->
          ${isFinalized ? '' : `<button class="btn btn-hint btn-sm" onclick="toggleHint(${q.id})" title="Ver dica para responder esta questão">💡 Dica</button>`}
          <button class="btn btn-secondary btn-sm" onclick="speakQuestion(${q.id})" title="Ouvir Pergunta e Conteúdo">🔊 Ouvir</button>
        </div>
      </div>

      <h3 class="q-text">${q.question}</h3>

      <!-- Box de Dica (Oculto por padrão, acionado pelo botão Dica) -->
      ${isFinalized ? '' : `
        <div id="hint-box-${q.id}" class="hint-box no-print" style="display: none;">
          <div class="hint-title">💡 Dica de Apoio ao Avaliador:</div>
          <div>${q.hint}</div>
        </div>
      `}

      <!-- Área de Prática / Resposta do Aluno -->
      <div class="practice-box">
        <label class="practice-label" for="user-ans-${q.id}">✍️ Sua Resposta como Avaliador:</label>
        <textarea 
          id="user-ans-${q.id}" 
          class="form-textarea" 
          rows="3" 
          placeholder="Digite sua resposta aqui para avaliação..."
          oninput="saveUserAnswer(${q.id}, this.value)"
          ${isFinalized ? 'disabled' : ''}
        >${savedUserAnswer}</textarea>
        ${isFinalized ? '' : `<div style="margin-top:0.4rem; font-size:0.75rem; color:#64748b;">🔒 O gabarito não é exibido antes de finalizar.</div>`}
      </div>

      ${isFinalized ? `
        <div class="official-answer-box">
          <span class="official-label">✓ Resposta Oficial (Gabarito):</span>
          <div>${q.officialAnswer.replace(/\n/g, '<br>')}</div>
        </div>
      ` : ''}

      ${isFinalized ? '' : `
        <div class="mastery-bar no-print">
          <span>Status de Domínio:</span>
          <div class="mastery-options">
            <button class="btn-mastery ${savedStatus === 'pending' ? 'active-mastered' : ''}" onclick="setQuestionStatus(${q.id}, 'pending', this)">Não estudei</button>
            <button class="btn-mastery ${savedStatus === 'review' ? 'active-review' : ''}" onclick="setQuestionStatus(${q.id}, 'review', this)">Revisar</button>
            <button class="btn-mastery ${savedStatus === 'mastered' ? 'active-mastered' : ''}" onclick="setQuestionStatus(${q.id}, 'mastered', this)">Dominado!</button>
          </div>
        </div>
      `}
    `;

    container.appendChild(card);
  });

  const bottomAction = document.createElement('div');
  bottomAction.className = 'card no-print';
  bottomAction.style.textAlign = 'center';
  bottomAction.style.padding = '2rem';
  bottomAction.innerHTML = isFinalized ? `
    <h4 style="font-size: 1.1rem; font-weight:800; color:#0f172a; margin-bottom: 0.5rem;">Terminou de conferir o gabarito?</h4>
    <p style="font-size: 0.85rem; color:#64748b; margin-bottom: 1.25rem;">Reinicie para limpar as respostas e a identificação e começar novamente.</p>
    <button type="button" class="btn btn-primary" onclick="restartQuestionnaire()" style="font-size: 0.95rem; padding: 0.75rem 1.5rem;">
      🔄 Reiniciar Questionário
    </button>
  ` : `
    <h4 style="font-size: 1.1rem; font-weight:800; color:#0f172a; margin-bottom: 0.5rem;">Finalizar questionário</h4>
    <p style="font-size: 0.85rem; color:#64748b; margin-bottom: 1.25rem;">Ao finalizar, o gabarito será exibido para conferência.</p>
    <button type="button" class="btn btn-primary" onclick="finalizeQuestionnaire()" style="font-size: 0.95rem; padding: 0.75rem 1.5rem;">
      🏁 Finalizar Questionário
    </button>
  `;
  container.appendChild(bottomAction);
}

// Alternar Dica
window.toggleHint = function(id) {
  const box = document.getElementById(`hint-box-${id}`);
  if (!box) return;
  box.style.display = (box.style.display === 'none' || !box.style.display) ? 'block' : 'none';
};

// Finalizar o questionário e liberar o gabarito
window.finalizeQuestionnaire = async function() {
  if (isFinalized) return;

  let count = 0;
  QUESTIONS.forEach(q => {
    const ans = localStorage.getItem(`${STORAGE_PREFIX}ans_${q.id}`) || '';
    if (ans.trim().length > 0) count++;
  });

  if (count < QUESTIONS.length) {
    const ok = await showAppDialog(
      'Finalizar questionário?',
      `Você respondeu ${count} de ${QUESTIONS.length} questões.\nDeseja finalizar e mostrar o gabarito?`,
      'Finalizar',
      'Continuar respondendo'
    );
    if (!ok) return;
  }

  isFinalized = true;
  sessionStorage.setItem(`${STORAGE_PREFIX}is_finalized`, 'true');
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  renderQuestions();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await showAppDialog('Questionário finalizado', 'O gabarito está disponível para conferência.');
};

window.restartQuestionnaire = async function() {
  const confirmed = await showAppDialog(
    'Reiniciar questionário?',
    'Isso apagará as respostas, a autoavaliação e os dados de identificação. Deseja continuar?',
    'Reiniciar',
    'Cancelar'
  );
  if (!confirmed) return;

  const fields = ['nome', 'matricula', 'turma', 'data'];
  fields.forEach(field => {
    localStorage.removeItem(`${STORAGE_PREFIX}part_${field}`);
    const input = document.getElementById(`part-${field}`);
    if (input) {
      input.value = '';
      input.disabled = false;
    }
  });
  QUESTIONS.forEach(q => {
    localStorage.removeItem(`${STORAGE_PREFIX}ans_${q.id}`);
    localStorage.removeItem(`${STORAGE_PREFIX}status_${q.id}`);
  });

  isFinalized = false;
  sessionStorage.removeItem(`${STORAGE_PREFIX}is_finalized`);
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  renderQuestions();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await showAppDialog('Questionário reiniciado', 'As respostas e os formulários foram limpos. Você pode começar novamente.');
};

window.saveUserAnswer = function(id, text) {
  localStorage.setItem(`${STORAGE_PREFIX}ans_${id}`, text);
};

window.setQuestionStatus = function(id, status, btn) {
  localStorage.setItem(`${STORAGE_PREFIX}status_${id}`, status);
  const parent = btn.parentElement;
  Array.from(parent.children).forEach(b => {
    b.className = 'btn-mastery';
  });
  if (status === 'mastered') btn.className = 'btn-mastery active-mastered';
  else if (status === 'review') btn.className = 'btn-mastery active-review';
  else btn.className = 'btn-mastery active-mastered';
};

window.speakQuestion = function(id) {
  const q = QUESTIONS.find(item => item.id === id);
  if (!q || !('speechSynthesis' in window)) {
    showAppDialog('Áudio indisponível', 'O sintetizador de voz não está disponível neste navegador.');
    return;
  }
  window.speechSynthesis.cancel();
  const text = `Questão ${q.id}. ${q.question}. Dica: ${q.hint}`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  window.speechSynthesis.speak(utterance);
};

function initToolbar() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderQuestions(e.target.value);
    });
  }
}

