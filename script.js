// ===== Navegación Responsiva =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Cerrar menú al hacer scroll
document.addEventListener('scroll', () => {
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ===== Actualizar Link Activo =====
window.addEventListener('load', () => {
    updateActiveLink();
});

function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== Filtro de Portafolio =====
const filterButtons = document.querySelectorAll('.filter-btn');
const proyectoCards = document.querySelectorAll('.proyecto-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            proyectoCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// ===== Formulario de Contacto =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        
        // Obtener datos del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validar formulario
        if (!nombre || !email || !asunto || !mensaje) {
            mostrarStatus('Por favor completa todos los campos requeridos', 'error', formStatus);
            return;
        }
        
        // Validar email
        if (!isValidEmail(email)) {
            mostrarStatus('Por favor ingresa un email válido', 'error', formStatus);
            return;
        }
        
        // Simular envío (en producción, enviar a un servidor)
        mostrarStatus('Enviando mensaje...', null, formStatus);
        
        setTimeout(() => {
            mostrarStatus('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success', formStatus);
            contactForm.reset();
            
            // Limpiar mensaje después de 5 segundos
            setTimeout(() => {
                formStatus.classList.remove('show');
            }, 5000);
        }, 1000);
    });
}

function mostrarStatus(mensaje, tipo, elemento) {
    if (!elemento) return;
    
    elemento.textContent = mensaje;
    elemento.classList.add('show');
    
    if (tipo) {
        elemento.classList.remove('success', 'error');
        elemento.classList.add(tipo);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== FAQ Interactivo =====
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        
        // Cerrar otros FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
        
        // Toggle del FAQ actual
        faqItem.classList.toggle('active');
    });
});

// ===== Smooth Scroll para Enlaces Internos =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== Animación de Scroll para Elementos =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos en la página
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.servicio-card, .stat-item, .proyecto-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== Efecto Paralax Suave =====
window.addEventListener('scroll', () => {
    const gradientBox = document.querySelector('.gradient-box');
    if (gradientBox) {
        const scrollY = window.scrollY;
        gradientBox.style.transform = `translateY(${scrollY * 0.1}px) rotateZ(${scrollY * 0.02}deg)`;
    }
});

// ===== Validación de Entrada en Tiempo Real =====
if (contactForm) {
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = '#ff6b6b';
            } else {
                emailInput.style.borderColor = '';
            }
        });
    }
    
    if (telefonoInput) {
        telefonoInput.addEventListener('input', () => {
            telefonoInput.value = telefonoInput.value.replace(/[^\d+\-\s()]/g, '');
        });
    }
}

// ===== Manejo de Vista Mobile =====
function handleMobileNav() {
    if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
    }
}

window.addEventListener('resize', handleMobileNav);

// ===== Chatbot AI =====
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose  = document.getElementById('chatClose');
const chatInput  = document.getElementById('chatInput');
const sendBtn    = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const chatBadge  = document.getElementById('chatBadge');

// ===== Groq API Config =====
const GROQ_API_KEY = 'REEMPLAZA_CON_TU_CLAVE_API'; // Reemplazá con tu API key de https://console.groq.com
const GROQ_MODEL   = 'meta-llama/llama-4-scout-17b-16e-instruct';
const GROQ_SYSTEM  = `Sos el asistente virtual de LimaTec, una empresa de desarrollo web y mobile ubicada en Buenos Aires, Argentina.
Respondé siempre en español rioplatense (tuteo con "vos", "podés", "tenés", etc.), de forma amigable, concisa y profesional.
Información de la empresa:
- Servicios: Desarrollo Web (React, Tailwind, Vue, Angular, Node.js), Desarrollo Mobile (React Native, Flutter), Desarrolo en Python, Java, Desarrollo IoT con Microcontroladores, Consultoría Tech.
- Precios: desde $150,000, según complejidad.
- Plazos: webs simples 2-4 semanas, proyectos complejos 1-3 meses.
- Contacto: limadevbsas@gmail.com | Formulario en /contacto.html
- Portafolio: /portafolio.html
- Horario: Lun-Vie 9:00-18:00
Solo respondé preguntas relacionadas con la empresa y sus servicios. Si la pregunta no tiene relación, redirigí amablemente al tema.`;

const chatHistory = [];

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        const isOpen = chatWindow.classList.contains('active');
        chatWindow.classList.toggle('active');
        chatToggle.querySelector('.chat-icon').style.display = isOpen ? 'block' : 'none';
        chatToggle.querySelector('.close-icon').style.display = isOpen ? 'none' : 'block';
        if (!isOpen && chatBadge) chatBadge.style.display = 'none';
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        chatToggle.querySelector('.chat-icon').style.display = 'block';
        chatToggle.querySelector('.close-icon').style.display = 'none';
    });
}

