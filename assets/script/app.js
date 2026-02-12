'use strict';
const yesSound = new Audio('./assets/media/sheSaidYes.mp3');
yesSound.type = 'audio/mp3';

//query selectors
const nextBtn = document.querySelector('.btn3');
const yesBtn = document.querySelector('.btn1');
const noBtn = document.querySelector('.btn2');
const question = document.querySelector('h2');
const input = document.querySelector('input');
const progress = document.querySelector('.progress');
const btnFirst = document.querySelector('.btn-first');
const btnChoice = document.querySelector('.btn-choice');
const loveText = document.querySelector('.love-text');
const imageBox = document.querySelector('.image-box img');


const questions = [
    "What's your idea of a perfect day?",
    "What's your favorite memory so far?",
    "What's something that always makes you smile?",
    "What's your favorite thing about us?"
];

const noComments = [
    "Hmm… Really?!! 😏",
    "Don't be shy now!! 😌",
    "I'll pretend I didn't see that!! 👀",
    "Stop chasing the NO! and Do what's right!!💕",
];

const images = [
    "../assets/media/Tims02.jpg",
    "../assets/media/Tims03.jpg",
    "../assets/media/Tims05.jpg",
    "../assets/media/Tims06.jpg",
]

const valentineImage = '../assets/media/Tims04.png'; 

let storedAnswers = []; 
let currentQuestionText = "";
let remainingQuestions = [...questions];
const totalQuestions = questions.length;
btnChoice.style.display = 'none';

let remainingImages = [...images];

let remainingComments = [...noComments];
let yesScale = 1;
let noScale = 1;
let noCommentsInterval= null;
let originalValentineQuestion = "Will you be my Valentine? ❤️";
let canShowNoComments = false;

showNextQuestion();

nextBtn.addEventListener('click', () => {

    if (remainingQuestions.length >= 0 && input.value.trim()) {

        storedAnswers.push({
            question: currentQuestionText,
            answer: input.value.trim()
        });

        input.value = "";
    }

    showNextQuestion();
});



function showNextQuestion() {
    question.classList.add('shuffle-out');

    setTimeout(() => {
        if (remainingQuestions.length > 0) {
            // Random question
            const index = Math.floor(Math.random() * remainingQuestions.length);
            const nextQuestion = remainingQuestions.splice(index, 1)[0];
            currentQuestionText = nextQuestion;
            question.textContent = nextQuestion;


            // Random image for this question
            if (remainingImages.length > 0) {
                const nextImage = remainingImages.shift(); // removes it from array
                imageBox.src = nextImage;
            }

            // Update progress
            const answered = totalQuestions - remainingQuestions.length;
            progress.textContent = `Question ${answered} / ${totalQuestions}`;
        } 
        else {
            // Valentine stage
            question.textContent = originalValentineQuestion;
            imageBox.src = '../assets/media/Tims01.png'; // optional Valentine image
            progress.style.display = 'none';

            input.style.display = 'none';
            btnFirst.style.display = 'none';
            btnChoice.style.display = 'flex';

            canShowNoComments = false;
            setTimeout(() => {
                canShowNoComments = true;
            }, 4000);
        }

        // Animate question in
        question.classList.remove('shuffle-out');
        question.classList.add('shuffle-in');

        setTimeout(() => {
            question.classList.remove('shuffle-in');
        }, 300);

    }, question.textContent ? 300 : 0);
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
shuffleArray(remainingImages);

function moveNoButton() {
    const padding = 20;

    const maxX = Math.max(
        padding,
        window.innerWidth - noBtn.offsetWidth - padding
    );

    const maxY = Math.max(
        padding,
        window.innerHeight - noBtn.offsetHeight - padding
    );

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function startNoChaos() {
    if (noCommentsInterval) return;

    noCommentsInterval = setInterval(() => {
        // YES grows regardless
        yesScale += 0.85;
        yesBtn.style.transform = `scale(${yesScale})`;

        // ONLY change text after 5 seconds
        if (canShowNoComments) {
            const index = Math.floor(Math.random() * noComments.length);
            question.textContent = noComments[index];
        }
    }, 3000);
}

yesBtn.addEventListener('click', () => {
    if (noCommentsInterval) clearInterval(noCommentsInterval);

    question.textContent = "I'm Proud of you and I love You Always!";
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none';
    sendAnswersToEmail();

    yesSound.play();

    // Show love text
    loveText.classList.add('show');
    loveText.style.display = 'flex';

    imageBox.src = valentineImage;

    // Screen shake
    document.body.classList.add('shake-screen');

    // h2 animation
    question.classList.remove('love-burst');
    void question.offsetWidth;
    question.classList.add('love-burst');

    setTimeout(() => {
        document.body.classList.remove('shake-screen');
    }, 1000);
});


noBtn.addEventListener('mouseover', () => {

    noScale = Math.max(0.4, noScale - 0.05);
    noBtn.style.transform = `scale(${noScale})`;

    moveNoButton();

    if (!noCommentsInterval) {
        startNoChaos();
    }
});

let yesX = 0;
let yesY = 0;

document.addEventListener('mousemove', (e) => {
    const rect = yesBtn.getBoundingClientRect();

    // Current center of YES
    const currentX = rect.left + rect.width / 2;
    const currentY = rect.top + rect.height / 2;

    // Distance to cursor
    const dx = e.clientX - currentX;
    const dy = e.clientY - currentY;

    // Gentle follow (lower = slower)
    yesX += dx * 0.02;
    yesY += dy * 0.02;

    yesBtn.style.transform = `
        translate(${yesX}px, ${yesY}px)
        scale(${yesScale})
    `;
});

function sendAnswersToEmail() {

    if (storedAnswers.length === 0) return;

    let formattedText = "";

    storedAnswers.forEach((item, index) => {
        formattedText += `${index + 1}. ${item.question}\n`;
        formattedText += `Answer: ${item.answer}\n\n`;
    });

    const templateParams = {
        message: formattedText
    };

    emailjs.send("service_px7uu1b", "template_rb7mhke", templateParams)
        .then(function(response) {
            alert("Answers sent to my email 💌");
        }, function(error) {
            alert("Something went wrong 😢");
            console.log(error);
        });
}

