document.addEventListener("DOMContentLoaded", function () {
    //elementos principais do jogo no html
    const selectDificuldade = document.getElementById("dificuldade");
    const tabuleiroJogador = document.getElementById("tabuleiroJogador");
    const tabuleiroCPU = document.getElementById("tabuleiroCPU");
    const labelsTopJogador = document.getElementById("labelsTopJogador");
    const labelsLeftJogador = document.getElementById("labelsLeftJogador");
    const labelsTopCPU = document.getElementById("labelsTopCPU");
    const labelsLeftCPU = document.getElementById("labelsLeftCPU");
    const painelNavios = document.getElementById("lista-navios");

    //essa é a ista de navios (nome, tamanho, quantidade)
    const navios = [
        { nome: "Porta-aviões", tamanho: 5, quantidade: 1 },
        { nome: "Navio-tanque", tamanho: 4, quantidade: 1 },
        { nome: "Destroyer", tamanho: 3, quantidade: 1 },
        { nome: "Submarino", tamanho: 3, quantidade: 2 },
        { nome: "Fragata", tamanho: 2, quantidade: 3 }
    ];

    //uma base de nomes map nomes -> base filenames (para procurar imagens)
    const shipBaseNames = {
        'Porta-aviões': ['porta_avioes', 'porta-avioes', 'portaavioes'],
        'Navio-tanque': ['navio_tanque', 'navio-tanque', 'naviotanque'],
        'Destroyer': ['destroyer', 'destroyer_ship', 'destroyer'],
        'Submarino': ['submarino', 'subnarino', 'submarine'],
        'Fragata': ['fragata', 'frigate']
    };

    //esse vai ser o estado dos navios restantes
    let naviosRestantes = navios.map(n => ({ ...n }));//diz que é uma cópia profunda

    //esse é o map de imagens disponíveis para cada navio: { h: urlHorizontal, v: urlVertical }
    const shipImageMap = {};//diz que é um objeto vazio

    //aqui ele vai tenta pré-carregar imagens reais para os navios (procura por vários sufixos)
    (function preloadShipImages() {
        const pasta = 'img/';
        const sufixos = ['png', 'jpg', 'svg', 'webp'];
        //ele vai mapeamento das chaves de arquivo mais prováveis (nomes base para horizontal)
        const nomesArquivo = {
            'Porta-aviões': ['porta_avioes', 'porta-avioes', 'portaavioes'],
            'Navio-tanque': ['navio_tanque', 'navio-tanque', 'naviotanque'],
            'Destroyer': ['destroyer', 'destroyer_ship'],
            'Submarino': ['submarino', 'submarine', 'subnarino'],
            'Fragata': ['fragata', 'frigate']
        };

        //aqui são as variações de sufixo para versões verticais
        const vertSuffixes = ['_v', '-v', '_vertical', '_vert'];//diz que é um array com variações de sufixos nos nomes da imagem

        //agora ele percorre cada nome de navio e tenta carregar as imagens
        Object.keys(nomesArquivo).forEach(nome => {
            shipImageMap[nome] = { h: null, v: null };//inicializa o mapeamento com null
            const candidates = nomesArquivo[nome];//pega os nomes base para esse navio

            //aqui ele procura pela versão horizontal primeiro
            outer_h: for (let i = 0; i < candidates.length; i++) {//percorre os candidatos
                for (let j = 0; j < sufixos.length; j++) {//percorre os sufixos
                    const path = pasta + candidates[i] + '.' + sufixos[j];
                    const img = new Image();
                    img.onload = (function (p, nm) {
                        return function () {
                            if (!shipImageMap[nm].h) shipImageMap[nm].h = p;
                        };
                    })(path, nome);
                    img.onerror = function () { };
                    img.src = path;
                    if (shipImageMap[nome].h) break outer_h;
                }
            }

            // procura variações verticais
            outer_v: for (let i = 0; i < candidates.length; i++) {//percorre os candidatos
                for (let vs = 0; vs < vertSuffixes.length; vs++) {
                    for (let j = 0; j < sufixos.length; j++) {
                        const path = pasta + candidates[i] + vertSuffixes[vs] + '.' + sufixos[j];
                        const img = new Image();
                        img.onload = (function (p, nm) {
                            return function () {
                                if (!shipImageMap[nm].v) shipImageMap[nm].v = p;
                            };
                        })(path, nome);
                        img.onerror = function () { };
                        img.src = path;
                        if (shipImageMap[nome].v) break outer_v;
                    }
                }
            }
        });
    })();

    //aqui e uma funcao para criar tabuleiro
    function criarTabuleiro(tabuleiro, labelsTop, labelsLeft, tamanho) {
        //aqui ele Limpa tudo
        tabuleiro.innerHTML = "";
        labelsTop.innerHTML = "";
        labelsLeft.innerHTML = "";
        tabuleiro.style.gridTemplateColumns = `repeat(${tamanho}, 30px)`;

        //aqui são as Letras A, B, C...
        for (let i = 0; i < tamanho; i++) {
            const letra = String.fromCharCode(65 + i);
            const div = document.createElement("div");
            div.textContent = letra;
            labelsTop.appendChild(div);
        }
        
        //aqui sao os numeros 1, 2, 3...
        for (let i = 1; i <= tamanho; i++) {
            const div = document.createElement("div");
            div.textContent = i;
            labelsLeft.appendChild(div);
        }

        //aqui e as celulas do tabuleiro
        for (let i = 0; i < tamanho * tamanho; i++) {
            const celula = document.createElement("div");
            celula.classList.add("celula");
            celula.dataset.index = i;
            tabuleiro.appendChild(celula);
        }
    }

    //aqui e a funcao para exibir navios no painel lateral
    function exibirNavios() {
        painelNavios.innerHTML = "";//limpa o painel
        naviosRestantes.forEach((navio, idx) => {//percorre os navios restantes
            if (navio.quantidade > 0) {
                const div = document.createElement("div");//cria o elemento div
                div.classList.add("navio-item");//adiciona a classe CSS
                div.textContent = `${navio.nome} (${navio.tamanho}) x${navio.quantidade}`;
                div.dataset.tamanho = navio.tamanho;//adiciona o tamanho como data-attribute
                div.dataset.idx = idx;
                painelNavios.appendChild(div);//adiciona ao painel
            }
        });
    }

    //aqui e a inicializacao ao carregar ou trocar dificuldade
    function inicializarJogo() {
        const tamanho = parseInt(selectDificuldade.value, 10) || 10;
        criarTabuleiro(tabuleiroJogador, labelsTopJogador, labelsLeftJogador, tamanho);
        criarTabuleiro(tabuleiroCPU, labelsTopCPU, labelsLeftCPU, tamanho);
        exibirNavios();
    }

    //aqui inicializacaoo padrao ao carregar a pagina
    inicializarJogo();

    //aqui mostrar nome do usuario logado no header
    function mostrarNomeUsuario() {
        const nome = localStorage.getItem('usuarioLogado');
        //aqui seleciona especificamente o elemento dentro do header (evita conflito com outro id repetido)
        const el = document.querySelector('header #nomeJogador');//diz que é o elemento do header com id nomeJogador
        if (el) el.textContent = nome ? nome : 'Jogador';//se n tiver nome, usa 'Jogador'
    }

    //chama a funcao para mostrar o nome do usuario
    mostrarNomeUsuario();

    //aqui atualiza tambem o título do tabuleiro do jogador
    (function atualizarTituloTabuleiro() {
        const nome = localStorage.getItem('usuarioLogado') || 'Jogador';
        const elTitulo = document.getElementById('tituloTabuleiro');
        if (elTitulo) elTitulo.textContent = `${nome} — Seu Tabuleiro`;
    })();

    //aqui o botao sair -> volta para login (ajuste o caminho se necessário)
    const btnSair = document.getElementById("btnSair");//diz que é o botão sair
    if (btnSair) {//verifica se o botão existe
        btnSair.addEventListener("click", function () {
            //limpar usuário logado (opcional) e voltar para login
            //localStorage.removeItem("usuarioLogado");
            window.location.href = "index.html";
        });
    }

    //aqui as variaveis de controle
    let navioSelecionado = null;//navio selecionado no painel lateral
    let orientacaoHorizontal = true;//orientacao do navio (true = horizontal, false = vertical)
    let naviosPosicionados = [];//lista de navios ja posicionados

    //aqui dis se a selecaooo de navio no painel lateral
    painelNavios.addEventListener("click", function (e) {
        if (e.target.classList.contains("navio-item")) {
            //remove seleção anterior
            painelNavios.querySelectorAll(".navio-item").forEach(item => item.classList.remove("selecionado"));
            //marca navio selecionado
            e.target.classList.add("selecionado");
            navioSelecionado = naviosRestantes[parseInt(e.target.dataset.idx)];
        }
    });

    //aqui cria o preview do navio ao passar o mouse sobre o tabuleiro
    function obterOuCriarPreview() {//pega o elemento de preview ou cria se não existir
        let preview = document.getElementById('shipPreview');//diz que é o elemento com id shipPreview
        if (!preview) {
            preview = document.createElement('div');
            preview.id = 'shipPreview';
            preview.className = 'ship-preview';
            document.body.appendChild(preview);
        }
        return preview;
    }

    //aqui mostra o preview do navio
    function showShipPreview(navio, targetCell) {
        if (!navio || !targetCell) return;
        const preview = obterOuCriarPreview();
        const cellRect = targetCell.getBoundingClientRect();
        const cellWidth = Math.round(cellRect.width);
        const cellHeight = Math.round(cellRect.height);

        const tamanho = navio.tamanho;

        //aqui as dimensões do preview
        let width, height, left, top;//declara as variaveis
        if (orientacaoHorizontal) {//se for horizontal
            width = cellWidth * tamanho;
            height = Math.max(24, Math.floor(cellHeight * 0.82));
            left = cellRect.left;
            top = cellRect.top + (cellHeight - height) / 2;
            preview.style.transform = 'rotate(0deg)';
        } else {//se for vertical
            width = Math.max(24, Math.floor(cellWidth * 0.82));
            height = cellHeight * tamanho;
            left = cellRect.left + (cellWidth - width) / 2;
            top = cellRect.top;
            preview.style.transform = 'rotate(90deg)';
        }

        // Se tiver imagem real pré-carregada, usa-a; caso contrário, usa silhueta SVG
        const imgUrl = shipImageMap[navio.nome];
        if (imgUrl) {
            preview.style.backgroundImage = `url("${imgUrl}")`;
            preview.style.backgroundSize = (orientacaoHorizontal ? 'contain' : 'contain');
        } else {
            //gera uma silhueta SVG simples (retângulo com borda)
            const svgWidth = Math.max(60, width);
            const svgHeight = Math.max(18, height);
            const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${svgWidth}' height='${svgHeight}' viewBox='0 0 ${svgWidth} ${svgHeight}'>` +
                `<rect x='2' y='2' rx='6' ry='6' width='${svgWidth-4}' height='${svgHeight-4}' fill='#2b8a3e' stroke='#083' stroke-width='3' opacity='0.95' />` +
                `</svg>`;
            const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
            preview.style.backgroundImage = `url("${dataUrl}")`;
            preview.style.backgroundSize = 'contain';
        }

        preview.style.width = width + 'px';
        preview.style.height = height + 'px';
        preview.style.left = Math.round(left) + 'px';
        preview.style.top = Math.round(top) + 'px';
        preview.style.display = 'block';
    }

    //aqui esconde o preview do navio
    function hideShipPreview() {
        const preview = document.getElementById('shipPreview');
        if (preview) preview.style.display = 'none';
    }

    //aqui e afunção para verificar se todos os navios foram posicionados
    function todosNaviosPosicionados() {
        return naviosRestantes.every(n => n.quantidade === 0);
    }

    //aquivou fazer o poosicionamento do navio no tabuleiro do jogador
    tabuleiroJogador.addEventListener("click", async function (e) {
        if (!navioSelecionado) return;
        if (!e.target.classList.contains("celula")) return;
        const tamanho = navioSelecionado.tamanho;
        const index = parseInt(e.target.dataset.index);
        const tamanhoTabuleiro = parseInt(selectDificuldade.value, 10) || 10;
        let podePosicionar = true;
        let indices = [];
        for (let i = 0; i < tamanho; i++) {
            let idx = orientacaoHorizontal ? index + i : index + i * tamanhoTabuleiro;

            //verifica borda horizontal
            if (orientacaoHorizontal && Math.floor(idx / tamanhoTabuleiro) !== Math.floor(index / tamanhoTabuleiro)) {
                podePosicionar = false;
                break;
            }

            //verifica borda vertical
            if (!orientacaoHorizontal && idx >= tamanhoTabuleiro * tamanhoTabuleiro) {
                podePosicionar = false;
                break;
            }
            const celula = tabuleiroJogador.querySelector(`[data-index='${idx}']`);
            if (!celula || celula.classList.contains("navio-jogador")) {
                podePosicionar = false;
            //se tiver imagem real pré-carregada, usa-a; caso contrário, usa silhueta SVG
            }
            indices.push(idx);
        }
        if (podePosicionar) {
            // Marca células e cria um elemento de imagem do navio posicionado
            indices.forEach(idx => {
                const celula = tabuleiroJogador.querySelector(`[data-index='${idx}']`);
                celula.classList.add("navio-jogador");
            });

            //aqui cria elemento visual do navio que cobre as células
            const firstIdx = indices[0];
            const firstCell = tabuleiroJogador.querySelector(`[data-index='${firstIdx}']`);
            if (firstCell) {

                //aqui usa coordenadas relativas ao tabuleiro para posicionamento exato
                const cellWidth = firstCell.offsetWidth;
                const cellHeight = firstCell.offsetHeight;
                const leftBase = firstCell.offsetLeft;
                const topBase = firstCell.offsetTop;
                let width, height, left, top;
                if (orientacaoHorizontal) {
                    width = cellWidth * navioSelecionado.tamanho;
                    height = cellHeight;
                    left = leftBase;
                    top = topBase;
                } else {
                    width = cellWidth;
                    height = cellHeight * navioSelecionado.tamanho;
                    left = leftBase;
                    top = topBase;
                }

                const mapping = shipImageMap[navioSelecionado.nome] || {};
                const shipEl = document.createElement('div');
                shipEl.className = 'navio-jogador-image';
                shipEl.style.width = width + 'px';
                shipEl.style.height = height + 'px';
                shipEl.style.left = left + 'px';
                shipEl.style.top = top + 'px';
                shipEl.style.overflow = 'hidden';

                // cria img element e tenta carregar variantes (vertical primeiro quando aplicável)
                const imgEl = document.createElement('img');
                imgEl.style.width = '100%';
                imgEl.style.height = '100%';
                imgEl.style.objectFit = 'cover';
                imgEl.style.display = 'block';
                imgEl.style.pointerEvents = 'none';
                imgEl.style.userSelect = 'none';
                imgEl.style.transition = 'transform 0.12s ease';

                async function findAndSetImage(imgElement, candidates) {
                    for (let i = 0; i < candidates.length; i++) {
                        const p = candidates[i];
                        const test = await new Promise(resolve => {
                            const tmp = new Image();
                            tmp.onload = () => resolve(p);
                            tmp.onerror = () => resolve(null);
                            tmp.src = p;
                        });
                        if (test) {
                            imgElement.src = test;
                            return true;
                        }
                    }
                    return false;
                }

                const exts = ['png', 'jpg', 'webp', 'svg'];
                const vertSuffs = ['-vertical', '_vertical', '-v', '_v'];
                const bases = shipBaseNames[navioSelecionado.nome] || [navioSelecionado.nome.replace(/\s+/g, '_').toLowerCase()];
                const candidates = [];
                if (!orientacaoHorizontal) {
                    for (const b of bases) {
                        for (const vs of vertSuffs) {
                            for (const ex of exts) candidates.push(`img/${b}${vs}.${ex}`);
                        }
                    }
                }
                for (const b of bases) for (const ex of exts) candidates.push(`img/${b}.${ex}`);

                const found = await findAndSetImage(imgEl, candidates);
                if (!found) {
                    //aqui tenta usar as imagens pré-carregadas no mapeamento
                    if (orientacaoHorizontal) imgEl.src = mapping.h || mapping.v || '';//tenta horizontal primeiro
                    else imgEl.src = mapping.v || mapping.h || '';
                }

                //aqui apos definir src (ou fallback), ajusta transform/object-fit para evitar recorte
                const srcLower = (imgEl.src || '').toLowerCase();
                const isExplicitVertical = /(-vertical|_vertical|-v|_v)/i.test(srcLower);
                if (isExplicitVertical) {
                    //aqui oarquivo vertical fornecido: não rotacionar, mostrar inteiro
                    imgEl.style.transform = '';
                    imgEl.style.transformOrigin = 'center center';
                    imgEl.style.objectFit = 'contain';
                    imgEl.style.width = '100%';
                    imgEl.style.height = '100%';
                    imgEl.style.display = 'block';
                } else if (!orientacaoHorizontal) {
                    //aqui a imagem horizontal sendo colocada verticalmente: rotacionar, mas usar contain
                    imgEl.style.objectFit = 'contain';
                    imgEl.style.width = '100%';
                    imgEl.style.height = '100%';
                    imgEl.style.transform = 'rotate(90deg)';
                    imgEl.style.transformOrigin = 'center center';
                    imgEl.style.display = 'block';
                } else {
                    //aqui a posição horizontal normal
                    imgEl.style.transform = '';
                    imgEl.style.objectFit = 'cover';
                    imgEl.style.width = '100%';
                    imgEl.style.height = '100%';
                    imgEl.style.display = 'block';
                }

                //se não conseguiu setar src (string vazia), não append img; usa fallback SVG
                if (imgEl.src) {
                    shipEl.appendChild(imgEl);
                } else {
                    const svgW = Math.max(60, width);
                    const svgH = Math.max(18, height);
                    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${svgW}' height='${svgH}' viewBox='0 0 ${svgW} ${svgH}'>` +
                        `<rect x='2' y='2' rx='6' ry='6' width='${svgW-4}' height='${svgH-4}' fill='#2b8a3e' stroke='#083' stroke-width='3' opacity='0.95' />` +
                        `</svg>`;
                    const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
                    shipEl.style.backgroundImage = `url("${dataUrl}")`;
                    shipEl.style.backgroundSize = 'cover';
                    shipEl.style.backgroundPosition = 'center';
                    if (!orientacaoHorizontal) {
                        shipEl.style.transform = 'rotate(90deg)';
                        shipEl.style.transformOrigin = 'center center';
                    }
                }
                //aqui marca a qual navio pertence
                shipEl.dataset.nome = navioSelecionado.nome;
                tabuleiroJogador.appendChild(shipEl);

                naviosPosicionados.push({ ...navioSelecionado, indices, elemento: shipEl });//armazena o elemento para possível remoção futura
            } else {//fallback: marca apenas as células
                naviosPosicionados.push({ ...navioSelecionado, indices });
            }
            //aqui atualiza o contador e o painel lateral
            navioSelecionado.quantidade--;

            //se acabou esse tipo de navio, remove do painel
            if (navioSelecionado.quantidade === 0) {
                painelNavios.querySelector(`.navio-item.selecionado`).remove();
                navioSelecionado = null;
            } else {//senão apenas atualiza o painel
                exibirNavios();
                navioSelecionado = null;
            }
        }

        //aqui mostra a mensagem ao terminar de posicionar todos os navios
        function mostrarMensagemPosicionamento() {
            if (todosNaviosPosicionados()) {
                btnPlay.disabled = false;
                btnPause.disabled = true;
                btnStop.disabled = true;
                btnSair.disabled = false;
                posicionarNaviosCPU();
                alert("A Lumi (CPU) posicionou seus navios tamebem!");
                alert("Todos os navios agora foram posicionados! Deseja começar o jogo?");
            }
        }

        //aqui verifica se todos os navios foram posicionados
        if (podePosicionar) {
            if (todosNaviosPosicionados()) {
                mostrarMensagemPosicionamento();
            }
        }
    });

    //aqqui e a função para posicionar navios da CPU automaticamente
    function posicionarNaviosCPU() {

        // Copia a lista de navios do jogador
        const naviosCPU = navios.map(n => ({ ...n }));
        const tamanhoTabuleiro = parseInt(selectDificuldade.value, 10) || 10;
        let ocupadas = new Set();

        //aqui percorre cada tipo de navio para posicionar
        naviosCPU.forEach(navio => {
            for (let q = 0; q < navio.quantidade; q++) {
                let posicionado = false;
                let tentativas = 0;
                while (!posicionado && tentativas < 1000) {
                    tentativas++;
                    const orientacaoHorizontal = Math.random() < 0.5;
                    let index = Math.floor(Math.random() * (tamanhoTabuleiro * tamanhoTabuleiro));
                    let indices = [];
                    let podePosicionar = true;
                    for (let i = 0; i < navio.tamanho; i++) {
                        let idx = orientacaoHorizontal ? index + i : index + i * tamanhoTabuleiro;
                        // Verifica borda horizontal
                        if (orientacaoHorizontal && Math.floor(idx / tamanhoTabuleiro) !== Math.floor(index / tamanhoTabuleiro)) {
                            podePosicionar = false;
                            break;
                        }
                        // Verifica borda vertical
                        if (!orientacaoHorizontal && idx >= tamanhoTabuleiro * tamanhoTabuleiro) {
                            podePosicionar = false;
                            break;
                        }
                        if (ocupadas.has(idx)) {
                            podePosicionar = false;
                            break;
                        }
                        indices.push(idx);
                    }
                    if (podePosicionar) {
                        indices.forEach(idx => {
                            const celula = tabuleiroCPU.querySelector(`[data-index='${idx}']`);
                            if (celula) celula.classList.add("navio-cpu");
                            ocupadas.add(idx);
                        });
                        posicionado = true;
                    }
                }
            }
        });
    }

    //aqui mostra o preview do navio ao passar o mouse sobre o tabuleiro do jogador
    tabuleiroJogador.addEventListener("mouseover", function (e) {
        //intencionalmente vazio para evitar preview
        return;
    });

    //aqui remover pré-visualização ao sair do mouse
    tabuleiroJogador.addEventListener("mouseout", function (e) {

        //remove qualquer destaque de pré-visualização
        tabuleiroJogador.querySelectorAll(".navio-preview").forEach(celula => celula.classList.remove("navio-preview"));//remove a classe de destaque
        hideShipPreview();//esconde o preview
    });

    //aqui o botão de orientação (horizontal/vertical)
    const btnOrientacao = document.getElementById("btnOrientacao");
    if (btnOrientacao) {
        btnOrientacao.addEventListener("click", function () {
            orientacaoHorizontal = !orientacaoHorizontal;
            btnOrientacao.textContent = orientacaoHorizontal ? "Orientação: Horizontal" : "Orientação: Vertical";
        });
    }

    //aqui o botão para limpar posições dos navios
    const btnLimparPosicoes = document.getElementById("btnLimparPosicoes");
    if (btnLimparPosicoes) {
        btnLimparPosicoes.addEventListener("click", function () {
            //remove navios do tabuleiro
            tabuleiroJogador.querySelectorAll(".navio-jogador").forEach(celula => celula.classList.remove("navio-jogador"));
            //reemove imagens posicionadas
            tabuleiroJogador.querySelectorAll('.navio-jogador-image').forEach(el => el.remove());
            //reseta navios posicionados
            naviosPosicionados = [];
            //restaura contadores
            naviosRestantes = navios.map(n => ({ ...n }));//cópia profunda
            exibirNavios();//atualiza o painel lateral
            navioSelecionado = null;//deseleciona qualquer navio
            hideShipPreview();//esconde o preview
        });
    }

    //aqui é o Timer
    let timerInterval = null;
    let segundos = 0;
    const elTimer = document.getElementById("timer");
    const btnPlay = document.getElementById("btnPlay");
    const btnPause = document.getElementById("btnPause");
    const btnStop = document.getElementById("btnStop");
    const btnReiniciar = document.getElementById("btnReiniciar");

    //quando a dificuldade muda, resetar navios disponíveis e limpar posições
    if (selectDificuldade) {
        selectDificuldade.addEventListener("change", function () {
            //reseta lista de navios disponíveis para o jogador
            naviosRestantes = navios.map(n => ({ ...n }));
            naviosPosicionados = [];
            navioSelecionado = null;
            exibirNavios();

            //aquie ele recria os tabuleiros com o novo tamanho e limpa quaisquer marcações
            const tamanho = parseInt(selectDificuldade.value, 10) || 10;
            //aqi ele remove imagens de navios posicionados (caso existam)
            tabuleiroJogador.querySelectorAll('.navio-jogador-image').forEach(el => el.remove());
            criarTabuleiro(tabuleiroJogador, labelsTopJogador, labelsLeftJogador, tamanho);
            criarTabuleiro(tabuleiroCPU, labelsTopCPU, labelsLeftCPU, tamanho);

            //aqui ele desabilita o Play até que o jogador posicione manualmente todos os navios
            if (btnPlay) btnPlay.disabled = true;
        });
    }

    //aqui é o estado do jogo e turnos
    let gameStarted = false;
    let jogadorTurno = true; //jogador começa por padrão

    // ------------------ TIMER ------------------
    //aqui e a funcao para atualizar estado dos botões do timer
    function atualizarBotoesTimer(estado) {
        // estado: 'inicial', 'rodando', 'pausado', 'parado'
        btnPlay.disabled = false;
        if (estado === 'inicial' || estado === 'parado') {
            btnPause.disabled = true;
            btnStop.disabled = true;
            btnSair.disabled = false;
        } else if (estado === 'rodando') {
            btnPause.disabled = false;
            btnStop.disabled = false;
            btnSair.disabled = false;
        } else if (estado === 'pausado') {
            btnPause.disabled = true;
            btnStop.disabled = false;
            btnSair.disabled = false;
        }
    }

    //aqui inicializa botões
    atualizarBotoesTimer('inicial');

    //aqui a funcao para atualizar o timer exibido
    function atualizarTimer() {
        const min = String(Math.floor(segundos / 60)).padStart(2, '0');
        const sec = String(segundos % 60).padStart(2, '0');
        elTimer.textContent = `${min}:${sec}`;
    }

    //aqui a funcao para iniciar o timer
    function iniciarTimer() {
        if (timerInterval) return;
        timerInterval = setInterval(() => {
            segundos++;
            atualizarTimer();
        }, 1000);
        atualizarBotoesTimer('rodando');
        //aqui marca partida como iniciada quando o timer inicia
        gameStarted = true;
        jogadorTurno = true; //jogador começa
    }

    //aqui a funcao para pausar o timer
    function pausarTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        atualizarBotoesTimer('pausado');
    }

    //aqui a funcao para parar o timer
    function pararTimer() {
        pausarTimer();
        segundos = 0;
        atualizarTimer();
        atualizarBotoesTimer('parado');
    }

    //aqui mpede iniciar o jogo sem todos os navios
    if (btnPlay) btnPlay.addEventListener("click", function () {
        if (!todosNaviosPosicionados()) {//verifica se todos os navios foram posicionados
            alert("Posicione todos os navios antes de começar!");
            return;
        }
        iniciarTimer();//inicia o timer
    });
    //aqui os outros botões do timer
    if (btnPause) btnPause.addEventListener("click", pausarTimer);
    if (btnStop) btnStop.addEventListener("click", pararTimer);
    if (btnReiniciar) btnReiniciar.addEventListener("click", reiniciarJogo);

    //aqui e a função para reiniciar o jogo ao estado inicial
    function reiniciarJogo() {
        //para o timer e reseta contadores
        pausarTimer();
        segundos = 0;
        atualizarTimer();
        //resetar variáveis de estado
        gameStarted = false;
        jogadorTurno = true;

        //aqui limpar tabuleiros: remover classes de navios e de acerto/erro/preview
        tabuleiroJogador.querySelectorAll('.celula').forEach(c => {
            c.classList.remove('navio-jogador', 'acertou', 'errou', 'navio-preview');
            c.style.background = '';
            c.style.border = '';
        });

        //aqui remover imagens de navios posicionados
        tabuleiroJogador.querySelectorAll('.navio-jogador-image').forEach(el => el.remove());
        tabuleiroCPU.querySelectorAll('.celula').forEach(c => {
            c.classList.remove('navio-cpu', 'acertou', 'errou');
            c.style.background = '';
            c.style.border = '';
        });

        //aqui resetar navios e UI do painel
        naviosRestantes = navios.map(n => ({ ...n }));
        naviosPosicionados = [];
        navioSelecionado = null;
        exibirNavios();

        //aqui resetar contadores de tiros/acertos
        tirosJogador = 0;
        acertosJogador = 0;
        tirosCPU = 0;
        acertosCPU = 0;
        atualizarStats();

        //recria os tabuleiros (ajusta tamanho caso tenha mudado dificuldade)
        inicializarJogo();

        //atualiza botões do timer para estado inicial
        atualizarBotoesTimer('inicial');

        //aqui desabilita Play até que todos os navios sejam posicionados manualmente
        if (btnPlay) btnPlay.disabled = true;
    }

    // ------------------ ATAQUES ------------------
    // Referências aos tabuleiros
    const tabCPU = tabuleiroCPU;
    //aqui contadores de pontuação
    let tirosJogador = 0;
    let acertosJogador = 0;
    let tirosCPU = 0;
    let acertosCPU = 0;

    //aqui e a função para atualizar estatísticas na UI
    function atualizarStats() {
        const elTirosJog = document.getElementById('tirosJog');
        const elAcertosJog = document.getElementById('acertosJog');
        const elTirosCPU = document.getElementById('tirosCPU');
        const elAcertosCPU = document.getElementById('acertosCPU');
        const elTimeJog = document.getElementById('timeJog');
        const elTimeCPU = document.getElementById('timeCPU');
        if (elTirosJog) elTirosJog.textContent = String(tirosJogador);
        if (elAcertosJog) elAcertosJog.textContent = String(acertosJogador);
        if (elTirosCPU) elTirosCPU.textContent = String(tirosCPU);
        if (elAcertosCPU) elAcertosCPU.textContent = String(acertosCPU);
        const min = String(Math.floor(segundos / 60)).padStart(2, '0');
        const sec = String(segundos % 60).padStart(2, '0');
        if (elTimeJog) elTimeJog.textContent = `${min}:${sec}`;
        if (elTimeCPU) elTimeCPU.textContent = `${min}:${sec}`;
    }

    //aqui e a função para o jogador atacar a CPU
    tabCPU.addEventListener("click", function(e) {
        if (!gameStarted) return; // precisa ter iniciado
        if (!jogadorTurno) return; // não é vez do jogador
        const target = e.target;
        if (!target.classList.contains('celula')) return;
        // Não permitir disparo em mesma célula
        if (target.classList.contains('acertou') || target.classList.contains('errou')) return;

        //aqui incrementa tiros do jogador
        tirosJogador++;
        //aqui verifica acerto
        if (target.classList.contains('navio-cpu')) {
            target.classList.add('acertou');
            acertosJogador++;
        } else {
            target.classList.add('errou');
        }
        atualizarStats();

        //após o jogador atirar, verificar vitória da jogador
        if (verificarVitoria('cpu')) return;

        //aqui passa turno para CPU com pequeno timer
        jogadorTurno = false;
        setTimeout(() => {
            ataqueCPU();
        }, 700);
    });

    //aqui e a Função de ataque da CPU (aleatório em células não atacadas)
    function ataqueCPU() {
        const celulas = Array.from(tabuleiroJogador.querySelectorAll('.celula'));
        const disponiveis = celulas.filter(c => !c.classList.contains('acertou') && !c.classList.contains('errou'));

        //aqui escolhe uma célula aleatória disponível
        if (disponiveis.length === 0) return;
        const alvo = disponiveis[Math.floor(Math.random() * disponiveis.length)];
        tirosCPU++;

        //aqui verifica acerto
        if (alvo.classList.contains('navio-jogador')) {
            alvo.classList.add('acertou');
            acertosCPU++;
        } else {
            alvo.classList.add('errou');
        }
        atualizarStats();

        //aqui verifica vitória da CPU
        if (verificarVitoria('jogador')) return;

        //aqui volta o turno para o jogador
        jogadorTurno = true;
    }

    //aqui e a função para verificar vitória
    function verificarVitoria(alvo) {
        // alvo: 'cpu' -> verificar se CPU perdeu (todas navio-cpu acertadas)
        if (alvo === 'cpu') {
            const naviosCPU = Array.from(tabuleiroCPU.querySelectorAll('.navio-cpu'));
            if (naviosCPU.length > 0 && naviosCPU.every(c => c.classList.contains('acertou'))) {
                gameStarted = false;
                pausarTimer();
                alert('Parabéns! Você venceu!');
                // salvar resultado
                salvarResultado({
                    nome: localStorage.getItem('usuarioLogado') || 'Jogador',
                    dificuldade: document.getElementById('dificuldade') ? document.getElementById('dificuldade').value : 'medio',
                    tempoSegundos: segundos || 0,
                    tiros: tirosJogador || 0,
                    acertos: acertosJogador || 0,
                    data: new Date().toISOString()
                });
                atualizarRanking();
                return true;
            }
        }

        // alvo: 'jogador' -> verificar se jogador perdeu
        if (alvo === 'jogador') {
            const naviosJog = Array.from(tabuleiroJogador.querySelectorAll('.navio-jogador'));
            if (naviosJog.length > 0 && naviosJog.every(c => c.classList.contains('acertou'))) {
                gameStarted = false;
                pausarTimer();
                alert('A CPU venceu. Tente novamente!');
                // salvar resultado da CPU no ranking
                salvarResultado({
                    nome: 'Lumi (CPU)',
                    dificuldade: document.getElementById('dificuldade') ? document.getElementById('dificuldade').value : 'medio',
                    tempoSegundos: segundos || 0,
                    tiros: tirosCPU || 0,
                    acertos: acertosCPU || 0,
                    data: new Date().toISOString()
                });
                atualizarRanking();
                return true;
            }
        }
        return false;
    }

    // ---------- RANKING (localStorage) ----------
    //aqui e a função para salvar resultado no ranking
    function salvarResultado(resultado) {
        try {
            const chave = 'batalha-rank';
            const atual = JSON.parse(localStorage.getItem(chave) || '[]');
            atual.push(resultado);
            // ordenar: tempo asc, depois tiros asc
            atual.sort((a, b) => {
                if ((a.tempoSegundos || 0) !== (b.tempoSegundos || 0)) return (a.tempoSegundos || 0) - (b.tempoSegundos || 0);
                return (a.tiros || 0) - (b.tiros || 0);
            });
            const limitado = atual.slice(0, 20);
            localStorage.setItem(chave, JSON.stringify(limitado));
        } catch (e) {
            console.error('Erro ao salvar ranking', e);
        }
    }

    //aqui e a função para obter ranking do localStorage
    function obterRanking() {
        try {
            const chave = 'batalha-rank';
            return JSON.parse(localStorage.getItem(chave) || '[]');
        } catch (e) {
            console.error('Erro ao obter ranking', e);
            return [];
        }
    }

    //aqui e a função para formatar tempo em mm:ss
    function formatarTempo(segundosTotais) {
        const m = Math.floor(segundosTotais / 60).toString().padStart(2, '0');
        const s = (segundosTotais % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    //aqui e a função para atualizar o ranking na UI
    function atualizarRanking() {
        const lista = document.getElementById('ranking-lista');
        if (!lista) return;
        const dados = obterRanking();
        // mostrar 3 melhores tempos: 1 por dificuldade (8, 10, 15)
        lista.innerHTML = '';
        const niveis = [
            { value: '8', label: 'Fácil (8x8)' },
            { value: '10', label: 'Médio (10x10)' },
            { value: '15', label: 'Difícil (15x15)' }
        ];

        //se não houver nenhum dado, exibe mensagem padrão
        if (!dados || dados.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Sem resultados ainda';
            lista.appendChild(li);
            return;
        }

        //aqui percorre cada nível de dificuldade para encontrar o melhor resultado
        niveis.forEach(nivel => {
            const entradas = dados.filter(d => String(d.dificuldade) === String(nivel.value));
            // ordenar por tempo asc, depois tiros asc (por segurança)
            entradas.sort((a, b) => {
                // primeiro por tempo
                if ((a.tempoSegundos || 0) !== (b.tempoSegundos || 0)) return (a.tempoSegundos || 0) - (b.tempoSegundos || 0);
                return (a.tiros || 0) - (b.tiros || 0);
            });

            //aqui cria o item da lista
            const li = document.createElement('li');
            if (entradas.length === 0) {
                li.textContent = `${nivel.label}: —`;
            } else {
                const best = entradas[0];
                const tempoFmt = formatarTempo(best.tempoSegundos || 0);
                li.textContent = `${nivel.label}: ${best.nome} — ${tempoFmt} — ${best.tiros} tiros — ${best.acertos || 0} acertos`;
            }
            lista.appendChild(li);
        });
    }

    //aqui atualiza ranking ao inicializar a página
    atualizarRanking();

    //aqui e o botão para mostrar/ocultar navios da CPU - so para testes.
    const btnMostrarCPU = document.getElementById("btnMostrarCPU");
    let cpuVisivel = false;
    if (btnMostrarCPU) {
        btnMostrarCPU.addEventListener("click", function() {
            cpuVisivel = !cpuVisivel;
            document.querySelectorAll(".navio-cpu").forEach(celula => {
                if (cpuVisivel) {
                    celula.style.background = "#f55";
                    celula.style.border = "2px solid #900";
                } else {
                    celula.style.background = "";
                    celula.style.border = "";
                }
            });
            btnMostrarCPU.textContent = cpuVisivel ? "Ocultar Navios CPU" : "Mostrar Navios CPU";
        });
    }
});
