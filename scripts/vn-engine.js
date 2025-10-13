let playerSettings = {
  name: "Anzu"
};

function replacePlaceholders(text) {
  const replacePreservingCase = (match) => {
    const lowerMatch = match.toLowerCase();
    if (lowerMatch === '[anzu]') {
      return playerSettings.name;
    }
    return match;
  };
  const regex = /\[anzu\]/gi;
  return text.replace(regex, replacePreservingCase);
}

function generateDialogues() {
  const root = document.getElementById('vn-root');
  root.innerHTML = '';

  dialogues.forEach(d => {
    let vnPngHtml = '';
    if (d.png && typeof d.png === 'string' && d.png.trim() !== "") {
      const charaImage = d.png.startsWith('chara/') ? d.png : `chara/${d.png}`;
      vnPngHtml = `<div class="vn-png"><img src="${charaImage}" alt=""></div>`;
    }
    root.innerHTML += `
      <div class="vn-container">
        ${vnPngHtml}
        <div class="vn-box">
          <div class="vn-name">${d.name}</div>
          <div class="vn-text" data-original="${d.dialogue.replace(/"/g, '&quot;')}">
            ${replacePlaceholders(d.dialogue)}
          </div>
        </div>
      </div>
    `;
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('playerSettings');
  if (saved) {
    try {
      playerSettings = JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load settings", e);
    }
  }

  generateDialogues();

  // jQuery error handler for missing images in .vn-png
  if (window.jQuery) {
    $('.vn-png img').on('error', function() {
      $(this).parent().remove();
    });
  }

  const allDialogues = document.querySelectorAll('.vn-container');
  const backBtn = document.getElementById('backCircleBtn');
  let currentDialogue = 0;

  allDialogues.forEach((d, i) => d.classList.toggle('active', i === 0));
  backBtn.style.display = 'none';

  document.querySelectorAll('.vn-box').forEach(box => {
    box.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentDialogue < allDialogues.length - 1) {
        allDialogues[currentDialogue].classList.remove('active');
        currentDialogue++;
        allDialogues[currentDialogue].classList.add('active');
        backBtn.style.display = 'flex';
      }
    });
  });

  backBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentDialogue > 0) {
      allDialogues[currentDialogue].classList.remove('active');
      currentDialogue--;
      allDialogues[currentDialogue].classList.add('active');
      if (currentDialogue === 0) backBtn.style.display = 'none';
    }
  });

  document.body.style.overflow = 'hidden';
  window.addEventListener('wheel', e => e.preventDefault(), { passive: false });

  const menuToggle = document.querySelector('.menu-toggle');
  const circleMenu = document.querySelector('.circle-menu');

  menuToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    circleMenu?.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!circleMenu?.contains(e.target)) {
      circleMenu?.classList.remove('open');
    }
  });

  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      circleMenu?.classList.remove('open');
      
      switch(item.textContent.trim()) {
        case 'Settings':
          document.querySelector('.settings-panel').style.display = 'flex';
          document.getElementById('player-name').value = playerSettings.name;
          break;
        case 'Home':
          break;
        case 'Directory':
          break;
      }
    });
  });


  document.querySelector('.save-settings')?.addEventListener('click', () => {
    playerSettings.name = document.getElementById('player-name').value.trim() || "Player";
    localStorage.setItem('playerSettings', JSON.stringify(playerSettings));
    updateDialogueText();
    document.querySelector('.settings-panel').style.display = 'none';
  });

  function updateDialogueText() {
    document.querySelectorAll('.vn-text').forEach(el => {
      const original = el.dataset.original;
      if (original) el.textContent = replacePlaceholders(original);
    });
  }

  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      document.querySelector('.circle-menu')?.classList.remove('open');
      if (window.showDialogue) {
        window.currentDialogueIndex = 0;
        window.showDialogue(0);
      } else {
        location.reload();
      }
    });
  }
});

const settingsPanel = document.getElementById('settings-panel');
const settingsContent = document.querySelector('.settings-content');

document.getElementById('settings-btn').addEventListener('click', () => {
  settingsPanel.style.display = 'flex';
  document.getElementById('player-name').value = playerSettings.name;
  initPronounButtons();
});

settingsPanel.addEventListener('click', (e) => {
  if (e.target === settingsPanel) {
    closeSettings();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && settingsPanel.style.display === 'flex') {
    closeSettings();
  }
});

function closeSettings() {
  settingsPanel.style.display = 'none';
}

document.querySelector('.save-settings').addEventListener('click', () => {
  playerSettings.name = document.getElementById('player-name').value.trim() || "Player";
  saveSettings();
  closeSettings();
});

const bgContainer = document.getElementById('background-container');

