// ============================================================
// 🧠 MOTOR JAVASCRIPT INFORBOT - REVISADO E SEM BOTÕES
// ============================================================

const DATABASE = {
    treino: {
        "oi": "E aí Roberto! Sou o Inforbot, pronto para ajudar.",
        "quem e voce": "Sou o Inforbot, criado pelo gênio Roberto.",
        "roberto": "O mestre criador! Sempre uma honra.",
        "ajuda": "Digite 'jogos' para ver os games ou pergunte algo!",
        "bora": "Bora, Roberto!",
        "vambora": "Vambora! Circuitos prontos!"
    },
    anatomia: [
        {q: "Qual o maior osso do corpo humano?", a: "femur"},
        {q: "Qual o maior órgão do corpo humano?", a: "pele"},
        {q: "Quantos ossos tem um adulto?", a: "206"},
        {q: "Qual o músculo mais forte do corpo?", a: "masseter"}
    ],
    geografia: [
        {q: "Qual a capital do Brasil?", a: "brasilia"},
        {q: "Qual a capital da França?", a: "paris"},
        {q: "Qual a capital do Japão?", a: "toquio"}
    ]
};

let modoJogo = false;
let respostaCerta = "";

// 1. FUNÇÃO DE ENVIO (O GATILHO)
function send() {
    const input = document.getElementById("userInput");
    const texto = input.value.trim();
    
    if (!texto) return;

    userSay(texto); // Mostra o que o Roberto digitou
    input.value = ""; // Limpa a barra
    
    analyze(texto); // Envia para o cérebro do bot
}

// 2. CÉREBRO DO INFORBOT (ANALYZE)
async function analyze(msg) {
    // Normaliza o texto: minúsculo e sem acentos
    let raw = msg.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // --- A: VERIFICAÇÃO DE JOGO ATIVO ---
    if (modoJogo) {
        if (raw.includes(respostaCerta.toString().toLowerCase())) {
            modoJogo = false;
            return botSayAnim("🎆 **FENOMENAL!** Você acertou, Roberto!", "acerto");
        } else if (raw === "parar" || raw === "sair") {
            modoJogo = false;
            return botSay("Jogo encerrado. O que vamos pesquisar?");
        } else {
            return botSayAnim("❌ **ERRADO!** Tente de novo ou diga 'parar'.", "erro");
        }
    }

    // --- B: COMANDO JOGOS OU JOGO ---
    if (raw === "jogos" || raw === "jogo") {
        return botSay("🎮 **MENU DE JOGOS DO INFORBOT**<br><br>" +
               "Roberto, digite apenas a letra para começar:<br><br>" +
               "🅰️ **A** - Jogo da Sorte (1 a 10)<br>" +
               "🅱️ **B** - Desafio de Matemática<br>" +
               "🅲 **C** - Quiz de Anatomia<br>" +
               "🅳 **D** - Quiz de Capitais<br>" +
               "🅴 **E** - Palavra Invertida<br><br>" +
               "Diga **'parar'** para sair de um jogo.");
    }

    // --- C: SE O USUÁRIO DIGITAR APENAS A LETRA DO JOGO ---
    if (["a", "b", "c", "d", "e"].includes(raw)) {
        return iniciarJogo(raw);
    }

    // --- D: MATEMÁTICA ---
    if (/[0-9]/.test(raw) && /[\+\-\*\/\^vx:]/.test(raw)) {
        try {
            let exp = raw.replace(/x/g, "*").replace(/:/g, "/").replace(/v/g, "sqrt").replace(/,/g, ".");
            let res = math.evaluate(exp);
            return botSay(`Roberto, o resultado é: **${res}**.`);
        } catch(e) {}
    }

    // --- E: DATABASE DE TREINO ---
    for (let key in DATABASE.treino) {
        if (raw.includes(key)) return botSay(DATABASE.treino[key]);
    }

    // --- F: WIKIPEDIA (20 MAIORES) ---
    if (raw.includes("o que e") || raw.includes("quem e") || raw.split(" ").length <= 2) {
        setLoading(true);
        const wikis = ['en','pt','es','fr','de','it','ru','ja','zh','nl'];
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
        botSay("Não encontrei nada, Roberto. Tente outro termo!");
    }
}

// 3. LOGICA DOS JOGOS
function iniciarJogo(letra) {
    modoJogo = true;
    if (letra === "a") {
        respostaCerta = Math.floor(Math.random() * 10) + 1;
        botSay("🎰 Pensei em um número de **1 a 10**. Qual seu palpite?");
    } else if (letra === "b") {
        let n1 = Math.floor(Math.random() * 100), n2 = Math.floor(Math.random() * 100);
        respostaCerta = n1 + n2;
        botSay(`🧮 Roberto, quanto é **${n1} + ${n2}**?`);
    } else if (letra === "c") {
        let p = DATABASE.anatomia[Math.floor(Math.random() * DATABASE.anatomia.length)];
        respostaCerta = p.a;
        botSay(`🧬 **ANATOMIA:** ${p.q}`);
    } else if (letra === "d") {
        let p = DATABASE.geografia[Math.floor(Math.random() * DATABASE.geografia.length)];
        respostaCerta = p.a;
        botSay(`🌍 **CAPITAIS:** ${p.q}`);
    } else if (letra === "e") {
        const pal = ["inforbot", "roberto", "ciencia", "tecnologia"];
        let escolhida = pal[Math.floor(Math.random() * pal.length)];
        respostaCerta = escolhida;
        botSay(`🔄 **INVERTIDO:** Que palavra é esta: **${escolhida.split('').reverse().join('')}**?`);
    }
}

// 4. FUNÇÕES DE INTERFACE
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

function setLoading(show) {
    const loader = document.getElementById("loading");
    if(loader) loader.style.display = show ? "flex" : "none";
}

// Evento de Teclado
document.getElementById("userInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") send();
});
