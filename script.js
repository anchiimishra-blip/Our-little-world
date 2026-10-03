window.showScreen = function(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if (!target) return;

    target.classList.add("active");
  
    if (screenId === "scratchRoom") {
    createScratchCards();
    }

    // Start Game 1 automatically
    if (screenId === "game1") {
        startGame1();
    }
  
  if (screenId === "game2") {
    startGame2();
   }
if (screenId === "quiz2") {
    quizQuestion = 0;
    loadQuizQuestion();
   }  
};

function noAnswer() {

    const button = document.getElementById("noButton");

    button.style.position = "fixed";

    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);

    button.style.left = x + "px";
    button.style.top = y + "px";

    document.getElementById("no-message").textContent =
        "Nice try 😭";
    }


function wrongAnswer() {

    document.getElementById("wrong-message").textContent =
        "EXCUSE ME??? 😭 Try again.";
}
let quizQuestion = 0;

const quizQuestions = [

    {
        question: "What do I love the most?💗",
        answers: [
            "YOU",
            "playing games with u",
            "67"
        ],
        correct: 0
    },

    {
        question: "What's my favourite thing about us? 🥹",
        answers: [
            "Our conversations",
            "Playing together",
            "Everything about us"
        ],
        correct: 2
    },

    {
        question: "who's more bhondu?👀",
        answers: [
              "Capsicum",
             "Garlic",
            "Obviously both"
        ],
        correct: 2
    }

];


function answerQuiz(answer) {

    const currentQuestion = quizQuestions[quizQuestion];

    const message = document.getElementById("quiz-message");

    if (answer === currentQuestion.correct) {

     const correctMessages = [
    "Okaaayyy, look at you 👀💗",
    "Hmmmm... you DO pay attention to me 😭",
    "WAIT you actually got that right?? 😭",
    "Okay Mr. Knows-Me-Well 👀",
    "That's my boi🫵🏻😌",
    "Someone's been paying attention 👀",
    "Correctttt. You may proceed 😌♡",
    "Okayyy, I'll give you that one 😭",
    "100/10 boyfriend behaviour 💗",
    "Look who knows his girl 😌",
    "I'm slightly impressed. Slightly. 👀"
];

message.textContent =
    correctMessages[Math.floor(Math.random() * correctMessages.length)];   

        quizQuestion++;

        setTimeout(() => {

            if (quizQuestion < quizQuestions.length) {

                loadQuizQuestion();

            } else {

                showScreen("quiz3");

            }

        }, 2000);

    } else {

        message.textContent = "EXCUSE ME??? 😭 Try again.";

    }

}


function loadQuizQuestion() {

    const currentQuestion = quizQuestions[quizQuestion];

    document.getElementById("question").textContent =
        currentQuestion.question;

    const buttons = document.querySelectorAll("#answerButtons button");

    buttons.forEach((button, index) => {

        button.textContent = currentQuestion.answers[index];

        // Reset button position
        button.style.position = "";
        button.style.left = "";
        button.style.top = "";

        // Bhondu question: make "You" run away
        if (currentQuestion.question === "who's more bhondu?👀" && index === 1) {

            button.onclick = runBhondu;

        } else {

            button.onclick = function () {
                answerQuiz(index);
            };

        }
    });

    document.getElementById("quiz-message").textContent = "";
}

let gameScore = 0;
let gameStarted = false;

const normalEmojis = [
    "💗",
    "🫑",
    "🧄",
    "😘",
    "❤️",
    "🫂"
]; 

const milkEmoji = "🍼";

function startGame1() {

    if (gameStarted) return;

    gameStarted = true;
    gameScore = 0;

    document.getElementById("score").textContent = "0";
    document.getElementById("gameMessage").textContent = "";

    for (let i = 0; i < 8; i++) {
    setTimeout(() => {
        createEmoji();
    }, i * 300);
}
  
}


function createEmoji() {

    const gameArea = document.getElementById("gameArea");

    if (!gameArea) return;


    const emoji = document.createElement("div");

    emoji.classList.add("falling-emoji");


    // 🍼 appears occasionally
    // About 1 out of every 6 emojis will be 🍼
    if (Math.random() < 0.17) {

        emoji.textContent = milkEmoji;

    } else {

        emoji.textContent =
            normalEmojis[
                Math.floor(Math.random() * normalEmojis.length)
            ];
    }


    const maxX = gameArea.clientWidth - 40;

    emoji.style.left =
        Math.random() * maxX + "px";

    emoji.style.top = "-40px";

    gameArea.appendChild(emoji);


    let position = -40;

    const speed = 2 + Math.random() * 2;


    const falling = setInterval(() => {

        position += speed;

        emoji.style.top = position + "px";


        checkEmojiCollision(emoji, falling);


        if (position > gameArea.clientHeight) {

            clearInterval(falling);

            emoji.remove();

            createEmoji();

        }

    }, 20);
}


