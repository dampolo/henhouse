
import getRandomName from "./random-name.js";
import henHouse from "./data.js";
import { createAnimalHenElement, createAnimalRoosterElement, createAnimalNestlingElement  } from "./templates.js";

const selectAnimal = document.getElementById("animals");
const animalInput = document.querySelector(".name-new-hen");
const timeInput = document.querySelector(".time-new-hen");
export let isBreak = false;

export function breakHenHouse() {
  isBreak = !isBreak  
   document.querySelector(".break").classList.toggle("is-break")
}

selectAnimal.addEventListener("change", () => {
  if (selectAnimal.value === "rooster") {
    timeInput.disabled = true;
    timeInput.value = ""; // optional: clear value
  } else {
    timeInput.disabled = false;
  }
});


export function renderAnimals() {
  henHouse.allAnimals.forEach((animal) => {
    if (animal.type === "hen") {
      createAnimalHenElement(animal);
      layEggs(animal);
    } else {
      createAnimalRoosterElement(animal)
    }
  });
}
renderAnimals();


export function addNewAnimal() {
  let newAnimal;

  if (selectAnimal.value === "hen") {
    newAnimal = {
      name: animalInput.value,
      current_eggs: 0,
      total_eggs: 0,
      laid_time: parseInt(timeInput.value * 1000),
      type: "hen",
      nestling: 0,
    };
  } else {
    newAnimal = {
      name: animalInput.value,
      current_eggs: 0,
      total_eggs: 0,
      laid_time: 0,
      type: "rooster",
      nestling: 0,
    };
  }

  henHouse.allAnimals.push(newAnimal);

  // Append to the DOM list
  const allHensList = document.querySelector(".amount-of-all-hens");
  const allRoostersList = document.querySelector(".amount-of-all-roosters");

  if (newAnimal.type === "hen") {
    allHensList.appendChild(
      createAnimalHenElement(newAnimal, henHouse.allAnimals.length - 1));
      layEggs(newAnimal)
  } else if (newAnimal.type === "rooster") {
    allRoostersList.appendChild(
      createAnimalRoosterElement(newAnimal, henHouse.allAnimals.length - 1)
    );
  }

  timeInput.value = "";
  animalInput.value = "";
  allEggs();
  allHens();
  allRoosters();
}


export function collectEggsDirectlyFromHen(li, animal, input, collectBtn) {
  const value = parseInt(input.value, 10);

  if (isNaN(value) || value <= 0) {
    return; // invalid input, do nothing
  }

  // Update state
  animal.current_eggs -= value;
  henHouse.statistics[0].collected_eggs += value;

  // Update global collected eggs display
  const collectedEggsEl = document.querySelector(".collected-eggs");
  if (collectedEggsEl) {
    collectedEggsEl.innerText = henHouse.statistics[0].collected_eggs;
  }

  // Update DOM just for this animal
  const paragraphs = li.querySelectorAll("p");
  if (paragraphs[0]) {
    paragraphs[0].textContent = `Hen ${animal.name} laid ${animal.current_eggs} eggs.`;
  }

  // Reset input + disable button
  input.value = "";
  collectBtn.disabled = true;

  // Update global UI
  allEggs();
}


export function allEggs() {
  const allEggsArray = henHouse.allAnimals.reduce(
    (accumulator, currentItem) => accumulator + currentItem.current_eggs,
    0
  );
  document.querySelector(".all-laid-eggs").innerHTML = allEggsArray;
  henHouse.statistics[1].all_laid_eggs = allEggsArray;
  return allEggsArray;
}
allEggs();


export function allHens() {
  const allhensArray = henHouse.allAnimals.filter(
    (data) => data.type === "hen"
  );
  document.querySelector(".all-hens").innerHTML = allhensArray.length;
  henHouse.statistics[2].all_hens = allhensArray.length;
  return allhensArray.length;
}
allHens();


export function allRoosters() {
  const allRoostersArray = henHouse.allAnimals.filter(
    (data) => data.type === "rooster"
  );
  document.querySelector(".all-roosters").innerHTML = allRoostersArray.length;
  henHouse.statistics[3].all_rosters = allRoostersArray.length;
  return allRoostersArray.length;
}
allRoosters();


export function allNestlings() {
  const allNestling = henHouse.allAnimals.reduce(
    (accumulator, currentItem) => accumulator + currentItem.nestling,
    0
  );
  document.querySelector(".all-nestlings").innerHTML = allNestling;
  henHouse.statistics[4].all_nestlings = allNestling;
  return allNestling;
}


export function getAllDiedAnimals(animal) {
  if(animal.type === "hen") {
    henHouse.statistics[5].all_died_hens += 1;
    document.querySelector(".died-hens").innerText = henHouse.statistics[5].all_died_hens;
  } else {
    henHouse.statistics[6].all_died_roosters += 1;
    document.querySelector(".died-roosters").innerText = henHouse.statistics[6].all_died_roosters;
  }
}


export function addNewEggs(index) {
  const amountOfEggs = document.querySelector(`.collect-some-eggs${index}`);
  henHouse.allAnimals[index].current_eggs -= parseInt(amountOfEggs.value);

  const animal = henHouse.allAnimals[index];

  amountOfEggs.value = "";
  // Update the DOM for this animal only
  const li = amountOfEggs.closest("li");
  const paragraphs = li.querySelectorAll("p");
  paragraphs[0].textContent = `Hen ${animal.name} laid ${animal.current_eggs} eggs.`;
  paragraphs[1].textContent = `Total: ${animal.total_eggs} eggs.`;
  allEggs();
}


