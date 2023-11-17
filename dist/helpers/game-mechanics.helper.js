let index;
export let attemptsCounter = 0;
export const indexesToRemove = [];
export const attemptsCounterArray = [];
export const compareCardWithTarget = (array, cardsArray) => {
    for (let i = 0; i < cardsArray.length; i++) {
        if (array[0].getAttribute("id") === cardsArray[i].getAttribute("id") &&
            array[1].getAttribute("id") === cardsArray[i].getAttribute("id")) {
            index = cardsArray.indexOf(cardsArray[i]);
            indexesToRemove.push(index);
        }
    }
    cardsArray.splice(indexesToRemove[1], 1);
    cardsArray.splice(indexesToRemove[0], 1);
    indexesToRemove.splice(0, 2);
};
export const numberOfAttempts = (faceUpCardsArray) => {
    if (faceUpCardsArray.length === 2) {
        attemptsCounter++;
    }
};
export const resetAttempsCounter = () => {
    attemptsCounter = 0;
};
export const renderResult = (resultsArray) => {
    if (attemptsCounterArray.length > 0) {
        for (let i = 0; i < attemptsCounterArray.length; i++) {
            attemptsCounterArray.sort();
            resultsArray[i].innerText = attemptsCounterArray[i];
        }
    }
};
