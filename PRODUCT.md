# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: static multi-page HTML/CSS/vanilla JS (no framework, no build step for the app logic). Chosen because this surface is a representative, non-functional mockup that should live alongside the existing Vite-based 3D infrastructure scene in this same project, without adding runtime complexity the mockup doesn't need.

## Users

- **Primary — o jogador:** acabou de fazer uma jogada em quadra e quer rever o lance rapidamente pelo próprio celular, em campo, geralmente com luz de sol forte, pouca paciência para navegação complexa, às vezes com as mãos sujas de areia.
- **Secundário — o administrador/operador:** dono da arena ou responsável técnico que precisa monitorar se as câmeras, o Raspberry Pi, o botão físico e o armazenamento estão funcionando, e diagnosticar por que um replay específico pode não ter sido gerado.

## Product Purpose

Organizar e disponibilizar os replays de vídeo gerados automaticamente por um sistema físico de captura instalado em quadras de vôlei de areia: duas câmeras IP fixas gravam continuamente, e ao pressionar um botão físico instalado na quadra, o sistema salva um replay (com alguns segundos antes e depois do acionamento) das duas câmeras. O produto existe para que jogadores encontrem e assistam esse replay rapidamente após o lance, e para que administradores confirmem que a infraestrutura de captura está saudável.

## Positioning

Diferente de um serviço de vídeo genérico ou de nuvem de replays manuais, este produto está amarrado a um hardware físico específico por quadra (botão de captura + 2 câmeras IP + Raspberry Pi + NVR local, ver contexto físico já modelado em [main.js](src/main.js)). O replay é disparado no instante exato do lance por um botão físico, não editado depois, e expira sozinho após 7 dias — a interface é a ponte entre esse evento físico e o vídeo.

## Operating Context

- Quadras físicas de vôlei de areia; cada quadra tem seu próprio conjunto de 2 câmeras, Raspberry Pi e botão de captura.
- O sistema pode operar com uma única quadra ou várias; com uma só, a listagem de quadras pode ser pulada e o acesso vai direto para ela.
- Replays são organizados por data e horário do acionamento do botão.
- Retenção de 7 dias; após esse período os replays podem ser removidos automaticamente.
- Acesso majoritariamente via celular, em campo, muitas vezes sob sol forte — exige alto contraste e alvos de toque grandes.

## Capabilities and Constraints

- Listagem de quadras disponíveis, com redirecionamento direto quando existe apenas uma.
- Listagem de replays de uma quadra, organizados por data/horário, com metadados: data, horário, duração, quadra, quantidade de câmeras.
- Player de replay com as duas câmeras sincronizadas temporalmente: alternância entre "só câmera 1", "só câmera 2" ou lado a lado; timeline com marcador do instante em que o botão foi pressionado; play/pause/avançar/retroceder/navegar na timeline.
- Download individual do vídeo da câmera 1 ou da câmera 2, e opcionalmente um vídeo único combinando as duas câmeras sincronizadas.
- Área administrativa: quantidade de replays armazenados, espaço de armazenamento disponível/usado, status das câmeras, status do Raspberry Pi, status do botão de captura, histórico de capturas.
- Página de status de infraestrutura dedicada (câmera 1, câmera 2, Raspberry Pi, botão, servidor, armazenamento) com indicadores online/offline/alerta, usada para diagnosticar por que um replay específico não foi gerado (falha no botão, na comunicação do Pi, no recebimento do vídeo ou no armazenamento).
- Interface responsiva para celular, tablet e computador, com a experiência principal (jogador) desenhada mobile-first.
- Este é um mockup representativo, não funcional: não há vídeo real, não há backend, todos os dados exibidos são fictícios e apenas ilustrativos.

## Evidence on Hand

Nenhum dado real de produto disponível (sem vídeos reais, sem métricas de uso reais). Nomes de quadras, horários, durações e status exibidos serão fictícios e existem apenas para demonstrar a experiência visual — não devem ser tratados nem apresentados como dados reais de um cliente.

## Product Principles

1. O fluxo do jogador vem primeiro: quadra → replay → assistir em poucos toques, mobile-first, sob sol e pressa.
2. Confiança operacional é visível: o estado de câmeras, Raspberry Pi e botão nunca fica escondido do administrador.
3. Autoexplicativo sem manual: marcações de tempo e do instante do botão tornam o replay fácil de entender rapidamente.
4. Efêmero por design: a interface deixa claro que replays são temporários (7 dias).
