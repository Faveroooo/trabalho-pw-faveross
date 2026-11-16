// Alterna entre o modo claro e escuro e salva a preferência do usuário
const botaoTema = document.getElementById("tema");

if (botaoTema) {
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "escuro") {
        document.body.classList.add("escuro");
        botaoTema.textContent = "☀️ Modo claro";
    } else {
        botaoTema.textContent = "🌙 Modo escuro";
    }

    botaoTema.addEventListener("click", function () {
        document.body.classList.toggle("escuro");

        if (document.body.classList.contains("escuro")) {
            localStorage.setItem("tema", "escuro");
            botaoTema.textContent = "☀️ Modo claro";
        } else {
            localStorage.setItem("tema", "claro");
            botaoTema.textContent = "🌙 Modo escuro";
        }
    });
}

// Exibe a data de hoje formatada automaticamente no topo
const spanData = document.getElementById("data");
if (spanData) {
    const opcoesData = { weekday: 'short', day: 'numeric', month: 'short' };
    const dataAtual = new Date().toLocaleDateString('pt-BR', opcoesData);
    spanData.textContent = dataAtual;
}

// Atualiza o ano atual de forma automática no rodapé
const spanAno = document.getElementById("ano");
if (spanAno) {
    spanAno.textContent = new Date().getFullYear();
}

// Verifica se o vídeo do Gol do Sidney carrega corretamente
const videoGol = document.getElementById("videoGol");
const mensagemVideo = document.getElementById("mensagemVideo");

if (videoGol && mensagemVideo) {
    videoGol.addEventListener("error", function () {
        mensagemVideo.textContent = "Erro ao carregar o vídeo Gol Sidney.mp4.";
    });
}

// Simula o carregamento dos jogos de hoje na página inicial
const listaJogos = document.getElementById("lista-jogos");

if (listaJogos) {
    setTimeout(() => {
        listaJogos.innerHTML = `
            <div class="jogos">
                <div class="card">
                    <span class="campeonato">Champions League</span>
                    <h3>Real Madrid x Manchester City</h3>
                    <p class="data">Hoje às 16:00</p>
                </div>
                <div class="card">
                    <span class="campeonato">Premier League</span>
                    <h3>Arsenal x Liverpool</h3>
                    <p class="data">Hoje às 13:30</p>
                </div>
            </div>
        `;
    }, 600);
}

// Gerencia a lista de tarefas interativa (adiciona e remove itens)
const inputTarefa = document.getElementById("nova-tarefa");
const botaoAdicionarTarefa = document.getElementById("adicionar-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");

if (botaoAdicionarTarefa && inputTarefa && listaTarefas) {
    botaoAdicionarTarefa.addEventListener("click", function () {
        const texto = inputTarefa.value.trim();
        if (texto !== "") {
            const li = document.createElement("li");
            li.innerHTML = `<span>${texto}</span><button type="button" style="padding: 4px 8px; font-size: 12px; background: #e11d48;">Remover</button>`;
            li.querySelector("button").addEventListener("click", () => li.remove());
            listaTarefas.appendChild(li);
            inputTarefa.value = "";
        }
    });
}

// Controle do cadastro e login do torcedor
const formCadastro = document.getElementById("form-cadastro");
const mensagemCadastro = document.getElementById("mensagem-cadastro");
const avisoBloqueio = document.getElementById("aviso-bloqueio");
const caixaEnvioCorneta = document.getElementById("caixa-envio-corneta");
const botaoSair = document.getElementById("botao-sair");

let usuarioLogado = localStorage.getItem("torcedorFaveroSS");

// Função para atualizar a tela conforme o status de login
function verificarStatusLogin() {
    usuarioLogado = localStorage.getItem("torcedorFaveroSS");

    if (usuarioLogado) {
        if (avisoBloqueio) avisoBloqueio.style.display = "none";
        if (caixaEnvioCorneta) caixaEnvioCorneta.style.display = "flex";
        if (botaoSair) botaoSair.style.display = "block";
        const btnSub = formCadastro?.querySelector("button[type='submit']");
        if (btnSub) btnSub.style.display = "none";
    } else {
        if (avisoBloqueio) avisoBloqueio.style.display = "block";
        if (caixaEnvioCorneta) caixaEnvioCorneta.style.display = "none";
        if (botaoSair) botaoSair.style.display = "none";
        const btnSub = formCadastro?.querySelector("button[type='submit']");
        if (btnSub) btnSub.style.display = "block";
    }
}

