//Version 1.2
//Hace falta:   
//              refactorizar codigo ciclo while en boardlayout
//              colocar boton Pausar, Reiniciar, Salir en Layout

const getElement = (element) => document.querySelector(element);

const welcomePage = getElement("#welcome-sct");
const customaPage = getElement("#customize-sct");
const gamePage = getElement("#board-game");
const startBtn = getElement("#start-btn");
const boardLevelText = getElement("#level-text");
const boardTryText = getElement("#intentos-text");
const boardTimeText = getElement("#time-text");
const layout = getElement("#layout");
const winDiv = getElement("#win-game");
const winConfetti = getElement("#win-confetti");

const animationConfetti = bodymovin.loadAnimation({
    wrapper: winConfetti,
    animType: "svg",
    loop: false,
    autoplay: false,
    path: "https://assets10.lottiefiles.com/packages/lf20_u4yrau.json"
});

let boardImgBack = getElement("#background-img-board");

let levelInput = "";
let topicInput = "";

let count = 0;
let totalMatch = 0;

const cardsEasy=[];
const inerDivEasy = [];
const cardDivBack = [];
const cardDivFront = [];

let flipSelected = [];
let selectedCards = [];
let card1 = "";
let card2 = "";
let innerSelected = [];

let imgListAnimals = [];
let imgAnimalsSrc = ["svg/Animals/Buo.svg","svg/Animals/Dog.svg","svg/Animals/Dragon.svg",
                        "svg/Animals/Elephant.svg","svg/Animals/Giraffe.svg","svg/Animals/Gnu.svg",
                        "svg/Animals/Hippo.svg","svg/Animals/Monkey.svg","svg/Animals/Sheep.svg",
                        "svg/Animals/Triceratops.svg","svg/Animals/Zebra.svg",
                        "svg/Animals/Brontosaurus.svg"];

let imgListFood = [];
let imgFoodSrc = ["svg/Food/Burger.svg","svg/Food/Ensalada.svg","svg/Food/Fresa.svg",
                    "svg/Food/Orange.svg","svg/Food/Pan.svg","svg/Food/PastaSoup.svg",
                    "svg/Food/Pera.svg","svg/Food/Pizza.svg","svg/Food/Sandwich.svg",
                    "svg/Food/Sushi.svg","svg/Food/Uvas.svg","svg/Food/Zanahoria.svg"];

let imgListGames = [];
let imgGamesSrc = ["svg/Games/ArcadeMachine.svg","svg/Games/Control2.svg","svg/Games/ControlOld.svg",
                    "svg/Games/CrossyRoad.svg", "svg/Games/Jetpack.svg","svg/Games/MagicTiles.svg",
                    "svg/Games/Minecraf.svg","svg/Games/PlayGames.svg", "svg/Games/PokemonGo.svg",
                    "svg/Games/Sonic.svg", "svg/Games/SuperMario.svg", "svg/Games/SpacePlay.svg"];

startBtn.addEventListener("click", ()=>{
    
    levelInput = getElement("input[name=level]:checked").value;
    topicInput = getElement("input[name=topic]:checked").value;
    
    if(levelInput !== "" || topicInput !== ""){
        
        welcomePage.classList.add("hide");
        customaPage.classList.add("hide");
        gamePage.classList.remove("hide");    

        switch(levelInput){
            case "easy":
                boardLevelText.textContent = "Easy";
                bgBoardGame();
                break;
                
            case "medium":
                boardLevelText.textContent = "Medium";
                bgBoardGame();
                break;
            
            case "hard":
                boardLevelText.textContent = "Hard";
                bgBoardGame();
                break;
        }
    }
})

