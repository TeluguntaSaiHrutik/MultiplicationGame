
let wrapper=document.querySelector('#wrapper');
let timer = wrapper.querySelector(".timer");
let score = wrapper.querySelector(".score");

let screen2 = wrapper.querySelector(".flex-box");
let question = wrapper.querySelector(".question");
let allOptions = wrapper.querySelector(".answer-buttons")
let accuracy = wrapper.querySelector(".accuracy");

const time_per_game=45;
let userScore=0;
let countdown=time_per_game;
let attempted=0;
let curr_accuracy=0;
let ans = null;


function generateQuestion(){
    // Generate two random numbers between 0 and 20
    let num1 = Math.floor(Math.random() * 21);
    let num2 = Math.floor(Math.random() * 21);

    // Calculate the correct answer
    ans = num1 * num2;

    let opt1 = Math.floor(Math.random() * 21) * Math.floor(Math.random() * 21);
    let opt2 = Math.floor(Math.random() * 21) * Math.floor(Math.random() * 21);

    
    while (opt1 === ans) {
        opt1 = Math.floor(Math.random() * 21) * Math.floor(Math.random() * 21);
    }
    while (opt2 === ans || opt2 === opt1) {
        opt2 = Math.floor(Math.random() * 21) * Math.floor(Math.random() * 21);
    }

    // Create the question string
    let questionString = `${num1} X ${num2} =`;

    // Put the options into an array and shuffle
    let options = [ans, opt1, opt2];
    options.sort(() => Math.random() - 0.5);

    return [questionString, ...options];
    

}

function handleGame(){
    let questionCreated = generateQuestion();
    question.textContent = questionCreated[0];

    buttons=allOptions.querySelectorAll(".options");
    buttons.forEach((button,idx) => {
        button.textContent=questionCreated[idx+1];
        button.removeEventListener("click",handleAnswers);
        button.addEventListener("click",handleAnswers);
    });
}

function handleAnswers(event){
    let userAnswer=event.target.textContent;
    attempted++;
    if(ans==userAnswer){
        userScore++;
        score.textContent="Score : "+userScore;
    }
    curr_accuracy=(userScore/attempted)*100;
    accuracy.textContent="Accuracy : "+String(Math.round(curr_accuracy,3));
    handleGame();
}




function startTimer() {
    setInterval(() => {
        if (countdown > 0) {
            countdown--;
            timer.textContent = `Time: ${countdown}s`;
        } 
        else if(countdown==-1){
            buttons.forEach((button,idx) => {
            button.disabled=true;
        });
        }
        else {
            // End the game when the timer reaches 0
            let finalString = `Game over! Final score is ${userScore} with accuracy ${curr_accuracy} \n Do you want to continue?`;
            let confirm_val = confirm(finalString);
            if(confirm_val){
                countdown=time_per_game;
                userScore=0;
                score.textContent="Score : 0";
            }
            else{
                countdown=-1;
            }
        }
    }, 1000);
}


window.onload=function(){
    handleGame();
    startTimer();
}