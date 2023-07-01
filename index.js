const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const logleft = document.querySelectorAll(".log-left");
const logRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");
let currentIndex = 76;
let timerId;
let outcomeTimerId;
let currentTime = 20;
const width = 9;

function moveFrog(e){
    squares[currentIndex].classList.remove('frog');
        switch(e.key){
            case 'ArrowLeft':
                if(currentIndex % width !==0)currentIndex -= 1;
                break;
                
            case 'ArrowRight':
                if(currentIndex % width !== (width-1))currentIndex += 1;
                break;

            case 'ArrowUp':
                if(Math.floor(currentIndex / width) !==0)currentIndex -= width;
                break;

            case 'ArrowDown':
                if(Math.floor(currentIndex / width) !== (width-1))currentIndex += width;
                break;
            
        }


    squares[currentIndex].classList.add('frog');
}

function checkOutcomes(){
    lose();
    win();
}


function autoMoveElements(){
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
    logleft.forEach(logLeft => moveLogLeft(logLeft));
    logRight.forEach(logRight => moveLogRight(logRight));
    
    carsLeft.forEach(carsLeft => movecarsLeft(carsLeft));
    carsRight.forEach(carsRight => movecarsRight(carsRight));

    
    
}

function moveLogLeft(logLeft){
    switch(true){
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1');
            logLeft.classList.add('l2');
            break;
            
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2');
            logLeft.classList.add('l3');
            break;

        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3');
            logLeft.classList.add('l4');
            break;

        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4');
            logLeft.classList.add('l5');
            break;

        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5');
            logLeft.classList.add('l1');
            break;

    }
}


function moveLogRight(logRight){
    switch(true){
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1');
            logRight.classList.add('l5');
            break;
            
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2');
            logRight.classList.add('l1');
            break;

        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3');
            logRight.classList.add('l2');
            break;

        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4');
            logRight.classList.add('l3');
            break;

        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5');
            logRight.classList.add('l4');
            break;

    }
}

function movecarsLeft(carsLeft){
    switch(true){
        case carsLeft.classList.contains('c1'):
            carsLeft.classList.remove('c1');
            carsLeft.classList.add('c2');
            break;
            
        case carsLeft.classList.contains('c2'):
            carsLeft.classList.remove('c2');
            carsLeft.classList.add('c3');
            break;

        case carsLeft.classList.contains('c3'):
            carsLeft.classList.remove('c3');
            carsLeft.classList.add('c1');
            break;

    }
}


function movecarsRight(carsRight){
    switch(true){
        case carsRight.classList.contains('c1'):
            carsRight.classList.remove('c1');
            carsRight.classList.add('c3');
            break;
            
        case carsRight.classList.contains('c2'):
            carsRight.classList.remove('c2');
            carsRight.classList.add('c1');
            break;

        case carsRight.classList.contains('c3'):
            carsRight.classList.remove('c3');
            carsRight.classList.add('c2');
            break;

    }
}


function lose(){
    if(
        squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('cl5') ||
        currentTime <=0
        ){
        resultDisplay.innerHTML = "You Lose! "
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup',moveFrog);
    }
}

function win(){
    if(squares[currentIndex].classList.contains('ending-block')){
        resultDisplay.innerHTML = "You Win , Hurray! "
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        document.removeEventListener('keyup',moveFrog);
    }
}


startPauseButton.addEventListener('click', () =>{
    if(timerId){
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        outcomeTimerId = null;
        timerId = null;
        document.removeEventListener('keyup',moveFrog);
    }
    else{
        timerId = setInterval(autoMoveElements,1000);
        outcomeTimerId = setInterval(checkOutcomes,50);
        document.addEventListener('keyup',moveFrog);
    }
})
