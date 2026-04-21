// ==========================================================================
// 0. TAILWIND CONFIGURATION
// ==========================================================================
tailwind.config = {
    theme: {
        extend: {
            colors: {
                neon: '#00ff9f',
                'neon-dim': 'rgba(0, 255, 159, 0.3)',
                'space-black': '#050505',
                'space-deep': '#0a0a0a',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
                tech: ['Space Grotesk', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        }
    }
}

// ==========================================================================
// 1. DATA & STATE
// ==========================================================================
let portfolio = JSON.parse(localStorage.getItem('mtz_portfolio')) || [
    { id: 1, title: 'E-commerce Galaxy Shop', gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGlnaDVqZmh4N3BxcXg1eHB6ZnlmeXh5eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/LXLV3ZJ0bWq0o/giphy.gif', link: '#' },
    { id: 2, title: 'Bot de Automatización CRM', gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGlnaDVqZmh4N3BxcXg1eHB6ZnlmeXh5eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKSjPAbS9wz61Jm/giphy.gif', link: '#' },
    { id: 3, title: 'Sistema de Cobros v2.0', gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGlnaDVqZmh4N3BxcXg1eHB6ZnlmeXh5eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l0MYt5jPR6QX5pnqM/giphy.gif', link: '#' }
];

let reviews = JSON.parse(localStorage.getItem('mtz_reviews')) || [
    { name: "Andrés Gutiérrez", rubro: "Inmobiliaria", text: "MTZ transformó nuestra forma de captar clientes. La automatización de WhatsApp nos ahorró miles de dólares en personal.", stars: 5 },
    { name: "Lucía Méndez", rubro: "Dueña de Boutique", text: "Excelente atención y una estética futurista que dejó mis clientes asombrados. Mi tienda online vuela.", stars: 5 },
    { name: "Marcos Polo", rubro: "Restaurante Italo", text: "El sistema de pedidos y cobros es impecable. Todo funciona en piloto automático desde hace 6 meses.", stars: 5 }
];

let messages = JSON.parse(localStorage.getItem('mtz_messages')) || [];

let logoClicks = 0;
let logoTimer = null;
let selectedFileBase64 = null;
let robotInteracted = false;

// ==========================================================================
// 2. CORE LOGIC
// ==========================================================================

window.addEventListener('load', () => {
    initMatrix();
    simulateLoading();
    renderPortfolio();
    renderReviews();
});

function simulateLoading() {
    const bar = document.getElementById('loader-bar');
    const percentText = document.getElementById('loader-percent');
    const statusText = document.getElementById('loader-status');
    const logs = document.getElementById('loader-logs');
    const logo = document.getElementById('preloader-logo');
    
    const messages = [
        "Iniciando Protocolos",
        "Sincronizando Núcleos",
        "Cargando Galaxia",
        "Desplegando Neón",
        "Enlace Establecido"
    ];

    const technicalLogs = [
        "> Booting MTZ-OS v4.0...",
        "> Establishing secure link...",
        "> Loading matrix core modules...",
        "> Optimizing interstellar UI...",
        "> Synchronizing neural network...",
        "> Bypassing firewall constraints...",
        "> MTZ PROGRAMACION: ONLINE"
    ];

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 8;
        if (progress > 100) progress = 100;
        
        bar.style.width = `${progress}%`;
        percentText.innerText = `${Math.floor(progress)}%`;
        
        // Update Status
        const msgIdx = Math.floor((progress / 100) * (messages.length - 1));
        statusText.innerText = messages[msgIdx];

        // Update technical logs occasionally
        if (Math.random() > 0.85) {
            logs.innerText = technicalLogs[Math.floor(Math.random() * technicalLogs.length)];
        }

        // Random Glitch Effect
        if (Math.random() > 0.96) {
            logo.classList.add('animate-glitch');
            setTimeout(() => logo.classList.remove('animate-glitch'), 150);
        }

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                preloader.classList.add('preloader-finish');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    revealContent();
                }, 1000);
            }, 800);
        }
    }, 80);
}

