// ================= PRELOADER =================
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }
});


// ================= NAVBAR SCROLL =================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
});


// ================= MOBILE MENU =================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });
}


// ================= TYPING EFFECT (FIX) =================
const typingText = document.querySelector(".hero .typing-text");

const words = ["bền vững", "thông minh", "hiện đại", "xanh sạch"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentWord.substring(0, charIndex);

    let speed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

// đảm bảo DOM load xong mới chạy
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});


// ================= COUNTER (STATS) =================
const counters = document.querySelectorAll(".stat h3");

const runCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const update = () => {
        const increment = target / 100;

        if (count < target) {
            count += increment;
            counter.innerText = Math.floor(count);
            requestAnimationFrame(update);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };

    update();
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));


// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// ================= SCROLL ANIMATION =================
const revealElements = document.querySelectorAll(
    ".feature-card, .activity-card, .team-member, .about-content, .contact-content"
);

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.6s ease";
    revealObserver.observe(el);
});


// ================= CONTACT FORM =================
const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const button = form.querySelector("button");

        button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Đang gửi...`;

        setTimeout(() => {
            button.innerHTML = `<i class="fas fa-check"></i> Gửi thành công!`;
            button.style.background = "#10b981";

            form.reset();

            setTimeout(() => {
                button.innerHTML = `<i class="fas fa-paper-plane"></i> Gửi tin nhắn`;
                button.style.background = "";
            }, 2000);

        }, 1500);
    });
}


// ================= SCROLL TO TOP =================
const scrollBtn = document.createElement("div");
scrollBtn.innerHTML = `<i class="fas fa-arrow-up"></i>`;
scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "30px";
scrollBtn.style.right = "30px";
scrollBtn.style.background = "#10b981";
scrollBtn.style.color = "#fff";
scrollBtn.style.padding = "12px";
scrollBtn.style.borderRadius = "50%";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.display = "none";
scrollBtn.style.zIndex = "999";

document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});