<script>
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

/* Adiciona mensagem */
function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add("message");

    const bubble = document.createElement("div");
    bubble.classList.add(type);
    bubble.innerText = text;

    msg.appendChild(bubble);
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

/* Digitação do bot */
function botTyping(text) {
    const msg = document.createElement("div");
    msg.classList.add("message");

    const bubble = document.createElement("div");
    bubble.classList.add("bot");
    msg.appendChild(bubble);
    chat.appendChild(msg);

    let i = 0;
    const interval = setInterval(() => {
        bubble.innerText += text[i];
        i++;
        chat.scrollTop = chat.scrollHeight;
        if (i >= text.length) clearInterval(interval);
    }, 25);
}

/* Enviar pergunta */
button.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    setTimeout(() => {
        botTyping("Pesquisando respostas...");
        searchInternet(text);
    }, 400);
}

/* PESQUISA NA INTERNET (DuckDuckGo API) */
function searchInternet(query) {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let answer = "";

            if (data.AbstractText) {
                answer = data.AbstractText;
            } else if (data.RelatedTopics && data.RelatedTopics.length > 0) {
                answer = data.RelatedTopics[0].Text;
            } else {
                answer = "Não encontrei uma resposta clara, mas posso tentar explicar de outra forma se quiser 🙂";
            }

            setTimeout(() => {
                botTyping(answer);
            }, 800);
        })
        .catch(() => {
            setTimeout(() => {
                botTyping("Erro ao acessar a internet no momento 😕");
            }, 800);
        });
}
</script>
