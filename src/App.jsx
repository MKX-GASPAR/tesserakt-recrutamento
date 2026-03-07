import { useState, useRef, useEffect } from "react";

const ROLES = [
  {
    id: "cto", title: "CTO / Braço Direito", icon: "⚡", color: "#f59e0b",
    desc: "Liderança técnica e arquitetura. Precisa complementar o fundador.",
    evaluate: ["Decisão técnica sob pressão","Liderança sem depender do CEO","Comunica tech em negócio","Lealdade e visão de longo prazo","Histórico de projetos em produção"],
    questions: ["Me conta de um projeto técnico que você liderou do zero até o lançamento.","Já precisou tomar uma decisão técnica importante sem ter todas as informações. O que você fez?","Como você age quando discorda da decisão do fundador?","Me descreve uma vez que você falhou tecnicamente. O que aprendeu?","O que você faz quando um dev do time está travado e impactando o prazo?","Como você avalia se uma tecnologia nova vale o risco de adotar num produto em produção?","Você já precisou reescrever algo do zero? O que levou a essa decisão?","Como você equilibra velocidade de entrega com qualidade de código?","Me fala de uma decisão técnica que você se arrepende. Por quê?","Se você pudesse montar o time técnico ideal, quem seriam as primeiras 3 contratações e por quê?","Como você lida quando o prazo é impossível mas o cliente quer assim mesmo?","O que te faria sair de um projeto mesmo se o dinheiro fosse bom?"]
  },
  {
    id: "ai", title: "Dev IA / ML", icon: "🧠", color: "#8b5cf6",
    desc: "Modelos, integração de IA, automação inteligente.",
    evaluate: ["Projeto real de IA no GitHub","Conhece Python + TensorFlow/PyTorch","Sabe quando usar API vs treinar modelo","Explica complexo de forma simples","Visão prática, não só teórica"],
    questions: ["Me mostra um projeto de IA que você construiu por conta própria — não curso.","Quando você usaria uma API de IA pronta versus treinaria um modelo do zero?","Como você lidaria com um modelo que funciona no teste mas falha em produção?","Me explica overfitting como se eu tivesse 15 anos.","Já trabalhou com dados ruins ou incompletos? Como resolveu?","Qual a diferença prática entre classificação e regressão? Me dá um exemplo real.","Como você garantiria que um modelo de IA não discrimina nenhum grupo?","Me fala de uma vez que você superestimou o que a IA conseguia fazer.","Como você mediria o sucesso de um modelo em produção depois de 3 meses?","Qual framework você usaria hoje pra construir um agente de IA e por quê?","Como você explicaria pro investidor por que o modelo é um diferencial competitivo?","O que te deixa animado na área de IA hoje que não existia 2 anos atrás?"]
  },
  {
    id: "fullstack", title: "Dev Full Stack", icon: "💻", color: "#10b981",
    desc: "Constrói produtos web e mobile. Precisa resolver sozinho.",
    evaluate: ["App em produção com usuários reais","Domina React + Node.js","Resolve bug sem ajuda constante","Aprende tecnologia nova rápido","Escreve código que outros leem"],
    questions: ["Me mostra um projeto seu que está no ar com usuários reais.","Como você estruturaria autenticação de usuários num app do zero?","O que você faz quando trava num bug por mais de 2 horas?","Me explica a diferença entre autenticação e autorização com exemplo prático.","Já otimizou o desempenho de um app lento? O que você fez?","Como você decide quando criar componente novo versus reutilizar um existente?","O que você faz antes de subir código pra produção?","Me fala de um débito técnico que você criou e como resolveu depois.","Como você abordaria migração de banco SQL sem perder dados?","Você prefere trabalhar sozinho ou em par? Por quê?","O que você leria primeiro num repositório que nunca viu?","Se tivesse que aprender uma tecnologia nova em uma semana, como faria?"]
  },
  {
    id: "robotics", title: "Dev Robótica", icon: "🤖", color: "#3b82f6",
    desc: "Hardware, sensores, automação física conectada com software.",
    evaluate: ["Projeto físico real — foto/vídeo/protótipo","Conhece C/C++ ou MicroPython","Transita entre hardware e software","Paciência pra depurar problema físico","Entende eletrônica básica"],
    questions: ["Me mostra foto ou vídeo de algo físico que você construiu com tecnologia.","Qual foi o maior desafio de um projeto de hardware e como você resolveu?","Como você conectaria um sensor físico a um app mobile em tempo real?","Me explica a diferença entre Arduino e Raspberry Pi e quando usar cada um.","Já teve um componente falhando de forma intermitente? Como diagnosticou?","Como garantiria que um robô para imediatamente se houver risco de acidente?","Me fala de um projeto físico que você começou e não terminou. O que aconteceu?","Como você testaria um protótipo antes de ir pra produção?","Qual a maior diferença entre debugar software e debugar hardware?","Como você lidaria com limitações de energia num dispositivo IoT?","Você tem mais facilidade em eletrônica ou programação? Por quê?","O que te fez se interessar em robótica especificamente?"]
  },
  {
    id: "designer", title: "Designer UI/UX", icon: "🎨", color: "#ec4899",
    desc: "Identidade visual e experiência do usuário em todos os produtos.",
    evaluate: ["Portfolio com produto digital real","Domina Figma com profundidade","Explica decisões com base no usuário","Recebe feedback sem ego","Pensa em sistema, não em tela individual"],
    questions: ["Me explica as decisões de design de um projeto do seu portfolio.","Como você validaria se um design está funcionando para o usuário?","O que você faria se o fundador pedisse algo que prejudica a experiência?","Me fala de um design que você fez e que não funcionou como esperava.","Como você garantiria consistência visual entre 7 produtos diferentes?","O que muda no design quando é pra mobile versus desktop?","Como você abordaria o design de uma feature completamente nova sem referência?","Me explica o conceito de design system com suas próprias palavras.","Já precisou defender uma decisão de design pro cliente? Como foi?","O que você considera mais importante: beleza ou usabilidade? Por quê?","Como você lida com feedback contraditório de duas pessoas diferentes?","O que te faz olhar pra um design e saber imediatamente que está errado?"]
  },
  {
    id: "growth", title: "Growth / Marketing", icon: "📈", color: "#f97316",
    desc: "Aquisição de usuários, conteúdo e crescimento de receita.",
    evaluate: ["Cresceu algo com números comprovados","Obcecada por CAC, LTV, conversão, retenção","Criativa pra conteúdo que educa e converte","Pensa em funil completo","Entende TikTok, Instagram, SEO, comunidades"],
    questions: ["Me mostra algo que você fez crescer com números reais.","Como você conseguiria os primeiros 500 usuários de um app novo sem pagar anúncio?","Qual métrica você acompanharia diariamente num app de assinatura?","Me explica a diferença entre CAC e LTV como se eu fosse um dev.","Você já rodou um experimento de crescimento que fracassou? O que aprendeu?","Como você criaria uma estratégia de conteúdo do zero pra um produto novo?","O que você faria nos primeiros 30 dias de trabalho aqui?","Como você decidiria quanto gastar em anúncio pago?","Me fala de um canal de aquisição subestimado que você acredita muito.","Como você mediria o sucesso de uma campanha de marketing?","O que é mais difícil: conseguir novos usuários ou reter os que já tem?","Como você construiria comunidade em torno de um produto de tecnologia?"]
  }
];

