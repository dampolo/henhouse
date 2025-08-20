

function getNestlingCount(animal) {
  const basisEgg = 30;
  const getNestingSingleHen = animal.nestling;
  if (isTypeHen() && isTypeRooster()) {
    animal.nestling = Math.floor(animal.total_eggs / basisEgg);
  }

  if (animal.nestling > getNestingSingleHen) {
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
  // Create nestling and push to array
  const nestling = {
    name: "Nestling",
    current_eggs: 0,
    total_eggs: 0,
    laid_time: 0,
    type: "nestling",
    nestling: 0,
  };

  henHouse.allAnimals.push(nestling);

  // After 20 seconds, turn it into a hen or rooster
  setTimeout(async () => {
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
      const randomLaidTime = Math.floor(Math.random() * (20000 - 5000) + 5000);

      // Update the existing nestling object
      nestling.name = name;
      nestling.type = animalType;
      nestling.laid_time = randomLaidTime;
      allHens();
      allRoosters();
    } catch (err) {
      console.error("Error updating nestling:", err);
    }
  }, 20000); // 20 seconds
}