function bgBoardGame() {
    
    if(topicInput === "animals"){
        boardImgBack.setAttribute("src", "svg/Fondo-animal.svg");
        
        if(levelInput==="easy"){
            createSixImgs(imgAnimalsSrc,imgListAnimals,12);
            boardLayoutEasy(imgListAnimals);
        }
        else if(levelInput==="medium"){
            createSixImgs(imgAnimalsSrc,imgListAnimals,20);
            boardLayoutMedium(imgListAnimals);
        }
        else if(levelInput==="hard"){
            createSixImgs(imgAnimalsSrc,imgListAnimals,24);
            boardLayoutHard(imgListAnimals);
        }
    }
    
    else if(topicInput === "food"){
        boardImgBack.setAttribute("src", "svg/Fondo-food.svg");
        
        if(levelInput==="easy"){
            createSixImgs(imgFoodSrc,imgListFood,12);
            boardLayoutEasy(imgListFood);
        }
        else if(levelInput==="medium"){
            createSixImgs(imgFoodSrc,imgListFood,20);
            boardLayoutMedium(imgListFood);
        }
        else if(levelInput==="hard"){
            createSixImgs(imgFoodSrc,imgListFood,24);
            boardLayoutHard(imgListFood);
        }
    }
    
    else if(topicInput === "games"){
        boardImgBack.setAttribute("src", "svg/Fondo-game.svg");

        if(levelInput==="easy"){
            createSixImgs(imgGamesSrc,imgListGames,12);
            boardLayoutEasy(imgListGames);
        }
        else if(levelInput==="medium"){
            createSixImgs(imgGamesSrc,imgListGames,20);
            boardLayoutMedium(imgListGames);
        }
        else if(levelInput==="hard"){
            createSixImgs(imgGamesSrc,imgListGames,24);
            boardLayoutHard(imgListGames);
        }
    }

}

function createFlipCard(z,classCard){

    for(let i = 0; i < z; i++){
        let newDivCard = document.createElement("div");
        newDivCard.setAttribute("class", classCard+i+" no-match");
        cardsEasy.push(newDivCard);
        layout.appendChild(newDivCard);
    }

    for(let i = 0; i < cardsEasy.length; i++){
        let newInnerCard = document.createElement("div");
        newInnerCard.setAttribute("class", "flip-card-inner "+i);
        inerDivEasy.push(newInnerCard);
        cardsEasy[i].appendChild(newInnerCard);
    }

    for(let i = 0; i < inerDivEasy.length; i++){
        let cardFront = document.createElement("div");
        let cardBack = document.createElement("div");
        
        cardFront.setAttribute("class","flip-card-front");
        cardBack.setAttribute("class","flip-card-back flex-style");

        cardDivBack.push(cardBack);
        cardDivFront.push(cardFront);

        inerDivEasy[i].appendChild(cardFront);
        inerDivEasy[i].appendChild(cardBack);
    }
}

function createSixImgs(arr1,arr2,z){

    for(let i = 0, j = 0; i < z; i++, j++){
        
        const randomImgIndex = Math.floor(Math.random() * arr1.length);
        const randomImg = arr1[randomImgIndex];
        
        if(i < z/2){

            let newImg = document.createElement("img");
            arr2.push(newImg);
            arr2[i].setAttribute("src",randomImg);
            arr2[i].setAttribute("class","img-resp "+i);

            arr1 = arr1.filter((n) => n!== randomImg);
        }

        else{

            let newImg = document.createElement("img");                
            arr2.push(newImg);
            arr2[i].setAttribute("src",arr2[i-(z/2)].getAttribute("src"));
            arr2[i].setAttribute("class","img-resp "+i);
        }
        
    }
}

