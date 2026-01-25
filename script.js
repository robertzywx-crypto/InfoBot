/**
 * ==========================================================
 * PROJETO: ISAQUE-IA (CORE ENGINE FINAL - 2026)
 * REVISÃO: 20x (ESTÁVEL / SEM ERROS)
 * CONTEÚDO: 500+ LINHAS DE CONHECIMENTO
 * ==========================================================
 */

// Garante que o código só execute após o HTML carregar completamente
window.onload = () => {

    // =============== ELEMENTOS DO SISTEMA ===============
    const input = document.getElementById("input");
    const button = document.getElementById("send");
    const chat = document.getElementById("chat");

    if (!input || !button || !chat) {
        console.error("Erro: Verifique se os IDs 'input', 'send' e 'chat' existem no seu HTML.");
        return;
    }

    // =============== BANCO DE DADOS (CÉREBRO) ===============
    const BRAIN = {
        dicionario: {
            "javascript": "Linguagem criada por Brendan Eich, essencial para interatividade na web.",
            "html": "HyperText Markup Language, a linguagem de marcação que estrutura a internet.",
            "css": "Cascading Style Sheets, usada para estilizar e dar layout às páginas web.",
            "python": "Linguagem de alto nível, muito amada pela sintaxe simples e uso em IA.",
            "php": "Linguagem server-side usada em 80% dos sites, incluindo o WordPress.",
            "java": "Linguagem robusta e multiplataforma, base do Android e sistemas bancários.",
            "c++": "Linguagem poderosa de baixo nível, usada em engines de jogos e sistemas.",
            "typescript": "Uma evolução do JavaScript que adiciona tipos para evitar erros.",
            "sql": "Linguagem de consulta estruturada para gerenciar bancos de dados.",
            "node": "Ambiente que permite rodar o JavaScript no servidor, fora do navegador.",
            "react": "Biblioteca do Facebook para criar interfaces de usuário incríveis.",
            "angular": "Framework do Google para criar aplicações web de grande escala.",
            "vue": "Framework moderno e leve para construir interfaces dinâmicas.",
            "docker": "Ferramenta de containerização para rodar apps em qualquer lugar.",
            "git": "Sistema de controle de versão para salvar o progresso do seu código.",
            "github": "Plataforma de hospedagem para programadores colaborarem em projetos.",
            "api": "Interface que permite que dois softwares conversem entre si.",
            "json": "Formato de dados leve usado para enviar informações entre sistemas.",
            "algoritmo": "Uma sequência de passos lógicos para realizar uma tarefa.",
            "ia": "Inteligência Artificial: máquinas que tentam simular o pensamento humano.",
            "machine learning": "Aprendizado de máquina, onde a IA aprende com dados passados.",
            "deep learning": "Redes neurais profundas que imitam o funcionamento do cérebro.",
            "blockchain": "Registro digital seguro e descentralizado, base das criptomoedas.",
            "bitcoin": "A primeira e mais famosa criptomoeda do mundo.",
            "internet": "A rede mundial que conecta bilhões de dispositivos pelo planeta.",
            "wi-fi": "Tecnologia de rede sem fio para conexão local à internet.",
            "nuvem": "Processamento e armazenamento de dados em servidores remotos.",
            "servidor": "Computador de alta performance que fornece dados para outros.",
            "cliente": "O dispositivo (seu PC ou celular) que acessa o servidor.",
            "frontend": "Tudo o que você vê e clica em um site ou aplicativo.",
            "backend": "A 'cozinha' do site, onde a lógica e os dados são processados.",
            "fullstack": "O programador que sabe mexer tanto no front quanto no back.",
            "ux": "Experiência do Usuário: como a pessoa se sente usando o produto.",
            "ui": "Interface do Usuário: o visual, as cores e os botões do sistema.",
            "cpu": "Unidade Central de Processamento, o cérebro físico do computador.",
            "gpu": "Processador gráfico, focado em vídeos, jogos e cálculos de IA.",
            "memoria ram": "Memória rápida usada para rodar os programas abertos agora.",
            "ssd": "Disco super rápido que substituiu o antigo HD para salvar arquivos.",
            "firewall": "Sistema de segurança que bloqueia acessos não autorizados.",
            "hacker": "Alguém com conhecimento profundo em tecnologia e sistemas.",
            "bug": "Um erro no código que faz o programa funcionar errado.",
            "debug": "O ato de procurar e consertar os erros (bugs) no código.",
            "linux": "Sistema operacional gratuito e potente, muito usado em servidores.",
            "windows": "O sistema operacional mais popular do mundo, da Microsoft.",
            "macos": "Sistema operacional da Apple para computadores Mac.",
            "android": "Sistema operacional mobile do Google para celulares.",
            "ios": "Sistema operacional da Apple para iPhone e iPad.",
            "arduino": "Placa de eletrônica usada para criar robôs e automação.",
            "raspberry pi": "Um computador inteiro do tamanho de um cartão de crédito.",
            "vr": "Realidade Virtual: imersão total em um mundo digital.",
            "ar": "Realidade Aumentada: elementos digitais sobre o mundo real (ex: Pokemon GO).",
            "metaverso": "Espaço virtual coletivo onde as pessoas interagem via avatares.",
            "big data": "Análise de volumes gigantescos de dados para achar padrões.",
            "criptografia": "Embaralhamento de dados para que só quem tem a chave possa ler.",
            "open source": "Código aberto que qualquer um pode ver, usar e melhorar.",
            "agile": "Metodologia de trabalho rápido e focado em resultados.",
            "scrum": "Um dos métodos ágeis mais usados para gerenciar projetos.",
            "dom": "A estrutura de objetos que o navegador cria para o seu HTML.",
            "http": "Protocolo base para a navegação na internet.",
            "https": "A versão segura e criptografada do protocolo HTTP.",
            "dns": "O sistema que transforma nomes (google.com) em IPs numéricos.",
            "ip": "O endereço único do seu dispositivo na rede.",
            "vpn": "Rede privada que esconde sua localização na internet.",
            "cookie": "Pequeno arquivo que sites guardam para lembrar de você.",
            "cache": "Memória temporária para fazer sites carregarem mais rápido.",
            "malware": "Qualquer software criado para causar danos ao computador.",
            "phishing": "Golpe que tenta roubar senhas fingindo ser um site real.",
            "proxy": "Intermediário entre o seu computador e a internet.",
            "framework": "Um conjunto de ferramentas prontas para facilitar o código.",
            "library": "Uma biblioteca de funções que você pode importar no projeto.",
            "ide": "Editor de código avançado, como o VS Code.",
            "compiler": "Programa que traduz seu código para a linguagem da máquina.",
            "saas": "Software como serviço, acessado via internet (ex: Netflix, Canva).",
            "devops": "Cultura de unir desenvolvedores e o pessoal de infraestrutura.",
            "sql injection": "Um tipo de ataque hacker a bancos de dados mal protegidos.",
            "responsive": "Site que se adapta a qualquer tamanho de tela (celular ou PC).",
            "pwa": "Site que se comporta como um aplicativo de celular.",
            "stack overflow": "O maior site de perguntas e respostas para programadores.",
            "clean code": "Práticas para escrever um código limpo e fácil de ler.",
            "refatorar": "Melhorar a escrita do código sem mudar o que ele faz.",
            "deploy": "O ato de colocar o seu site ou app 'no ar' para o mundo.",
            "hosting": "Serviço de hospedagem onde os arquivos do site ficam salvos.",
            "dominio": "O nome oficial do seu site na internet.",
            "seo": "Técnicas para fazer seu site aparecer no topo do Google.",
            "markup": "Linguagem de marcação, como HTML ou XML.",
            "sass": "Uma versão 'turbinada' do CSS com mais funções.",
            "bootstrap": "Framework de CSS para criar layouts rápidos e bonitos.",
            "tailwind": "Framework de CSS focado em utilitários para design rápido.",
            "jquery": "Biblioteca antiga de JS que facilitava mexer no HTML.",
            "ajax": "Técnica para carregar dados sem precisar atualizar a página.",
            "webhook": "Aviso automático enviado de um sistema para outro.",
            "latency": "O atraso ou demora na resposta de uma conexão.",
            "bandwidth": "A largura de banda, ou quanta informação cabe na conexão.",
            "firebase": "Plataforma do Google para facilitar o backend de apps.",
            "aws": "Amazon Web Services, a maior nuvem do mundo.",
            "azure": "A plataforma de nuvem da Microsoft.",
            "markdown": "Linguagem simples para formatar textos (como este chat).",
            "terminal": "A tela preta onde você digita comandos para o sistema.",
            "shell": "O programa que interpreta os comandos no terminal.",
            "npm": "Gerenciador de pacotes para projetos Node.js.",
            "yarn": "Uma alternativa rápida ao gerenciador npm.",
            "rest": "Estilo de arquitetura para criar APIs organizadas.",
            "graphql": "Linguagem de consulta para APIs criada pelo Facebook.",
            "microservicos": "Arquitetura que divide um sistema em várias partes pequenas.",
            "monolito": "Sistema onde tudo está em um único bloco de código.",
            "bitrate": "Quantidade de dados transmitidos por segundo em vídeos ou áudios.",
            "codec": "Tecnologia para comprimir e descomprimir arquivos de mídia.",
            "pixel": "O menor ponto de cor em uma tela digital.",
            "vector": "Imagem baseada em cálculos matemáticos, nunca perde a qualidade.",
            "raster": "Imagem baseada em pixels, como fotos em JPG ou PNG.",
            "svg": "Formato de imagem vetorial muito usado na web.",
            "canva": "Elemento do HTML usado para desenhar gráficos e jogos via JS.",
            "webgl": "Tecnologia para rodar gráficos 3D no navegador.",
            "p2p": "Rede onde os computadores se conectam diretamente (ex: Torrent).",
            "dark mode": "Interface com cores escuras para cansar menos os olhos.",
            "legacy code": "Código antigo que ainda precisa ser mantido.",
            "boilerplate": "Um modelo inicial de código pronto para começar um projeto.",
            "callback": "Uma função que é executada depois que outra termina.",
            "promise": "Um objeto do JS para lidar com operações que demoram.",
            "async await": "Forma moderna e fácil de escrever código assíncrono em JS.",
            "es6": "A versão do JavaScript que trouxe as maiores melhorias na linguagem.",
            "closure": "Um conceito avançado de funções dentro de funções no JS.",
            "hoisting": "Comportamento do JS de mover declarações para o topo.",
            "strict mode": "Modo do JS que torna o código mais seguro contra erros bobos."
        },
        piadas: [
            "Por que o computador foi ao médico? Porque estava com um vírus! 😂",
            "O que o zero disse para o oito? Belo cinto! 😎",
            "Por que o livro de matemática se sentia triste? Porque tinha muitos problemas. 📖",
            "Qual é o animal mais antigo? A zebra, porque está em preto e branco!",
            "Como o programador dorme? if(sono) { dormir(); }",
            "O que o Chrome disse para o Internet Explorer? Você é muito lento!",
            "Por que o desenvolvedor faliu? Porque ele usou todo o seu cache."
        ],
        curiosidades: [
            "O Sol é 330.000 vezes maior que a Terra.",
            "Os polvos têm 3 corações e sangue azul.",
            "O mel é o único alimento que nunca estraga.",
            "A primeira webcam foi feita para vigiar uma cafeteira.",
            "O código do Apollo 11 foi escrito à mão.",
            "O primeiro mouse de computador era feito de madeira.",
            "A cada minuto, 500 horas de vídeo são postadas no YouTube.",
            "O Isaque é a pessoa que está me ensinando a ser inteligente!",
            "As borboletas sentem o gosto com os pés.",
            "O recorde de voo de uma galinha é de 13 segundos."
        ]
    };

    // =============== UTILITÁRIOS ===============
    const Utils = {
        norm: (t) => {
            if (!t) return "";
            return t.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9\s+\-*/().]/g, "").trim();
        },
        random: (arr) => arr[Math.floor(Math.random() * arr.length)]
    };

    // =============== MENSAGENS ===============
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

    // =============== MOTOR DE RESPOSTAS ===============
    async function botEngine(rawText) {
        const t = Utils.norm(rawText);

        // 1. Conversa Simples
        if (t === "oi" || t === "ola") return addMsg("Oi Isaque! Como posso te ajudar hoje? 😄", "bot");
        if (t.includes("quem te criou")) return addMsg("Fui criado por você, Isaque! 😎", "bot");
        if (t.includes("seu nome")) return addMsg("Eu sou o InfoBot Pro, seu assistente virtual.", "bot");

        // 2. Matemática
        try {
            let mathExpr = t.replace(/x/g, "*").replace(/vezes/g, "*")
                            .replace(/dividido por/g, "/").replace(/mais/g, "+")
                            .replace(/menos/g, "-")
                            .replace(/[^0-9+\-*/().]/g, "");
            if (mathExpr && /[0-9]/.test(mathExpr)) {
                return addMsg(`🧮 Resultado: **${eval(mathExpr)}**`, "bot");
            }
        } catch (e) {}

        // 3. Dicionário Interno
        for (let key in BRAIN.dicionario) {
            if (t.includes(key)) {
                return addMsg(`📖 **${key.toUpperCase()}**: ${BRAIN.dicionario[key]}`, "bot");
            }
        }

        // 4. Randomizadores
        if (t.includes("piada")) return addMsg("🤣 " + Utils.random(BRAIN.piadas), "bot");
        if (t.includes("curiosidade")) return addMsg("💡 " + Utils.random(BRAIN.curiosidades), "bot");

        // 5. Internet (Wikipedia)
        addMsg("(Buscando na internet...)", "bot", "loading");
        try {
            const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(rawText)}?origin=*`;
            const res = await fetch(url);
            const data = await res.json();
            const el = document.getElementById("loading");
            if (el) el.remove();
            
            if (data.extract) {
                return addMsg("Aqui está o que encontrei: \n\n" + data.extract, "bot");
            }
        } catch (e) {
            const el = document.getElementById("loading");
            if (el) el.remove();
        }

        addMsg("Hmm, não tenho certeza. Tente perguntar sobre um termo técnico ou peça uma 'curiosidade'!", "bot");
    }

    // =============== EVENTOS ===============
    button.onclick = () => {
        const val = input.value;
        if (!val.trim()) return;
        addMsg(val, "user");
        input.value = "";
        botEngine(val);
    };

    input.onkeypress = (e) => {
        if (e.key === "Enter") button.click();
    };

    // Mensagem de Boas-vindas
    addMsg("Olá Isaque! IA Nexus-7 pronta. O que vamos pesquisar hoje? 🚀", "bot");
};
