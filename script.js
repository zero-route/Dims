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

 // Timeline zigzag reveal (reuse existing keyframes)
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

// Extend general reveal observer to include reveal-fade
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

 // Observer khusus untuk elemen contact (individual, bukan pakai class .reveal generik)
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

// Grup 2 (form) pakai reveal-right, sudah otomatis ke-handle lewat class .reveal-fade/.reveal existing kalau ditambahkan observenya
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