function revealContent() {
    ['main-content', 'main-header', 'main-footer'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('opacity-0');
    });

    // Auto-show robot after 5 seconds
    setTimeout(autoShowRobot, 5000);
}

function autoShowRobot() {
    if (!robotInteracted) {
        const bubble = document.getElementById('robot-bubble');
        if (bubble.classList.contains('hidden')) {
            toggleRobot();
        }
    }
}

// Remind user occasionally
setInterval(() => {
    if (!robotInteracted) {
        autoShowRobot();
    }
}, 45000); // Every 45 seconds

// ==========================================================================
// 3. MATRIX EFFECT
// ==========================================================================
function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "MTZ0101PROGRAMACIONWEBAUTOMATIZACION#$%^&*()+=";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff9f";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw, 50);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==========================================================================
// 4. RENDERING FUNCTIONS (PUBLIC)
// ==========================================================================
function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = portfolio.map(item => `
        <div class="portfolio-card glass-card rounded-[32px] overflow-hidden group cursor-pointer" onclick="window.open('${item.link}', '_blank')">
            <div class="portfolio-img-container aspect-video relative">
                <img src="${item.gif}" alt="${item.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="p-8">
                <div class="flex justify-between items-start mb-3">
                    <h4 class="text-xl font-bold font-tech group-hover:text-neon transition-colors">${item.title}</h4>
                    <i class="fa-solid fa-arrow-up-right-from-square text-neon"></i>
                </div>
                <p class="text-white/40 text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
                     LIVE PREVIEW <span class="w-2 h-2 rounded-full bg-neon animate-pulse"></span>
                </p>
            </div>
        </div>
    `).join('');
}

function renderReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return;
    container.innerHTML = reviews.map(r => `
        <div class="glass-card p-10 rounded-[40px] flex flex-col justify-between border-white/5 h-full">
            <div>
                <div class="flex gap-1 text-neon mb-6">
                    ${Array(r.stars || 5).fill('<i class="fa-solid fa-star"></i>').join('')}
                </div>
                <p class="text-lg italic leading-relaxed text-white/90">"${r.text}"</p>
            </div>
            <div class="mt-8 flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-neon/10 flex items-center justify-center font-bold text-neon border border-neon/20">
                    ${r.name ? r.name.charAt(0) : '?'}
                </div>
                <div>
                    <p class="font-bold font-tech text-white">${r.name}</p>
                    <p class="text-[10px] text-neon uppercase tracking-widest font-black">${r.rubro}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Review Interaction Logic
function openReviewModal() {
    document.getElementById('review-modal').classList.remove('hidden');
    resetReviewStars();
}

function closeReviewModal() {
    document.getElementById('review-modal').classList.add('hidden');
}

let selectedReviewStars = 5;
function setReviewStars(n) {
    selectedReviewStars = n;
    const stars = document.querySelectorAll('.star-picker i');
    stars.forEach((s, idx) => {
        if (idx < n) {
            s.classList.replace('fa-regular', 'fa-solid');
            s.classList.add('text-neon');
        } else {
            s.classList.replace('fa-solid', 'fa-regular');
            s.classList.remove('text-neon');
        }
    });
}

function resetReviewStars() {
    setReviewStars(5);
}

function handleReviewSubmit(event) {
    if (event) event.preventDefault();
    
    const name = document.getElementById('rev-name').value;
    const rubro = document.getElementById('rev-rubro').value;
    const text = document.getElementById('rev-text').value;

    if (!name || !text) {
        showToast("Por favor completa los campos obligatorios", "error");
        return;
    }

    const newReview = {
        name,
        rubro: rubro || "Cliente",
        text,
        stars: selectedReviewStars
    };

    reviews.unshift(newReview);
    localStorage.setItem('mtz_reviews', JSON.stringify(reviews));
    
    renderReviews();
    closeReviewModal();
    showToast("¡Gracias por tu reseña!", "success");
    
    // Clear form
    document.getElementById('rev-name').value = '';
    document.getElementById('rev-rubro').value = '';
    document.getElementById('rev-text').value = '';
}

// ==========================================================================
// 5. INTERACTIVE FUNCTIONS
// ==========================================================================
function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('-translate-y-full');
}

function openWhatsApp(customMsg = null) {
    const phone = "5493794236239"; 
    const msg = customMsg || "Hola buenas Servicio de MTZ estaba interesado en acceder a sus servicios de programacion web y automatizacion.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

function handleFormSubmit() {
    const rubro = document.getElementById('q-rubro').value;
    const details = document.getElementById('q-details').value;
    const chips = Array.from(document.querySelectorAll('input[name="service"]:checked')).map(c => c.value);
    
    if(!rubro) {
        showToast("Por favor selecciona un rubro", "error");
        return;
    }

    const newMsg = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        rubro,
        services: chips,
        details
    };
    
    messages.unshift(newMsg);
    localStorage.setItem('mtz_messages', JSON.stringify(messages));

    const messageText = `SOLICITUD DE SERVICIO MTZ\n\n- Rubro: ${rubro}\n- Servicios: ${chips.join(', ') || 'A definir'}\n- Detalles: ${details || 'Sin detalles'}`;
    
    showToast("Registro guardado. Abriendo WhatsApp...", "success");
    setTimeout(() => {
        openWhatsApp(messageText);
    }, 1500);
}

function handleWhatsAppFloater() {
    const rubroActual = prompt("¿A qué rubro se dirige tu proyecto?\n(E-commerce, Inmobiliaria, Restaurante, etc.)", "E-commerce");
    if(rubroActual) {
        const customMsg = `Hola buenas Servicio de MTZ estaba interesado en acceder a sus servicios de programacion web y automatizacion. Mi rubro es: ${rubroActual}.`;
        openWhatsApp(customMsg);
    }
}

function showToast(msg, type) {
    const toast = document.getElementById('toast');
    const text = document.getElementById('toast-msg');
    text.innerText = msg;
    
    toast.className = `fixed bottom-10 left-1/2 -translate-x-1/2 z-[2000] px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 transition-all pointer-events-none ${
        type === 'error' ? 'bg-red-500 text-white' : 'bg-white text-black'
    }`;

    toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
    }, 3000);
}

// ==========================================================================
// 6. ADMIN DASHBOARD LOGIC
// ==========================================================================
function handleLogoTripleClick() {
    logoClicks++;
    clearTimeout(logoTimer);
    logoTimer = setTimeout(() => { logoClicks = 0; }, 1000);

    if (logoClicks >= 3) {
        logoClicks = 0;
        document.getElementById('admin-modal').classList.remove('hidden');
        document.getElementById('admin-login-view').classList.remove('hidden');
        document.getElementById('admin-panel-view').classList.add('hidden');
    }
}

function closeAdmin() {
    document.getElementById('admin-modal').classList.add('hidden');
}

function tryLogin() {
    const user = document.getElementById('admin-user').value;
    const pass = document.getElementById('admin-pass').value;

    if (user === 'admin' && pass === 'mtz123') {
        document.getElementById('admin-login-view').classList.add('hidden');
        document.getElementById('admin-panel-view').classList.remove('hidden');
        showToast("Conexión Segura Establecida", "success");
        initDashboard();
    } else {
        showToast("Acceso Denegado: Credenciales Incorrectas", "error");
    }
}

function initDashboard() {
    switchTab('dash');
    updateStats();
    
    // File Handler
    const fileInput = document.getElementById('p-file');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        // Show Preview Container
        const previewContainer = document.getElementById('p-preview-container');
        previewContainer.classList.remove('hidden');

        if (file.type.startsWith('video/')) {
            convertVideoToGif(file);
        } else {
            if (file.size > 2 * 1024 * 1024) { // 2MB Limit Warning
                showToast("Archivo muy pesado. Esto podría fallar al guardar.", "error");
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                selectedFileBase64 = event.target.result;
                // Update Preview
                const previewImg = document.getElementById('p-preview-img');
                previewImg.src = selectedFileBase64;
            };
            reader.readAsDataURL(file);
        }
    }
}

function convertVideoToGif(file) {
    const processingOverlay = document.getElementById('p-processing');
    const previewImg = document.getElementById('p-preview-img');
    
    processingOverlay.classList.remove('hidden');
    
    // Create a temporary URL for the video
    const videoUrl = URL.createObjectURL(file);
    
    gifshot.createGIF({
        video: [videoUrl],
        gifWidth: 240,         // Smaller resolution for ultra-fast encoding
        gifHeight: 135,
        interval: 0.2,        // 5 FPS (Fast enough for a preview)
        numFrames: 10,        // Only 2 seconds of video
        frameDuration: 2,     // Visual speed adjustment
        sampleInterval: 35,   // Very high sample interval for instant-like encoding
        numWorkers: 4,
        keepCameraOn: false,
        progressCallback: function(captureProgress) {
            const progressInfo = document.getElementById('p-progress-text');
            if (progressInfo) {
                progressInfo.innerText = "Procesando: " + Math.round(captureProgress * 100) + "%";
            }
        }
    }, function(obj) {
        if(!obj.error) {
            selectedFileBase64 = obj.image;
            previewImg.src = selectedFileBase64;
            showToast("Video optimizado a GIF con éxito", "success");
        } else {
            showToast("Error al procesar video: " + obj.errorMsg, "error");
        }
        processingOverlay.classList.add('hidden');
        URL.revokeObjectURL(videoUrl);
    });
}

function switchTab(tabId) {
    const tabs = ['dash', 'projects', 'messages'];
    tabs.forEach(id => {
        document.getElementById(`tab-${id}`).classList.add('hidden');
        const btn = document.getElementById(`tab-btn-${id}`);
        btn.classList.remove('bg-neon', 'text-black');
        btn.classList.add('text-white/60', 'hover:bg-white/5');
    });

    document.getElementById(`tab-${tabId}`).classList.remove('hidden');
    const activeBtn = document.getElementById(`tab-btn-${tabId}`);
    activeBtn.classList.add('bg-neon', 'text-black');
    activeBtn.classList.remove('text-white/60', 'hover:bg-white/5');

    if (tabId === 'projects') renderAdminProjects();
    if (tabId === 'messages') renderAdminMessages();
}

function updateStats() {
    document.getElementById('stat-projects').innerText = portfolio.length;
    document.getElementById('stat-messages').innerText = messages.length;
    
    const activity = document.getElementById('recent-activity');
    activity.innerHTML = `
        <div class="flex items-center gap-4 text-sm bg-white/5 p-4 rounded-2xl">
            <span class="text-neon font-mono">[LOG]</span>
            <span>Sesión iniciada correctamente por el administrador.</span>
        </div>
        ${portfolio.length > 0 ? `
        <div class="flex items-center gap-4 text-sm">
            <span class="text-white/20 font-mono">[LOG]</span>
            <span>Sistema cuenta con ${portfolio.length} proyectos desplegados.</span>
        </div>` : ''}
    `;
}

// MANAGEMENT FUNCTIONS
function renderAdminProjects() {
    const list = document.getElementById('admin-projects-list');
    list.innerHTML = portfolio.map(p => `
        <div class="admin-item p-6 rounded-3xl flex items-center justify-between gap-6">
            <div class="flex items-center gap-6">
                <img src="${p.gif}" class="w-16 h-16 object-cover rounded-xl border border-white/10 shadow-lg">
                <div>
                    <h5 class="font-bold">${p.title}</h5>
                    <p class="text-[10px] text-white/40 truncate max-w-[200px] font-mono">${p.link}</p>
                </div>
            </div>
            <button onclick="deleteProject(${p.id})" class="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');
}

