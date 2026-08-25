# 3D Arena View

Duas peças para um sistema de replay de vôlei de praia: uma modelagem 3D técnica da infraestrutura física (quadra, câmeras, rede, botão de captura, rack) e um mockup representativo da interface web que os jogadores e o administrador usariam.

## O que tem aqui

### 1. Cena 3D da infraestrutura (`/`)

Modelagem em Three.js de uma quadra oficial de vôlei de praia com o sistema de captura de replay instalado:

- Quadra com areia, linhas de demarcação, rede e postes em escala real (16×8 m).
- Rede de contenção de bola ao redor de toda a área livre.
- Duas câmeras IP em postes opostos, com suporte articulado, apontadas para o centro da quadra.
- Botão físico **REPLAY** preso no poste da rede, ligado por cabo GPIO a um Raspberry Pi.
- Cabeamento (eletroduto) das câmeras até um rack técnico protegido — nunca atravessando a areia.
- Rack com switch PoE, Raspberry Pi, servidor/NVR e armazenamento.
- Bonecos de referência humana para dar noção de escala.

Câmera orbitável com mouse (arrastar orbita, scroll dá zoom, botão direito faz pan).

### 2. Mockup da interface web (`/webapp`)

Protótipo visual **não funcional** (sem backend, sem vídeo real) do produto que organizaria e disponibilizaria os replays gerados pela quadra:

- Lista de quadras disponíveis.
- Replays de cada quadra organizados por data e horário, com duração e nº de câmeras.
- Player com as duas câmeras sincronizadas (alternância entre ângulos, timeline com marcador do instante do botão, downloads).
- Área administrativa (armazenamento, histórico de capturas, status dos dispositivos).
- Página de status da infraestrutura (câmeras, Raspberry Pi, botão, servidor, armazenamento).

Acessível a partir da cena 3D pelo botão "Ver interface do sistema", ou diretamente em `/webapp`.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. A interface web fica em `http://localhost:5173/webapp/`.

Outros comandos:

```bash
npm run build    # build de produção (gera as duas páginas)
npm run preview  # serve o build de produção localmente
```

## Estrutura do projeto

```
index.html              cena 3D (entrada)
src/main.js              monta a cena, luzes, câmera e o loop de render
src/scene/                módulos da cena (quadra, rede, câmeras, rack, botão, pessoas, cabos, labels)
webapp/                  mockup da interface web (HTML/CSS/JS vanilla, sem build)
PRODUCT.md               contexto de produto da interface web
DESIGN.md                sistema visual da interface web
```

## Stack

- [Three.js](https://threejs.org/) + [Vite](https://vitejs.dev/) para a cena 3D.
- HTML/CSS/JS vanilla para o mockup da interface web (sem framework, sem backend).
