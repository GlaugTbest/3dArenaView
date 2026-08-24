// Repeteco — representative mockup of the replay web app.
// No backend, no real video: every value below is illustrative only.

const ICON = {
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 19l-7-7 7-7"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,
  flag: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 2v20h2v-7.1l3.2-.8a6 6 0 0 1 4.3.6 8 8 0 0 0 6 .8V4a8 8 0 0 1-6-.8 6 6 0 0 0-4.3-.6L8 3.4V2z"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 8v.01"/></svg>`,
  gauge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 13l4-4M9 4.5h6"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>`,
  pause: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>`,
  playBig: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="11" fill="rgba(11,24,48,0.55)"/><path d="M10 8.2v7.6l6.5-3.8z" fill="#fffdf8"/></svg>`,
  back5: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 1 2.6 6.3"/><path d="M3 6v6h6"/></svg>`,
  fwd5: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 0-2.6 6.3"/><path d="M21 6v6h-6"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5"/><path d="M4 18v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2"/></svg>`,
  admin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M4.9 4.9l3.2 3.2M19.1 4.9l-3.2 3.2M4.9 19.1l3.2-3.2M19.1 19.1l-3.2-3.2"/><circle cx="12" cy="12" r="2.6"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="13" height="10" rx="2"/><path d="M16 10.5l5-2.7v8.4l-5-2.7"/></svg>`,
  pi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 5V3M15 5V3M9 21v-2M15 21v-2M5 9H3M5 15H3M21 9h-2M21 15h-2"/></svg>`,
  button: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/></svg>`,
  server: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="6" rx="1.5"/><rect x="4" y="14" width="16" height="6" rx="1.5"/><path d="M7.5 7h.01M7.5 17h.01"/></svg>`,
  storage: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>`,
};

function flagIcon(status) {
  const cls = status === "ok" ? "ok" : status === "warn" ? "warn" : "alert";
  return `<span class="flag-icon ${cls}">${ICON.flag}</span>`;
}

function statusChip(status, label) {
  const cls = status === "ok" ? "ok" : status === "warn" ? "warn" : "alert";
  return `<span class="status-chip ${cls}"><span class="status-dot"></span>${label}</span>`;
}

/* ============================================================
   Illustrated static camera frames (no real video in this mockup)
   ============================================================ */

function courtFrameSVG(variant) {
  const mirrored = variant === "b";
  const skyTop = "#f6ecd7";
  const skyBottom = "#eddcc0";
  const sandTop = "#e7cd97";
  const sandBottom = "#d9b877";
  const px = mirrored ? 460 : 180;
  const py = 190;
  return `
  <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Quadro ilustrativo da captura">
    <defs>
      <linearGradient id="sky-${variant}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${skyTop}"/>
        <stop offset="1" stop-color="${skyBottom}"/>
      </linearGradient>
      <linearGradient id="sand-${variant}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${sandTop}"/>
        <stop offset="1" stop-color="${sandBottom}"/>
      </linearGradient>
    </defs>
    <rect width="640" height="400" fill="url(#sky-${variant})"/>
    <rect y="150" width="640" height="250" fill="url(#sand-${variant})"/>
    <g opacity="0.35" stroke="#b8945a" stroke-width="1">
      ${Array.from({ length: 26 }).map((_, i) => {
        const y = 160 + i * 9;
        const off = mirrored ? (i % 2) * 14 : (i % 2) * -14;
        return `<line x1="${-20 + off}" y1="${y}" x2="${660 + off}" y2="${y + 5}"/>`;
      }).join("")}
    </g>
    <path d="M${mirrored ? 640 : 0},210 L${mirrored ? 0 : 640},240" stroke="#fffdf8" stroke-width="4" opacity="0.9"/>
    <line x1="${320}" y1="140" x2="${320}" y2="230" stroke="#12233f" stroke-width="3"/>
    <line x1="${320}" y1="140" x2="${mirrored ? 210 : 430}" y2="150" stroke="#fffdf8" stroke-width="10" opacity="0.92"/>
    <g fill="#12233f">
      <ellipse cx="${px}" cy="${py + 46}" rx="17" ry="6" opacity="0.18"/>
      <rect x="${px - 6}" y="${py - 26}" width="12" height="34" rx="6"/>
      <circle cx="${px}" cy="${py - 34}" r="9"/>
      <rect x="${px - 15}" y="${py - 4}" width="9" height="26" rx="4" transform="rotate(18 ${px} ${py})"/>
      <rect x="${px + 6}" y="${py - 4}" width="9" height="26" rx="4" transform="rotate(-18 ${px + 10} ${py})"/>
    </g>
    <g fill="#1b3358">
      <ellipse cx="${mirrored ? px - 150 : px + 150}" cy="${py + 66}" rx="17" ry="6" opacity="0.18"/>
      <rect x="${(mirrored ? px - 150 : px + 150) - 6}" y="${py + 6}" width="12" height="34" rx="6"/>
      <circle cx="${mirrored ? px - 150 : px + 150}" cy="${py - 2}" r="9"/>
    </g>
    <circle cx="${mirrored ? 250 : 380}" cy="120" r="10" fill="#c8432f"/>
    <rect x="0" y="0" width="640" height="400" fill="#0b1830" opacity="0.05"/>
  </svg>`;
}

function svgDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* ============================================================
   Mock data — every value below is illustrative only
   ============================================================ */

const COURTS = [
  {
    id: "quadra-1",
    number: 1,
    name: "Quadra 1 — Central",
    status: "ok",
    cameras: 2,
    replaysToday: 5,
    lastCapture: "16:42",
  },
  {
    id: "quadra-2",
    number: 2,
    name: "Quadra 2 — Norte",
    status: "warn",
    cameras: 2,
    replaysToday: 1,
    lastCapture: "12:05",
  },
];

const REPLAYS = {
  "quadra-1": [
    { id: "q1-r1", dateLabel: "Hoje", dateFull: "22 ago 2026", time: "16:42", duration: "0:18", cameras: 2, expiresInDays: 7 },
    { id: "q1-r2", dateLabel: "Hoje", dateFull: "22 ago 2026", time: "15:58", duration: "0:22", cameras: 2, expiresInDays: 7 },
    { id: "q1-r3", dateLabel: "Hoje", dateFull: "22 ago 2026", time: "15:10", duration: "0:15", cameras: 2, expiresInDays: 7 },
    { id: "q1-r4", dateLabel: "Hoje", dateFull: "22 ago 2026", time: "14:37", duration: "0:20", cameras: 2, expiresInDays: 7 },
    { id: "q1-r5", dateLabel: "Hoje", dateFull: "22 ago 2026", time: "13:05", duration: "0:19", cameras: 2, expiresInDays: 7 },
    { id: "q1-r6", dateLabel: "Ontem", dateFull: "21 ago 2026", time: "18:05", duration: "0:24", cameras: 2, expiresInDays: 6 },
    { id: "q1-r7", dateLabel: "Ontem", dateFull: "21 ago 2026", time: "17:22", duration: "0:19", cameras: 2, expiresInDays: 6 },
    { id: "q1-r8", dateLabel: "Ontem", dateFull: "21 ago 2026", time: "16:40", duration: "0:16", cameras: 2, expiresInDays: 6 },
    { id: "q1-r9", dateLabel: "19 ago", dateFull: "19 ago 2026", time: "16:11", duration: "0:17", cameras: 2, expiresInDays: 4 },
    { id: "q1-r10", dateLabel: "19 ago", dateFull: "19 ago 2026", time: "15:30", duration: "0:21", cameras: 1, expiresInDays: 4, note: "Câmera 2 ficou offline durante a captura" },
    { id: "q1-r11", dateLabel: "17 ago", dateFull: "17 ago 2026", time: "14:50", duration: "0:18", cameras: 2, expiresInDays: 2 },
    { id: "q1-r12", dateLabel: "16 ago", dateFull: "16 ago 2026", time: "11:20", duration: "0:15", cameras: 2, expiresInDays: 1 },
  ],
  "quadra-2": [
    { id: "q2-r1", dateLabel: "Hoje", dateFull: "22 ago 2026", time: "12:05", duration: "0:20", cameras: 1, expiresInDays: 7, note: "Câmera 2 offline no momento da captura" },
    { id: "q2-r2", dateLabel: "Ontem", dateFull: "21 ago 2026", time: "19:40", duration: "0:23", cameras: 2, expiresInDays: 6 },
    { id: "q2-r3", dateLabel: "Ontem", dateFull: "21 ago 2026", time: "18:12", duration: "0:19", cameras: 2, expiresInDays: 6 },
  ],
};

const DEVICES = {
  "quadra-1": [
    { id: "cam1", icon: "camera", name: "Câmera 1", role: "Poste lateral A", status: "ok", diag: "Enviando stream ao switch PoE normalmente.", checked: "verificado há 12s" },
    { id: "cam2", icon: "camera", name: "Câmera 2", role: "Poste lateral B", status: "ok", diag: "Enviando stream ao switch PoE normalmente.", checked: "verificado há 12s" },
    { id: "pi1", icon: "pi", name: "Raspberry Pi", role: "Gatilho de captura", status: "ok", diag: "Conectado ao servidor, GPIO respondendo.", checked: "verificado há 30s" },
    { id: "btn1", icon: "button", name: "Botão REPLAY", role: "Poste da rede", status: "ok", diag: "Último acionamento registrado às 16:42.", checked: "verificado há 30s" },
  ],
  "quadra-2": [
    { id: "cam1b", icon: "camera", name: "Câmera 1", role: "Poste lateral A", status: "ok", diag: "Enviando stream ao switch PoE normalmente.", checked: "verificado há 20s" },
    { id: "cam2b", icon: "camera", name: "Câmera 2", role: "Poste lateral B", status: "alert", diag: "Sem sinal desde 11:58 — verificar cabo Cat6 no eletroduto do poste.", checked: "verificado há 20s" },
    { id: "pi2", icon: "pi", name: "Raspberry Pi", role: "Gatilho de captura", status: "ok", diag: "Conectado ao servidor, GPIO respondendo.", checked: "verificado há 41s" },
    { id: "btn2", icon: "button", name: "Botão REPLAY", role: "Poste da rede", status: "warn", diag: "Último acionamento sem confirmação de captura da câmera 2.", checked: "verificado há 41s" },
  ],
};

const SHARED_DEVICES = [
  { id: "srv", icon: "server", name: "Servidor / NVR", role: "Rack técnico", status: "ok", diag: "Recebendo os dois streams e gravando buffer contínuo.", checked: "verificado há 8s" },
  { id: "storage", icon: "storage", name: "Armazenamento", role: "SSD do rack técnico", status: "ok", diag: "412 GB livres de 1 TB · limpeza automática em 7 dias.", checked: "verificado há 8s" },
];

const CAPTURES_HISTORY = [
  { quadra: "Quadra 1", time: "22 ago 2026 · 16:42", cameras: "2/2", result: "ok" },
  { quadra: "Quadra 1", time: "22 ago 2026 · 15:58", cameras: "2/2", result: "ok" },
  { quadra: "Quadra 2", time: "22 ago 2026 · 12:05", cameras: "1/2", result: "warn" },
  { quadra: "Quadra 1", time: "22 ago 2026 · 15:10", cameras: "2/2", result: "ok" },
  { quadra: "Quadra 1", time: "22 ago 2026 · 14:37", cameras: "2/2", result: "ok" },
  { quadra: "Quadra 2", time: "21 ago 2026 · 19:40", cameras: "2/2", result: "ok" },
  { quadra: "Quadra 1", time: "21 ago 2026 · 18:05", cameras: "2/2", result: "ok" },
];

/* ============================================================
   Shared chrome
   ============================================================ */

function shell({ stripe = "navy", topbar, banner = true, body }) {
  return `
    <div class="stripe-band ${stripe === "red" ? "red-band" : ""}"></div>
    ${banner ? `<div class="mock-banner">Mockup representativo · sem vídeo real · dados ilustrativos</div>` : ""}
    <header class="topbar">
      <div class="topbar-inner">${topbar}</div>
    </header>
    <main class="screen">${body}</main>
    <footer class="app-footer">
      Repeteco — sistema de replay para quadras de vôlei de areia. <a href="#/">Ver quadras</a> · <a href="#/admin">Área administrativa</a>
    </footer>
  `;
}

function brandTopbar() {
  return `
    <div class="topbar-brand">
      <svg class="flagmark" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#12233f"/><path d="M6 10h20M6 20h20" stroke="#fffdf8" stroke-width="4"/></svg>
      Repeteco
    </div>
    <a class="icon-btn" href="#/admin" title="Área administrativa">${ICON.admin}</a>
  `;
}

function backTopbar(label, href, adminHref = "#/admin") {
  return `
    <a class="topbar-back" href="${href}">${ICON.back}${label}</a>
    <div class="topbar-title"></div>
    <a class="icon-btn" href="${adminHref}" title="Área administrativa">${ICON.admin}</a>
  `;
}

/* ============================================================
   Screen: Courts list
   ============================================================ */

function screenCourts() {
  const body = `
    <div class="page-heading">
      <h2>Escolha a quadra</h2>
      <p class="sub">Cada quadra tem suas próprias câmeras e botão de captura. Selecione uma para ver os replays.</p>
    </div>
    ${COURTS.length === 1 ? `
      <div class="single-court-note">${ICON.info} Só existe uma quadra cadastrada — normalmente o app pula direto para a lista de replays dela.</div>
    ` : ""}
    <div class="courts-grid">
      ${COURTS.map(courtTile).join("")}
    </div>
  `;
  return shell({ topbar: brandTopbar(), body });
}

function courtTile(c) {
  return `
    <a class="court-tile ${c.status === "alert" || c.status === "warn" ? "is-alert" : ""}" href="#/quadra/${c.id}">
      <div class="court-tile-roof">
        <div class="court-number">Nº${c.number}<span>QUADRA</span></div>
        ${flagIcon(c.status)}
      </div>
      <div class="court-tile-body">
        <h3>${c.name}</h3>
        ${statusChip(c.status, c.status === "ok" ? "Sistema OK" : "Verificar câmera")}
        <div class="court-tile-meta">
          <span>Replays hoje: <strong>${c.replaysToday}</strong></span>
          <span>Câmeras: <strong>${c.cameras}</strong></span>
          <span>Última captura: <strong class="tabular">${c.lastCapture}</strong></span>
        </div>
        <div class="court-tile-footer">
          <span class="court-tile-cta">Ver replays ${ICON.chevron}</span>
        </div>
      </div>
    </a>
  `;
}

/* ============================================================
   Screen: Replays list
   ============================================================ */

function screenReplays(courtId) {
  const court = COURTS.find((c) => c.id === courtId) || COURTS[0];
  const replays = REPLAYS[court.id] || [];

  let lastGroup = null;
  const rows = replays.map((r) => {
    let groupHtml = "";
    if (r.dateLabel !== lastGroup) {
      lastGroup = r.dateLabel;
      const expiring = r.expiresInDays <= 2;
      groupHtml = `
        <div class="date-divider">
          <span class="stripe-tab">${r.dateLabel} · ${r.dateFull}</span>
          <span class="rule"></span>
          ${expiring ? `<span class="expiring">expira em ${r.expiresInDays} dia${r.expiresInDays === 1 ? "" : "s"}</span>` : ""}
        </div>
      `;
    }
    return groupHtml + replayRow(court.id, r);
  }).join("");

  const body = `
    <div class="page-heading">
      <h2>${court.name}</h2>
      <p class="sub">Replays organizados por data e horário de acionamento do botão. Gravações somem automaticamente após 7 dias.</p>
    </div>
    ${replays.length ? `<div class="replay-list">${rows}</div>` : `<div class="empty-state">Nenhum replay nos últimos 7 dias.</div>`}
  `;
  return shell({ topbar: backTopbar("Quadras", "#/"), body });
}

function replayRow(courtId, r) {
  return `
    <a class="replay-row" href="#/quadra/${courtId}/replay/${r.id}">
      <span class="replay-time tabular">${r.time}</span>
      <span class="replay-info">
        <span class="label">Duração ${r.duration} · ${r.cameras} câmera${r.cameras > 1 ? "s" : ""}</span>
        <span class="meta">
          <span>${r.dateFull}</span>
          ${r.note ? `<span style="color:var(--amber)">⚠ ${r.note}</span>` : ""}
        </span>
      </span>
      <span class="chevron">${ICON.chevron}</span>
    </a>
  `;
}

/* ============================================================
   Screen: Player
   ============================================================ */

function screenPlayer(courtId, replayId) {
  const court = COURTS.find((c) => c.id === courtId) || COURTS[0];
  const replay = (REPLAYS[court.id] || []).find((r) => r.id === replayId) || (REPLAYS[court.id] || [])[0];
  if (!replay) return screenReplays(court.id);

  const frameA = svgDataUri(courtFrameSVG("a"));
  const frameB = svgDataUri(courtFrameSVG("b"));

  const body = `
    <div class="page-heading">
      <h2>${court.name} · ${replay.time}</h2>
      <p class="sub">${replay.dateFull} — capturado quando o botão foi pressionado, com alguns segundos antes e depois do instante.</p>
    </div>

    <div class="player-shell">
      <div class="camera-toggle" data-camera-toggle>
        <button type="button" class="active" data-cam="split">Ambas as câmeras</button>
        <button type="button" data-cam="1">Só câmera 1</button>
        <button type="button" data-cam="2">Só câmera 2</button>
      </div>

      <div class="camera-frames" data-layout="split" data-frames>
        <div class="camera-frame" data-cam-frame="1">
          <img src="${frameA}" alt="Quadro ilustrativo da câmera 1" />
          <span class="cam-tag"><span class="rec-dot"></span>CAM 1</span>
          <div class="play-overlay">${ICON.playBig}</div>
        </div>
        <div class="camera-frame" data-cam-frame="2">
          <img src="${frameB}" alt="Quadro ilustrativo da câmera 2" />
          <span class="cam-tag"><span class="rec-dot"></span>CAM 2</span>
          <div class="play-overlay">${ICON.playBig}</div>
        </div>
      </div>

      <div class="transport">
        <button class="skip-btn" title="Retroceder 5s">${ICON.back5}</button>
        <button class="play-btn" data-play-btn title="Reproduzir">${ICON.play}</button>
        <button class="skip-btn" title="Avançar 5s">${ICON.fwd5}</button>
        <div class="timeline-wrap">
          <div class="timeline-time">
            <span class="tabular" data-elapsed>0:07</span>
            <span class="tabular">${replay.duration}</span>
          </div>
          <div class="timeline">
            <div class="fill"></div>
            <div class="capture-marker" title="Instante em que o botão foi pressionado"></div>
            <div class="scrub-handle"></div>
          </div>
          <div class="capture-caption">${ICON.flag} Marcador vermelho = instante em que o botão REPLAY foi pressionado</div>
        </div>
      </div>

      <div class="replay-meta-card">
        <div class="item"><span class="k">Quadra</span><span class="v">${court.name.split(" — ")[0]}</span></div>
        <div class="item"><span class="k">Data</span><span class="v">${replay.dateFull}</span></div>
        <div class="item"><span class="k">Duração</span><span class="v">${replay.duration}</span></div>
        <div class="item"><span class="k">Câmeras</span><span class="v">${replay.cameras} de 2</span></div>
      </div>

      <div>
        <h3 class="section-title" style="margin-top:0">Baixar vídeos</h3>
        <div class="download-row">
          <button class="btn btn-outline">${ICON.download} Câmera 1</button>
          <button class="btn btn-outline">${ICON.download} Câmera 2</button>
          <button class="btn btn-navy">${ICON.download} Vídeo combinado (2 câmeras)</button>
        </div>
      </div>
    </div>
  `;
  return shell({ topbar: backTopbar("Replays", `#/quadra/${court.id}`), body });
}

