document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();

    const navHeight = document.querySelector('.top-nav')?.offsetHeight || 0;
    const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
  document.body.classList.add('loading');
  const typingTextElement = document.getElementById('typing-text');
  const iconHTML = '<i class="devicon-ionic-original"></i>';
  const textToType = " Zero Route";
  let charIndex = 0;
  const typingSpeed = 120;

  if (typingTextElement) {
    typingTextElement.innerHTML = iconHTML;
    const textSpan = document.createElement('span');
    typingTextElement.appendChild(textSpan);

    const typingInterval = setInterval(() => {
      if (charIndex < textToType.length) {
        textSpan.textContent += textToType.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
  }

  const loadingBar = document.getElementById("loading");
  const header = document.querySelector("header");
  const mainPage = document.getElementById("main-page");

  if (loadingBar) {
    loadingBar.addEventListener("animationend", () => {
      header.classList.add("fade-out");
      setTimeout(() => {
        header.style.display = "none";
        mainPage.classList.add("show");
        document.body.classList.remove('loading');
      }, 800);
    });
  }

  const rolesList = [
    'Network Engineer',
    'Penetration Testing',
    'Full-Stack Developer',
    'Automation Engineer',
    'Robotic Engineer',
    'Electrical Engineer',
    'Tech Enthusiast'
  ];

  const skillsList = [
    'HTML5',
    'CSS3',
    'TailwindCSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'PHP',
    'Laravel',
    'Ruby',
    'Express.js',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'GitLab',
    'GitHub',
    'Python',
    'C++',
    'C',
    'Java',
    'Arduino'
  ];

  let isStarted = false;

  if (mainPage) {
    const observer = new MutationObserver(() => {
      if (mainPage.classList.contains("show") && !isStarted) {
        isStarted = true;
        createTypingEffect("role-typing", rolesList, 300);
        createTypingEffect("skill-typing", skillsList, 600);
        createTypingEffect("role-typing2", rolesList, 200, false);
      }
    });

    observer.observe(mainPage, { attributes: true, attributeFilter: ["class"] });
  }
});

function createTypingEffect(elementId, textList, startDelay = 0, withQuotes = true) {
  const typingElement = document.getElementById(elementId);
  if (!typingElement) return;

  let textIndex = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = withQuotes ? `"${textList[textIndex]}"` : textList[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingElement.textContent = currentText.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 50 : 90;

    if (!isDeleting && charIdx === currentText.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textList.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }

  setTimeout(typeEffect, startDelay);
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

fetch('https://api.github.com/users/zero-route')
  .then(res => res.json())
  .then(data => {
    const repoCountEl = document.getElementById('repo-count');
    if (repoCountEl) repoCountEl.textContent = data.public_repos;
  })
  .catch(() => {
    const repoCountEl = document.getElementById('repo-count');
    if (repoCountEl) repoCountEl.textContent = '-';
  });

function typeOnce(elementId, speed = 15, startDelay = 0) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const text = el.getAttribute('data-text') || '';
  el.textContent = '';
  el.classList.add('typing-cursor');

  let i = 0;

  function step() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed);
    } else {
      el.classList.remove('typing-cursor');
    }
  }

  setTimeout(step, startDelay);
}

const aboutDescEl = document.getElementById('about-desc');

if (aboutDescEl) {
  const aboutDescObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeOnce('about-desc', 15, 200);
        aboutDescObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  aboutDescObserver.observe(aboutDescEl);
}

// Timeline zigzag reveal
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach(el => timelineObserver.observe(el));
const timelineEl = document.querySelector('.timeline');
const timelineFillEl = document.getElementById('timeline-fill');

function updateTimelineFill() {
  if (!timelineEl || !timelineFillEl) return;
  const rect = timelineEl.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
  progress = Math.max(0, Math.min(1, progress));

  timelineFillEl.style.height = (progress * 100) + '%';
}

window.addEventListener('scroll', updateTimelineFill);
window.addEventListener('resize', updateTimelineFill);
updateTimelineFill();

document.querySelectorAll('.reveal-fade').forEach(el => revealObserver.observe(el));

// Tab switching logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabIndicator = document.getElementById('tab-indicator');
const tabPanels = document.querySelectorAll('.tab-panel');

