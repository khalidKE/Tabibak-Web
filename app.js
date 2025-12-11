// Tabibak Web Demo Interaction Layer
const state = {
  role: "patient",
  language: "en",
  callState: "connecting",
  muted: false,
  camera: true,
  screenshare: false,
  recording: true,
  bookingFilters: {
    specialty: "All",
    location: "All",
    type: "All",
    search: "",
  },
  nearbyFilters: {
    specialty: "All",
    distance: 15,
  },
  settings: {
    notifications: { push: true, email: true, sms: false },
    location: true,
    theme: "dark",
    language: "English",
    region: "Egypt",
  },
};

const routeMap = [
  { id: "splash", label: "Splash", target: "/splash", note: "Brand, secure load" },
  { id: "onboarding", label: "Onboarding", target: "/onboarding", note: "3 slides, imagery" },
  { id: "login", label: "Login", target: "/login", note: "Phone + password" },
  { id: "signup", label: "Signup", target: "/signup", note: "Role-aware" },
  { id: "patientHome", label: "Patient -> Home", target: "/home", note: "Quick actions" },
  { id: "doctorDashboard", label: "Doctor -> Dashboard", target: "/doctor-dashboard", note: "Status + stats" },
  { id: "booking", label: "Booking", target: "/booking", note: "Types, notes, confirm" },
  { id: "telemed", label: "Telemedicine", target: "/telemedicine", note: "Call states" },
  { id: "chat", label: "Chat", target: "/chat", note: "Voice/video actions" },
  { id: "records", label: "Medical file", target: "/records", note: "Tabs + modals" },
  { id: "prescriptions", label: "Prescriptions", target: "/prescriptions", note: "Tabs + QR placeholder" },
  { id: "settings", label: "Settings", target: "/settings", note: "Theme, language" },
];

const authSteps = [
  { title: "Splash", detail: "Fast brand handoff, secure load, redirects to onboarding.", status: "ready" },
  { title: "Onboarding carousel", detail: "3 slides, assets-based imagery, localization scaffold.", status: "ready" },
  { title: "Login", detail: "Phone + password, role dropdown (patient/doctor). Validation and terms.", status: "ready" },
  { title: "Signup (patient)", detail: "Age, gender picker, emergency contact, consent checkbox.", status: "ready" },
  { title: "Signup (doctor)", detail: "Specialization, experience, license, uploads, location permission.", status: "ready" },
  { title: "Forgot password", detail: "Placeholder route; email/SMS flow to be wired.", status: "coming soon" },
];

const patientActions = [
  { title: "Find doctors", desc: "Search by specialty, rating, location with filters and availability chips.", meta: "Quick action | Discovery" },
  { title: "Book appointment", desc: "Appointment types: in-person, video, follow-up, emergency, routine.", meta: "Booking flow" },
  { title: "Medical file", desc: "History cards, status, record detail modal, add record, book follow-up.", meta: "Records" },
  { title: "Symptom checker", desc: "Free text + common symptoms; mock analysis suggests specialists & urgency.", meta: "AI helper" },
  { title: "Nearby doctors", desc: "Current-location button, distance filter, availability aware cards.", meta: "Maps" },
  { title: "Chat", desc: "Doctor-patient messaging, attachments sheet, call actions.", meta: "Messaging" },
  { title: "Settings", desc: "Notifications, theme, language, privacy, region placeholders.", meta: "Preferences" },
  { title: "Notifications modal", desc: "Alerts for appointments, records, prescriptions.", meta: "Alerts" },
  { title: "Chatbot FAB", desc: "Shortcuts: symptom check, doctor search, booking, advice routes.", meta: "Assistant" },
];

const doctorActions = [
  { title: "Online/offline toggle", desc: "UserModeService streams status, last seen, location.", meta: "Presence" },
  { title: "Quick stats", desc: "Appointments today, active patients, pending reports, earnings.", meta: "Dashboard" },
  { title: "Schedule & appointments", desc: "Manage/reschedule/cancel/complete with diagnosis + prescription notes.", meta: "Operations" },
  { title: "Prescriptions", desc: "Create/complete/refill; digital/QR placeholders.", meta: "Rx" },
  { title: "Patient records", desc: "Recent patients list, last/next visits, status.", meta: "Records" },
  { title: "Chat support", desc: "Messaging with call options, attachments sheet.", meta: "Messaging" },
  { title: "Earnings & reports", desc: "Quick actions for payouts and reports (placeholder).", meta: "Finance" },
  { title: "Emergency toggle", desc: "Status FAB for emergencies + quick routing.", meta: "Availability" },
];