const SYSTEM = `Você é o consultor de recrutamento pessoal de um jovem fundador de 19 anos que está montando um time de tecnologia — Tesserakt — para construir múltiplos produtos de IA, mobile e robótica.

Seu papel é ser o "chefe" dele durante o processo de recrutamento. Fale como um mentor direto, experiente, pragmático. Pensa como Dario Amodei da Anthropic ou Zuckerberg — sem enrolação, focado em encontrar as pessoas certas.

Quando o fundador te contar o que o candidato respondeu:
- Analise com profundidade
- Diga claramente: ✅ FORTE / ⚠️ SINAL DE ALERTA / ❌ FRACO
- Explique em 2-3 linhas por quê
- Se fraca: dê uma pergunta de follow-up pra usar agora
- Se forte: diga o que mais explorar
- Seja direto como um chefe de verdade

Quando pedir dicas de como conduzir a conversa:
- Dê táticas práticas de diálogo
- Ensine diferenças de comunicação entre perfis diferentes
- Dê frases exatas que ele pode usar

Responda sempre em português brasileiro, direto e prático. Você é o chefe dele.`;

// Logo SVG do Tesserakt
function TesseraktLogo({ size = 32, color = "#0a0a0a" }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      {/* Hexágono externo */}
      <polygon points="50,2 93,26 93,74 50,98 7,74 7,26" stroke={color} strokeWidth="4" fill="none"/>
      {/* Hexágono interno */}
      <polygon points="50,22 73,35 73,65 50,78 27,65 27,35" stroke={color} strokeWidth="4" fill="none"/>
      {/* Linhas conectoras */}
      <line x1="50" y1="2" x2="50" y2="22" stroke={color} strokeWidth="4"/>
      <line x1="93" y1="26" x2="73" y2="35" stroke={color} strokeWidth="4"/>
      <line x1="93" y1="74" x2="73" y2="65" stroke={color} strokeWidth="4"/>
      <line x1="50" y1="98" x2="50" y2="78" stroke={color} strokeWidth="4"/>
      <line x1="7" y1="74" x2="27" y2="65" stroke={color} strokeWidth="4"/>
      <line x1="7" y1="26" x2="27" y2="35" stroke={color} strokeWidth="4"/>
    </svg>
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 5, padding: "6px 0", alignItems: "center" }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%", background: "#1a1a1a",
          animation: `bounce 1.2s ease-in-out ${i*0.2}s infinite`
        }}/>
      ))}
    </div>
  );
}