function replayPanelReveal(panel) {
  const items = panel.querySelectorAll('.panel-reveal');
  items.forEach(item => {
    item.classList.remove('in-view');
    void item.offsetWidth;
    item.classList.add('in-view');
  });
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.getAttribute('data-tab');
    const index = parseInt(btn.getAttribute('data-index'));

    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    tabIndicator.style.transform = `translateX(${index * 100}%)`;

    tabPanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === `panel-${targetTab}`) {
        panel.classList.add('active');
        replayPanelReveal(panel);
      }
    });
  });
});

const expertiseSection = document.getElementById('expertise');
if (expertiseSection) {
  const expertiseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const firstPanel = document.getElementById('panel-project');
        replayPanelReveal(firstPanel);
        expertiseObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  expertiseObserver.observe(expertiseSection);
}

// Contact reveal
const contactRevealEls = document.querySelectorAll(
  '.contact-info-title, .contact-info-desc, .contact-detail, .contact-socials a, .available-box, .footer-socials a'
);

const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      contactObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

contactRevealEls.forEach(el => contactObserver.observe(el));

document.querySelectorAll('.contact-form-wrapper.reveal-right').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateX(60px)';
  const formObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideFadeRightToLeft 0.8s ease-out forwards';
        formObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  formObs.observe(el);
});

// ===== MUSIC PLAYER (YouTube via Worker) =====
const WORKER_ENDPOINT = "https://yt-music-portofolio.iostream911.workers.dev/";

const musicToggleBtn = document.getElementById('music-toggle-btn');
const musicOverlay = document.getElementById('music-overlay');
const musicCloseBtn = document.getElementById('music-close-btn');
const musicSearchInput = document.getElementById('music-search-input');
const musicSearchBtn = document.getElementById('music-search-btn');
const musicResults = document.getElementById('music-results');
const npThumb = document.getElementById('np-thumb');
const npTitle = document.getElementById('np-title');
const npChannel = document.getElementById('np-channel');
const npPlayPause = document.getElementById('np-playpause');

const viewSearch = document.getElementById('view-search');
const viewNowPlaying = document.getElementById('view-nowplaying');
const npBackBtn = document.getElementById('np-back-btn');
const musicCloseBtn2 = document.getElementById('music-close-btn-2');
const vinylDisc = document.getElementById('vinyl-disc');
const vinylLabel = document.getElementById('vinyl-label');
const npFullTitle = document.getElementById('np-full-title');
const npFullChannel = document.getElementById('np-full-channel');
const npProgressBar = document.getElementById('np-progress-bar');
const npCurrentTime = document.getElementById('np-current-time');
const npDuration = document.getElementById('np-duration');
const npFullPlayPause = document.getElementById('np-full-playpause');
const npPrevBtn = document.getElementById('np-prev-btn');
const npNextBtn = document.getElementById('np-next-btn');
const npVolumeBar = document.getElementById('np-volume-bar');

const miniPlayer = document.getElementById('mini-player');
const miniThumbWrap = document.getElementById('mini-thumb-wrap');
const miniThumb = document.getElementById('mini-thumb');
const miniTitle = document.getElementById('mini-title');
const miniChannel = document.getElementById('mini-channel');
const miniPlayPause = document.getElementById('mini-playpause');
const miniPrev = document.getElementById('mini-prev');
const miniNext = document.getElementById('mini-next');
const miniProgressFill = document.getElementById('mini-progress-fill');

let ytPlayer = null;
let isPlayerReady = false;
let isPlaying = false;
let pendingVideoId = null;
let currentQueue = [];
let currentIndex = -1;
let progressInterval = null;
let hasPlayedOnce = false;

musicToggleBtn?.addEventListener('click', () => {
  musicOverlay.classList.add('open');
});

[musicCloseBtn, musicCloseBtn2].forEach(btn => {
  btn?.addEventListener('click', () => musicOverlay.classList.remove('open'));
});

musicOverlay?.addEventListener('click', (e) => {
  if (e.target === musicOverlay) musicOverlay.classList.remove('open');
});

miniPlayer?.addEventListener('click', (e) => {
  if (e.target.closest('.mini-controls')) return;
  musicOverlay.classList.add('open');
  if (currentIndex >= 0) switchView('nowplaying');
});

function switchView(viewName) {
  viewSearch.classList.toggle('active', viewName === 'search');
  viewNowPlaying.classList.toggle('active', viewName === 'nowplaying');
}