const doctors = [
  {
    name: "Dr. Sara Hassan",
    specialty: "Cardiology",
    location: "Cairo",
    rating: 4.9,
    experience: "12y",
    hospital: "Cairo Heart Center",
    availability: "Available",
    distance: 3.1,
    appointmentTypes: ["in-person", "video", "follow-up"],
  },
  {
    name: "Dr. Omar Khaled",
    specialty: "Pediatrics",
    location: "Giza",
    rating: 4.7,
    experience: "9y",
    hospital: "Nile Kids Clinic",
    availability: "Limited",
    distance: 5.4,
    appointmentTypes: ["in-person", "video"],
  },
  {
    name: "Dr. Lina Mansour",
    specialty: "Dermatology",
    location: "Alexandria",
    rating: 4.8,
    experience: "11y",
    hospital: "Sea View Medical",
    availability: "Available",
    distance: 2.2,
    appointmentTypes: ["video", "follow-up"],
  },
  {
    name: "Dr. Ayman Fathi",
    specialty: "Orthopedics",
    location: "Cairo",
    rating: 4.6,
    experience: "15y",
    hospital: "Ortho Plus",
    availability: "Unavailable",
    distance: 9.1,
    appointmentTypes: ["in-person", "follow-up"],
  },
  {
    name: "Dr. Yara Adel",
    specialty: "Psychiatry",
    location: "Cairo",
    rating: 4.9,
    experience: "8y",
    hospital: "Mindful Care",
    availability: "Available",
    distance: 1.8,
    appointmentTypes: ["video", "follow-up", "emergency"],
  },
];

const appointmentStatuses = [
  { label: "scheduled", color: "scheduled" },
  { label: "confirmed", color: "confirmed" },
  { label: "in-progress", color: "scheduled" },
  { label: "completed", color: "success" },
  { label: "cancelled", color: "cancelled" },
  { label: "rescheduled", color: "scheduled" },
];

const appointments = [
  {
    patient: "Rania",
    doctor: "Dr. Sara Hassan",
    type: "video",
    status: "confirmed",
    time: "Today 15:30",
    fee: "EGP 500",
    notes: "Shortness of breath",
    telemedicineLink: true,
  },
  {
    patient: "Ahmed",
    doctor: "Dr. Yara Adel",
    type: "emergency",
    status: "scheduled",
    time: "Today 17:00",
    fee: "EGP 650",
    notes: "High stress, insomnia",
    telemedicineLink: true,
  },
  {
    patient: "Omar",
    doctor: "Dr. Ayman Fathi",
    type: "in-person",
    status: "rescheduled",
    time: "Tomorrow 11:00",
    fee: "EGP 400",
    notes: "Knee pain after sports",
    telemedicineLink: false,
  },
  {
    patient: "Laila",
    doctor: "Dr. Lina Mansour",
    type: "follow-up",
    status: "completed",
    time: "Yesterday",
    fee: "EGP 300",
    notes: "Dermatitis treatment",
    telemedicineLink: false,
  },
];

const chatHistory = [
  { from: "doctor", text: "Good morning, how are you feeling today?", time: "09:00" },
  { from: "patient", text: "Better, but chest feels tight sometimes.", time: "09:01" },
  { from: "doctor", text: "Noted. Keep your inhaler nearby. Shall we switch to a video call?", time: "09:02" },
  { from: "patient", text: "Yes, please.", time: "09:03" },
];

const commonSymptoms = ["Fever", "Cough", "Headache", "Nausea", "Shortness of breath", "Fatigue", "Rash"];

const medicalFile = {
  History: [
    { title: "Asthma follow-up", status: "ongoing", diagnosis: "Mild persistent asthma", treatment: "Inhaled corticosteroid", date: "2025-02-12" },
    { title: "Dermatitis consult", status: "resolved", diagnosis: "Contact dermatitis", treatment: "Topical steroid", date: "2025-01-20" },
  ],
  Prescriptions: [{ title: "Salbutamol inhaler", status: "active", date: "2025-02-12" }],
  Reports: [],
  Allergies: [{ title: "Penicillin", status: "critical", date: "Noted 2024-08-10" }],
};

