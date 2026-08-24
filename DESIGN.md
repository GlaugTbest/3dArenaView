# Design

<!-- impeccable:design-schema 1 -->

## Surface

`webapp/` — Repeteco, the representative (non-functional) replay web app. Built as the "Guarda-vidas" (lifeguard-stripe) world: beach-safety signage read as a real product, not a security-camera dashboard or a streaming-app clone. Direction contract lives as the HTML comment at the top of `webapp/index.html`.

## Palette

Committed light surface — chosen because the primary user checks a replay outdoors, in direct sun, where a near-black dashboard washes out.

- `--canvas` `#eef1e7` / `--canvas-deep` `#e1e6d6` / `--canvas-deeper` `#d0d8bf` — sun-bleached canvas ground, deliberately cool/grey rather than warm cream.
- `--white` `#fbfbf4` — card surfaces.
- `--ink` `#12233f` (flag-navy, primary text) / `--ink-soft` `#4d5c76` / `--ink-faint` `#8792a6` — text tinted from navy, never gray.
- `--navy` / `--navy-deep` / `--navy-mid` — structural bands (headers, tiles, buttons).
- `--red` `#c8432f` / `--red-deep` — signal-flag red: alerts, the physical REPLAY button, primary CTA.
- `--green` `#2f7d52` — signal-flag green: "online"/"ok".
- `--amber` `#c8811f` — signal-flag amber: "atenção".
- `--wood` / `--wood-deep` / `--rope` — rope-and-timber accents (scrollbar thumb, dashed rules).

Strategy: Full palette (named roles), used at structural moments — tile roofs, date-divider tabs, status chips, buttons — never smeared across body copy or dense tables, which stay canvas/white/navy for scanability (Operate mode).

## Type

- Display/headings: **Archivo** (700–900) — sturdy, blocky, reads like painted signage/numerals.
- Body/UI: **Public Sans** (400–700) — civic-signage heritage, built for legibility.
- Time, durations, IDs, table data: **JetBrains Mono** — tabular numerals throughout (`.tabular`).

## Motif

Diagonal repeating navy/white (or red/white on alert) stripe bands mark structural boundaries: the page-top stripe band, court-tile roofs, date dividers in the replay list. This is the surface's one recurring identity device — not decoration bolted onto a generic layout.

## Signature interactions

- **Capture-instant marker**: on the player's timeline, a small red flag-marker "plants" (scale-Y 0→1, exponential ease-out) on load, marking the exact instant the physical button was pressed — the one authored motion moment.
- **Instant flat state swaps**: controls that mirror real physical hardware (camera toggle, the timeline's own state) swap with zero-duration color changes rather than fades — like a flag being raised, not an easing curve.
- **REC dot**: the only looping pulse in the system, on the camera tag in the player, justified because it represents genuinely continuous recording — every other status indicator (courts, device cards, admin table) is a static dot next to a "verificado há Xs" timestamp instead of a decorative pulse.

## Components

- `court-tile` — striped "roof" band (court number + flag status) over a body with metadata and a chevron CTA. No icon+heading+text card grid; each tile carries different weight/content.
- `date-divider` — navy stripe-tab date label + rule + "expira em N dias" chip on groups near the 7-day retention cutoff.
- `replay-row` — mono time, label, meta, chevron; zebra-free (single list), full zebra striping reserved for the admin capture-history table.
- `status-chip` — static dot + mono label, green/red/amber only.
- `device-card` — used identically on Admin Overview and the dedicated infrastructure Status page.
- `camera-frame` — illustrated static SVG "frozen frame" (procedurally drawn court/players per camera angle), never a gray placeholder box.

## Known gaps / not verified

- No real screenshot inspection ran this session (the harness's Browser pane could not composite frames here — confirmed via repeated `screenshot` timeouts), so contrast/spacing/overflow were checked via DOM queries and the mechanical detector, not visually. Recommend a manual look on a phone before treating this as final.
- `impeccable-finish-reviewer` / `impeccable-documenter` subagents were not available in this environment's agent roster; this file was written directly instead of by the shipped documenter.
- Mechanical detector (`detect.mjs`) flagged and cleared: cream-palette default (ground hue shifted), decorative pulsing dots (removed except the justified REC dot). Repeating-stripe advisory kept deliberately as the world's core motif.
