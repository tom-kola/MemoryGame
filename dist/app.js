var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Place } from "./types/types.js";
import { fisherYatesShuffle, idArray, URLsArray, getDiffrentURLs, getUniqueNumberForEachCard, removeCardAnimation, } from "./helpers/create-cards.helpers.js";
import { compareCardWithTarget, numberOfAttempts, resetAttempsCounter, renderResult, attemptsCounter, attemptsCounterArray, indexesToRemove, } from "./helpers/game-mechanics.helper.js";
import { titleAnimation, hideButtons, showBackButton, removingEventListeners, addingEventListeners, } from "./helpers/interface.helper.js";
const menu = document.querySelector(".menu");
const buttons = document.querySelector(".buttons");
const newGameBtn = document.querySelector("#newGame");
const returnBtn = document.querySelector("#return");
const resultsBtn = document.querySelector("#results");
const wrapper = document.querySelector(".wrapper");
const resultsSection = document.querySelector(".resultsSection");
const placeSection = document.querySelector(".place");
const attemptsSection = document.querySelector(".attempts");
const cardsArray = [];
const faceUpCardsArray = [];
const resultsArray = [];
const places = [Place.GOLD, Place.SILVER, Place.BRONZE, Place.OTHER];
let testNumber;
let gameCounter = 1;
let card;
let sectionGame;
let congratsTitle;
let trophy;
let result;
const createdElements = () => {
    prepareDOMElements();
    prepareDOMEvents();
};
const prepareDOMElements = () => {
    card = document.querySelector(".card");
    sectionGame = document.querySelector(".game");
    result = document.querySelector(".result");
    trophy = document.querySelector(".trophy");
    congratsTitle = document.querySelector(".congratsTitle");
};
const prepareDOMEvents = () => {
    document.addEventListener("click", checkClick);
};
const checkClick = (e) => {
    testNumber = `${e.target.getAttribute("data")}`;
    if (e.target.classList.contains("card")) {
        if (e.target.getAttribute("data") === testNumber &&
            !e.target.classList.contains("active")) {
            e.target.classList.add("active");
            gameMachanics(e);
        }
        else if (e.target.classList.contains("active")) {
            e.target.removeEventListener("click", checkClick);
        }
    }
};
export const changeClass = (element, className) => {
    element.classList.toggle(className);
};
const createNewCards = (time) => {
    return new Promise((resolve) => {
        sectionGame = document.createElement("section");
        sectionGame.setAttribute("id", "exist");
        sectionGame.classList.add("game");
        wrapper.append(sectionGame);
        for (let i = 0; i <= 1; i++) {
            for (let i = 0; i <= 1; i++) {
                card = document.createElement("div");
                card.classList.add("card");
                card.classList.add("covered");
                card.classList.add("cardAnimation");
                card.setAttribute("id", `${idArray[i]}`);
                card.style.backgroundImage = `url(${URLsArray[i]})`;
                getUniqueNumberForEachCard(card);
                cardsArray.push(card);
            }
        }
        idArray.splice(0, 6);
        URLsArray.splice(0, 6);
        fisherYatesShuffle(cardsArray);
        setTimeout(() => {
            sectionGame.append(...cardsArray);
            resolve();
        }, time);
    });
};
const startNewGame = () => __awaiter(void 0, void 0, void 0, function* () {
    getDiffrentURLs();
    removingEventListeners(newGameBtn, startNewGame);
    removingEventListeners(resultsBtn, showResult);
    yield titleAnimation(menu);
    yield hideButtons(1000, buttons);
    yield showBackButton(200, returnBtn);
    yield createNewCards(500);
    yield removeCardAnimation(cardsArray, 1000);
});
const revealTheCard = (card, time) => {
    return new Promise((resolve) => {
        changeClass(card, "rotateCard");
        setTimeout(() => {
            changeClass(card, "covered");
        }, 500);
        faceUpCardsArray.push(card);
        if (faceUpCardsArray.length === 2 &&
            faceUpCardsArray[0].getAttribute("data") !==
                faceUpCardsArray[1].getAttribute("data")) {
            document.removeEventListener("click", checkClick);
            setTimeout(() => {
                document.addEventListener("click", checkClick);
                resolve(faceUpCardsArray);
            }, time);
        }
        else if (faceUpCardsArray.length === 2 &&
            faceUpCardsArray[0].getAttribute("data") ===
                faceUpCardsArray[1].getAttribute("data")) {
            faceUpCardsArray.splice(0, 1);
        }
    });
};
const compareTwoCards = (array) => {
    return new Promise((resolve) => {
        indexesToRemove.splice(0, 2);
        if (array[0].getAttribute("id") === array[1].getAttribute("id")) {
            array.forEach((card) => {
                changeClass(card, "becomeTransparent");
                setTimeout(() => {
                    changeClass(card, "hidden");
                }, 500);
            });
            compareCardWithTarget(array, cardsArray);
        }
        else {
            array.forEach((card) => {
                changeClass(card, "rotateCard");
                changeClass(card, "rotateCardAgain");
                setTimeout(() => {
                    changeClass(card, "covered");
                    card.classList.remove("active");
                }, 500);
                setTimeout(() => {
                    changeClass(card, "rotateCardAgain");
                    card.style.transform = "scale(1)";
                    card.classList.remove("cardAnimation");
                }, 1000);
            });
        }
        numberOfAttempts(faceUpCardsArray);
        array.splice(0, 2);
        setTimeout(() => {
            if (cardsArray.length === 0) {
                resolve();
            }
        }, 500);
    });
};
const addRecord = () => {
    return new Promise((resolve) => {
        const place = document.createElement("p");
        place.textContent = `${gameCounter.toString()}.`;
        placeSection.append(place);
        const result = document.createElement("p");
        result.classList.add("result");
        attemptsCounterArray.push(attemptsCounter.toString());
        resultsArray.push(result);
        attemptsSection.append(result);
        switch (gameCounter) {
            case 1:
                place.classList.add(Place.GOLD);
                result.classList.add(Place.GOLD);
                break;
            case 2:
                place.classList.add(Place.SILVER);
                result.classList.add(Place.SILVER);
                break;
            case 3:
                place.classList.add(Place.BRONZE);
                result.classList.add(Place.BRONZE);
                break;
            default:
                place.classList.add(Place.OTHER);
                result.classList.add(Place.OTHER);
        }
        resolve();
    });
};
const endTheGame = (time, time2) => {
    return new Promise((resolve) => {
        congratsTitle = document.createElement("h1");
        congratsTitle.classList.add("congratsTitle");
        wrapper.append(congratsTitle);
        setTimeout(() => {
            congratsTitle.innerText = "Gratulacje!";
            resolve();
        }, time);
        trophy = document.createElement("h1");
        trophy.classList.add("congratsTitle");
        trophy.classList.add("trophy");
        trophy.innerHTML = '<i class="fa-solid fa-trophy"></i>';
        const actualResult = attemptsCounterArray.length;
        setTimeout(() => {
            wrapper.append(trophy);
            congratsTitle.innerText = `Zrobiłeś to w ${attemptsCounterArray[actualResult - 1]} ruchach!`;
        }, time2);
        switch (attemptsCounterArray.indexOf(attemptsCounterArray[actualResult - 1])) {
            case 0:
                trophy.classList.add(Place.GOLD);
                break;
            case 1:
                trophy.classList.add(Place.SILVER);
                break;
            case 2:
                trophy.classList.add(Place.BRONZE);
                break;
            default:
                trophy.classList.add(Place.OTHER);
        }
        resolve();
    });
};
const startNextGame = (time) => {
    return new Promise((resolve) => {
        resetAttempsCounter();
        gameCounter++;
        sectionGame.remove();
        setTimeout(() => {
            congratsTitle.remove();
            trophy.remove();
        }, time);
        resolve();
    });
};
const gameMachanics = (e) => __awaiter(void 0, void 0, void 0, function* () {
    const array = yield revealTheCard(e.target, 1100);
    yield compareTwoCards(array);
    yield addRecord();
    yield endTheGame(500, 2000);
    yield startNextGame(5000);
    addingEventListeners(newGameBtn, startNewGame);
    addingEventListeners(resultsBtn, showResult);
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield titleAnimation(menu);
    }), 5000);
    yield showBackButton(0, returnBtn);
    yield hideButtons(5000, buttons);
});
const showStatistics = () => {
    return new Promise((resolve) => {
        returnBtn.removeEventListener("click", exitGame);
        setTimeout(() => {
            changeClass(resultsSection, "unvisible");
            changeClass(resultsSection, "becomeOpaque");
        }, 400);
        setTimeout(() => {
            returnBtn.addEventListener("click", exitGame);
        }, 600);
        renderResult(resultsArray);
        resolve();
    });
};
const showResult = () => __awaiter(void 0, void 0, void 0, function* () {
    removingEventListeners(resultsBtn, showResult);
    removingEventListeners(newGameBtn, startNewGame);
    yield titleAnimation(menu);
    yield hideButtons(1000, buttons);
    yield showBackButton(0, returnBtn);
    yield showStatistics();
});
const exitGame = () => {
    if (document.getElementById("exist")) {
        idArray.splice(0, 6);
        URLsArray.splice(0, 6);
        cardsArray.splice(0, 12);
        faceUpCardsArray.splice(0, 2);
        sectionGame.remove();
        addingEventListeners(newGameBtn, startNewGame);
        addingEventListeners(resultsBtn, showResult);
    }
    else if (resultsSection.classList.contains("becomeOpaque")) {
        changeClass(resultsSection, "unvisible");
        changeClass(resultsSection, "becomeOpaque");
        addingEventListeners(resultsBtn, showResult);
        addingEventListeners(newGameBtn, startNewGame);
    }
    titleAnimation(menu);
    hideButtons(0, buttons);
    changeClass(returnBtn, "unvisible");
};
newGameBtn.addEventListener("click", startNewGame);
returnBtn.addEventListener("click", exitGame);
resultsBtn.addEventListener("click", showResult);
document.addEventListener("DOMContentLoaded", createdElements);
