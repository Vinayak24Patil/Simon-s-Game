let gamesq=[];
let userseq=[];

let btns=["yellow","red","purple","green"];

let started = false;
let level =0;

let h2=document.querySelector("h2");
// Step 1
document.addEventListener("keypress", function(){
    if(started==false){
        console.log("game is started");
        started=true;

        levelUp();
    }
});

// this flash function occured for 1000mili sec and quickly removed from css
function GameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },50);
}

function UserFlash(btn){
    btn.classList.add("UserFlash");
    setTimeout(function(){
        btn.classList.remove("UserFlash");
    },250);
}

// Step 2 -> Level up 
function levelUp(){
    userseq=[]; //reseted the array
    level++;//level updated
    h2.innerText= `Level ${level}`;//text displayed on screen

    // random flash
    let randIdx=Math.floor(Math.random()*4); //idex generated
    let randColor = btns[randIdx];//string from array is getted
    let randBtn=document.querySelector(`.${randColor}`);//class acced by `.${Color}`
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);

    gamesq.push(randColor);
    console.log(gamesq);
    GameFlash(randBtn);
}

// Checking the function sequance is right or not
function checkAns(idx){
    // console.log(`current level:${level}`);
    if(userseq[idx]==gamesq[idx]){
       if(userseq.length==gamesq.length){
        setTimeout(levelUp,1000);
       }
    }else{
        h2.innerHTML=`Game Over! Your score was <b>${level-1}</b> <br> Press any key to start Again...!`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

// Button Press Function for getting btn value and Add to User Sequance
function btnPress(){
    console.log(this);
    let btn=this; //as a argument to btnFlash
    UserFlash(btn);//btnFlash is occured for clicked button

    UserColor=btn.getAttribute("id");//getting attribute name and asign to UserColor
    userseq.push(UserColor);

    checkAns(userseq.length-1);//To check sequance
}

// Gives the which button is clicked
let allBtns= document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gamesq=[];
    userseq=[];
    level=0;
}