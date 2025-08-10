const selectAnimal = document.getElementById("animals");
const animalInput = document.querySelector(".name-new-hen");
const eggsInput = document.querySelector(".eggs-new-hen");
document.querySelector('.all-eggs').innerHTML = allEggs();
document.querySelector('.all-hens').innerHTML = allHens();
document.querySelector('.all-cocks').innerHTML = allCocks();



selectAnimal.addEventListener("change", () => {
  if (selectAnimal.value === "cock") {
    eggsInput.disabled = true;
    eggsInput.value = ""; // optional: clear value
  } else {
    eggsInput.disabled = false;
  }
});


function renderAnimals() {
    const allHens = document.querySelector(".amount-of-all-hens");
    const allCocks = document.querySelector(".amount-of-all-cocks");

    allHens.innerHTML = "";
    allCocks.innerHTML = "";

    jsonData.forEach((animal, index) => {
        if(animal.type === 'hen'){
            allHens.innerHTML += creatAnimalHenHTML(animal, index);
        } else {
            allCocks.innerHTML += creatAnimalCockHTML(animal, index)
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
            type: "cock",
        });
    }

    eggsInput.value = "";
    animalInput.value = "";
    renderAnimals();
    allEggs();
    allHens();
    allCocks();
    document.querySelector('.all-eggs').innerHTML = allEggs();
    document.querySelector('.all-hens').innerHTML = allHens();
    document.querySelector('.all-cocks').innerHTML = allCocks();
}

function creatAnimalCockHTML(animal, index) {
    return /*html*/ `<li>Cock ${animal.name} </li>`
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

function allCocks() {
    let allCocksArray = jsonData.filter((data) => data.type === 'cock');
    return allCocksArray.length;   
}

function addNewEggs(index) {
    const amountOfEggs = document.querySelector(`.add-new-eggs${index}`);
    jsonData[index].eggs += parseFloat(amountOfEggs.value);
    amountOfEggs.value = "";
    renderAnimals();
    allEggs();
    allHens();
    allCocks();
    document.querySelector('.all-eggs').innerHTML = allEggs();
    document.querySelector('.all-hens').innerHTML = allHens();
    document.querySelector('.all-cocks').innerHTML = allCocks();
}