export default function TesseraktRecrutamento() {
  const [step, setStep] = useState("roles");
  const [selectedRole, setSelectedRole] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [answeredQ, setAnsweredQ] = useState({});
  const [answerInput, setAnswerInput] = useState("");
  const [activeQ, setActiveQ] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const startInterview = (role) => {
    setSelectedRole(role);
    setStep("detail");
    setMessages([{
      role: "assistant",
      content: `Cargo selecionado: ${role.title} ${role.icon}\n\nPronto pra te guiar nessa entrevista. Você pode:\n\n→ Clicar em qualquer pergunta, escrever o que o candidato respondeu e eu analiso na hora\n→ Me perguntar como conduzir a conversa, como quebrar o gelo, como interpretar o silêncio\n→ Pedir frases exatas pra usar\n\nComeça quando quiser. Me conta: quem é o candidato e qual é o contexto?`
    }]);
    setAnsweredQ({});
    setActiveQ(null);
  };

  const submitAnswer = async (qIndex, answer) => {
    if (!answer.trim()) return;
    const q = selectedRole.questions[qIndex];
    const userMsg = `Pergunta ${qIndex + 1}: "${q}"\n\nResposta do candidato: "${answer}"`;
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setAnsweredQ(prev => ({ ...prev, [qIndex]: answer }));
    setActiveQ(null);
    setAnswerInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM, messages: newMessages.map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content?.[0]?.text || "Erro." }]);
    } catch { setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Erro. Tenta de novo." }]); }
    finally { setLoading(false); }
  };

  const sendChat = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM, messages: newMessages.map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content?.[0]?.text || "Erro." }]);
    } catch { setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Erro. Tenta de novo." }]); }
    finally { setLoading(false); inputRef.current?.focus(); }
  };

  const fmt = (text) => text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/✅/g, '<span style="color:#16a34a;font-weight:700">✅</span>')
    .replace(/⚠️/g, '<span style="color:#d97706;font-weight:700">⚠️</span>')
    .replace(/❌/g, '<span style="color:#dc2626;font-weight:700">❌</span>')
    .replace(/→/g, '<span style="color:#555">→</span>')
    .replace(/\n/g, '<br/>');

  const neu = {
    box: {
      background: "#e8e8e8",
      boxShadow: "6px 6px 16px #c8c8c8, -6px -6px 16px #ffffff",
      borderRadius: 16,
    },
    boxInset: {
      background: "#e8e8e8",
      boxShadow: "inset 4px 4px 10px #c8c8c8, inset -4px -4px 10px #ffffff",
      borderRadius: 14,
    },
    btn: {
      background: "#e8e8e8",
      boxShadow: "4px 4px 10px #c8c8c8, -4px -4px 10px #ffffff",
      border: "none",
      borderRadius: 12,
      cursor: "pointer",
      fontFamily: "inherit",
      transition: "all .15s",
      color: "#1a1a1a"
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e8e8e8", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "#1a1a1a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #e8e8e8; }
        ::-webkit-scrollbar-thumb { background: #c8c8c8; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
        @keyframes bounce { 0%,80%,100%{ transform:translateY(0) } 40%{ transform:translateY(-5px) } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .role-card { background: #e8e8e8; box-shadow: 6px 6px 16px #c8c8c8, -6px -6px 16px #ffffff; border-radius: 18px; padding: 22px; cursor: pointer; transition: all .2s; border: none; width: 100%; text-align: left; }
        .role-card:hover { box-shadow: 8px 8px 20px #c0c0c0, -8px -8px 20px #ffffff; transform: translateY(-2px); }
        .role-card:active { box-shadow: inset 4px 4px 10px #c8c8c8, inset -4px -4px 10px #ffffff; transform: none; }
        .q-item { background: #e8e8e8; border-radius: 14px; padding: 14px 16px; margin-bottom: 10px; cursor: pointer; transition: all .2s; border: 2px solid transparent; }
        .q-item:hover { box-shadow: 4px 4px 12px #c8c8c8, -4px -4px 12px #ffffff; }
        .q-item.done { box-shadow: inset 3px 3px 8px #c8c8c8, inset -3px -3px 8px #ffffff; border-color: transparent; }
        .q-item.active { box-shadow: inset 3px 3px 8px #c8c8c8, inset -3px -3px 8px #ffffff; }
        .neu-input { background: #e8e8e8; box-shadow: inset 4px 4px 10px #c8c8c8, inset -4px -4px 10px #ffffff; border-radius: 14px; border: none; padding: 12px 16px; font-family: inherit; font-size: 14px; color: #1a1a1a; outline: none; width: 100%; }
        .neu-input::placeholder { color: #aaa; }
        .send-btn { background: #1a1a1a; border: none; border-radius: 12px; width: 42px; height: 42px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all .15s; box-shadow: 3px 3px 8px #c0c0c0; }
        .send-btn:hover { background: #333; transform: scale(1.05); }
        .send-btn:disabled { opacity: .3; cursor: not-allowed; transform: none; }
        .back-btn { background: #e8e8e8; box-shadow: 4px 4px 10px #c8c8c8, -4px -4px 10px #ffffff; border: none; border-radius: 10px; padding: 8px 18px; font-family: inherit; font-size: 13px; color: #555; cursor: pointer; transition: all .15s; }
        .back-btn:hover { color: #1a1a1a; }
        .analyze-btn { border: none; border-radius: 10px; padding: 9px 0; width: 100%; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s; margin-top: 8px; }
        .analyze-btn:disabled { opacity: .4; cursor: not-allowed; }
        textarea { resize: none; background: none; border: none; outline: none; font-family: inherit; font-size: 14px; color: #1a1a1a; flex: 1; line-height: 1.5; }
        textarea::placeholder { color: #aaa; }
      `}</style>

      {/* HEADER */}
      <div style={{
        ...neu.box, borderRadius: 0,
        boxShadow: "0 4px 20px #c8c8c8",
        padding: "16px 28px",
        display: "flex", alignItems: "center", gap: 14, position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{
          ...neu.box, width: 46, height: 46, borderRadius: 14,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
        }}>
          <TesseraktLogo size={26} color="#1a1a1a" />
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -.5, color: "#0a0a0a" }}>Tesserakt</div>
          <div style={{ fontSize: 11, color: "#999", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>Recrutamento</div>
        </div>
        {step !== "roles" && (
          <button className="back-btn" style={{ marginLeft: "auto" }}
            onClick={() => { setStep("roles"); setSelectedRole(null); setMessages([]); }}>
            ← Trocar cargo
          </button>
        )}
        {step === "detail" && selectedRole && (
          <div style={{ ...neu.boxInset, padding: "6px 14px", display: "flex", alignItems: "center", gap: 8, marginLeft: step !== "roles" ? 12 : "auto" }}>
            <span style={{ fontSize: 11, color: "#999" }}>Progresso</span>
            <span style={{ fontFamily: "'Space Mono'", fontSize: 13, fontWeight: 700 }}>{Object.keys(answeredQ).length}<span style={{ color: "#aaa" }}>/12</span></span>
          </div>
        )}
      </div>

      {/* SELECIONAR CARGO */}
      {step === "roles" && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <div style={{ ...neu.box, width: 80, height: 80, borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TesseraktLogo size={44} color="#0a0a0a" />
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1, color: "#0a0a0a", marginBottom: 8 }}>Recrutamento Tesserakt</div>
            <div style={{ fontSize: 15, color: "#888" }}>Selecione o cargo para começar a entrevista com suporte de IA</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {ROLES.map((role, i) => (
              <button key={role.id} className="role-card"
                style={{ animation: `fadeUp .4s ease ${i * 70}ms both` }}
                onClick={() => startInterview(role)}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ ...neu.boxInset, width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                    {role.icon}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#0a0a0a" }}>{role.title}</span>
                </div>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.5, marginBottom: 12 }}>{role.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: role.color, boxShadow: `0 0 6px ${role.color}` }} />
                  <span style={{ fontSize: 11, color: "#aaa" }}>12 perguntas · Análise em tempo real</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ENTREVISTA */}
      {step === "detail" && selectedRole && (
        <div style={{ display: "flex", height: "calc(100vh - 79px)" }}>

          {/* ESQUERDA — Perguntas */}
          <div style={{ width: 340, overflowY: "auto", padding: "20px 16px 20px 20px", flexShrink: 0, borderRight: "1px solid #d8d8d8" }}>
            
            {/* Card do cargo */}
            <div style={{ ...neu.boxInset, padding: 16, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ ...neu.box, width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {selectedRole.icon}
                </div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{selectedRole.title}</span>
              </div>
              <div style={{ fontSize: 11, color: "#999", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>O que avaliar</div>
              {selectedRole.evaluate.map((e, i) => (
                <div key={i} style={{ fontSize: 12, color: "#555", marginBottom: 6, display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: selectedRole.color, marginTop: 5, flexShrink: 0 }} />
                  {e}
                </div>
              ))}
            </div>

            {/* Perguntas */}
            <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
              Perguntas
            </div>

            {selectedRole.questions.map((q, i) => (
              <div key={i}
                className={`q-item${answeredQ[i] ? " done" : activeQ === i ? " active" : ""}`}
                onClick={() => { if (answeredQ[i]) return; setActiveQ(activeQ === i ? null : i); setAnswerInput(""); }}>
                
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{
                    fontFamily: "'Space Mono'", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                    color: answeredQ[i] ? "#16a34a" : activeQ === i ? "#1a1a1a" : "#bbb"
                  }}>
                    {answeredQ[i] ? "✓" : String(i+1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: 13, color: answeredQ[i] ? "#aaa" : "#333", lineHeight: 1.45, textDecoration: answeredQ[i] ? "line-through" : "none" }}>
                    {q}
                  </span>
                </div>

                {activeQ === i && !answeredQ[i] && (
                  <div style={{ marginTop: 14 }} onClick={e => e.stopPropagation()}>
                    <div style={{ fontSize: 11, color: "#999", marginBottom: 6 }}>O que ele respondeu?</div>
                    <textarea
                      autoFocus
                      value={answerInput}
                      onChange={e => setAnswerInput(e.target.value)}
                      placeholder="Escreve aqui a resposta..."
                      rows={3}
                      style={{ ...neu.boxInset.background, boxShadow: "inset 3px 3px 8px #c8c8c8, inset -3px -3px 8px #ffffff", background: "#e8e8e8", borderRadius: 10, padding: "10px 12px", color: "#1a1a1a", fontFamily: "inherit", fontSize: 13, width: "100%", border: "none", outline: "none", resize: "vertical", lineHeight: 1.4 }}
                    />
                    <button
                      className="analyze-btn"
                      disabled={!answerInput.trim() || loading}
                      onClick={() => submitAnswer(i, answerInput)}
                      style={{
                        background: answerInput.trim() ? "#1a1a1a" : "#ddd",
                        color: answerInput.trim() ? "#fff" : "#aaa",
                        boxShadow: answerInput.trim() ? "3px 3px 10px #c0c0c0" : "none"
                      }}>
                      Analisar com IA →
                    </button>
                  </div>
                )}

                {answeredQ[i] && (
                  <div style={{ marginTop: 6, fontSize: 11, color: "#aaa", fontStyle: "italic", paddingLeft: 22 }}>
                    "{answeredQ[i].slice(0, 55)}{answeredQ[i].length > 55 ? "..." : ""}"
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* DIREITA — Chat */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#eaeaea" }}>

            {/* Mensagens */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 8px" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: 16, animation: "fadeUp .3s ease"
                }}>
                  {msg.role === "assistant" && (
                    <div style={{
                      ...neu.box, width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                      marginRight: 10, marginTop: 2,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <TesseraktLogo size={18} color="#1a1a1a" />
                    </div>
                  )}
                  <div style={{
                    maxWidth: "78%", padding: "12px 16px", fontSize: 14, lineHeight: 1.65,
                    ...(msg.role === "user"
                      ? { background: "#1a1a1a", color: "#f5f5f5", borderRadius: "16px 16px 4px 16px" }
                      : { ...neu.box, borderRadius: "4px 16px 16px 16px", color: "#1a1a1a" }
                    )
                  }} dangerouslySetInnerHTML={{ __html: fmt(msg.content) }} />
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                  <div style={{ ...neu.box, width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <TesseraktLogo size={18} color="#1a1a1a" />
                  </div>
                  <div style={{ ...neu.box, borderRadius: "4px 16px 16px 16px", padding: "12px 16px" }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: "12px 24px 24px", borderTop: "1px solid #d8d8d8" }}>
              <div style={{ ...neu.boxInset, padding: "10px 16px", display: "flex", alignItems: "flex-end", gap: 10 }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); }}}
                  placeholder="Como quebro o gelo? Como sei se ele está mentindo? Como desenvolvo a conversa?"
                  rows={1}
                  onInput={e => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px"; }}
                />
                <button className="send-btn" onClick={sendChat} disabled={!input.trim() || loading}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
              <div style={{ textAlign: "center", fontSize: 11, color: "#bbb", marginTop: 8 }}>
                Enter para enviar · Shift+Enter para nova linha
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
