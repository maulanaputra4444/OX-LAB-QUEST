const questions = [
    {
        level: "LEVEL 1",
        title: "WHO WOULD YOU ATTACK FIRST?",
        scenario: "As the player moves forward, two enemies appear:",
        options: [
            { text: "Attack the small enemy", roles: ["Engineer", "Artist"] },
            { text: "Attack the big enemy", roles: ["PM", "Designer"] }
        ]
    },
    {
        level: "LEVEL 2",
        title: "CHOOSE YOUR TOOL CARD",
        scenario: "After encountering the enemy, choose your tool:",
        options: [
            { text: "Strategy Scroll", roles: ["PM"] },
            { text: "Mechanic Trap", roles: ["Designer"] },
            { text: "Illusion Strike", roles: ["Artist"] },
            { text: "Code Blade", roles: ["Engineer"] }
        ]
    },
    {
        level: "LEVEL 3",
        title: "THE REMAINING ENEMY",
        scenario: "The enemy that was ignored earlier returns stronger.",
        options: [
            { text: "Fight directly", roles: ["Engineer", "Artist"] },
            { text: "Analyze and plan first", roles: ["PM", "Designer"] }
        ]
    },
    {
        level: "LEVEL 4",
        title: "BROKEN BRIDGE",
        scenario: "The player reaches a broken bridge. How to cross?",
        options: [
            { text: "Bridge gear", roles: ["Engineer"] },
            { text: "Path map", roles: ["Designer"] },
            { text: "Magic brush", roles: ["Artist"] },
            { text: "Command scroll", roles: ["PM"] }
        ]
    },
    {
        level: "LEVEL 5",
        title: "THE CHAOS BUG",
        scenario: "The world glitches! How to handle the issue?",
        options: [
            { text: "Visual patch orb", roles: ["Artist"] },
            { text: "Debug rune", roles: ["Engineer"] },
            { text: "Priority Compass", roles: ["PM"] },
            { text: "Mechanic adjuster", roles: ["Designer"] }
        ]
    },
    {
        level: "LEVEL 6",
        title: "THE MISSING PIECE",
        scenario: "Restore the missing component to open the gate.",
        options: [
            { text: "Restore Atmosphere (World Essence)", roles: ["Artist"] },
            { text: "Puzzle key", roles: ["Designer"] },
            { text: "System core", roles: ["Engineer"] },
            { text: "Monster plan", roles: ["PM"] }
        ]
    }
];

const tieBreaker = {
    title: "TIE BREAKER",
    scenario: "Choose a tool you would bring into a game dev project:",
    options: [
        { text: "Planner", roles: ["PM"] },
        { text: "Notebook", roles: ["Designer"] },
        { text: "Laptop", roles: ["Engineer"] },
        { text: "Drawing Tab", roles: ["Artist"] }
    ]
};

let currentStep = 0;
let scores = { Engineer: 0, Designer: 0, Artist: 0, PM: 0 };
let selectedRoleInCurrentStep = null;

// DOM Elements
const btnStart = document.getElementById('btn-start');
const btnNext = document.getElementById('btn-next');
const screens = {
    home: document.getElementById('screen-home'),
    quiz: document.getElementById('screen-quiz'),
    result: document.getElementById('screen-result')
};

btnStart.onclick = () => {
    screens.home.classList.remove('active');
    screens.quiz.classList.add('active');
    renderQuestion();
};

function renderQuestion() {
    const q = (currentStep < 6) ? questions[currentStep] : tieBreaker;
    document.getElementById('level-indicator').innerText = q.level || "FINAL STEP";
    document.getElementById('question-title').innerText = q.title;
    document.getElementById('scenario-text').innerText = q.scenario;
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    btnNext.disabled = true;

    q.options.forEach(opt => {
        const div = document.createElement('div');
        div.className = 'option-card';
        div.innerText = opt.text;
        div.onclick = () => {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            div.classList.add('selected');
            selectedRoleInCurrentStep = opt.roles;
            btnNext.disabled = false;
        };
        grid.appendChild(div);
    });
}

btnNext.onclick = () => {
    // Tambah poin
    selectedRoleInCurrentStep.forEach(r => scores[r]++);
    currentStep++;

    if (currentStep < 6) {
        renderQuestion();
    } else if (currentStep === 6) {
        checkResult();
    } else {
        showFinalResult();
    }
};

function checkResult() {
    const maxScore = Math.max(...Object.values(scores));
    const winners = Object.keys(scores).filter(role => scores[role] === maxScore);

    if (winners.length > 1) {
        renderQuestion(); // Tampilkan Tie Breaker
    } else {
        showFinalResult(winners[0]);
    }
}

function showFinalResult(winner) {
    // Jika lewat tie breaker, tentukan pemenang terbaru
    const finalWinner = winner || Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    screens.quiz.classList.remove('active');
    screens.result.classList.add('active');
    
    document.getElementById('result-role').innerText = finalWinner.toUpperCase();
    
    const strengths = {
        Designer: ["Understands basic gameplay flow", "Experiments with simple mechanics", "Learns from trial and error"],
        Engineer: ["System logic expert", "Debugs complex issues", "Builds stable foundations"],
        Artist: ["Visual world creator", "Focuses on aesthetics", "Brings imagination to life"],
        PM: ["Leads the journey", "Prioritizes key features", "Manages the master plan"]
    };

    const list = document.getElementById('result-strengths');
    list.innerHTML = strengths[finalWinner].map(s => `<li>${s}</li>`).join('');
}