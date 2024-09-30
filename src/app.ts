import { Place } from "./types/types.js";
import {
	fisherYatesShuffle,
	idArray,
	URLsArray,
	getDiffrentURLs,
	getUniqueNumberForEachCard,
	removeCardAnimation,
} from "./helpers/create-cards.helpers.js";
import {
	compareCardWithTarget,
	numberOfAttempts,
	resetAttempsCounter,
	renderResult,
	attemptsCounter,
	attemptsCounterArray,
	indexesToRemove,
} from "./helpers/game-mechanics.helper.js";
import {
	titleAnimation,
	hideButtons,
	showBackButton,
	removingEventListeners,
	addingEventListeners,
} from "./helpers/interface.helper.js";

const menuStart: HTMLElement = document.querySelector(".menu__start");
const buttons: HTMLElement = document.querySelector(".start__buttons");
const newGameBtn: HTMLButtonElement = document.querySelector("#new-game");
const returnBtn: HTMLElement = document.querySelector("#return");
const resultsBtn: HTMLButtonElement = document.querySelector("#results");
const mainContainer: HTMLElement = document.querySelector("main");
const resultsSection: HTMLElement = document.querySelector(".resultsSection");
const placeSection: HTMLElement = document.querySelector(".place");
const attemptsSection: HTMLElement = document.querySelector(".attempts");

const cardsArray: HTMLElement[] = [];
const faceUpCardsArray: HTMLElement[] = [];
const resultsArray: HTMLElement[] = [];
const sortedAttemptsArray: string[] = [];

const places: Place[] = [Place.GOLD, Place.SILVER, Place.BRONZE, Place.OTHER];

let testNumber: string;
let gameCounter: number = 1;
let isGameExited = false;
let URLsArrayLength;

let card: HTMLElement;
let sectionGame: HTMLElement;
let congratsTitle: HTMLHeadingElement;
let movesTitle: HTMLHeadingElement;
let trophy: HTMLHeadingElement;
let result: HTMLElement;

const createdElements = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	card = document.querySelector(".card");
	sectionGame = document.querySelector(".game");
	result = document.querySelector(".result");
	trophy = document.querySelector(".trophy");
	congratsTitle = document.querySelector(".congrats-title");
	movesTitle = document.querySelector(".moves-title");
};

const prepareDOMEvents = () => {
	document.addEventListener("click", checkClick);
};

const checkClick = (e) => {
	if (isGameExited) return;
	testNumber = `${e.target.getAttribute("data")}`;
	if (e.target.classList.contains("card")) {
		if (
			e.target.getAttribute("data") === testNumber &&
			!e.target.classList.contains("active")
		) {
			e.target.classList.add("active");
			gameMechanics(e);
		} else if (e.target.classList.contains("active")) {
			e.target.removeEventListener("click", checkClick);
		}
	}
};
export const changeClass = (element: HTMLElement, className: string) => {
	element.classList.toggle(className);
};
const createNewCards = () => {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			sectionGame = document.createElement("section");
			sectionGame.setAttribute("id", "exist");
			sectionGame.classList.add("game");
			mainContainer.append(sectionGame);

			for (let i = 0; i <= 1; i++) {
				for (let i = 0; i <= 5; i++) {
					card = document.createElement("div");
					card.classList.add("card");
					card.classList.add("covered");
					card.classList.add("cards-animation");
					card.setAttribute("id", `${idArray[i]}`);
					card.style.backgroundImage = `url(${URLsArray[i]})`;
					getUniqueNumberForEachCard(card);
					cardsArray.push(card);
				}
			}
			idArray.splice(0, 6);
			URLsArray.splice(0, 6);
			fisherYatesShuffle(cardsArray);
			sectionGame.append(...cardsArray);
			resolve();
		});
	});
};

const checkURLsArrayLength = () => {
	if (URLsArray.length === 6) {
		createNewCards();
		removeCardAnimation(cardsArray, 1000);
		clearInterval(URLsArrayLength);
		titleAnimation(menuStart);
		showBackButton(0, returnBtn);
	}
};

const startNewGame = async () => {
	isGameExited = false;
	getDiffrentURLs();
	removingEventListeners(newGameBtn, startNewGame);
	removingEventListeners(resultsBtn, showResult);
	await titleAnimation(menuStart);
	await hideButtons(400, buttons);
	URLsArrayLength = setInterval(checkURLsArrayLength, 500);
};

const revealTheCard = (card: HTMLElement, time: number) => {
	return new Promise<HTMLElement[]>((resolve) => {
		const img = new Image();

		img.src = card.style.backgroundImage.slice(5, -2);

		img.onerror = () => {
			card.style.backgroundImage = "url(./images/undefinedPicture2.jpg)";
		};

		changeClass(card, "rotate-card");
		setTimeout(() => {
			changeClass(card, "covered");
		}, 150);
		faceUpCardsArray.push(card);
		if (
			faceUpCardsArray.length === 2 &&
			faceUpCardsArray[0].getAttribute("data") !==
				faceUpCardsArray[1].getAttribute("data")
		) {
			document.removeEventListener("click", checkClick);
			setTimeout(() => {
				document.addEventListener("click", checkClick);
				resolve(faceUpCardsArray);
			}, time);
		} else if (
			faceUpCardsArray.length === 2 &&
			faceUpCardsArray[0].getAttribute("data") ===
				faceUpCardsArray[1].getAttribute("data")
		) {
			faceUpCardsArray.splice(0, 1);
		}
	});
};

