


function nestlingCheck(animal) {
    // if the hen has 30eggs the nestling will born
    const basisEgg = 30
    // allNestlings show how many nestling has the hen
    const allNestlings = animal.nestling;
    // IF you have 59 eggs this variable turn back 1, you need to check if hen has already nestling
    const hasAlreadyNestling = Math.floor(animal.total_eggs / basisEgg)
   
    if (animal.total_eggs >= 30) {
        if(hasAlreadyNestling !== allNestlings) {
            animal.nestling += 1;
        }
    }
}
