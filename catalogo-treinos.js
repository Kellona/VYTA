/* VYTA | Biblioteca de Treinos & Treinos Personalizados v4 */
(() => {
  "use strict";
  const CHAVE = "fitness_catalogo_treinos_v1";
  const E = (nome, series, reps, descanso, orientacao) => ({ nome, series, reps, descanso, orientacao });
  const W = (letra, nome, exercicios) => ({ letra, nome, exercicios });
  const P = (id, nome, nivel, foco, acesso, frequencia, divisao, duracao, objetivo, orientacao, treinos) => ({
    id, nome, nivel, foco, acesso, frequencia, divisao, duracao, objetivo, orientacao, treinos
  });
  
  const PROGRAMAS = [
    P("full-body-3", "Primeiros Passos", "iniciante", "geral", "free", "3 dias/semana", "Corpo inteiro A/B/C", "6 semanas",
      "Aprender movimentos fundamentais e desenvolver força geral com volume inicial moderado.",
      "Alterne os dias com ao menos um dia de recuperação. Priorize técnica e esforço confortável.", [
        W("A", "Base de força", [
          E("Leg press", 2, "10–12", "90 s", "Pés firmes; joelhos acompanham a direção dos pés."),
          E("Supino na máquina", 2, "10–12", "60–90 s", "Costas apoiadas e retorno controlado."),
          E("Puxada frontal", 2, "10–12", "60–90 s", "Puxe em direção ao peito sem balançar."),
          E("Ponte de glúteos", 2, "12–15", "60 s", "Eleve o quadril sem arquear a lombar.")
        ]),
        W("B", "Estabilidade", [
          E("Agachamento até o banco", 2, "10–12", "90 s", "Sente e levante com controle; use apoio se preciso."),
          E("Remada sentada", 2, "10–12", "60–90 s", "Aproxime escápulas sem elevar ombros."),
          E("Flexão na parede", 2, "8–12", "60 s", "Corpo alinhado e movimento confortável."),
          E("Dead bug", 2, "8 por lado", "45 s", "Mantenha a lombar estável.")
        ]),
        W("C", "Corpo inteiro", [
          E("Mesa flexora", 2, "10–12", "60–90 s", "Movimento suave, sem impulso."),
          E("Desenvolvimento máquina", 2, "10–12", "60–90 s", "Amplitude confortável para os ombros."),
          E("Remada baixa", 2, "10–12", "60–90 s", "Tronco estável e cotovelos próximos."),
          E("Panturrilha sentada", 2, "12–15", "45 s", "Suba e desça controlando.")
        ])
      ]),
    P("iniciante-forca", "Construindo Força", "iniciante", "geral", "premium", "3 dias/semana", "Corpo inteiro A/B/C", "6 semanas",
      "Desenvolver força básica e confiança nos principais padrões de movimento, com progressão gradual.",
      "Alterne A, B e C em dias não consecutivos. Mantenha 2–3 repetições em reserva.", [
        W("A", "Inferiores e empurrar", [
          E("Agachamento até o banco", 3, "10–12", "90 s", "Desça até um banco estável; mantenha os pés apoiados."),
          E("Supino na máquina", 3, "10–12", "75 s", "Costas apoiadas e punhos alinhados."),
          E("Puxada frontal", 3, "10–12", "75 s", "Puxe em direção ao peito sem balançar."),
          E("Ponte de glúteos", 3, "12–15", "60 s", "Eleve o quadril sem hiperestender a lombar.")
        ]),
        W("B", "Costas e quadril", [
          E("Leg press", 3, "10–12", "90 s", "Amplitude confortável e quadril apoiado."),
          E("Remada sentada", 3, "10–12", "75 s", "Puxe com controle sem elevar os ombros."),
          E("Mesa flexora", 2, "12–15", "60 s", "Movimento sem impulso."),
          E("Dead bug", 2, "8 por lado", "45 s", "Tronco estável.")
        ]),
        W("C", "Corpo inteiro", [
          E("Terra romeno com halteres", 2, "10–12", "90 s", "Quadril para trás e coluna neutra."),
          E("Desenvolvimento máquina", 2, "10–12", "75 s", "Amplitude confortável para os ombros."),
          E("Puxada neutra", 2, "10–12", "75 s", "Controle a volta."),
          E("Panturrilha sentada", 2, "12–15", "45 s", "Suba e desça lentamente.")
        ])
      ]),
    P("iniciante-pernas", "Pernas em Movimento", "iniciante", "pernas", "free", "2 dias/semana", "Inferiores A/B", "6 semanas",
      "Desenvolver força inicial de membros inferiores com exercícios estáveis.",
      "Deixe 48 horas entre sessões. Ajuste amplitude e carga ao conforto articular.", [
        W("A", "Quadríceps e glúteos", [
          E("Leg press", 2, "10–12", "90 s", "Mantenha lombar apoiada e não trave joelhos."),
          E("Cadeira extensora", 2, "10–12", "60 s", "Carga leve e amplitude confortável."),
          E("Ponte de glúteos", 2, "12–15", "60 s", "Pause brevemente no topo."),
          E("Abdução de quadril", 2, "12–15", "45 s", "Controle o retorno sem impulso.")
        ]),
        W("B", "Posteriores e estabilidade", [
          E("Mesa flexora", 2, "10–12", "60–90 s", "Evite tirar o quadril do apoio."),
          E("Terra romeno com halteres", 2, "10", "90 s", "Quadril para trás e coluna neutra."),
          E("Panturrilha sentada", 2, "12–15", "45 s", "Amplitude confortável."),
          E("Bird dog", 2, "8/lado", "45 s", "Estenda membros opostos sem girar tronco.")
        ])
      ]),
    P("iniciante-corpo-ativo", "Corpo Ativo", "iniciante", "geral", "premium", "3 dias/semana", "A/B alternado", "8 semanas",
      "Construir consistência com sessões de corpo inteiro e exercícios adaptáveis.",
      "Alterne A e B com foco em boa técnica.", [
        W("A", "Força global", [
          E("Agachamento no banco", 3, "10–12", "90 s", "Ajuste altura do banco à mobilidade."),
          E("Supino com halteres", 2, "10–12", "60–90 s", "Punhos alinhados aos cotovelos."),
          E("Puxada frontal", 3, "10–12", "60–90 s", "Evite inclinar excessivamente o tronco."),
          E("Elevação pélvica", 3, "12", "60 s", "Contraia glúteos sem arquear lombar.")
        ]),
        W("B", "Força e estabilidade", [
          E("Step-up baixo com apoio", 2, "8/lado", "90 s", "Use degrau baixo e apoio firme."),
          E("Remada baixa", 3, "10–12", "60–90 s", "Puxe sem encolher ombros."),
          E("Desenvolvimento máquina", 2, "10–12", "60 s", "Não force amplitude."),
          E("Prancha inclinada", 2, "20–30 s", "45 s", "Mãos em superfície firme e corpo alinhado.")
        ])
      ]),
    P("superior-inferior", "Divisão Inteligente", "intermediario", "geral", "free", "4 dias/semana", "Superior/Inferior A/B", "8 semanas",
      "Organizar o volume por segmentos com recuperação entre estímulos semelhantes.",
      "Sugestão: seg/ter/qui/sex. Ajuste a ordem à sua agenda.", [
        W("A", "Inferiores — anterior", [
          E("Agachamento goblet", 3, "8–12", "90 s", "Tronco firme e amplitude controlada."),
          E("Leg press", 3, "10–12", "90 s", "Não tire quadril do encosto."),
          E("Cadeira extensora", 2, "12–15", "60 s", "Não use impulso."),
          E("Panturrilha em pé", 3, "12–15", "60 s", "Pause no alto e desça controlando.")
        ]),
        W("B", "Superiores — empurrar/puxar", [
          E("Supino com halteres", 3, "8–12", "90 s", "Escápulas apoiadas e descida controlada."),
          E("Remada sentada", 3, "10–12", "75 s", "Evite compensar com lombar."),
          E("Puxada frontal", 3, "10–12", "75 s", "Puxe até altura do peito."),
          E("Elevação lateral", 2, "12–15", "60 s", "Cotovelos semiflexionados.")
        ]),
        W("C", "Inferiores — posterior", [
          E("Terra romeno", 3, "8–10", "90 s", "Quadril para trás e coluna neutra."),
          E("Mesa flexora", 3, "10–12", "75 s", "Controle a volta."),
          E("Elevação pélvica", 3, "10–12", "90 s", "Evite hiperextensão lombar."),
          E("Abdução de quadril", 2, "15", "45 s", "Tronco estável.")
        ]),
        W("D", "Superiores — ombros/braços", [
          E("Desenvolvimento halteres", 3, "8–12", "75 s", "Amplitude confortável."),
          E("Remada unilateral", 3, "10/lado", "75 s", "Apoie uma mão e estabilize tronco."),
          E("Rosca direta", 2, "10–12", "60 s", "Cotovelos próximos ao corpo."),
          E("Tríceps polia", 2, "10–12", "60 s", "Ombros estáveis.")
        ])
      ]),
    P("intermediario-gluteos", "Glúteos em Evolução", "intermediario", "gluteos", "premium", "4 dias/semana", "Inferiores A/B + superiores A/B", "8 semanas",
      "Dar ênfase ao desenvolvimento de glúteos sem deixar de trabalhar o corpo todo.",
      "Separe treinos de inferiores por ao menos 48 horas.", [
        W("A", "Glúteos e posteriores", [
          E("Elevação pélvica", 3, "8–12", "90 s", "Pausa no topo com pelve estável."),
          E("Terra romeno halteres", 3, "8–10", "90 s", "Desça mantendo coluna neutra."),
          E("Mesa flexora", 3, "10–12", "75 s", "Controle a fase de retorno."),
          E("Abdução de quadril", 2, "15–20", "45 s", "Evite embalar o tronco.")
        ]),
        W("B", "Costas, peito e braços", [
          E("Puxada frontal", 3, "8–12", "75 s", "Não incline tronco para trás."),
          E("Supino máquina", 3, "8–12", "75 s", "Mantenha ombros confortáveis."),
          E("Remada baixa", 3, "10–12", "75 s", "Aproxime escápulas."),
          E("Rosca alternada", 2, "10–12", "60 s", "Evite balanço do tronco.")
        ]),
        W("C", "Quadríceps e glúteos", [
          E("Leg press", 3, "10–12", "90 s", "Amplitude sem desconforto."),
          E("Agachamento goblet", 3, "10", "90 s", "Joelhos acompanham os pés."),
          E("Passada estacionária com apoio", 2, "8/lado", "75 s", "Use apoio e amplitude confortável."),
          E("Extensão de quadril na polia", 2, "12/lado", "60 s", "Não compense com lombar.")
        ]),
        W("D", "Ombros, costas e core", [
          E("Remada articulada", 3, "10–12", "75 s", "Peito apoiado quando possível."),
          E("Elevação lateral", 3, "12–15", "60 s", "Suba até amplitude confortável."),
          E("Face pull", 2, "12–15", "60 s", "Conduza com cotovelos."),
          E("Pallof press", 2, "10/lado", "45 s", "Resista à rotação do tronco.")
        ])
      ]),
    P("intermediario-superior", "Superior em Foco", "intermediario", "superiores", "premium", "3 dias/semana", "A/B/C — superiores", "8 semanas",
      "Desenvolver força e hipertrofia de peito, costas, ombros e braços com equilíbrio.",
      "Distribua as sessões com ao menos um dia de intervalo.", [
        W("A", "Peito, ombros e tríceps", [
          E("Supino halteres", 3, "8–12", "90 s", "Desça com controle."),
          E("Supino inclinado máquina", 3, "10–12", "75 s", "Evite elevar os ombros."),
          E("Elevação lateral", 3, "12–15", "60 s", "Não balance o corpo."),
          E("Tríceps polia", 3, "10–12", "60 s", "Cotovelos estáveis.")
        ]),
        W("B", "Costas e bíceps", [
          E("Puxada frontal", 3, "8–12", "90 s", "Puxe em direção ao peito."),
          E("Remada baixa", 3, "10–12", "75 s", "Mantenha coluna neutra."),
          E("Remada unilateral", 2, "10/lado", "75 s", "Evite girar o tronco."),
          E("Rosca direta", 3, "10–12", "60 s", "Controle a descida.")
        ]),
        W("C", "Superiores completos", [
          E("Desenvolvimento máquina", 2, "10–12", "75 s", "Amplitude sem desconforto."),
          E("Crucifixo máquina", 2, "12–15", "60 s", "Não force alongamento."),
          E("Pulldown braços estendidos", 2, "12", "60 s", "Cotovelos levemente flexionados."),
          E("Rosca martelo", 2, "10–12", "60 s", "Punhos neutros.")
        ])
      ]),
    P("intermediario-divisao", "Hipertrofia Total", "intermediario", "geral", "premium", "4 dias/semana", "Divisão por grupos musculares", "8 semanas",
      "Combinar estímulos de superiores e inferiores com volume moderado.",
      "Mantenha 1–3 repetições em reserva na maior parte das séries.", [
        W("A", "Quadríceps e panturrilhas", [
          E("Agachamento smith", 3, "8–10", "120 s", "Ajuste pés e amplitude ao conforto."),
          E("Leg press", 3, "10–12", "90 s", "Não trave joelhos."),
          E("Cadeira extensora", 2, "12–15", "60 s", "Movimento controlado."),
          E("Panturrilha leg press", 3, "12–15", "60 s", "Amplitude confortável.")
        ]),
        W("B", "Peito, costas e braços", [
          E("Supino reto", 3, "8–10", "90 s", "Escápulas estáveis."),
          E("Puxada frontal", 3, "8–12", "90 s", "Evite compensar com tronco."),
          E("Remada baixa", 2, "10–12", "75 s", "Controle a volta."),
          E("Tríceps corda", 2, "10–12", "60 s", "Cotovelos junto ao corpo.")
        ]),
        W("C", "Posteriores e glúteos", [
          E("Terra romeno", 3, "8–10", "120 s", "Quadril para trás e coluna neutra."),
          E("Mesa flexora", 3, "10–12", "75 s", "Evite impulso."),
          E("Elevação pélvica", 3, "10–12", "90 s", "Controle a pelve no topo."),
          E("Abdução máquina", 2, "15", "60 s", "Sem balanço.")
        ]),
        W("D", "Ombros e costas", [
          E("Desenvolvimento halteres", 3, "8–12", "90 s", "Não force amplitude dolorosa."),
          E("Remada apoiada", 3, "10–12", "75 s", "Mantenha peito apoiado."),
          E("Elevação lateral", 2, "12–15", "60 s", "Carga moderada."),
          E("Face pull", 2, "12–15", "60 s", "Controle o movimento.")
        ])
      ]),
    P("avancado-forca", "Força Máxima", "avancado", "geral", "premium", "4 dias/semana", "Superior/Inferior — força", "6–8 semanas",
      "Priorizar força nos padrões básicos, mantendo acessórios para equilíbrio muscular.",
      "Requer experiência e domínio técnico.", [
        W("A", "Inferiores — força", [
          E("Agachamento livre", 4, "4–6", "2–3 min", "Amplitude e carga tecnicamente consistentes."),
          E("Terra romeno", 3, "6–8", "2 min", "Barra próxima ao corpo."),
          E("Cadeira extensora", 2, "10–12", "75 s", "Acessório controlado."),
          E("Panturrilha em pé", 3, "8–12", "60 s", "Pause no alto.")
        ]),
        W("B", "Superiores — força", [
          E("Supino reto", 4, "4–6", "2–3 min", "Use suportes ou observador."),
          E("Remada curvada", 4, "6–8", "2 min", "Tronco firme e coluna neutra."),
          E("Desenvolvimento", 3, "6–8", "2 min", "Evite compensar com lombar."),
          E("Puxada frontal", 2, "8–10", "90 s", "Controle a fase de retorno.")
        ]),
        W("C", "Inferiores — volume", [
          E("Leg press", 3, "8–10", "2 min", "Preserve estabilidade."),
          E("Agachamento búlgaro", 3, "8/lado", "90 s", "Use apoio se necessário."),
          E("Mesa flexora", 3, "10–12", "75 s", "Movimento sem impulso."),
          E("Elevação pélvica", 3, "8–10", "90 s", "Pausa breve no topo.")
        ]),
        W("D", "Superiores — volume", [
          E("Supino inclinado", 3, "8–10", "90 s", "Controle a descida."),
          E("Puxada neutra", 3, "8–10", "90 s", "Evite elevar ombros."),
          E("Elevação lateral", 3, "12–15", "60 s", "Não use balanço."),
          E("Rosca e tríceps polia", 2, "10–12 cada", "60 s", "Técnica estável.")
        ])
      ]),
    P("avancado-hipertrofia", "Hipertrofia Avançada", "avancado", "geral", "premium", "5 dias/semana", "A/B/C/D/E", "6–8 semanas",
      "Distribuir volume semanal mais alto para praticantes experientes.",
      "Reduza séries se a recuperação piorar.", [
        W("A", "Peito e tríceps", [
          E("Supino reto", 4, "6–10", "2 min", "Estabilidade escapular."),
          E("Supino inclinado halteres", 3, "8–10", "90 s", "Amplitude confortável."),
          E("Crucifixo máquina", 2, "12–15", "60 s", "Evite alongamento forçado."),
          E("Tríceps corda", 3, "10–12", "60 s", "Cotovelos estáveis.")
        ]),
        W("B", "Costas e bíceps", [
          E("Puxada frontal", 4, "8–10", "90 s", "Sem impulso do tronco."),
          E("Remada apoiada", 3, "8–10", "90 s", "Peito apoiado."),
          E("Pulldown", 2, "12–15", "60 s", "Abdômen firme."),
          E("Rosca alternada", 3, "10–12", "60 s", "Evite balançar.")
        ]),
        W("C", "Pernas — quadríceps", [
          E("Agachamento", 3, "6–8", "2–3 min", "Carga compatível com técnica."),
          E("Leg press", 3, "10–12", "2 min", "Não trave joelhos."),
          E("Cadeira extensora", 2, "12–15", "60 s", "Controle a descida."),
          E("Panturrilha", 3, "10–15", "60 s", "Amplitude controlada.")
        ]),
        W("D", "Ombros e braços", [
          E("Desenvolvimento máquina", 3, "8–10", "90 s", "Sem desconforto articular."),
          E("Elevação lateral", 3, "12–15", "60 s", "Não eleve os ombros."),
          E("Rosca martelo", 3, "10–12", "60 s", "Punhos neutros."),
          E("Tríceps testa halteres", 2, "10–12", "60 s", "Amplitude confortável.")
        ]),
        W("E", "Posteriores e glúteos", [
          E("Terra romeno", 3, "8–10", "2 min", "Quadril para trás."),
          E("Mesa flexora", 3, "10–12", "75 s", "Evite impulso."),
          E("Elevação pélvica", 3, "8–12", "90 s", "Não hiperestenda lombar."),
          E("Abdução de quadril", 2, "15–20", "60 s", "Controle a volta.")
        ])
      ]),
    P("avancado-gluteos", "Performance Feminina", "avancado", "gluteos", "premium", "4 dias/semana", "Inferiores A/B + superiores A/B", "8 semanas",
      "Ênfase avançada em força e hipertrofia de glúteos com estímulos complementares.",
      "Separe inferiores por 48–72 horas.", [
        W("A", "Glúteos — força", [
          E("Elevação pélvica barra", 4, "6–8", "2 min", "Pausa no topo sem arquear lombar."),
          E("Agachamento", 3, "6–8", "2–3 min", "Amplitude controlada."),
          E("Terra romeno", 3, "8–10", "2 min", "Barra próxima às pernas."),
          E("Abdução máquina", 2, "15–20", "60 s", "Sem embalo.")
        ]),
        W("B", "Superiores — completo", [
          E("Puxada neutra", 3, "8–10", "90 s", "Controle escápulas."),
          E("Supino halteres", 3, "8–10", "90 s", "Punhos alinhados."),
          E("Remada baixa", 3, "10–12", "75 s", "Tronco estável."),
          E("Elevação lateral", 2, "12–15", "60 s", "Movimento suave.")
        ]),
        W("C", "Glúteos — volume", [
          E("Leg press", 3, "10–12", "2 min", "Não force posição ou amplitude."),
          E("Passada reversa", 3, "8/lado", "90 s", "Use apoio se necessário."),
          E("Extensão de quadril polia", 3, "12/lado", "60 s", "Não compense com lombar."),
          E("Mesa flexora", 2, "10–12", "75 s", "Controle o retorno.")
        ]),
        W("D", "Superiores e core", [
          E("Remada apoiada", 3, "8–12", "90 s", "Peito apoiado."),
          E("Desenvolvimento máquina", 2, "10–12", "75 s", "Amplitude confortável."),
          E("Rosca direta", 2, "10–12", "60 s", "Cotovelos estáveis."),
          E("Pallof press", 3, "10/lado", "45 s", "Resista à rotação.")
        ])
      ]),
    P("avancado-atletico", "Performance Completa", "avancado", "geral", "premium", "4 dias/semana", "Força + condicionamento", "6 semanas",
      "Combinar força, estabilidade e condicionamento em praticantes experientes.",
      "Ajuste a intensidade do condicionamento.", [
        W("A", "Força de inferiores", [
          E("Agachamento", 4, "5–6", "2–3 min", "Técnica consistente."),
          E("Terra romeno", 3, "8", "2 min", "Coluna neutra."),
          E("Step-up baixo", 2, "8/lado", "90 s", "Use apoio e controle a descida."),
          E("Prancha", 3, "25–40 s", "60 s", "Alinhamento corporal.")
        ]),
        W("B", "Força de superiores", [
          E("Supino", 4, "5–6", "2–3 min", "Use observador quando necessário."),
          E("Remada curvada", 4, "6–8", "2 min", "Evite arredondar lombar."),
          E("Desenvolvimento", 3, "8", "90 s", "Não force amplitude."),
          E("Pallof press", 3, "10/lado", "45 s", "Resista à rotação.")
        ]),
        W("C", "Condicionamento controlado", [
          E("Bicicleta ergométrica", 1, "12–18 min", "—", "Alterne 1 min moderado e 1 min leve."),
          E("Caminhada com halteres leves", 3, "30 m", "60 s", "Postura alta."),
          E("Bird dog", 2, "10/lado", "45 s", "Evite girar quadril."),
          E("Mobilidade torácica", 2, "8/lado", "30 s", "Movimento suave.")
        ]),
        W("D", "Estabilidade e resistência", [
          E("Agachamento goblet", 3, "8–10", "90 s", "Movimento firme."),
          E("Flexão inclinada", 3, "8–12", "75 s", "Ajuste altura."),
          E("Remada unilateral", 3, "10/lado", "75 s", "Tronco estável."),
          E("Prancha lateral", 2, "20–30 s/lado", "45 s", "Apoie joelhos se necessário.")
        ])
      ])
  ];
  
  function lerEstado() {
    try {
      const e = JSON.parse(localStorage.getItem(CHAVE) || "{}");
      return {
        personalizados: Array.isArray(e.personalizados) ? e.personalizados : [],
        ativoId: typeof e.ativoId === "string" ? e.ativoId : "",
        concluidos: Array.isArray(e.concluidos) ? e.concluidos : [],
        diasSemana: e.diasSemana && typeof e.diasSemana === "object" ? e.diasSemana : {}
      };
    } catch (err) {
      console.error("Erro ao ler catálogo:", err);
      return { personalizados: [], ativoId: "", concluidos: [], diasSemana: {} };
    }
  }
  
  function salvarEstado(e) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(e));
      return true;
    } catch (err) {
      console.error("Erro ao salvar catálogo:", err);
      alert("Não foi possível salvar. Verifique o espaço disponível.");
      return false;
    }
  }
  
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
  
  function todos(e) {
    return PROGRAMAS.concat(e.personalizados);
  }
  
  function nivel(v) {
    return ({ iniciante: "Iniciante", intermediario: "Intermediário", avancado: "Avançado" })[v] || v || "Personalizado";
  }
  
  function iniciar() {
    const aba = document.getElementById("abaTreinos");
    if (!aba || document.getElementById("catalogoTreinos")) return;
  
    if (!document.getElementById("vytaCatalogoStyles")) {
      const s = document.createElement("style");
      s.id = "vytaCatalogoStyles";
      s.textContent = `
        .catalogo-treinos{margin:0 0 24px;padding:22px;border:1px solid #e5e5ef;border-radius:18px;background:#fff;color:#29283d}
        .catalogo-treinos *{box-sizing:border-box}
        .vyta-subabas{display:flex;gap:8px;margin-bottom:18px;border-bottom:2px solid #efedf8;padding-bottom:12px;flex-wrap:wrap}
        .vyta-subaba-btn{width:auto;margin:0;padding:10px 16px;border-radius:10px;background:#f3f2fa;color:#5148a8;font-size:13px;font-weight:700;cursor:pointer;border:1px solid transparent}
        .vyta-subaba-btn.ativa{background:#5148a8;color:#fff}
        .vyta-topo{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .vyta-topo h2{margin:0 0 6px;color:#252445}
        .vyta-topo p,.vyta-card p,.vyta-detalhe p{color:#68677a;font-size:13px;line-height:1.5}
        .vyta-etiqueta{color:#7668dc;font-size:11px;font-weight:800;letter-spacing:1px}
        .vyta-contagem,.vyta-tag{display:inline-block;padding:5px 9px;border-radius:20px;background:#f0eff8;color:#57546e;font-size:11px;font-weight:700}
        .vyta-tag.free{background:#e7f7ef;color:#26734b}
        .vyta-tag.premium{background:#fff1d8;color:#8b5b08}
        .vyta-filtros{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin:18px 0}
        .vyta-filtros label,.vyta-form label{display:block;margin-bottom:5px;font-size:12px;font-weight:700}
        .vyta-filtros select,.vyta-filtros input,.vyta-form input,.vyta-form textarea{width:100%;padding:10px;border:1px solid #deddeb;border-radius:9px;background:white}
        .vyta-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;margin:14px 0}
        .vyta-card{padding:14px;border:1px solid #e7e6f1;border-radius:13px}
        .vyta-card.ativo{border:2px solid #8b7cf6;background:#faf9ff}
        .vyta-card h3{font-size:15px;color:#252445;margin:8px 0 6px}
        .vyta-btn{width:auto;margin-top:8px;padding:9px 13px;border:0;border-radius:9px;background:#5148a8;color:white;font-size:13px;font-weight:700;cursor:pointer;display:inline-block}
        .vyta-btn.sec{background:#efedff;color:#5148a8}
        .vyta-btn.danger{background:#fff0f0;color:#a33b3b}
        .vyta-detalhe{margin-top:15px;padding:16px;border-radius:13px;background:#f8f8fc;border:1px solid #eceaf6}
        .vyta-detalhe h3{color:#252445;margin-top:0}
        .vyta-dia{margin:10px 0;border:1px solid #e6e5ef;border-radius:10px;background:#fff}
        .vyta-dia summary{padding:12px;color:#5148a8;font-weight:800;cursor:pointer}
        .vyta-dia-conteudo{padding:0 12px 12px}
        .vyta-busca{grid-column:1/-1}
        .vyta-meta{display:flex;flex-wrap:wrap;gap:10px;font-size:12px;color:#55536b}
        .vyta-ex{padding:10px 0;border-bottom:1px solid #e6e5ef}
        .vyta-ex strong{font-size:13px}
        .vyta-ex p{margin:4px 0;font-size:12px}
        .vyta-aviso{margin:14px 0;padding:12px;border-left:3px solid #8b7cf6;background:#f1efff;font-size:12px;line-height:1.55}
        .vyta-campo{margin:10px 0}
        .vyta-form textarea{min-height:110px}
        .vyta-pilulas-dias{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0 14px}
        .vyta-pilula{width:auto;margin:0;padding:7px 12px;border-radius:20px;border:1px solid #d8d6ea;background:#fff;color:#555;font-size:12px;font-weight:700;cursor:pointer;user-select:none;transition:all .15s}
        .vyta-pilula.ativa{background:#5148a8;color:#fff;border-color:#5148a8}
        .vyta-grade-semana{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px;margin-top:10px}
        .vyta-card-dia{padding:10px 8px;border:1px solid #e5e3f0;border-radius:12px;background:#fff;text-align:center;display:flex;flex-direction:column;justify-content:space-between;gap:6px}
        .vyta-card-dia.hoje{border:2px solid #8b7cf6;background:#faf9ff}
        .vyta-card-dia.feito{background:#f2fbf6;border-color:#b7e4c7}
        .vyta-card-dia.descanso{background:#f9f9fc;opacity:.75}
        .vyta-card-dia strong{font-size:12px;color:#252445;display:block}
        .vyta-card-dia small{font-size:11px;color:#68677a;display:block;line-height:1.3}
        .vyta-card-dia button{width:100%;margin:4px 0 0;padding:6px 4px;font-size:11px;border-radius:7px}
        @media(max-width:760px){.vyta-grade-semana{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:600px){.catalogo-treinos{padding:14px}}
      `;
      document.head.appendChild(s);
    }
  
    const box = document.createElement("section");
    box.id = "catalogoTreinos";
    box.className = "catalogo-treinos";
    box.innerHTML = `
      <div class="vyta-subabas">
        <button type="button" class="vyta-subaba-btn ativa" data-subaba="biblioteca">📚 Biblioteca de Programas</button>
        <button type="button" class="vyta-subaba-btn" data-subaba="personalizados">✍️ Meus Treinos Personalizados</button>
      </div>
  
      <!-- SUB-ABA 1: BIBLIOTECA E ROTINA -->
      <div id="painelBiblioteca">
        <div class="vyta-topo">
          <div>
            <p class="vyta-etiqueta">SUA EVOLUÇÃO EM MOVIMENTO</p>
            <h2>Biblioteca de treinos</h2>
            <p>Explore os programas prontos, conheça as fichas e organize sua semana.</p>
          </div>
          <span class="vyta-contagem">12 programas</span>
        </div>
  
        <div class="vyta-filtros">
          <div class="vyta-busca">
            <label for="vytaBusca">Buscar programa</label>
            <input id="vytaBusca" type="search" placeholder="Digite o nome ou objetivo do treino">
          </div>
          <div>
            <label for="vytaNivel">Nível</label>
            <select id="vytaNivel">
              <option value="">Todos</option>
              <option value="iniciante">Iniciante</option>
              <option value="intermediario">Intermediário</option>
              <option value="avancado">Avançado</option>
            </select>
          </div>
          <div>
            <label for="vytaFoco">Foco</label>
            <select id="vytaFoco">
              <option value="">Todos</option>
              <option value="geral">Corpo inteiro</option>
              <option value="pernas">Pernas</option>
              <option value="gluteos">Glúteos</option>
              <option value="superiores">Superiores</option>
            </select>
          </div>
          <div>
            <label for="vytaAcesso">Acesso</label>
            <select id="vytaAcesso">
              <option value="">Todos</option>
              <option value="free">Gratuitos</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>
  
        <div id="vytaCards" class="vyta-cards"></div>
  
        <div class="vyta-detalhe">
          <h3>⭐ Meu treino ativo</h3>
          <div id="treinoAtivo"></div>
        </div>
  
        <div class="vyta-detalhe" id="vytaRotina">
          <h3>🗓️ Minha rotina semanal</h3>
          <div id="vytaRotinaConteudo"></div>
        </div>
  
        <div id="vytaDetalhes" class="vyta-detalhe">Selecione um programa para visualizar as fichas.</div>
      </div>
  
      <!-- SUB-ABA 2: TREINOS PERSONALIZADOS SEPARADOS -->
      <div id="painelPersonalizados" style="display:none;">
        <div class="vyta-topo">
          <div>
            <p class="vyta-etiqueta">TREINOS SOB MEDIDA</p>
            <h2>Meus Treinos Personalizados</h2>
            <p>Crie suas próprias fichas de treino e inicie no Modo Treino.</p>
          </div>
        </div>
  
        <div class="vyta-form" style="margin-top:16px;">
          <div class="vyta-campo">
            <label for="nomePersonalizado">Nome do treino</label>
            <input id="nomePersonalizado" maxlength="80" placeholder="Ex.: Treino A — Glúteos e Posteriores">
          </div>
          <div class="vyta-campo">
            <label for="objetivoPersonalizado">Objetivo ou observação</label>
            <input id="objetivoPersonalizado" maxlength="120" placeholder="Ex.: Hipertrofia · Descanso 60s">
          </div>
          <div class="vyta-campo">
            <label for="exerciciosPersonalizados">Exercícios (um por linha — Ex: Leg press 3x12)</label>
            <textarea id="exerciciosPersonalizados" maxlength="5000" placeholder="Elevação pélvica — 4 × 10&#10;Leg press 45 — 3 × 12&#10;Cadeira flexora — 3 × 12&#10;Panturrilha em pé — 3 × 15"></textarea>
          </div>
          <button type="button" id="salvarPersonalizado" class="vyta-btn">💾 Salvar treino personalizado</button>
        </div>
  
        <div class="vyta-detalhe" style="margin-top:20px;">
          <h3>📋 Minha lista de treinos personalizados</h3>
          <div id="meusProgramas"></div>
        </div>
      </div>
  
      <div class="vyta-aviso">
        <strong>Importante:</strong> Os modelos não substituem avaliação ou prescrição individual. Adapte cargas e amplitudes, respeite limitações e interrompa se sentir dor.
      </div>
    `;
  
    aba.prepend(box);
  
    const cards = box.querySelector("#vytaCards");
    const det = box.querySelector("#vytaDetalhes");
    let selecionado = PROGRAMAS[0].id;
  
    box.querySelectorAll(".vyta-subaba-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        box.querySelectorAll(".vyta-subaba-btn").forEach(b => b.classList.remove("ativa"));
        btn.classList.add("ativa");
        const alvo = btn.dataset.subaba;
        box.querySelector("#painelBiblioteca").style.display = alvo === "biblioteca" ? "block" : "none";
        box.querySelector("#painelPersonalizados").style.display = alvo === "personalizados" ? "block" : "none";
      });
    });
  
    function abrirFichaPorId(id) {
      const estado = lerEstado();
      const p = PROGRAMAS.find(x => x.id === id) || estado.personalizados.find(x => x.id === id);
      if (!p) return;
  
      box.querySelector('[data-subaba="biblioteca"]').click();
  
      selecionado = p.id;
      detalhe(p);
      det.hidden = false;
      det.style.display = "block";
      requestAnimationFrame(() => det.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  
    function detalhe(p) {
      if (!p) {
        det.textContent = "Nenhum programa encontrado.";
        return;
      }
      selecionado = p.id;
  
      const treinosLista = (p.treinos && p.treinos.length)
        ? p.treinos
        : [{
            letra: "A",
            nome: p.nome,
            exercicios: (p.exercicios || []).map(txt => ({
              nome: txt,
              series: 3,
              reps: "conforme ficha",
              descanso: "60 s",
              orientacao: p.objetivo || "Execute com boa técnica."
            }))
          }];
  
      let h = `<h3>${esc(p.nome)}</h3><p>${esc(p.objetivo || "")}</p>`;
      if (p.frequencia) {
        h += `<div class='vyta-meta'><span>📅 ${esc(p.frequencia)}</span><span>🔁 ${esc(p.divisao)}</span><span>⏳ ${esc(p.duracao)}</span></div>`;
      }
      if (p.orientacao) h += `<p>${esc(p.orientacao)}</p>`;
  
      treinosLista.forEach((t, i) => {
        h += `<details class='vyta-dia' ${i === 0 ? "open" : ""}>
          <summary>Treino ${esc(t.letra)} — ${esc(t.nome)} · ${t.exercicios.length} exercícios</summary>
          <div class='vyta-dia-conteudo'>`;
        t.exercicios.forEach(x => {
          h += `<div class='vyta-ex'>
            <strong>${esc(x.nome)}</strong>
            <p>${x.series} séries · ${esc(x.reps)} · Descanso: ${esc(x.descanso)}</p>
            <p>${esc(x.orientacao)}</p>
          </div>`;
        });
        h += `
          <button type="button" class="vyta-btn" data-iniciar-treino="${esc(p.id)}" data-sessao="${esc(t.letra)}">▶ Iniciar treino ${esc(t.letra)}</button>
          <button type="button" class="vyta-btn sec" data-concluir-programa="${esc(p.id)}" data-sessao="${esc(t.letra)}">✓ Concluir sessão ${esc(t.letra)} hoje</button>
        </div></details>`;
      });
  
      h += `<button type="button" class="vyta-btn" data-usar="${esc(p.id)}">⭐ Definir como meu programa ativo</button>`;
      det.innerHTML = h;
    }
  
    function render() {
      const estado = lerEstado();
      const n = box.querySelector("#vytaNivel").value;
      const f = box.querySelector("#vytaFoco").value;
      const a = box.querySelector("#vytaAcesso").value;
      const termo = (box.querySelector("#vytaBusca").value || "").trim().toLocaleLowerCase("pt-BR");
  
      const ps = PROGRAMAS.filter(p =>
        (!n || p.nivel === n) &&
        (!f || p.foco === f) &&
        (!a || p.acesso === a) &&
        (!termo || (p.nome + " " + p.objetivo).toLocaleLowerCase("pt-BR").includes(termo))
      );
  
      cards.innerHTML = ps.length ? ps.map(p => `
        <article class="vyta-card ${estado.ativoId === p.id ? "ativo" : ""}">
          <span class="vyta-tag">${nivel(p.nivel)}</span>
          <span class="vyta-tag ${p.acesso === "premium" ? "premium" : "free"}">${p.acesso === "premium" ? "Premium" : "Gratuito"}</span>
          <h3>${esc(p.nome)}</h3>
          <p>${esc(p.objetivo)}</p>
          <p>📅 ${esc(p.frequencia)} · ${esc(p.duracao)}</p>
          ${estado.ativoId === p.id ? '<span class="vyta-tag free">Em uso</span>' : ""}
          <br>
          <button type="button" class="vyta-btn" data-usar="${esc(p.id)}">Usar programa</button>
          <button type="button" class="vyta-btn sec" data-abrir-fichas="${esc(p.id)}">Ver fichas</button>
        </article>
      `).join("") : "<p>Nenhum programa corresponde aos filtros.</p>";
  
      detalhe(todos(estado).find(p => p.id === selecionado) || ps[0]);
      renderAtivo();
      renderRotina();
      renderMeus();
    }
  
    function renderAtivo() {
      const e = lerEstado();
      const p = todos(e).find(x => x.id === e.ativoId);
      const alvo = box.querySelector("#treinoAtivo");
      if (!p) {
        alvo.textContent = "Você ainda não selecionou um treino ativo.";
        return;
      }
      const feitos = e.concluidos.filter(x => x.programaId === p.id);
      alvo.innerHTML = `
        <strong>${esc(p.nome)}</strong>
        <p>${esc(p.objetivo || "")}</p>
        <p><strong>${feitos.length}</strong> sessões registradas neste programa.</p>
        <button class="vyta-btn sec" type="button" data-abrir-fichas="${esc(p.id)}">Ver fichas e iniciar treino</button>
      `;
    }
  
    function dataISO(d) {
      return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    }
  
    function renderRotina() {
      const e = lerEstado();
      const p = todos(e).find(x => x.id === e.ativoId);
      const alvo = box.querySelector("#vytaRotinaConteudo");
  
      if (!p) {
        alvo.textContent = "Selecione um programa acima e clique em “Usar programa” para ativar sua semana.";
        return;
      }
  
      const treinosDoPrograma = (Array.isArray(p.treinos) && p.treinos.length)
        ? p.treinos
        : [{ letra: "A", nome: p.nome }];
  
      const qtdSugerida = Math.max(1, parseInt(p.frequencia, 10) || treinosDoPrograma.length);
      const padroes = { 1: [1], 2: [1, 4], 3: [1, 3, 5], 4: [1, 2, 4, 5], 5: [1, 2, 3, 4, 5], 6: [1, 2, 3, 4, 5, 6], 7: [0, 1, 2, 3, 4, 5, 6] };
      const dias = Array.isArray(e.diasSemana[p.id]) ? e.diasSemana[p.id] : (padroes[qtdSugerida] || [1, 3, 5]);
  
      const nomesCurtos = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      const hoje = new Date();
      const hojeIso = dataISO(hoje);
      const segunda = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - ((hoje.getDay() + 6) % 7));
  
      let html = `<p style="margin:0 0 6px;font-size:12px;">Toque nos dias em que você treina (salva automaticamente):</p>
        <div class="vyta-pilulas-dias">`;
  
      [1, 2, 3, 4, 5, 6, 0].forEach(i => {
        const ativo = dias.includes(i);
        html += `<button type="button" class="vyta-pilula ${ativo ? "ativa" : ""}" data-toggle-dia="${i}">${nomesCurtos[i]}</button>`;
      });
  
      html += `</div><div class="vyta-grade-semana">`;
  
      let indice = 0;
      for (let i = 0; i < 7; i++) {
        const d = new Date(segunda.getFullYear(), segunda.getMonth(), segunda.getDate() + i);
        const diaSemanaNum = d.getDay();
        const iso = dataISO(d);
        const ehHoje = iso === hojeIso;
        const sessao = dias.includes(diaSemanaNum) ? treinosDoPrograma[indice++ % treinosDoPrograma.length] : null;
        const feito = sessao && e.concluidos.some(x => x.programaId === p.id && x.sessao === sessao.letra && x.data === iso);
  
        html += `<div class="vyta-card-dia ${ehHoje ? "hoje" : ""} ${feito ? "feito" : ""} ${!sessao ? "descanso" : ""}">
          <div>
            <strong>${nomesCurtos[diaSemanaNum]} · ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}${ehHoje ? " • HOJE" : ""}</strong>
            <small style="margin-top:4px;font-weight:700;color:${sessao ? "#5148a8" : "#888"};">${sessao ? `Treino ${esc(sessao.letra)}` : "Descanso"}</small>
            ${sessao ? `<small>${esc(sessao.nome)}</small>` : ""}
          </div>
          <div>
            ${sessao ? (feito
              ? `<span class="vyta-tag free" style="font-size:10px;">✓ Feito</span>`
              : `<button type="button" class="vyta-btn sec" data-concluir-programa="${esc(p.id)}" data-sessao="${esc(sessao.letra)}" data-data="${iso}">Concluir</button>`
            ) : `<small style="font-size:10px;">—</small>`}
          </div>
        </div>`;
      }
  
      html += `</div>`;
      alvo.innerHTML = html;
    }
  
    function renderMeus() {
      const e = lerEstado();
      const alvo = box.querySelector("#meusProgramas");
      if (!e.personalizados.length) {
        alvo.innerHTML = "<p>Você ainda não criou nenhum treino personalizado acima.</p>";
        return;
      }
  
      alvo.innerHTML = e.personalizados.map(p => `
        <div class="vyta-ex" style="padding:12px;background:#fff;border-radius:10px;margin-bottom:10px;border:1px solid #e6e5ef;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <strong style="font-size:15px;color:#252445;">${esc(p.nome)}</strong>
              ${e.ativoId === p.id ? ' <span class="vyta-tag free">Ativo</span>' : ""}
              <p style="margin:4px 0;">${esc(p.objetivo || "Treino personalizado")}</p>
            </div>
          </div>
          <ul style="margin:8px 0;padding-left:20px;font-size:13px;color:#444;">
            ${(p.exercicios || []).map(ex => `<li>${esc(ex)}</li>`).join("")}
          </ul>
          <button class="vyta-btn" type="button" data-abrir-fichas="${esc(p.id)}">▶ Abrir e iniciar no Modo Treino</button>
          <button class="vyta-btn sec" type="button" data-ativar="${esc(p.id)}">⭐ Definir como ativo</button>
          <button class="vyta-btn danger" type="button" data-excluir="${esc(p.id)}">Excluir</button>
        </div>
      `).join("");
    }
  
    function ativar(p) {
      const e = lerEstado();
      e.ativoId = p.id;
      if (salvarEstado(e)) {
        render();
        alert(`Programa "${p.nome}" definido como seu treino ativo!`);
      }
    }
  
    ["#vytaNivel", "#vytaFoco", "#vytaAcesso"].forEach(s => box.querySelector(s).addEventListener("change", render));
    box.querySelector("#vytaBusca").addEventListener("input", render);
  
    box.addEventListener("click", ev => {
      const b = ev.target.closest("button");
      if (!b) return;
  
      if (b.dataset.abrirFichas) {
        abrirFichaPorId(b.dataset.abrirFichas);
        return;
      }
  
      if (b.dataset.usar) {
        const p = todos(lerEstado()).find(x => x.id === b.dataset.usar);
        if (p) {
          selecionado = p.id;
          ativar(p);
          box.querySelector("#vytaRotina")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        return;
      }
  
      if (b.hasAttribute("data-toggle-dia")) {
        const diaClicado = Number(b.getAttribute("data-toggle-dia"));
        const estado = lerEstado();
        const programa = todos(estado).find(x => x.id === estado.ativoId);
        if (!programa) return;
  
        const treinosDoPrograma = (Array.isArray(programa.treinos) && programa.treinos.length) ? programa.treinos : [{ letra: "A" }];
        const qtdSugerida = Math.max(1, parseInt(programa.frequencia, 10) || treinosDoPrograma.length);
        const padroes = { 1: [1], 2: [1, 4], 3: [1, 3, 5], 4: [1, 2, 4, 5], 5: [1, 2, 3, 4, 5], 6: [1, 2, 3, 4, 5, 6], 7: [0, 1, 2, 3, 4, 5, 6] };
        let atuais = Array.isArray(estado.diasSemana[programa.id]) ? [...estado.diasSemana[programa.id]] : [...(padroes[qtdSugerida] || [1, 3, 5])];
  
        if (atuais.includes(diaClicado)) {
          if (atuais.length <= 1) {
            alert("Mantenha pelo menos 1 dia de treino na semana.");
            return;
          }
          atuais = atuais.filter(d => d !== diaClicado);
        } else {
          atuais.push(diaClicado);
        }
  
        estado.diasSemana[programa.id] = atuais.sort((a, b) => a - b);
        if (salvarEstado(estado)) render();
        return;
      }
  
      if (b.hasAttribute("data-concluir-programa")) {
        const e = lerEstado();
        const programaId = b.getAttribute("data-concluir-programa");
        const sessao = b.getAttribute("data-sessao");
        const data = b.getAttribute("data-data") || (typeof dataHoje === "function" ? dataHoje() : dataISO(new Date()));
  
        if (e.concluidos.some(x => x.programaId === programaId && x.sessao === sessao && x.data === data)) {
          alert("Essa sessão já foi registrada nessa data.");
          return;
        }
  
        e.concluidos.push({ programaId, sessao, data });
        if (salvarEstado(e)) {
          const prog = todos(e).find(x => x.id === programaId);
          const desc = prog ? `${prog.nome} — Treino ${sessao}` : `Treino ${sessao}`;
          if (typeof registrarTreinoNaData === "function") {
            registrarTreinoNaData(data, desc);
          }
          render();
        }
        return;
      }
  
      if (b.dataset.ativar) {
        const p = lerEstado().personalizados.find(x => x.id === b.dataset.ativar);
        if (p) ativar(p);
        return;
      }
  
      if (b.dataset.excluir) {
        const e = lerEstado();
        const id = b.dataset.excluir;
        if (!confirm("Excluir este treino personalizado?")) return;
        e.personalizados = e.personalizados.filter(x => x.id !== id);
        if (e.ativoId === id) e.ativoId = "";
        if (salvarEstado(e)) {
          render();
          alert("Treino personalizado excluído.");
        }
      }
    });
  
    box.querySelector("#salvarPersonalizado").addEventListener("click", () => {
      const nome = box.querySelector("#nomePersonalizado").value.trim();
      const objetivo = box.querySelector("#objetivoPersonalizado").value.trim();
      const texto = box.querySelector("#exerciciosPersonalizados").value.trim();
      const exercicios = texto.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
  
      if (!nome || !exercicios.length) {
        alert("Informe o nome do treino e pelo menos um exercício.");
        return;
      }
  
      const e = lerEstado();
      const p = {
        id: "personalizado-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
        nome,
        objetivo,
        nivel: "Personalizado",
        exercicios
      };
  
      e.personalizados.push(p);
      if (!salvarEstado(e)) return;
  
      box.querySelector("#nomePersonalizado").value = "";
      box.querySelector("#objetivoPersonalizado").value = "";
      box.querySelector("#exerciciosPersonalizados").value = "";
      render();
      alert("Treino personalizado salvo na sua lista abaixo!");
    });
  
    render();
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
  })();