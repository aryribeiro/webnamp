<img width="700" height="754" alt="image" src="https://github.com/user-attachments/assets/2cc81bad-d892-420e-8cf4-79753e06881a" />

Player de áudio web inspirado no Winamp clássico dos anos 2000, com visual retrô em verde néon e **autoplay automático** entre músicas!

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Autor

- **Nome**: Ary Ribeiro
- **GitHub**: [@aryribeiro](https://github.com/aryribeiro)
- **Email**: aryribeiro@gmail.com

## 🎯 Funcionalidades

- ✅ **Upload múltiplo** de arquivos de áudio e vídeo
- ✅ **Player completo** com controles PREV, NEXT, PLAY/PAUSE e STOP
- ✅ **Controle de volume** - Slider com ícone dinâmico e toggle mute/unmute
- ✅ **Reprodução de vídeo** - Vídeos abrem em lightbox com player nativo e fullscreen
- ✅ **Autoplay automático** - Toca músicas/vídeos continuamente
- ✅ **Ordenação alfabética** - Playlist organizada automaticamente
- ✅ **Barra de progresso** - Clicável para navegar na música
- ✅ **Playlist dinâmica** com ícones distintos para áudio (♫) e vídeo (🎞)
- ✅ **Remover músicas** - Ícone de lixeira SVG em cada item
- ✅ **Display LED** mostrando música atual e tempo em tempo real
- ✅ **Interface retrô** idêntica ao Winamp clássico (verde néon sobre preto)
- ✅ **100% client-side** - Sem backend necessário
- ✅ **Rápido e responsivo** - JavaScript puro, sem frameworks

## 📁 Formatos Suportados

### Áudio
- ✅ **MP3** - MPEG Audio Layer 3
- ✅ **WAV** - Waveform Audio File
- ✅ **OGG** - Ogg Vorbis
- ✅ **M4A/AAC** - Advanced Audio Coding
- ✅ **FLAC** - Free Lossless Audio Codec
- ✅ **Opus** - Opus Audio Codec
- ✅ **WebM Audio** - WebM container (áudio)

### Vídeo
- ✅ **MP4 (H.264)** - MPEG-4 Part 14
- ✅ **WebM (VP8/VP9)** - WebM Video
- ✅ **OGG (Theora)** - Ogg Video

*Todos os formatos suportados nativamente pelos navegadores modernos*

## 🚀 Deploy no Vercel

### Opção 1: Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
cd webnamp
vercel
```

### Opção 2: Deploy via GitHub

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Importe o repositório
5. Deploy automático! 🎉

### Opção 3: Deploy via Drag & Drop

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Arraste a pasta `webnamp` para o site
3. Deploy instantâneo!

## 💻 Como usar localmente

### Opção 1 - Abrir direto (mais fácil)

Basta dar **duplo clique** no arquivo `index.html`

### Opção 2 - Servidor Python

```bash
python -m http.server 8000
```

Acesse: `http://localhost:8000`

### Opção 3 - Servidor Node.js

```bash
npx serve
```

Acesse o link que aparecer

## 🎮 Como usar o WebNamp

1. **Upload**: Clique no campo de upload e selecione seus arquivos de áudio ou vídeo
2. **Play**: Clique em qualquer item da playlist ou no botão ⏸ ▶ PLAY
3. **Pause**: Clique novamente no botão (alterna para ⏸ PAUSE)
4. **Vídeo**: Vídeos abrem em lightbox — feche com ✕ ou clicando fora
5. **Volume**: Ajuste com o slider ou clique no ícone para mute/unmute
6. **Autoplay**: As músicas/vídeos tocam automaticamente um após o outro
7. **Ordenação**: A playlist é organizada alfabeticamente de forma automática
8. **Navegação**: Use PREV/NEXT para navegar manualmente
9. **Barra de progresso**: Clique em qualquer ponto para pular
10. **Remover**: Clique no ícone de lixeira para remover um item
11. **Stop**: Para a reprodução e volta para o primeiro item

## 📁 Estrutura do Projeto

```
webnamp/
├── public/
│   ├── index.html      # Estrutura HTML
│   ├── style.css       # Estilos Winamp clássico
│   └── app.js          # Lógica e autoplay
├── vercel.json         # Configuração Vercel
├── .gitignore          # Arquivos ignorados
└── README.md           # Documentação
```

## 🎨 Visual

Interface inspirada no **Winamp 2.x** clássico:
- Fundo preto (#000000)
- Verde néon (#00FF00) para textos e bordas
- Display LED com efeito pulsante
- Botões com estilo 3D bevel dos anos 90
- Fonte Orbitron para visual futurista/retrô
- Scrollbar customizada verde néon
- Barra de progresso interativa
- Ícones SVG verdes (volume, lixeira) com hover vermelho
- Lightbox para vídeos com borda verde e botão de fechar
- Controle de volume com slider estilizado e ícone dinâmico

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica e Web Audio API
- **CSS3**: Animações, gradientes e keyframes
- **JavaScript ES6**: Lógica, eventos e manipulação DOM
- **Vercel**: Hospedagem e deploy instantâneo

## ⚡ Performance

- **Carregamento instantâneo** - Sem dependências externas
- **Client-side apenas** - Sem servidor necessário
- **Autoplay funcional** - Event listener nativo
- **Responsivo** - Funciona em desktop e mobile
- **Leve** - Apenas 3 arquivos principais

## 🎵 Controles

| Botão | Função |
|-------|--------|
| ⏮ PREV | Música/vídeo anterior |
| ⏭ NEXT | Próxima música/vídeo |
| ⏸ ▶ PLAY | Play/Pause (alterna) |
| ⏹ STOP | Para e volta ao início |
| 🔊 Volume | Slider + clique no ícone para mute |
| 🗑️ | Remove item da playlist |

## 📝 Licença

MIT License - Sinta-se livre para usar, modificar e distribuir!

## 🎵 Créditos

Inspirado no lendário **Winamp** - O player que marcou uma geração!

---

**Made with 💚 by Ary Ribeiro**

## 🔗 Links Úteis

- [LinkedIn - Ary Ribeiro](https://www.linkedin.com/in/aryribeiro/)
- [Vercel Documentation](https://vercel.com/docs)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [HTML5 Audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
