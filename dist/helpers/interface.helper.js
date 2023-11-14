import { changeClass } from "../app.js";
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
