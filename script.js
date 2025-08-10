const selectAnimal = document.getElementById("animals");
const animalInput = document.querySelector(".name-new-hen");
const eggsInput = document.querySelector(".eggs-new-hen");
document.querySelector('.all-eggs').innerHTML = allEggs();
document.querySelector('.all-hens').innerHTML = allHens();


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
    allHens.innerHTML = "";
    jsonData.forEach((item) => {
        allHens.innerHTML += creatAnimalHTML(item);
    });
}


function addNewHen() {
    jsonData.push({
        name: animalInput.value,
        eggs: parseInt(eggsInput.value),
        type: "hen",
    });
    eggsInput.value = "";
    animalInput.value = "";
    renderAnimals();
    allEggs();
    allHens();
    document.querySelector('.all-eggs').innerHTML = allEggs();
    document.querySelector('.all-hens').innerHTML = allHens();
}


function creatAnimalHTML(item) {
  return /*html*/ `
    <li>
        <p>Hen ${item.name} laid ${item.eggs} eggs.</p>
        <div class="input-button">
            <input name="number" type="number" min="1">
            <button>ADD</button>
        </div>
    </li> `;
}

renderAnimals();

function allEggs() {
    const sumWithInitial = jsonData.reduce((accumulator, currentItem) => accumulator + currentItem.eggs, 0);
    return sumWithInitial;
}

function allHens() {
    return jsonData.length
}
