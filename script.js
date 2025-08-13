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
            laid_time: (Math.floor(Math.random() * 10) + 1) * 1000,
            type: "hen",
        });
    } else {
        jsonData.push({
            name: animalInput.value,
            current_eggs: 0,
            total_eggs: 0,
            laid_time: 0,
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
            <input class="collect-some-eggs${index}" oninput="activeReactiveButtonSingleHen(${index})" name="number" type="number" min="1">
            <button onclick="addNewEggs(${index})" class="collect-eggs${index}" disabled>COLLECT EGGS</button>
            <button onclick="animalDied(${index})">DIED</button>
        </div>
    </li> `;
}

renderAnimals();

function activeReactiveButtonSingleHen(index) {
    const collectedEggsInput = parseInt(document.querySelector(`.collect-some-eggs${index}`).value, 10) || 0;
    const activeReactiveButton = document.querySelector(`.collect-eggs${index}`);
    
    
    if(collectedEggsInput <= jsonData[index].current_eggs && collectedEggsInput !== 0 && collectedEggsInput > 0) {
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
    const sumWithInitial = jsonData.reduce((accumulator, currentItem) => accumulator + currentItem.current_eggs, 0);
    return sumWithInitial;
}

function allHens() {
    const allhensArray = jsonData.filter((data) => data.type === 'hen');
    return allhensArray.length;
}

function allRoosters() {
    const allRoostersArray = jsonData.filter((data) => data.type === 'rooster');
    return allRoostersArray.length;   
}

function addNewEggs(index) {
    const amountOfEggs = document.querySelector(`.collect-some-eggs${index}`);
    jsonData[index].current_eggs -= parseInt(amountOfEggs.value);
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
    const collectedEggs = document.querySelector('.collected-eggs').innerText
    const allLaidEggs = document.querySelector('.all-laid-eggs').innerText
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
    const collectedEggs = document.querySelector('.collected-eggs');

    const currentTotalCollectedEggs = parseInt(collectedEggs.innerText, 10) || 0;
    
    const collectedEggsInput = parseInt(document.querySelector('.number-of-eggs').value, 10) || 0;

    document.querySelector('.number-of-eggs').value = "";
    collectedEggs.innerText = currentTotalCollectedEggs + collectedEggsInput;
    reduceEggs(collectedEggsInput);
}


function activeReactiveButton() {
    const collectAllEggs = document.querySelector('.collect-eggs');
    const currendLaidEggs = document.querySelector('.all-laid-eggs').innerText;
    const collectedEggsInput = parseInt(document.querySelector('.number-of-eggs').value, 10) || 0;
    if (parseInt(currendLaidEggs) > collectedEggsInput  && collectedEggsInput > 0) {
        collectAllEggs.disabled = false;
    } else {
        collectAllEggs.disabled = true;
    }
}


function reduceEggs(collectedEggsInput) {
    const allLaidEggs = document.querySelector('.all-laid-eggs')
    const currentTotalLaidEggs = parseInt(allLaidEggs.innerText, 10) || 0;
    allLaidEggs.innerText = currentTotalLaidEggs - collectedEggsInput;
}


function layEggs() {
    const index = Math.floor(Math.random() * jsonData.length)
    const laidTime = jsonData[index].laid_time;
    jsonData[index].current_eggs += 5;
    jsonData[index].total_eggs += 5;
    renderAnimals();
    document.querySelector('.all-laid-eggs').innerHTML = allEggs();
    setTimeout(layEggs, laidTime);        
}

//layEggs(); // start






// TEST Funktion
// document.querySelector('.collect-eggs').addEventListener('click', () => {
//     let totalElem = document.querySelector('.collected-eggs');
//     let currentTotal = parseInt(totalElem.innerText, 10) || 0;
//     let collectedEggsInput = parseInt(document.querySelector('.number-of-eggs').value, 10) || 0;
//     totalElem.innerHTML = currentTotal + collectedEggsInput
//     document.querySelector('.number-of-eggs').value = "";
// })