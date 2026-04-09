// LOGIN VALIDATION
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (email === "" || password === "") {
      alert("Please enter both email and password.");
      return;
    }

    window.location.href = "welcome.html";
  });
}

// SIGNUP VALIDATION
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (email === "" || password === "") {
      alert("Please enter both email and password.");
      return;
    }

    alert("Registered successfully! Please login.");
    window.location.href = "index.html"; // change if your login page has a different name
  });
}

// SIGN UP BUTTON LOGIC (index.html)
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  let pressTimer;
  let longPressTriggered = false;

  // --- Admin Modal Logic ---
  const adminModal    = document.getElementById("adminModal");
  const adminPassInput= document.getElementById("adminPassInput");
  const adminSubmitBtn= document.getElementById("adminSubmitBtn");
  const adminCancelBtn= document.getElementById("adminCancelBtn");
  const adminError    = document.getElementById("adminError");

  function openAdminModal() {
    if (!adminModal) return;
    adminPassInput.value = "";
    if (adminError) adminError.style.display = "none";
    adminModal.style.display = "flex";
    setTimeout(() => adminPassInput.focus(), 50);
  }

  function closeAdminModal() {
    if (adminModal) adminModal.style.display = "none";
  }

  function submitAdminPassword() {
    const pw = adminPassInput ? adminPassInput.value.trim() : "";
    // Change "YOUR_SECRET_KEY_HERE" below to whatever password you want to use.
    if (pw === "YOUR_SECRET_KEY_HERE") {
      closeAdminModal();
      window.location.href = "admin.html";
    } else {
      if (adminError) adminError.style.display = "block";
      if (adminPassInput) adminPassInput.value = "";
    }
  }

  if (adminSubmitBtn) adminSubmitBtn.addEventListener("click", submitAdminPassword);
  if (adminCancelBtn) adminCancelBtn.addEventListener("click", closeAdminModal);
  if (adminPassInput) {
    adminPassInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") submitAdminPassword();
      if (e.key === "Escape") closeAdminModal();
    });
  }
  // Close on backdrop click
  if (adminModal) {
    adminModal.addEventListener("click", (e) => {
      if (e.target === adminModal) closeAdminModal();
    });
  }

  // --- Long Press Detection ---
  const startHold = () => {
    longPressTriggered = false;
    pressTimer = setTimeout(() => {
      longPressTriggered = true;
      openAdminModal();
    }, 1000);
  };

  const endHold = () => {
    clearTimeout(pressTimer);
  };

  signupBtn.addEventListener("mousedown",  startHold);
  signupBtn.addEventListener("mouseup",    endHold);
  signupBtn.addEventListener("mouseleave", endHold);
  signupBtn.addEventListener("touchstart", startHold, { passive: true });
  signupBtn.addEventListener("touchend",   endHold);

  signupBtn.addEventListener("click", () => {
    if (!longPressTriggered) {
      window.location.href = "signup.html";
    }
    longPressTriggered = false;
  });
}


// ─── ADMIN BROADCAST MESSAGE ──────────────────────────────────────────────────

// Admin Panel: Send / Clear message
const sendMsgBtn    = document.getElementById("sendMsgBtn");
const clearMsgBtn   = document.getElementById("clearMsgBtn");
const broadcastInput= document.getElementById("broadcastInput");
const broadcastStatus = document.getElementById("broadcastStatus");

if (sendMsgBtn && broadcastInput) {
  // Populate textarea with existing message (if any)
  const existing = JSON.parse(localStorage.getItem("adminBroadcast") || "null");
  if (existing && existing.text) broadcastInput.value = existing.text;

  sendMsgBtn.addEventListener("click", () => {
    const msg = broadcastInput.value.trim();
    if (!msg) return;
    const data = { text: msg, time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) };
    localStorage.setItem("adminBroadcast", JSON.stringify(data));
    if (broadcastStatus) {
      broadcastStatus.textContent = "✅ Message sent to all users!";
      broadcastStatus.style.color = "#00ff88";
      broadcastStatus.style.display = "block";
      setTimeout(() => { broadcastStatus.style.display = "none"; }, 3000);
    }
  });
}

