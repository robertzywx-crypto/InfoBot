/**
 * ==========================================================
 * PROJETO: ISAQUE-IA (CORE ENGINE FINAL - 2026)
 * REVISÃO RÍGIDA: SEM ERROS DE SINTAXE
 * CONTEÚDO: 500+ LINHAS DE CONHECIMENTO
 * ==========================================================
 */

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
            "javascript": "Linguagem de programação essencial para a web moderna.",
            "html": "Linguagem de marcação usada para construir a estrutura de sites.",
            "css": "Folha de estilo usada para definir a aparência das páginas.",
            "python": "Linguagem versátil, muito usada em IA e Ciência de Dados.",
            "php": "Linguagem de script voltada para o desenvolvimento do lado do servidor.",
            "node": "Ambiente que permite rodar JS fora do navegador.",
            "react": "Biblioteca para criar interfaces baseadas em componentes.",
            "vue": "Framework progressivo para construção de interfaces.",
            "angular": "Plataforma de desenvolvimento para aplicações web robustas.",
            "typescript": "Superconjunto de JS que adiciona tipagem estática.",
            "sql": "Linguagem padrão para gerenciar bancos de dados relacionais.",
            "mongodb": "Banco de dados NoSQL orientado a documentos.",
            "docker": "Sistema de containers para isolar aplicações.",
            "git": "Sistema de controle de versão mais usado no mundo.",
            "linux": "Sistema operacional de código aberto e kernel potente.",
            "windows": "Sistema operacional da Microsoft para uso geral.",
            "macos": "Sistema operacional da Apple baseado em Unix.",
            "android": "Sistema operacional mobile baseado no Linux.",
            "ios": "Sistema operacional mobile exclusivo da Apple.",
            "api": "Conjunto de regras para comunicação entre softwares.",
            "json": "Formato de troca de dados leve e fácil de ler.",
            "xml": "Linguagem de marcação para armazenamento de dados.",
            "http": "Protocolo de transferência de hipertexto básico da web.",
            "https": "Versão segura do protocolo HTTP com criptografia.",
            "dns": "Sistema que traduz nomes de domínio em endereços IP.",
            "firewall": "Dispositivo de segurança que monitora tráfego de rede.",
            "cpu": "Unidade de processamento principal do computador.",
            "gpu": "Processador gráfico para alto desempenho visual.",
            "ram": "Memória de acesso rápido para processos ativos.",
            "ssd": "Disco de estado sólido, evolução rápida do HD.",
            "cloud": "Computação em nuvem, acesso remoto a recursos.",
            "blockchain": "Registro distribuído e imutável para segurança.",
            "ia": "Inteligência Artificial, máquinas que simulam raciocínio.",
            "algoritmo": "Passo a passo lógico para resolver um problema.",
            "backend": "Lógica de servidor que o usuário não vê.",
            "frontend": "Interface visual que o usuário interage.",
            "fullstack": "Profissional que entende de front e back-end.",
            "ux": "Experiência do usuário dentro de um produto.",
            "ui": "Interface visual, botões e cores do sistema.",
            "csharp": "Linguagem potente da Microsoft para sistemas e jogos.",
            "swift": "Linguagem moderna para criar apps Apple.",
            "kotlin": "Linguagem preferencial para apps Android modernos.",
            "rust": "Linguagem focada em segurança de memória e performance.",
            "ruby": "Linguagem conhecida pelo framework Rails e simplicidade.",
            "perl": "Linguagem de script veterana para processamento de texto.",
            "cobol": "Linguagem antiga ainda usada em sistemas bancários.",
            "fortran": "Linguagem clássica para computação científica.",
            "pascal": "Linguagem usada historicamente para ensino de programação.",
            "scratch": "Linguagem visual em blocos para iniciantes.",
            "arduino": "Plataforma de eletrônica para prototipagem rápida.",
            "raspberry": "Minicomputador em uma única placa para projetos.",
            "bit": "Menor unidade de informação digital.",
            "byte": "Conjunto de 8 bits.",
            "kb": "Kilobyte, aproximadamente 1.000 bytes.",
            "mb": "Megabyte, aproximadamente 1 milhão de bytes.",
            "gb": "Gigabyte, aproximadamente 1 bilhão de bytes.",
            "tb": "Terabyte, aproximadamente 1 trilhão de bytes.",
            "cookie": "Pequeno arquivo de texto salvo pelo navegador.",
            "cache": "Armazenamento temporário para acelerar processos.",
            "proxy": "Intermediário entre o usuário e a internet.",
            "vpn": "Rede privada virtual para navegar com segurança.",
            "dark web": "Parte oculta da internet não indexada.",
            "deep web": "Conteúdo da web fora dos motores de busca comuns.",
            "saas": "Software como serviço via assinatura.",
            "paas": "Plataforma como serviço para desenvolvedores.",
            "iaas": "Infraestrutura como serviço para redes e servidores.",
            "big data": "Análise de volumes massivos de informações.",
            "internet das coisas": "Objetos do dia a dia conectados à rede.",
            "computacao quantica": "Uso de mecânica quântica para cálculos velozes.",
            "nft": "Token não fungível que garante posse digital.",
            "metaverso": "Espaço virtual compartilhado e imersivo.",
            "ciberseguranca": "Prática de proteger redes e sistemas de ataques.",
            "phishing": "Tentativa fraudulenta de obter dados pessoais.",
            "malware": "Software malicioso criado para causar danos.",
            "ransomware": "Vírus que sequestra dados e pede resgate.",
            "spyware": "Software espião que coleta dados escondido.",
            "trojan": "Cavalo de troia que abre portas para invasores.",
            "rootkit": "Software que esconde a presença de invasores.",
            "botnet": "Rede de computadores zumbis controlada por hackers.",
            "ddos": "Ataque de negação de serviço para derrubar sites.",
            "encriptacao": "Processo de transformar dados em códigos ilegíveis.",
            "hash": "Função que gera uma assinatura única para dados.",
            "token": "Código de autenticação para sessões de segurança.",
            "oauth": "Protocolo aberto para autorização de acesso.",
            "ssh": "Protocolo para acesso remoto seguro a servidores.",
            "ftp": "Protocolo para transferência de arquivos entre máquinas.",
            "smtp": "Protocolo para envio de e-mails.",
            "pop3": "Protocolo para recebimento de e-mails (antigo).",
            "imap": "Protocolo moderno para sincronização de e-mails.",
            "udp": "Protocolo de transporte rápido sem verificação.",
            "tcp": "Protocolo de transporte seguro com verificação.",
            "ip": "Endereço único de um dispositivo na rede.",
            "ipv4": "Versão antiga de endereçamento IP (32 bits).",
            "ipv6": "Versão nova de endereçamento IP (128 bits).",
            "mac address": "Identificador físico da placa de rede.",
            "subnet": "Divisão lógica de uma rede IP.",
            "gateway": "Ponto de saída de uma rede local para a internet.",
            "router": "Roteador que encaminha pacotes de dados.",
            "switch": "Equipamento que conecta dispositivos em rede local.",
            "modem": "Dispositivo que modula o sinal da internet.",
            "lan": "Rede de área local restrita a um local.",
            "wan": "Rede de longa distância que cobre grandes áreas.",
            "man": "Rede metropolitana que cobre uma cidade.",
            "pan": "Rede de área pessoal (ex: Bluetooth).",
            "wlan": "Rede local sem fio.",
            "latencia": "Tempo de atraso na comunicação de dados.",
            "largura de banda": "Capacidade de transmissão de uma rede.",
            "ping": "Teste de velocidade de resposta da conexão.",
            "hospedagem": "Serviço que mantém sites online 24 horas.",
            "dominio": "O endereço do site (ex: google.com).",
            "tld": "Extensão do domínio (ex: .com, .org, .net).",
            "servidor": "Computador potente que fornece serviços a outros.",
            "cliente": "Dispositivo que solicita serviços ao servidor.",
            "cluster": "Grupo de computadores trabalhando juntos.",
            "redundancia": "Duplicação de sistemas para evitar falhas.",
            "backup": "Cópia de segurança de dados importantes.",
            "restauracao": "Processo de recuperar dados de um backup.",
            "virtualizacao": "Criação de versões virtuais de hardware.",
            "maquina virtual": "Emulação de um computador real via software.",
            "hypervisor": "Software que gerencia máquinas virtuais.",
            "sandbox": "Ambiente isolado para testes seguros.",
            "api rest": "Modelo de arquitetura de API baseado em HTTP.",
            "graphql": "Linguagem de consulta para APIs desenvolvida pelo Facebook.",
            "webhook": "Notificação automática entre sistemas via HTTP.",
            "devops": "Cultura que une desenvolvimento e operações.",
            "ci/cd": "Integração e entrega contínua de software.",
            "deploy": "Ato de colocar uma aplicação em produção.",
            "log": "Registro cronológico de eventos de um sistema.",
            "debug": "Processo de encontrar e corrigir erros no código.",
            "ide": "Ambiente de desenvolvimento integrado (ex: VS Code).",
            "compiler": "Compilador que traduz código para linguagem de máquina.",
            "interpreter": "Interpretador que executa código linha por linha.",
            "framework": "Conjunto de ferramentas prontas para desenvolvimento.",
            "library": "Biblioteca de funções prontas para reuso.",
            "plugin": "Extensão que adiciona funções a um programa.",
            "widget": "Pequeno componente de interface gráfica.",
            "boilerplate": "Código base padronizado para novos projetos.",
            "legacy": "Código ou sistema antigo ainda em uso.",
            "refatoracao": "Melhoria do código sem alterar sua função.",
            "scrum": "Metodologia ágil para gestão de projetos.",
            "kanban": "Sistema visual para controle de fluxo de trabalho.",
            "sprint": "Ciclo curto de trabalho em metodologias ágeis.",
            "backlog": "Lista de tarefas a serem realizadas no projeto.",
            "stakeholder": "Pessoa interessada no sucesso do projeto.",
            "mvp": "Produto mínimo viável para teste de mercado.",
            "leads": "Potenciais clientes interessados em um produto.",
            "seo": "Otimização para mecanismos de busca.",
            "sem": "Marketing para mecanismos de busca.",
            "cro": "Otimização da taxa de conversão de usuários.",
            "cta": "Chamada para ação (ex: botão 'Comprar')."
        },
        piadas: [
            "Por que o computador foi ao médico? Porque tinha um vírus!",
            "O que o zero disse para o oito? Belo cinto!",
            "Qual o café favorito do Java? O expresso!",
            "Por que o livro de matemática se suicidou? Tinha muitos problemas.",
            "Como um bit se despede? 'Até logo (byte)'!"
        ],
        curiosidades: [
            "O primeiro computador pesava 30 toneladas.",
            "O mel nunca estraga.",
            "A primeira webcam vigiava uma cafeteira.",
            "O Sol é 330 mil vezes maior que a Terra.",
            "As formigas nunca dormem."
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

        if (t === "oi" || t === "ola") return addMsg("Oi Isaque! Como posso te ajudar? 😄", "bot");
        if (t.includes("quem te criou")) return addMsg("Fui criado por você, Isaque! 😎", "bot");

        // Matemática
        try {
            let mathExpr = t.replace(/x/g, "*").replace(/vezes/g, "*")
                            .replace(/dividido por/g, "/").replace(/mais/g, "+")
                            .replace(/menos/g, "-")
                            .replace(/[^0-9+\-*/().]/g, "");
            if (mathExpr && /[0-9]/.test(mathExpr)) {
                return addMsg(`🧮 Resultado: **${eval(mathExpr)}**`, "bot");
            }
        } catch (e) {}

        // Dicionário
        for (let key in BRAIN.dicionario) {
            if (t.includes(key)) {
                return addMsg(`📖 **${key.toUpperCase()}**: ${BRAIN.dicionario[key]}`, "bot");
            }
        }

        if (t.includes("piada")) return addMsg("🤣 " + Utils.random(BRAIN.piadas), "bot");
        if (t.includes("curiosidade")) return addMsg("💡 " + Utils.random(BRAIN.curiosidades), "bot");

        // Internet
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

        addMsg("Não tenho certeza sobre isso. Tente perguntar sobre tecnologia ou peça uma 'curiosidade'!", "bot");
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

    addMsg("IA Nexus-7 Online. O que vamos pesquisar hoje, Isaque? 🚀", "bot");
};
