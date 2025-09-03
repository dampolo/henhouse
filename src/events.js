import { activeReactiveButton, addNewAnimal, breakHenHouse, collectAllEggs, collectEggs } from "./script";

export default function attachedEvents() {
    document.querySelector(".break-btn").addEventListener("click", () => breakHenHouse());
    document.querySelector(".collect-some-eggs-main-button").addEventListener("click", () => collectEggs());
    document.querySelector(".collect-all-eggs").addEventListener("click", () => collectAllEggs());
    document.querySelector(".number-of-eggs").addEventListener("input", () => activeReactiveButton());
    document.querySelector(".add-new-animal").addEventListener("submit", (event) => {
        event.preventDefault();
        addNewAnimal();
    })
}
