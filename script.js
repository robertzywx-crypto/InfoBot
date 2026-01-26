async function brain(val) {
    // 1. LIMPEZA INTELIGENTE
    let t = val.toLowerCase().trim();
    
    // Converte gírias e limpa frases longas para o bot focar no assunto
    t = t.replace(/\b(vc|voce)\b/g, "você")
         .replace(/\b(oq|o q)\b/g, "o que")
         .replace(/\b(pq)\b/g, "por que")
         .replace(/por favor|voce sabe|me diga|quero saber|sobre/g, "")
         .trim();

    // --- EFEITO VISUAL ---
    sendMsg("⏳ Analisando sua pergunta...", "bot-temp");
    const removeTemp = () => { document.querySelectorAll(".bot-temp").forEach(e => e.remove()); };

    // 2. MATEMÁTICA (TRADUTOR MELHORADO)
    if (/[0-9]/.test(t) || t.includes("raiz") || t.includes("x") || t.includes("÷")) {
        try {
            let conta = t.replace(/raiz quadrada de|raiz de|√/g, "sqrt")
                         .replace(/vezes|x/g, "*")
                         .replace(/dividido por|:|÷/g, "/")
                         .replace(/[?a-záàâãéèêíïóôõöúç]/g, "");
            let res = math.evaluate(conta);
            if (res !== undefined) { removeTemp(); return sendMsg(`🔢 **Cálculo:** ${res}`, "bot"); }
        } catch(e) {}
    }

    // 3. IDENTIFICAÇÃO DE INTENÇÃO (O que o usuário quer?)
    
    // Se for Piada
    if (t.includes("piada") || t.includes("engraçado") || t.includes("conte algo")) {
        removeTemp();
        return sendMsg("🤣 " + DATABASE.jokes[Math.floor(Math.random() * DATABASE.jokes.length)], "bot");
    }

    // Se for Anatomia (Busca por palavra-chave dentro da frase)
    for (let key in DATABASE.anatomy) {
        if (t.includes(key)) {
            removeTemp();
            return sendMsg(`🧬 **Anatomia:** ${DATABASE.anatomy[key]}`, "bot");
        }
    }

    // 4. BUSCA GLOBAL NAS 11 WIKIPÉDIAS (O "Gênio")
    // Aqui ele limpa a pergunta para pesquisar só o assunto principal
    let assunto = t.replace(/o que é|quem foi|quem é|onde fica|fale de|pesquise/g, "").replace(/[?]/g, "").trim();

    if (assunto.length > 2) {
        const wikis = ['pt', 'en', 'ceb', 'de', 'fr', 'sv', 'nl', 'ru', 'es', 'it', 'arz'];
        
        for (let lang of wikis) {
            try {
                const resp = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(assunto)}?origin=*`);
                if (resp.ok) {
                    const data = await resp.json();
                    if (data.extract) {
                        removeTemp();
                        // Voz do Robô
                        const falar = new SpeechSynthesisUtterance(data.extract);
                        falar.lang = (lang === 'pt') ? 'pt-BR' : 'en-US';
                        synth.speak(falar);

                        let nomeWiki = (lang === 'pt') ? "Português" : "Estrangeira (" + lang + ")";
                        return sendMsg(`🌐 **Na Wikipédia ${nomeWiki}, encontrei isso:** ${data.extract}`, "bot");
                    }
                }
            } catch(e) { continue; }
        }
    }

    // 5. RESPOSTA PARA QUANDO ELE REALMENTE NÃO ENTENDE
    removeTemp();
    sendMsg("🤔 Ainda estou aprendendo, não entendi bem. Tente usar palavras mais simples como 'O que é [assunto]' ou 'Raiz de [número]'.", "bot");
}
