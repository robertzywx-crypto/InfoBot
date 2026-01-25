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
    return text.toLowerCase()
        .replace(/á|à|ã|â/g,"a")
        .replace(/é|ê/g,"e")
        .replace(/í/g,"i")
        .replace(/ó|ô|õ/g,"o")
        .replace(/ú/g,"u")
        .replace(/[^a-z0-9\s+\-*/().?]/g,"");
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
        let tNorm = norm(text);
        let expr = tNorm
            .replace("quanto e","")
            .replace("calcule","")
            .replace("resultado de","")
            .replace("mais","+")
            .replace("menos","-")
            .replace("vezes","*")
            .replace("x","*")
            .replace("dividido por","/")
            .replace(/[^0-9+\-*/().]/g,"");
        
        // Verifica se ainda restou algum número na expressão antes de calcular
        if(expr && /[0-9]/.test(expr)){
            return "🧮 Resultado: " + eval(expr);
        }
    }catch{}
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
    if(t.includes("piada")) return "Tá, lá vai 😏 Por que o computador foi ao médico? Porque ele tinha um vírus! 😂";
    if(t.includes("historia")) return "Ah, história é incrível! Qual parte você quer saber?";
    if(t.includes("geografia")) return "Geografia é super legal! Quer saber sobre países ou rios?";
    if(t.includes("matematica")) return "Matemática é minha favorita 🧮, pergunte algo!";
    return null;
}

// =============== PESQUISA INTERNET (WIKIPEDIA) =================
async function searchInternet(query){
    // Adicionado origin=* para evitar erro de CORS
    const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query.trim())}?origin=*`;
    try{
        const response = await fetch(url);
        if(!response.ok) throw new Error();
        const data = await response.json();
        return data.extract || null;
    }catch{
        return null;
    }
}

// =============== FUNÇÃO ANTI-DICIONÁRIO =================
function humanize(text){
    if(text.length > 0){
        return "Então, deixa eu te explicar de um jeito simples 😊:\n\n" + text;
    }
    return "Não encontrei uma resposta clara 😕";
}

// =============== MEMÓRIA SIMPLES =================
let memory = [];
function remember(text){
    if(memory.length>100) memory.shift();
    memory.push(text);
}
function recall(){
    if(memory.length===0) return null;
    return memory[memory.length-1];
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

// ================= FUNÇÃO RANDOM FACT =================
function randomFact(){
    return funFacts[Math.floor(Math.random()*funFacts.length)];
}

// ================= FUNÇÃO RANDOM JOKE =================
function randomJoke(){
    return jokes[Math.floor(Math.random()*jokes.length)];
}

// ================= FUNÇÃO PRINCIPAL =================
async function botReply(text){
    remember(text);

    // 1️⃣ conversa
    const talk = conversa(text);
    if(talk){
        addMessage(talk,"bot");
        return;
    }

    // 2️⃣ matemática
    const math = matematica(text);
    if(math){
        addMessage(math,"bot");
        return;
    }

    // 3️⃣ dicionário
    const dict = checkDictionary(text);
    if(dict){
        addMessage(dict,"bot");
        return;
    }

    // 4️⃣ pesquisa na internet
    addMessage("(pesquisando respostas...)","bot","loading");
    const reply = await searchInternet(text);

    setTimeout(()=>{
        removeMessage("loading");
        if(reply){
            addMessage(humanize(reply),"bot");
        }else{
            const fallback = [randomFact(), randomJoke(), "Hmm… não achei isso agora 😕 tenta perguntar de outro jeito."];
            addMessage(fallback[Math.floor(Math.random()*fallback.length)],"bot");
        }
    }, 800);
}

// ================= SMALL TALK =================
function smallTalk(text){
    const t = norm(text);
    if(t.includes("bom dia")) return "Bom dia! ☀️ Que seu dia seja incrível!";
    if(t.includes("boa noite")) return "Boa noite 😴 Tenha sonhos incríveis!";
    if(t.includes("tchau")) return "Tchau! Até mais 😄";
    if(t.includes("legal")) return "Fico feliz que você ache legal! 😎";
    if(t.includes("obrigado")) return "De nada! 😊";
    return null;
}

// ================= FUNÇÃO FINAL DE RESPOSTA =================
async function fullBotReply(text){
    const talk2 = smallTalk(text);
    if(talk2){
        addMessage(talk2,"bot");
        return;
    }

    await botReply(text);
}

// ================= EVENTOS =================
button.onclick = ()=>{
    const text = input.value.trim();
    if(!text) return;
    addMessage(text,"user");
    input.value="";
    fullBotReply(text);
};

input.addEventListener("keypress",(e)=>{
    if(e.key==="Enter") button.click();
});

// ================= MENSAGEM INICIAL =================
addMessage("Olá! 👋 Pergunte qualquer coisa 🙂","bot");

// ================= RANDOM FUN FACT AUTOMÁTICO =================
setInterval(()=>{
    if(Math.random()<0.01) addMessage(randomFact(),"bot");
},5000);

// ================= RANDOM JOKE AUTOMÁTICA =================
setInterval(()=>{
    if(Math.random()<0.01) addMessage(randomJoke(),"bot");
},7000);