function deleteProject(id) {
    if(confirm('¿Estás seguro de que quieres eliminar este proyecto de la galaxia?')) {
        portfolio = portfolio.filter(p => p.id !== id);
        localStorage.setItem('mtz_portfolio', JSON.stringify(portfolio));
        renderPortfolio();
        renderAdminProjects();
        updateStats();
        showToast("Proyecto eliminado con éxito", "success");
    }
}

function showAddProjectForm() {
    document.getElementById('add-project-form').classList.remove('hidden');
}

function hideAddProjectForm() {
    document.getElementById('add-project-form').classList.add('hidden');
    document.getElementById('p-preview-container').classList.add('hidden');
    selectedFileBase64 = null;
}

function addProject() {
    const title = document.getElementById('p-title').value;
    const link = document.getElementById('p-link').value;

    if (!title || !selectedFileBase64 || !link) {
        showToast("Todos los campos y el archivo son obligatorios", "error");
        return;
    }

    const newProject = { 
        id: Date.now(), 
        title, 
        gif: selectedFileBase64, 
        link 
    };

    try {
        portfolio.unshift(newProject);
        localStorage.setItem('mtz_portfolio', JSON.stringify(portfolio));
        
        renderPortfolio();
        renderAdminProjects();
        updateStats();
        hideAddProjectForm();
        
        document.getElementById('p-title').value = '';
        document.getElementById('p-link').value = '';
        document.getElementById('p-file').value = '';
        
        showToast("¡Proyecto desplegado con éxito!", "success");
    } catch (e) {
        showToast("Error Espacial: La imagen es demasiado pesada para la memoria.", "error");
        portfolio.shift(); // Remove failed project
    }
}

