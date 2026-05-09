const questions = [
    {
        level: 1, bg: "bg-l1", title: "WHO WOULD YOU ATTACK FIRST?", scenario: "Two enemies appear: a giant golem and a quick sprite.", image: "assets/qs1.png" ,
        options: [
            { text: "Small Enemy", roles: ["Engineer", "Artist"], desc: "A quick but fragile sprite. Requires precision to hit.", img: "assets/mob 2.png" },
            { text: "Big Enemy", roles: ["PM", "Designer"], desc: "A massive golem with high defense. Needs a tactical approach.", img: "assets/mob 1.png" }
        ]
    },
    {
        level: 2, bg: "bg-l2", title: "CHOOSE YOUR TOOL CARD", scenario: "Choose a card from the royal deck to defeat the foe.", image: "assets/intro.jpg",
        options: [
            { text: "Strategy Scroll", roles: ["PM"], desc: "Master the battlefield through meticulous planning.", img: "https://via.placeholder.com/150?text=Scroll" },
            { text: "Game Blueprint", roles: ["Designer"], desc: "Understand the core mechanics to exploit weaknesses.", img: "https://via.placeholder.com/150?text=Blueprint" },
            { text: "Magic Paintbrush", roles: ["Artist"], desc: "Alter the world's appearance to confuse the enemy.", img: "https://via.placeholder.com/150?text=Brush" },
            { text: "Code Gauntlet", roles: ["Engineer"], desc: "Rewrite the logic of the fight to your advantage.", img: "https://via.placeholder.com/150?text=Gauntlet" }
        ]
    },
    {
        level: 3, bg: "bg-l3", title: "THE REMAINING ENEMY", scenario: "The enemy you ignored earlier returns stronger.", image: "assets/bg.jpg",
        options: [
            { text: "Fight directly", roles: ["Engineer", "Artist"], desc: "Face the challenge head-on with pure skill.", img: "https://via.placeholder.com/150?text=Fight" },
            { text: "Analyze first", roles: ["PM", "Designer"], desc: "Observe patterns before making a move.", img: "https://via.placeholder.com/150?text=Analyze" }
        ]
    },
    {
        level: 4, bg: "bg-l4", title: "BROKEN BRIDGE", scenario: "How do you cross the spiked bridge to reach the castle?", image: "assets/mob 1.png",
        options: [
            { text: "System bridge", roles: ["Engineer"], desc: "Construct a bridge using pure system logic.", img: "https://via.placeholder.com/150?text=System" },
            { text: "Alternate route", roles: ["Designer"], desc: "Find a hidden path through the level design.", img: "https://via.placeholder.com/150?text=Path" },
            { text: "Illusion bridge", roles: ["Artist"], desc: "Create a bridge from light and color.", img: "https://via.placeholder.com/150?text=Illusion" },
            { text: "Rebuild plan", roles: ["PM"], desc: "Organize resources to fix the original bridge.", img: "https://via.placeholder.com/150?text=Plan" }
        ]
    },
    {
        level: 5, bg: "bg-l5", title: "THE CHAOS BUG", scenario: "The world is glitching! Fix it before the kingdom crashes.", image: "assets/mob 2.png",
        options: [
            { text: "Debug Rune", roles: ["Engineer"], desc: "Erase the bug by correcting the world's source code.", img: "https://via.placeholder.com/150?text=Debug" },
            { text: "Mechanic Adjuster", roles: ["Designer"], desc: "Tweak the gameplay mechanics to bypass the glitch.", img: "https://via.placeholder.com/150?text=Adjust" },
            { text: "Visual Patch", roles: ["Artist"], desc: "Hide the glitch under a layer of beautiful textures.", img: "https://via.placeholder.com/150?text=Patch" },
            { text: "Priority Compass", roles: ["PM"], desc: "Decide which parts of the world to save first.", img: "https://via.placeholder.com/150?text=Compass" }
        ]
    },
    {
        level: 6, bg: "bg-l6", title: "THE MISSING PIECE", scenario: "Restore the component to open the final gate.", image: "assets/pm.jpg",
        options: [
            { text: "World Essence", roles: ["Artist"], desc: "Restore the atmosphere that awakens the gate.", img: "https://via.placeholder.com/150?text=Essence" },
            { text: "Puzzle key", roles: ["Designer"], desc: "Unlock the logic behind the gate's lock.", img: "https://via.placeholder.com/150?text=Key" },
            { text: "System core", roles: ["Engineer"], desc: "Restart the gate's internal power system.", img: "https://via.placeholder.com/150?text=Core" },
            { text: "Master plan", roles: ["PM"], desc: "Provide the final command to open the way.", img: "https://via.placeholder.com/150?text=Master" }
        ]
    }
];

