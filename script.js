<script>
// ==================================================
// ELEMENTOS
// ==================================================
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

// ==================================================
// MEMÓRIA INTELIGENTE
// ==================================================
const brainMemory = {
    topic: null,
    mode: "normal", // normal | study | chat
    lastAnswer: null
};

// ==================================================
// UI
// ==================================================
function addBubble(text, type) {
    const msg = document.createElement("div");
    msg.className = "message";

    const bubble = document.createElement("div");
    bubble.className = type;
    bubble.innerText = text;

    msg.appendChild(bubble);
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function botType(text) {
    const msg = document.createElement("div");
    msg.className = "message";
    const bubble = document.createElement("div");
    bubble.className = "bot";
    msg.appendChild(bubble);
    chat.appendChild(msg);

    let i = 0;
    const speed = 13;
    const typing = setInterval(() => {
        bubble.innerText += text[i];
        i++;
        chat.scrollTop = chat.scrollHeight;
        if (i >= text.length) clearInterval(typing);
    }, speed);
}

// ==================================================
// EVENTOS
// ==================================================
button.onclick = send;
input.onkeypress = e => e.key === "Enter" && send();

function send() {
    const text = input.value.trim();
    if (!text) return;

    addBubble(text, "user");
    input.value = "";

    setTimeout(() => {
        botType("Pensando...");
        mainAI(text);
    }, 250);
}

// ==================================================
// IA PRINCIPAL
// ==================================================
function mainAI(text) {
    const q = text.toLowerCase();

    // Classificação de intenção
    if (isMath(q)) return mathAI(q);
    if (isStudy(q)) return studyAI(q);
    if (isConversation(q)) return chatAI(q);
    if (isDefinition(q)) return definitionAI(q);

    // Internet só se nada resolver
    internetAI(q);
}

// ==================================================
// MATEMÁTICA INTELIGENTE (SEM eval)
// ==================================================
function isMath(q) {
    return /\d/.test(q) && /[\+\-\*\/]/.test(q);
}

function mathAI(q) {
    try {
        const exp = q.match(/[\d\+\-\*\/\(\)\. ]+/)[0];
        const result = Function(`return ${exp}`)();

        botType(
            `🧮 Vamos resolver juntos:\n\n` +
            `Expressão: ${exp}\n` +
            `Calculando passo a passo...\n` +
            `✅ Resultado final: ${result}`
        );
    } catch {
        botType("Não consegui entender essa conta 😕");
    }
}

// ==================================================
// MODO PROFESSOR
// ==================================================
function isStudy(q) {
    return q.includes("explique") ||
           q.includes("estudar") ||
           q.includes("prova") ||
           q.includes("trabalho");
}

function studyAI(q) {
    brainMemory.mode = "study";
    brainMemory.topic = q;

    botType(
        "🎓 **Modo Professor ativado**\n\n" +
        "Vou explicar assim:\n" +
        "1️⃣ O que é\n" +
        "2️⃣ Como funciona\n" +
        "3️⃣ Exemplo\n" +
        "4️⃣ Resumo\n\n" +
        "Diga o conteúdo que quer aprender."
    );
}

// ==================================================
// DEFINIÇÕES HUMANAS
// ==================================================
function isDefinition(q) {
    return q.startsWith("o que é") ||
           q.startsWith("quem é") ||
           q.startsWith("o que significa");
}

function definitionAI(q) {
    const topic = q
        .replace("o que é", "")
        .replace("quem é", "")
        .replace("o que significa", "")
        .trim();

    brainMemory.topic = topic;

    botType(
        `📘 **${topic}** explicado de forma simples:\n\n` +
        `É um conceito importante que aparece muito em estudos.\n` +
        `Se quiser, posso explicar com exemplos ou resumir 🙂`
    );
}

// ==================================================
// CONVERSA NATURAL
// ==================================================
function isConversation(q) {
    return ["oi","olá","tudo bem","obrigado","bom dia","boa tarde"].some(w => q.includes(w));
}

function chatAI(q) {
    if (q.includes("oi") || q.includes("olá"))
        return botType("Oi 😄 Eu sou o InfoBot. O que vamos aprender hoje?");

    if (q.includes("tudo bem"))
        return botType("Tudo sim 😊 E você?");

    if (q.includes("obrigado"))
        return botType("De nada! Sempre feliz em ajudar 🤝");
}

// ==================================================
// INTERNET INTELIGENTE
// ==================================================
function internetAI(query) {
    const wiki = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

    fetch(wiki)
        .then(r => r.json())
        .then(d => {
            if (d.extract) {
                botType("🌐 " + d.extract);
            } else {
                duckAI(query);
            }
        })
        .catch(() => duckAI(query));
}

function duckAI(query) {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`;

    fetch(url)
        .then(r => r.json())
        .then(d => {
            const ans =
                d.AbstractText ||
                d.RelatedTopics?.[0]?.Text ||
                "Não achei algo claro, mas posso explicar com minhas próprias palavras 🙂";

            botType(ans);
        })
        .catch(() => botType("Erro ao acessar a internet 😕"));
}
</script>
