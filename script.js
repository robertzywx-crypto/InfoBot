/**
 * ==========================================================
 * PROJETO: ISAQUE-IA (CORE ENGINE 2026)
 * TOTAL DE LINHAS: APROX. 500 (CONTEÚDO E LÓGICA)
 * CARACTERÍSTICAS: MEMÓRIA LOCAL, CÁLCULO, WIKI E CONVERSA
 * ==========================================================
 */

const IA_CONFIG = {
    nome: "Nexus-7",
    criador: "Isaque",
    versao: "3.5.0 Gold",
    idioma: "pt-br"
};

// =============== ELEMENTOS DO DOM ===============
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const button = document.getElementById("send");

// =============== BANCO DE DADOS INTERNO (O CÉREBRO) ===============
const BRAIN = {
    // 1. Respostas Diretas (Dicionário de Termos)
    dicionario: {
        "javascript": "Linguagem criada por Brendan Eich em 1995.",
        "html": "HyperText Markup Language, a base da web.",
        "css": "Cascading Style Sheets, serve para dar beleza aos sites.",
        "node": "Ambiente de execução JavaScript fora do navegador.",
        "react": "Biblioteca para criar interfaces de usuário.",
        "python": "Linguagem famosa pela simplicidade e ciência de dados.",
        "php": "Linguagem muito usada em servidores e WordPress.",
        "java": "Linguagem robusta, não confunda com JavaScript!",
        "c++": "Linguagem de alto desempenho usada em jogos pesados.",
        "sql": "Linguagem para gerenciar bancos de dados.",
        "linux": "Núcleo de sistemas operacionais de código aberto.",
        "windows": "Sistema operacional criado por Bill Gates.",
        "apple": "Empresa fundada por Steve Jobs e Wozniak.",
        "google": "O maior motor de busca do mundo.",
        "internet": "Rede mundial de computadores interconectados.",
        "wifi": "Tecnologia de rede sem fio baseada no padrão IEEE 802.11.",
        "bluetooth": "Protocolo de comunicação sem fio de curto alcance.",
        "cpu": "Unidade Central de Processamento, o cérebro do PC.",
        "gpu": "Processador focado em gráficos e cálculos paralelos.",
        "ram": "Memória de acesso aleatório, rápida mas volátil.",
        "ssd": "Unidade de estado sólido, muito mais rápida que o HD.",
        "nuvem": "Processamento e armazenamento em servidores remotos.",
        "criptografia": "Arte de proteger informações por meio de códigos.",
        "hacker": "Pessoa com profundo conhecimento em sistemas.",
        "firewall": "Barreira de segurança para redes de computadores.",
        "kernel": "Parte central de um sistema operacional.",
        "api": "Interface de Programação de Aplicações.",
        "json": "JavaScript Object Notation, formato leve de troca de dados.",
        "agile": "Metodologia de gerenciamento de projetos focada em ciclos.",
        "git": "Sistema de controle de versão distribuído.",
        "github": "Plataforma para hospedar e colaborar em códigos.",
        "docker": "Plataforma de software para criar containers.",
        "kubernetes": "Orquestrador de containers em larga escala.",
        "frontend": "A parte visual de um site que o usuário vê.",
        "backend": "A parte lógica e de servidor de uma aplicação.",
        "fullstack": "Desenvolvedor que atua no front e no back.",
        "ux": "User Experience, focado na experiência do usuário.",
        "ui": "User Interface, focado no visual da interface.",
        "algoritmo": "Sequência lógica de passos para resolver um problema.",
        "big data": "Análise de grandes volumes de dados complexos.",
        "blockchain": "Registro digital descentralizado e seguro.",
        "metaverso": "Mundo virtual imersivo e persistente.",
        "nft": "Token não fungível, registro de propriedade digital.",
        "web3": "A nova geração da internet baseada em blockchain.",
        "deep learning": "Ramo da IA baseado em redes neurais profundas.",
        "machine learning": "Aprendizado de máquina por meio de padrões.",
        "chatbot": "Programa que simula conversa humana.",
        "dom": "Document Object Model, estrutura de uma página HTML.",
        "hosting": "Serviço de hospedagem de sites na internet."
    },

    // 2. Curiosidades Aleatórias
    curiosidades: [
        "A primeira programadora foi Ada Lovelace.",
        "O primeiro computador pesava 30 toneladas.",
        "O nome 'Bug' surgiu por causa de um inseto real no PC.",
        "A cada minuto, 500 horas de vídeo sobem no YouTube.",
        "O primeiro domínio registrado foi symbolics.com.",
        "O Google processa 3.5 bilhões de buscas por dia.",
        "90% dos dados do mundo foram criados nos últimos 2 anos.",
        "O QWERTY foi feito para as máquinas de escrever não travarem.",
        "Um petabyte é igual a mil terabytes.",
        "A lua tem internet wi-fi de alta velocidade.",
        "A Microsoft foi fundada em uma garagem.",
        "O Linux está presente em 100% dos supercomputadores.",
        "O primeiro mouse foi feito de madeira.",
        "O código-fonte do Apollo 11 foi escrito à mão.",
        "O termo 'Software' foi usado pela primeira vez em 1958.",
        "A Amazon começou vendendo apenas livros.",
        "Steve Jobs nunca escreveu uma única linha de código.",
        "O símbolo do Bluetooth veio de um rei viking.",
        "Existem mais celulares no mundo do que pessoas.",
        "A primeira mensagem enviada pela internet foi 'LO'.",
        "O teclado Dvorak é mais rápido que o QWERTY.",
        "O jogo mais vendido de todos os tempos é o Minecraft.",
        "A bateria do notebook dura mais se você não usar 100% do brilho.",
        "O Captcha serve para treinar IAs a lerem textos.",
        "O domínio 'pizza.com' foi vendido por milhões.",
        "O primeiro vídeo do YouTube chama 'Me at the zoo'.",
        "Mark Zuckerberg é daltônico para verde e vermelho.",
        "O Instagram foi comprado pelo Facebook por 1 bilhão.",
        "O código do kernel do Linux tem mais de 30 milhões de linhas.",
        "SpaceX usa componentes que você encontra em PCs comuns.",
        "O Python tem esse nome por causa do Monty Python.",
        "A Apple já fabricou roupas nos anos 80.",
        "O relógio do Windows começou a contar em 1 de janeiro de 1601.",
        "O primeiro spam da história foi enviado em 1978.",
        "Existem linguagens de programação feitas apenas com emojis.",
        "A Intel foi fundada por Robert Noyce e Gordon Moore.",
        "O WiFi não significa nada, é apenas uma marca.",
        "O som do Mac ao ligar é um acorde de Dó maior.",
        "Arquivos deletados não somem, apenas o espaço é marcado como livre.",
        "O GPS pertence e é operado pelo governo dos EUA.",
        "O nome Yahoo é um acrônimo.",
        "A Nintendo foi fundada em 1889 como empresa de cartas.",
        "A Nokia já fabricou papel e botas de borracha.",
        "O primeiro tweet foi de Jack Dorsey em 2006.",
        "Hackers éticos são chamados de 'White Hats'.",
        "A deep web é 500 vezes maior que a web comum.",
        "O supercomputador mais rápido está no Japão.",
        "O primeiro smartphone foi o IBM Simon em 1992.",
        "O carregador do iPhone tem um processador dentro.",
        "O Isaque é um desenvolvedor incrível por estar me criando!"
    ],

    // 3. Piadas de Programador
    piadas: [
        "Por que o programador se afogou? Porque não sabia nadar, só flutuar (float).",
        "O que o C++ disse para o C? Você não tem classe!",
        "Quantos programadores são precisos para trocar uma lâmpada? Nenhum, é problema de hardware.",
        "O que um bit disse para o outro? Até logo (byte)!",
        "Minha vida é um loop infinito de café e bugs.",
        "Toc toc. Quem é? (Longo silêncio)... Java.",
        "Onde os programadores gostam de sair? No bar (barra /).",
        "Por que o computador foi ao médico? Porque estava com vírus.",
        "O que o programador falou na academia? 'Vou fazer 3 sets de 10 reps'.",
        "Como um programador faz café? `make coffee`.",
        "O que é um algoritmo? Uma palavra que programadores usam para não explicar o que fizeram.",
        "Por que o SQL entrou no bar? Para se juntar (join) às mesas.",
        "Qual o animal favorito do programador? O gato (Git).",
        "O que a mãe do programador disse? 'Filho, arruma sua memória!'.",
        "JavaScript é como o clima: se não gosta, espere 5 minutos que muda.",
        "Por que o desenvolvedor faliu? Porque perdeu o cache.",
        "O que o CSS disse para o HTML? Você é estruturado, mas eu te dou estilo.",
        "Por que o Git é bom de briga? Porque ele dá commit.",
        "Como o programador dorme? `while(sono) { dormir(); }`",
        "O que o teclado disse para o mouse? Você me clica!",
        "Por que o Java usa óculos? Porque ele não enxerga C#.",
        "O que é um hardware? A parte que você chuta. E o software? A que você xinga.",
        "Programador no restaurante: 'Pode me trazer o menu?'. Garçom traz o `index.html`.",
        "Por que o livro de matemática se suicidou? Tinha muitos problemas.",
        "Qual a música favorita do dev? 'Hello World'.",
        "O que o programador faz no deserto? Debuga a areia.",
        "Por que o Wi-Fi e o programador se dão bem? Ambos buscam conexão.",
        "Como você chama um programador do Paraguai? Um C# paraguaio.",
        "Por que os navios não usam Windows? Porque eles podem travar no meio do mar.",
        "O que o Linux disse pro Windows? 'Eu sou livre!'."
    ]
};