const prescriptions = [
  {
    patient: "Rania",
    doctor: "Dr. Sara Hassan",
    diagnosis: "Asthma",
    status: "Active",
    medications: 2,
    dates: "Feb 12 - Mar 12",
  },
  {
    patient: "Ahmed",
    doctor: "Dr. Yara Adel",
    diagnosis: "Anxiety",
    status: "Complete",
    medications: 1,
    dates: "Jan 10 - Jan 30",
  },
  {
    patient: "Omar",
    doctor: "Dr. Ayman Fathi",
    diagnosis: "ACL tear",
    status: "Expired",
    medications: 3,
    dates: "Nov 02 - Dec 02",
  },
];

const nearbyDoctors = [
  {
    name: "Dr. Mona Elshamy",
    specialty: "General",
    hospital: "City Clinic",
    distance: 2.4,
    rating: 4.6,
    experience: "7y",
    available: true,
  },
  {
    name: "Dr. Nabil Saad",
    specialty: "Cardiology",
    hospital: "Cairo Heart Center",
    distance: 4.1,
    rating: 4.8,
    experience: "14y",
    available: false,
  },
  {
    name: "Dr. Hala Osman",
    specialty: "Dermatology",
    hospital: "Glow Clinic",
    distance: 1.6,
    rating: 4.7,
    experience: "10y",
    available: true,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  bindScroll();
  setupMenuToggle();
  setupRoleToggle();
  setupLanguageToggle();
  setupDoctorStatus();
  renderBookingFilters();
  renderBookings();
  renderTelemedicine();
  renderAppointments();
  renderChat();
  renderSymptomChecker();
  renderMedicalFile();
  renderPrescriptions();
  renderNearbyDoctors();
  renderSettingsPanel();
});

function bindScroll() {
  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.scroll);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function setupMenuToggle() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");
  const overlay = document.getElementById("nav-overlay");
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    if (overlay) overlay.classList.remove("active");
  };

  const openNav = () => {
    nav.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    if (overlay) overlay.classList.add("active");
  };

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    expanded ? closeNav() : openNav();
  });

  nav.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (window.innerWidth <= 720) {
        closeNav();
      }
    });
  });

  overlay?.addEventListener("click", closeNav);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeNav();
    }
  });
}

function setupRoleToggle() {
  document.querySelectorAll(".role-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.role = btn.dataset.role;
      document.querySelectorAll(".role-btn").forEach((b) => b.classList.toggle("active", b === btn));
      document.getElementById("role-stat").textContent = state.role === "patient" ? "Patient" : "Doctor";
      renderBookings();
      renderAppointments();
    });
  });
}

function setupLanguageToggle() {
  const button = document.getElementById("language-toggle");
  button.addEventListener("click", () => {
    state.language = state.language === "en" ? "ar" : "en";
    const isArabic = state.language === "ar";
    document.documentElement.setAttribute("dir", isArabic ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", isArabic ? "ar" : "en");
    document.body.style.fontFamily = isArabic
      ? '"IBM Plex Sans Arabic", "Space Grotesk", system-ui, sans-serif'
      : '"Space Grotesk", "IBM Plex Sans Arabic", system-ui, sans-serif';
    button.textContent = isArabic ? "???????" : "English";
  });
}

function setupDoctorStatus() {
  const toggle = document.getElementById("doctor-status-toggle");
  const statusText = document.getElementById("doctor-status-text");
  const lastSeen = document.getElementById("doctor-last-seen");
  if (!toggle || !statusText || !lastSeen) return;
  const update = () => {
    const online = toggle.checked;
    statusText.textContent = online ? "Online" : "Offline";
    lastSeen.textContent = online ? "Last seen: now" : "Last seen: moments ago";
  };
  toggle.addEventListener("change", update);
  update();
}

function renderRoutingMap() {
  const container = document.getElementById("routing-map");
  if (!container) return;
  container.innerHTML = "";
  routeMap.forEach((route) => {
    const row = document.createElement("div");
    row.className = "flow-card";
    const activeBranch = (route.id === "patientHome" && state.role === "patient") || (route.id === "doctorDashboard" && state.role === "doctor");
    row.innerHTML = `
      <div class="meta">
        <span class="badge">${route.target}</span>
        <span class="chip ghost">${route.note}</span>
      </div>
      <h4>${route.label}</h4>
      <p class="lede">${activeBranch ? "Active branch" : ""}</p>
    `;
    container.appendChild(row);
  });
}

function renderAuthFlow() {
  const grid = document.getElementById("auth-flow");
  if (!grid) return;
  grid.innerHTML = "";
  authSteps.forEach((step) => {
    const card = document.createElement("div");
    card.className = "flow-card";
    card.innerHTML = `
      <span class="badge">${step.status === "ready" ? "Ready" : "Coming soon"}</span>
      <h4>${step.title}</h4>
      <p class="lede">${step.detail}</p>
    `;
    grid.appendChild(card);
  });
}

function renderFeatureBoard(containerId, items) {
  const board = document.getElementById(containerId);
  if (!board) return;
  board.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "feature-card";
    card.innerHTML = `
      <span class="badge">${item.meta}</span>
      <h4>${item.title}</h4>
      <p class="lede">${item.desc}</p>
    `;
    board.appendChild(card);
  });
}

