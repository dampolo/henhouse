


function getNestlingCount(animal) {
    const basisEgg = 30
    
    if (isTypeHen() && isTypeRooster()) {
        animal.nestling = Math.floor(animal.total_eggs / basisEgg);
        allNestlings();
        return animal.nestling;
    }
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
function isTypeHen(params) {
    return henHouse.allAnimals.some((ishen) => ishen.type === "hen");
}