function checkEmojiCollision(emoji, falling) {

    const basket =
        document.getElementById("basket");

    const emojiRect =
        emoji.getBoundingClientRect();

    const basketRect =
        basket.getBoundingClientRect();


    if (
        emojiRect.bottom >= basketRect.top &&
        emojiRect.left < basketRect.right &&
        emojiRect.right > basketRect.left
    ) {

        clearInterval(falling);

        const caughtEmoji = emoji.textContent;

        emoji.remove();


        // ONLY 🍼 gives a point
        if (caughtEmoji === "🍼") {

            gameScore++;

            document.getElementById("score").textContent =
                gameScore;


            if (gameScore >= 10) {

                winGame1();

                return;
            }

        }


        // Keep the game going
        createEmoji();
    }
}


function winGame1() {

    document.getElementById("gameMessage").textContent =
        "YOU CAUGHT ALL THE 🍼 😭💗";

    setTimeout(() => {

        gameStarted = false;

        showScreen("game1Congrats");

    }, 1500);
}


// Move basket with mouse OR finger
document.addEventListener("mousemove", function(event) {

    const basket =
        document.getElementById("basket");

    const gameArea =
        document.getElementById("gameArea");

    if (!basket || !gameArea) return;

    const rect =
        gameArea.getBoundingClientRect();

    let x =
        event.clientX - rect.left;

    x = Math.max(35, Math.min(x, rect.width - 35));

    basket.style.left = x + "px";

});


function runBhondu() {

    const button = document.querySelectorAll("#answerButtons button")[1];

    button.style.position = "fixed";

    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);

    button.style.left = x + "px";
    button.style.top = y + "px";

    document.getElementById("quiz-message").textContent =
        "NAHHH 😭 YOU DON'T GET TO CHOOSE THAT";
}

/* =========================
   SCRATCH ROOM
========================= */


/* EDIT YOUR SIX MESSAGES HERE */

const scratchMessages = [
    "no matter what I'll always be yours",
    "I promise mai tumhari baat sunungi",
    "Meeting you was the best thing that ever happened to me",
    "I'm super grateful to have you in my life..",
    "you mean a lott to me ",
    "mere gande capsicum babiee I LOVEE YOU😘😘"
];


let scratchedCards = 0;
let scratchInitialized = false;


/* Create all six cards */

function createScratchCards() {

    if (scratchInitialized) return;

    scratchInitialized = true;

    const container =
        document.getElementById("scratchCards");

    if (!container) return;


    scratchMessages.forEach((message, index) => {

        const card =
            document.createElement("div");

        card.classList.add("scratch-card");


        const hiddenMessage =
            document.createElement("div");

        hiddenMessage.classList.add("hidden-message");

        hiddenMessage.textContent = message;


        const number =
            document.createElement("div");

        number.classList.add("card-number");

        number.textContent =
            "0" + (index + 1);


        const canvas =
            document.createElement("canvas");

        canvas.classList.add("scratch-canvas");


        card.appendChild(hiddenMessage);
        card.appendChild(number);
        card.appendChild(canvas);

        container.appendChild(card);


        setupScratchCard(canvas, card);

    });

}


/* Set up scratching */
function setupScratchCard(canvas, card) {
    const ctx = canvas.getContext("2d");
    const rect = card.getBoundingClientRect();

    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.fillStyle = "#f8c8dc";
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "rgba(255,255,255,0.8)";

    for (let i = 0; i < 35; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }

    let scratching = false;
    let scratchCount = 0;
    let revealed = false;

    function scratch(event) {
        if (revealed) return;

        const bounds = canvas.getBoundingClientRect();

        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fill();

        scratchCount++;

        if (scratchCount >= 110) {
            revealCard();
        }
    }

    canvas.addEventListener("pointerdown", function(event) {
        scratching = true;
        canvas.setPointerCapture(event.pointerId);
        scratch(event);
    });

    canvas.addEventListener("pointermove", function(event) {
        if (!scratching) return;
        scratch(event);
    });

    canvas.addEventListener("pointerup", function() {
        scratching = false;
    });

    canvas.addEventListener("pointercancel", function() {
        scratching = false;
    });

    function revealCard() {
        if (revealed) return;

        revealed = true;

        canvas.style.transition = "opacity 0.5s ease";
        canvas.style.opacity = "0";

        setTimeout(() => {
            canvas.remove();
        }, 500);

        scratchedCards++;

        document.getElementById("scratchProgress").textContent =
            scratchedCards + " of 6 uncovered";

        createGlitter(card);

        if (scratchedCards === 6) {
            setTimeout(() => {
                document.getElementById("scratchProgress").textContent =
                    "You found all six ♡ ✨";

                document.getElementById("letterButton").style.display =
                    "inline-block";
            }, 700);
        }
    }
}


