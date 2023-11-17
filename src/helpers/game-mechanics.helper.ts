let index: number;
export let attemptsCounter: number = 0;

export const indexesToRemove: number[] = [];
export const attemptsCounterArray: string[] = [];

export const compareCardWithTarget = (
	array: HTMLElement[],
	cardsArray: HTMLElement[]
) => {
	for (let i = 0; i < cardsArray.length; i++) {
		if (
			array[0].getAttribute("id") === cardsArray[i].getAttribute("id") &&
			array[1].getAttribute("id") === cardsArray[i].getAttribute("id")
		) {
			index = cardsArray.indexOf(cardsArray[i]);
			indexesToRemove.push(index);
		}
	}
	cardsArray.splice(indexesToRemove[1], 1);
	cardsArray.splice(indexesToRemove[0], 1);
	indexesToRemove.splice(0, 2);
};
export const numberOfAttempts = (faceUpCardsArray: HTMLElement[]) => {
	if (faceUpCardsArray.length === 2) {
		attemptsCounter++;
	}
};
export const resetAttempsCounter = () => {
	attemptsCounter = 0;
};
export const renderResult = (resultsArray: HTMLElement[]) => {
	if (attemptsCounterArray.length > 0) {
		for (let i = 0; i < attemptsCounterArray.length; i++) {
			attemptsCounterArray.sort();
			resultsArray[i].innerText = attemptsCounterArray[i];
		}
	}
};
