<script>
/* =========================
   INFOBOT MEGA COMPLETO
   ========================= */

// ELEMENTOS
const input = document.getElementById("input");
const button = document.getElementById("send");
const chat = document.getElementById("chat");

// =========================
// ADICIONA MENSAGEM
// =========================
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

// =========================
// NORMALIZAÇÃO DE TEXTO
// =========================
function normalize(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

// =========================
// MEMÓRIA SIMPLES
// =========================
let memory = [];
function remember(text){
    if(memory.length>50) memory.shift();
    memory.push(text);
}
function recall(){
    if(memory.length===0) return null;
    return memory[memory.length-1];
}

// =========================
// FUNÇÃO MATEMÁTICA
// =========================
function solveMath(text){
    let expr = normalize(text)
        .replace(/quanto e|quanto é|calcule|resultado de/g, "")
        .replace(/mais/g, "+")
        .replace(/menos/g, "-")
        .replace(/vezes|x/g, "*")
        .replace(/dividido por/g, "/")
        .replace(/%/g, "*0.01")
        .replace(/[^0-9+\-*/().]/g, "");

    if(!expr) return null;

    try{
        let result = eval(expr);
        if(result!==undefined){
            return `🧮 Resultado: ${result}`;
        }
    }catch{}
    return null;
}

// =========================
// FUNÇÃO CÉREBRO LOCAL
// =========================
function brain(text){
    const t = normalize(text);

    // Conversa amigável
    const greetings = ["oi","ola","eai","eae"];
    if(greetings.includes(t)) return "Oi 😄 tudo bem?";
    if(t.includes("tudo bem")) return "Tô bem 😎 e você?";
    if(t.includes("seu nome")) return "Meu nome é InfoBot 🤖";
    if(t.includes("quem te criou")) return "Fui criado por você 😏";
    if(t.includes("amor")) return "Amor é quando nos importamos de verdade ❤️";
    if(t.includes("triste")) return "Poxa 😔 quer conversar sobre isso?";
    if(t.includes("feliz")) return "Que bom 😄 me conta o que te deixou feliz!";
    if(t.includes("obrigado")) return "De nada! 😊";
    if(t.includes("tchau")) return "Tchau 😄 até mais!";

    // Matérias
    if(t.includes("fotossintese")) return "Fotossíntese é o processo em que as plantas usam luz solar, água e CO2 para produzir alimento.";
    if(t.includes("revolucao francesa")) return "A Revolução Francesa começou em 1789 e lutava por liberdade, igualdade e fraternidade.";
    if(t.includes("segunda guerra mundial")) return "A Segunda Guerra Mundial foi de 1939 a 1945.";
    if(t.includes("capital do brasil")) return "A capital do Brasil é Brasília.";
    if(t.includes("rio mais longo")) return "O rio Amazonas é considerado o mais longo do mundo.";
    if(t.includes("planetas")) return "Os planetas são: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno.";
    if(t.includes("maior animal")) return "A baleia-azul é o maior animal do planeta.";
    if(t.includes("teorema de pitagoras")) return "O Teorema de Pitágoras diz que o quadrado da hipotenusa é igual à soma dos quadrados dos catetos.";
    if(t.includes("fotossintese simplificada")) return "As plantas usam luz, água e CO2 para produzir glicose e oxigênio.";
    if(t.includes("revolucao industrial")) return "A Revolução Industrial começou no século XVIII e mudou a forma de produzir bens.";

    // Piadas
    if(t.includes("piada")) return "Por que o computador foi ao médico? Porque ele pegou um vírus 😂";
    if(t.includes("curiosidade")) return randomFact();

    return null;
}

// =========================
// FUNÇÕES RANDOM
// =========================
const funFactsArr = [
    "O Sol é 330.000 vezes maior que a Terra!",
    "O cérebro humano tem cerca de 86 bilhões de neurônios!",
    "As borboletas sentem gosto com os pés!",
    "A Lua se afasta da Terra 3,8 cm por ano.",
    "As formigas nunca dormem 😮",
    "O diamante é o material natural mais duro da Terra."
];

function randomFact(){
    return funFactsArr[Math.floor(Math.random()*funFactsArr.length)];
}

// =========================
// INTERNET (APOIO)
// =========================
async function searchInternet(query){
    const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    try{
        const res = await fetch(url);
        if(!res.ok) return null;
        const data = await res.json();
        return data.extract || null;
    }catch{return null;}
}

// =========================
// FUNÇÃO PRINCIPAL
// =========================
async function reply(text){
    remember(text);

    // Matemática
    const math = solveMath(text);
    if(math){
        addMessage(math,"bot");
        return;
    }

    // Cérebro local
    const brainAnswer = brain(text);
    if(brainAnswer){
        addMessage(brainAnswer,"bot");
        return;
    }

    // Internet
    addMessage("🔎 Pesquisando na internet...","bot");
    const internet = await searchInternet(text);

    if(internet){
        addMessage(internet,"bot");
    }else{
        const fallback = [
            "Hmm… não achei agora 😕 tenta perguntar de outro jeito.",
            randomFact(),
            "Posso te explicar de outro jeito se quiser!"
        ];
        addMessage(fallback[Math.floor(Math.random()*fallback.length)],"bot");
    }
}

// =========================
// EVENTOS
// =========================
button.onclick = () => {
    const text = input.value.trim();
    if(!text) return;
    addMessage(text,"user");
    input.value="";
    reply(text);
};

input.addEventListener("keydown",(e)=>{
    if(e.key==="Enter") button.click();
});

// =========================
// MENSAGEM INICIAL
// =========================
addMessage("Olá! 👋 Eu sou o InfoBot, posso conversar, resolver matemática e ajudar na escola 😄","bot");
</script>

