// ================= ELEMENTOS =================
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const btn = document.getElementById("sendBtn");

// ================= ESTADO (MEMÓRIA SIMPLES) =================
let lastTopic = null;
let userMood = "normal";

// ================= UI =================
function addMessage(text, sender = "bot") {
    const msg = document.createElement("div");
    msg.className = "message";
    msg.innerHTML =
        sender === "user"
            ? `<div class="user">${text}</div>`
            : `<div class="bot">${text}</div>`;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function showLoading() {
    const load = document.createElement("div");
    load.id = "loadingMsg";
    load.className = "message";
    load.innerHTML = `<div class="bot">🤔 Pensando...</div>`;
    chat.appendChild(load);
    chat.scrollTop = chat.scrollHeight;
}

function removeLoading() {
    const load = document.getElementById("loadingMsg");
    if (load) load.remove();
}

// ================= UTIL =================
function normalize(text) {
    return text
        .toLowerCase()
        .replace(/á|à|ã|â/g, "a")
        .replace(/é|ê/g, "e")
        .replace(/í/g, "i")
        .replace(/ó|ô|õ/g, "o")
        .replace(/ú/g, "u");
}

// ================= MATEMÁTICA =================
const numbers = {
    zero: 0, um: 1, dois: 2, tres: 3, quatro: 4, cinco: 5,
    seis: 6, sete: 7, oito: 8, nove: 9, dez: 10,
    onze: 11, doze: 12, treze: 13, quatorze: 14, quinze: 15,
    dezesseis: 16, dezessete: 17, dezoito: 18, dezenove: 19,
    vinte: 20, trinta: 30, quarenta: 40, cinquenta: 50,
    sessenta: 60, setenta: 70, oitenta: 80, noventa: 90,
    cem: 100
};

function convertMathText(text) {
    let t = normalize(text);

    for (let word in numbers) {
        t = t.replace(new RegExp(`\\b${word}\\b`, "g"), numbers[word]);
    }

    t = t
        .replace(/mais/g, "+")
        .replace(/menos/g, "-")
        .replace(/vezes|multiplicado por|x/g, "*")
        .replace(/dividido por/g, "/")
        .replace(/quanto e|quanto da|calcule|resultado de/g, "")
        .replace(/[^0-9+\-*/(). ]/g, "");

    return t.trim();
}

function tryMath(text) {
    try {
        const expr = convertMathText(text);

        if (!expr) return null;

        if (normalize(text).includes("raiz")) {
            const num = parseFloat(expr);
            if (!isNaN(num)) return `🧮 Resultado: <b>${Math.sqrt(num)}</b>`;
        }

        if (/^[0-9+\-*/(). ]+$/.test(expr)) {
            const result = eval(expr);
            if (!isNaN(result)) return `🧮 Resultado: <b>${result}</b>`;
        }
    } catch {}
    return null;
}

// ================= CONVERSA (AMIGO) =================
function friendlyTalk(text) {
    const t = normalize(text);

    if (t === "oi" || t === "ola") {
        lastTopic = "greeting";
        return "Oi 😄 Que bom te ver aqui! O que vamos conversar hoje?";
    }

    if (t.includes("tudo bem")) {
        return "Tudo bem sim 😊 E você, como está?";
    }

    if (t.includes("estou triste") || t.includes("to triste")) {
        userMood = "triste";
        return "Poxa 😔 sinto muito… quer me contar o que aconteceu? Estou aqui pra ouvir.";
    }

    if (t.includes("estou feliz") || t.includes("to feliz")) {
        userMood = "feliz";
        return "Que notícia boa 😄 Fico feliz por você!";
    }

    if (t.includes("seu nome")) {
        return "Meu nome é <b>InfoBot</b> 🤖 mas pode me chamar como quiser 😄";
    }

    if (t.includes("quem te criou")) {
        return "Você 😎 com uma ajudinha minha. Projeto top demais!";
    }

    if (t.includes("amizade")) {
        lastTopic = "amizade";
        return "Amizade é estar junto, apoiar e respeitar. Igual a gente aqui 🤝";
    }

    if (t.includes("amor")) {
        lastTopic = "amor";
        return "❤️ Amor é cuidado, carinho e querer o bem do outro.";
    }

    if (t.includes("me ajuda")) {
        return "Claro! 😄 Me diz com o que você precisa de ajuda.";
    }

    if (lastTopic === "amor") {
        return "Quer falar mais sobre isso ou prefere mudar de assunto?";
    }

    return null;
}

// ================= INTERNET =================
async function internetSearch(query) {
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://api.duckduckgo.com/?q=" + query + "&format=json&no_html=1&skip_disambig=1"
    )}`;

    const res = await fetch(url);
    const data = await res.json();
    const json = JSON.parse(data.contents);

    if (json.AbstractText) return json.AbstractText;
    if (json.Answer) return json.Answer;
    if (json.RelatedTopics && json.RelatedTopics.length > 0)
        return json.RelatedTopics[0].Text;

    return "🤔 Não achei uma resposta clara, mas posso tentar explicar de outra forma.";
}

// ================= MOTOR PRINCIPAL =================
async function answer(question) {
    addMessage(question, "user");

    // 1️⃣ Matemática
    const math = tryMath(question);
    if (math) {
        addMessage(math);
        return;
    }

    // 2️⃣ Conversa amiga
    const talk = friendlyTalk(question);
    if (talk) {
        addMessage(talk);
        return;
    }

    // 3️⃣ Internet
    showLoading();
    try {
        const result = await internetSearch(question);
        removeLoading();
        addMessage(result);
    } catch {
        removeLoading();
        addMessage("❌ Não consegui acessar a internet agora.");
    }
}

// ================= EVENTOS =================
btn.onclick = () => {
    if (input.value.trim()) {
        answer(input.value);
        input.value = "";
    }
};

input.addEventListener("keydown", e => {
    if (e.key === "Enter") btn.click();
});

// ================= INÍCIO =================
addMessage("👋 Oi! Eu sou o <b>InfoBot</b>. oque procura?");
