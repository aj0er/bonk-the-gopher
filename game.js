document.getElementById("start").addEventListener("click", onStart);

const scoreElement = document.getElementById("score");
const heartElement = document.getElementById("hearts");

let points = 0;
let hearts = 3;

let minWaitTime = 1000;
let maxWaitTime = 3000;

let gameOver = false;
let started = false;

const area = document.getElementById("area");

const imgFile = "gopher.png";
const deadImgFile = "gopher-dead.png";

function onStart(){
    if(started)
        return;

    started = true;
    startGopherTimer();
}

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

function startGopherTimer(){
    setTimeout(() => {
        if(gameOver)
            return;
        
        let gopher = createGopher(getRandomInt(0, screen.width - 200), getRandomInt(140, screen.height - 180));
        setTimeout(() => hideGopher(gopher), 2000);

        startGopherTimer();
        
        if(minWaitTime >= 500)
            minWaitTime -= 50;

        if(maxWaitTime >= 650)
            maxWaitTime -= 50;

    }, getRandomInt(minWaitTime, maxWaitTime));
}

function hideGopher(gopher){
    if(gameOver)
        return;

    let img = gopher.getElementsByTagName("img")[0];
    if(img.src.endsWith(imgFile)){
        img.style.display = "none";
        hearts--;
        heartElement.innerText = hearts;

        if(hearts == 0){
            alert("Game over, du fick " + points + " poäng!");
            gameOver = true;
        }
    }
}

function createGopher(x, y){
    let container = document.createElement("div");
    container.classList.add("beaver");
    container.style.left = x + "px";
    container.style.top = y + "px";

    let bg = document.createElement("div");
    bg.classList.add("bg");
    container.appendChild(bg);

    let img = document.createElement("img");
    bg.classList.add("gopher");
    img.src = "gopher.png";
    container.appendChild(img);

    img.addEventListener("click", onGopherClick);
    
    area.appendChild(container);
    return container;
}

function onGopherClick(e) {
    if(gameOver || !e.target.src.endsWith(imgFile))
        return;

    points++;
    scoreElement.innerText = points.toString();

    e.target.src = deadImgFile;
}