/* Glitter explosion ✨ */

function createGlitter(card) {

    const rect =
        card.getBoundingClientRect();


    const glitterSymbols = [
        "✨",
        "✦",
        "⋆",
        "♡"
    ];


    for (let i = 0; i < 14; i++) {

        const glitter =
            document.createElement("span");

        glitter.classList.add("glitter");

        glitter.textContent =
            glitterSymbols[
                Math.floor(
                    Math.random() *
                    glitterSymbols.length
                )
            ];


        glitter.style.left =
            rect.left +
            rect.width / 2 +
            "px";

        glitter.style.top =
            rect.top +
            rect.height / 2 +
            "px";


        glitter.style.setProperty(
            "--x",
            (Math.random() * 180 - 90) + "px"
        );

        glitter.style.setProperty(
            "--y",
            (Math.random() * 180 - 90) + "px"
        );


        document.body.appendChild(glitter);


        setTimeout(() => {

            glitter.remove();

        }, 900);

    }

}

/* =========================
   MEMORY GAME - GAME 2
========================= */

const memorySymbols = [
    "🫑",
    "🫑",
    "🧄",
    "🧄",
    "💗",
    "💗",
    "🍼",
    "🍼",
    "🎀",
    "🎀",
    "🕷️",
    "🕷️"
];

let firstCard = null;
let secondCard = null;
let memoryLocked = false;
let matchedPairs = 0;
let memoryStarted = false;

function startGame2() {

    if (memoryStarted) return;

    memoryStarted = true;
    matchedPairs = 0;
    firstCard = null;
    secondCard = null;
    memoryLocked = false;

    const board = document.getElementById("memoryBoard");

    if (!board) return;

    board.innerHTML = "";

    const shuffled = [...memorySymbols].sort(
        () => Math.random() - 0.5
    );

    shuffled.forEach((symbol) => {

        const card = document.createElement("button");

        card.classList.add("memory-card");

        card.innerHTML = `
            <div class="memory-inner">

                <div class="memory-front">
                    ♡
                </div>

                <div class="memory-back">
                    ${symbol}
                </div>

            </div>
        `;

        card.dataset.symbol = symbol;

        card.addEventListener("click", function() {
            flipMemoryCard(card);
        });

        board.appendChild(card);
    });

    document.getElementById("memoryMessage").textContent = "";
    document.getElementById("game2Next").style.display = "none";
}


function flipMemoryCard(card) {

    if (memoryLocked) return;
    if (card.classList.contains("flipped")) return;
    if (card.classList.contains("matched")) return;

    card.classList.add("flipped");

    if (!firstCard) {

        firstCard = card;
        return;

    }

    secondCard = card;
    memoryLocked = true;

    const firstSymbol = firstCard.dataset.symbol;
    const secondSymbol = secondCard.dataset.symbol;

    if (firstSymbol === secondSymbol) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;

        firstCard = null;
        secondCard = null;
        memoryLocked = false;

        document.getElementById("memoryMessage").textContent =
            "Okaaayyy, match found 👀💗";

        if (matchedPairs === 6) {

            document.getElementById("memoryMessage").textContent =
                "YOU FOUND ALL OF THEM 😭💗";

            document.getElementById("game2Next").style.display =
                "inline-block";
        }

    } else {

        document.getElementById("memoryMessage").textContent =
            "Nopeee 😭 Try again.";

        setTimeout(() => {

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            firstCard = null;
            secondCard = null;
            memoryLocked = false;

        }, 800);
    }
}

function openEnvelope() {
   document.getElementById("envelopeScreen").style.display = "none";
   document.getElementById("boyfriendDayScreen").style.display = "block";
}

function openLetter() {
  document.getElementById("boyfriendDayScreen").style.display = "none";
   document.getElementById("actualLetterScreen").style.display = "block";
}