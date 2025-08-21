const selectAnimal = document.getElementById("animals");
const animalInput = document.querySelector(".name-new-hen");
const timeInput = document.querySelector(".time-new-hen");

selectAnimal.addEventListener("change", () => {
  if (selectAnimal.value === "rooster") {
    timeInput.disabled = true;
    timeInput.value = ""; // optional: clear value
  } else {
    timeInput.disabled = false;
  }
});

function renderAnimals() {
  const allHens = document.querySelector(".amount-of-all-hens");
  const allRoosters = document.querySelector(".amount-of-all-roosters");
  const allNestling = document.querySelector(".amount-of-all-nestlings");

  allHens.innerHTML = "";
  allRoosters.innerHTML = "";
  allNestling.innerHTML = "";

  henHouse.allAnimals.forEach((animal) => {
    if (animal.type === "hen") {
      allHens.appendChild(createAnimalHenElement(animal));
      layEggs(animal);
    } else if (animal.type === "rooster") {
      allRoosters.appendChild(createAnimalRoosterElement(animal));
    } else {
      allNestling.appendChild(createAnimalNestlingElement(animal));
    }
  });
}

renderAnimals();

function addNewAnimal() {
  let newAnimal;

  if (selectAnimal.value === "hen") {
    newAnimal = {
      name: animalInput.value,
      current_eggs: 0,
      total_eggs: 0,
      laid_time: parseInt(timeInput.value),
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
      createAnimalHenElement(newAnimal, henHouse.allAnimals.length - 1)
    );
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

function collectEggsDirectlyFromHen(li, animal, input, collectBtn) {
  const value = parseInt(input.value, 10);

  if (isNaN(value) || value <= 0) {
    return; // invalid input, do nothing
  }

  // Update state
  animal.current_eggs -= value;
  henHouse.overview[0].collected_eggs += value;

  // Update global collected eggs display
  const collectedEggsEl = document.querySelector(".collected-eggs");
  if (collectedEggsEl) {
    collectedEggsEl.innerText = henHouse.overview[0].collected_eggs;
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
function allEggs() {
  const allEggsArray = henHouse.allAnimals.reduce(
    (accumulator, currentItem) => accumulator + currentItem.current_eggs,
    0
  );
  document.querySelector(".all-laid-eggs").innerHTML = allEggsArray;
  henHouse.overview[1].all_laid_eggs = allEggsArray;
  return allEggsArray;
}
allEggs();



function allHens() {
  const allhensArray = henHouse.allAnimals.filter(
    (data) => data.type === "hen"
  );
  document.querySelector(".all-hens").innerHTML = allhensArray.length;
  henHouse.overview[2].all_hens = allhensArray.length;
  return allhensArray.length;
}
allHens();

function allRoosters() {
  const allRoostersArray = henHouse.allAnimals.filter(
    (data) => data.type === "rooster"
  );
  document.querySelector(".all-roosters").innerHTML = allRoostersArray.length;
  henHouse.overview[3].all_rosters = allRoostersArray.length;
  return allRoostersArray.length;
}
allRoosters();

function allNestlings() {
  const allNestling = henHouse.allAnimals.reduce(
    (accumulator, currentItem) => accumulator + currentItem.nestling,
    0
  );
  document.querySelector(".all-nestlings").innerHTML = allNestling;
  henHouse.overview[4].all_nestlings = allNestling;
  return allNestling;
}

function allRoosters() {
  const allRoostersArray = henHouse.allAnimals.filter(
    (data) => data.type === "rooster"
  );
  document.querySelector(".all-roosters").innerHTML = allRoostersArray.length;
  henHouse.overview[3].all_rosters = allRoostersArray.length;
  return allRoostersArray.length;
}

function addNewEggs(index) {
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

function animalDied(li, animal) {
  henHouse.overview[0].collected_eggs += animal.current_eggs;
  document.querySelector(".collected-eggs").innerText = henHouse.overview[0].collected_eggs;
  // Remove from array (find by object reference instead of index)
  henHouse.allAnimals = henHouse.allAnimals.filter(a => a !== animal);

  // Remove DOM element directly
  li.remove();

  allHens();
  allRoosters();
  allEggs();
}

function collectAllEggs() {
  henHouse.overview[0].collected_eggs += henHouse.overview[1].all_laid_eggs;
  document.querySelector(".collected-eggs").innerText =
    henHouse.overview[0].collected_eggs;
  currentEggsToZero();
  activeReactiveButton();
}

function currentEggsToZero() {
  henHouse.allAnimals.forEach((animal) => (animal.current_eggs = 0));
  renderAnimals();
  allEggs();
}

function collectEggs() {
  const collectedEggs = document.querySelector(".collected-eggs");

  const currentTotalCollectedEggs = henHouse.overview[0].collected_eggs;

  const collectedEggsInput =
    parseInt(document.querySelector(".number-of-eggs").value, 10) || 0;

  document.querySelector(".number-of-eggs").value = "";
  collectedEggs.innerText = currentTotalCollectedEggs + collectedEggsInput;
  reduceCurrentLaidEggs(collectedEggsInput);
}

function activeReactiveButton() {
  const collectAllEggs = document.querySelector(".collect-eggs");
  const currendLaidEggs = henHouse.overview[1].all_laid_eggs;
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

function reduceCurrentLaidEggs(collectedEggsInput) {
  const allLaidEggs = document.querySelector(".all-laid-eggs");
  const currentTotalLaidEggs = henHouse.overview[1].all_laid_eggs;
  allLaidEggs.innerText = currentTotalLaidEggs - collectedEggsInput;
  henHouse.overview[0].collected_eggs += collectedEggsInput;
  henHouse.overview[1].all_laid_eggs -= collectedEggsInput;
}

function layEggs(animal) {
  if (animal.layingInterval) return;

  animal.layingInterval = setInterval(() => {
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

  }, animal.laid_time);
}

// TEST Funktion
// document.querySelector('.collect-eggs').addEventListener('click', () => {
//     let totalElem = document.querySelector('.collected-eggs');
//     let currentTotal = parseInt(totalElem.innerText, 10) || 0;
//     let collectedEggsInput = parseInt(document.querySelector('.number-of-eggs').value, 10) || 0;
//     totalElem.innerHTML = currentTotal + collectedEggsInput
//     document.querySelector('.number-of-eggs').value = "";
// })