function renderAdminMessages() {
    const list = document.getElementById('admin-messages-list');
    if (messages.length === 0) {
        list.innerHTML = `<p class="text-white/40 text-center py-20 italic">No hay mensajes registrados aún.</p>`;
        return;
    }
    list.innerHTML = messages.map(m => `
        <div class="admin-item p-8 rounded-[32px] space-y-4">
            <div class="flex justify-between items-start">
                <div>
                    <span class="text-[10px] text-neon font-black uppercase tracking-widest bg-neon/10 px-3 py-1 rounded-full">${m.rubro}</span>
                    <h5 class="text-lg font-bold mt-2">${m.services.join(', ') || 'Consulta General'}</h5>
                </div>
                <p class="text-[10px] text-white/30 font-mono">${m.date}</p>
            </div>
            <p class="text-white/60 text-sm leading-relaxed bg-white/5 p-4 rounded-2xl italic">"${m.details || 'Sin detalles adicionales'}"</p>
        </div>
    `).join('');
}

// ==========================================================================
// 7. ROBOT ASSISTANT LOGIC
// ==========================================================================
function toggleRobot() {
    robotInteracted = true; // Stop auto-showing once they click
    const bubble = document.getElementById('robot-bubble');
    const isHidden = bubble.classList.toggle('hidden');
    
    if (!isHidden) {
        // Reset to step 1
        document.getElementById('robot-step-1').classList.remove('hidden');
        document.getElementById('robot-step-2').classList.add('hidden');
        document.getElementById('robot-step-thanks').classList.add('hidden');
        resetRobotStars();
    }
}

function handleRobotStar(n) {
    robotInteracted = true; // User interacted!
    const stars = document.querySelectorAll('.robot-stars i');
    stars.forEach((s, idx) => {
        if (idx < n) {
            s.classList.replace('fa-regular', 'fa-solid');
            s.classList.add('text-neon');
        } else {
            s.classList.replace('fa-solid', 'fa-regular');
            s.classList.remove('text-neon');
        }
    });

    setTimeout(() => {
        document.getElementById('robot-step-1').classList.add('hidden');
        document.getElementById('robot-step-2').classList.remove('hidden');
    }, 600);
}

function resetRobotStars() {
    const stars = document.querySelectorAll('.robot-stars i');
    stars.forEach(s => {
        s.classList.replace('fa-solid', 'fa-regular');
        s.classList.remove('text-neon');
    });
}

function handleRobotCTA() {
    document.getElementById('robot-step-2').classList.add('hidden');
    document.getElementById('robot-step-thanks').classList.remove('hidden');
    
    setTimeout(() => {
        const msg = "¡Hola! Vi al robot en tu portafolio y me encantó la calidad de la página. Me gustaría solicitar mi propia web con esa misma calidad.";
        openWhatsApp(msg);
        toggleRobot();
    }, 1500);
}
