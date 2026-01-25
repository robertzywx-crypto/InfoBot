<script>
// ================= CONFIG =================
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

const memory = [];

// ================= UI =================
function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = "message";

    const bubble = document.createElement("div");
    bubble.className = type;
    bubble.innerText = text;

    msg.appendChild(bubble);
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function botTyping(text) {
    const msg = document.createElement("div");
    msg.className = "message";

    const bubble = document.createElement("div");
    bubble.className = "bot";
    msg.appendChild(bubble);
    chat.appendChild(msg);

    let i = 0;
    const interval = setInterval(() => {
        bubble.innerText += text[i];
        i++;
        chat.scrollTop = chat.scrollHeight;
        if (i >= text.length) clearInterval(interval);
    }, 20);
}

// ================= EVENTS =================
button.onclick = sendMessage;
input.onkeypress = e => e.key === "Enter" && sendMessage();

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";
    memory.push({ role: "user", text });

    setTimeout(() => {
        botTyping("Pensando...");
        processQuestion(text);
    }, 400);
}

// ================= INTELIGÊNCIA =================
function processQuestion(q) {
    const question = q.toLowerCase();

    // 1️⃣ MATEMÁTICA
    if (isMath(question)) {
        return botTyping("🧮 " + solveMath(question));
    }

    // 2️⃣ CONVERSA
    const talk = conversationAI(question);
    if (talk) return botTyping(talk);

    // 3️⃣ ESCOLA / ESTUDO
    const study = schoolHelper(question);
    if (study) return botTyping(study);

    // 4️⃣ INTERNET
    searchInternet(question);
}

// ================= MATEMÁTICA =================
function isMath(q) {
    return /\d+/.test(q) && /[\+\-\*\/]/.test(q);
}

function solveMath(q) {
    try {
        const exp = q
            .replace("quanto é", "")
            .replace("?", "")
            .replace(",", ".")
            .match(/[\d\.\+\-\*\/\(\) ]+/)[0];

        const result = eval(exp);
        return `O resultado é ${result}.`;
    } catch {
        return "Não consegui resolver essa conta 😕";
    }
}

// ================= CONVERSA =================
function conversationAI(q) {
    if (q.includes("oi") || q.includes("olá"))
        return "Oi 😄 Eu sou o InfoBot. Como posso te ajudar?";

    if (q.includes("quem é você"))
        return "Sou o InfoBot 🤖, uma IA criada para ajudar em estudos, perguntas e conversas.";

    if (q.includes("o que é o amor"))
        return "❤️ O amor é um sentimento de cuidado, conexão e afeto entre pessoas.";

    if (q.includes("você é inteligente"))
        return "Estou sempre aprendendo 😊";

    return null;
}

// ================= ESCOLA / FACULDADE =================
function schoolHelper(q) {
    if (q.includes("explique")) {
        return "📘 Claro! Vou explicar de forma simples e direta.";
    }

    if (q.includes("dica de prova")) {
        return "📝 Estude o conteúdo, resolva exercícios e descanse antes da prova.";
    }

    if (q.includes("como estudar")) {
        return "📚 Estude um pouco todo dia, faça exercícios e explique o conteúdo em voz alta.";
    }

    if (q.includes("resumo")) {
        return "📌 Um resumo é uma versão curta com as ideias principais do conteúdo.";
    }

    return null;
}

// ================= INTERNET =================
function searchInternet(query) {
    const wiki = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

    fetch(wiki)
        .then(r => r.json())
        .then(data => {
            if (data.extract) {
                botTyping("🌐 " + data.extract);
            } else {
                duckSearch(query);
            }
        })
        .catch(() => duckSearch(query));
}

function duckSearch(query) {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`;

    fetch(url)
        .then(r => r.json())
        .then(data => {
            let answer =
                data.AbstractText ||
                data.RelatedTopics?.[0]?.Text ||
                "Não achei uma resposta clara, mas posso tentar explicar de outra forma 🙂";

            botTyping(answer);
        })
        .catch(() => botTyping("Erro ao acessar a internet 😕"));
}
</script>
