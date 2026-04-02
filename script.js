// ---------------- Tabs ----------------

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// ---------------- Side Menu ----------------

var sidemenu = document.getElementById("sidemenu");

function openmenu(){
    sidemenu.style.right = "0";
}

function closemenu(){
    sidemenu.style.right = "-200px";
}

// ---------------- Pop-up ----------------

function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

window.onclick = function(event) {
    const popup = document.getElementById("popup");
    if (event.target === popup) {
        popup.style.display = "none";
    }
}

const btn = document.querySelector('a[href="https://github.com/SouvikSarkarJr"]');
const popup = document.getElementById("popup");
const close = document.querySelector(".close");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

btn.addEventListener("click", function(e) {
    e.preventDefault();
    popup.style.display = "block";
});

close.onclick = () => popup.style.display = "none";
noBtn.onclick = () => popup.style.display = "none";

yesBtn.onclick = () => {
    window.open("https://github.com/SouvikSarkarJr", "_blank");
    popup.style.display = "none";
};

// ---------------- Form ----------------

const form = document.querySelector(".contact-right form");
const button = document.querySelector(".contact-right .btn2");

form.addEventListener("mousemove", updateGlow);

form.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    updateGlow(touch);
});

function updateGlow(e){
    const rect = form.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    form.style.setProperty('--x', `${x}px`);
    form.style.setProperty('--y', `${y}px`);
}

// ---------------- Magentic Button ----------------

button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
});

button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0,0)";
});

// ---------------- Slider ----------------

const slider = document.getElementById("slider");
const items = document.querySelectorAll(".item");

/* Auto Rotation */
let angle = 0;
let speed = 0.3;
let targetSpeed = 0.3;

/* Drag Control */
let isDragging = false;
let lastX = 0;
let dragVelocity = 0;

/* Pointer Move */
slider.addEventListener("pointerdown", (e) => {
    isDragging = true;
    lastX = e.clientX;
    slider.setPointerCapture(e.pointerId);
    targetSpeed = 0;
    slider.classList.add("grabbing");
});

/* Pointer Move */
slider.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastX;
    lastX = e.clientX;

    dragVelocity = deltaX * 0.1;
});

/* Pointer Up */
slider.addEventListener("pointerup", () => {
    isDragging = false;
    targetSpeed = 0.3;
    slider.classList.remove("grabbing");
});

/* Pointer Cancel */
slider.addEventListener("pointercancel", () => {
    isDragging = false;
    slider.classList.remove("grabbing"); 
});

/* Hover Stop */
items.forEach(item => {
    item.addEventListener("mouseenter", () => {
        targetSpeed = 0;
        dragVelocity = 0;
    });

    item.addEventListener("mouseleave", () => {
        targetSpeed = 0.3;
    });
});

/* Main Animation */

function animate(){
    if (!isDragging && targetSpeed === 0) {
        speed = 0;
    } else {
        speed += (targetSpeed - speed) * 0.05;
    }

    angle += speed + dragVelocity;
    dragVelocity *= 0.92;

    slider.style.transform =
        `translate(-50%, -50%) rotateX(-20deg) rotateY(${angle}deg)`;

    requestAnimationFrame(animate);
}

animate();

// // ---------------- CURSOR MESSAGE ----------------

const cursorMsg = document.getElementById("cursorMsg");

let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

const offset = 20;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX + offset;
    mouseY = e.clientY + offset;
});

function animateCursorMsg() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;

    cursorMsg.style.left = posX + "px";
    cursorMsg.style.top = posY + "px";

    requestAnimationFrame(animateCursorMsg);
}
animateCursorMsg();

function keepInsideViewport() {
    const rect = cursorMsg.getBoundingClientRect();

    if (rect.right > window.innerWidth) {
        cursorMsg.style.left = (window.innerWidth - rect.width - 10) + "px";
    }

    if (rect.bottom > window.innerHeight) {
        cursorMsg.style.top = (window.innerHeight - rect.height - 10) + "px";
    }
}

setInterval(keepInsideViewport, 50);


// ---------------- Star ----------------

const starsLayer = document.getElementById("stars-layer");

window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    const contact = document.getElementById("contact");

    const headerRect = header.getBoundingClientRect();
    const contactRect = contact.getBoundingClientRect();

    const inHeader = headerRect.top <= 0 && headerRect.bottom >= 0;
    const inContact = contactRect.top <= window.innerHeight && contactRect.bottom >= 0;

});

// No Selection of content

document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
        e.preventDefault();
    }
});

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

