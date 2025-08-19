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
    
    henHouse.allAnimals.forEach((animal, index) => {

        if(animal.type === 'hen'){
            allHens.innerHTML += creatAnimalHenHTML(animal, index);
            layEggs(animal);
            allNestlings();
            getNestlingCount(animal);
        } else if (animal.type === "rooster") {
            allRoosters.innerHTML += creatAnimalRoosterHTML(animal, index);
        } else {
            debugger
            allNestling.innerHTML += creatAnimalNestlingHTML(animal, index);
        }
    });
}
renderAnimals();


function addNewAnimal() {
    if(selectAnimal.value === "hen") {
        henHouse.allAnimals.push({
            name: "",
            current_eggs: 0,
            total_eggs: 0,
            laid_time: parseInt(timeInput.value),
            type: "hen",
            nestling: 0,
        });
    } else {
        allAnimals.push({
            name: animalInput.value,
            current_eggs: 0,
            total_eggs: 0,
            laid_time: 0,
            type: "rooster",
            nestling: 0,
        });
    }

    timeInput.value = "";
    animalInput.value = "";
    renderAnimals();
    allEggs();
    allHens();
    allRoosters();
}

function createNestlingObject() {
     henHouse.allAnimals.push({
            name: "Nestling",
            current_eggs: 0,
            total_eggs: 0,
            laid_time: "",
            type: "nestling",
            nestling: 0,
        });
}

function creatAnimalRoosterHTML(animal, index) {
    return /*html*/ `<li>Rooster ${animal.name} 
                    <button onclick="animalDied(${index})">DIED</button>
                    </li>`
}


function creatAnimalHenHTML(animal, index) {
  return /*html*/ `
    <li>
        <p>Hen ${animal.name} laid ${animal.current_eggs} eggs.</p>
        <p>Total: ${animal.total_eggs} eggs.</p>
        <div class="input-fileds">
            <input class="collect-some-eggs${index}" oninput="activeReactiveButtonSingleHen(${index})" name="number" type="number" min="1">
            <button onclick="addNewEggs(${index})" class="collect-eggs${index}" disabled>COLLECT EGGS</button>
            <button onclick="animalDied(${index})">DIED</button>
        </div>
    </li> `;
}


function creatAnimalNestlingHTML(animal, index) {
    return /*html*/ `<li>${animal.name} ${index}</li>`
}

function activeReactiveButtonSingleHen(index) {
    const collectedEggsInput = parseInt(document.querySelector(`.collect-some-eggs${index}`).value, 10) || 0;
    const activeReactiveButton = document.querySelector(`.collect-eggs${index}`);
    
    
    if(collectedEggsInput <= henHouse.allAnimals[index].current_eggs && collectedEggsInput !== 0 && collectedEggsInput > 0) {
        activeReactiveButton.disabled = false;
        collectEggsDirectlyFromHen(index)
        collectedEggsInput.value =''
    } else {
        activeReactiveButton.disabled = true;
    }
}


function collectEggsDirectlyFromHen(index) {
    const collectedEggs = document.querySelector('.collected-eggs');
    const collectedEggsInput = parseInt(document.querySelector(`.collect-some-eggs${index}`).value, 10) || 0;
    const currentTotalCollectedEggs = parseInt(collectedEggs.innerText, 10) || 0;
    collectedEggs.innerText = currentTotalCollectedEggs + collectedEggsInput;
}


function allEggs() {
    const allEggsArray = henHouse.allAnimals.reduce((accumulator, currentItem) => accumulator + currentItem.current_eggs, 0);
    document.querySelector('.all-laid-eggs').innerHTML = allEggsArray;
    henHouse.overview[1].all_laid_eggs = allEggsArray
    return allEggsArray;
}
allEggs()

function allHens() {
    const allhensArray = henHouse.allAnimals.filter((data) => data.type === 'hen');
    document.querySelector('.all-hens').innerHTML = allhensArray.length;
    henHouse.overview[2].all_hens = allhensArray.length
    return allhensArray.length;
}
allHens()


