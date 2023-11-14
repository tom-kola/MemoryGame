import { changeClass } from "../app.js";

export const titleAnimation = (menu: HTMLElement) => {
	return new Promise<void>((resolve) => {
		changeClass(menu, "titleAnimation");
		resolve();
	});
};

export const hideButtons = (time: number, buttons: HTMLElement) => {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			changeClass(buttons, "becomeTransparent");
			changeClass(buttons, "hidden");
			resolve();
		}, time);
	});
};

export const showBackButton = (time: number, returnBtn: HTMLElement) => {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			changeClass(returnBtn, "unvisible");
			resolve();
		}, time);
	});
};