function renderBookingFilters() {
  const container = document.getElementById("booking-filters");
  container.innerHTML = `
    <div class="field">
      <label>Specialty</label>
      <select class="input" id="filter-specialty">
        <option>All</option>
        ${Array.from(new Set(doctors.map((d) => d.specialty)))
          .map((s) => `<option>${s}</option>`)
          .join("")}
      </select>
    </div>
    <div class="field">
      <label>Location</label>
      <select class="input" id="filter-location">
        <option>All</option>
        ${Array.from(new Set(doctors.map((d) => d.location)))
          .map((l) => `<option>${l}</option>`)
          .join("")}
      </select>
    </div>
    <div class="field">
      <label>Appointment type</label>
      <select class="input" id="filter-type">
        <option>All</option>
        <option>in-person</option>
        <option>video</option>
        <option>follow-up</option>
        <option>emergency</option>
      </select>
    </div>
    <div class="field">
      <label>Search (doctor/specialty)</label>
      <input class="input" id="filter-search" placeholder="Dr. Sara / Cardiology" />
    </div>
    <div class="field">
      <label>Action</label>
      <button class="pill primary" id="filter-apply">Apply filters</button>
    </div>
  `;

  document.getElementById("filter-apply").addEventListener("click", () => {
    state.bookingFilters = {
      specialty: document.getElementById("filter-specialty").value,
      location: document.getElementById("filter-location").value,
      type: document.getElementById("filter-type").value,
      search: document.getElementById("filter-search").value.trim().toLowerCase(),
    };
    renderBookings();
  });
}

function renderBookings() {
  const container = document.getElementById("booking-results");
  container.innerHTML = "";
  const filtered = doctors.filter((doc) => {
    const matchesSpecialty = state.bookingFilters.specialty === "All" || doc.specialty === state.bookingFilters.specialty;
    const matchesLocation = state.bookingFilters.location === "All" || doc.location === state.bookingFilters.location;
    const matchesType = state.bookingFilters.type === "All" || doc.appointmentTypes.includes(state.bookingFilters.type);
    const matchesSearch =
      !state.bookingFilters.search ||
      doc.name.toLowerCase().includes(state.bookingFilters.search) ||
      doc.specialty.toLowerCase().includes(state.bookingFilters.search);
    return matchesSpecialty && matchesLocation && matchesType && matchesSearch;
  });

  const grid = document.createElement("div");
  grid.className = "booking-grid";
  filtered.forEach((doc) => {
    const card = document.createElement("div");
    card.className = "booking-card";
    const disabled = doc.availability === "Unavailable";
    card.innerHTML = `
      <div class="card-header">
        <div>
          <p class="eyebrow">${doc.specialty}</p>
          <h4>${doc.name}</h4>
          <p class="lede">${doc.hospital} | ${doc.location}</p>
        </div>
        <span class="status ${doc.availability === "Available" ? "confirmed" : doc.availability === "Unavailable" ? "cancelled" : "scheduled"}">${doc.availability}</span>
      </div>
      <div class="meta">
        <span>Rating ${doc.rating}</span>
        <span>${doc.experience} exp</span>
        <span>${doc.distance} km away</span>
      </div>
      <div class="tag-row">
        ${doc.appointmentTypes.map((t) => `<span class="chip">${t}</span>`).join("")}
      </div>
      <div class="hero-actions" style="margin-top:10px;">
        <button class="pill primary" ${disabled ? "disabled" : ""}>${state.role === "patient" ? "Book now" : "Assign"}</button>
        <button class="pill ghost">View profile</button>
      </div>
    `;
    grid.appendChild(card);
  });

  if (!filtered.length) {
    container.innerHTML = `<div class="alert">No doctors match these filters. Try widening specialty or location.</div>`;
    return;
  }
  container.appendChild(grid);
}

