/* ==========================================
   AKG.STUDYS Portal Script Engine Core
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Global Local States
  let savedNotes = JSON.parse(localStorage.getItem("akg_saved_notes")) || [];
  let savedSolved = JSON.parse(localStorage.getItem("akg_saved_papers")) || [];
  let stickyNotes = JSON.parse(localStorage.getItem("akg_sticky_notes")) || [];
  let tasks = JSON.parse(localStorage.getItem("akg_tasks")) || [];
  let founderConfig = JSON.parse(localStorage.getItem("akg_founder")) || {
    isUnlocked: false,
    themeColor: "cyan",
    difficulty: "Super Scholar",
    includeVisuals: true,
    promptOverride: ""
  };

  // Render Lucide Vector Icons
  lucide.createIcons();

  // Navigation Logic
  const navButtons = document.querySelectorAll(".nav-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      
      navButtons.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(pane => pane.classList.remove("active"));

      document.querySelectorAll(`[data-tab="${targetTab}"]`).forEach(b => b.classList.add("active"));
      document.getElementById(`tab-${targetTab}`).classList.add("active");
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Light / Dark Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const bodyElement = document.body;
  const themeIcon = document.getElementById("theme-icon");

  themeToggle.addEventListener("click", () => {
    bodyElement.classList.toggle("light-theme");
    const isLight = bodyElement.classList.contains("light-theme");
    themeIcon.setAttribute("data-lucide", isLight ? "moon" : "sun");
    lucide.createIcons();
  });

  /* ==========================================
     CORE TAB 1: NOTES GENERATOR ENGINE
     ========================================== */
  const btnGenerateNotes = document.getElementById("btn-generate-notes");
  const notesSubjectInput = document.getElementById("notes-subject");
  const notesTextInput = document.getElementById("notes-text");
  const notesDisplayEmpty = document.getElementById("notes-display-empty");
  const notesDisplayActive = document.getElementById("notes-display-active");
  const notesRenderBox = document.getElementById("notes-render-box");
  const activeNotesTitle = document.getElementById("active-notes-title");

  let activeNotesObject = null;

  btnGenerateNotes.addEventListener("click", () => {
    const subject = notesSubjectInput.value.trim();
    const syllabus = notesTextInput.value.trim();
    
    if (!subject || !syllabus) {
      alert("Please specify a Course Title and write or paste syllabus parameters.");
      return;
    }

    // High-IQ Simulated detailed Classroom-style Notes and Sample Paper
    const simulatedNotes = `
# Classroom Study Notes: ${subject}
### Compiled specifically for Founder Abhishek Gangwar

## Module 1: Fundamental Paradigms & Foundations
We begin by establishing a clear conceptual hierarchy of ${subject}. Traditional instructional systems fail to address the mathematical linkages that bind theoretical abstractions to physical realization.

### Theoretical Breakdown
* **Abstraction Node A**: Core elements require continuous alignment under standard dynamic variables.
* **Structural Matrix**: Relational nodes translate parameters dynamically.

#### Numerical Analogy Example:
Let us define the coefficient of structural transfer $C_t$:
$$C_t = \\frac{\\sum_{i=1}^{n} E_i}{\\beta \\cdot \\theta_{max}}$$
Where $\\beta$ represents the alignment constant and $\\theta_{max}$ is the peak capacity index.

\`\`\`
  +--------------------------------------------+
  |              SYLLABUS CORE NODE            |
  +--------------------------------------------+
                        |
                        v
         [Abstraction Node-A Parameters]
                        |
       +----------------+----------------+
       |                                 |
       v                                 v
[Dynamic Matrix]                 [Theoretical Proof]
\`\`\`

## Module 2: Applied Methodologies
- **Primary Node Execution**: Continuous polling prevents structural friction.
- **Dynamic Optimization**: Minimize alignment delay using high-recall structural presets.
`;

    const simulatedPaper = `
# Core Sample Exam Paper: ${subject}
**Time Allocated: 3 Hours** • **Total Valuation: 100 Marks**

### Section A: Short Conceptual Questions (5 x 5 = 25 Marks)
1. Formulate the core relationship of structural transfer under dynamic variables.
2. Outline the primary conceptual limits of Abstraction Node A.
3. Contrast dynamic optimization schemas with traditional system mapping structures.

### Section B: Deep Analytical & Practical Scenarios (3 x 25 = 75 Marks)
4. Formulate a comprehensive proof illustrating why continuous alignment prevents friction. Include an ASCII flow schematic representing parameters.
5. In terms of ${subject}, evaluate a system under heavy capacity constraints.
`;

    activeNotesObject = {
      id: Date.now(),
      subject: subject,
      notes: simulatedNotes,
      paper: simulatedPaper,
      date: new Date().toLocaleDateString()
    };

    savedNotes.unshift(activeNotesObject);
    localStorage.setItem("akg_saved_notes", JSON.stringify(savedNotes));

    renderNotesOutput("notes");
    updateNotesLibrary();
  });

  const subtabButtons = document.querySelectorAll("[data-subtab]");
  subtabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const sub = btn.getAttribute("data-subtab");
      btn.parentElement.querySelectorAll(".subtab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (sub === "study-notes") {
        notesRenderBox.innerHTML = parseSimpleMarkdown(activeNotesObject.notes);
      } else if (sub === "sample-paper") {
        notesRenderBox.innerHTML = parseSimpleMarkdown(activeNotesObject.paper);
      }
    });
  });

  function renderNotesOutput(type) {
    notesDisplayEmpty.classList.add("hidden");
    notesDisplayActive.classList.remove("hidden");
    activeNotesTitle.textContent = `${activeNotesObject.subject} Core Portfolio`;
    
    if (type === "notes") {
      notesRenderBox.innerHTML = parseSimpleMarkdown(activeNotesObject.notes);
      document.getElementById("notes-bytes").textContent = `Size: ${Math.round(activeNotesObject.notes.length / 1024)} KB`;
    }
  }

  function updateNotesLibrary() {
    const list = document.getElementById("notes-library-list");
    document.getElementById("library-count").textContent = `${savedNotes.length} items`;
    
    if (savedNotes.length === 0) {
      list.innerHTML = `<p class="empty-text">No custom syllabi processed yet.</p>`;
      return;
    }

    list.innerHTML = savedNotes.map(n => `
      <div class="lib-item" data-note-id="${n.id}">
        <div class="lib-item-text">
          <div class="title">${n.subject}</div>
          <div class="date">Compiled ${n.date}</div>
        </div>
        <i data-lucide="book-open"></i>
      </div>
    `).join("");

    lucide.createIcons();

    // Bind click events
    list.querySelectorAll(".lib-item").forEach(item => {
      item.addEventListener("click", () => {
        const id = item.getAttribute("data-note-id");
        activeNotesObject = savedNotes.find(n => n.id == id);
        renderNotesOutput("notes");
      });
    });
  }

  /* ==========================================
     CORE TAB 2: EXAM PAPER SOLVER
     ========================================== */
  const btnSolvePaper = document.getElementById("btn-solve-paper");
  const solveTitleInput = document.getElementById("solve-title");
  const solveTextInput = document.getElementById("solve-text");
  const solveDisplayEmpty = document.getElementById("solve-display-empty");
  const solveDisplayActive = document.getElementById("solve-display-active");
  const solvedSolutionsBox = document.getElementById("solved-solutions-box");
  const activeSolvedTitle = document.getElementById("active-solved-title");

  let activeSolvedObject = null;

  btnSolvePaper.addEventListener("click", () => {
    const title = solveTitleInput.value.trim();
    const paper = solveTextInput.value.trim();

    if (!title || !paper) {
      alert("Please insert a reference Title and add core questions.");
      return;
    }

    const solvedMarkdown = `
# Step-by-Step Solutions: ${title}

## Question 1: Outline the principal parameters of ${title}.
### Professional Grade Solution Scheme:
To solve for principal parameters, we apply the relational matrices developed by Abhishek Gangwar's system specifications. 

#### Calculation Proof Step-by-Step:
1. Identify input factors: Let $P_0 = 104.2$ units.
2. Formulate continuous friction reduction coefficients:
$$\\mu_s = \\sqrt{P_0 \\cdot \\tau_{max}} = \\sqrt{104.2 \\cdot 1.45} = 12.29$$
3. Therefore, maximum operational stability values yield $12.29$ cycles.

\`\`\`
 +----------------------------------------+
 |         SOLVED CONCEPT FLOW CHART      |
 +----------------------------------------+
 | Input variable P0 ----> 104.2 units    |
 | Alignment proof ------> Continuous     |
 | Stability yield ------> 12.29 cycles   |
 +----------------------------------------+
\`\`\`

## Key Revision Takeaways
- Always verify coefficients under high load constraints.
- Retain exact decimal accuracy to secure maximum marking values.
`;

    activeSolvedObject = {
      id: Date.now(),
      title: title,
      solutions: solvedMarkdown,
      date: new Date().toLocaleDateString()
    };

    savedSolved.unshift(activeSolvedObject);
    localStorage.setItem("akg_saved_papers", JSON.stringify(savedSolved));

    // Push automatic high-yield flash cards to the active board
    const autoSticky = {
      id: Date.now() + 1,
      content: `Formula Tip: ${title} Stability coefficient computes strictly as: μ = √(P0 * τ)`,
      color: "cyan"
    };
    stickyNotes.unshift(autoSticky);
    localStorage.setItem("akg_sticky_notes", JSON.stringify(stickyNotes));

    renderSolvedOutput();
    updateSolvedLibrary();
    renderStickyGrid();
  });

  function renderSolvedOutput() {
    solveDisplayEmpty.classList.add("hidden");
    solveDisplayActive.classList.remove("hidden");
    activeSolvedTitle.textContent = activeSolvedObject.title;
    solvedSolutionsBox.innerHTML = parseSimpleMarkdown(activeSolvedObject.solutions);
    document.getElementById("solved-bytes").textContent = `Size: ${Math.round(activeSolvedObject.solutions.length / 1024)} KB`;
  }

  function updateSolvedLibrary() {
    const list = document.getElementById("solved-library-list");
    document.getElementById("solved-count").textContent = `${savedSolved.length} items`;

    if (savedSolved.length === 0) {
      list.innerHTML = `<p class="empty-text">No exam sheets processed yet.</p>`;
      return;
    }

    list.innerHTML = savedSolved.map(s => `
      <div class="lib-item" data-solved-id="${s.id}">
        <div class="lib-item-text">
          <div class="title">${s.title}</div>
          <div class="date">Solved ${s.date}</div>
        </div>
        <i data-lucide="clipboard"></i>
      </div>
    `).join("");

    lucide.createIcons();

    list.querySelectorAll(".lib-item").forEach(item => {
      item.addEventListener("click", () => {
        const id = item.getAttribute("data-solved-id");
        activeSolvedObject = savedSolved.find(s => s.id == id);
        renderSolvedOutput();
      });
    });
  }

  // Handle Solved tab splits
  const solvedSubtabs = document.querySelectorAll("#tab-solve .subtab-btn");
  solvedSubtabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-subtab");
      solvedSubtabs.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (target === "step-solutions") {
        solvedSolutionsBox.classList.remove("hidden");
        document.getElementById("solved-sticky-box").classList.add("hidden");
      } else {
        solvedSolutionsBox.classList.add("hidden");
        document.getElementById("solved-sticky-box").classList.remove("hidden");
      }
    });
  });

  /* ==========================================
     CORE TAB 2 SUB: REVISION STICKY MEMOS
     ========================================== */
  const addStickyForm = document.getElementById("add-sticky-form");
  const stickyTextInput = document.getElementById("manual-sticky-text");
  const stickyGrid = document.getElementById("sticky-board-grid");
  const colorDots = document.querySelectorAll(".dot");

  let activeStickyColor = "yellow";

  colorDots.forEach(dot => {
    dot.addEventListener("click", () => {
      colorDots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
      activeStickyColor = dot.getAttribute("data-color");
    });
  });

  addStickyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = stickyTextInput.value.trim();
    if (!content) return;

    const newSticky = {
      id: Date.now(),
      content: content,
      color: activeStickyColor
    };

    stickyNotes.unshift(newSticky);
    localStorage.setItem("akg_sticky_notes", JSON.stringify(stickyNotes));
    stickyTextInput.value = "";
    renderStickyGrid();
  });

  function renderStickyGrid() {
    if (stickyNotes.length === 0) {
      stickyGrid.innerHTML = `<p class="empty-text text-center py-6 col-span-2">No active notes. solved sheets generate these automatically!</p>`;
      return;
    }

    stickyGrid.innerHTML = stickyNotes.map(n => `
      <div class="sticky-note ${n.color}">
        <button class="btn-delete-sticky" data-sticky-id="${n.id}">✕</button>
        <p>${n.content}</p>
      </div>
    `).join("");

    stickyGrid.querySelectorAll(".btn-delete-sticky").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-sticky-id");
        stickyNotes = stickyNotes.filter(n => n.id != id);
        localStorage.setItem("akg_sticky_notes", JSON.stringify(stickyNotes));
        renderStickyGrid();
      });
    });
  }

  /* ==========================================
     CORE TAB 3: STUDY PLANNER MODULE
     ========================================= */
  const plannerTasksList = document.getElementById("planner-tasks-list");
  const taskForm = document.getElementById("task-creation-form");
  const btnToggleForm = document.getElementById("btn-toggle-task-form");
  const btnLoadPresets = document.getElementById("btn-load-presets");

  btnToggleForm.addEventListener("click", () => {
    taskForm.classList.toggle("hidden");
  });

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = document.getElementById("task-subject").value.trim();
    const title = document.getElementById("task-title").value.trim();
    const duration = document.getElementById("task-duration").value;
    const priority = document.getElementById("task-priority").value;

    const newTask = {
      id: Date.now(),
      subject,
      title,
      duration: Number(duration),
      priority,
      completed: false
    };

    tasks.push(newTask);
    localStorage.setItem("akg_tasks", JSON.stringify(tasks));
    taskForm.reset();
    taskForm.classList.add("hidden");
    renderPlanner();
  });

  btnLoadPresets.addEventListener("click", () => {
    const presets = [
      { id: Date.now() + 1, subject: "Maths", title: "Review Syllabus Notes formula boards", duration: 45, priority: "high", completed: false },
      { id: Date.now() + 2, subject: "Physics", title: "Solve Sample Exam papers from Library", duration: 60, priority: "high", completed: false },
      { id: Date.now() + 3, subject: "Computer Science", title: "Generate Normalization mnemonics", duration: 30, priority: "medium", completed: false }
    ];

    tasks.push(...presets);
    localStorage.setItem("akg_tasks", JSON.stringify(tasks));
    renderPlanner();
  });

  function renderPlanner() {
    if (tasks.length === 0) {
      plannerTasksList.innerHTML = `<p class="empty-text py-12">Planner list is empty. Click "Load Presets" or write your own study targets to construct focus nodes.</p>`;
      return;
    }

    plannerTasksList.innerHTML = tasks.map(t => `
      <div class="task-card ${t.completed ? 'completed' : ''}" data-task-id="${t.id}">
        <div class="task-main">
          <button class="btn-checkbox">
            <i data-lucide="${t.completed ? 'check-circle-2' : 'circle'}"></i>
          </button>
          <div class="task-details">
            <span class="title">${t.title}</span>
            <div class="task-meta">
              <span class="badge">${t.subject}</span>
              <span>•</span>
              <span>${t.duration} mins</span>
            </div>
          </div>
        </div>
        <div class="task-ops">
          <span class="priority-badge ${t.priority}">${t.priority}</span>
          <button class="text-link btn-delete-task"><i data-lucide="trash-2"></i></button>
        </div>
      </div>
    `).join("");

    lucide.createIcons();

    // Bind checkboxes and delete operations
    plannerTasksList.querySelectorAll(".btn-checkbox").forEach(box => {
      box.addEventListener("click", () => {
        const card = box.closest(".task-card");
        const id = card.getAttribute("data-task-id");
        const task = tasks.find(t => t.id == id);
        task.completed = !task.completed;
        localStorage.setItem("akg_tasks", JSON.stringify(tasks));
        renderPlanner();
      });
    });

    plannerTasksList.querySelectorAll(".btn-delete-task").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const card = btn.closest(".task-card");
        const id = card.getAttribute("data-task-id");
        tasks = tasks.filter(t => t.id != id);
        localStorage.setItem("akg_tasks", JSON.stringify(tasks));
        renderPlanner();
      });
    });

    updatePlannerStats();
  }

  function updatePlannerStats() {
    const totalMins = tasks.reduce((sum, t) => !t.completed ? sum + t.duration : sum, 0);
    const compCount = tasks.filter(t => t.completed).length;
    const compMins = tasks.reduce((sum, t) => t.completed ? sum + t.duration : sum, 0);
    const ratio = tasks.length > 0 ? Math.round((compCount / tasks.length) * 100) : 0;

    document.getElementById("stat-pending-hours").textContent = `${totalMins} mins`;
    document.getElementById("stat-pending-count").textContent = `${tasks.filter(t => !t.completed).length} focus sessions remaining`;
    document.getElementById("stat-completed-count").textContent = `${compCount} topics`;
    document.getElementById("stat-completed-hours").textContent = `${compMins} mins completed`;
    document.getElementById("stat-ratio").textContent = `${ratio}%`;
  }

  /* ==========================================
     CORE TAB 4: INTELLECTUAL AI CHAT ASSISTANT
     ========================================== */
  const chatMessagesBox = document.getElementById("chat-messages-box");
  const chatForm = document.getElementById("chat-input-form");
  const chatInput = document.getElementById("chat-user-input");
  const btnClearChat = document.getElementById("btn-clear-chat");

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = chatInput.value.trim();
    if (!input) return;

    appendChatMessage("user", input);
    chatInput.value = "";

    // Trigger Smart simulated response instantly
    setTimeout(() => {
      const response = formulateSimulatedResponse(input);
      appendChatMessage("system", response);
    }, 600);
  });

  document.querySelectorAll(".quick-p-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const prompt = btn.getAttribute("data-prompt");
      appendChatMessage("user", prompt);
      setTimeout(() => {
        const response = formulateSimulatedResponse(prompt);
        appendChatMessage("system", response);
      }, 600);
    });
  });

  btnClearChat.addEventListener("click", () => {
    chatMessagesBox.innerHTML = `
      <div class="message system">
        <div class="avatar"><i data-lucide="graduation-cap"></i></div>
        <div class="bubble">
          <p>Greetings, Academic Scholar. I am the AKG AI system. How can I help you customize your notes, solve equations, or optimize your study schedules today?</p>
        </div>
      </div>
    `;
    lucide.createIcons();
  });

  function appendChatMessage(role, content) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${role}`;
    
    msgDiv.innerHTML = `
      <div class="avatar">${role === "system" ? "AI" : "ME"}</div>
      <div class="bubble">${parseSimpleMarkdown(content)}</div>
    `;

    chatMessagesBox.appendChild(msgDiv);
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
  }

  function formulateSimulatedResponse(query) {
    const q = query.toLowerCase();
    if (q.includes("summarize") || q.includes("notes")) {
      return `
