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

const menu: HTMLElement = document.querySelector(".menu");
const buttons: HTMLElement = document.querySelector(".buttons");
const newGameBtn: HTMLButtonElement = document.querySelector("#newGame");
const returnBtn: HTMLElement = document.querySelector("#return");
const resultsBtn: HTMLButtonElement = document.querySelector("#results");
const wrapper: HTMLElement = document.querySelector(".wrapper");
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

let card: HTMLElement;
let sectionGame: HTMLElement;
let congratsTitle: HTMLHeadingElement;
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
	congratsTitle = document.querySelector(".congratsTitle");
};

const prepareDOMEvents = () => {
	document.addEventListener("click", checkClick);
};

const checkClick = (e) => {
	testNumber = `${e.target.getAttribute("data")}`;
	if (e.target.classList.contains("card")) {
		if (
			e.target.getAttribute("data") === testNumber &&
			!e.target.classList.contains("active")
		) {
			e.target.classList.add("active");
			gameMachanics(e);
		} else if (e.target.classList.contains("active")) {
			e.target.removeEventListener("click", checkClick);
		}
	}
};
export const changeClass = (element: HTMLElement, className: string) => {
	element.classList.toggle(className);
};

const createNewCards = (time: number) => {
	return new Promise<void>((resolve) => {
		sectionGame = document.createElement("section");
		sectionGame.setAttribute("id", "exist");
		sectionGame.classList.add("game");
		wrapper.append(sectionGame);

		for (let i = 0; i <= 1; i++) {
			for (let i = 0; i <= 5; i++) {
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

const startNewGame = async () => {
	getDiffrentURLs();
	removingEventListeners(newGameBtn, startNewGame);
	removingEventListeners(resultsBtn, showResult);
	await titleAnimation(menu);
	await hideButtons(1000, buttons);
	await showBackButton(200, returnBtn);
	await createNewCards(500);
	await removeCardAnimation(cardsArray, 1000);
};

const revealTheCard = (card: HTMLElement, time: number) => {
	return new Promise<HTMLElement[]>((resolve) => {
		changeClass(card, "rotateCard");
		setTimeout(() => {
			changeClass(card, "covered");
		}, 500);
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
				changeClass(card, "becomeTransparent");
				setTimeout(() => {
					changeClass(card, "hidden");
				}, 500);
			});
			compareCardWithTarget(array, cardsArray);
		} else {
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

const endTheGame = (time: number, time2: number) => {
	return new Promise<void>((resolve) => {
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

		const actualResult: number = attemptsCounterArray.length;

		sortedAttemptsArray.sort();

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
		setTimeout(() => {
			wrapper.append(trophy);
			congratsTitle.innerText = `Zrobiłeś to w ${
				attemptsCounterArray[actualResult - 1]
			} ruchach!`;
		}, time2);

		resolve();
	});
};

const startNextGame = (time: number) => {
	return new Promise<void>((resolve) => {
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
const gameMachanics = async (e) => {
	const array = await revealTheCard(e.target, 1100);
	await compareTwoCards(array);
	await addRecord();
	await endTheGame(500, 2000);
	await startNextGame(5000);
	addingEventListeners(newGameBtn, startNewGame);
	addingEventListeners(resultsBtn, showResult);
	setTimeout(async () => {
		await titleAnimation(menu);
	}, 5000);
	await showBackButton(0, returnBtn);
	await hideButtons(5000, buttons);
};

const showStatistics = () => {
	return new Promise<void>((resolve) => {
		returnBtn.removeEventListener("click", exitGame);
		setTimeout(() => {
			changeClass(resultsSection, "unvisible");
			changeClass(resultsSection, "becomeOpaque");
		}, 400);
		setTimeout(() => {
			returnBtn.addEventListener("click", exitGame);
		}, 600);
		renderResult(resultsArray);
		console.log("Tworzę klasyfikację");
		resolve();
	});
};

const showResult = async () => {
	removingEventListeners(resultsBtn, showResult);
	removingEventListeners(newGameBtn, startNewGame);
	await titleAnimation(menu);
	await hideButtons(1000, buttons);
	await showBackButton(0, returnBtn);
	await showStatistics();
};

const exitGame = () => {
	if (document.getElementById("exist")) {
		idArray.splice(0, 6);
		URLsArray.splice(0, 6);
		cardsArray.splice(0, 12);
		faceUpCardsArray.splice(0, 2);
		sectionGame.remove();
		addingEventListeners(newGameBtn, startNewGame);
		addingEventListeners(resultsBtn, showResult);
	} else if (resultsSection.classList.contains("becomeOpaque")) {
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
