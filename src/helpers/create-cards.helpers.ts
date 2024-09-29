let id: number;
let uniqueNumber: number = 0;
let pageNumber: number;
let apiURL: string;

export const idArray: number[] = [];
export const URLsArray: string[] = [];

const options = {
	method: "GET",
	headers: {
		"User-Agent": "Memory Game (kontakt@tomkola.pl)",
	},
};

const getRandomPageNumber = () => {
	pageNumber = Math.floor(Math.random() * 10);
	apiURL = `https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&page=${pageNumber}&limit=100&fields=id,title,image_id`;
};

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
	getRandomPageNumber();
	while (idArray.length <= 5) {
		id = Math.floor(Math.random() * 100);
		if (!idArray.includes(id)) {
			idArray.push(id);
		}
	}
	idArray.forEach((element) => {
		fetch(apiURL, options)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else if (response.status === 403 || 404) {
					console.log("Wystąpił błąd");
					URLsArray.push("./images/undefinedpicture2.jpg");
				}
			})
			.then((responseURL) => {
				URLsArray.push(
					`${responseURL.config.iiif_url}/${responseURL.data[element].image_id}/full/843,/0/default.jpg`
				);
		 
			})
			.catch(() => console.log("Wystąpił błąd"));
	});
};

export const removeCardAnimation = (
	cardsArray: HTMLElement[],
	time: number
) => {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			cardsArray.forEach((card: HTMLElement) => {
				card.style.transform = "scale(1)";
				card.classList.remove("cards-animation");
				resolve();
			});
		}, time);
	});
};
