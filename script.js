// ==========================================
// 🧠 MOTOR JAVASCRIPT INFORBOT - ELITE V20
// ==========================================

const DATABASE = {
    treino: {
        "oi": "E aí Roberto! Sou o Inforbot, pronto para mais uma descoberta?",
        "quem e voce": "Eu sou o Inforbot, seu assistente inteligente criado pelo gênio Roberto.",
        "roberto": "O mestre criador! Sempre uma honra conversar com você.",
        "ajuda": "Estou aqui, Roberto! Posso calcular, pesquisar nas 20 maiores Wikis ou jogar com você.",
        "tudo bem": "Tudo excelente! Meus circuitos estão operando em 100% de eficiência.",
        "bora": "Bora, mestre! O que vamos fazer agora?",
        "vambora": "Vambora! Estou com os circuitos carregados."
    },
    anatomia: [
        {q: "Qual o maior osso do corpo humano?", a: "femur"},
        {q: "Qual órgão bombeia o sangue?", a: "coracao"},
        {q: "Quantos ossos tem um adulto?", a: "206"},
        {q: "Qual o maior órgão do corpo?", a: "pele"},
        {q: "Qual músculo é o mais forte?", a: "masseter"},
        {q: "Qual o menor osso do corpo?", a: "estribo"},
        {q: "Quantos dentes tem um adulto?", a: "32"},
        {q: "Qual o principal osso da bacia?", a: "ilio"},
        {q: "Onde se localiza o rádio e a ulna?", a: "antebraco"}
    ],
    piadas: [
        "Por que o programador faliu? Porque ele ficou sem cache!",
        "O que o zero disse para o oito? Belo cinto!",
        "Por que o livro de matemática se suicidou? Tinha muitos problemas."
    ],
    curiosidades: [
        "O diamante é o material natural mais duro.",
        "O DNA guarda terabytes de dados em uma gota.",
        "Existem vulcões submarinos aos milhares."
    ]
};

let modoJogo = false;
let respostaCerta = "";
let ultimaMensagem = ""; 

// 1. SISTEMA DE JOGOS E BOTÕES
function abrirMenuJogos() {
    botSay("🎮 **MENU DE JOGOS:** Escolha um desafio, Roberto:<br><br>" +
           "<button class='game-btn anim' onclick='iniciarJogo(\"sorte\")'>🔢 NÚMERO</button> " +
           "<button class='game-btn anim' onclick='iniciarJogo(\"math\")'>🧮 MATH</button> " +
           "<button class='game-btn anim' onclick='iniciarJogo(\"anatomia\")'>🧬 ANATOMIA</button>");
}

function iniciarJogo(tipo) {
    modoJogo = true;
    if (tipo === "sorte") {
        respostaCerta = Math.floor(Math.random() * 10) + 1;
        botSay("🎰 **JOGO DA SORTE:** Pensei em um número de **1 a 10**. Qual o seu palpite?");
    } else if (tipo === "math") {
        let n1 = Math.floor(Math.random() * 200), n2 = Math.floor(Math.random() * 200);
        respostaCerta = n1 + n2;
        botSay(`🧮 **MATH:** Roberto, quanto é **${n1} + ${n2}**?`);
    } else if (tipo === "anatomia") {
        let p = DATABASE.anatomia[Math.floor(Math.random() * DATABASE.anatomia.length)];
        respostaCerta = p.a;
        botSay(`🧬 **ANATOMIA:** ${p.q}`);
    }
}

