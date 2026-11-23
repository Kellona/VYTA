/* =====================================================
   VYTA — Core (Treinos Integrados, Peso, IMC, Medidas, Medicação e Perfil)
   ===================================================== */

   const CHAVES = {
    treinos: "fitness_treinos_db",
    pesos: "fitness_peso_db",
    injecoes: "fitness_injecoes_db",
    avaliacoes: "fitness_avaliacao_db",
    medidas: "fitness_medidas_db",
    perfil: "vyta_perfil_usuario_v1"
  };
  
  let graficoTreinos = null;
  let graficoCruzado = null;
  
  // ---------- PERFIL DO USUÁRIO ----------
  
  function obterPerfil() {
    try {
      const p = JSON.parse(localStorage.getItem(CHAVES.perfil) || "{}");
      return {
        nome: p.nome || "",
        altura: Number(p.altura) > 0 ? Number(p.altura) : 1.70,
        alturaConfigurada: Number(p.altura) > 0,
        medicamento: p.medicamento || "",
        intervaloDias: Number(p.intervaloDias) > 0 ? Number(p.intervaloDias) : 7,
        metaTreinos: Number(p.metaTreinos) > 0 ? Number(p.metaTreinos) : 200
      };
    } catch {
      return { nome: "", altura: 1.70, alturaConfigurada: false, medicamento: "", intervaloDias: 7, metaTreinos: 200 };
    }
  }
  
  function carregarFormularioPerfil() {
    const p = obterPerfil();
    const campoNome = document.getElementById("perfilNome");
    const campoAltura = document.getElementById("perfilAltura");
    const campoMed = document.getElementById("perfilMedicamento");
    const campoInt = document.getElementById("perfilIntervalo");
    const campoMeta = document.getElementById("perfilMetaTreinos");
  
    if (campoNome) campoNome.value = p.nome;
    if (campoAltura && p.alturaConfigurada) campoAltura.value = p.altura;
    if (campoMed) campoMed.value = p.medicamento;
    if (campoInt) campoInt.value = p.intervaloDias;
    if (campoMeta) campoMeta.value = p.metaTreinos;
  }
  
  function alterarMetaTreinosRapida() {
    const atual = obterPerfil().metaTreinos;
    const resposta = prompt("Qual é a sua meta de treinos? (Ex: 50, 100, 150, 200 ou 365)", atual);
    if (resposta === null) return;
    const novaMeta = Number(resposta.trim());
    if (!Number.isInteger(novaMeta) || novaMeta < 1 || novaMeta > 1000) {
      alert("Informe um número inteiro válido entre 1 e 1000.");
      return;
    }
    const perfil = obterPerfil();
    perfil.metaTreinos = novaMeta;
    localStorage.setItem(CHAVES.perfil, JSON.stringify(perfil));
    carregarFormularioPerfil();
    renderizarTreinos();
    atualizarVisaoGeral();
  }
  
  function salvarPerfilUsuario() {
    const nome = document.getElementById("perfilNome")?.value.trim() || "";
    const alturaTexto = String(document.getElementById("perfilAltura")?.value || "").replace(",", ".");
    const altura = Number(alturaTexto);
    const medicamento = document.getElementById("perfilMedicamento")?.value || "";
    const intervaloDias = Number(document.getElementById("perfilIntervalo")?.value) || 7;
    const metaTreinos = Number(document.getElementById("perfilMetaTreinos")?.value) || 200;
  
    if (alturaTexto !== "" && (!Number.isFinite(altura) || altura < 1.0 || altura > 2.5)) {
      alert("Informe uma altura válida em metros (ex: 1,65).");
      return;
    }
  
    const perfil = {
      nome,
      altura: altura > 0 ? altura : 1.70,
      medicamento,
      intervaloDias,
      metaTreinos: metaTreinos > 0 ? metaTreinos : 200
    };
  
    localStorage.setItem(CHAVES.perfil, JSON.stringify(perfil));
  
    if (altura > 0) {
      const pesos = obterPesos().map(item => ({
        ...item,
        imc: Number((item.peso / (altura * altura)).toFixed(2))
      }));
      salvarPesos(pesos);
    }
  
    atualizarVisaoGeral();
    renderizarPeso();
    renderizarInjecoes();
    renderizarTreinos();
    alert("Perfil salvo com sucesso!");
  }
  
  // ---------- ARMAZENAMENTO COMPATÍVEL ----------
  
  function lerDados(chaveNova, chaveAntiga, converter = x => x) {
    try {
      const novos = JSON.parse(localStorage.getItem(chaveNova) || "[]");
      if (Array.isArray(novos) && novos.length > 0) {
        return novos.map(converter);
      }
      if (chaveAntiga) {
        const antigos = JSON.parse(localStorage.getItem(chaveAntiga) || "[]");
        if (Array.isArray(antigos) && antigos.length > 0) {
          return antigos.map(converter);
        }
      }
      return Array.isArray(novos) ? novos.map(converter) : [];
    } catch (erro) {
      console.error("Erro ao ler dados:", erro);
      return [];
    }
  }
  
  function gravarDados(chaveNova, chaveAntiga, dados) {
    const texto = JSON.stringify(dados);
    localStorage.setItem(chaveNova, texto);
    if (chaveAntiga) {
      localStorage.setItem(chaveAntiga, texto);
    }
  }
  
  function converterTreinoObjeto(item) {
    if (typeof item === "string") {
      return { data: item, descricao: "Treino registrado" };
    }
    if (item && item.data) {
      return {
        data: item.data,
        descricao: item.descricao || "Treino registrado"
      };
    }
    return null;
  }
  
  function obterTreinosDetalhados() {
    return lerDados(CHAVES.treinos, "treinos", converterTreinoObjeto).filter(Boolean);
  }
  
  function obterTreinos() {
    return obterTreinosDetalhados().map(t => t.data);
  }
  
  function obterPesos() {
    return lerDados(CHAVES.pesos, "pesos", item => ({
      ...item,
      peso: Number(item.peso),
      imc: Number(item.imc)
    })).filter(item => item.data && item.peso > 0);
  }
  
  function obterInjecoes() {
    return lerDados(CHAVES.injecoes, "injecoes", item =>
      typeof item === "string" ? { data: item, dose: "Não informada", obs: "" } : item
    ).filter(item => item.data);
  }
  
  function salvarTreinos(dados) {
    const normalizados = dados.map(converterTreinoObjeto).filter(Boolean);
    gravarDados(CHAVES.treinos, "treinos", normalizados);
  }
  
  function salvarPesos(dados) { gravarDados(CHAVES.pesos, "pesos", dados); }
  function salvarInjecoes(dados) { gravarDados(CHAVES.injecoes, "injecoes", dados); }
  
  function dataHoje() {
    const data = new Date();
    data.setMinutes(data.getMinutes() - data.getTimezoneOffset());
    return data.toISOString().slice(0, 10);
  }
  
  function formatarData(data) {
    if (!data) return "";
    const partes = data.split("-");
    return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : data;
  }
  
  // ---------- INICIALIZAÇÃO ----------
  
  document.addEventListener("DOMContentLoaded", () => {
    const hoje = dataHoje();
    ["dataPeso", "dataInjecao", "dataMedidas", "dataAvaliacao"].forEach(id => {
      const campo = document.getElementById(id);
      if (campo && !campo.value) campo.value = hoje;
    });
  
    carregarFormularioPerfil();
    renderizarTreinos();
    renderizarPeso();
    renderizarInjecoes();
    renderizarMedidasCorporais();
  
    if (typeof renderizarAvaliacaoCorporal === "function") {
      renderizarAvaliacaoCorporal();
    }
  
    abrirAba("inicio");
  });
  
  // ---------- ABAS ----------
  
  function abrirAba(nome) {
    const abas = {
      inicio: ["abaInicio", "tabInicio"],
      treinos: ["abaTreinos", "tabTreinos"],
      peso: ["abaPeso", "tabPeso"],
      composicao: ["abaComposicao", "tabComposicao"],
      medidas: ["abaMedidas", "tabMedidas"],
      inj: ["abaInj", "tabInj"],
      perfil: ["abaPerfil", "tabPerfil"]
    };
  
    Object.values(abas).forEach(([idAba, idBotao]) => {
      const aba = document.getElementById(idAba);
      const botao = document.getElementById(idBotao);
      if (aba) aba.style.display = "none";
      if (botao) botao.classList.remove("active");
    });
  
    if (!abas[nome]) return;
  
    const [idAba, idBotao] = abas[nome];
    const aba = document.getElementById(idAba);
    const botao = document.getElementById(idBotao);
  
    if (aba) aba.style.display = "block";
    if (botao) botao.classList.add("active");
  
    if (nome === "treinos") renderizarTreinos();
    if (nome === "inicio") atualizarVisaoGeral();
    if (nome === "peso") renderizarPeso();
    if (nome === "composicao" && typeof renderizarAvaliacaoCorporal === "function") {
      renderizarAvaliacaoCorporal();
    }
    if (nome === "inj") renderizarInjecoes();
    if (nome === "medidas") renderizarMedidasCorporais();
    if (nome === "perfil") carregarFormularioPerfil();
  }
  
  // ---------- TREINOS ----------
  
  function salvarRegistro() {
    registrarTreinoNaData(dataHoje(), "Treino livre / concluído");
  }
  
  function abrirRegistroData() {
    const modal = document.getElementById("modal");
    const campo = document.getElementById("dataTreino");
    const campoDesc = document.getElementById("descTreinoModal");
    if (modal) modal.style.display = "flex";
    if (campo && !campo.value) campo.value = dataHoje();
    if (campoDesc) campoDesc.value = "";
  }
  
  function fecharModal() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
  }
  
  function registrarDataEscolhida() {
    const campo = document.getElementById("dataTreino");
    const campoDesc = document.getElementById("descTreinoModal");
    if (!campo || !campo.value) {
      alert("Selecione uma data para o treino.");
      return;
    }
    const desc = campoDesc?.value.trim() || "Treino registrado";
    registrarTreinoNaData(campo.value, desc);
    fecharModal();
  }
  
  function registrarTreinoNaData(data, descricao = "Treino registrado") {
    const treinos = obterTreinosDetalhados();
    const existente = treinos.findIndex(t => t.data === data);
  
    if (existente >= 0) {
      if (descricao && descricao !== "Treino registrado") {
        treinos[existente].descricao = descricao;
        salvarTreinos(treinos);
        renderizarTreinos();
        atualizarVisaoGeral();
      } else {
        alert("Já existe um treino registrado nessa data.");
      }
      return;
    }
  
    treinos.push({ data, descricao });
    treinos.sort((a, b) => a.data.localeCompare(b.data));
    salvarTreinos(treinos);
    renderizarTreinos();
    atualizarVisaoGeral();
    alert("Treino registrado com sucesso!");
  }
  
  function apagarTreino(data) {
    if (!confirm(`Deseja excluir o treino do dia ${formatarData(data)}?`)) return;
    const treinos = obterTreinosDetalhados().filter(t => t.data !== data);
    salvarTreinos(treinos);
    renderizarTreinos();
    atualizarVisaoGeral();
    alert("Treino excluído.");
  }
  
  function resetar() {
    if (!confirm("Deseja excluir TODOS os registros de treino? Essa ação não pode ser desfeita.")) return;
    salvarTreinos([]);
    renderizarTreinos();
    atualizarVisaoGeral();
  }
  
  function mostrarTreinoDia() {
    const caixa = document.getElementById("boxTreino");
    if (!caixa) return;
  
    const diasNomes = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const hojeDia = new Date().getDay();
  
    let catalogo = {};
    try {
      catalogo = JSON.parse(localStorage.getItem("fitness_catalogo_treinos_v1") || "{}");
    } catch {
      catalogo = {};
    }
  
    if (catalogo.ativoId) {
      const rotinaBox = document.getElementById("vytaRotina");
      if (rotinaBox) {
        rotinaBox.scrollIntoView({ behavior: "smooth", block: "center" });
        rotinaBox.style.outline = "2px solid #8B7CF6";
        setTimeout(() => { rotinaBox.style.outline = "none"; }, 2000);
        return;
      }
    }
  
    caixa.innerHTML = `
      <div class="treino-dia">
        <strong>📅 Hoje é ${diasNomes[hojeDia]}</strong>
        <p style="margin:8px 0;">Você ainda não selecionou um programa ativo na <strong>Biblioteca de Treinos</strong> acima.</p>
        <button type="button" class="btn-treino" onclick="document.getElementById('catalogoTreinos')?.scrollIntoView({behavior:'smooth'})">
          Escolher meu programa na Biblioteca
        </button>
      </div>
    `;
  
    caixa.style.display = (caixa.style.display === "none" || getComputedStyle(caixa).display === "none") ? "block" : "none";
  }
  
  function renderizarTreinos() {
    const perfil = obterPerfil();
    const meta = perfil.metaTreinos;
    const treinos = obterTreinosDetalhados();
  
    const contador = document.getElementById("contador");
    if (contador) contador.textContent = treinos.length;
  
    const textoMeta = document.getElementById("textoMetaTotal");
    if (textoMeta) textoMeta.textContent = `de ${meta} treinos (meta anual)`;
  
    const faltam = document.getElementById("faltamDias");
    if (faltam) faltam.textContent = `Faltam ${Math.max(0, meta - treinos.length)} treinos para sua meta`;
  
    const progresso = document.getElementById("progressFill");
    if (progresso) progresso.style.width = `${Math.min(100, (treinos.length / meta) * 100)}%`;
  
    const historico = document.getElementById("historicoLista");
    if (historico) {
      historico.innerHTML = [...treinos]
        .sort((a, b) => b.data.localeCompare(a.data))
        .slice(0, 40)
        .map(item => `
          <div class="registro-item" style="display:flex;align-items:center;gap:8px;">
            <div style="flex:1; text-align:left;">
              <strong>🏋️ ${formatarData(item.data)}</strong>
              <div style="font-size:12px; color:#555; margin-top:2px;">${item.descricao || "Treino registrado"}</div>
            </div>
            <button type="button" onclick="apagarTreino('${item.data}')"
              style="width:auto;margin-left:auto;background:#dc3545;color:white;padding:6px 10px;font-size:13px;">
              Excluir
            </button>
          </div>
        `).join("") || "<p>Nenhum treino registrado.</p>";
    }
  
    renderizarGraficoTreinos(treinos.map(t => t.data));
  }
  
  function renderizarGraficoTreinos(datasTreinos) {
    const canvas = document.getElementById("graficoMensal");
    if (!canvas || typeof Chart === "undefined") return;
    if (graficoTreinos) graficoTreinos.destroy();
  
    const meses = {};
    datasTreinos.forEach(data => {
      const mes = data.slice(0, 7);
      meses[mes] = (meses[mes] || 0) + 1;
    });
  
    const chaves = Object.keys(meses).sort();
    graficoTreinos = new Chart(canvas, {
      type: "bar",
      data: {
        labels: chaves,
        datasets: [{ label: "Treinos realizados", data: chaves.map(mes => meses[mes]), backgroundColor: "#5148a8" }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } }
    });
  }
  
  // ---------- IMC E PESO ----------
  
  function calcularIMC(peso) {
    const perfil = obterPerfil();
    return Number((peso / (perfil.altura * perfil.altura)).toFixed(2));
  }
  
  function classificarIMC(imc) {
    if (imc < 18.5) return { nome: "Abaixo do peso", cor: "#2196F3" };
    if (imc < 25) return { nome: "Peso adequado", cor: "#4CAF50" };
    if (imc < 30) return { nome: "Sobrepeso", cor: "#FBC02D" };
    if (imc < 35) return { nome: "Obesidade grau I", cor: "#FB8C00" };
    if (imc < 40) return { nome: "Obesidade grau II", cor: "#E53935" };
    return { nome: "Obesidade grau III", cor: "#8E24AA" };
  }
  
  function registrarPeso() {
    const campoData = document.getElementById("dataPeso");
    const campoPeso = document.getElementById("pesoInput");
    const data = campoData?.value;
    const peso = Number(String(campoPeso?.value || "").replace(",", "."));
  
    if (!data || !Number.isFinite(peso) || peso <= 0) {
      alert("Preencha uma data e um peso válido.");
      return;
    }
  
    const historico = obterPesos();
    const imc = calcularIMC(peso);
    const registro = { data, peso, imc };
  
    const indice = historico.findIndex(item => item.data === data);
    if (indice >= 0) {
      historico[indice] = registro;
    } else {
      historico.push(registro);
    }
  
    historico.sort((a, b) => a.data.localeCompare(b.data));
    salvarPesos(historico);
    if (campoPeso) campoPeso.value = "";
    renderizarPeso();
    atualizarVisaoGeral();
    alert("Peso salvo com sucesso!");
  }
  
  function apagarPeso(data) {
    if (!confirm(`Deseja excluir o peso registrado em ${formatarData(data)}?`)) return;
    const atualizado = obterPesos().filter(item => item.data !== data);
    salvarPesos(atualizado);
    renderizarPeso();
    atualizarVisaoGeral();
    alert("Pesagem excluída.");
  }
  
  function renderizarPeso() {
    const perfil = obterPerfil();
    const aviso = document.getElementById("avisoAlturaPerfil");
    if (aviso) {
      aviso.innerHTML = perfil.alturaConfigurada
        ? `IMC calculado com sua altura cadastrada: <strong>${perfil.altura.toFixed(2).replace(".", ",")} m</strong>`
        : `⚠️ Altura padrão (1,70 m) em uso. <a href="#" onclick="abrirAba('perfil');return false;">Informe sua altura em Meu Perfil</a> para um IMC exato.`;
    }
  
    const historico = obterPesos();
    const lista = document.getElementById("listaPeso");
  
    const legenda = `
      <div style="padding:12px;margin-bottom:14px;border:1px solid #ddd;border-radius:10px;background:#fff;text-align:left;line-height:1.9;font-size:13px;">
        <strong>📊 Classificação do IMC</strong><br>
        <span style="color:#2196F3">●</span> Abaixo de 18,5 — Abaixo do peso<br>
        <span style="color:#4CAF50">●</span> 18,5 a 24,9 — Peso adequado<br>
        <span style="color:#FBC02D">●</span> 25,0 a 29,9 — Sobrepeso<br>
        <span style="color:#FB8C00">●</span> 30,0 a 34,9 — Obesidade grau I<br>
        <span style="color:#E53935">●</span> 35,0 a 39,9 — Obesidade grau II<br>
        <span style="color:#8E24AA">●</span> 40,0 ou mais — Obesidade grau III
      </div>`;
  
    if (lista) {
      const registros = [...historico].sort((a, b) => b.data.localeCompare(a.data));
      lista.innerHTML = legenda + (
        registros.map(item => {
          const imc = calcularIMC(Number(item.peso));
          const classificacao = classificarIMC(imc);
          return `
            <div class="registro-item" style="display:flex;align-items:center;gap:8px;border-left:6px solid ${classificacao.cor};margin-bottom:8px;background:#fff;border-radius:7px;padding:10px;">
              <div style="text-align:left;flex:1;">
                <strong>${formatarData(item.data)}</strong><br>
                Peso: ${Number(item.peso).toFixed(1)} kg<br>
                IMC: <strong>${imc.toFixed(2)}</strong><br>
                <span style="color:${classificacao.cor};font-weight:bold;">${classificacao.nome}</span>
              </div>
              <button type="button" onclick="apagarPeso('${item.data}')" style="width:auto;background:#dc3545;color:white;padding:7px 9px;font-size:12px;">
                Excluir
              </button>
            </div>`;
        }).join("") || "<p>Nenhum peso registrado.</p>"
      );
    }
  }
  
  // ---------- MEDICAÇÃO / INJEÇÕES ----------
  
  function calcularProximaDataAplicacao(dataUltima, intervalo) {
    const partes = dataUltima.split("-").map(Number);
    const proxima = new Date(partes[0], partes[1] - 1, partes[2]);
    proxima.setDate(proxima.getDate() + intervalo);
    return proxima.toLocaleDateString("pt-BR");
  }
  
  function registrarInjecao() {
    const campoData = document.getElementById("dataInjecao");
    const campoDose = document.getElementById("doseInjecao");
    const campoObs = document.getElementById("obsInjecao");
  
    const data = campoData?.value || dataHoje();
    const dose = campoDose?.value || "Não informada";
    const obs = campoObs?.value.trim() || "";
  
    const historico = obterInjecoes();
    historico.push({ data, dose, obs });
    historico.sort((a, b) => a.data.localeCompare(b.data));
  
    salvarInjecoes(historico);
    if (campoObs) campoObs.value = "";
    renderizarInjecoes();
    atualizarVisaoGeral();
    alert("Aplicação registrada!");
  }
  
  function apagarInjecao(indice) {
    if (!confirm("Deseja excluir esta aplicação?")) return;
    const historico = obterInjecoes();
    historico.splice(indice, 1);
    salvarInjecoes(historico);
    renderizarInjecoes();
    atualizarVisaoGeral();
  }
  
  function renderizarInjecoes() {
    const perfil = obterPerfil();
    const sub = document.getElementById("subtituloMedicamento");
    if (sub) {
      sub.textContent = perfil.medicamento
        ? `Protocolo atual: ${perfil.medicamento} (a cada ${perfil.intervaloDias} dias)`
        : "Registre suas aplicações, dosagens e observações de bem-estar.";
    }
  
    const historico = obterInjecoes();
    const lista = document.getElementById("listaInjecoes");
    const boxProxima = document.getElementById("proximaAplicacao");
  
    if (boxProxima) {
      if (historico.length > 0) {
        const ultima = [...historico].sort((a, b) => b.data.localeCompare(a.data))[0];
        const proxData = calcularProximaDataAplicacao(ultima.data, perfil.intervaloDias);
        boxProxima.innerHTML = `📅 Próxima aplicação prevista: <span style="color:#5148a8">${proxData}</span> (última dose: ${ultima.dose})`;
      } else {
        boxProxima.textContent = "Nenhuma aplicação registrada ainda.";
      }
    }
  
    if (lista) {
      lista.innerHTML = historico
        .map((item, indice) => ({ ...item, indice }))
        .sort((a, b) => b.data.localeCompare(a.data))
        .map(item => `
          <div class="registro-item" style="display:flex;align-items:center;gap:8px;">
            <div style="flex:1; text-align:left;">
              <strong>💉 ${formatarData(item.data)} — ${item.dose || "Não informada"}</strong>
              ${item.obs ? `<div style="font-size:12px; color:#555; margin-top:3px;">${item.obs}</div>` : ""}
            </div>
            <button type="button" onclick="apagarInjecao(${item.indice})"
              style="width:auto;margin-left:auto;background:#dc3545;color:white;padding:6px 10px;font-size:13px;">
              Excluir
            </button>
          </div>
        `).join("") || "<p>Nenhuma aplicação registrada.</p>";
    }
  }
  
  // ---------- VISÃO GERAL E GRÁFICO CRUZADO ----------
  
  function renderizarGraficoPesoMedicacao() {
    const canvas = document.getElementById("graficoPesoMedicacao");
    const aviso = document.getElementById("avisoGraficoCruzado");
    if (!canvas || typeof Chart === "undefined") return;
  
    if (graficoCruzado) {
      graficoCruzado.destroy();
      graficoCruzado = null;
    }
  
    const pesos = obterPesos().sort((a, b) => a.data.localeCompare(b.data));
    const injecoes = obterInjecoes().sort((a, b) => a.data.localeCompare(b.data));
  
    if (pesos.length === 0 && injecoes.length === 0) {
      if (aviso) aviso.textContent = "Registre seu peso e suas aplicações para visualizar o gráfico cruzado aqui.";
      return;
    }
  
    const todasDatas = Array.from(new Set([
      ...pesos.map(p => p.data),
      ...injecoes.map(i => i.data)
    ])).sort();
  
    const mapaPesos = Object.fromEntries(pesos.map(p => [p.data, Number(p.peso)]));
    const mapaInjecoes = {};
    injecoes.forEach(i => {
      mapaInjecoes[i.data] = i.dose || "Aplicação";
    });
  
    let ultimoPesoConhecido = pesos.length > 0 ? Number(pesos[0].peso) : null;
    const serieLinhaPeso = [];
    const seriePontosDose = [];
  
    todasDatas.forEach(data => {
      if (mapaPesos[data] !== undefined) {
        ultimoPesoConhecido = mapaPesos[data];
        serieLinhaPeso.push(mapaPesos[data]);
      } else {
        serieLinhaPeso.push(null);
      }
  
      if (mapaInjecoes[data] !== undefined && ultimoPesoConhecido !== null) {
        seriePontosDose.push(ultimoPesoConhecido);
      } else {
        seriePontosDose.push(null);
      }
    });
  
    if (aviso) {
      aviso.textContent = pesos.length === 0
        ? "Registre pelo menos 1 pesagem para traçar a curva junto com suas aplicações."
        : `Exibindo ${pesos.length} pesagem(ns) e ${injecoes.length} aplicação(ões). Passe o toque sobre os pontos para ver a dose.`;
    }
  
    graficoCruzado = new Chart(canvas, {
      type: "line",
      data: {
        labels: todasDatas.map(d => formatarData(d)),
        datasets: [
          {
            label: "💉 Aplicação / Dose",
            data: seriePontosDose,
            borderColor: "#8B7CF6",
            backgroundColor: "#8B7CF6",
            pointRadius: 7,
            pointHoverRadius: 9,
            pointStyle: "rectRot",
            showLine: false,
            order: 1
          },
          {
            label: "⚖️ Peso (kg)",
            data: serieLinhaPeso,
            borderColor: "#252445",
            backgroundColor: "rgba(37, 36, 69, 0.08)",
            pointBackgroundColor: "#252445",
            pointRadius: 4,
            fill: true,
            tension: 0.3,
            spanGaps: true,
            order: 2
          }
        ]
      },
      options: {
        responsive: true,
        interaction: { mode: "index", intersect: false },
        plugins: {
          tooltip: {
            callbacks: {
              afterBody: function (contexto) {
                const idx = contexto[0]?.dataIndex;
                if (idx === undefined) return "";
                const dataIso = todasDatas[idx];
                if (mapaInjecoes[dataIso]) {
                  return `💉 Dose aplicada: ${mapaInjecoes[dataIso]}`;
                }
                return "";
              }
            }
          }
        },
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
  }
  
  function atualizarVisaoGeral() {
    const perfil = obterPerfil();
    const saudacao = document.getElementById("saudacaoUsuario");
    if (saudacao) {
      saudacao.textContent = perfil.nome ? `Olá, ${perfil.nome}! 👋` : "Olá! 👋";
    }
  
    const treinos = obterTreinos();
    const elementoTreinos = document.getElementById("resumoTreinos");
    if (elementoTreinos) elementoTreinos.textContent = `${treinos.length} / ${perfil.metaTreinos}`;
  
    const pesos = obterPesos();
    const elementoPeso = document.getElementById("resumoPeso");
    if (elementoPeso) {
      const pesosOrdenados = [...pesos].sort((a, b) => b.data.localeCompare(a.data));
      elementoPeso.textContent = pesosOrdenados.length > 0 ? `${pesosOrdenados[0].peso} kg` : "Não cadastrado";
    }
  
    const avaliacoes = typeof obterAvaliacoesCorporais === "function" ? obterAvaliacoesCorporais() : [];
    const elementoAvaliacoes = document.getElementById("resumoAvaliacoes");
    if (elementoAvaliacoes) elementoAvaliacoes.textContent = avaliacoes.length;
  
    const injecoes = obterInjecoes();
    const elementoAplicacao = document.getElementById("resumoAplicacao");
    if (elementoAplicacao) {
      if (injecoes.length > 0) {
        const ultima = [...injecoes].filter(i => i.data).sort((a, b) => b.data.localeCompare(a.data))[0];
        if (ultima) {
          const proxData = calcularProximaDataAplicacao(ultima.data, perfil.intervaloDias);
          elementoAplicacao.textContent = `${proxData} — ${ultima.dose || ""}`;
        }
      } else {
        elementoAplicacao.textContent = "Cadastre uma aplicação";
      }
    }
  
    renderizarGraficoPesoMedicacao();
  }
  
  // ---------- BACKUP COMPLETO VYTA ----------
  
  function exportarBackupVyta() {
    const backup = {
      app: "VYTA",
      versao: 2,
      exportadoEm: new Date().toISOString(),
      perfil: obterPerfil(),
      treinos: obterTreinosDetalhados(),
      pesos: obterPesos(),
      injecoes: obterInjecoes(),
      avaliacoes: typeof obterAvaliacoesCorporais === "function" ? obterAvaliacoesCorporais() : [],
      medidas: obterMedidasCorporais(),
      catalogo: JSON.parse(localStorage.getItem("fitness_catalogo_treinos_v1") || "{}"),
      modoTreino: JSON.parse(localStorage.getItem("fitness_modo_treino_v1") || "{}")
    };
  
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vyta-backup-${dataHoje()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  function importarBackupVyta(event) {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;
  
    const leitor = new FileReader();
    leitor.onload = function (e) {
      try {
        const dados = JSON.parse(e.target.result);
        if (!confirm("Restaurar este backup substituirá os dados atuais deste dispositivo. Continuar?")) return;
  
        if (dados.perfil) localStorage.setItem(CHAVES.perfil, JSON.stringify(dados.perfil));
        if (Array.isArray(dados.treinos)) salvarTreinos(dados.treinos);
        if (Array.isArray(dados.pesos)) salvarPesos(dados.pesos);
        if (Array.isArray(dados.injecoes)) salvarInjecoes(dados.injecoes);
        if (Array.isArray(dados.avaliacoes)) {
          localStorage.setItem(CHAVES.avaliacoes, JSON.stringify(dados.avaliacoes));
          localStorage.setItem("avaliacoesDobras", JSON.stringify(dados.avaliacoes));
        }
        if (Array.isArray(dados.medidas)) {
          localStorage.setItem(CHAVES.medidas, JSON.stringify(dados.medidas));
        }
        if (dados.catalogo) localStorage.setItem("fitness_catalogo_treinos_v1", JSON.stringify(dados.catalogo));
        if (dados.modoTreino) localStorage.setItem("fitness_modo_treino_v1", JSON.stringify(dados.modoTreino));
  
        carregarFormularioPerfil();
        renderizarTreinos();
        renderizarPeso();
        renderizarInjecoes();
        renderizarMedidasCorporais();
        if (typeof renderizarAvaliacaoCorporal === "function") renderizarAvaliacaoCorporal();
        atualizarVisaoGeral();
  
        alert("Backup restaurado com sucesso!");
      } catch {
        alert("Arquivo de backup inválido ou corrompido.");
      }
    };
    leitor.readAsText(arquivo);
  }
  
  // ---------- MEDIDAS CORPORAIS ----------
  
  let graficoMedidasCorporais = null;
  
  const CAMPOS_MEDIDAS = {
    cintura: "Cintura",
    abdomen: "Abdômen",
    quadril: "Quadril",
    torax: "Peito / tórax",
    bracoDireito: "Braço direito",
    bracoEsquerdo: "Braço esquerdo",
    coxaDireita: "Coxa direita",
    coxaEsquerda: "Coxa esquerda",
    panturrilhaDireita: "Panturrilha direita",
    panturrilhaEsquerda: "Panturrilha esquerda"
  };
  
  function obterMedidasCorporais() {
    try {
      const dados = JSON.parse(localStorage.getItem(CHAVES.medidas) || "[]");
      return Array.isArray(dados) ? dados : [];
    } catch (erro) {
      console.error("Erro ao ler medidas corporais:", erro);
      return [];
    }
  }
  
  function salvarMedidasCorporais() {
    const campoData = document.getElementById("dataMedidas");
    const data = campoData?.value;
  
    if (!data) {
      alert("Selecione a data da avaliação.");
      return;
    }
  
    const registro = { data };
    let quantidadePreenchida = 0;
  
    for (const campo of Object.keys(CAMPOS_MEDIDAS)) {
      const elemento = document.getElementById("medida" + campo.charAt(0).toUpperCase() + campo.slice(1));
      if (!elemento) continue;
      const valorTexto = elemento.value.trim();
  
      if (valorTexto !== "") {
        const valor = Number(valorTexto.replace(",", "."));
        if (!Number.isFinite(valor) || valor <= 0) {
          alert("Confira o valor de " + CAMPOS_MEDIDAS[campo] + ". Informe um número maior que zero.");
          elemento.focus();
          return;
        }
        registro[campo] = valor;
        quantidadePreenchida++;
      }
    }
  
    if (quantidadePreenchida === 0) {
      alert("Preencha pelo menos uma medida corporal.");
      return;
    }
  
    const historico = obterMedidasCorporais();
    const indice = historico.findIndex(item => item.data === data);
  
    if (indice >= 0) {
      historico[indice] = { ...historico[indice], ...registro };
    } else {
      historico.push(registro);
    }
  
    historico.sort((a, b) => a.data.localeCompare(b.data));
  
    try {
      localStorage.setItem(CHAVES.medidas, JSON.stringify(historico));
    } catch (erro) {
      console.error("Erro ao salvar medidas:", erro);
      alert("Não foi possível salvar. Verifique o espaço disponível.");
      return;
    }
  
    renderizarMedidasCorporais();
    alert("Medidas corporais salvas com sucesso!");
  }
  
  function renderizarMedidasCorporais() {
    const historico = obterMedidasCorporais();
    const lista = document.getElementById("historicoMedidas");
  
    if (lista) {
      lista.innerHTML = [...historico]
        .sort((a, b) => b.data.localeCompare(a.data))
        .map(item => {
          const linhas = Object.keys(CAMPOS_MEDIDAS)
            .filter(campo => item[campo] !== undefined && item[campo] !== null && Number.isFinite(Number(item[campo])))
            .map(campo => `<div>${CAMPOS_MEDIDAS[campo]}: ${Number(item[campo]).toFixed(1)} cm</div>`)
            .join("");
  
          return `
            <div class="item-historico" style="padding:12px;margin-bottom:10px;border:1px solid #ddd;border-radius:8px">
              <strong>📏 ${formatarData(item.data)}</strong>
              ${linhas}
              <div style="text-align:right;margin-top:10px">
                <button type="button" onclick="excluirMedidasCorporais('${item.data}')"
                  style="background:#dc3545;color:white;border:0;padding:8px 12px;border-radius:6px;cursor:pointer">
                  Excluir medição
                </button>
              </div>
            </div>
          `;
        }).join("") || "<p>Nenhuma medida registrada.</p>";
    }
  
    atualizarGraficoMedidasCorporais();
  }
  
  function atualizarGraficoMedidasCorporais() {
    const canvas = document.getElementById("graficoMedidas");
    const seletor = document.getElementById("seletorMedida");
    const resumo = document.getElementById("resumoEvolucaoMedida");
  
    if (!canvas || !seletor) return;
  
    const campo = seletor.value;
    const historico = obterMedidasCorporais()
      .filter(item => item[campo] !== undefined && item[campo] !== null && Number.isFinite(Number(item[campo])))
      .sort((a, b) => a.data.localeCompare(b.data));
  
    if (resumo) {
      if (historico.length === 0) {
        resumo.textContent = "Ainda não há registros para esta medida.";
      } else {
        const primeira = historico[0];
        const ultima = historico[historico.length - 1];
        resumo.textContent = `Primeira: ${Number(primeira[campo]).toFixed(1)} cm · Mais recente: ${Number(ultima[campo]).toFixed(1)} cm`;
      }
    }
  
    if (typeof Chart === "undefined") return;
  
    if (graficoMedidasCorporais) {
      graficoMedidasCorporais.destroy();
      graficoMedidasCorporais = null;
    }
  
    graficoMedidasCorporais = new Chart(canvas, {
      type: "line",
      data: {
        labels: historico.map(item => formatarData(item.data)),
        datasets: [{
          label: (CAMPOS_MEDIDAS[campo] || campo) + " (cm)",
          data: historico.map(item => Number(item[campo])),
          borderColor: "#7656d6",
          backgroundColor: "rgba(118, 86, 214, 0.12)",
          fill: true,
          tension: 0.25
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: false } } }
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const seletor = document.getElementById("seletorMedida");
    if (seletor) seletor.addEventListener("change", atualizarGraficoMedidasCorporais);
  });
  
  function excluirMedidasCorporais(data) {
    if (!confirm("Deseja excluir todas as medidas registradas em " + formatarData(data) + "?")) return;
    const historico = obterMedidasCorporais().filter(item => item.data !== data);
    try {
      localStorage.setItem(CHAVES.medidas, JSON.stringify(historico));
      renderizarMedidasCorporais();
      alert("Medição excluída com sucesso!");
    } catch (erro) {
      console.error("Erro ao excluir medição:", erro);
      alert("Não foi possível excluir a medição.");
    }
  }