function allRoosters() {
    const allRoostersArray = henHouse.allAnimals.filter((data) => data.type === 'rooster');
    document.querySelector('.all-roosters').innerHTML = allRoostersArray.length;
    henHouse.overview[3].all_rosters = allRoostersArray.length
    return allRoostersArray.length;   
}
allRoosters()


function allNestlings() {
    const allNestling = henHouse.allAnimals.reduce((accumulator, currentItem) => accumulator + currentItem.nestling, 0);
    document.querySelector('.all-nestlings').innerHTML = allNestling;
    henHouse.overview[4].all_nestlings = allNestling
    return allNestling;
}
allNestlings()


function allRoosters() {
    const allRoostersArray = henHouse.allAnimals.filter((data) => data.type === 'rooster');
    document.querySelector('.all-roosters').innerHTML = allRoostersArray.length;
    henHouse.overview[3].all_rosters = allRoostersArray.length
    return allRoostersArray.length;   
}

function addNewEggs(index) {
    const amountOfEggs = document.querySelector(`.collect-some-eggs${index}`);
    henHouse.allAnimals[index].current_eggs -= parseInt(amountOfEggs.value);
    amountOfEggs.value = "";
    renderAnimals();
    allEggs();
    allHens();
    allRoosters();
}

function animalDied(index) {
    henHouse.overview[0].collected_eggs += henHouse.allAnimals[index].current_eggs;
    document.querySelector('.collected-eggs').innerText = henHouse.overview[0].collected_eggs;
    henHouse.allAnimals.splice(index, 1)
    renderAnimals();
    allHens();
    allRoosters();
    allEggs();
}


function collectAllEggs() {
    henHouse.overview[0].collected_eggs += henHouse.overview[1].all_laid_eggs;
    document.querySelector('.collected-eggs').innerText = henHouse.overview[0].collected_eggs;
    currentEggsToZero();
    activeReactiveButton();
}

function currentEggsToZero() {
    henHouse.allAnimals.forEach((animal) => animal.current_eggs = 0);
    renderAnimals();
    allEggs();
}

function collectEggs() {
    const collectedEggs = document.querySelector('.collected-eggs');

    const currentTotalCollectedEggs = henHouse.overview[0].collected_eggs;
    
    const collectedEggsInput = parseInt(document.querySelector('.number-of-eggs').value, 10) || 0;

    document.querySelector('.number-of-eggs').value = "";
    collectedEggs.innerText = currentTotalCollectedEggs + collectedEggsInput;
    reduceCurrentLaidEggs(collectedEggsInput);
}


function activeReactiveButton() {
    const collectAllEggs = document.querySelector('.collect-eggs');
    const currendLaidEggs = henHouse.overview[1].all_laid_eggs;
    const collectedEggsInput = parseInt(document.querySelector('.number-of-eggs').value, 10) || 0;
    if (parseInt(currendLaidEggs) > collectedEggsInput  && collectedEggsInput > 0) {
        collectAllEggs.disabled = false;
    } else {
        collectAllEggs.disabled = true;
    }
}


function reduceCurrentLaidEggs(collectedEggsInput) {
    const allLaidEggs = document.querySelector('.all-laid-eggs')
    const currentTotalLaidEggs = henHouse.overview[1].all_laid_eggs;
    allLaidEggs.innerText = currentTotalLaidEggs - collectedEggsInput;
    henHouse.overview[0].collected_eggs += collectedEggsInput;
    henHouse.overview[1].all_laid_eggs -= collectedEggsInput;
}


function layEggs(animal) {

    if(animal.layingInterval) return

    animal.layingInterval = setInterval(() => {
        animal.current_eggs += 5;
        animal.total_eggs += 5;
        document.querySelector('.all-laid-eggs').innerHTML = allEggs();
        renderAnimals()
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