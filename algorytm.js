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

function createNestlingObject() {
  const allHensList = document.querySelector(".amount-of-all-hens");
  const allRoostersList = document.querySelector(".amount-of-all-roosters");
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