function renderTelemedicine() {
  const container = document.getElementById("telemedicine-card");
  if (!container) return;
  const card = document.createElement("div");
  card.className = "call-card";
  card.innerHTML = `
    <div class="card-header">
      <div>
        <p class="eyebrow">Call state</p>
        <h4>Video call | ${state.callState}</h4>
        <p class="lede">Mute, camera, chat overlay, screen share toggle, recording indicator, end call.</p>
      </div>
      <span class="status ${state.callState}">${state.callState}</span>
    </div>
    <div class="meta"><span>Participants: Patient & Doctor</span><span>Duration: 12:45</span></div>
    <div class="call-controls">
      <button class="pill ghost" id="toggle-mute">${state.muted ? "Unmute" : "Mute"}</button>
      <button class="pill ghost" id="toggle-camera">${state.camera ? "Turn camera off" : "Turn camera on"}</button>
      <button class="pill ghost" id="toggle-screen">${state.screenshare ? "Stop share" : "Share screen"}</button>
      <button class="pill ghost" id="toggle-record">${state.recording ? "Recording on" : "Recording off"}</button>
      <button class="pill primary" id="toggle-call">${nextCallStateLabel(state.callState)}</button>
    </div>
    <div class="chips" style="margin-top:12px;">
      <span class="chip">Chat overlay ready</span>
      <span class="chip">Telemedicine link handling</span>
      <span class="chip">Emergency route supported</span>
    </div>
  `;
  container.innerHTML = "";
  container.appendChild(card);

  document.getElementById("toggle-mute").onclick = () => {
    state.muted = !state.muted;
    renderTelemedicine();
  };
  document.getElementById("toggle-camera").onclick = () => {
    state.camera = !state.camera;
    renderTelemedicine();
  };
  document.getElementById("toggle-screen").onclick = () => {
    state.screenshare = !state.screenshare;
    renderTelemedicine();
  };
  document.getElementById("toggle-record").onclick = () => {
    state.recording = !state.recording;
    renderTelemedicine();
  };
  document.getElementById("toggle-call").onclick = () => {
    state.callState = nextCallState(state.callState);
    renderTelemedicine();
  };
}

function nextCallState(current) {
  if (current === "connecting") return "connected";
  if (current === "connected") return "ended";
  return "connecting";
}

function nextCallStateLabel(current) {
  if (current === "connecting") return "Connect";
  if (current === "connected") return "End call";
  return "Restart call";
}

function renderAppointments() {
  const container = document.getElementById("appointments-board");
  if (!container) return;
  container.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "appointments-grid";
  appointments.forEach((appt) => {
    const card = document.createElement("div");
    card.className = "booking-card";
    card.innerHTML = `
      <div class="card-header">
        <div>
          <p class="eyebrow">${appt.type}</p>
          <h4>${state.role === "patient" ? appt.doctor : appt.patient}</h4>
          <p class="lede">${appt.time} | Fee ${appt.fee}</p>
        </div>
        <span class="status ${appt.status === "confirmed" ? "confirmed" : appt.status === "cancelled" ? "cancelled" : "scheduled"}">${appt.status}</span>
      </div>
      <p class="lede">${appt.notes}</p>
      <div class="hero-actions" style="margin-top:10px;">
        <button class="pill ghost">${appt.telemedicineLink ? "Join video" : "View details"}</button>
        <button class="pill outline">${state.role === "patient" ? "Reschedule" : "Complete"}</button>
      </div>
    `;
    grid.appendChild(card);
  });
  container.appendChild(grid);
}

