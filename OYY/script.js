const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const finalScreen = document.getElementById("finalScreen");
const grid = document.getElementById("grid");
const typing = document.getElementById("typing");
const photo = document.getElementById("photo");
const music = document.getElementById("music");
const effects = document.getElementById("effects");

let first = null;
let second = null;
let lock = false;
let match = 0;

const emojis = ["💖","🎂","🎁","🌸","💖","🎂","🎁","🌸"];

function start(){
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  music.play();
  createGame();
}

function createGame(){
  emojis.sort(()=>0.5-Math.random()).forEach(e=>{
    const card=document.createElement("div");
    card.classList.add("card");
    card.dataset.e=e;
    card.innerHTML="?";
    card.onclick=flip;
    grid.appendChild(card);
  });
}

function flip(){
  if(lock||this===first)return;
  this.innerHTML=this.dataset.e;
  if(!first){first=this;return;}
  second=this;
  lock=true;
  if(first.dataset.e===second.dataset.e){
    match++;
    reset();
    if(match===4)setTimeout(win,1000);
  }else{
    setTimeout(()=>{
      first.innerHTML="?";
      second.innerHTML="?";
      reset();
    },800);
  }
}

function reset(){
  first=null;second=null;lock=false;
}

function win(){
  gameScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");
  typeText("🎉 bobo nyenyakkk 💖");
  setTimeout(()=>{
    photo.classList.add("show");
    confetti();
  },2000);
}

function typeText(text){
  let i=0;
  const interval=setInterval(()=>{
    typing.innerHTML+=text[i];
    i++;
    if(i>=text.length)clearInterval(interval);
  },80);
}

function confetti(){
  for(let i=0;i<60;i++){
    const el=document.createElement("div");
    el.classList.add("effect");
    el.textContent=Math.random()>0.5?"💖":"✨";
    el.style.left=Math.random()*100+"vw";
    el.style.animationDuration=(2+Math.random()*3)+"s";
    effects.appendChild(el);
  }
}