function checkPar(){
    
    for(let i = 0; i < cardsEasy.length; i++){

        cardsEasy[i].addEventListener("click",()=>{

            if(cardsEasy[i].classList.contains("no-match")){
            
                count += 1;
                boardTryText.textContent = count;
    
                inerDivEasy[i].style.transform = ("rotateY(180deg)");
                
                let zz = cardsEasy[i];
                let pd = inerDivEasy[i];
                let item = cardDivBack[i].firstChild.src;
    
                flipSelected.push(zz);
                innerSelected.push(pd);
                selectedCards.push(item);

                cardsEasy[i].classList.remove("no-match");
    
                setTimeout(()=>{
                    
                    if(selectedCards.length === 2){
                        
                        if (selectedCards[0] !== selectedCards[1]){
                            innerSelected[0].style.transform = ("rotateY(0deg)");
                            innerSelected[1].style.transform = ("rotateY(0deg)");
                            cardDivFront[i].style.transform = ("rotateY(0deg)");
                            cardDivBack[i].style.transform = ("rotateY(180deg)");
                            flipSelected[0].classList.add("no-match");
                            flipSelected[1].classList.add("no-match");
                        }
                        else{
                            flipSelected[0].classList.remove("no-match");
                            flipSelected[1].classList.remove("no-match");
                            totalMatch += 1;
                        }

                        selectedCards = [];
                        innerSelected = [];
                        flipSelected = [];
                    }    

                },850);
                
            }

        })
        
    }
}

function timeGame(tt){

    let intervalTime = setInterval(()=>{
    
        if(tt > 0 && totalMatch < cardsEasy.length/2){
            boardTimeText.textContent = tt+" s";
            tt -=1;
        }
        else if(tt == 0 && totalMatch < cardsEasy.length/2){
            boardTimeText.textContent = "0 s";

            for(cardn of cardsEasy){
                cardn.classList.remove("no-match");
            }
        }
        else if(totalMatch == cardsEasy.length/2){
            clearInterval(intervalTime);
            layout.style.opacity = "0.7";
            winDiv.classList.remove("hide");
            winDiv.classList.add("win");
            winConfetti.classList.remove("hide");
            animationConfetti.goToAndPlay(0,true);
            setInterval(()=>{
                animationConfetti.goToAndPlay(0,true);
            }, 5000);
        }

    },1000);
    
}

function boardLayoutEasy(arr){
            
    layout.style.height = "510px";
    layout.style.width = "600px";
    layout.style.gridTemplateColumns = "repeat(4,auto)";

    createFlipCard(12,"flip-card-easy ");

    let n = 0;

    while(n < 100){

        for(let i = 0; i < cardDivBack.length; i++){
            let randomNumber = Math.floor(Math.random() * 12);
            
            if(cardDivBack[i].innerHTML == ""){
                cardDivBack[i].append(arr[randomNumber]);
            }
        }

        n++;

    }
    
    timeGame(30);

    checkPar();
    
}

function boardLayoutMedium(arr){
            
    layout.style.margin = "5px Auto"; 
    layout.style.height = "530px";
    layout.style.width = "610px";
    layout.style.gridTemplateColumns = "repeat(5,auto)";

    createFlipCard(20,"flip-card-medium ");

    let n = 0;

    while(n < 100){

        for(let i = 0; i < cardDivBack.length; i++){
            let randomNumber = Math.floor(Math.random() * 20);
            
            if(cardDivBack[i].innerHTML == ""){
                cardDivBack[i].append(arr[randomNumber]);
            }
        }

        n++;

    }
    
    timeGame(65);

    checkPar();

}

function boardLayoutHard(arr){
            
    layout.style.margin = "5px Auto"; 
    layout.style.height = "530px";
    layout.style.width = "720px";
    layout.style.gridTemplateColumns = "repeat(6,auto)";

    createFlipCard(24,"flip-card-medium ");

    let n = 0;

    while(n < 100){

        for(let i = 0; i < cardDivBack.length; i++){
            let randomNumber = Math.floor(Math.random() * 24);
            
            if(cardDivBack[i].innerHTML == ""){
                cardDivBack[i].append(arr[randomNumber]);
            }
        }

        n++;

    }

    timeGame(100);

    checkPar();
}

