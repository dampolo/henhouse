const selectAnimal = document.getElementById("animals");
const animalInput = document.querySelector(".name-new-hen");
const eggsInput = document.querySelector(".eggs-new-hen");

selectAnimal.addEventListener("change", () => {
  if (selectAnimal.value === "cock") {
    eggsInput.disabled = true;
    eggsInput.value = ""; // optional: clear value
  } else {
    eggsInput.disabled = false;
  }
});

function addNewHen() {
  animalInput.value = "";
  eggsInput.value = "";
}

function renderAnimals() {
  const allHens = document.querySelector(".amount-of-all-hens");
  jsonData.forEach((item) => {
    allHens.innerHTML += /*html*/ `
    <li>
        <p>Hen ${item.name} laid ${item.eggs} eggs.</p>
        <div class="input-button">
            <input name="number" type="number" min="1">
            <button>ADD</button>
        </div>
    </li> `;
  });
}

// Run it
renderAnimals();