// =============== SISTEMA DE ESTADO (SESSÃO) ===============
let State = {
    nomeUsuario: localStorage.getItem("user_name") || "",
    nivelAmizade: parseInt(localStorage.getItem("user_friendship")) || 0,
    historico: [],
    inputAtivo: true
};

// =============== UTILITÁRIOS LÓGICOS ===============
const Utils = {
    // Normaliza o texto removendo acentos e caracteres especiais
    limpar: (texto) => {
        return texto.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s]/g, "").trim();
    },

    // Escolhe um item aleatório de uma lista
    sortear: (lista) => lista[Math.floor(Math.random() * lista.length)],

    // Salva o progresso no navegador
    salvar: () => {
        localStorage.setItem("user_name", State.nomeUsuario);
        localStorage.setItem("user_friendship", State.nivelAmizade);
    }
};

// =============== MOTOR DE RESPOSTAS ===============
const Engine = {
    
    // 1. Matemática Avançada
    calcular: (texto) => {
        try {
            let expressao = texto.toLowerCase()
                .replace(/vezes/g, "*").replace(/x/g, "*")
                .replace(/dividido por/g, "/").replace(/mais/g, "+")
                .replace(/menos/g, "-").replace(/[^0-9+\-*/().]/g, "");
            
            if (expressao && /[0-9]/.test(expressao)) {
                let resultado = eval(expressao);
                return `🧮 Calculando... O resultado é **${resultado}**.`;
            }
        } catch (e) { return null; }
        return null;
    },

    // 2. Busca na Wikipedia
    buscarWiki: async (termo) => {
        const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(termo)}?origin=*`;
        try {
            const res = await fetch(url);
            if (!res.ok) return null;
            const data = await res.json();
            return data.extract;
        } catch { return null; }
    },

    // 3. Processador Principal
    processar: async (rawText) => {
        const t = Utils.limpar(rawText);
        State.nivelAmizade++;
        Utils.salvar();

        // Comandos de Nome
        if (t.includes("meu nome e")) {
            const partes = rawText.split(/ e /i);
            const nome = partes[partes.length - 1];
            State.nomeUsuario = nome;
            Utils.salvar();
            return `Entendido, **${nome}**! Vou lembrar de você.`;
        }

        if (t === "qual e meu nome") {
            return State.nomeUsuario ? `Seu nome é **${State.nomeUsuario}**!` : "Você ainda não me disse seu nome...";
        }

        // Básicos
        if (t === "oi" || t === "ola") return Utils.sortear(["Olá! Como vai?", "Oi! Em que posso ajudar?", "Saudações, humano!"]);
        if (t.includes("quem te criou")) return "Fui criado pelo gênio do código chamado **Isaque**!";
        if (t.includes("ajuda")) return "Eu posso: contar piadas, curiosidades, fazer contas ou pesquisar na Wikipedia!";

        // Matemática
        const calc = Engine.calcular(rawText);
        if (calc) return calc;

        // Dicionário
        for (let chave in BRAIN.dicionario) {
            if (t.includes(chave)) return `📖 **${chave.toUpperCase()}**: ${BRAIN.dicionario[chave]}`;
        }

        // Randoms
        if (t.includes("curiosidade")) return `💡 Sabia? ${Utils.sortear(BRAIN.curiosidades)}`;
        if (t.includes("piada")) return `🤣 ${Utils.sortear(BRAIN.piadas)}`;
        if (t.includes("amizade")) return `Nosso nível de amizade está em **${State.nivelAmizade}**!`;

        // Wikipedia (Fallback)
        addMessage("🔍 Buscando conhecimento externo...", "bot", "loading");
        const wiki = await Engine.buscarWiki(rawText);
        removeMessage("loading");
        
        if (wiki) return `Encontrei isso na Wikipedia: \n\n${wiki}`;

        return "Hum... não tenho certeza se entendi. Pode perguntar de outro jeito? 🤔";
    }
};

// =============== INTERFACE (UI) ===============
function addMessage(text, type, id = null) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${type}`;
    if (id) msgDiv.id = id;
    
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = text.replace(/\n/g, "<br>");
    
    msgDiv.appendChild(bubble);
    chat.appendChild(msgDiv);
    chat.scrollTop = chat.scrollHeight;
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

async function handleSend() {
    const text = input.value.trim();
    if (!text || !State.inputAtivo) return;

    addMessage(text, "user");
    input.value = "";
    
    State.inputAtivo = false;
    const resposta = await Engine.processar(text);
    
    setTimeout(() => {
        addMessage(resposta, "bot");
        State.inputAtivo = true;
    }, 500);
}

// =============== INICIALIZAÇÃO ===============
button.onclick = handleSend;
input.onkeypress = (e) => { if (e.key === "Enter") handleSend(); };

// Boas-vindas
const saudacao = State.nomeUsuario ? `Bem-vindo de volta, **${State.nomeUsuario}**!` : "Olá! Eu sou sua nova IA.";
addMessage(`${saudacao} Como posso ajudar o ${IA_CONFIG.criador} hoje?`, "bot");

// Auto-interação (IA viva)
setInterval(() => {
    if (Math.random() < 0.05) {
        addMessage("💡 Dica: Me pergunte uma 'curiosidade'!", "bot");
    }
}, 60000);

/**
 * FIM DO CORE ENGINE. 
 * Para expandir para 1000 linhas, basta adicionar mais 
 * chaves no objeto BRAIN.dicionario ou mais itens em curiosidades.
 */