if (sendBtn)   sendBtn.addEventListener('click', chatEnviar);
if (chatInput) chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') chatEnviar(); });

document.addEventListener('click', e => {
    if (e.target.classList.contains('suggestion-btn')) {
        const text = e.target.textContent.replace(/^\S+\s/, '').trim();
        chatAgregarMsg(text, 'user');
        e.target.closest('.chat-suggestions')?.remove();
        chatResponder(text);
    }
});

async function chatEnviar() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text) return;
    chatAgregarMsg(text, 'user');
    chatInput.value = '';
    chatResponder(text);
}

function chatAgregarMsg(text, tipo) {
    if (!chatMessages) return;
    const div = document.createElement('div');
    div.className = `chat-msg ${tipo}`;
    div.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

function chatTyping() {
    const div = document.createElement('div');
    div.className = 'chat-msg bot typing';
    div.innerHTML = '<p><span class="dot"></span><span class="dot"></span><span class="dot"></span></p>';
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

async function chatResponder(userText) {
    chatHistory.push({ role: 'user', content: userText });

    const typing = chatTyping();
    sendBtn.disabled = true;
    chatInput.disabled = true;

    try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: [
                    { role: 'system', content: GROQ_SYSTEM },
                    ...chatHistory
                ],
                max_tokens: 300,
                temperature: 0.7
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error?.message || 'Error en la API');
        }

        const reply = data.choices[0].message.content.trim();
        chatHistory.push({ role: 'assistant', content: reply });

        typing.remove();
        const div = document.createElement('div');
        div.className = 'chat-msg bot';
        
        // Crear el párrafo con la respuesta
        const p = document.createElement('p');
        p.innerHTML = reply.replace(/\n/g, '<br>');
        div.appendChild(p);
        
        // Detectar palabras clave y agregar botones
        const replyLower = reply.toLowerCase();
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '0.5rem';
        buttonContainer.style.marginTop = '0.5rem';
        buttonContainer.style.flexWrap = 'wrap';
        
        let hasButtons = false;
        
        if (replyLower.includes('contacto') || replyLower.includes('formulario') || replyLower.includes('email')) {
            const btn = document.createElement('a');
            btn.href = 'contacto.html';
            btn.textContent = '📞 Ir a Contacto';
            btn.style.padding = '0.6rem 1rem';
            btn.style.background = 'linear-gradient(135deg, #00d4ff, #00ff88)';
            btn.style.color = '#0f0f0f';
            btn.style.borderRadius = '8px';
            btn.style.fontWeight = '600';
            btn.style.textDecoration = 'none';
            btn.style.fontSize = '0.85rem';
            btn.style.display = 'inline-block';
            btn.style.cursor = 'pointer';
            btn.style.transition = 'transform 0.2s ease';
            btn.addEventListener('mouseenter', e => e.target.style.transform = 'scale(1.05)');
            btn.addEventListener('mouseleave', e => e.target.style.transform = 'scale(1)');
            buttonContainer.appendChild(btn);
            hasButtons = true;
        }
        
        if (replyLower.includes('portafolio') || replyLower.includes('proyecto') || replyLower.includes('trabajos')) {
            const btn = document.createElement('a');
            btn.href = 'portafolio.html';
            btn.textContent = '🎨 Ver Portafolio';
            btn.style.padding = '0.6rem 1rem';
            btn.style.background = 'linear-gradient(135deg, #00d4ff, #00ff88)';
            btn.style.color = '#0f0f0f';
            btn.style.borderRadius = '8px';
            btn.style.fontWeight = '600';
            btn.style.textDecoration = 'none';
            btn.style.fontSize = '0.85rem';
            btn.style.display = 'inline-block';
            btn.style.cursor = 'pointer';
            btn.style.transition = 'transform 0.2s ease';
            btn.addEventListener('mouseenter', e => e.target.style.transform = 'scale(1.05)');
            btn.addEventListener('mouseleave', e => e.target.style.transform = 'scale(1)');
            buttonContainer.appendChild(btn);
            hasButtons = true;
        }
        
        if (hasButtons) {
            div.appendChild(buttonContainer);
        }
        
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;

    } catch (err) {
        typing.remove();
        const div = document.createElement('div');
        div.className = 'chat-msg bot';
        div.innerHTML = `<p style="color:#ff6b6b;">⚠️ Error: ${err.message}. Verificá tu API key.</p>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } finally {
        sendBtn.disabled = false;
        chatInput.disabled = false;
        chatInput.focus();
    }
}

// Log de inicialización
console.log('LimaTec - Script cargado correctamente ✓');
