// --- SISTEMA DE MINIGAMES DO INFORBOT ---
let modoJogo = false;
let respostaCerta = "";

// Função que abre o menu quando clica no botão "JOGOS"
function abrirMenuJogos() {
    botSay("🎮 **MENU DE JOGOS:** Escolha um desafio, Roberto:<br><br>" +
           "<button class='game-btn anim' onclick='iniciarJogo(\"sorte\")'>🔢 NÚMERO</button> " +
           "<button class='game-btn anim' onclick='iniciarJogo(\"math\")'>🧮 MATEMÁTICA</button> " +
           "<button class='game-btn anim' onclick='iniciarJogo(\"anatomia\")'>🧬 ANATOMIA</button>");
}

// Inicia o jogo escolhido
function iniciarJogo(tipo) {
    modoJogo = true;
    if (tipo === "sorte") {
        respostaCerta = Math.floor(Math.random() * 10) + 1;
        botSay("🎰 Pensei em um número de **1 a 10**. Qual o seu palpite?");
    } else if (tipo === "math") {
        let n1 = Math.floor(Math.random() * 100), n2 = Math.floor(Math.random() * 100);
        respostaCerta = n1 + n2;
        botSay(`🧮 Roberto, quanto é **${n1} + ${n2}**?`);
    } else if (tipo === "anatomia") {
        const perguntas = [
            {q: "Qual o maior osso do corpo humano?", a: "femur"},
            {q: "Qual o maior órgão do corpo humano?", a: "pele"},
            {q: "Quantos ossos tem um adulto?", a: "206"}
        ];
        let p = perguntas[Math.floor(Math.random() * perguntas.length)];
        respostaCerta = p.a;
        botSay(`🧬 **QUIZ:** ${p.q}`);
    }
}

// ATUALIZAÇÃO DA FUNÇÃO ANALYZE (IMPORTANTE)
// Adicione esta parte no INÍCIO da sua função analyze(msg) ou send()
function verificarRespostaJogo(msg) {
    if (modoJogo) {
        let chute = msg.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (chute.includes(respostaCerta.toString().toLowerCase())) {
            modoJogo = false;
            botSay("🎆 **ACERTOU!** Você é um gênio, Roberto!");
            return true; 
        } else if (chute.includes("parar")) {
            modoJogo = false;
            botSay("Jogo encerrado.");
            return true;
        } else {
            botSay("❌ Errado! Tente de novo ou diga **'parar'**.");
            return true;
        }
    }
    return false;
}