### High-Yield Syllabus Summary Breakdown
Based on your current active academic parameters, here are your **5 core cognitive takeaway blocks**:
1. **Dynamic Realignment Constant**: Operational stability demands constant mathematical alignment.
2. **Dynamic Flow Index**: Keeping coefficients stable prevents performance degradation.
3. **ASCII Schematics Advantage**: Memorizing the path structure secures direct recollection keys during exams.
4. **Mnemonic Pinning**: Colorful cards trigger visual associative memory channels.
5. **Rigorous Recovery Logs**: Track finished study nodes to sustain cognitive focus scores.
`;
    }
    if (q.includes("formula") || q.includes("mechanics") || q.includes("quantum")) {
      return `
### Academic Formula Sheet
Here are the essential formulas modeled around Abhishek Gangwar's topper directives:

#### Continuous stability coefficient:
$$\\mu_s = \\sqrt{P_0 \\cdot \\tau_{max}}$$

#### Dynamic Alignment Matrix:
$$\\Lambda(x) = \\sum_{i=1}^{n} \\omega_i \\cdot e^{-\\lambda_i \\cdot t}$$

\`\`\`
  [ Stability Ratio ] ----> Coordinates Alignment Index
  [ Matrix Node-X  ] ----> Minimizes calculation overhead
\`\`\`
`;
    }
    return `
### Academic Guidance Node
Acknowledging your query regarding: *"${query}"*.

To secure an elite score, implement the following actions:
- **Core Deconstruction**: Isolate the primary mathematical equations from auxiliary concepts.
- **Formulate ASCII visual trees**: Handwrite system layouts to solidify architectural recollection.
- **Schedule active recall intervals**: Map 45-minute focus session blocks directly within your Study Planner dashboard.
`;
  }

  /* ==========================================
     CORE TAB 5: SECURE FOUNDER OVERRIDE
     ========================================== */
  const founderLoginBox = document.getElementById("founder-login-box");
  const founderDashboardActive = document.getElementById("founder-dashboard-active");
  const founderLoginForm = document.getElementById("founder-login-form");
  const founderPasswordInput = document.getElementById("founder-password");
  const loginErrorText = document.getElementById("login-error-text");

  founderLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const passcode = founderPasswordInput.value.trim().toLowerCase();

    if (passcode === "abhishek" || passcode === "abhishek gangwar") {
      founderConfig.isUnlocked = true;
      localStorage.setItem("akg_founder", JSON.stringify(founderConfig));
      unlockFounderSuite();
    } else {
      loginErrorText.classList.remove("hidden");
    }
  });

  function unlockFounderSuite() {
    founderLoginBox.classList.add("hidden");
    founderDashboardActive.classList.remove("hidden");
  }

  // Handle settings application
  const btnSaveFounder = document.getElementById("btn-save-founder-settings");
  btnSaveFounder.addEventListener("click", () => {
    const diff = document.getElementById("founder-difficulty").value;
    const theme = document.getElementById("founder-theme-color").value;
    const includeVis = document.getElementById("founder-include-visuals").checked;
    
    founderConfig.difficulty = diff;
    founderConfig.themeColor = theme;
    founderConfig.includeVisuals = includeVis;

    localStorage.setItem("akg_founder", JSON.stringify(founderConfig));
    alert("System overrides successfully deployed across active container nodes.");
  });

  const btnHardReset = document.getElementById("btn-hard-reset");
  btnHardReset.addEventListener("click", () => {
    if (confirm("Confirm hard flushing all database loops and custom memory caches?")) {
      localStorage.clear();
      location.reload();
    }
  });

  // Verify locked/unlocked state on initialization
  if (founderConfig.isUnlocked) {
    unlockFounderSuite();
  }

  /* ==========================================
     GLOBAL HELPER: MINI MARKDOWN PARSER
     ========================================== */
  function parseSimpleMarkdown(md) {
    let html = md;
    // Headers
    html = html.replace(/### (.*)/g, '<h4 class="mt-4 font-display font-semibold text-sm cyan-text">$1</h4>');
    html = html.replace(/## (.*)/g, '<h3 class="mt-4 font-display font-semibold text-base purple-text">$1</h3>');
    html = html.replace(/# (.*)/g, '<h2 class="mt-4 font-display font-bold text-lg border-b pb-1">$1</h2>');
    
    // Bold / List item formats
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\* (.*)/g, '<li class="ml-4 list-disc text-xs">$1</li>');
    html = html.replace(/- (.*)/g, '<li class="ml-4 list-disc text-xs">$1</li>');
    
    // Code block wrappers
    html = html.replace(/\`\`\`([\s\S]*?)\`\`\`/g, '<pre class="bg-slate-950 p-4 border rounded-xl font-mono text-xs text-slate-300 overflow-x-auto my-2">$1</pre>');
    html = html.replace(/\`(.*?)\`/g, '<code class="bg-slate-800 px-1 py-0.5 rounded text-xs font-mono">$1</code>');
    
    // Convert newlines to paragraphs safely
    html = html.split('\n\n').map(p => {
      if (p.trim().startsWith('<h') || p.trim().startsWith('<l') || p.trim().startsWith('<p') || p.trim().startsWith('<u')) {
        return p;
      }
      return `<p class="text-xs text-slate-300 leading-relaxed mb-2">${p}</p>`;
    }).join('');

    return html;
  }

  // Camera Snapshot Mechanics (Using standard navigator WebRTC stream)
  const btnTriggerCamera = document.getElementById("btn-trigger-camera");
  const cameraBox = document.getElementById("camera-box");
  const webcam = document.getElementById("webcam");
  const btnCaptureFrame = document.getElementById("btn-capture-frame");

  btnTriggerCamera.addEventListener("click", async () => {
    if (cameraBox.classList.contains("hidden")) {
      cameraBox.classList.remove("hidden");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        webcam.srcObject = stream;
        webcam.play();
      } catch (err) {
        alert("Camera integration unavailable. Please utilize gallery upload instead.");
        cameraBox.classList.add("hidden");
      }
    } else {
      stopCameraStream();
    }
  });

  btnCaptureFrame.addEventListener("click", () => {
    // Render static question paper details upon camera snapshot confirmation
    document.getElementById("solve-title").value = "Scanned Physics Final Mock";
    document.getElementById("solve-text").value = `
[Scanned Image Data Captured]
1. Prove continuous alignment parameters reduce friction.
2. Calculate stability coefficient index parameters.
`;
    stopCameraStream();
    alert("Camera frame captured successfully. Processing structural question nodes...");
  });

  function stopCameraStream() {
    const stream = webcam.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    cameraBox.classList.add("hidden");
  }

  // Initialize Library Lists
  updateNotesLibrary();
  updateSolvedLibrary();
  renderStickyGrid();
  renderPlanner();
});