import { isBreak, layEggs, allHens, allRoosters } from "./main.js";
import { createAnimalHenElement, createAnimalRoosterElement } from "./templates.js";
import API_URL from "./config.js";

export default function getRandomName(nestling, nestlingElement) {
  const allHensList = document.querySelector(".amount-of-all-hens");
  const allRoostersList = document.querySelector(".amount-of-all-roosters");
    // After 20 seconds, turn it into a hen or rooster
  setTimeout(async () => {
    if (!isBreak) {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          console.error("Could not fetch animal:", res.status);
          return;
        }

        const henData = await res.json();
        const name = henData.results[0].name.first;
        const animalType =
          henData.results[0].gender === "female" ? "hen" : "rooster";

        // random time between 5s and 20s (in ms)
        const randomLaidTime = Math.floor(
          Math.random() * (20000 - 5000) + 5000
        );

        // Update the existing nestling object
        nestling.name = name;
        nestling.type = animalType;
        nestling.laid_time = randomLaidTime;

        // Remove nestling element from DOM
        nestlingElement.remove();

        if (nestling.type === "hen") {
          allHensList.appendChild(createAnimalHenElement(nestling));
          layEggs(nestling);
        } else {
          allRoostersList.appendChild(createAnimalRoosterElement(nestling));
        }

        allHens();
        allRoosters();
      } catch (err) {
        console.error("Error updating nestling:", err);
      }
    }
  }, 20000); // 20 seconds
}