export function animalDied(li, animal) {
  henHouse.statistics[0].collected_eggs += animal.current_eggs;
  document.querySelector(".collected-eggs").innerText = henHouse.statistics[0].collected_eggs;
  // Remove from array (find by object reference instead of index)  
  henHouse.allAnimals = henHouse.allAnimals.filter(a => a !== animal);
  // Remove DOM element directly
  getAllDiedAnimals(animal);
  li.remove();

  allHens();
  allRoosters();
  allEggs();
}


export function collectAllEggs() {
  henHouse.statistics[0].collected_eggs += henHouse.statistics[1].all_laid_eggs;
  document.querySelector(".collected-eggs").innerText = henHouse.statistics[0].collected_eggs;
  currentEggsToZero();
  activeReactiveButton();
}

export function currentEggsToZero() {
  henHouse.allAnimals.forEach((animal) => (animal.current_eggs = 0));
  allEggs();
}


export function collectEggs() {
  const collectedEggs = document.querySelector(".collected-eggs");

  const currentTotalCollectedEggs = henHouse.statistics[0].collected_eggs;

  const collectedEggsInput =
    parseInt(document.querySelector(".number-of-eggs").value, 10) || 0;

  document.querySelector(".number-of-eggs").value = "";
  collectedEggs.innerText = currentTotalCollectedEggs + collectedEggsInput;
  reduceCurrentLaidEggs(collectedEggsInput);
}


export function activeReactiveButton() {
  const collectAllEggs = document.querySelector(".collect-eggs");
  const currendLaidEggs = henHouse.statistics[1].all_laid_eggs;
  const collectedEggsInput =
    parseInt(document.querySelector(".number-of-eggs").value, 10) || 0;
  if (
    parseInt(currendLaidEggs) > collectedEggsInput &&
    collectedEggsInput > 0
  ) {
    collectAllEggs.disabled = false;
  } else {
    collectAllEggs.disabled = true;
  }
}


export function reduceCurrentLaidEggs(collectedEggsInput) {
  const allLaidEggs = document.querySelector(".all-laid-eggs");
  const currentTotalLaidEggs = henHouse.statistics[1].all_laid_eggs;
  allLaidEggs.innerText = currentTotalLaidEggs - collectedEggsInput;
  henHouse.statistics[0].collected_eggs += collectedEggsInput;
  henHouse.statistics[1].all_laid_eggs -= collectedEggsInput;
}


export function layEggs(animal) {

    if (animal.layingInterval) return;

        animal.layingInterval = setInterval(() => {

        if(!isBreak) {

            animal.current_eggs += 5;
            animal.total_eggs += 5;

            // Update this hen’s DOM only
            if (animal.element) {
                const paragraphs = animal.element.querySelectorAll("p");
                if (paragraphs[0]) {
                paragraphs[0].textContent = `Hen ${animal.name} laid ${animal.current_eggs} eggs.`;
                }
                if (paragraphs[1]) {
                    paragraphs[1].textContent = `Total: ${animal.total_eggs} eggs.`;
                }
            }
            
            document.querySelector(".all-laid-eggs").innerHTML = allEggs();
            getNestlingCount(animal);
            allNestlings();
        }

    }, animal.laid_time);
}


function getNestlingCount(animal) {
  const basisEgg = 30;
  const getNestingSingleHen = animal.nestling;
  if (isTypeHen() && isTypeRooster()) {
    animal.nestling = Math.floor(animal.total_eggs / basisEgg);
  }

  if (animal.nestling > getNestingSingleHen && !isBreak) {
    createNestlingObject();
  }
  return animal.nestling;
}

/**
 * Checks if there is at least one rooster in the henHouse.
 *
 * @param {*} params - Currently unused, placeholder for potential future parameters.
 * @returns {boolean} True if at least one animal in henHouse has type "rooster", otherwise false.
 */
function isTypeRooster(params) {
  return henHouse.allAnimals.some((isrooster) => isrooster.type === "rooster");
}

/**
 * Checks if there is at least one hen in the henHouse.
 *
 * @param {*} params - Currently unused, placeholder for potential future parameters.
 * @returns {boolean} True if at least one animal in henHouse has type "rooster", otherwise false.
 */
function isTypeHen() {
  return henHouse.allAnimals.some((ishen) => ishen.type === "hen");
}


export function createNestlingObject() {
  const allNestlingsList = document.querySelector(".amount-of-all-nestlings");

  // Derive number from current length of allAnimals array
  const nestlingNumber = henHouse.statistics[4].all_nestlings + 1;
  // Create nestling and push to array
  const nestling = {
    name: `Nestling #${nestlingNumber}`,
    current_eggs: 0,
    total_eggs: 0,
    laid_time: 0,
    type: "nestling",
    nestling: 0,
  };
  henHouse.allAnimals.push(nestling);

  // Create nestling element and keep reference
  const nestlingElement = createAnimalNestlingElement(
    nestling,
    henHouse.allAnimals.length - 1
  );
  allNestlingsList.appendChild(nestlingElement);
  getRandomName(nestling, nestlingElement)
}


// TEST Funktion
// document.querySelector('.collect-eggs').addEventListener('click', () => {
//     let totalElem = document.querySelector('.collected-eggs');
//     let currentTotal = parseInt(totalElem.innerText, 10) || 0;
//     let collectedEggsInput = parseInt(document.querySelector('.number-of-eggs').value, 10) || 0;
//     totalElem.innerHTML = currentTotal + collectedEggsInput
//     document.querySelector('.number-of-eggs').value = "";
// })