const compareTwoCards = (array: HTMLElement[]) => {
	return new Promise<void>((resolve) => {
		indexesToRemove.splice(0, 2);

		if (array[0].getAttribute("id") === array[1].getAttribute("id")) {
			array.forEach((card) => {
				changeClass(card, "become-transparent");
				setTimeout(() => {
					changeClass(card, "hidden");
				}, 100);
			});
			compareCardWithTarget(array, cardsArray);
		} else {
			array.forEach((card) => {
				changeClass(card, "rotate-card");
				changeClass(card, "rotate-card-again");

				setTimeout(() => {
					changeClass(card, "covered");
					card.classList.remove("active");
				}, 150);
				setTimeout(() => {
					changeClass(card, "rotate-card-again");
					card.style.transform = "scale(1)";
					card.classList.remove("cards-animation");
				}, 400);
			});
		}
		numberOfAttempts(faceUpCardsArray);
		array.splice(0, 2);

		if (cardsArray.length === 0) {
			titleAnimation(menuStart);
		}
		setTimeout(() => {
			if (cardsArray.length === 0) {
				winMechanics();
				resolve();
			}
		}, 250);
	});
};

const gameMechanics = async (e) => {
	if (isGameExited) return;

	const array = await revealTheCard(e.target, 500);
	await compareTwoCards(array);
};

const addRecord = () => {
	return new Promise<void>((resolve) => {
		const place = document.createElement("p");
		place.textContent = `${gameCounter.toString()}.`;
		placeSection.append(place);

		const result = document.createElement("p");
		result.classList.add("result");
		attemptsCounterArray.push(attemptsCounter.toString());
		sortedAttemptsArray.push(attemptsCounter.toString());
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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const endTheGame = async (time: number, time2: number) => {
	if (isGameExited) return;
	sectionGame.remove();

	congratsTitle = document.createElement("h1");
	congratsTitle.classList.add("congrats-title");
	mainContainer.append(congratsTitle);
	congratsTitle.innerText = "Gratulacje!";
	await delay(time);

	const actualResult: number = attemptsCounterArray.length;

	movesTitle = document.createElement("h1");
	movesTitle.classList.add("moves-title");
	mainContainer.append(movesTitle);
	movesTitle.innerText = `Zrobiłeś to w ${
		attemptsCounterArray[actualResult - 1]
	} ruchach!`;

	trophy = document.createElement("h1");
	trophy.classList.add("moves-title");
	trophy.classList.add("trophy");
	trophy.innerHTML = '<i class="fa-solid fa-trophy"></i>';

	sortedAttemptsArray.sort((a, b) => Number(a) - Number(b));

	switch (sortedAttemptsArray.indexOf(attemptsCounter.toString())) {
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
	mainContainer.append(trophy);
	await delay(time2);
};

const startNextGame = () => {
	return new Promise<void>((resolve) => {
		resetAttempsCounter();
		gameCounter++;
		congratsTitle.remove();
		movesTitle.remove();
		trophy.remove();
		resolve();
	});
};

const winMechanics = async () => {
	if (isGameExited) return;
	showBackButton(0, returnBtn);
	await addRecord();
	await endTheGame(2000, 3000);
	await startNextGame();
	addingEventListeners(newGameBtn, startNewGame);
	addingEventListeners(resultsBtn, showResult);
	await titleAnimation(menuStart);
	await hideButtons(0, buttons);
};

const showStatistics = () => {
	return new Promise<void>((resolve) => {
		returnBtn.removeEventListener("click", exitGame);
		setTimeout(() => {
			changeClass(resultsSection, "unvisible");
			changeClass(resultsSection, "become-opaque");
		}, 450);
		setTimeout(() => {
			returnBtn.addEventListener("click", exitGame);
		}, 600);
		renderResult(resultsArray);
		resolve();
	});
};

const showResult = async () => {
	removingEventListeners(resultsBtn, showResult);
	removingEventListeners(newGameBtn, startNewGame);
	await showStatistics();
	await titleAnimation(menuStart);
	await hideButtons(450, buttons);
	showBackButton(0, returnBtn);
};

const exitGame = () => {
	isGameExited = true;

	clearInterval(URLsArrayLength);

	if (document.getElementById("exist")) {
		idArray.splice(0, idArray.length);
		URLsArray.splice(0, URLsArray.length);
		cardsArray.splice(0, cardsArray.length);
		faceUpCardsArray.splice(0, faceUpCardsArray.length);
		sectionGame.remove();
	} else if (resultsSection.classList.contains("become-opaque")) {
		changeClass(resultsSection, "unvisible");
		changeClass(resultsSection, "become-opaque");
		addingEventListeners(resultsBtn, showResult);
		addingEventListeners(newGameBtn, startNewGame);
		titleAnimation(menuStart);
	}
	addingEventListeners(newGameBtn, startNewGame);
	addingEventListeners(resultsBtn, showResult);
	hideButtons(0, buttons);
	changeClass(returnBtn, "unvisible");
};

newGameBtn.addEventListener("click", startNewGame);
returnBtn.addEventListener("click", exitGame);
resultsBtn.addEventListener("click", showResult);
document.addEventListener("DOMContentLoaded", createdElements);
