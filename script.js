/* ==========================================
   AI NEXUS
   app.js
========================================== */

// ================================
// PRELOADER
// ================================

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    preloader.style.opacity = "0";

    preloader.style.visibility = "hidden";

    preloader.style.transition = "0.5s";

});

// ================================
// STICKY NAVBAR
// ================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});

// ================================
// SCROLL TO TOP
// ================================

const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollBtn.classList.add("show");

    } else {

        scrollBtn.classList.remove("show");

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ================================
// DARK / LIGHT MODE
// ================================

const themeBtn = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {

        localStorage.setItem("theme", "light");

        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "dark");

        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';

    }

});

// ================================
// SMOOTH NAVIGATION
// ================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// =====================================
// ANIMATED COUNTERS
// =====================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = +counter.dataset.target;

        const speed = 80;

        const updateCounter = () => {

            const current = +counter.innerText;

            const increment = Math.ceil(target / speed);

            if (current < target) {

                counter.innerText = current + increment;

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target.toLocaleString();

            }

        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

// =====================================
// ACTIVE NAVIGATION
// =====================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// =====================================
// CHART.JS
// =====================================

const chartContainer = document.querySelector(".chart-area");

if (chartContainer) {

    chartContainer.innerHTML =
        '<canvas id="analyticsChart"></canvas>';

    const ctx = document
        .getElementById("analyticsChart");

    new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"
            ],

            datasets: [{

                label: "Growth",

                data: [12, 25, 20, 35, 48, 62],

                borderColor: "#00D4FF",

                backgroundColor: "rgba(0,212,255,.15)",

                fill: true,

                tension: .4

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "#d7dde8"

                    },

                    grid: {

                        color: "rgba(255,255,255,.08)"

                    }

                },

                y: {

                    ticks: {

                        color: "#d7dde8"

                    },

                    grid: {

                        color: "rgba(255,255,255,.08)"

                    }

                }

            }

        }

    });

}

// =====================================
// FLOATING CARDS ANIMATION
// =====================================

document.querySelectorAll(".floating-card").forEach((card, index) => {

    setInterval(() => {

        card.style.transform =
            `translateY(${Math.sin(Date.now() / 600 + index) * 12}px)`;

    }, 30);

});

// =====================================
// LOGIN & SIGNUP MODALS
// =====================================

const loginBtn = document.querySelector(".loginBtn");
const signupBtn = document.querySelector(".signupBtn");

const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

if (loginBtn && loginModal) {

    const loginBootstrapModal = new bootstrap.Modal(loginModal);

    loginBtn.addEventListener("click", () => {

        loginBootstrapModal.show();

    });

}

if (signupBtn && signupModal) {

    const signupBootstrapModal = new bootstrap.Modal(signupModal);

    signupBtn.addEventListener("click", () => {

        signupBootstrapModal.show();

    });

}

// =====================================
// CONTACT FORM
// =====================================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const inputs = contactForm.querySelectorAll("input, textarea");

        let isValid = true;

        inputs.forEach(input => {

            if (input.value.trim() === "") {

                input.style.borderColor = "#ef4444";

                isValid = false;

            } else {

                input.style.borderColor = "";

            }

        });

        if (isValid) {

            showToast("✅ Message sent successfully!");

            contactForm.reset();

        }

    });

}

// =====================================
// NEWSLETTER
// =====================================

const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = newsletterForm.querySelector("input");

        if (email.value.trim() === "") {

            email.style.borderColor = "#ef4444";

            return;

        }

        showToast("🎉 Thanks for subscribing!");

        email.value = "";

    });

}

// =====================================
// TOAST NOTIFICATION
// =====================================

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "custom-toast";

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 3000);

}

// =====================================
// AI CHAT DEMO
// =====================================

const chatInput = document.querySelector(".chat-input input");
const chatButton = document.querySelector(".chat-input button");
const chatBody = document.querySelector(".chat-body");

const aiReplies = [
    "I've analyzed your request and generated a smart solution.",
    "Your productivity could increase by approximately 35% using this workflow.",
    "I recommend enabling automation for repetitive tasks.",
    "Here's an AI-powered strategy tailored to your business goals.",
    "Analysis completed successfully. Your report is ready."
];

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = `message ${type}`;

    message.textContent = text;

    chatBody.appendChild(message);

    chatBody.scrollTop = chatBody.scrollHeight;

}

function sendAIMessage() {

    if (!chatInput || chatInput.value.trim() === "") return;

    addMessage(chatInput.value, "user");

    chatInput.value = "";

    const typing = document.createElement("div");

    typing.className = "message ai";

    typing.textContent = "AI is typing...";

    chatBody.appendChild(typing);

    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {

        typing.remove();

        const reply =
            aiReplies[Math.floor(Math.random() * aiReplies.length)];

        addMessage(reply, "ai");

    }, 1500);

}

if (chatButton) {

    chatButton.addEventListener("click", sendAIMessage);

}

if (chatInput) {

    chatInput.addEventListener("keypress", function(e){

        if(e.key === "Enter"){

            e.preventDefault();

            sendAIMessage();

        }

    });

}

// =====================================
// HERO BUTTONS
// =====================================

document.querySelectorAll(".hero-buttons .btn").forEach(button=>{

    button.addEventListener("click",()=>{

        showToast("🚀 Feature coming soon!");

    });

});

// =====================================
// SIMPLE FADE-IN EFFECT
// =====================================

const revealElements = document.querySelectorAll(

".feature-card,.pricing-card,.testimonial-card,.stat-card"

);

const revealObserver = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

},{threshold:.15});

revealElements.forEach(el=>{

    el.style.opacity="0";

    el.style.transform="translateY(40px)";

    el.style.transition=".7s ease";

    revealObserver.observe(el);

});

console.log("✅ AI Nexus Loaded Successfully");

// =====================================
// LIVE CLOCK
// =====================================

const clock = document.querySelector(".live-clock");

function updateClock(){

    if(!clock) return;

    const now = new Date();

    clock.innerHTML = now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();


// =====================================
// RANDOM DASHBOARD STATS
// =====================================

const statNumbers=document.querySelectorAll(".live-number");

setInterval(()=>{

    statNumbers.forEach(stat=>{

        const min=Number(stat.dataset.min)||100;

        const max=Number(stat.dataset.max)||999;

        stat.textContent=Math.floor(

            Math.random()*(max-min)+min

        );

    });

},3000);


// =====================================
// BUTTON RIPPLE EFFECT
// =====================================

document.querySelectorAll(".btn").forEach(btn=>{

    btn.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        ripple.style.left=e.offsetX+"px";

        ripple.style.top=e.offsetY+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});


// =====================================
// PARALLAX EFFECT
// =====================================

window.addEventListener("mousemove",(e)=>{

    document.querySelectorAll(".bg-blur").forEach((blob,index)=>{

        const speed=(index+1)*0.02;

        blob.style.transform=

        `translate(${e.clientX*speed}px,${e.clientY*speed}px)`;

    });

});


// =====================================
// AUTO YEAR
// =====================================

const year=document.querySelector(".current-year");

if(year){

    year.textContent=new Date().getFullYear();

}


// =====================================
// PAGE LOADED
// =====================================

console.log("🚀 AI Nexus Ready");