import { breakHenHouse, collectAllEggs, collectEggs } from "./script";

export default function attachedEvents() {
    document.querySelector(".break-btn").addEventListener("click", () => breakHenHouse());
    document.querySelector(".collect-some-eggs-main-button").addEventListener("click", () => collectEggs());
    document.querySelector(".collect-all-eggs").addEventListener("click", () => collectAllEggs());
}
