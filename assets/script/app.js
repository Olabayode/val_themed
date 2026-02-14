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
    "In what ways can I love you better this year?",
    "What would make this season of our relationship easier for you?",
    "What makes you feel closest to me?",
    "If we had a love language trophy, who would win?",
    "Who fell first, you or me?",
    "If distance wasn't a factor, what would our perfect weekend look like?",
    "What moment with me made you feel the most loved?"
];

const noComments = [
    "Hmm… Really?!! 😏",
    "Don't be shy now!! 😌",
    "I'll pretend I didn't see that!! 👀",
    "Stop chasing the NO! and Do what's right!!💕",
];

const images = [
    "../assets/media/us01.jpg",
    "../assets/media/us02.png",
    "../assets/media/us03.jpg",
    "../assets/media/me01.jpg",
    "../assets/media/you01.jpg",
    "../assets/media/you02.jpg",
    "../assets/media/us05.jpg",
]

const valentineImage = '../assets/media/us04.jpg'; 


const valLetter = `
<h1>My Sunflower🌻</h1>
<p>
With every year that passes, every celebration, every situation we go through, every moment we spend together and apart, I find myself falling deeper in love with you. I keep discovering new ways to love you better, and new depths of wanting to be loved by you.
Today may be a general day for people to tell their partners “I love you,” but for me that's my every day, today, it's more than that. It's another day I get to be grateful that you are the love of my life. I'm always glad you're the one I get to say those words to. I love you, OluwaTimilehin🩷.
</p>

<p>
They say distance makes the heart grow fonder but it feels like the miles have tried to stretch us thin. Still, no matter how far they pull, they can't undo what binds us. We may be stretched across countries, but we're still stitched together at heart and putting all our effort into loving each other every single day🩷. 
Cheers to that Baby Girl🥂
</p>

<p>
I love you more than I can explain. I don't understand the physics or chemistry behind it at all, but I know how firmly my heart is set on you. All I want is YOU  and that's all I've ever wanted. YOU🌹.
</p>

<p>
I know we're going through our rough patches right now, and I know how hard it is navigating both the distance and the uncertainty of the future. Trust me, I know it isn't easy. But even in this hardship, I'm promising you again that my faith in us ,in you, has never wavered. I'm always strongly rooting for us.
</p>

<p>
Rooting for you comes naturally to me. It's almost a hobby  because I always want to see you at your best, your happiest, your softest and strongest self. And that doesn't mean I won't stand by you if times are dark. I'll be here for you, through and through. I always want to be that one friend who is more than just a friend.
</p>

<p>
Today, I'm not just celebrating our love ,I'm celebrating My Lover💞. A strong-hearted queen. Soft, beautiful, and incredible in every way. I'm celebrating every hurdle you've overcome, every situation you've handled with grace, every experience that has shaped you. I'm celebrating the trust you've placed in me, the love you've poured into me, and the effort you've invested in us,
I'm celebrating You always💝.
</p>

<p>
You are the best, most amazing woman I've ever met and I'm always glad knowing that.Ireoluwatomiwa, I'm proud of how much you're growing. May life honor your good heart with the very best it has to offer. May all the hard times become memories we look back on and say, “Wow… we really went through all that.”
I promise to make all of this worth your while your entire life.❤️
</p>

<p>
Scroll back up and read this again if you need to…
because I mean every word.
</p>

<p>
Happy Valentine's Day My Lover🌻
</p>

<p>
<strong>I Love You So Much, My Forever Valentine💗</strong>
</p>
`;

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
let originalValentineQuestion = "Happy Valentine's Day Baby, Here's a letter from me to you, My Love💌";
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
            imageBox.src = '../assets/media/finalUs.jpg'; // optional Valentine image
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

yesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (noCommentsInterval) clearInterval(noCommentsInterval);

    // question.textContent = "I'm Proud of you and I love You Always!";
    question.innerHTML = valLetter;
    question.classList.add('letter-box');
    yesBtn.style.display = 'none';
    sendAnswersToEmail();

    yesSound.play();
    // noBtn.style.display = 'none';
    

    // Show love text
    // loveText.classList.add('show');
    // loveText.style.display = 'flex';

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


// noBtn.addEventListener('mouseover', () => {

//     noScale = Math.max(0.4, noScale - 0.05);
//     noBtn.style.transform = `scale(${noScale})`;

//     moveNoButton();

//     if (!noCommentsInterval) {
//         startNoChaos();
//     }
// });

let yesX = 0;
let yesY = 0;

// document.addEventListener('mousemove', (e) => {
//     const rect = yesBtn.getBoundingClientRect();

//     // Current center of YES
//     const currentX = rect.left + rect.width / 2;
//     const currentY = rect.top + rect.height / 2;

//     // Distance to cursor
//     const dx = e.clientX - currentX;
//     const dy = e.clientY - currentY;

//     // Gentle follow (lower = slower)
//     yesX += dx * 0.02;
//     yesY += dy * 0.02;

//     yesBtn.style.transform = `
//         translate(${yesX}px, ${yesY}px)
//         scale(${yesScale})
//     `;
// });

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