if (clearMsgBtn) {
  clearMsgBtn.addEventListener("click", () => {
    localStorage.removeItem("adminBroadcast");
    if (broadcastInput) broadcastInput.value = "";
    if (broadcastStatus) {
      broadcastStatus.textContent = "🗑️ Message cleared.";
      broadcastStatus.style.color = "#f6a623";
      broadcastStatus.style.display = "block";
      setTimeout(() => { broadcastStatus.style.display = "none"; }, 2500);
    }
  });
}

// Welcome Page: Load and show message banner
function loadAdminMessage() {
  const banner   = document.getElementById("adminMsgBanner");
  const msgText  = document.getElementById("adminMsgText");
  const msgTime  = document.getElementById("adminMsgTime");
  if (!banner || !msgText) return;

  const data = JSON.parse(localStorage.getItem("adminBroadcast") || "null");
  if (data && data.text) {
    msgText.textContent = data.text;
    if (msgTime) msgTime.textContent = data.time || "";
    banner.style.display = "flex";
  } else {
    banner.style.display = "none";
  }
}
loadAdminMessage();

// ─── TIER TOGGLE (Admin Panel) ───────────────────────────────────────────────
let currentTier = "free"; // default to free

function setTier(tier) {
  currentTier = tier;
  const freeBtn    = document.getElementById("tierFree");
  const premiumBtn = document.getElementById("tierPremium");
  if (freeBtn && premiumBtn) {
    if (tier === "free") {
      freeBtn.classList.add("active");
      premiumBtn.classList.remove("active");
    } else {
      premiumBtn.classList.add("active");
      freeBtn.classList.remove("active");
    }
  }
}

// ADMIN FORM SUBMISSION
const signalForm = document.getElementById("signalForm");
if (signalForm) {
  signalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ensure minute is always two digits
    let minuteValue = document.getElementById("minute").value;
    if (minuteValue === "" || isNaN(minuteValue)) {
      alert("Please enter a valid minute (00–59).");
      return;
    }
    if (minuteValue < 0 || minuteValue > 59) {
      alert("Minute must be between 00 and 59.");
      return;
    }
    minuteValue = minuteValue.padStart(2, "0");

    const signal = {
      pair:       document.getElementById("pair").value,
      utcZone:    document.getElementById("utcZone").value,
      hour:       document.getElementById("hour").value,
      minute:     minuteValue,
      direction:  document.getElementById("direction").value,
      confidence: document.getElementById("confidence").value,
      martingale: document.getElementById("martingale").value,
      result:     "Pending",
      tier:       currentTier   // "free" or "premium"
    };

    let signals = JSON.parse(localStorage.getItem("tradingSignals")) || [];
    signals.push(signal);
    localStorage.setItem("tradingSignals", JSON.stringify(signals));

    alert("Signal sent!");
    displayAdminSignals();
  });
}

// UPDATE SIGNAL RESULT
function updateSignalResult(index, outcome) {
  let signals = JSON.parse(localStorage.getItem("tradingSignals")) || [];
  if (signals[index]) {
    signals[index].result = outcome; // "Profit" or "Loss"
    localStorage.setItem("tradingSignals", JSON.stringify(signals));
    displayAdminSignals();
    displayWelcomeSignals(); // refresh Welcome too
  }
}

// DELETE SIGNAL — no confirm() to avoid browser suppression
function deleteTradingSignal(index) {
  let signals = JSON.parse(localStorage.getItem("tradingSignals")) || [];
  const deleteIdx = parseInt(index, 10);
  if (!isNaN(deleteIdx) && deleteIdx >= 0 && deleteIdx < signals.length) {
    signals.splice(deleteIdx, 1);
    localStorage.setItem("tradingSignals", JSON.stringify(signals));
    displayAdminSignals();
    displayWelcomeSignals();
  }
}

