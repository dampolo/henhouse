


function getNestlingCount(animal) {
    const basisEgg = 30
    animal.nestling = Math.floor(animal.total_eggs / basisEgg);
    allNestlings()
    return animal.nestling;
}
