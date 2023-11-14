let id;
let uniqueNumber = 0;
export const idArray = [];
export const URLsArray = [];
const apiURL = `http://shibe.online/api/shibes?count=[${id}]&httpsUrls=[true]`;
const swap = (array, a, b) => {
    const holder = array[a];
    array[a] = array[b];
    array[b] = holder;
};
export const fisherYatesShuffle = (array) => {
    for (let i = array.length - 1; i > 0; --i) {
        swap(array, i, Math.floor(Math.random() * (i + 1)));
    }
};
export const getUniqueNumberForEachCard = (card) => {
    for (let i = 0; i <= 0; i++) {
        card.setAttribute("data", `${uniqueNumber}`);
        uniqueNumber++;
    }
};
export const getDiffrentURLs = () => {
    while (idArray.length <= 5) {
        id = Math.floor(Math.random() * 100);
        if (!idArray.includes(id)) {
            idArray.push(id);
        }
        fetch(apiURL)
            .then((responseURL) => responseURL.json())
            .then((responseURL) => {
            URLsArray.push(responseURL[0]);
        });
    }
};
export const removeCardAnimation = (cardsArray, time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            cardsArray.forEach((card) => {
                card.style.transform = "scale(1)";
                card.classList.remove("cardAnimation");
                resolve();
            });
        }, time);
    });
};
