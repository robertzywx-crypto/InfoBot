// ============================================================
// 🧠 MOTOR JAVASCRIPT INFORBOT ELITE - 5 JOGOS + 20 WIKIS
// ============================================================

const DATABASE = {
    treino: {
        "oi": "E aí Roberto! Sou o Inforbot, seu braço direito tecnológico.",
        "quem e voce": "Sou o Inforbot, uma inteligência avançada criada pelo mestre Roberto.",
        "roberto": "O mestre criador! Sempre pronto para suas ordens.",
        "ajuda": "Posso pesquisar em 20 Wikis, calcular matemática complexa ou jogar 5 tipos de games!",
        "bora": "Bora, Roberto! O que temos para hoje?",
        "vambora": "Vambora! Circuitos em 100%!"
    },
    anatomia: [
        {q: "Qual o maior osso do corpo humano?", a: "femur"},
        {q: "Qual o maior órgão do corpo humano?", a: "pele"},
        {q: "Quantos ossos tem um adulto?", a: "206"},
        {q: "Qual o músculo mais forte do corpo?", a: "masseter"},
        {q: "Qual o menor osso do corpo humano?", a: "estribo"}
    ],
    geografia: [
        {q: "Qual a capital do Brasil?", a: "brasilia"},
        {q: "Qual a capital da França?", a: "paris"},
        {q: "Qual a capital do Japão?", a: "toquio"},
        {q: "Qual a capital da Itália?", a: "roma"}
    ]
};

let modoJogo = false;
let respostaCerta = "";
let ultimaMensagem = "";

// --- FUNÇÃO PARA O BOTÃO JOGOS (CHAMADA PELO HTML) ---
function abrirMenuJogos() {
    userSay("JOGOS"); // Escreve automaticamente
    setTimeout(() => {
        botSay("🎮 **MENU DE JOGOS DO INFORBOT**<br><br>" +
               "Escolha uma opção digitando a letra:<br>" +
               "🅰️ **Digite A** para Jogo da Sorte (1 a 10)<br>" +
               "🅱️ **Digite B** para Desafio de Matemática<br>" +
               "🅲 **Digite C** para Quiz de Anatomia<br>" +
               "🅳 **Digite D** para Quiz de Capitais<br>" +
               "🅴 **Digite E** para Palavra Invertida<br><br>" +
               "Ou clique nos botões:<br>" +
               "<button class='game-btn anim' onclick='iniciarJogo(\"a\")'>A</button>" +
               "<button class='game-btn anim' onclick='iniciarJogo(\"b\")'>B</button>" +
               "<button class='game-btn anim' onclick='iniciarJogo(\"c\")'>C</button>" +
               "<button class='game-btn anim' onclick='iniciarJogo(\"d\")'>D</button>" +
               "<button class='game-btn anim' onclick='iniciarJogo(\"e\")'>E</button>");
    }, 500);
}

// --- LOGICA DOS 5 JOGOS ---
function iniciarJogo(letra) {
    modoJogo = true;
    let l = letra.toLowerCase();
    
    if (l === "a") {
        respostaCerta = Math.floor(Math.random() * 10) + 1;
        botSay("🎰 **JOGO DA SORTE:** Pensei em um número de **1 a 10**. Qual o seu palpite?");
    } else if (l === "b") {
        let n1 = Math.floor(Math.random() * 200), n2 = Math.floor(Math.random() * 200);
        respostaCerta = n1 + n2;
        botSay(`🧮 **MATH:** Roberto, quanto é **${n1} + ${n2}**?`);
    } else if (l === "c") {
        let p = DATABASE.anatomia[Math.floor(Math.random() * DATABASE.anatomia.length)];
        respostaCerta = p.a;
        botSay(`🧬 **ANATOMIA:** ${p.q}`);
    } else if (l === "d") {
        let p = DATABASE.geografia[Math.floor(Math.random() * DATABASE.geografia.length)];
        respostaCerta = p.a;
        botSay(`🌍 **CAPITAIS:** ${p.q}`);
    } else if (l === "e") {
        const palavras = ["inforbot", "roberto", "computador", "ciencia"];
        let p = palavras[Math.floor(Math.random() * palavras.length)];
        respostaCerta = p;
        let inv = p.split('').reverse().join('');
        botSay(`🔄 **INVERTIDO:** Que palavra é esta: **${inv}**?`);
    }
}

// --- ANALYZE ATUALIZADO ---
async function analyze(msg) {
    let raw = msg.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 1. VERIFICA SE ESTÁ NO JOGO
    if (modoJogo) {
        if (raw.includes(respostaCerta.toString().toLowerCase())) {
            modoJogo = false;
            return botSayAnim("🎆 **ACERTOU!** Você é imparável, Roberto!", "acerto");
        } else if (raw.includes("parar") || raw.includes("sair")) {
            modoJogo = false;
            return botSay("Jogo encerrado. O que vamos pesquisar?");
        } else {
            return botSayAnim("❌ **ERROU!** Tente de novo ou diga 'parar'.", "erro");
        }
    }

    // 2. ATALHOS DE JOGO (A, B, C, D, E) OU PALAVRA JOGOS
    if (["a", "b", "c", "d", "e"].includes(raw) && !modoJogo) return iniciarJogo(raw);
    if (raw === "jogos" || raw === "jogar") return abrirMenuJogos();

    // 3. MATEMÁTICA
    if (/[0-9]/.test(raw) && /[\+\-\*\/\^\(\)Vvx:]/.test(raw)) {
        try {
            let exp = raw.replace(/x/g, "*").replace(/:/g, "/").replace(/v/g, "sqrt").replace(/,/g, ".");
            return botSay(`Roberto, o resultado é: **${math.evaluate(exp)}**.`);
        } catch(e) {}
    }

    // 4. TREINO
    for (let key in DATABASE.treino) {
        if (raw.includes(key)) return botSay(DATABASE.treino[key]);
    }

    // 5. WIKIPEDIA (20 MAIORES)
    if (raw.includes("o que e") || raw.split(" ").length <= 2) {
        setLoading(true);
        const wikis = ['en','ceb','de','sv','fr','nl','ru','es','it','arz','pl','ja','zh','vi','war','uk','ar','pt','fa','ca'];
        let query = raw.replace(/o que e|quem e|sobre/g, "").trim();
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
        botSay("Não encontrei nas 20 maiores Wikis. Tente ser mais específico, Roberto.");
    }
}

// --- FUNÇÕES DE INTERFACE ---
function botSay(txt) {
    const chat = document.getElementById("chat");
    chat.innerHTML += `<div class="bot-msg"><div class="bubble">${txt}</div></div>`;
    chat.scrollTop = chat.scrollHeight;
}

function botSayAnim(txt, tipo) {
    const chat = document.getElementById("chat");
    let cl = tipo === "acerto" ? "msg-acerto" : "msg-erro";
    chat.innerHTML += `<div class="bot-msg"><div class="bubble ${cl}">${txt}</div></div>`;
    chat.scrollTop = chat.scrollHeight;
}

function userSay(txt) {
    const chat = document.getElementById("chat");
    chat.innerHTML += `<div class="user-msg"><div class="bubble">${txt}</div></div>`;
    chat.scrollTop = chat.scrollHeight;
}

function send() {
    const input = document.getElementById("userInput");
    if (!input.value) return;
    let v = input.value;
    userSay(v);
    analyze(v);
    input.value = "";
}

function setLoading(show) {
    document.getElementById("loading").style.display = show ? "flex" : "none";
}

document.getElementById("userInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") send();
});