const roleData = {
    Engineer: { 
        tagline: "YOU BUILD THE WORLD'S LOGIC", 
        desc: "Engineers transform complex ideas into functional systems, ensuring technical stability and excellence.",
        strengths: ["Advanced Problem Solver", "System Optimization", "Logical Thinking"],
        img: "assets/engineer.jpg" // Ganti dengan gambar yang sesuai
    },
    Designer: { 
        tagline: "YOU SHAPE HOW THE GAME IS PLAYED", 
        desc: "Designers create gameplay mechanics, levels, and player experience through trial, error, and logic.",
        strengths: ["Player Experience Focus", "Creative Mechanics", "Level Architecture"],
        img: "assets/designer.jpg" // Ganti dengan gambar yang sesuai
    },
    Artist: { 
        tagline: "YOU CREATE THE ATMOSPHERE", 
        desc: "Artists bring the kingdom to life through immersive visuals, colors, and creative world-building.",
        strengths: ["Visual Storytelling", "Aesthetic Immersion", "Creative Direction"],
        img: "assets/artist.jpg" // Ganti dengan gambar yang sesuai
    },
    PM: { 
        tagline: "YOU LEAD THE JOURNEY", 
        desc: "Product Managers oversee the master plan, prioritizing features and guiding the team to the finish line.",
        strengths: ["Strategic Leadership", "Project Management", "Team Visionary"],
        img: "assets/pm.jpg" // Ganti dengan gambar yang sesuai
    }
};

let currentStep = 0;
let scores = { Engineer: 0, Designer: 0, Artist: 0, PM: 0 };

document.addEventListener('DOMContentLoaded', () => {
    const btnStart = document.getElementById('btn-start');
    if (btnStart) {
        btnStart.addEventListener('click', () => {
            document.getElementById('screen-home').classList.remove('active');
            document.getElementById('screen-quiz').classList.add('active');
            loadQuestion();
        });
    }
});

function loadQuestion() {
    const q = questions[currentStep];
    document.body.className = q.bg;
    document.getElementById('level-tag').innerText = `LEVEL ${q.level}`;
    document.getElementById('question-title').innerText = q.title;
    document.getElementById('scenario-text').innerText = q.scenario;

    const illustration = document.getElementById('illustration-image');
    if (illustration && q.image) {
        illustration.src = q.image;
        illustration.alt = `${q.title} illustration`;
    }

    const grid = document.getElementById('options-grid');
    const infoText = document.getElementById('info-text');
    grid.innerHTML = '';
    infoText.innerText = "Tap a tool to see description, tap again to select.";

    q.options.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'option-card';
        btn.innerHTML = `<img src="${opt.img}" class="option-img"><span>${opt.text}</span>`;
        
        // Logic untuk Desktop (Hover)
        btn.onmouseenter = () => infoText.innerText = opt.desc;
        btn.onmouseleave = () => infoText.innerText = "Hover over a tool to see its description...";
        
        // Logic untuk Mobile (Click/Tap)
        btn.onclick = () => {
            // Jika deskripsi yang tampil belum sama dengan opsi ini, tunjukkan dulu
            if (infoText.innerText !== opt.desc) {
                // Hapus highlight dari tombol lain
                document.querySelectorAll('.option-card').forEach(c => c.style.borderColor = 'black');
                // Beri highlight pada yang di-tap
                btn.style.borderColor = 'var(--primary-blue)';
                infoText.innerText = opt.desc;
                infoText.style.color = "var(--primary-blue)";
                infoText.style.fontWeight = "bold";
            } else {
                // Jika di-tap kedua kalinya (deskripsi sudah cocok), baru lanjut
                opt.roles.forEach(r => scores[r]++);
                currentStep++;
                if (currentStep < questions.length) loadQuestion();
                else showResult();
            }
        };
        grid.appendChild(btn);
    });
}

function showResult() {
    document.getElementById('screen-quiz').classList.remove('active');
    document.getElementById('screen-result').classList.add('active');
    document.body.className = '';

    const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const data = roleData[winner];

    document.getElementById('result-role').innerText = winner === "PM" ? "PRODUCT MANAGER" : winner.toUpperCase();
    document.getElementById('result-tagline').innerText = data.tagline;
    document.getElementById('result-desc').innerText = data.desc;
    document.getElementById('result-img').src = data.img;

    const strengthsList = document.getElementById('result-strengths');
    strengthsList.innerHTML = data.strengths.map(s => `<li>${s}</li>`).join('');
}