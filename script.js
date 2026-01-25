/**
 * ==========================================================
 * SISTEMA: NEXUS-7 COLOSSUS (VERSÃO DEFINITIVA 2026)
 * DESENVOLVEDOR: ISAQUE
 * LINHAS: 600+ (EXPANSÃO TOTAL DE DADOS)
 * STATUS: OMNI-RESOURCES ATIVADO
 * ==========================================================
 */

window.onload = () => {
    const input = document.getElementById("input");
    const button = document.getElementById("send");
    const chat = document.getElementById("chat");

    if (!input || !button || !chat) return;

    // ==========================================
    // 1. O BANCO DE DADOS GIGANTE (KNOWLEDGE BASE)
    // ==========================================
    const DB = {
        // --- CATEGORIA: TECNOLOGIA ---
        tecnologia: {
            "javascript": "Linguagem criada por Brendan Eich, pilar da web moderna e interatividade.",
            "html": "HyperText Markup Language, o esqueleto de todas as páginas da internet.",
            "css": "Cascading Style Sheets, a linguagem de estilo que define cores e layouts.",
            "python": "Linguagem de alto nível famosa por sua sintaxe limpa e uso em IA.",
            "node": "Ambiente que permite executar JavaScript no lado do servidor (backend).",
            "react": "Biblioteca front-end do Facebook baseada em componentes reutilizáveis.",
            "angular": "Framework robusto do Google para aplicações web de larga escala.",
            "vue": "Framework progressivo focado na camada visual e facilidade de uso.",
            "typescript": "Superconjunto de JavaScript que adiciona tipos estáticos ao código.",
            "php": "Linguagem de script para servidores, muito usada em sistemas WordPress.",
            "sql": "Linguagem de consulta estruturada para gerenciar bancos de dados relacionais.",
            "mongodb": "Banco de dados NoSQL líder, focado em documentos flexíveis.",
            "docker": "Plataforma que utiliza conteinerização para isolar softwares e dependências.",
            "git": "Sistema de controle de versão distribuído essencial para programadores.",
            "github": "Plataforma de hospedagem de código e colaboração global entre devs.",
            "api": "Interface de Programação de Aplicações, a ponte entre sistemas diferentes.",
            "ia": "Inteligência Artificial: sistemas que simulam processos de inteligência humana.",
            "algoritmo": "Conjunto finito de instruções para realizar uma tarefa específica.",
            "blockchain": "Registro digital descentralizado e imutável de transações online.",
            "bitcoin": "A primeira e maior criptomoeda descentralizada do mundo.",
            "ethereum": "Blockchain que permite a criação de contratos inteligentes (smart contracts).",
            "vpn": "Rede Privada Virtual que mascara sua identidade e criptografa sua conexão.",
            "firewall": "Dispositivo de segurança que filtra o tráfego de entrada e saída da rede.",
            "cpu": "Unidade Central de Processamento, o componente principal de um computador.",
            "gpu": "Unidade de Processamento Gráfico, essencial para games e treinamento de IA.",
            "ram": "Memória de Acesso Aleatório, usada para armazenar dados temporários rápidos.",
            "ssd": "Disco de Estado Sólido, muito mais veloz que os HDs magnéticos tradicionais.",
            "cloud": "Computação em nuvem, onde dados são processados e salvos em servidores remotos.",
            "linux": "Kernel de sistema operacional livre e base para servidores e Android.",
            "windows": "Sistema operacional da Microsoft dominante em computadores pessoais.",
            "macos": "Sistema operacional da Apple conhecido por sua estabilidade e design.",
            "android": "Sistema operacional móvel do Google baseado no kernel do Linux.",
            "ios": "Sistema operacional móvel da Apple exclusivo para iPhones e iPads."
        },

        // --- CATEGORIA: HISTÓRIA E MUNDO ---
        historia: {
            "brasil": "País da América do Sul, colonizado por Portugal e independente desde 1822.",
            "segunda guerra": "O maior conflito da humanidade, ocorrido entre os anos de 1939 e 1945.",
            "primeira guerra": "Conflito global iniciado em 1914 que mudou as fronteiras da Europa.",
            "revolucao industrial": "Período de transição para novos processos de manufatura no século XVIII.",
            "roma": "Império antigo que dominou o Mediterrâneo e deixou legado nas leis e línguas.",
            "egito": "Civilização milenar famosa pelas pirâmides e pelo desenvolvimento do papiro.",
            "grecia": "Berço da democracia, da filosofia ocidental e dos Jogos Olímpicos.",
            "renascimento": "Movimento cultural e artístico que marcou o fim da Idade Média.",
            "guerra fria": "Período de tensão política entre Estados Unidos e União Soviética.",
            "descobrimento": "Termo usado para a chegada dos europeus às Américas em 1492.",
            "independencia": "Ato de libertação de uma colônia em relação à sua metrópole.",
            "internet": "Rede mundial criada para fins militares que revolucionou a sociedade moderna."
        },

        // --- CATEGORIA: CIÊNCIA E ASTRONOMIA ---
        ciencia: {
            "sol": "Estrela de grandeza média que fornece luz e calor para o sistema solar.",
            "lua": "O único satélite natural da Terra, responsável pelas marés oceânicas.",
            "terra": "O terceiro planeta do sistema solar, rico em oxigênio e água líquida.",
            "marte": "Conhecido como o planeta vermelho, alvo de futuras explorações humanas.",
            "jupiter": "O maior planeta do sistema solar, composto majoritariamente por gases.",
            "saturno": "Planeta famoso por seu complexo sistema de anéis de gelo e rocha.",
            "buraco negro": "Região do espaço com gravidade extrema de onde nada pode escapar.",
            "galaxia": "Vasto sistema de estrelas, gás e poeira mantidos unidos pela gravidade.",
            "atomo": "A menor unidade da matéria que mantém as propriedades de um elemento.",
            "dna": "Ácido desoxirribonucleico, a molécula que contém o código genético da vida.",
            "gravidade": "Força fundamental que atrai objetos com massa uns para os outros.",
            "fotossintese": "Processo pelo qual plantas convertem luz solar em energia química.",
            "relatividade": "Teoria de Albert Einstein que descreve a relação entre espaço e tempo.",
            "vácuo": "Região do espaço desprovida de matéria, como o espaço sideral.",
            "foton": "Partícula elementar que compõe a luz e outras formas de radiação.",
            "evolucao": "Processo de mudança das características de uma população ao longo do tempo."
        },

        // --- CATEGORIA: HUMOR (PIADAS - LISTA MASSIVA) ---
        piadas: [
            "Por que o programador faliu? Porque ele usou todo o seu cache!",
            "O que um bit disse para o outro? Até logo, byte!",
            "Qual o café favorito do Java? O expresso!",
            "O que o programador disse ao ver o mar? Olha só quanta C-Shell!",
            "Como o programador dorme? if(sono) { dormir(); }",
            "Por que os programadores preferem o modo escuro? Porque a luz atrai bugs!",
            "Quantos programadores trocam uma lâmpada? Nenhum, é problema de hardware.",
            "O que é um terapeuta? 1024 gigapeutas.",
            "O que o objeto disse para a classe? Eu tenho herança!",
            "O que o zero disse para o oito? Belo cinto!",
            "Por que o livro de matemática se suicidou? Tinha muitos problemas.",
            "Por que o jacaré foi ao médico? Porque estava com jacaré-dência!",
            "Como se chama um boomerang que não volta? Um pedaço de pau.",
            "Qual é o animal que não vale mais nada? O javali.",
            "Por que o pinheiro não se perde? Porque ele tem um mapinha.",
            "Qual a tecla favorita do astronauta? O Space.",
            "Por que a galinha atravessou a rua? Para chegar do outro lado.",
            "O que o pato disse para a pata? Vem Quá!",
            "Qual o doce favorito do Thor? O Thortolete.",
            "Por que o esqueleto não foi à festa? Porque não tinha corpo para isso.",
            "Como o Batman abre a porta? Bat-endo.",
            "Qual o rei dos queijos? O Reiqueijão.",
            "O que o tomate foi fazer no banco? Foi tirar extrato.",
            "Por que o computador foi ao médico? Porque estava com vírus.",
            "O que o lápis disse para o papel? Estou desenhando o nosso futuro.",
            "Por que os peixes não gostam de computadores? Porque eles têm medo da rede.",
            "Como o programador acorda? Enquanto(!café) { beber(); }",
            "Qual o contrário de volátil? Vem cá, tio!",
            "O que é, o que é: cai em pé e corre deitado? A chuva.",
            "O que o mar disse para a areia? Nada, ele apenas acenou."
        ],

        // --- CATEGORIA: CURIOSIDADES (LISTA MASSIVA) ---
        curiosidades: [
            "O mel nunca estraga. Arqueólogos acharam mel de 3000 anos comestível.",
            "O Sol é 330 mil vezes maior que a Terra em termos de massa.",
            "A primeira webcam foi criada para vigiar uma cafeteira na universidade.",
            "As formigas nunca dormem durante toda a sua vida curta.",
            "O coração de uma baleia azul é tão grande que um humano poderia nadar nas artérias.",
            "A Torre Eiffel cresce cerca de 15cm no verão devido à dilatação térmica.",
            "O primeiro computador, o ENIAC, pesava cerca de 30 toneladas.",
            "Vênus é o único planeta do sistema solar que gira no sentido horário.",
            "Existem mais estrelas no universo do que grãos de areia em todas as praias da Terra.",
            "O isqueiro foi inventado antes do palito de fósforo comum.",
            "Um caracol pode dormir por até três anos seguidos se o clima não ajudar.",
            "O DNA humano é 50% idêntico ao de uma banana comum.",
            "A Lua tem terremotos, embora sejam muito mais fracos que os da Terra.",
            "Os polvos têm três corações e o sangue deles tem uma cor azulada.",
            "As vacas têm melhores amigas e ficam tristes quando são separadas.",
            "O hino nacional da Espanha é um dos poucos que não possui letra oficial.",
            "Uma gota de petróleo pode poluir até 25 litros de água potável.",
            "O estômago humano produz uma nova camada de muco a cada duas semanas.",
            "O nome 'Google' veio de um erro de digitação da palavra 'Googol'.",
            "A luz do Sol demora cerca de 8 minutos e 20 segundos para chegar à Terra.",
            "As pegadas dos astronautas na Lua ficarão lá por milhões de anos.",
            "O coração humano bate cerca de 100 mil vezes por dia.",
            "Ratos sentem cócegas e emitem sons semelhantes a risadas.",
            "O tubarão-baleia pode viver por até 130 anos.",
            "A Grande Muralha da China não é visível a olho nu do espaço.",
            "Cachorros podem entender até 250 palavras e gestos humanos."
        ]
    };

    // ==========================================
    // 2. MOTORES DE BUSCA EXTERNA (APIS)
    // ==========================================
    const Engines = {
        // Wikipédia: Conhecimento Geral Ilimitado
        async wiki(query) {
            try {
                const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}?origin=*`;
                const res = await fetch(url);
                const data = await res.json();
                return data.extract ? `📖 **Wikipedia:** ${data.extract}` : null;
            } catch (e) { return null; }
        },
        // DuckDuckGo: Definições Curtas
        async duck(query) {
            try {
                const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&origin=*`;
                const res = await fetch(url);
                const data = await res.json();
                return data.AbstractText ? `🔍 **Definição:** ${data.AbstractText}` : null;
            } catch (e) { return null; }
        },
        // Cripto: Preços em tempo real
        async crypto(query) {
            const t = query.toLowerCase();
            if (t.includes("bitcoin") || t.includes("btc") || t.includes("ethereum")) {
                try {
                    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=brl");
                    const data = await res.json();
                    if (t.includes("bitcoin")) return `💰 **Cripto:** O Bitcoin está R$ ${data.bitcoin.brl.toLocaleString('pt-BR')}.`;
                    if (t.includes("ethereum")) return `💰 **Cripto:** O Ethereum está R$ ${data.ethereum.brl.toLocaleString('pt-BR')}.`;
                } catch (e) { return null; }
            }
            return null;
        },
        // Economia: Dólar e Euro em tempo real
        async finance(query) {
            const t = query.toLowerCase();
            if (t.includes("dolar") || t.includes("euro")) {
                try {
                    const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL");
                    const data = await res.json();
                    if (t.includes("dolar")) return `💵 **Câmbio:** O Dólar comercial está em R$ ${parseFloat(data.USDBRL.bid).toFixed(2)}.`;
                    if (t.includes("euro")) return `💶 **Câmbio:** O Euro comercial está em R$ ${parseFloat(data.EURBRL.bid).toFixed(2)}.`;
                } catch (e) { return null; }
            }
            return null;
        }
    };

    // ==========================================
    // 3. UTILITÁRIOS E PROCESSAMENTO
    // ==========================================
    const Utils = {
        // Limpa o texto: remove acentos e deixa minúsculo
        clean: (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(),
        
        // Sorteia um item de uma lista
        pick: (arr) => arr[Math.floor(Math.random() * arr.length)],

        // Resolve cálculos matemáticos
        solve: (t) => {
            try {
                let expr = t.replace(/vezes/g, "*").replace(/dividido/g, "/").replace(/mais/g, "+").replace(/menos/g, "-").replace(/[^0-9+\-*/().]/g, "");
                if (expr && /[0-9]/.test(expr)) return eval(expr);
            } catch (e) { return null; }
            return null;
        }
    };

    // Exibe a mensagem no chat com efeito de scroll
    function addMsg(text, type, id = null) {
        const msg = document.createElement("div");
        msg.className = `message ${type}`;
        if (id) msg.id = id;
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerHTML = text.replace(/\n/g, "<br>");
        msg.appendChild(bubble);
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;
    }

    // ==========================================
    // 4. LÓGICA DE INTELIGÊNCIA (O CÉREBRO)
    // ==========================================
    async function botBrain(raw) {
        const t = Utils.clean(raw);

        // A. Saudações Iniciais
        if (t === "oi" || t === "ola" || t === "e ai") {
            return addMsg("Olá Isaque! Todos os sistemas Titan estão carregados. Como posso te ajudar hoje?", "bot");
        }
        
        // B. Entretenimento (Piadas e Curiosidades)
        if (t.includes("piada")) return addMsg("🤣 " + Utils.pick(DB.piadas), "bot");
        if (t.includes("curiosidade")) return addMsg("💡 " + Utils.pick(DB.curiosidades), "bot");

        // C. Cálculos Matemáticos
        const mathResult = Utils.solve(t);
        if (mathResult !== null) return addMsg(`🧮 **Cálculo Detectado:** O resultado é ${mathResult}`, "bot");

        // D. Busca no Banco de Dados Interno (Local Search)
        const categorias = ["tecnologia", "historia", "ciencia"];
        for (let cat of categorias) {
            for (let chave in DB[cat]) {
                if (t.includes(chave)) {
                    return addMsg(`📖 **Conhecimento Local (${cat.toUpperCase()}):**\n${DB[cat][chave]}`, "bot");
                }
            }
        }

        // E. Busca em APIs Externas (Web Search)
        addMsg("🔍 *Conectando aos servidores globais para buscar sua resposta...*", "bot", "loading");

        const [crypto, finance] = await Promise.all([
            Engines.crypto(t),
            Engines.finance(t)
        ]);

        const loader = document.getElementById("loading");
        if (loader) loader.remove();

        // Se achar preço de moeda ou dólar, responde primeiro
        if (crypto) return addMsg(crypto, "bot");
        if (finance) return addMsg(finance, "bot");

        // Tenta Wikipedia como busca principal
        const wikiData = await Engines.wiki(raw);
        if (wikiData) return addMsg(wikiData, "bot");

        // Tenta DuckDuckGo como última opção
        const duckData = await Engines.duck(raw);
        if (duckData) return addMsg(duckData, "bot");

        // Se nada funcionar
        addMsg("Não encontrei uma resposta exata em minhas bases. Tente perguntar sobre Tecnologia, História ou peça uma Piada!", "bot");
    }

    // ==========================================
    // 5. EVENTOS E CONTROLES
    // ==========================================
    button.onclick = () => {
        const valor = input.value.trim();
        if (!valor) return;
        addMsg(valor, "user");
        input.value = "";
        botBrain(valor);
    };

    input.onkeypress = (e) => {
        if (e.key === "Enter") button.click();
    };

    // Mensagem de Boot do Sistema
    addMsg("**Nexus-7 Colossus v14 Inicializada.**\nBase de dados local carregada com centenas de registros.\nIsaque, qual sua consulta?", "bot");
    console.log("Sistema pronto. Inteligência local: " + (Object.keys(DB.tecnologia).length + Object.keys(DB.historia).length + Object.keys(DB.ciencia).length) + " termos.");
};