document.addEventListener("selectstart", (e) => {
    e.preventDefault();
});

// Stop Gost Message

let activeItem = null;

document.addEventListener("mousemove", (e) => {

    // Stop everything while dragging or rotating fast

    if (isDragging || Math.abs(speed) > 0.2) {
        cursorMsg.style.opacity = 0;
        cursorMsg.classList.remove("active");
        activeItem = null;
        return;
    }

    const el = document.elementFromPoint(e.clientX, e.clientY);

    if (el && el.closest(".item")) {
        const item = el.closest(".item");

        if (activeItem !== item) {
            activeItem = item;

            cursorMsg.textContent = item.getAttribute("data-msg");
            cursorMsg.style.opacity = 1;
            cursorMsg.classList.add("active");
        }
    } else {
        activeItem = null;
        cursorMsg.style.opacity = 0;
        cursorMsg.classList.remove("active");
    }
});

// About Section

const about = document.querySelector(".about-col-2");

about.addEventListener("mousemove", (e) => {
    const rect = about.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    about.style.background = `
        radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 40%),
        #0a0a0f
    `;
});

// ---------------- MOBILE TOUCH SUPPORT ----------------

// Detect touch device
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

// ---------------- Slider Touch Improvements ----------------

items.forEach(item => {
    // Touch = simulate hover
    item.addEventListener("touchstart", () => {
        targetSpeed = 0;
        dragVelocity = 0;
    }, { passive: true });

    item.addEventListener("touchend", () => {
        targetSpeed = 0.3;
    });
});

// ---------------- Cursor Message (Touch Version) ----------------

function handleTouchCursor(x, y){
    const el = document.elementFromPoint(x, y);

    if (el && el.closest(".item")) {
        const item = el.closest(".item");

        if (activeItem !== item) {
            activeItem = item;

            cursorMsg.textContent = item.getAttribute("data-msg");
            cursorMsg.style.opacity = 1;
            cursorMsg.classList.add("active");
        }
    } else {
        activeItem = null;
        cursorMsg.style.opacity = 0;
        cursorMsg.classList.remove("active");
    }
}

document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];

    // Hide while dragging slider
    if (isDragging || Math.abs(speed) > 0.2) {
        cursorMsg.style.opacity = 0;
        cursorMsg.classList.remove("active");
        activeItem = null;
        return;
    }

    handleTouchCursor(touch.clientX, touch.clientY);
}, { passive: true });

// ---------------- Magnetic Button (Touch Version) ----------------

button.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const rect = button.getBoundingClientRect();

    const x = touch.clientX - rect.left - rect.width / 2;
    const y = touch.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
}, { passive: true });

button.addEventListener("touchend", () => {
    button.style.transform = "translate(0,0)";
});

// ---------------- Form Glow (Enhanced Touch) ----------------

document.addEventListener("touchstart", (e) => {

    const touch = e.touches[0];

    // Stop if dragging
    if (isDragging || Math.abs(speed) > 0.2) {
        cursorMsg.style.opacity = 0;
        cursorMsg.classList.remove("active");
        activeItem = null;
        return;
    }

    const el = document.elementFromPoint(touch.clientX, touch.clientY);

    if (el && el.closest(".item")) {
        const item = el.closest(".item");

        activeItem = item;

        cursorMsg.textContent = item.getAttribute("data-msg");
        cursorMsg.style.opacity = 1;
        cursorMsg.classList.add("active");

    } else {
        activeItem = null;
        cursorMsg.style.opacity = 0;
        cursorMsg.classList.remove("active");
    }

}, { passive: true });

document.addEventListener("touchend", () => {
    cursorMsg.style.opacity = 0;
    cursorMsg.classList.remove("active");
    activeItem = null;
});

// ---------------- About Section Glow (Touch) ----------------

about.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const rect = about.getBoundingClientRect();

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    about.style.background = `
        radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 40%),
        #0a0a0f
    `;
}, { passive: true });

// ---------------- Improve Scroll + Touch Behavior ----------------

// Prevent laggy touch interactions
document.addEventListener("touchstart", () => {}, { passive: true });

// OPTIONAL: Remove annoying restrictions on mobile
if (isTouchDevice) {
    document.removeEventListener("contextmenu", (e) => e.preventDefault());
    document.removeEventListener("selectstart", (e) => e.preventDefault());
}

// ---------------- Tap Outside = Close Popup ----------------

document.addEventListener("touchstart", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});

// Mobile Scrolling Effect 

const blocks = document.querySelectorAll('.skill-block');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.3 });

blocks.forEach(block => observer.observe(block));