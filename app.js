// Estado da aplicação
let playlist = [];
let currentTrack = 0;
let isPlaying = false;

// Elementos DOM
const fileInput = document.getElementById('file-input');
const audioPlayer = document.getElementById('audio-player');
const playlistDiv = document.getElementById('playlist');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const timeDisplay = document.getElementById('time-display');
const statusInfo = document.getElementById('status-info');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnPlay = document.getElementById('btn-play');
const btnStop = document.getElementById('btn-stop');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');

// Upload de arquivos
fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        // Aceitar todos os formatos de áudio suportados
        if (file.type.startsWith('audio/')) {
            const url = URL.createObjectURL(file);
            
            // Extrair metadados básicos
            const audio = new Audio(url);
            audio.addEventListener('loadedmetadata', () => {
                // Remover extensão do nome
                const cleanName = file.name.replace(/\.(mp3|wav|ogg|m4a|aac|flac)$/i, '');
                
                playlist.push({
                    title: cleanName,
                    artist: 'Unknown',
                    duration: Math.floor(audio.duration),
                    url: url,
                    filename: file.name
                });
                
                playlist.sort((a, b) => a.title.localeCompare(b.title));
                renderPlaylist();
                updateDisplay();
            });
        }
    });
    
    // Limpar input
    fileInput.value = '';
});

// Renderizar playlist
function renderPlaylist() {
    playlistDiv.innerHTML = '';
    
    playlist.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        if (index === currentTrack && isPlaying) {
            item.classList.add('playing');
        }
        
        const status = (index === currentTrack && isPlaying) ? '▶' : '♫';
        
        // Texto da música
        const textSpan = document.createElement('span');
        textSpan.className = 'playlist-item-text';
        textSpan.textContent = `${status} ${track.title} - ${track.artist} [${formatTime(track.duration)}]`;
        textSpan.addEventListener('click', () => {
            playTrack(index);
        });
        
        // Botão deletar
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.title = 'Remover música';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeTrack(index);
        });
        
        item.appendChild(textSpan);
        item.appendChild(deleteBtn);
        playlistDiv.appendChild(item);
    });
}

// Tocar faixa
function playTrack(index) {
    if (playlist.length === 0) return;
    
    currentTrack = index;
    isPlaying = true;
    
    const track = playlist[currentTrack];
    audioPlayer.src = track.url;
    audioPlayer.play();
    
    updateDisplay();
    renderPlaylist();
}

// Próxima faixa
function nextTrack() {
    if (playlist.length === 0) return;
    
    currentTrack = (currentTrack + 1) % playlist.length;
    playTrack(currentTrack);
}

// Faixa anterior
function prevTrack() {
    if (playlist.length === 0) return;
    
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    playTrack(currentTrack);
}

// Parar
function stopPlayer() {
    isPlaying = false;
    currentTrack = 0;
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    audioPlayer.src = '';
    
    updateDisplay();
    renderPlaylist();
}

// Remover música da playlist
function removeTrack(index) {
    // Se estiver tocando a música que será removida
    if (index === currentTrack && isPlaying) {
        stopPlayer();
    }
    
    // Remover da playlist
    playlist.splice(index, 1);
    
    // Ajustar currentTrack se necessário
    if (currentTrack >= playlist.length && playlist.length > 0) {
        currentTrack = playlist.length - 1;
    } else if (playlist.length === 0) {
        currentTrack = 0;
    } else if (index < currentTrack) {
        currentTrack--;
    }
    
    updateDisplay();
    renderPlaylist();
}

// Atualizar display
function updateDisplay() {
    if (playlist.length === 0) {
        trackTitle.textContent = '';
        trackArtist.textContent = '';
        timeDisplay.textContent = '00:00';
        statusInfo.textContent = '⏹ STOPPED | Track 0/0';
        return;
    }
    
    const track = playlist[currentTrack];
    trackTitle.textContent = `♫ ${track.title}`;
    trackArtist.textContent = `♪ ${track.artist}`;
    timeDisplay.textContent = `⏱ ${formatTime(track.duration)}`;
    
    const status = isPlaying ? '▶ PLAYING' : '⏹ STOPPED';
    statusInfo.textContent = `${status} | Track ${currentTrack + 1}/${playlist.length}`;
}

// Formatar tempo
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Event listeners dos botões
btnPrev.addEventListener('click', prevTrack);
btnNext.addEventListener('click', nextTrack);
btnPlay.addEventListener('click', () => {
    if (playlist.length === 0) return;
    
    // Se não tem src ou está vazio (após STOP), carregar a música atual
    if (!audioPlayer.src || audioPlayer.src === '' || audioPlayer.src === window.location.href) {
        playTrack(currentTrack);
        return;
    }
    
    if (audioPlayer.paused) {
        // Se pausado, retomar
        audioPlayer.play();
        isPlaying = true;
    } else {
        // Se tocando, pausar
        audioPlayer.pause();
        isPlaying = false;
    }
    
    updateDisplay();
    renderPlaylist();
});
btnStop.addEventListener('click', stopPlayer);

// AUTOPLAY AUTOMÁTICO - Quando música termina, toca a próxima
audioPlayer.addEventListener('ended', () => {
    console.log('Música terminou, avançando automaticamente...');
    nextTrack();
});

// Atualizar tempo em tempo real
audioPlayer.addEventListener('timeupdate', () => {
    if (isPlaying && playlist.length > 0) {
        const current = Math.floor(audioPlayer.currentTime);
        const duration = Math.floor(audioPlayer.duration) || 0;
        timeDisplay.textContent = `⏱ ${formatTime(current)} / ${formatTime(duration)}`;
        
        // Atualizar barra de progresso
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progress}%`;
    }
});

// Clicar na barra de progresso para navegar
progressContainer.addEventListener('click', (e) => {
    if (!isPlaying || playlist.length === 0) return;
    
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * audioPlayer.duration;
    
    audioPlayer.currentTime = newTime;
});

// Inicializar
updateDisplay();