// DISPLAY SIGNALS ON ADMIN PAGE (NEWEST FIRST)
function displayAdminSignals() {
  const signalList = document.getElementById("signalList");
  if (!signalList) return;

  signalList.innerHTML = "";
  const signals = JSON.parse(localStorage.getItem("tradingSignals")) || [];

  if (signals.length === 0) {
    signalList.innerHTML = '<li style="text-align:center;color:var(--text-dim)">No signals yet.</li>';
    return;
  }

  for (let i = signals.length - 1; i >= 0; i--) {
    const s = signals[i];
    const actualIndex = i; // capture for closure

    const li = document.createElement("li");

    // Signal info div
    const infoDiv = document.createElement("div");
    infoDiv.className = "signal-info";
    const tierLabel = s.tier === "premium"
      ? '<span class="tier-badge premium-badge">👑 Premium</span>'
      : '<span class="tier-badge free-badge">🌐 Free</span>';
    infoDiv.innerHTML = `${tierLabel} <strong>${s.pair}</strong> | ${s.utcZone} ${s.hour}:${s.minute} | ${s.direction} | ${s.confidence}% | ${s.martingale} | Result: <span class="${s.result.toLowerCase()}">${s.result}</span>`;

    // Action buttons div
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "action-buttons";

    const profitBtn = document.createElement("button");
    profitBtn.type = "button";
    profitBtn.textContent = "Profit";
    profitBtn.addEventListener("click", function() { updateSignalResult(actualIndex, "Profit"); });

    const lossBtn = document.createElement("button");
    lossBtn.type = "button";
    lossBtn.textContent = "Loss";
    lossBtn.addEventListener("click", function() { updateSignalResult(actualIndex, "Loss"); });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function() { deleteTradingSignal(actualIndex); });

    actionsDiv.appendChild(profitBtn);
    actionsDiv.appendChild(lossBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(infoDiv);
    li.appendChild(actionsDiv);
    signalList.appendChild(li);
  }
}
displayAdminSignals();

// DISPLAY ALL SIGNALS ON WELCOME PAGE (TABLE) — filtered by user plan
function displayWelcomeSignals() {
  const signalTableContainer = document.getElementById("signalTableContainer");
  if (!signalTableContainer) return;

  const signals = JSON.parse(localStorage.getItem("tradingSignals")) || [];

  // ── Check plan expiry ──────────────────────────────────────────
  // Since payment is not yet implemented, always force free plan
  // and clear any stale premium that was set during testing.
  localStorage.removeItem("userPlan");
  localStorage.removeItem("planName");
  localStorage.removeItem("planExpiry");
  const userPlan = "free";

  // ── Update plan badge (always Free until payment is added) ─────
  const planBadge = document.getElementById("planBadge");
  if (planBadge) {
    planBadge.textContent = "🌐 Free Plan";
    planBadge.className   = "plan-badge free-plan";
  }
  // VIP button is ALWAYS visible (payment coming soon)
  const vipBtn = document.getElementById("vipBtn");
  if (vipBtn) vipBtn.style.display = "";

  // ── Stamp last updated time ────────────────────────────────────
  const lastUpdatedEl = document.getElementById("lastUpdated");
  if (lastUpdatedEl) {
    const now = new Date();
    lastUpdatedEl.textContent = "Last updated: " + now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  // ── Spin the refresh icon briefly ─────────────────────────────
  const refreshIcon = document.querySelector(".refresh-icon");
  if (refreshIcon) {
    refreshIcon.classList.add("spinning");
    setTimeout(() => refreshIcon.classList.remove("spinning"), 600);
  }

  if (signals.length === 0) {
    signalTableContainer.innerHTML = "<p>No signals available yet.</p>";
    return;
  }

  let cardsHTML = '<div class="signals-grid">';

  for (let i = signals.length - 1; i >= 0; i--) {
    const s = signals[i];
    const signalTier = s.tier || "free";
    const isLocked   = signalTier === "premium" && userPlan !== "premium";
    const resultClass = s.result ? s.result.toLowerCase() : "pending";
    const dirClass    = s.direction ? s.direction.toLowerCase() : "";
    const tierBadge   = signalTier === "premium"
      ? '<span class="tier-badge premium-badge">👑 Premium</span>'
      : '<span class="tier-badge free-badge">🌐 Free</span>';

    if (isLocked) {
      cardsHTML += `
        <div class="signal-card locked-card">
          ${tierBadge}
          <div class="locked-card-body">
            <span class="lock-icon">🔒</span>
            <div>
              <div class="locked-title">Premium Signal</div>
              <div class="locked-sub upgrade-hint">Upgrade to unlock</div>
            </div>
          </div>
        </div>`;
    } else {
      const confidenceWidth = parseInt(s.confidence) || 50;
      cardsHTML += `
        <div class="signal-card">
          <div class="sc-header">
            <span class="sc-pair">${s.pair || "—"}</span>
            <span class="sc-direction ${dirClass}">${s.direction || "—"}</span>
          </div>
          <div class="sc-meta">
            <div class="sc-meta-item">
              <span class="sc-label">🕐 Time</span>
              <span class="sc-value">${s.utcZone || ""} &nbsp;${s.hour || "00"}:${s.minute || "00"}</span>
            </div>
            <div class="sc-meta-item">
              <span class="sc-label">🎯 Confidence</span>
              <span class="sc-value">${s.confidence || 50}%</span>
            </div>
            <div class="sc-meta-item" style="grid-column: 1 / -1;">
              <span class="sc-label">🔁 Martingale</span>
              <span class="sc-value">${s.martingale || "None"}</span>
            </div>
          </div>
          <div class="sc-confidence-bar">
            <div class="sc-confidence-fill" style="width:${confidenceWidth}%"></div>
          </div>
          <div class="sc-footer">
            <div class="sc-result-wrap">
              <span class="sc-result-label">Result</span>
              <span class="sc-result-pill ${resultClass}">${s.result || "Pending"}</span>
            </div>
            ${tierBadge}
          </div>
        </div>`;
    }
  }

  cardsHTML += '</div>';
  signalTableContainer.innerHTML = cardsHTML;
}
displayWelcomeSignals(); // Call immediately

// LOGOUT BUTTON
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    // Change this if your login page has a different name
    window.location.href = "index.html";
  });
}