function renderChat() {
  const container = document.getElementById("chat-area");
  if (!container) return;
  const shell = document.createElement("div");
  shell.className = "chat-shell";
  shell.innerHTML = `
    <div class="card-header">
      <div>
        <p class="eyebrow">Messaging</p>
        <h4>Doctor-patient chat</h4>
        <p class="lede">Attachments, voice message placeholder, start voice/video call actions.</p>
      </div>
      <div class="hero-actions">
        <button class="pill ghost">Voice call</button>
        <button class="pill ghost">Video call</button>
      </div>
    </div>
    <div class="chat-thread" id="chat-thread"></div>
    <div class="composer">
      <input class="input" id="chat-input" placeholder="Send a secure message" />
      <button class="pill primary" id="chat-send">Send</button>
    </div>
    <div class="chips">
      <span class="chip">Attachments</span>
      <span class="chip">Voice note placeholder</span>
      <span class="chip">Typing detection mock</span>
    </div>
  `;
  container.innerHTML = "";
  container.appendChild(shell);
  renderChatThread();
  document.getElementById("chat-send").onclick = () => {
    const value = document.getElementById("chat-input").value.trim();
    if (!value) return;
    chatHistory.push({ from: state.role === "patient" ? "patient" : "doctor", text: value, time: "Now" });
    document.getElementById("chat-input").value = "";
    renderChatThread();
  };
}

function renderChatThread() {
  const thread = document.getElementById("chat-thread");
  if (!thread) return;
  thread.innerHTML = "";
  chatHistory.slice(-12).forEach((msg) => {
    const row = document.createElement("div");
    row.className = `message ${msg.from === "patient" ? "self" : ""}`;
    row.innerHTML = `<strong>${msg.from}</strong><br>${msg.text}<div class="meta">${msg.time}</div>`;
    thread.appendChild(row);
  });
  thread.scrollTop = thread.scrollHeight;
}

function renderSymptomChecker() {
  const container = document.getElementById("symptom-checker");
  if (!container) return;
  const shell = document.createElement("div");
  shell.className = "card";
  shell.innerHTML = `
    <div class="field">
      <label>Describe your symptoms</label>
      <textarea class="input" id="symptom-text" rows="3" placeholder="E.g., mild fever, dry cough, light headache"></textarea>
    </div>
    <div class="chips" id="symptom-tags">
      ${commonSymptoms.map((s) => `<button class="pill ghost symptom-chip" data-symptom="${s}">${s}</button>`).join("")}
    </div>
    <div class="hero-actions" style="margin-top:10px;">
      <button class="pill primary" id="symptom-analyze">Analyze</button>
      <button class="pill ghost" id="symptom-reset">Reset</button>
    </div>
    <div id="symptom-results" class="grid"></div>
  `;
  container.innerHTML = "";
  container.appendChild(shell);

  const selected = new Set();
  container.querySelectorAll(".symptom-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const value = chip.dataset.symptom;
      if (selected.has(value)) {
        selected.delete(value);
        chip.classList.remove("active");
      } else {
        selected.add(value);
        chip.classList.add("active");
      }
    });
  });

  document.getElementById("symptom-analyze").onclick = () => {
    const text = document.getElementById("symptom-text").value;
    const result = analyzeSymptoms(text, Array.from(selected));
    renderSymptomResults(result);
  };

  document.getElementById("symptom-reset").onclick = () => {
    document.getElementById("symptom-text").value = "";
    selected.clear();
    container.querySelectorAll(".symptom-chip").forEach((c) => c.classList.remove("active"));
    document.getElementById("symptom-results").innerHTML = "";
  };
}

function analyzeSymptoms(text, tags) {
  const hasFever = /fever|temperature/i.test(text) || tags.includes("Fever");
  const hasBreath = /breath|chest/i.test(text) || tags.includes("Shortness of breath");
  const hasRash = /rash|skin/i.test(text) || tags.includes("Rash");
  const conditions = [];
  if (hasFever && hasBreath) {
    conditions.push({ condition: "Respiratory infection", specialist: "Pulmonologist", urgency: "High" });
  }
  if (hasRash) {
    conditions.push({ condition: "Dermatitis", specialist: "Dermatologist", urgency: "Routine" });
  }
  if (!conditions.length) {
    conditions.push({ condition: "General consult", specialist: "General practitioner", urgency: "Routine" });
  }
  return conditions;
}

