


function getNestlingCount(animal) {
    const basisEgg = 30
    const getNestingSingleHen = animal.nestling
    if (isTypeHen() && isTypeRooster()) {
        animal.nestling = Math.floor(animal.total_eggs / basisEgg);
    }
    
    if (animal.nestling > getNestingSingleHen){ 
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
    return henHouse.allAnimals.some((isrooster) => isrooster.type === "rooster")   
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
async function getHenName() {
  const url = `${API_URL}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const henName = await res.json();
    console.log(henName.results[0].name.first);
    console.log(henName.results[0].gender);


    
    // return task
  } catch (error) {
    console.error("Error fetching data:", error);
    return { status: "error", message: error.message };
  }
}

getHenName()