// 2. MOTOR DE ANÁLISE (O CORAÇÃO DO INFORBOT)
async function analyze(msg) {
    let raw = msg.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // A: PRIORIDADE MÁXIMA - MODO JOGO
    if (modoJogo) {
        if (raw.includes(respostaCerta.toString().toLowerCase())) {
            modoJogo = false;
            return botSayAnim("🎆 **FENOMENAL!** Você acertou, Roberto!", "acerto");
        } else if (raw.includes("parar") || raw.includes("sair")) {
            modoJogo = false;
            return botSay("Jogo encerrado. Voltando ao modo consulta.");
        } else {
            return botSayAnim("❌ **ERRADO!** Tente de novo ou diga 'parar'.", "erro");
        }
    }

    // B: COMANDO DE JOGOS
    if (raw === "jogos" || raw === "jogar" || raw === "minigames") return abrirMenuJogos();

    // C: MATEMÁTICA AVANÇADA
    if (/[0-9]/.test(raw) && /[\+\-\*\/\^\(\)Vvx:]/.test(raw)) {
        try {
            let exp = raw.replace(/x/g, "*").replace(/:/g, "/").replace(/v/g, "sqrt").replace(/,/g, ".");
            let res = math.evaluate(exp);
            return botSay(`Roberto, a solução lógica é: **${res}**.`);
        } catch(e) {}
    }

    // D: BUSCA NO TREINO (CONVERSA REAL)
    for (let key in DATABASE.treino) {
        if (raw.includes(key)) return botSay(DATABASE.treino[key]);
    }

    // E: PESQUISA NAS 20 MAIORES WIKIPEDIAS
    if (raw.includes("o que e") || raw.includes("quem e") || raw.split(" ").length <= 2) {
        setLoading(true);
        let query = raw.replace(/o que e|quem e|sobre/g, "").trim();
        // AS 20 MAIORES WIKIPEDIAS EM VOLUME DE ARTIGOS
        const wikis = ['en','ceb','de','sv','fr','nl','ru','es','it','arz','pl','ja','zh','vi','war','uk','ar','pt','fa','ca'];
        
        for (let l of wikis) {
            try {
                const r = await fetch(`https://${l}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}?origin=*`);
                if (r.ok) {
                    const d = await r.json();
                    setLoading(false);
                    return botSay(`**Inforbot Wiki (${l.toUpperCase()}):** ${d.extract}`);
                }
            } catch(e){}
        }
        setLoading(false);
        botSay("Procurei nas 20 maiores Wikipedias e não encontrei nada. Tente outro termo!");
    }
}

// 3. FUNÇÕES DE INTERFACE (UI)
function botSay(txt) {
    const chat = document.getElementById("chat");
    const d = document.createElement("div");
    d.className = "bot-msg";
    d.innerHTML = `<div class="bubble">${txt}</div>`;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
}

function botSayAnim(txt, tipo) {
    const chat = document.getElementById("chat");
    const d = document.createElement("div");
    d.className = "bot-msg";
    let classe = tipo === "acerto" ? "msg-acerto" : "msg-erro";
    d.innerHTML = `<div class="bubble ${classe}">${txt}</div>`;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
}

function userSay(txt) {
    const chat = document.getElementById("chat");
    const d = document.createElement("div");
    d.className = "user-msg";
    d.innerHTML = `<div class="bubble">${txt}</div>`;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
}

function send() {
    const input = document.getElementById("userInput");
    if (!input.value) return;
    userSay(input.value);
    analyze(input.value);
    input.value = "";
}

function fast(type) {
    if (type === 'piada') {
        botSay("🤡 " + DATABASE.piadas[Math.floor(Math.random() * DATABASE.piadas.length)]);
    } else if (type === 'curio') {
        botSay("💡 " + DATABASE.curiosidades[Math.floor(Math.random() * DATABASE.curiosidades.length)]);
    }
}

function setMode(mode) {
    if (mode === 'light') document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');
}

function setLoading(show) {
    document.getElementById("loading").style.display = show ? "flex" : "none";
}

function listen() {
    const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    rec.lang = 'pt-BR';
    rec.start();
    rec.onresult = (e) => {
        document.getElementById("userInput").value = e.results[0][0].transcript;
        send();
    };
}

document.getElementById("userInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") send();
});