function renderSymptomResults(results) {
  const container = document.getElementById("symptom-results");
  container.innerHTML = results
    .map(
      (r) => `
    <div class="flow-card">
      <div class="meta">
        <span class="chip">${r.specialist}</span>
        <span class="chip">${r.urgency} urgency</span>
      </div>
      <h4>${r.condition}</h4>
      <p class="lede">Recommended specialists and urgency guidance.</p>
    </div>
  `
    )
    .join("");
}

function renderMedicalFile() {
  const container = document.getElementById("medical-file");
  if (!container) return;
  const tabs = Object.keys(medicalFile);
  const tabButtons = tabs
    .map((tab, idx) => `<button class="${idx === 0 ? "active" : ""}" data-tab="${tab}">${tab}</button>`)
    .join("");
  container.innerHTML = `
    <div class="tabs" id="medical-tabs">${tabButtons}</div>
    <div id="medical-entries"></div>
  `;
  const renderTab = (tab) => {
    const entries = medicalFile[tab];
    const area = document.getElementById("medical-entries");
    if (!entries.length) {
      area.innerHTML = `<div class="alert">${tab} coming soon.</div>`;
      return;
    }
    area.innerHTML = entries
      .map(
        (entry) => `
      <div class="flow-card">
        <span class="badge">${entry.status}</span>
        <h4>${entry.title}</h4>
        <p class="lede">Diagnosis: ${entry.diagnosis || entry.title}</p>
        <p class="meta">Treatment: ${entry.treatment || "See details"} | ${entry.date}</p>
        <button class="pill ghost">View details</button>
      </div>
    `
      )
      .join("");
  };
  renderTab(tabs[0]);
  container.querySelectorAll("button[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      container.querySelectorAll("button[data-tab]").forEach((b) => b.classList.toggle("active", b === btn));
      renderTab(btn.dataset.tab);
    });
  });
}

function renderPrescriptions() {
  const container = document.getElementById("prescriptions");
  if (!container) return;
  const tabs = ["Active", "Expired", "Complete", "All"];
  container.innerHTML = `
    <div class="tabs" id="prescription-tabs">
      ${tabs.map((tab, idx) => `<button class="${idx === 0 ? "active" : ""}" data-tab="${tab}">${tab}</button>`).join("")}
    </div>
    <div id="prescription-table"></div>
  `;
  const renderTab = (tab) => {
    const filtered = prescriptions.filter((p) => tab === "All" || p.status === tab);
    const table = document.getElementById("prescription-table");
    if (!filtered.length) {
      table.innerHTML = `<div class="alert">No prescriptions in ${tab.toLowerCase()}.</div>`;
      return;
    }
    table.innerHTML = `
      <div class="table-scroll">
        <table class="table-lite">
          <tbody>
            ${filtered
              .map(
                (p) => `
              <tr>
                <td>${p.patient}</td>
                <td>${p.doctor}</td>
                <td>${p.diagnosis}</td>
                <td><span class="status ${p.status.toLowerCase()}">${p.status}</span></td>
                <td>${p.medications} meds</td>
                <td>${p.dates}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  };
  renderTab(tabs[0]);
  container.querySelectorAll("#prescription-tabs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      container.querySelectorAll("#prescription-tabs button").forEach((b) => b.classList.toggle("active", b === btn));
      renderTab(btn.dataset.tab);
    });
  });
}

