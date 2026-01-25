// ================= ELEMENTOS =================
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const btn = document.getElementById("sendBtn");

// ================= UI =================
function addMessage(text, sender = "bot") {
    const msg = document.createElement("div");
    msg.className = sender;
    msg.innerHTML = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

// ================= NORMALIZA =================
function normalize(text) {
    return text
        .toLowerCase()
        .replace(/á|à|ã|â/g, "a")
        .replace(/é|ê/g, "e")
        .replace(/í/g, "i")
        .replace(/ó|ô|õ/g, "o")
        .replace(/ú/g, "u");
}

// ================= RESPOSTAS FIXAS (DICIONÁRIO) =================
const dictionary = {
    "javascript": "JavaScript é uma linguagem de programação usada para criar sites interativos.",
    "html": "HTML é a linguagem usada para estruturar páginas da web.",
    "css": "CSS serve para estilizar páginas HTML.",
    "internet": "A internet é uma rede mundial que conecta milhões de dispositivos."
};

function checkDictionary(text) {
    const t = normalize(text);
    for (let key in dictionary) {
        if (t.includes(key)) return dictionary[key];
    }
    return null;
}

// ================= MATEMÁTICA =================
function tryMath(text) {
    try {
        const cleaned = normalize(text)
            .replace(/quanto e|calcule|resultado de/g, "")
            .replace(/mais/g, "+")
            .replace(/menos/g, "-")
            .replace(/vezes|x/g, "*")
            .replace(/dividido por/g, "/")
            .replace(/[^0-9+\-*/().]/g, "");

        if (cleaned && /^[0-9+\-*/().]+$/.test(cleaned)) {
            const result = eval(cleaned);
            if (!isNaN(result)) {
                return `🧮 O resultado é <b>${result}</b>.`;
            }
        }
    } catch {}
    return null;
}

// ================= CONVERSA =================
function talkLikeFriend(text) {
    const t = normalize(text);

    if (t === "oi" || t === "ola") return "Oi 😄 tudo bem?";
    if (t.includes("tudo bem")) return "Tô bem sim 😊 e você?";
    if (t.includes("seu nome")) return "Eu sou o InfoBot 🤖";
    if (t.includes("me ajuda")) return "Claro! No que posso ajudar?";
    if (t.includes("obrigado")) return "De nada 😄";

    return null;
}

// ================= INTERNET =================
async function internetSearch(query) {
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://api.duckduckgo.com/?q=" + query + "&format=json&no_html=1"
    )}`;

    const res = await fetch(url);
    const data = await res.json();
    const json = JSON.parse(data.contents);

    if (json.AbstractText) return json.AbstractText;
    if (json.RelatedTopics && json.RelatedTopics.length > 0)
        return json.RelatedTopics[0].Text;

    return null;
}

// ================= MOTOR =================
async function answer(question) {
    addMessage(question, "user");

    // Matemática
    const math = tryMath(question);
    if (math) {
        addMessage(math);
        return;
    }

    // Conversa
    const talk = talkLikeFriend(question);
    if (talk) {
        addMessage(talk);
        return;
    }

    // Dicionário
    const dict = checkDictionary(question);
    if (dict) {
        addMessage(dict);
        return;
    }

    // Internet
    addMessage("🤔 Pesquisando...");
    const info = await internetSearch(question);

    if (info) {
        addMessage("📌 De forma simples:\n" + info);
    } else {
        addMessage("Não achei isso agora 😕 tenta perguntar de outro jeito.");
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
addMessage("👋 Oi! Eu sou o InfoBot. Pode falar comigo 😄");

