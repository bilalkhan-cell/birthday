let slideInterval;

// --- COMPLIMENT GENERATOR LOGIC ---
let availableCompliments = [];
let complimentsShown = 0;

// Fetch compliments from the text file when the page loads
window.onload = async () => {
    try {
        const response = await fetch('compliments.txt');
        const text = await response.text();
        // Split the text by new line and filter out any blank lines
        availableCompliments = text.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
        console.error("Error loading compliments:", error);
        // Backup compliments just in case the file doesn't load
        availableCompliments = [
            "You are simply the best! 🌟",
            "Your vibe is unmatched! ✨",
            "I appreciate you so much! 💖"
        ];
    }
};

function generateCompliment() {
    const textElement = document.getElementById("complimentText");

    // Check if we ran out of compliments
    if (availableCompliments.length === 0) {
        textElement.innerText = "Okay, I'm out of words, but you are infinitely awesome! ❤️";
        return;
    }

    // Pick a random compliment from the remaining ones
    const randomIndex = Math.floor(Math.random() * availableCompliments.length);
    const randomComp = availableCompliments[randomIndex];

    // Remove the chosen compliment from the array so it doesn't repeat
    availableCompliments.splice(randomIndex, 1);
    
    // Re-trigger the pop-in animation
    textElement.style.animation = 'none';
    textElement.offsetHeight; // trigger reflow
    textElement.style.animation = 'popIn 0.5s ease-out forwards';
    textElement.innerText = randomComp;
    
    complimentsShown++;
    
    // Show the next button after she clicks it 3 times
    if(complimentsShown >= 3) {
        document.getElementById("complimentNextBtn").style.display = "inline-block";
    }
}

// --- REST OF THE LOGIC ---

function checkPassword() {
    const pass = document.getElementById("passInput").value;
    if(pass === "bilalxNAME143") {
        document.getElementById("step0").classList.remove("active");
        document.getElementById("step1").classList.add("active");
    } else {
        alert("Incorrect Password! Try again.");
    }
}

function nextStep(currentStep) {
    document.getElementById("step" + currentStep).classList.remove("active");
    let next = currentStep + 1;
    document.getElementById("step" + next).classList.add("active");

    if(next === 2) {
        let rocket = document.getElementById("rocketIcon");
        rocket.style.animation = 'none';
        rocket.offsetHeight; 
        rocket.style.animation = null; 
    }
    if(next === 3) {
        let age14 = document.querySelector(".age-14");
        let age15 = document.querySelector(".age-15");
        age14.style.animation = 'none'; age15.style.animation = 'none';
        age14.offsetHeight; 
        age14.style.animation = null; age15.style.animation = null;
    }
    if(next === 4) {
        setTimeout(() => {
            document.getElementById("radarScanner").style.display = "none";
            document.getElementById("radarDot").style.display = "block";
            document.getElementById("radarText").style.display = "none";
            document.getElementById("targetAlert").style.display = "block";
            document.getElementById("radarNextBtn").style.display = "inline-block";
        }, 3500);
    }
    if(next === 7) { 
        document.getElementById("bdayAudio").play();
        startSlideshow();
    }
    if(next === 8) { 
        clearInterval(slideInterval); 
        document.getElementById("step8").style.backgroundImage = "url('img1.png')";
        startTypewriter();
    }
    if(next === 9) { 
        triggerConfetti();
    }
}

function triggerSecretMessage() {
    document.getElementById("dangerBtn").style.display = "none";
    document.getElementById("secretMessage").style.display = "block";
    setTimeout(() => {
        document.getElementById("secretNextBtn").style.display = "inline-block";
    }, 1500);

    for(let j = 0; j < 30; j++) {
        setTimeout(() => {
            let heart = document.createElement("div");
            heart.innerHTML = "💖";
            heart.className = "floating-heart";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.fontSize = (Math.random() * 2 + 1) + "rem";
            document.getElementById("step5").appendChild(heart);
            
            setTimeout(() => { heart.remove(); }, 4000);
        }, j * 100); 
    }
}

function startSlideshow() {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    slideInterval = setInterval(() => {
        slides[currentSlide].classList.remove("active-slide");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active-slide");
    }, 2500); 
}

const wishMessage = "Wishing you a universe of happiness! May your 15th year be filled with beautiful moments, big laughs, and all the pink vibes you deserve. Remember that time we [INSERT INSIDE JOKE HERE]? Let's make more memories like that. Keep shining bright!";
let i = 0;
function startTypewriter() {
    if (i < wishMessage.length) {
        document.getElementById("typewriterText").innerHTML += wishMessage.charAt(i);
        i++;
        setTimeout(startTypewriter, 40); 
    }
}

function triggerConfetti() {
    var duration = 4 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) { return clearInterval(interval); }
        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}