let typewriterTimeout;
function typewriterEffect(element, text, speed = 15, step = 2) {
  if (typewriterTimeout) clearTimeout(typewriterTimeout);
  element.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.slice(i, i + step);
      i += step;
      typewriterTimeout = setTimeout(type, speed);
    }
  }
  type();
}


let lastMode = null;
function showDialogue(index) {
  const dialogue = dialogues[index];
  if (!dialogue) return;
  currentDialogueIndex = index;
  const vnPng = document.querySelector('.vn-png img');
  if (vnPng && dialogue.png && typeof dialogue.png === 'string' && dialogue.png.trim() !== "") {
    vnPng.src = dialogue.png.startsWith('chara/') ? dialogue.png : `chara/${dialogue.png}`;
    // Add bounce animation
    vnPng.classList.remove('bounce-img');
    void vnPng.offsetWidth; // Force reflow to restart animation
    vnPng.classList.add('bounce-img');
  }
  document.querySelector('.vn-name').textContent = dialogue.name;
  typewriterEffect(
    document.querySelector('.vn-text'),
    replacePlaceholders(dialogue.dialogue),
    15
  );

   const vnContainer = document.querySelector('.vn-container');
  let currentMode = dialogue.card ? 'card' : 'bg';
  // Remove any previous click listeners to avoid stacking
  const vnBox = vnContainer.querySelector('.vn-box');
  vnBox.onclick = null;

  if (currentMode !== lastMode && (currentMode === 'card' || lastMode === 'card')) {
    bgContainer.style.transition = 'opacity 0.3s ease';
    bgContainer.style.opacity = '0';
    setTimeout(() => {
      if (dialogue.card) {
const isVideo = dialogue.card?.endsWith('.mp4');
const isGif = dialogue.card?.endsWith('.gif');

if (isVideo || isGif) {
  bgContainer.innerHTML = `
    <video autoplay muted loop playsinline style="width:100%; height:100%; object-fit:cover;">
      <source src="card/${dialogue.card}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `;
  bgContainer.style.backgroundImage = '';
  bgContainer.style.filter = 'none';
  bgContainer.style.backgroundColor = 'transparent';
} else {
  bgContainer.innerHTML = ''; // remove any video
  bgContainer.style.backgroundImage = `url(card/${dialogue.card})`;
  bgContainer.style.filter = 'none';
  bgContainer.style.backgroundColor = 'transparent';
}        bgContainer.style.filter = 'none';
        bgContainer.style.backgroundColor = 'transparent';
        vnContainer.style.display = 'flex'; 
        vnContainer.classList.add('centered-card'); 
        vnContainer.querySelector('.vn-png').style.display = 'none';
        vnContainer.querySelector('.vn-box').classList.add('no-triangle');
        vnBox.onclick = (e) => {
          e.stopPropagation();
          if (currentDialogueIndex < dialogues.length - 1) {
            currentDialogueIndex++;
            showDialogue(currentDialogueIndex);
          }
        };
      } else {
        vnContainer.classList.remove('centered-card');
        vnContainer.querySelector('.vn-png').style.display = '';
        vnContainer.querySelector('.vn-box').classList.remove('no-triangle');
        bgContainer.style.backgroundImage = `url(images/${dialogue.bg})`;
        bgContainer.style.filter = 'blur(2.5px) brightness(0.6)';
        bgContainer.style.backgroundColor = 'rgba(16, 16, 16, 0.8)';
        vnContainer.style.display = 'flex';
        bgContainer.onclick = null;
      }
      bgContainer.style.opacity = '1';
    }, 150);
  } else {
    if (dialogue.card) {
        const isVideo = dialogue.card.endsWith('.mp4');
  const isGif = dialogue.card.endsWith('.gif');

  bgContainer.innerHTML = isVideo
    ? `<video autoplay muted loop playsinline style="width:100%; height:100%; object-fit:cover;">
         <source src="card/${dialogue.card}" type="video/mp4">
       </video>`
    : isGif
    ? `<img src="card/${dialogue.card}" style="width:100%; height:100%; object-fit:cover;">`
    : ''; // fallback for static image

  if (!isVideo && !isGif) {
    bgContainer.style.backgroundImage = `url(card/${dialogue.card})`;
  } else {
    bgContainer.style.backgroundImage = '';
  }

  bgContainer.style.filter = 'none';
  bgContainer.style.backgroundColor = 'transparent';
  vnContainer.style.display = 'flex';
  vnContainer.classList.add('centered-card');
  vnContainer.querySelector('.vn-png').style.display = 'none';
  vnContainer.querySelector('.vn-box').classList.add('no-triangle');

  vnBox.onclick = (e) => {
    e.stopPropagation();
    if (currentDialogueIndex < dialogues.length - 1) {
      currentDialogueIndex++;
      showDialogue(currentDialogueIndex);
    }
  };
      bgContainer.style.backgroundImage = `url(card/${dialogue.card})`;
      bgContainer.style.filter = 'none';
      bgContainer.style.backgroundColor = 'transparent';
      vnContainer.style.display = 'flex'; 
      vnContainer.classList.add('centered-card'); 
      vnContainer.querySelector('.vn-png').style.display = 'none';
      vnContainer.querySelector('.vn-box').classList.add('no-triangle');
      vnBox.onclick = (e) => {
        e.stopPropagation();
        if (currentDialogueIndex < dialogues.length - 1) {
          currentDialogueIndex++;
          showDialogue(currentDialogueIndex);
        }
      };
    } else if (dialogue.bg) {
        bgContainer.innerHTML = '';
        bgContainer.style.backgroundImage = `url(images/${dialogue.bg})`;
  bgContainer.style.filter = 'blur(2.5px) brightness(0.6)';
  bgContainer.style.backgroundColor = 'rgba(16, 16, 16, 0.8)';
  vnContainer.style.display = 'flex';
  bgContainer.onclick = null;
    vnContainer.classList.remove('centered-card');
  vnContainer.querySelector('.vn-png').style.display = '';
  vnContainer.querySelector('.vn-box').classList.remove('no-triangle');
      bgContainer.style.backgroundImage = `url(images/${dialogue.bg})`;
      bgContainer.style.filter = 'blur(2.5px) brightness(0.6)';
      bgContainer.style.backgroundColor = 'rgba(16, 16, 16, 0.8)';
      vnContainer.style.display = 'flex';
      bgContainer.onclick = null;
      vnContainer.classList.remove('centered-card');
      vnContainer.querySelector('.vn-png').style.display = '';
      vnContainer.querySelector('.vn-box').classList.remove('no-triangle');
    }
  }
  lastMode = currentMode;
  const backBtn = document.getElementById('backCircleBtn');
  if (backBtn) {
    backBtn.style.display = currentDialogueIndex > 0 ? 'flex' : 'none';
  }

    if (dialogues[index]?.end) {
    document.getElementById("final-next-button").style.display = "block";
  } else {
    document.getElementById("final-next-button").style.display = "none";
  }
}