/*
    VERSION 1.0

    const startBtn = document.querySelector("#start-btn");
    const boardLevelText = document.querySelector("#level-text");
    const boardTryText = document.querySelector("#intentos-text");
    const boardTimeText = document.querySelector("#time-text");
    const layout = document.querySelector("#layout");

    let topic = "";
    let level = "";
    let boardImgBack = document.querySelector("#background-img-board");
    let cardsEasy = [];

    startBtn.addEventListener("click", ()=>{
        topic = document.querySelector("input[name=topic]:checked").value;
        level = document.querySelector("input[name=level]:checked").value;
        
        
        if(topic === "animals" & level === "easy")
        {
            boardLevelText.textContent = "Easy";
            boardImgBack.setAttribute("src", "svg/Fondo-animal.svg");
            boardLayoutEasy();
            
        }
        else if(topic === "animals" & level === "medium")
        {
            boardLevelText.textContent = "Medium";
            boardImgBack.setAttribute("src", "svg/Fondo-animal.svg");
            
        }
        else if(topic === "animals" & level === "hard")
        {
            boardLevelText.textContent = "Hard";
            boardImgBack.setAttribute("src", "svg/Fondo-animal.svg");
        }
        else if(topic === "food" & level === "easy")
        {
            boardLevelText.textContent = "Easy";
            boardImgBack.setAttribute("src", "svg/Fondo-food1.svg");
            boardLayoutEasy();
        }
        else if(topic === "food" & level === "medium")
        {
            boardLevelText.textContent = "Medium";
            boardImgBack.setAttribute("src", "svg/Fondo-food1.svg");
        }
        else if(topic === "food" & level === "hard")
        {
            boardLevelText.textContent = "Hard";
            boardImgBack.setAttribute("src", "svg/Fondo-food1.svg");
        }
        else if(topic === "games" & level === "easy")
        {
            boardLevelText.textContent = "Easy";
            boardImgBack.setAttribute("src", "svg/Fondo-game.svg");
            boardLayoutEasy();
        }
        else if(topic === "games" & level === "medium")
        {
            boardLevelText.textContent = "Medium";
            boardImgBack.setAttribute("src", "svg/Fondo-game.svg");
        }
        else if(topic === "games" & level === "hard")
        {
            boardLevelText.textContent = "Hard";
            boardImgBack.setAttribute("src", "svg/Fondo-game.svg");
        }

    })

    function boardLayoutEasy(){
            
        layout.style.height = "510px";
        layout.style.width = "600px";
        layout.style.gridTemplateColumns = "repeat(4,auto)";

        for(let i=0; i<12; i++){
            let newCard = document.createElement("div");
            newCard.setAttribute("class", "flip-card-easy "+i);
            cardsEasy.push(newCard);
            layout.appendChild(newCard);
        }

        let inerEasy = [];

        for(let i=0; i<cardsEasy.length;i++){
            let newInnerCard = document.createElement("div");
            newInnerCard.setAttribute("class", "flip-card-inner "+i);
            inerEasy.push(newInnerCard);
            cardsEasy[i].appendChild(newInnerCard);
        }

        for(let i = 0; i<inerEasy.length; i++){
            let cardFront = document.createElement("div");
            let cardBack = document.createElement("div");
            
            cardFront.setAttribute("class","flip-card-front");
            cardBack.setAttribute("class","flip-card-back");

            inerEasy[i].appendChild(cardFront);
            inerEasy[i].appendChild(cardBack);
        }

        for(let i =0; i<cardsEasy.length; i++){
            cardsEasy[i].addEventListener("click",()=>{
                inerEasy[i].style.transform = ("rotateY(180deg)");
            })
        }

    }

//Version 1.1
const startBtn = document.querySelector("#start-btn");
const boardLevelText = document.querySelector("#level-text");
const boardTryText = document.querySelector("#intentos-text");
const boardTimeText = document.querySelector("#time-text");
const layout = document.querySelector("#layout");
let boardImgBack = document.querySelector("#background-img-board");

let levelInput = "";
let topicInput = "";

const cardsEasy=[];
const inerDivEasy = [];
const cardDivBack = [];

//Lista de todas las <img> creadas para animales
let imgListAnimals = [];
//Lista de SRC de imagenes de animales a usar
const imgAnimalsSrc = ["svg/Buo.svg","svg/Dog.svg","svg/Dragon.svg",
                        "svg/Elephant.svg","svg/Giraffe.svg","svg/Gnu.svg",
                        "svg/Hippo.svg","svg/Monkey.svg","svg/Sheep.svg",
                        "svg/Triceratops.svg","svg/Zebra.svg","svg/Brontosaurus.svg"];

startBtn.addEventListener("click", ()=>{
    
    levelInput = document.querySelector("input[name=level]:checked").value;
    topicInput = document.querySelector("input[name=topic]:checked").value;

    switch(levelInput){
        case "easy":
            boardLevelText.textContent = "Easy";
            bgBoardGame();
            boardLayoutEasy();
            break;
            
        case "medium":
            boardLevelText.textContent = "Medium";
            bgBoardGame();
            break;
        
        case "hard":
            boardLevelText.textContent = "Hard";
            bgBoardGame();
            break;
    }
})

function bgBoardGame() {
    
    if(topicInput === "animals"){
        boardImgBack.setAttribute("src", "svg/Fondo-animal.svg");
    }
    else if(topicInput === "food"){
        boardImgBack.setAttribute("src", "svg/Fondo-food.svg");
    }
    else if(topicInput === "games"){
        boardImgBack.setAttribute("src", "svg/Fondo-game.svg");
    }

}

function createFlipCardEasy(){

    for(let i = 0; i < 12; i++){
        let newDivCard = document.createElement("div");
        newDivCard.setAttribute("class", "flip-card-easy "+i);
        cardsEasy.push(newDivCard);
        layout.appendChild(newDivCard);
    }

    for(let i = 0; i < cardsEasy.length; i++){
        let newInnerCard = document.createElement("div");
        newInnerCard.setAttribute("class", "flip-card-inner "+i);
        inerDivEasy.push(newInnerCard);
        cardsEasy[i].appendChild(newInnerCard);
    }

    for(let i = 0; i < inerDivEasy.length; i++){
        let cardFront = document.createElement("div");
        let cardBack = document.createElement("div");
        
        cardFront.setAttribute("class","flip-card-front");
        cardBack.setAttribute("class","flip-card-back flex-style");

        cardDivBack.push(cardBack);

        inerDivEasy[i].appendChild(cardFront);
        inerDivEasy[i].appendChild(cardBack);
    }
}

function createSixImgs(){

    for(let i = 0, j = 0; i < 12; i++, j++){
    
        if(j<6){
            let newImg = document.createElement("img");
            imgListAnimals.push(newImg);
            imgListAnimals[i].setAttribute("src",imgAnimalsSrc[j]);
            imgListAnimals[i].setAttribute("class","img-resp "+i);
        }
        else{
            j = 0;
            let newImg = document.createElement("img");
            imgListAnimals.push(newImg);
            imgListAnimals[i].setAttribute("src",imgAnimalsSrc[j]);
            imgListAnimals[i].setAttribute("class","img-resp "+i);
        }
    }
}

function boardLayoutEasy(){
            
    layout.style.height = "510px";
    layout.style.width = "600px";
    layout.style.gridTemplateColumns = "repeat(4,auto)";

    createFlipCardEasy();
    createSixImgs();

    let n = 0;

    while(n < 100){

        for(let i = 0; i < cardDivBack.length; i++){
            let randomNumber = Math.floor(Math.random() * 12);
            
            if(cardDivBack[i].innerHTML == ""){
                cardDivBack[i].append(imgListAnimals[randomNumber]);
            }
        }

        n++;

    }

    for(let i = 0; i < cardsEasy.length; i++){
        cardsEasy[i].addEventListener("click",()=>{
            inerDivEasy[i].style.transform = ("rotateY(180deg)");
        })
    }
}
*/