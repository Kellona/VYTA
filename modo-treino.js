/* VYTA | Modo Treino v3
   Sessão guiada, registro de séries/cargas, descanso e histórico de cargas. */
(() => {
"use strict";
const KEY = "fitness_modo_treino_v1";
const CATALOG_KEY = "fitness_catalogo_treinos_v1";
const $ = (s, r = document) => r.querySelector(s);
const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const iso = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{"sessao":null,"historico":[]}'); } catch (e) { return { sessao: null, historico: [] }; } };
const write = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); return true; } catch (e) { alert("Não foi possível salvar o treino neste dispositivo."); return false; } };
let ticker = null, remaining = 0;

function style() {
  if ($("#vytaModoStyles")) return;
  const s = document.createElement("style");
  s.id = "vytaModoStyles";
  s.textContent = `
    #vytaModo{margin:16px 0;padding:18px;border:2px solid #8b7cf6;border-radius:16px;background:#fbfaff;color:#29283d}
    #vytaModo h3{margin:0 0 8px;color:#292747}
    .vyta-modo-top{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
    .vyta-modo-progress{height:9px;background:#e9e7f5;border-radius:20px;overflow:hidden;margin:12px 0}
    .vyta-modo-progress span{display:block;height:100%;background:#7164d8;width:0;transition:width .2s}
    .vyta-modo-ex{padding:13px;margin:12px 0;border:1px solid #e5e3f0;border-radius:12px;background:white}
    .vyta-modo-ex h4{margin:0 0 5px;color:#5148a8}
    .vyta-modo-set{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:8px 0;border-top:1px solid #efedf5;font-size:12px}
    .vyta-modo-set.done{color:#27734d}
    .vyta-modo-timer{font-size:30px;font-weight:800;font-variant-numeric:tabular-nums;color:#5148a8}
    .vyta-modo-muted{font-size:12px;color:#68677a;line-height:1.5}
    .vyta-hist-sessao{padding:10px 12px;margin-top:8px;border:1px solid #e5e3f0;border-radius:10px;background:#fff;font-size:12px}
  `;
  document.head.appendChild(s);
}

function ensurePanel() {
  const catalog = $("#catalogoTreinos");
  if (!catalog || $("#vytaModo")) return;
  style();
  const p = document.createElement("section");
  p.id = "vytaModo";
  p.innerHTML = `
    <div class="vyta-modo-top">
      <div>
        <p class="vyta-etiqueta">TREINO NA PRÁTICA</p>
        <h3>🏋️ Modo Treino</h3>
        <p class="vyta-modo-muted">Abra uma ficha na biblioteca ou nos seus treinos personalizados e toque em “▶ Iniciar treino”.</p>
      </div>
      <span class="vyta-contagem">Seu treino, seu ritmo</span>
    </div>
    <div id="vytaModoBody"></div>
  `;
  const aviso = $(".vyta-aviso", catalog);
  if (aviso) {
    aviso.insertAdjacentElement("beforebegin", p);
  } else {
    catalog.appendChild(p);
  }
  render();
}

function renderHistoricoCargas(historico) {
  if (!historico || !historico.length) return "";
  const itens = historico.slice(0, 15).map(h => {
    const linhasEx = (h.exercicios || []).map(ex => {
      const seriesValidas = (ex.series || [])
        .map((st, idx) => (st.carga || st.reps) ? `S${idx + 1}: ${st.carga || "0"}kg × ${st.reps || "-"}` : null)
        .filter(Boolean)
        .join(" | ");
      return `<li><strong>${esc(ex.nome)}</strong>${seriesValidas ? `: ${esc(seriesValidas)}` : ""}</li>`;
    }).join("");
    return `<div class="vyta-hist-sessao">
      <strong>📅 ${esc(h.data.split("-").reverse().join("/"))} — ${esc(h.programaNome)} (Treino ${esc(h.letra)})</strong>
      <ul style="margin:6px 0 0;padding-left:18px;color:#555;">${linhasEx}</ul>
    </div>`;
  }).join("");

  return `<details style="margin-top:12px;">
    <summary style="cursor:pointer;font-weight:700;color:#5148a8;font-size:13px;">📊 Ver histórico de cargas (${historico.length} sessões registradas)</summary>
    <div style="max-height:260px;overflow-y:auto;margin-top:8px;">${itens}</div>
  </details>`;
}

