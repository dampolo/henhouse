const selectAnimal = document.getElementById("animals");
const animalInput = document.querySelector(".name-new-hen");
const eggsInput = document.querySelector(".eggs-new-hen");
document.querySelector('.all-eggs').innerHTML = allEggs();
document.querySelector('.all-hens').innerHTML = allHens();
document.querySelector('.all-roosters').innerHTML = allRoosters();



selectAnimal.addEventListener("change", () => {
  if (selectAnimal.value === "rooster") {
    eggsInput.disabled = true;
    eggsInput.value = ""; // optional: clear value
  } else {
    eggsInput.disabled = false;
  }
});


function renderAnimals() {
    const allHens = document.querySelector(".amount-of-all-hens");
    const allRoosters = document.querySelector(".amount-of-all-roosters");

    allHens.innerHTML = "";
    allRoosters.innerHTML = "";

    jsonData.forEach((animal, index) => {
        if(animal.type === 'hen'){
            allHens.innerHTML += creatAnimalHenHTML(animal, index);
        } else {
            allRoosters.innerHTML += creatAnimalRoosterHTML(animal, index)
        }
    });
}


function addNewAnimal() {
    if(selectAnimal.value === "hen") {
        jsonData.push({
            name: animalInput.value,
            eggs: parseInt(eggsInput.value),
            type: "hen",
        });
    } else {
        jsonData.push({
            name: animalInput.value,
            eggs: 0,
            type: "rooster",
        });
    }

    eggsInput.value = "";
    animalInput.value = "";
    renderAnimals();
    allEggs();
    allHens();
    allRoosters();
    document.querySelector('.all-eggs').innerHTML = allEggs();
    document.querySelector('.all-hens').innerHTML = allHens();
    document.querySelector('.all-roosters').innerHTML = allRoosters();
}

function creatAnimalRoosterHTML(animal, index) {
    return /*html*/ `<li>Rooster ${animal.name} </li>`
}

function creatAnimalHenHTML(animal, index) {
  return /*html*/ `
    <li>
        <p>Hen ${animal.name} laid ${animal.eggs} eggs.</p>
        <div class="input-button">
            <input class="add-new-eggs${index}" name="number" type="number" min="1">
            <button onclick="addNewEggs(${index})">ADD</button>
        </div>
    </li> `;
}

renderAnimals();

function allEggs() {
    const sumWithInitial = jsonData.reduce((accumulator, currentItem) => accumulator + currentItem.eggs, 0);
    return sumWithInitial;
}

function allHens() {
    let allhensArray = jsonData.filter((data) => data.type === 'hen');
    return allhensArray.length;
}

function allRoosters() {
    let allRoostersArray = jsonData.filter((data) => data.type === 'rooster');
    return allRoostersArray.length;   
}

function addNewEggs(index) {
    const amountOfEggs = document.querySelector(`.add-new-eggs${index}`);
    jsonData[index].eggs += parseFloat(amountOfEggs.value);
    amountOfEggs.value = "";
    renderAnimals();
    allEggs();
    allHens();
    allRoosters();
    document.querySelector('.all-eggs').innerHTML = allEggs();
    document.querySelector('.all-hens').innerHTML = allHens();
    document.querySelector('.all-roosters').innerHTML = allRoosters();
}

function collectEggs() {
    let collectedEggs = document.querySelector('.collected-eggs');

    let currentTotalCollectedEggs = parseInt(collectedEggs.innerText, 10) || 0;
    
    let collectedEggsInput = parseInt(document.querySelector('.number-of-eggs').value, 10) || 0;
    
    collectedEggs.innerText = currentTotalCollectedEggs + collectedEggsInput;

    document.querySelector('.number-of-eggs').value = "";
    
    reduceEggs(collectedEggsInput)

}

function reduceEggs(collectedEggsInput) {
    let allLaidEggs = document.querySelector('.all-eggs')

    let currentTotalLaidEggs = parseInt(allLaidEggs.innerText, 10) || 0;

    allLaidEggs.innerText = currentTotalLaidEggs - collectedEggsInput;

}





// TEST Funktion
// document.querySelector('.collect-eggs').addEventListener('click', () => {
//     let totalElem = document.querySelector('.collected-eggs');
//     let currentTotal = parseInt(totalElem.innerText, 10) || 0;
//     let collectedEggsInput = parseInt(document.querySelector('.number-of-eggs').value, 10) || 0;
//     totalElem.innerHTML = currentTotal + collectedEggsInput
//     document.querySelector('.number-of-eggs').value = "";
// })