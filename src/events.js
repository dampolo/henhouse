import { breakHenHouse, collectAllEggs } from "./script";

export default function attachedEvents() {
    document.querySelector(".break-btn").addEventListener("click", () => breakHenHouse());
    document.querySelector(".collect-all-eggs").addEventListener("click", () => collectAllEggs())
}