function renderNearbyDoctors() {
  const container = document.getElementById("nearby-doctors");
  if (!container) return;
  container.innerHTML = `
    <div class="filters" style="margin-bottom:10px;">
      <div class="field">
        <label>Specialty</label>
        <select class="input" id="nearby-specialty">
          <option>All</option>
          ${Array.from(new Set(nearbyDoctors.map((d) => d.specialty)))
            .map((s) => `<option>${s}</option>`)
            .join("")}
        </select>
      </div>
      <div class="field">
        <label>Max distance (km)</label>
        <input class="input" id="nearby-distance" type="number" value="${state.nearbyFilters.distance}" />
      </div>
      <div class="field">
        <label>&nbsp;</label>
        <button class="pill ghost" id="nearby-apply">Refresh</button>
      </div>
    </div>
    <div id="nearby-list"></div>
  `;
  document.getElementById("nearby-apply").onclick = () => {
    state.nearbyFilters.specialty = document.getElementById("nearby-specialty").value;
    state.nearbyFilters.distance = Number(document.getElementById("nearby-distance").value) || 25;
    renderNearbyList();
  };
  renderNearbyList();
}

function renderNearbyList() {
  const list = document.getElementById("nearby-list");
  const filtered = nearbyDoctors.filter((d) => {
    const matchSpec = state.nearbyFilters.specialty === "All" || d.specialty === state.nearbyFilters.specialty;
    const matchDist = d.distance <= state.nearbyFilters.distance;
    return matchSpec && matchDist;
  });
  if (!filtered.length) {
    list.innerHTML = `<div class="alert">No nearby doctors within ${state.nearbyFilters.distance} km.</div>`;
    return;
  }
  list.innerHTML = filtered
    .map(
      (d) => `
    <div class="booking-card">
      <div class="card-header">
        <div>
          <p class="eyebrow">${d.specialty}</p>
          <h4>${d.name}</h4>
          <p class="lede">${d.hospital}</p>
        </div>
        <span class="status ${d.available ? "confirmed" : "cancelled"}">${d.available ? "Available" : "Unavailable"}</span>
      </div>
      <div class="meta">
        <span>${d.distance} km</span>
        <span>Rating ${d.rating}</span>
        <span>${d.experience} exp</span>
      </div>
      <div class="hero-actions" style="margin-top:10px;">
        <button class="pill primary" ${d.available ? "" : "disabled"}>Book now</button>
        <button class="pill ghost">View profile</button>
      </div>
    </div>
  `
    )
    .join("");
}

function renderSettingsPanel() {
  const container = document.getElementById("settings-panel");
  if (!container) return;
  container.innerHTML = `
    <div class="grid">
      <div class="field">
        <label>Notifications</label>
        <div class="chips">
          <button class="pill ghost" data-setting="push">${state.settings.notifications.push ? "Push on" : "Push off"}</button>
          <button class="pill ghost" data-setting="email">${state.settings.notifications.email ? "Email on" : "Email off"}</button>
          <button class="pill ghost" data-setting="sms">${state.settings.notifications.sms ? "SMS on" : "SMS off"}</button>
        </div>
      </div>
      <div class="field">
        <label>Location</label>
        <button class="pill ghost" id="location-toggle">${state.settings.location ? "Location on" : "Location off"}</button>
      </div>
      <div class="field">
        <label>Theme preference</label>
        <div class="chips">
          ${["system", "light", "dark"]
            .map((t) => `<button class="pill ${state.settings.theme === t ? "primary" : "ghost"}" data-theme="${t}">${t}</button>`)
            .join("")}
        </div>
      </div>
      <div class="field">
        <label>Language / region</label>
        <div class="chips">
          <button class="pill ghost" id="settings-language">${state.settings.language}</button>
          <button class="pill ghost" id="settings-region">${state.settings.region}</button>
        </div>
      </div>
      <div class="alert">Privacy, security, data, storage placeholders included. Right-to-delete ready. HIPAA/GDPR guidance acknowledged.</div>
    </div>
  `;

  container.querySelectorAll("[data-setting]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.setting;
      state.settings.notifications[key] = !state.settings.notifications[key];
      renderSettingsPanel();
    });
  });
  document.getElementById("location-toggle").onclick = () => {
    state.settings.location = !state.settings.location;
    renderSettingsPanel();
  };
  container.querySelectorAll("[data-theme]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.settings.theme = btn.dataset.theme;
      renderSettingsPanel();
    });
  });
  document.getElementById("settings-language").onclick = () => {
    state.settings.language = state.settings.language === "English" ? "Arabic" : "English";
    renderSettingsPanel();
  };
  document.getElementById("settings-region").onclick = () => {
    state.settings.region = state.settings.region === "Egypt" ? "UAE" : "Egypt";
    renderSettingsPanel();
  };
}