function render() {
  ensurePanel();
  const panel = $("#vytaModo");
  if (!panel) return;
  const body = $("#vytaModoBody", panel), state = read(), s = state.sessao;
  if (!s) {
    body.innerHTML = '<p class="vyta-modo-muted">Nenhuma sessão em andamento. Clique em <strong>Ver fichas</strong> em qualquer programa e toque em <strong>▶ Iniciar treino</strong>.</p>' + renderHistoricoCargas(state.historico);
    return;
  }

  const total = s.exercicios.reduce((n, x) => n + x.series.length, 0);
  const done = s.exercicios.reduce((n, x) => n + x.series.filter(y => y.done).length, 0);
  const pct = total ? Math.round(done / total * 100) : 0;

  let html = `
    <div class="vyta-modo-top">
      <div>
        <strong>${esc(s.programaNome)} · Treino ${esc(s.letra)}</strong>
        <p class="vyta-modo-muted">Iniciado em ${esc(s.data.split("-").reverse().join("/"))} · ${done}/${total} séries concluídas</p>
      </div>
      <button type="button" class="vyta-btn danger" data-modo-cancelar>Encerrar sem concluir</button>
    </div>
    <div class="vyta-modo-progress"><span style="width:${pct}%"></span></div>
    <div class="vyta-modo-ex" style="border:2px solid #b8b0f2;background:#f5f3ff">
      <div class="vyta-modo-top">
        <div>
          <h4 style="margin:0">⏱️ Cronômetro de descanso</h4>
          <p class="vyta-modo-muted">Escolha o intervalo e toque em iniciar.</p>
        </div>
        <div id="vytaTimer" class="vyta-modo-timer">00:00</div>
      </div>
      <div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:10px">
        <button type="button" class="vyta-btn sec" data-timer="60">60s</button>
        <button type="button" class="vyta-btn sec" data-timer="90">90s</button>
        <button type="button" class="vyta-btn sec" data-timer="120">120s</button>
        <button type="button" class="vyta-btn" data-timer-start>▶ Iniciar</button>
        <button type="button" class="vyta-btn danger" data-timer-stop>Parar</button>
      </div>
    </div>`;

  s.exercicios.forEach((ex, i) => {
    html += `<article class="vyta-modo-ex">
      <h4>${i + 1}. ${esc(ex.nome)}</h4>
      <p class="vyta-modo-muted">${esc(ex.prescricao)} · Descanso: ${esc(ex.descanso)}</p>
      <p class="vyta-modo-muted">${esc(ex.orientacao)}</p>`;
    ex.series.forEach((set, j) => {
      html += `<div class="vyta-modo-set ${set.done ? "done" : ""}">
        <strong>Série ${j + 1}</strong>
        <label style="display:inline-flex;align-items:center;gap:4px;margin:0;">Carga (kg)
          <input type="number" min="0" step="0.5" data-carga="${i}" data-set="${j}" value="${esc(set.carga)}" style="width:75px;padding:6px;border:1px solid #ddd;border-radius:7px">
        </label>
        <label style="display:inline-flex;align-items:center;gap:4px;margin:0;">Reps
          <input type="number" min="0" step="1" data-reps="${i}" data-set="${j}" value="${esc(set.reps)}" style="width:65px;padding:6px;border:1px solid #ddd;border-radius:7px">
        </label>
        <button type="button" class="vyta-btn ${set.done ? "sec" : ""}" data-modo-set="${i}" data-set="${j}">${set.done ? "✓ Feita" : "Concluir série"}</button>
      </div>`;
    });
    html += `</article>`;
  });

  html += `<button type="button" class="vyta-btn" data-modo-finalizar ${done === total ? "" : "disabled"} style="width:100%;${done === total ? "" : "opacity:.55;"}">Finalizar e registrar sessão</button>
    <p class="vyta-modo-muted">Conclua todas as séries acima para liberar o botão de finalizar.</p>`;

  body.innerHTML = html;
  if (remaining > 0) $("#vytaTimer", panel).textContent = fmt(remaining);
}

function fmt(n) { return String(Math.floor(n / 60)).padStart(2, "0") + ":" + String(n % 60).padStart(2, "0"); }
function stopTimer() { if (ticker) clearInterval(ticker); ticker = null; }
function startTimer() {
  stopTimer();
  if (!remaining) remaining = 60;
  const el = $("#vytaTimer");
  if (el) el.textContent = fmt(remaining);
  ticker = setInterval(() => {
    remaining = Math.max(0, remaining - 1);
    const x = $("#vytaTimer");
    if (x) x.textContent = fmt(remaining);
    if (!remaining) {
      stopTimer();
      if ("Notification" in window && Notification.permission === "granted") new Notification("VYTA: descanso concluído!");
    }
  }, 1000);
}

