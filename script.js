/* ============================================
   KHAN REAL ESTATE — JAVASCRIPT
   GSAP Animations, Chatbot, Toastify, Confetti
   ============================================ */

/* ===========================
   0. iOS PRELOADER HANDLER
=========================== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('iosPreloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ===========================
       1. CONFETTI ON PAGE LOAD
    =========================== */
    const launchConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;
        const colors = ['#00d2ff', '#7b2ff7', '#f72585', '#fca311', '#ffffff'];
        (function frame() {
            confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors });
            confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors });
            if (Date.now() < end) requestAnimationFrame(frame);
        })();
    };
    setTimeout(launchConfetti, 500);

    /* ===========================
       2. HERO PARTICLES
    =========================== */
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const span = document.createElement('span');
            const size = Math.random() * 8 + 3;
            span.style.cssText = `
                width:${size}px;height:${size}px;
                left:${Math.random() * 100}%;
                animation-duration:${Math.random() * 20 + 10}s;
                animation-delay:${Math.random() * 10}s;
            `;
            particlesContainer.appendChild(span);
        }
    }

    /* ===========================
       3. NAVBAR SCROLL EFFECT
    =========================== */
    const nav = document.getElementById('mainNav');
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
        // Active nav link
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    });

    /* ===========================
       4. GSAP SCROLL ANIMATIONS
    =========================== */
    gsap.registerPlugin(ScrollTrigger);

    // Reveal Up
    gsap.utils.toArray('.reveal-up').forEach(el => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        });
    });
    // Reveal Left
    gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.fromTo(el, { x: -80, opacity: 0 }, {
            x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        });
    });
    // Reveal Right
    gsap.utils.toArray('.reveal-right').forEach(el => {
        gsap.fromTo(el, { x: 80, opacity: 0 }, {
            x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        });
    });

    // Hero entrance animations
    gsap.from('.hero-tag', { y: 30, opacity: 0, duration: 0.7, delay: 0.3 });
    gsap.from('.hero-title', { y: 40, opacity: 0, duration: 0.8, delay: 0.5 });
    gsap.from('.hero-desc', { y: 40, opacity: 0, duration: 0.8, delay: 0.7 });
    gsap.from('.hero-btns', { y: 30, opacity: 0, duration: 0.7, delay: 0.9 });
    gsap.from('.hero-stats', { y: 30, opacity: 0, duration: 0.7, delay: 1.1 });
    gsap.from('.hero-image-card', { x: 60, duration: 1, delay: 0.8, ease: 'power3.out' });

    /* ===========================
       5. COUNTER ANIMATION
    =========================== */
    const animateCounters = () => {
        document.querySelectorAll('.hero-stat-num').forEach(counter => {
            const target = +counter.dataset.target;
            const duration = 2000;
            const start = performance.now();
            const tick = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                counter.textContent = Math.floor(progress * target);
                if (progress < 1) requestAnimationFrame(tick);
                else counter.textContent = target;
            };
            requestAnimationFrame(tick);
        });
    };
    // Trigger when hero is visible
    ScrollTrigger.create({ trigger: '.hero-stats', start: 'top 90%', onEnter: animateCounters, once: true });

    /* ===========================
       6. FANCYBOX INIT
    =========================== */
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind('[data-fancybox="gallery"]', {
            Toolbar: { display: { left: [], middle: ['prev', 'counter', 'next'], right: ['close'] } },
            Thumbs: { type: 'classic' },
        });
    }

    /* ===========================
       7. COUNTDOWN TIMER
    =========================== */
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7); // 7 days from now
    const updateCountdown = () => {
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) return;
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
        document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
        document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
    };
    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ===========================
       8. TOASTIFY NOTIFICATIONS
    =========================== */
    const toastNames = [
        { name: 'Ahmed Khan', flag: '🇵🇰' },
        { name: 'Bilal Hussain', flag: '🇵🇰' },
        { name: 'Fatima Noor', flag: '🇵🇰' },
        { name: 'Ayesha Siddiqui', flag: '🇵🇰' },
        { name: 'Usman Javed', flag: '🇵🇰' },
        { name: 'Zainab Malik', flag: '🇵🇰' },
        { name: 'Omar Farooq', flag: '🇵🇰' },
        { name: 'Hassan Ali', flag: '🇵🇰' },
        { name: 'Sana Tariq', flag: '🇵🇰' },
        { name: 'Ali Raza', flag: '🇵🇰' },
        { name: 'Hira Sheikh', flag: '🇵🇰' },
        { name: 'Kamran Akmal', flag: '🇵🇰' },
        { name: 'Nadia Jameel', flag: '🇵🇰' },
        { name: 'Imran Baloch', flag: '🇵🇰' },
        { name: 'Rabia Aslam', flag: '🇵🇰' },
        { name: 'Tariq Mehmood', flag: '🇵🇰' },
        { name: 'Saima Nawaz', flag: '🇵🇰' },
        { name: 'Waqar Ahmed', flag: '🇵🇰' },
    ];
    const toastProducts = [
        'just purchased a 5 Marla Plot in City Housing 🏡',
        'booked a Luxury House in DG Khan 🏠',
        'invested in Commercial Property on Jampur Road 🏢',
        'just bought a 10 Marla Plot in Satellite Town 📐',
        'purchased Agricultural Land near Taunsa 🌾',
        'booked a 1 Kanal Villa in Basti Mohri 🏰',
        'rented a Modern Apartment in Block C 🏙️',
        'bought a Shop on Multan Road 🏪',
        'invested in DG Khan Housing Scheme 📈',
        'purchased a Corner Plot in Cantt Area 🎯',
    ];
    const timeAgo = ['just now', '2 min ago', '5 min ago', '8 min ago', '12 min ago', '15 min ago', '20 min ago'];
    let toastsEnabled = true;
    const showRandomToast = () => {
        if (!toastsEnabled) return;
        const person = toastNames[Math.floor(Math.random() * toastNames.length)];
        const product = toastProducts[Math.floor(Math.random() * toastProducts.length)];
        const toast = Toastify({
            text: `${person.flag} ${person.name} ${product} — ${timeAgo[Math.floor(Math.random() * timeAgo.length)]}`,
            duration: 4000,
            gravity: 'bottom',
            position: 'center',
            close: false,
            stopOnFocus: true,
            style: {
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(20px)',
                webkitBackdropFilter: 'blur(20px)',
                color: '#1a1a2e',
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: '14px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                padding: '12px 44px 12px 18px',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.85rem',
                position: 'relative',
            },
        });
        toast.showToast();
        // Add cancel button at right center
        const toastEl = toast.toastElement;
        if (toastEl) {
            toastEl.style.position = 'relative';
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'toast-cancel-btn';
            cancelBtn.innerHTML = '✕';
            cancelBtn.title = 'Stop notifications';
            cancelBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toastsEnabled = false;
                toastEl.remove();
                document.querySelectorAll('.toastify').forEach(t => t.remove());
            });
            toastEl.appendChild(cancelBtn);
        }
    };
    // First toast after 6s, then random 10-25s intervals for realism
    setTimeout(showRandomToast, 6000);
    const scheduleNext = () => {
        const delay = 10000 + Math.random() * 15000; // 10-25 seconds
        setTimeout(() => {
            if (toastsEnabled) { showRandomToast(); scheduleNext(); }
        }, delay);
    };
    scheduleNext();

    /* ===========================
       9. CHATBOT ENGINE
    =========================== */
    const chatBody = document.getElementById('chatbotBody');
    const chatSuggestions = document.getElementById('chatSuggestions');
    const chatToggle = document.getElementById('chatbotToggle');
    const chatWindow = document.getElementById('chatbotWindow');
    const chatClose = document.getElementById('chatbotClose');
    let chatEnded = false;

    // Toggle chatbot
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active') && chatBody.children.length === 0) {
            startChat();
        }
    });
    chatClose.addEventListener('click', () => chatWindow.classList.remove('active'));

    const addMsg = (text, type = 'bot') => {
        const div = document.createElement('div');
        div.className = `chat-msg ${type}`;
        div.innerHTML = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const setSuggestions = (btns) => {
        chatSuggestions.innerHTML = '';
        if (chatEnded) return;
        btns.forEach(btn => {
            const b = document.createElement('button');
            b.className = 'chat-suggest-btn';
            b.textContent = btn.label;
            b.addEventListener('click', () => {
                addMsg(btn.label, 'user');
                btn.action();
            });
            chatSuggestions.appendChild(b);
        });
    };

    const endChat = () => {
        chatEnded = true;
        chatSuggestions.innerHTML = '';
        setTimeout(() => {
            addMsg('This conversation has been ended. Please contact our customer support for more details.', 'ended');
            setTimeout(() => {
                const callDiv = document.createElement('div');
                callDiv.style.textAlign = 'center';
                callDiv.innerHTML = '<a href="tel:03211234456" class="chat-call-btn"><i class="fas fa-phone-alt"></i> Call Customer Support</a>';
                chatBody.appendChild(callDiv);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 600);
        }, 500);
    };

    // Chat flow states
    const startChat = () => {
        addMsg("👋 Welcome to <strong>Khan Real Estate!</strong> I'm your virtual assistant. How can I help you today?");
        setTimeout(() => {
            setSuggestions([
                { label: '🏠 View Properties', action: flowProperties },
                { label: '💼 Our Services', action: flowServices },
                { label: '💰 Pricing Info', action: flowPricing },
                { label: '📍 Location & Contact', action: flowLocation },
                { label: '⭐ Why Khan Real Estate?', action: flowWhy },
            ]);
        }, 400);
    };

    const flowProperties = () => {
        addMsg("We have amazing properties across Dera Ghazi Khan! 🏡 What type of property interests you?");
        setTimeout(() => setSuggestions([
            { label: '🏡 Residential Plots', action: () => flowPropertyDetail('residential') },
            { label: '🏢 Commercial Properties', action: () => flowPropertyDetail('commercial') },
            { label: '🏘️ Houses for Sale', action: () => flowPropertyDetail('houses') },
            { label: '🌾 Agricultural Land', action: () => flowPropertyDetail('agricultural') },
            { label: '📞 Talk to Agent', action: flowContactAgent },
        ]), 300);
    };

    const flowPropertyDetail = (type) => {
        const details = {
            residential: "We have plots ranging from <strong>5 Marla to 2 Kanal</strong> in City Housing, Satellite Town, and Basti Mohri. Prices start from <strong>PKR 15 Lac</strong>. All plots are verified with clear titles! ✅",
            commercial: "Prime commercial properties on <strong>Main Jampur Road, Multan Road & City Center</strong>. Shops, plazas & offices available. Starting from <strong>PKR 40 Lac</strong>. High ROI guaranteed! 📈",
            houses: "Beautiful ready-to-move houses from <strong>5 Marla to 1 Kanal</strong>. Modern designs with all amenities. Prices from <strong>PKR 60 Lac to 3 Crore</strong>. 🏠",
            agricultural: "Fertile agricultural land near canal, <strong>5 Acres to 100+ Acres</strong>. Ideal for farming & long-term investment. Starting <strong>PKR 25 Lac/Acre</strong>. 🌾",
        };
        addMsg(details[type]);
        setTimeout(() => setSuggestions([
            { label: '📋 More Details', action: flowMoreDetails },
            { label: '💵 Payment Plans', action: flowPayment },
            { label: '📍 Available Locations', action: flowLocations },
            { label: '📞 Contact Agent', action: flowContactAgent },
        ]), 300);
    };

    const flowMoreDetails = () => {
        addMsg("Our properties feature: <br>✅ Verified ownership documents<br>✅ Clear land titles<br>✅ Proximity to schools, hospitals & markets<br>✅ Developed infrastructure<br>✅ Instant possession available<br><br>Would you like to schedule a visit? 🗓️");
        setTimeout(() => setSuggestions([
            { label: '📅 Schedule a Visit', action: flowSchedule },
            { label: '📞 Call Now', action: flowContactAgent },
            { label: '🏠 View Other Properties', action: flowProperties },
        ]), 300);
    };

    const flowPayment = () => {
        addMsg("We offer flexible payment plans! 💳<br><br>🔹 <strong>Cash Payment</strong> — Get up to 10% discount<br>🔹 <strong>Installments</strong> — Easy monthly/quarterly plans<br>🔹 <strong>Bank Financing</strong> — We assist with all documentation<br><br>Want to know the exact payment plan for a specific property?");
        setTimeout(() => setSuggestions([
            { label: '💰 Get Exact Quote', action: flowSchedule },
            { label: '📞 Discuss with Agent', action: flowContactAgent },
            { label: '🔙 Back to Properties', action: flowProperties },
        ]), 300);
    };

    const flowLocations = () => {
        addMsg("📍 Our properties are located in prime areas:<br><br>🔹 City Housing Society<br>🔹 Satellite Town<br>🔹 Basti Mohri<br>🔹 Main Jampur Road<br>🔹 Multan Road<br>🔹 Taunsa Road<br>🔹 DG Khan Cantt Area<br><br>All locations offer excellent connectivity and future value appreciation! 📈");
        setTimeout(() => setSuggestions([
            { label: '📅 Book a Site Visit', action: flowSchedule },
            { label: '📞 Call for Directions', action: flowContactAgent },
            { label: '🔙 View Properties', action: flowProperties },
        ]), 300);
    };

    const flowServices = () => {
        addMsg("We offer a complete range of real estate services! 💼<br><br>🏠 <strong>Property Buying & Selling</strong><br>📊 <strong>Investment Consultation</strong><br>⚖️ <strong>Legal & Documentation</strong><br>🏗️ <strong>Property Management</strong><br>💵 <strong>Property Valuation</strong><br>🔑 <strong>Rental Services</strong><br><br>Which service interests you?");
        setTimeout(() => setSuggestions([
            { label: '🏠 I Want to Buy', action: flowWantBuy },
            { label: '💰 I Want to Sell', action: flowWantSell },
            { label: '📊 Investment Guide', action: flowInvestment },
            { label: '⚖️ Legal Help', action: flowLegal },
        ]), 300);
    };

    const flowWantBuy = () => {
        addMsg("Great choice! 🎉 Our expert agents will find the perfect property matching your needs. What's your budget range?");
        setTimeout(() => setSuggestions([
            { label: 'Under 50 Lac', action: () => flowBudget('Under 50 Lac') },
            { label: '50 Lac - 1 Crore', action: () => flowBudget('50 Lac - 1 Crore') },
            { label: '1 - 3 Crore', action: () => flowBudget('1 - 3 Crore') },
            { label: 'Above 3 Crore', action: () => flowBudget('Above 3 Crore') },
        ]), 300);
    };

    const flowBudget = (range) => {
        addMsg(`Excellent! We have several premium properties in the <strong>${range}</strong> range. 🏡✨<br><br>Our agent can prepare a customized list and schedule visits for you. Ready to take the next step?`);
        setTimeout(() => setSuggestions([
            { label: '📞 Call Now', action: flowContactAgent },
            { label: '📅 Schedule Visit', action: flowSchedule },
            { label: '📧 Send Me Details', action: flowEmail },
        ]), 300);
    };

    const flowWantSell = () => {
        addMsg("Want to sell your property? 💸 We have a vast buyer network and can get you the <strong>best market price</strong>!<br><br>📌 Free property valuation<br>📌 Professional photography & marketing<br>📌 Buyer verification<br>📌 Complete documentation support<br><br>Let us help you sell faster!");
        setTimeout(() => setSuggestions([
            { label: '📞 List My Property', action: flowContactAgent },
            { label: '💵 Free Valuation', action: flowSchedule },
            { label: '🔙 Back to Services', action: flowServices },
        ]), 300);
    };

    const flowInvestment = () => {
        addMsg("Smart move! 📈 DG Khan's real estate market is booming. Here's why you should invest NOW:<br><br>🔥 Property prices up <strong>25% in last year</strong><br>🔥 New CPEC-linked development projects<br>🔥 Government housing schemes launching<br>🔥 Agricultural land values rising steadily<br><br>Our experts can guide you to HIGH-ROI opportunities!");
        setTimeout(() => setSuggestions([
            { label: '📞 Talk to Investment Expert', action: flowContactAgent },
            { label: '🏠 View Investment Properties', action: flowProperties },
            { label: '🔙 Back to Services', action: flowServices },
        ]), 300);
    };

    const flowLegal = () => {
        addMsg("We provide complete legal support! ⚖️<br><br>✅ Title verification & due diligence<br>✅ Sale deed & agreement drafting<br>✅ Property mutation & registry<br>✅ NOC & approval assistance<br>✅ Dispute resolution<br><br>Your property transaction, legally bulletproof! 🛡️");
        setTimeout(() => setSuggestions([
            { label: '📞 Consult Legal Expert', action: flowContactAgent },
            { label: '🔙 Back to Services', action: flowServices },
        ]), 300);
    };

    const flowPricing = () => {
        addMsg("💰 Here's a quick pricing overview in DG Khan:<br><br>🏡 <strong>Residential Plots:</strong> PKR 15 Lac — 1.5 Crore<br>🏢 <strong>Commercial:</strong> PKR 40 Lac — 5 Crore<br>🏠 <strong>Houses:</strong> PKR 60 Lac — 3 Crore<br>🌾 <strong>Agricultural Land:</strong> PKR 25 Lac/Acre+<br>🏙️ <strong>Apartments:</strong> PKR 25K — 50K/month<br><br>⚡ <strong>Special Offer:</strong> 10% OFF on booking charges this month!");
        setTimeout(() => setSuggestions([
            { label: '💵 Get Exact Quote', action: flowSchedule },
            { label: '🏠 View Properties', action: flowProperties },
            { label: '📞 Call for Pricing', action: flowContactAgent },
        ]), 300);
    };

    const flowLocation = () => {
        addMsg("📍 <strong>Khan Real Estate Office</strong><br><br>📌 Main Jampur Road, Dera Ghazi Khan, Punjab, Pakistan<br>📞 <strong>0321-1234-56</strong><br>📧 khan@gmail.com<br>🕘 Mon — Sat: 9:00 AM — 7:00 PM<br><br>We're right in the heart of DG Khan! Easy to find, easy to reach. 🗺️");
        setTimeout(() => setSuggestions([
            { label: '📞 Call Us', action: flowContactAgent },
            { label: '🏠 View Properties', action: flowProperties },
            { label: '💼 Our Services', action: flowServices },
        ]), 300);
    };

    const flowWhy = () => {
        addMsg("Why <strong>1,200+ families</strong> trust Khan Real Estate? 🏆<br><br>✅ <strong>15+ Years</strong> of local market expertise<br>✅ <strong>100% Verified</strong> — No fraudulent listings<br>✅ <strong>Best Prices</strong> — Direct owner connections<br>✅ <strong>Full Legal Support</strong> — Registry to mutation<br>✅ <strong>After-Sale Service</strong> — We don't disappear after the deal<br><br>Your trust is our greatest asset! 💎");
        setTimeout(() => setSuggestions([
            { label: '🏠 View Properties', action: flowProperties },
            { label: '📞 Talk to Us', action: flowContactAgent },
            { label: '💼 Our Services', action: flowServices },
        ]), 300);
    };

    const flowSchedule = () => {
        addMsg("📅 To schedule a property visit or get a personalized quote, please contact us:<br><br>📞 <strong>0321-1234-56</strong><br>📧 khan@gmail.com<br><br>Our agent will arrange everything for you within 24 hours! ⚡");
        setTimeout(() => endChat(), 800);
    };

    const flowEmail = () => {
        addMsg("📧 Please email us at <strong>khan@gmail.com</strong> with your requirements, and we'll send you a curated property list within 24 hours! You can also WhatsApp us for faster response. ⚡");
        setTimeout(() => endChat(), 800);
    };

    const flowContactAgent = () => {
        addMsg("📞 You can reach our expert team right now!<br><br>📱 <strong>0321-1234-56</strong><br>Available Mon — Sat, 9 AM — 7 PM<br><br>We're ready to help you find your dream property! 🏡✨");
        setTimeout(() => endChat(), 800);
    };

    /* ===========================
       10. CONTACT FORM HANDLER
    =========================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            Toastify({
                text: '✅ Message sent successfully! We\'ll contact you within 30 minutes.',
                duration: 5000,
                gravity: 'top',
                position: 'center',
                style: {
                    background: 'linear-gradient(135deg, #00d2ff, #7b2ff7)',
                    borderRadius: '12px',
                    fontFamily: "'Poppins', sans-serif",
                },
            }).showToast();
            contactForm.reset();
        });
    }

    /* ===========================
       11. SMOOTH SCROLL FOR NAV
    =========================== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = nav.offsetHeight + 10;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
                // Close mobile menu
                const navCollapse = document.getElementById('navMenu');
                if (navCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navCollapse)?.hide();
                }
            }
        });
    });

    /* ===========================
       12. GSAP STAGGER FOR CARDS
    =========================== */
    // Stagger service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.fromTo(card, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 88%' }
        });
    });
    // Stagger property cards
    gsap.utils.toArray('.property-card').forEach((card, i) => {
        gsap.fromTo(card, { scale: 0.9, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 0.6, delay: i * 0.08,
            scrollTrigger: { trigger: card, start: 'top 90%' }
        });
    });
    // Gallery images
    gsap.utils.toArray('.gallery-img').forEach((img, i) => {
        gsap.fromTo(img, { scale: 0.85, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 0.5, delay: i * 0.08,
            scrollTrigger: { trigger: img, start: 'top 90%' }
        });
    });

    console.log('🏡 Khan Real Estate — Website loaded successfully!');
});