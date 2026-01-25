// =============== ELEMENTOS =================
const input = document.getElementById("input");
const button = document.getElementById("send");
const chat = document.getElementById("chat");

// =============== FUNÇÃO ADICIONAR MENSAGEM =================
function addMessage(text, type, id=null){
    const msg = document.createElement("div");
    msg.classList.add("message");
    if(id) msg.id = id;
    const bubble = document.createElement("div");
    bubble.classList.add(type);
    bubble.innerText = text;
    msg.appendChild(bubble);
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

// =============== REMOVER MENSAGEM =================
function removeMessage(id){
    const el = document.getElementById(id);
    if(el) el.remove();
}

// =============== NORMALIZAÇÃO =================
function norm(text){
    if(!text) return "";
    return text.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove acentos de forma global
        .replace(/[^a-z0-9\s+\-*/().?]/g,"")
        .trim();
}

// =============== RESPOSTAS FIXAS / DICIONÁRIO =================
const dictionary = {
    "javascript":"JavaScript é a linguagem usada para criar sites interativos.",
    "html":"HTML é a linguagem usada para estruturar páginas web.",
    "css":"CSS é usado para estilizar páginas HTML.",
    "internet":"A internet conecta milhões de dispositivos pelo mundo.",
    "info":"Eu sou o InfoBot 🤖, seu assistente virtual!",
    "historia do brasil":"O Brasil foi descoberto em 1500 por Pedro Álvares Cabral.",
    "segunda guerra mundial":"A Segunda Guerra Mundial aconteceu entre 1939 e 1945.",
    "fotossintese":"Fotossíntese é o processo em que plantas produzem alimento usando luz solar.",
    "agua":"A água é essencial para a vida e cobre cerca de 71% da superfície da Terra.",
    "planetas":"O Sistema Solar tem 8 planetas: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno.",
    "rio mais longo":"O rio Amazonas é considerado o mais longo do mundo.",
    "capital do brasil":"A capital do Brasil é Brasília.",
    "maior animal":"A baleia-azul é o maior animal do planeta.",
    "teorema de pitagoras":"O teorema de Pitágoras diz que a soma dos quadrados dos catetos é igual ao quadrado da hipotenusa.",
    "fotossintese simplificada":"As plantas usam luz solar, água e CO2 para produzir glicose e oxigênio.",
    "revolucao francesa":"A Revolução Francesa ocorreu entre 1789 e 1799, mudando a política e a sociedade na França."
};

// =============== CHECA DICIONÁRIO =================
function checkDictionary(text){
    const t = norm(text);
    for(let key in dictionary){
        if(t.includes(key)){
            return dictionary[key];
        }
    }
    return null;
}

// =============== MATEMÁTICA =================
function matematica(text){
    try{
        let expr = norm(text)
            .replace("quanto e","")
            .replace("calcule","")
            .replace("resultado de","")
            .replace("mais","+")
            .replace("menos","-")
            .replace("vezes","*")
            .replace("x","*")
            .replace("dividido por","/")
            .replace(/[^0-9+\-*/().]/g,"");
            
        if(expr && /[0-9]/.test(expr)){
            // Segurança: eval apenas em números e operadores
            const resultado = eval(expr);
            return "🧮 Resultado: " + resultado;
        }
    }catch(e){}
    return null;
}

// =============== CONVERSA TIPO AMIGO =================
function conversa(text){
    const t = norm(text);
    if(t==="oi"||t==="ola") return "Oi 😄 tudo bem?";
    if(t.includes("tudo bem")) return "Tô bem sim! E você?";
    if(t.includes("seu nome")) return "Eu sou o InfoBot 🤖, seu amigo virtual!";
    if(t.includes("quem te criou")) return "Fui criado por você 😎";
    if(t.includes("obrigado")) return "De nada 😊";
    if(t.includes("amor")) return "Amor é quando nos importamos de verdade com alguém ❤️";
    if(t.includes("triste")) return "Poxa 😔 quer me contar o que aconteceu?";
    if(t.includes("feliz")) return "Que bom 😄 Me conta o que te deixou feliz!";
    if(t.includes("ajuda")) return "Claro! No que posso ajudar?";
    if(t.includes("piada")) return randomJoke();
    if(t.includes("historia")) return "Ah, história é incrível! Qual parte você quer saber?";
    if(t.includes("geografia")) return "Geografia é super legal! Quer saber sobre países ou rios?";
    if(t.includes("matematica")) return "Matemática é minha favorita 🧮, pergunte algo!";
    return null;
}

// =============== PESQUISA INTERNET (WIKIPEDIA) =================
async function searchInternet(query){
    const termo = encodeURIComponent(query.trim());
    const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${termo}?origin=*`;
    try{
        const response = await fetch(url);
        if(!response.ok) return null;
        const data = await response.json();
        return data.extract || null;
    }catch{
        return null;
    }
}

// =============== FUNÇÃO ANTI-DICIONÁRIO =================
function humanize(text){
    if(text && text.length > 0){
        return "Então, deixa eu te explicar de um jeito simples 😊:\n\n" + text;
    }
    return "Não encontrei uma resposta clara 😕";
}

// =============== MEMÓRIA SIMPLES =================
let memory = [];
function remember(text){
    if(memory.length > 50) memory.shift();
    memory.push(text);
}

// =============== FUNÇÕES DE RANDOMIZAÇÃO =================
const funFacts = [
    "Sabia que os polvos têm 3 corações?",
    "O Sol é 330.000 vezes maior que a Terra!",
    "O maior animal do mundo é a baleia-azul 🐋",
    "As formigas nunca dormem 😮",
    "O cérebro humano tem cerca de 86 bilhões de neurônios!",
    "A Lua se afasta da Terra 3,8 cm por ano.",
    "O diamante é o material natural mais duro da Terra.",
    "As borboletas sentem o gosto com os pés!",
    "A Terra gira em torno do Sol a 107.000 km/h",
    "O cérebro humano consome cerca de 20% da energia do corpo"
];

const jokes = [
    "Por que a matemática está sempre feliz? Porque ela tem muitos problemas resolvidos! 😂",
    "O que o zero disse para o oito? Belo cinto! 😎",
    "Por que o livro de história se atrasou? Porque estava cheio de páginas! 📖",
    "Qual é o animal mais antigo? A zebra, porque é em preto e branco!",
    "Qual é a letra mais paciente? O P, porque espera no meio das palavras.",
    "Por que o computador foi ao médico? Porque ele tinha um vírus!"
];

function randomFact(){ return funFacts[Math.floor(Math.random()*funFacts.length)]; }
function randomJoke(){ return jokes[Math.floor(Math.random()*jokes.length)]; }

// ================= SMALL TALK =================
function smallTalk(text){
    const t = norm(text);
    if(t.includes("bom dia")) return "Bom dia! ☀️ Que seu dia seja incrível!";
    if(t.includes("boa noite")) return "Boa noite 😴 Tenha sonhos incríveis!";
    if(t.includes("tchau")) return "Tchau! Até mais 😄";
    if(t.includes("legal")) return "Fico feliz que você ache legal! 😎";
    return null;
}

// ================= FUNÇÃO PRINCIPAL DE RESPOSTA =================
async function fullBotReply(text){
    remember(text);

    // Prioridade 1: Small Talk
    const st = smallTalk(text);
    if(st) { addMessage(st, "bot"); return; }

    // Prioridade 2: Conversa
    const talk = conversa(text);
    if(talk) { addMessage(talk, "bot"); return; }

    // Prioridade 3: Matemática
    const math = matematica(text);
    if(math) { addMessage(math, "bot"); return; }

    // Prioridade 4: Dicionário
    const dict = checkDictionary(text);
    if(dict) { addMessage(dict, "bot"); return; }

    // Prioridade 5: Wikipedia
    addMessage("(pesquisando respostas...)","bot","loading");
    const reply = await searchInternet(text);
    
    removeMessage("loading");
    if(reply){
        addMessage(humanize(reply), "bot");
    } else {
        const fallback = [randomFact(), randomJoke(), "Hmm… não achei isso agora 😕 tenta perguntar de outro jeito."];
        addMessage(fallback[Math.floor(Math.random()*fallback.length)], "bot");
    }
}

// ================= EVENTOS =================
button.onclick = () => {
    const text = input.value.trim();
    if(!text) return;
    addMessage(text, "user");
    input.value = "";
    fullBotReply(text);
};

input.addEventListener("keypress", (e) => {
    if(e.key === "Enter") button.click();
});

// Mensagem Inicial
addMessage("Olá! 👋 Pergunte qualquer coisa 🙂", "bot");

// Mensagens Automáticas (Chance reduzida para não atrapalhar)
setInterval(() => {
    if(Math.random() < 0.01) addMessage(randomFact(), "bot");
}, 10000);
