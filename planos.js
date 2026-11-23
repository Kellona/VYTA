/* VYTA — Sistema de Planos e Monetização (Gratuito vs. VYTA Pro) */
(() => {
    "use strict";
  
    const CHAVE_PLANO = "vyta_assinatura_v1";
  
    function obterPlanoAtual() {
      try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_PLANO) || "{}");
        return {
          ativo: dados.tipo === "pro",
          tipo: dados.tipo === "pro" ? "pro" : "free",
          ciclo: dados.ciclo || "anual",
          ativadoEm: dados.ativadoEm || null
        };
      } catch {
        return { ativo: false, tipo: "free", ciclo: "anual", ativadoEm: null };
      }
    }
  
    function isVytaPro() {
      return obterPlanoAtual().ativo;
    }
  
    function ativarPlanoPro(ciclo = "anual") {
      localStorage.setItem(CHAVE_PLANO, JSON.stringify({
        tipo: "pro",
        ciclo,
        ativadoEm: new Date().toISOString()
      }));
      atualizarBadgePlano();
      renderizarVitrinePlanos();
      const labelCiclo = ciclo === "mensal" ? "Mensal (R$ 14,90/mês)" : "Anual (R$ 9,90/mês)";
      alert(`🎉 Parabéns! O plano VYTA Pro ${labelCiclo} foi ativado neste dispositivo.`);
    }
  
    function voltarPlanoGratuito() {
      localStorage.setItem(CHAVE_PLANO, JSON.stringify({ tipo: "free" }));
      atualizarBadgePlano();
      renderizarVitrinePlanos();
      alert("Modo de visualização alterado para Plano Gratuito.");
    }
  
    function atualizarBadgePlano() {
      const pro = isVytaPro();
      const badge = document.getElementById("badgePlanoAtual");
      if (badge) {
        badge.textContent = pro ? "★ VYTA PRO ATIVO" : "PLANO GRATUITO";
        badge.style.background = pro ? "#fff1d8" : "#efedff";
        badge.style.color = pro ? "#8b5b08" : "#5148a8";
      }
    }
  
    function abrirModalUpgrade(motivo = "") {
      let modal = document.getElementById("modalUpgradeVyta");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "modalUpgradeVyta";
        modal.style.cssText = "position:fixed;inset:0;background:rgba(37,36,69,0.72);display:flex;align-items:center;justify-content:center;padding:16px;z-index:2000;overflow-y:auto;";
        document.body.appendChild(modal);
      }
  
      modal.innerHTML = `
        <div style="background:#fff;max-width:480px;width:100%;border-radius:20px;padding:24px;box-shadow:0 12px 32px rgba(0,0,0,0.25);text-align:left;color:#29283d;margin:auto;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="background:#fff1d8;color:#8b5b08;padding:5px 10px;border-radius:20px;font-size:11px;font-weight:800;">★ RECURSO EXCLUSIVO PRO</span>
            <button type="button" onclick="document.getElementById('modalUpgradeVyta').style.display='none'" style="width:auto;margin:0;padding:4px 10px;background:#f0eff8;color:#333;font-size:14px;">✕</button>
          </div>
  
          <h2 style="margin:14px 0 8px;color:#252445;">Evolua sem limites com o VYTA Pro</h2>
          ${motivo ? `<p style="background:#f8f7ff;padding:10px;border-left:3px solid #8B7CF6;border-radius:6px;font-size:13px;margin-bottom:12px;">${motivo}</p>` : ""}
  
          <ul style="font-size:13px;line-height:1.75;padding-left:20px;color:#29283d;margin:10px 0 16px;">
            <li><strong>12 Programas de Treino</strong> (Glúteos, Hipertrofia, Força e Performance)</li>
            <li><strong>Treinos Personalizados Ilimitados</strong> no Modo Treino</li>
            <li><strong>Avaliação Corporal (7 Dobras)</strong> com massa magra e gordura</li>
            <li><strong>Relatório Comparativo em PDF</strong> para acompanhar ou levar ao médico</li>
          </ul>
  
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0;">
            <div style="border:1.5px solid #e5e5ef;border-radius:12px;padding:12px;text-align:center;background:#fff;">
              <div style="font-size:11px;color:#68677A;font-weight:700;">PLANO MENSAL</div>
              <div style="font-size:22px;font-weight:800;color:#252445;margin:4px 0;">R$ 14,90</div>
              <div style="font-size:11px;color:#68677A;">por mês</div>
              <button type="button" class="btn-treino" style="margin-top:10px;padding:9px;font-size:12px;" onclick="window.vytaPlanos.ativarPro('mensal'); document.getElementById('modalUpgradeVyta').style.display='none';">
                Assinar Mensal
              </button>
            </div>
  
            <div style="border:2px solid #8B7CF6;border-radius:12px;padding:12px;text-align:center;background:#faf9ff;position:relative;">
              <span style="background:#26734b;color:#fff;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:10px;">ECONOMIZE 33%</span>
              <div style="font-size:11px;color:#5148a8;font-weight:700;margin-top:4px;">PLANO ANUAL</div>
              <div style="font-size:22px;font-weight:800;color:#252445;margin:4px 0;">R$ 9,90<span style="font-size:11px;font-weight:normal;">/mês</span></div>
              <div style="font-size:10.5px;color:#68677A;">R$ 118,80 cobrado/ano</div>
              <button type="button" class="btn-save" style="margin-top:10px;padding:9px;font-size:12px;" onclick="window.vytaPlanos.ativarPro('anual'); document.getElementById('modalUpgradeVyta').style.display='none';">
                Assinar Anual
              </button>
            </div>
          </div>
  
          <button type="button" class="btn-reset" style="margin-top:6px;font-size:12.5px;padding:9px;" onclick="document.getElementById('modalUpgradeVyta').style.display='none'">
            Continuar no Plano Gratuito
          </button>
        </div>
      `;
      modal.style.display = "flex";
    }
  
    function renderizarVitrinePlanos() {
      const container = document.getElementById("vitrinePlanosContainer");
      if (!container) return;
      const atual = obterPlanoAtual();
      const pro = atual.ativo;
  
      container.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;margin-top:16px;">
          <!-- GRATUITO -->
          <div style="border:1px solid #e5e5ef;border-radius:16px;padding:18px;background:#fff;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span style="background:#f0eff8;color:#57546e;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;">INICIAL</span>
              <h3 style="margin:10px 0 4px;">Gratuito</h3>
              <div style="font-size:24px;font-weight:800;color:#252445;margin-bottom:10px;">R$ 0 <span style="font-size:12px;font-weight:normal;">/ sempre</span></div>
              <ul style="font-size:12.5px;line-height:1.75;padding-left:18px;color:#555;">
                <li>Peso, IMC e Gráfico Cruzado</li>
                <li>Controle de Medidas Corporais</li>
                <li>Diário de Medicação e alertas</li>
                <li>3 programas de treino gratuitos</li>
              </ul>
            </div>
            <div style="margin-top:14px;">
              <div style="font-size:12px;font-weight:700;color:${!pro ? '#26734b' : '#888'};">
                ${!pro ? '✓ Seu plano atual' : 'Incluído no Pro'}
              </div>
              ${pro ? `<button type="button" class="btn-reset" style="margin-top:8px;font-size:11.5px;padding:8px;" onclick="window.vytaPlanos.voltarGratuito()">Testar como Gratuito</button>` : ''}
            </div>
          </div>
  
          <!-- PRO MENSAL -->
          <div style="border:1.5px solid #d5d2f2;border-radius:16px;padding:18px;background:#fff;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span style="background:#efedff;color:#5148a8;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;">FLEXÍVEL</span>
              <h3 style="margin:10px 0 4px;">VYTA Pro Mensal</h3>
              <div style="font-size:24px;font-weight:800;color:#252445;margin-bottom:10px;">R$ 14,90 <span style="font-size:12px;font-weight:normal;">/ mês</span></div>
              <ul style="font-size:12.5px;line-height:1.75;padding-left:18px;color:#29283d;">
                <li>Todos os <strong>12 Programas de Treino</strong></li>
                <li><strong>Treinos Personalizados</strong> ilimitados</li>
                <li><strong>Avaliação Corporal (7 Dobras)</strong></li>
                <li><strong>Relatório Comparativo em PDF</strong></li>
              </ul>
            </div>
            <div style="margin-top:14px;">
              ${pro && atual.ciclo === "mensal"
                ? `<div style="padding:9px;background:#e7f7ef;color:#26734b;border-radius:10px;font-size:12.5px;font-weight:700;text-align:center;">✓ Plano Mensal Ativo</div>`
                : `<button type="button" class="btn-treino" style="padding:11px;font-size:13px;" onclick="window.vytaPlanos.ativarPro('mensal')">Assinar Mensal</button>`
              }
            </div>
          </div>
  
          <!-- PRO ANUAL -->
          <div style="border:2px solid #8B7CF6;border-radius:16px;padding:18px;background:#faf9ff;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <span style="background:#26734b;color:#fff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:800;">★ ECONOMIZE 33%</span>
              <h3 style="margin:10px 0 4px;">VYTA Pro Anual</h3>
              <div style="font-size:24px;font-weight:800;color:#252445;">R$ 9,90 <span style="font-size:12px;font-weight:normal;">/ mês</span></div>
              <div style="font-size:11.5px;color:#68677A;margin-bottom:10px;">Cobrado R$ 118,80 uma vez ao ano</div>
              <ul style="font-size:12.5px;line-height:1.75;padding-left:18px;color:#29283d;">
                <li><strong>Todos os recursos do VYTA Pro</strong></li>
                <li>Preço promocional garantido por 1 ano</li>
                <li>Acesso prioritário a novidades</li>
              </ul>
            </div>
            <div style="margin-top:14px;">
              ${pro && atual.ciclo === "anual"
                ? `<div style="padding:9px;background:#e7f7ef;color:#26734b;border-radius:10px;font-size:12.5px;font-weight:700;text-align:center;">✓ Plano Anual Ativo</div>`
                : `<button type="button" class="btn-save" style="padding:11px;font-size:13px;" onclick="window.vytaPlanos.ativarPro('anual')">Assinar Anual (Melhor Valor)</button>`
              }
            </div>
          </div>
        </div>
      `;
    }
  
    document.addEventListener("click", ev => {
      if (isVytaPro()) return;
  
      const btn = ev.target.closest("button");
      if (!btn) return;
  
      const progId = btn.getAttribute("data-usar") || btn.getAttribute("data-iniciar-treino");
      if (progId) {
        const card = btn.closest(".vyta-card");
        const isCardPremium = card && card.querySelector(".vyta-tag.premium");
        const detHeader = document.getElementById("vytaDetalhes")?.innerHTML || "";
        const programasPremiumIds = [
          "iniciante-forca", "iniciante-corpo-ativo", "intermediario-gluteos",
          "intermediario-superior", "intermediario-divisao", "avancado-forca",
          "avancado-hipertrofia", "avancado-gluteos", "avancado-atletico"
        ];
  
        if (isCardPremium || programasPremiumIds.includes(progId) || detHeader.includes("Premium")) {
          ev.preventDefault();
          ev.stopPropagation();
          abrirModalUpgrade("Este programa de treino faz parte da biblioteca exclusiva para assinantes <strong>VYTA Pro</strong>.");
          return;
        }
      }
  
      if (btn.id === "salvarPersonalizado") {
        ev.preventDefault();
        ev.stopPropagation();
        abrirModalUpgrade("A criação de <strong>Treinos Personalizados</strong> é um recurso exclusivo para assinantes <strong>VYTA Pro</strong>.");
        return;
      }
  
      const onclickAttr = btn.getAttribute("onclick") || "";
      if (onclickAttr.includes("salvarAvaliacaoCorporal") || onclickAttr.includes("imprimirRelatorioCorporal")) {
        ev.preventDefault();
        ev.stopPropagation();
        abrirModalUpgrade("A <strong>Avaliação Corporal de 7 Dobras</strong> e a exportação de <strong>Relatórios em PDF</strong> são exclusivas do <strong>VYTA Pro</strong>.");
        return;
      }
    }, true);
  
    window.vytaPlanos = {
      isPro: isVytaPro,
      ativarPro: ativarPlanoPro,
      voltarGratuito: voltarPlanoGratuito,
      abrirUpgrade: abrirModalUpgrade,
      renderizar: renderizarVitrinePlanos
    };
  
    document.addEventListener("DOMContentLoaded", () => {
      atualizarBadgePlano();
      renderizarVitrinePlanos();
    });
  })();