npBackBtn?.addEventListener('click', () => switchView('search'));

document.getElementById('music-now-playing')?.addEventListener('click', () => {
  if (currentIndex >= 0) switchView('nowplaying');
});

async function searchMusic(query) {
  musicResults.innerHTML = '<p class="music-hint">Mencari...</p>';
  try {
    const res = await fetch(`${WORKER_ENDPOINT}?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      musicResults.innerHTML = '<p class="music-hint">Tidak ada hasil.</p>';
      return;
    }

    currentQueue = data.items.filter(item => item.id && item.id.videoId);
    musicResults.innerHTML = '';

    currentQueue.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'music-result-item';
      el.innerHTML = `
        <img src="${item.snippet.thumbnails.default.url}" alt="">
        <div class="music-result-info">
          <span>${item.snippet.title}</span>
          <span>${item.snippet.channelTitle}</span>
        </div>
      `;
      el.addEventListener('click', () => playTrackAt(index, el));
      musicResults.appendChild(el);
    });
  } catch (err) {
    musicResults.innerHTML = '<p class="music-hint">Gagal memuat, coba lagi.</p>';
  }
}

musicSearchBtn?.addEventListener('click', () => {
  const q = musicSearchInput.value.trim();
  if (q) searchMusic(q);
});

musicSearchInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const q = musicSearchInput.value.trim();
    if (q) searchMusic(q);
  }
});

function setLoadingState(el, loading) {
  if (!el) return;
  el.classList.toggle('is-loading', loading);
}

function playTrackAt(index, clickedEl = null) {
  if (index < 0 || index >= currentQueue.length) return;
  currentIndex = index;
  const item = currentQueue[index];
  const videoId = item.id.videoId;
  const thumbUrl = item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url;

  // Loading indicator di hasil pencarian yang diklik
  if (clickedEl) setLoadingState(clickedEl, true);

  npThumb.src = thumbUrl;
  npTitle.textContent = item.snippet.title;
  npChannel.textContent = item.snippet.channelTitle;
  npFullTitle.textContent = item.snippet.title;
  npFullChannel.textContent = item.snippet.channelTitle;

  vinylLabel.src = thumbUrl;
  vinylLabel.classList.remove('loaded');
  vinylLabel.onload = () => vinylLabel.classList.add('loaded');

  miniThumb.src = thumbUrl;
  miniTitle.textContent = item.snippet.title;
  miniChannel.textContent = item.snippet.channelTitle;

  if (!isPlayerReady) {
    pendingVideoId = videoId;
    return;
  }

  vinylDisc.classList.add('is-loading');
  ytPlayer.loadVideoById(videoId);
  isPlaying = true;
  hasPlayedOnce = true;
  switchView('nowplaying');
  updatePlayPauseIcon();
  showMiniPlayer();
}

function showMiniPlayer() {
  miniPlayer?.classList.add('show');
}

function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-player-hidden', {
    height: '0',
    width: '0',
    playerVars: { autoplay: 0, controls: 0 },
    events: {
      onReady: () => {
        isPlayerReady = true;
        ytPlayer.setVolume(npVolumeBar ? npVolumeBar.value : 80);
        if (pendingVideoId) {
          vinylDisc.classList.add('is-loading');
          ytPlayer.loadVideoById(pendingVideoId);
          isPlaying = true;
          hasPlayedOnce = true;
          updatePlayPauseIcon();
          showMiniPlayer();
          pendingVideoId = null;
        }
      },
      onStateChange: (event) => {
        // Buffering (loading) state
        if (event.data === YT.PlayerState.BUFFERING) {
          vinylDisc.classList.add('is-loading');
        } else {
          vinylDisc.classList.remove('is-loading');
          document.querySelectorAll('.music-result-item.is-loading').forEach(el => {
            el.classList.remove('is-loading');
          });
        }

        isPlaying = event.data === YT.PlayerState.PLAYING;
        updatePlayPauseIcon();

        if (event.data === YT.PlayerState.PLAYING) {
          startProgressTracking();
        } else {
          stopProgressTracking();
        }

        if (event.data === YT.PlayerState.ENDED) {
          playNext();
        }
      }
    }
  });
};

function updatePlayPauseIcon() {
  const icon = isPlaying ? 'fa-pause' : 'fa-play';
  npPlayPause.innerHTML = `<i class="fa-solid ${icon}"></i>`;
  npFullPlayPause.innerHTML = `<i class="fa-solid ${icon}"></i>`;
  if (miniPlayPause) miniPlayPause.innerHTML = `<i class="fa-solid ${icon}"></i>`;
  vinylDisc.classList.toggle('spinning', isPlaying);
  miniThumbWrap?.classList.toggle('spinning', isPlaying);
}

function togglePlayPause() {
  if (!ytPlayer) return;
  if (isPlaying) {
    ytPlayer.pauseVideo();
  } else {
    ytPlayer.playVideo();
  }
}

npPlayPause?.addEventListener('click', togglePlayPause);
npFullPlayPause?.addEventListener('click', togglePlayPause);
miniPlayPause?.addEventListener('click', togglePlayPause);

function playNext() {
  if (currentQueue.length === 0) return;
  const nextIndex = (currentIndex + 1) % currentQueue.length;
  playTrackAt(nextIndex);
}

function playPrev() {
  if (currentQueue.length === 0) return;
  const prevIndex = (currentIndex - 1 + currentQueue.length) % currentQueue.length;
  playTrackAt(prevIndex);
}

npNextBtn?.addEventListener('click', playNext);
npPrevBtn?.addEventListener('click', playPrev);
miniNext?.addEventListener('click', playNext);
miniPrev?.addEventListener('click', playPrev);

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function startProgressTracking() {
  stopProgressTracking();
  progressInterval = setInterval(() => {
    if (!ytPlayer || typeof ytPlayer.getCurrentTime !== 'function') return;
    const current = ytPlayer.getCurrentTime();
    const duration = ytPlayer.getDuration();

    if (duration > 0) {
      const pct = (current / duration) * 100;
      npProgressBar.value = pct;
      npCurrentTime.textContent = formatTime(current);
      npDuration.textContent = formatTime(duration);
      if (miniProgressFill) miniProgressFill.style.width = pct + '%';
    }
  }, 500);
}

function stopProgressTracking() {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
}

npProgressBar?.addEventListener('input', () => {
  if (!ytPlayer || typeof ytPlayer.getDuration !== 'function') return;
  const duration = ytPlayer.getDuration();
  const seekTo = (npProgressBar.value / 100) * duration;
  ytPlayer.seekTo(seekTo, true);
});

npVolumeBar?.addEventListener('input', () => {
  if (!ytPlayer) return;
  ytPlayer.setVolume(npVolumeBar.value);
});

loadYouTubeAPI();

  // ===== CHATBOT (Zero-Route Assistant via Gemini Worker) =====
const CHATBOT_ENDPOINT = "https://gemini-chat-bot.iostream911.workers.dev/";

const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
const chatbotPanel = document.getElementById('chatbot-panel');
const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSendBtn = document.getElementById('chatbot-send-btn');

let chatHistory = [];

chatbotToggleBtn?.addEventListener('click', () => {
  chatbotPanel.classList.toggle('open');
});

chatbotCloseBtn?.addEventListener('click', () => {
  chatbotPanel.classList.remove('open');
});

function addChatMessage(text, sender) {
  const el = document.createElement('div');
  el.className = `chatbot-msg chatbot-msg-${sender}`;
  el.textContent = text;
  chatbotMessages.appendChild(el);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  return el;
}

async function sendChatMessage() {
  const text = chatbotInput.value.trim();
  if (!text) return;

  addChatMessage(text, 'user');
  chatbotInput.value = '';

  const loadingEl = document.createElement('div');
  loadingEl.className = 'chatbot-msg chatbot-msg-loading';
  loadingEl.textContent = 'Mengetik...';
  chatbotMessages.appendChild(loadingEl);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  try {
    const res = await fetch(CHATBOT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: chatHistory })
    });
    const data = await res.json();

    loadingEl.remove();
    addChatMessage(data.reply, 'bot');

    chatHistory.push({ role: 'user', parts: [{ text }] });
    chatHistory.push({ role: 'model', parts: [{ text: data.reply }] });

    // Batasi history biar payload nggak makin besar
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

  } catch (err) {
    loadingEl.remove();
    addChatMessage('Maaf, terjadi kesalahan koneksi.', 'bot');
  }
}

chatbotSendBtn?.addEventListener('click', sendChatMessage);
chatbotInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendChatMessage();
});