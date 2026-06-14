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
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxVideo = document.getElementById('lightbox-video');
const lightboxClose = document.getElementById('lightbox-close');

// Upload de arquivos
fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
        const isAudio = file.type.startsWith('audio/');
        const isVideo = file.type.startsWith('video/');

        if (isAudio || isVideo) {
            const url = URL.createObjectURL(file);
            const media = isVideo ? document.createElement('video') : new Audio(url);
            if (isVideo) media.src = url;

            media.addEventListener('loadedmetadata', () => {
                const cleanName = file.name.replace(/\.(mp3|wav|ogg|m4a|aac|flac|opus|weba|mp4|webm|mkv|avi)$/i, '');

                playlist.push({
                    title: cleanName,
                    artist: 'Unknown',
                    duration: Math.floor(media.duration),
                    url: url,
                    filename: file.name,
                    type: isVideo ? 'video' : 'audio'
                });

                playlist.sort((a, b) => a.title.localeCompare(b.title));
                renderPlaylist();
                updateDisplay();
            });
        }
    });

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
        
        const typeIcon = track.type === 'video' ? '🎞' : '♫';
        const status = (index === currentTrack && isPlaying) ? '▶' : typeIcon;
        
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
        deleteBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14H6L5 6"/><path d="M8 6V4h8v2"/></svg>';
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

    if (track.type === 'video') {
        audioPlayer.pause();
        audioPlayer.src = '';
        openLightbox(track);
    } else {
        closeLightbox();
        audioPlayer.src = track.url;
        audioPlayer.play();
    }

    updatePlayButton();
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
    closeLightbox();

    updatePlayButton();
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
        audioPlayer.play();
        isPlaying = true;
    } else {
        audioPlayer.pause();
        isPlaying = false;
    }

    updatePlayButton();
    updateDisplay();
    renderPlaylist();
});

function updatePlayButton() {
    if (isPlaying) {
        btnPlay.innerHTML = '<span style="font-size:1.2em">⏸</span> PAUSE';
    } else {
        btnPlay.innerHTML = '<span style="font-size:1.2em">⏸</span> ▶ PLAY';
    }
}
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

// Lightbox
function openLightbox(track) {
    lightboxVideo.src = track.url;
    lightboxOverlay.classList.add('active');
    lightboxVideo.play();
}

function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    lightboxVideo.pause();
    lightboxVideo.src = '';
}

lightboxClose.addEventListener('click', () => {
    closeLightbox();
    isPlaying = false;
    updatePlayButton();
    updateDisplay();
    renderPlaylist();
});

lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
        closeLightbox();
        isPlaying = false;
        updatePlayButton();
        updateDisplay();
        renderPlaylist();
    }
});

lightboxVideo.addEventListener('ended', () => {
    closeLightbox();
    nextTrack();
});

// Volume
audioPlayer.volume = volumeSlider.value / 100;
let lastVolume = audioPlayer.volume;

volumeSlider.addEventListener('input', () => {
    const vol = volumeSlider.value / 100;
    audioPlayer.volume = vol;
    lastVolume = vol > 0 ? vol : lastVolume;
    updateVolumeIcon(vol);
});

volumeIcon.addEventListener('click', () => {
    if (audioPlayer.volume > 0) {
        lastVolume = audioPlayer.volume;
        audioPlayer.volume = 0;
        volumeSlider.value = 0;
        updateVolumeIcon(0);
    } else {
        audioPlayer.volume = lastVolume;
        volumeSlider.value = Math.round(lastVolume * 100);
        updateVolumeIcon(lastVolume);
    }
});

function updateVolumeIcon(vol) {
    const wave1 = vol > 0 ? '<path d="M14 8c1.5 1 1.5 7 0 8" fill="none" stroke="currentColor" stroke-width="1.5"/>' : '';
    const wave2 = vol >= 0.7 ? '<path d="M17 5c3 2.5 3 11.5 0 14" fill="none" stroke="currentColor" stroke-width="1.5"/>' : '';
    const mute = vol === 0 ? '<line x1="16" y1="6" x2="22" y2="18" stroke="currentColor" stroke-width="1.5"/>' : '';
    volumeIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle"><polygon points="2,9 2,15 6,15 11,19 11,5 6,9"/>${wave1}${wave2}${mute}</svg>`;
}

// Inicializar
updateDisplay();
