let id: number;
let uniqueNumber: number = 0;

export const idArray: number[] = [];
export const URLsArray: URL[] = [];

const apiURL: string = `https://shibe.online/api/shibes?count=[${id}]&httpsUrls=[true]`;

const swap = (array: HTMLElement[], a: number, b: number) => {
	const holder = array[a];
	array[a] = array[b];
	array[b] = holder;
};
export const fisherYatesShuffle = (array: HTMLElement[]): void => {
	for (let i = array.length - 1; i > 0; --i) {
		swap(array, i, Math.floor(Math.random() * (i + 1)));
	}
};
export const getUniqueNumberForEachCard = (card: HTMLElement) => {
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
export const removeCardAnimation = (cardsArray: HTMLElement[], time:number) => {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			cardsArray.forEach((card: HTMLElement) => {
				card.style.transform = "scale(1)";
				card.classList.remove("cardAnimation");
				resolve();
			});
		}, time);
	});
};
