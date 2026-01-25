/**
 * ==========================================================
 * PROJETO: INFO-BOT (ENGINE 2026)
 * STATUS: REVISÃO TOTAL - SEM ERROS DE SINTAXE
 * ==========================================================
 */

window.onload = () => {
    // ELEMENTOS DO SISTEMA
    const input = document.getElementById("input");
    const button = document.getElementById("send");
    const chat = document.getElementById("chat");

    if (!input || !button || !chat) {
        console.error("Erro: IDs 'input', 'send' ou 'chat' não encontrados no HTML.");
        return;
    }

    // BANCO DE DADOS (CÉREBRO)
    const BRAIN = {
        dicionario: {
            "javascript": "Linguagem de programação essencial para a web moderna.",
            "html": "Linguagem de marcação usada para construir a estrutura de sites.",
            "css": "Folha de estilo usada para definir a aparência das páginas.",
            "python": "Linguagem versátil, muito usada em IA e Ciência de Dados.",
            "node": "Ambiente que permite rodar JS fora do navegador.",
            "react": "Biblioteca para criar interfaces baseadas em componentes.",
            "sql": "Linguagem padrão para gerenciar bancos de dados relacionais.",
            "git": "Sistema de controle de versão mais usado no mundo.",
            "linux": "Sistema operacional de código aberto e kernel potente.",
            "api": "Conjunto de regras para comunicação entre softwares.",
            "json": "Formato de troca de dados leve e fácil de ler.",
            "ia": "Inteligência Artificial, máquinas que simulam raciocínio.",
            "cpu": "Unidade de processamento principal do computador.",
            "gpu": "Processador gráfico para alto desempenho visual.",
            "ram": "Memória de acesso rápido para processos ativos.",
            "ssd": "Disco de estado sólido, evolução rápida do HD.",
            "cloud": "Computação em nuvem, acesso remoto a recursos.",
            "blockchain": "Registro distribuído e imutável para segurança.",
            "algoritmo": "Passo a passo lógico para resolver um problema.",
            "backend": "Lógica de servidor que o usuário não vê.",
            "frontend": "Interface visual que o usuário interage.",
            "ux": "Experiência do usuário dentro de um produto.",
            "ui": "Interface visual, botões e cores do sistema.",
            "csharp": "Linguagem potente da Microsoft para sistemas e jogos.",
            "swift": "Linguagem moderna para criar apps Apple.",
            "kotlin": "Linguagem preferencial para apps Android modernos.",
            "arduino": "Plataforma de eletrônica para prototipagem rápida.",
            "bit": "Menor unidade de informação digital.",
            "byte": "Conjunto de 8 bits.",
            "mb": "Megabyte, aproximadamente 1 milhão de bytes.",
            "gb": "Gigabyte, aproximadamente 1 bilhão de bytes.",
            "vpn": "Rede privada virtual para navegar com segurança.",
            "dark web": "Parte oculta da internet não indexada.",
            "metaverso": "Espaço virtual compartilhado e imersivo.",
            "malware": "Software malicioso criado para causar danos.",
            "encriptacao": "Processo de transformar dados em códigos ilegíveis.",
            "ip": "Endereço único de um dispositivo na rede.",
            "servidor": "Computador potente que fornece serviços a outros.",
            "dominio": "O endereço do site (ex: google.com)."
        },
        piadas: [
            "Por que o computador foi ao médico? Porque tinha um vírus!",
            "O que o zero disse para o oito? Belo cinto!",
            "Qual o café favorito do Java? O expresso!"
        ],
        curiosidades: [
            "O primeiro computador pesava 30 toneladas.",
            "O mel nunca estraga.",
            "O Sol é 330 mil vezes maior que a Terra."
        ]
    };

    // UTILITÁRIOS
    const Utils = {
        norm: (t) => t ? t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() : "",
        random: (arr) => arr[Math.floor(Math.random() * arr.length)]
    };

    // ADICIONAR MENSAGEM
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

    // LÓGICA DO BOT
    async function botEngine(rawText) {
        const t = Utils.norm(rawText);

        if (t === "oi" || t === "ola") {
            return addMsg("Oi! Como posso te ajudar hoje? 😄", "bot");
        }

        // Matemática Simples
        try {
            let mathExpr = t.replace(/x/g, "*").replace(/vezes/g, "*").replace(/[^0-9+\-*/().]/g, "");
            if (mathExpr && /[0-9]/.test(mathExpr)) {
                return addMsg(`🧮 Resultado: **${eval(mathExpr)}**`, "bot");
            }
        } catch (e) {}

        // Busca no Dicionário
        for (let key in BRAIN.dicionario) {
            if (t.includes(key)) {
                return addMsg(`📖 **${key.toUpperCase()}**: ${BRAIN.dicionario[key]}`, "bot");
            }
        }

        if (t.includes("piada")) return addMsg("🤣 " + Utils.random(BRAIN.piadas), "bot");
        if (t.includes("curiosidade")) return addMsg("💡 " + Utils.random(BRAIN.curiosidades), "bot");

        // Wikipedia
        addMsg("(Pesquisando...)", "bot", "loading");
        try {
            const res = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(rawText)}?origin=*`);
            const data = await res.json();
            const loader = document.getElementById("loading");
            if (loader) loader.remove();
            if (data.extract) return addMsg(data.extract, "bot");
        } catch (e) {
            const loader = document.getElementById("loading");
            if (loader) loader.remove();
        }

        addMsg("Não entendi bem. Tente perguntar sobre tecnologia!", "bot");
    }

    // EVENTOS
    button.onclick = () => {
        const val = input.value;
        if (!val.trim()) return;
        addMsg(val, "user");
        input.value = "";
        botEngine(val);
    };

    input.onkeypress = (e) => { if (e.key === "Enter") button.click(); };

    addMsg("Sistema Online. O que vamos pesquisar hoje? 🚀", "bot");
};