function begin(button) {
  ensurePanel();
  const details = button.closest("details") || button.closest(".vyta-dia-conteudo");
  if (!details) return;
  const rows = [...details.querySelectorAll(".vyta-ex")];
  if (!rows.length) return;

  const state = read();
  const exercises = rows.map(row => {
    const ps = [...row.querySelectorAll("p")];
    const prescription = ps[0]?.textContent || "";
    const match = prescription.match(/(\d+)\s+séries/i);
    const count = match ? Math.max(1, Math.min(10, Number(match[1]))) : 3;
    const nomeEx = row.querySelector("strong")?.textContent || "Exercício";

    let ultimasSeries = [];
    for (const h of state.historico) {
      const achado = (h.exercicios || []).find(e => e.nome === nomeEx);
      if (achado && achado.series) {
        ultimasSeries = achado.series;
        break;
      }
    }

    return {
      nome: nomeEx,
      prescricao: prescription,
      descanso: (prescription.match(/Descanso:\s*([^·]+)/i) || [])[1]?.trim() || "60 s",
      orientacao: ps[1]?.textContent || "",
      series: Array.from({ length: count }, (_, idx) => ({
        carga: ultimasSeries[idx]?.carga || "",
        reps: ultimasSeries[idx]?.reps || "",
        done: false
      }))
    };
  });

  const title = $("#vytaDetalhes")?.querySelector("h3")?.textContent || "Programa";
  const s = {
    programaId: button.getAttribute("data-iniciar-treino"),
    programaNome: title,
    letra: button.getAttribute("data-sessao") || "A",
    data: iso(),
    exercicios
  };

  if (state.sessao && !confirm("Há uma sessão em andamento. Deseja substituí-la por este treino?")) return;
  state.sessao = s;
  if (write(state)) {
    remaining = 0;
    render();
    $("#vytaModo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Captura global na fase de captura para garantir que nenhum outro script bloqueie o clique
document.addEventListener("click", ev => {
  const b = ev.target.closest("button");
  if (!b) return;

  if (b.hasAttribute("data-iniciar-treino")) {
    ev.preventDefault();
    ev.stopPropagation();
    begin(b);
    return;
  }

  if (!b.closest("#vytaModo")) return;
  let state = read(), s = state.sessao;

  if (b.hasAttribute("data-modo-set") && s) {
    const i = +b.dataset.modoSet, j = +b.dataset.set;
    const carga = $('[data-carga="' + i + '"][data-set="' + j + '"]', b.closest("#vytaModo"));
    const reps = $('[data-reps="' + i + '"][data-set="' + j + '"]', b.closest("#vytaModo"));
    s.exercicios[i].series[j] = {
      carga: carga?.value || "",
      reps: reps?.value || "",
      done: !s.exercicios[i].series[j].done
    };
    state.sessao = s;
    if (write(state)) render();
    return;
  }

  if (b.dataset.timer) {
    remaining = Number(b.dataset.timer);
    const x = $("#vytaTimer");
    if (x) x.textContent = fmt(remaining);
    return;
  }

  if (b.hasAttribute("data-timer-start")) { startTimer(); return; }
  if (b.hasAttribute("data-timer-stop")) { stopTimer(); return; }

  if (b.hasAttribute("data-modo-cancelar")) {
    if (confirm("Encerrar esta sessão sem registrar como concluída?")) {
      state.sessao = null;
      write(state);
      stopTimer();
      remaining = 0;
      render();
    }
    return;
  }

  if (b.hasAttribute("data-modo-finalizar") && s) {
    const total = s.exercicios.reduce((n, x) => n + x.series.length, 0);
    const done = s.exercicios.reduce((n, x) => n + x.series.filter(y => y.done).length, 0);
    if (done !== total) return;

    state.historico.unshift({ ...s, concluidaEm: new Date().toISOString() });
    state.historico = state.historico.slice(0, 200);
    state.sessao = null;
    write(state);

    try {
      const catalog = JSON.parse(localStorage.getItem(CATALOG_KEY) || "{}");
      catalog.concluidos = Array.isArray(catalog.concluidos) ? catalog.concluidos : [];
      if (!catalog.concluidos.some(x => x.programaId === s.programaId && x.sessao === s.letra && x.data === s.data)) {
        catalog.concluidos.push({ programaId: s.programaId, sessao: s.letra, data: s.data });
        localStorage.setItem(CATALOG_KEY, JSON.stringify(catalog));
      }
    } catch (e) {
      console.warn("Erro ao sincronizar catálogo", e);
    }

    if (typeof registrarTreinoNaData === "function") {
      registrarTreinoNaData(s.data, `${s.programaNome} — Treino ${s.letra}`);
    }

    stopTimer();
    remaining = 0;
    render();
  }
}, true);

document.addEventListener("input", ev => {
  const el = ev.target;
  if (!el.matches("[data-carga],[data-reps]")) return;
  const state = read(), s = state.sessao;
  if (!s) return;
  const i = Number(el.dataset[el.hasAttribute("data-carga") ? "carga" : "reps"]);
  const j = Number(el.dataset.set);
  const field = el.hasAttribute("data-carga") ? "carga" : "reps";
  if (s.exercicios[i]?.series[j]) {
    s.exercicios[i].series[j][field] = el.value;
    state.sessao = s;
    write(state);
  }
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ensurePanel);
} else {
  ensurePanel();
}
const observer = new MutationObserver(() => {
  if ($("#catalogoTreinos") && !$("#vytaModo")) {
    ensurePanel();
  }
});
observer.observe(document.documentElement, { childList: true, subtree: true });
})();