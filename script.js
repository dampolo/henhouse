const selectAnimal = document.getElementById("animals");
const animalInput = document.querySelector(".name-new-hen");
const eggsInput = document.querySelector(".eggs-new-hen");
document.querySelector('.all-laid-eggs').innerHTML = allEggs();
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
            current_eggs: parseInt(eggsInput.value) || 0,
            total_eggs: parseInt(eggsInput.value) || 0,
            type: "hen",
        });
    } else {
        jsonData.push({
            name: animalInput.value,
            current_eggs: 0,
            total_eggs: 0,
            type: "rooster",
        });
    }

    eggsInput.value = "";
    animalInput.value = "";
    renderAnimals();
    allEggs();
    allHens();
    allRoosters();
    document.querySelector('.all-laid-eggs').innerHTML = allEggs();
    document.querySelector('.all-hens').innerHTML = allHens();
    document.querySelector('.all-roosters').innerHTML = allRoosters();
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
            <input class="add-new-eggs${index}" name="number" type="number" min="1">
            <button onclick="addNewEggs(${index})">ADD EGGS</button>
            <button onclick="animalDied(${index})">DIED</button>
        </div>
    </li> `;
}

renderAnimals();

function allEggs() {
    const sumWithInitial = jsonData.reduce((accumulator, currentItem) => accumulator + currentItem.current_eggs, 0);
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
    jsonData[index].current_eggs += parseFloat(amountOfEggs.value);
    jsonData[index].total_eggs += parseFloat(amountOfEggs.value);
    amountOfEggs.value = "";
    renderAnimals();
    allEggs();
    allHens();
    allRoosters();
    document.querySelector('.all-laid-eggs').innerHTML = allEggs();
    document.querySelector('.all-hens').innerHTML = allHens();
    document.querySelector('.all-roosters').innerHTML = allRoosters();
}

function animalDied(index) {
    jsonData.splice(index, 1)
    renderAnimals();
    document.querySelector('.all-hens').innerHTML = allHens();
    document.querySelector('.all-roosters').innerHTML = allRoosters();
}


function collectAllEggs() {
    let collectedEggs = document.querySelector('.collected-eggs').innerText
    let allLaidEggs = document.querySelector('.all-laid-eggs').innerText
    document.querySelector('.collected-eggs').innerText = parseInt(allLaidEggs) + parseInt(collectedEggs);

    document.querySelector('.all-laid-eggs').innerText = 0;
    currentEggsToZero();
    activeReactiveButton();
}

function currentEggsToZero() {
    jsonData.forEach((animal) => animal.current_eggs = 0);
    renderAnimals();
}

function collectEggs() {
    let collectedEggs = document.querySelector('.collected-eggs');

    let currentTotalCollectedEggs = parseInt(collectedEggs.innerText, 10) || 0;
    
    let collectedEggsInput = parseInt(document.querySelector('.number-of-eggs').value, 10) || 0;

    document.querySelector('.number-of-eggs').value = "";
    collectedEggs.innerText = currentTotalCollectedEggs + collectedEggsInput;
    reduceEggs(collectedEggsInput);
}


function activeReactiveButton() {
    let collectAllEggs = document.querySelector('.collect-eggs');
    let currendLaidEggs = document.querySelector('.all-laid-eggs').innerText;
    let collectedEggsInput = parseInt(document.querySelector('.number-of-eggs').value, 10) || 0;
    if (parseInt(currendLaidEggs) < collectedEggsInput) {
        collectAllEggs.disabled = true;
    } else {
        collectAllEggs.disabled = false;
    }
}


function reduceEggs(collectedEggsInput) {
    let allLaidEggs = document.querySelector('.all-laid-eggs')

    let currentTotalLaidEggs = parseInt(allLaidEggs.innerText, 10) || 0;

    allLaidEggs.innerText = currentTotalLaidEggs - collectedEggsInput;

}

setInterval(() => {
    let index = Math.floor(Math.random() * parseInt(jsonData.length))    
    jsonData[index].current_eggs += 5;    
    jsonData[index].total_eggs += 5;
    renderAnimals()
    document.querySelector('.all-laid-eggs').innerHTML = allEggs()
}, 5000);





// TEST Funktion
// document.querySelector('.collect-eggs').addEventListener('click', () => {
//     let totalElem = document.querySelector('.collected-eggs');
//     let currentTotal = parseInt(totalElem.innerText, 10) || 0;
//     let collectedEggsInput = parseInt(document.querySelector('.number-of-eggs').value, 10) || 0;
//     totalElem.innerHTML = currentTotal + collectedEggsInput
//     document.querySelector('.number-of-eggs').value = "";
// })