// Add click handler for the special button
document.getElementById("final-next-button").addEventListener("click", function() {
  document.getElementById("end-popup").style.display = "flex";
});

document.addEventListener('DOMContentLoaded', () => {
  generateDialogues();
  showDialogue(0);
  const vnBox = document.querySelector('.vn-box');
  if (vnBox) {
    vnBox.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!dialogues[currentDialogueIndex]?.card && currentDialogueIndex < dialogues.length - 1) {
        showDialogue(currentDialogueIndex + 1);
      }
    });
  }

  const backBtn = document.getElementById('backCircleBtn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentDialogueIndex > 0) {
        showDialogue(currentDialogueIndex - 1);
      }
    });
  }
});


function handleOrientation() {
  const warning = document.createElement('div');
  warning.id = 'orientation-warning';
  warning.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      z-index: 9999;
      text-align: center;
      padding: 20px;
    ">
      Please rotate your device to landscape mode
    </div>
  `;

  function checkOrientation() {
    if (window.innerWidth < window.innerHeight && window.innerWidth <= 768) {
      document.body.prepend(warning);
    } else {
      const existing = document.getElementById('orientation-warning');
      if (existing) existing.remove();
    }
  }
  checkOrientation();
  
  window.addEventListener('resize', checkOrientation);
}

handleOrientation();

















if (dialogue.card) {
  vnBox.style.opacity = '0';

  bgContainer.style.filter = 'none';
  bgContainer.style.backgroundColor = 'transparent';
  setBackground(dialogue.card);
  bgContainer.style.cursor = 'pointer';

  const newBg = bgContainer.cloneNode(true);
  newBg.id = 'background-container';
  bgContainer.replaceWith(newBg);

  newBg.addEventListener('click', () => {
    isCardMode = false;
    currentDialogueIndex++;
    showDialogue(currentDialogueIndex);
  });

  // Don't set text or name yet
  nameEl.textContent = '';
  textEl.textContent = '';
} else {
  vnBox.style.opacity = '1';
  bgContainer.style.filter = 'blur(2.5px) brightness(0.6)';
  bgContainer.style.backgroundColor = 'rgba(16,16,16,0.8)';
  setBackground(dialogue.bg);
  bgContainer.style.cursor = 'default';

  // Update text
  nameEl.textContent = dialogue.name;
  textEl.textContent = replacePlaceholders(dialogue.dialogue);
}

if (!dialogue.card) {
  const vnBox = document.querySelector('.vn-box');
  vnBox.classList.add('bounce');
  setTimeout(() => vnBox.classList.remove('bounce'), 400);
}