// SEARCH BAR FOR CURRENCY PAIR
// SEARCH BAR FOR CURRENCY PAIR
const searchPair = document.getElementById("searchPair");
const pairDropdown = document.getElementById("pair");
if (searchPair && pairDropdown) {
  searchPair.addEventListener("input", () => {
    const searchValue = searchPair.value.toUpperCase();
    for (let i = 0; i < pairDropdown.options.length; i++) {
      const option = pairDropdown.options[i];
      if (option.value.toUpperCase().includes(searchValue)) {
        pairDropdown.insertBefore(option, pairDropdown.options[0]);
        pairDropdown.selectedIndex = 0;
        break;
      }
    }
  });
}

// ─── REAL-TIME PUSH NOTIFICATIONS (Cross-Tab Sync) ─────────────────────────

// Play a subtle notification chime using Web Audio API
function playNotificationSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Create an oscillator for a short futuristic beep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // High pitch (A5)
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1); 
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.warn("Audio play blocked/failed:", e);
  }
}

// Listen for updates from the Admin panel in other tabs
window.addEventListener('storage', (e) => {
  // 1. Trading signal updates
  if (e.key === 'tradingSignals') {
    const oldVals = JSON.parse(e.oldValue || '[]');
    const newVals = JSON.parse(e.newValue || '[]');
    
    // If a NEW signal was added, ring the notification bell
    if (newVals.length > oldVals.length) {
      playNotificationSound();
    }
    
    // Automatically update UI without refreshing
    if (typeof displayWelcomeSignals === 'function') displayWelcomeSignals();
    if (typeof displayAdminSignals === 'function') displayAdminSignals();
  }
  
  // 2. Admin Broadcast message updates
  if (e.key === 'adminBroadcast') {
    const oldMsg = JSON.parse(e.oldValue || 'null');
    const newMsg = JSON.parse(e.newValue || 'null');
    
    // If a NEW message was sent (not just cleared), ring the bell
    if (newMsg !== null && (oldMsg === null || newMsg.text !== oldMsg.text)) {
      playNotificationSound();
    }
    
    if (typeof loadAdminMessage === 'function') loadAdminMessage();
  }
});