// Executa a verificação ao carregar a página
verificarStatusLogin();

if (formCadastro && mensagemCadastro) {
    if (usuarioLogado) {
        mensagemCadastro.style.color = "var(--destaque)";
        mensagemCadastro.textContent = `E aí, ${usuarioLogado}! Conectado.`;
    }

    formCadastro.addEventListener("submit", function (e) {
        e.preventDefault();
        const nome = document.getElementById("nome").value.trim();
        if (nome) {
            localStorage.setItem("torcedorFaveroSS", nome);
            usuarioLogado = nome;
            mensagemCadastro.style.color = "var(--destaque)";
            mensagemCadastro.textContent = `Boa, ${nome}! Cadastro feito.`;
            verificarStatusLogin();
            formCadastro.reset();
        }
    });
}

// Ação do botão sair da conta
if (botaoSair) {
    botaoSair.addEventListener("click", function () {
        localStorage.removeItem("torcedorFaveroSS");
        mensagemCadastro.textContent = "Você saiu.";
        verificarStatusLogin();
    });
}

// Gerenciador do Mural da Corneta (Mensagem Normal)
const inputCorneta = document.getElementById("pergunta");
const botaoCornetar = document.getElementById("enviar-pergunta");
const muralConversa = document.getElementById("conversa");

if (botaoCornetar && inputCorneta && muralConversa) {
    botaoCornetar.addEventListener("click", function (e) {
        e.preventDefault();
        const torcedor = localStorage.getItem("torcedorFaveroSS");
        const texto = inputCorneta.value.trim();

        if (torcedor && texto !== "") {
            const p = document.createElement("div");
            p.className = "resposta";
            p.innerHTML = `<p>🗣️ <b>${torcedor}:</b> ${texto}</p>`;
            muralConversa.appendChild(p);
            inputCorneta.value = "";
            muralConversa.scrollTop = muralConversa.scrollHeight;
        }
    });
}

// Aviso de atualizações no Modo IA
const botaoIA = document.getElementById("enviar-ia");

if (botaoIA && inputCorneta && muralConversa) {
    botaoIA.addEventListener("click", function (e) {
        e.preventDefault();
        const torcedor = localStorage.getItem("torcedorFaveroSS");
        const texto = inputCorneta.value.trim();

        if (torcedor && texto !== "") {
            // Exibe a mensagem do torcedor no mural
            const pUser = document.createElement("div");
            pUser.className = "resposta";
            pUser.innerHTML = `<p>🗣️ <b>${torcedor}:</b> ${texto}</p>`;
            muralConversa.appendChild(pUser);

            // Resposta informando as atualizações do modo IA e indicando as 5 seções
            setTimeout(function () {
                const pIA = document.createElement("div");
                pIA.className = "resposta";
                pIA.style.borderColor = "#2563eb";
                pIA.innerHTML = `
                    <p>🤖 <b>FaveroSS IA:</b> O Modo IA está passando por várias atualizações e novidades em breve! 🚀</p>
                    <p style="margin-top: 6px; font-size: 13px; opacity: 0.9;">
                        Enquanto isso, que tal conferir nossos 5 temas principais?<br>
                        ⚽ <b>Início</b> (Jogos e lance do Sidney)<br>
                        🏃 <b>Jogadores</b> (Fichas e destaques)<br>
                        🏆 <b>Bola de Ouro</b> (Melhores do mundo)<br>
                        🎬 <b>Gols Históricos</b> (Momentos marcantes)<br>
                        📊 <b>Rankings</b> (Tabelas e classificações)
                    </p>
                `;
                muralConversa.appendChild(pIA);
                muralConversa.scrollTop = muralConversa.scrollHeight;
            }, 400);

            inputCorneta.value = "";
        }
    });
}