/* ============================================================
   Screen: Admin
   ============================================================ */

function adminTabs(active) {
  return `
    <div class="admin-tabs">
      <a href="#/admin" class="${active === "overview" ? "active" : ""}">Visão geral</a>
      <a href="#/admin/status" class="${active === "status" ? "active" : ""}">Status da infraestrutura</a>
    </div>
  `;
}

function deviceCard(d) {
  return `
    <div class="device-card">
      <div class="top-row">
        <div>
          <h3>${d.name}</h3>
          <div class="role">${d.role}</div>
        </div>
        ${statusChip(d.status, d.status === "ok" ? "Online" : d.status === "warn" ? "Atenção" : "Offline")}
      </div>
      <div class="diag">${d.diag}<span class="checked">${d.checked}</span></div>
    </div>
  `;
}

function screenAdminOverview() {
  const totalReplays = Object.values(REPLAYS).flat().length;
  const body = `
    <div class="page-heading">
      <h2>Área administrativa</h2>
      <p class="sub">Visão geral do sistema de captura instalado nas quadras.</p>
    </div>
    ${adminTabs("overview")}

    <div class="stat-grid">
      <div class="stat-tile"><span class="k">Replays armazenados</span><span class="v">${totalReplays}</span></div>
      <div class="stat-tile"><span class="k">Quadras ativas</span><span class="v">${COURTS.length}<small> instalações</small></span></div>
      <div class="stat-tile"><span class="k">Retenção</span><span class="v">7<small> dias</small></span></div>
      <div class="stat-tile"><span class="k">Capturas hoje</span><span class="v">${COURTS.reduce((s, c) => s + c.replaysToday, 0)}</span></div>
    </div>

    <div class="storage-bar-wrap">
      <div class="head"><h3>Armazenamento</h3><span class="val tabular">588 GB usados de 1 TB</span></div>
      <div class="storage-bar"><div class="seg used" style="width:58.8%"></div></div>
      <div class="storage-legend"><span><span class="dot" style="background:var(--navy)"></span>Usado</span><span><span class="dot" style="background:var(--canvas-deeper)"></span>Livre</span></div>
    </div>

    <h3 class="section-title">Quadra 1 — Central</h3>
    <div class="device-grid">${DEVICES["quadra-1"].map(deviceCard).join("")}</div>

    <h3 class="section-title">Quadra 2 — Norte</h3>
    <div class="device-grid">${DEVICES["quadra-2"].map(deviceCard).join("")}</div>

    <h3 class="section-title">Compartilhado</h3>
    <div class="device-grid">${SHARED_DEVICES.map(deviceCard).join("")}</div>

    <h3 class="section-title">Histórico de capturas</h3>
    <div class="table-scroll">
      <table class="captures">
        <thead><tr><th>Quadra</th><th>Data e horário</th><th>Câmeras</th><th>Resultado</th></tr></thead>
        <tbody>
          ${CAPTURES_HISTORY.map((h) => `
            <tr>
              <td>${h.quadra}</td>
              <td class="mono">${h.time}</td>
              <td class="mono">${h.cameras}</td>
              <td>${statusChip(h.result, h.result === "ok" ? "Completo" : "Parcial")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
  return shell({ topbar: backTopbar("Quadras", "#/", "#/admin"), banner: false, body });
}

function screenAdminStatus() {
  const body = `
    <div class="page-heading">
      <h2>Status da infraestrutura</h2>
      <p class="sub">Se um replay não for gerado, confira aqui em qual ponto a cadeia falhou: botão → Raspberry Pi → servidor → armazenamento.</p>
    </div>
    ${adminTabs("status")}

    <h3 class="section-title" style="margin-top:0">Quadra 1 — Central</h3>
    <div class="device-grid">${DEVICES["quadra-1"].map(deviceCard).join("")}</div>

    <h3 class="section-title">Quadra 2 — Norte</h3>
    <div class="device-grid">${DEVICES["quadra-2"].map(deviceCard).join("")}</div>

    <h3 class="section-title">Servidor e armazenamento (compartilhados)</h3>
    <div class="device-grid">${SHARED_DEVICES.map(deviceCard).join("")}</div>
  `;
  return shell({ topbar: backTopbar("Quadras", "#/", "#/admin"), banner: false, body });
}

/* ============================================================
   Router
   ============================================================ */

function parseHash() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const parts = hash.split("/").filter(Boolean);
  return parts;
}

