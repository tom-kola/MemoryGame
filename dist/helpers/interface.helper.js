import { changeClass } from "../app.js";
export const removingEventListeners = (element, listener) => {
    if (!element.classList.contains("active")) {
        element.classList.add("active");
        element.removeEventListener("click", listener);
    }
};
export const addingEventListeners = (element, listener) => {
    if (element.classList.contains("active")) {
        element.classList.remove("active");
        element.addEventListener("click", listener);
    }
};
export const titleAnimation = (menu) => {
    return new Promise((resolve) => {
        changeClass(menu, "titleAnimation");
        resolve();
    });
};
export const hideButtons = (time, buttons) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            changeClass(buttons, "becomeTransparent");
            changeClass(buttons, "hidden");
            resolve();
        }, time);
    });
};
export const showBackButton = (time, returnBtn) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            changeClass(returnBtn, "unvisible");
            resolve();
        }, time);
    });
};
