import { changeClass } from "../app.js";

export const removingEventListeners = (element: HTMLElement, listener: any) => {
	if (!element.classList.contains("active")) {
		element.classList.add("active");
		element.removeEventListener("click", listener);
	}
};
export const addingEventListeners = (element: HTMLElement, listener: any) => {
	if (element.classList.contains("active")) {
		element.classList.remove("active");
		element.addEventListener("click", listener);
	}
};

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