function render() {
  const parts = parseHash();
  const root = document.getElementById("app");
  let html;

  if (parts[0] === "quadra" && parts[1] && parts[2] === "replay" && parts[3]) {
    html = screenPlayer(parts[1], parts[3]);
  } else if (parts[0] === "quadra" && parts[1]) {
    html = screenReplays(parts[1]);
  } else if (parts[0] === "admin" && parts[1] === "status") {
    html = screenAdminStatus();
  } else if (parts[0] === "admin") {
    html = screenAdminOverview();
  } else {
    html = screenCourts();
  }

  root.innerHTML = html;
  window.scrollTo({ top: 0 });
  wireInteractions(root);
}

function wireInteractions(root) {
  const toggle = root.querySelector("[data-camera-toggle]");
  const frames = root.querySelector("[data-frames]");
  if (toggle && frames) {
    toggle.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-cam]");
      if (!btn) return;
      toggle.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
      const cam = btn.dataset.cam;
      if (cam === "split") {
        frames.dataset.layout = "split";
        frames.querySelectorAll("[data-cam-frame]").forEach((f) => (f.style.display = ""));
      } else {
        frames.dataset.layout = "single";
        frames.querySelectorAll("[data-cam-frame]").forEach((f) => {
          f.style.display = f.dataset.camFrame === cam ? "" : "none";
        });
      }
    });
  }

  const playBtn = root.querySelector("[data-play-btn]");
  if (playBtn) {
    let playing = false;
    playBtn.addEventListener("click", () => {
      playing = !playing;
      playBtn.innerHTML = playing ? ICON.pause : ICON.play;
      playBtn.title = playing ? "Pausar" : "Reproduzir";
      root.querySelectorAll(".play-overlay").forEach((el) => (el.style.opacity = playing ? "0" : "1"));
    });
  }
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
render();
