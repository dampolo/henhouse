function createAnimalHenElement(animal) {
    const henTemplate = document.querySelector(".list-hen-template");
    const allHens = document.querySelector(".amount-of-all-hens");
    const clone = henTemplate.content.cloneNode(true);
    const li = clone.querySelector("li");
    const input = clone.querySelector(".collect-some-eggs");
    const collectBtn = clone.querySelector(".collect-eggs");

    // store DOM element reference for later updates
    animal.element = li;

    clone.querySelector(".hen-status").textContent = `Hen ${animal.name} laid ${animal.current_eggs} eggs.`;
    clone.querySelector(".hen-total").textContent = `Total: ${animal.current_eggs}`;
        
    // Wire button to collection logic
    collectBtn.addEventListener("click", () => collectEggsDirectlyFromHen(li, animal, input, collectBtn));

    
    // validate input and enable/disable button
    input.addEventListener("input", () => {
        const value = Number(input.value);  // Number takes only one argument
        collectBtn.disabled = !Number.isInteger(value) || value <= 0 || value > animal.current_eggs;});

    clone.querySelector(".died").addEventListener("click", () => {animalDied(li, animal)});
    
    allHens.appendChild(clone);
    
    return li
}


function createAnimalRoosterElement(animal) {
    const roosterTemplate = document.querySelector(".list-rooster-template")
    const allRoosters = document.querySelector(".amount-of-all-roosters");
    const clone = roosterTemplate.content.cloneNode(true);
    const li = clone.querySelector("li");
    clone.querySelector(".rooster-name").textContent = `Rooster ${animal.name} `;
    clone.querySelector(".died").addEventListener("click", () => {animalDied(li, animal)});
    allRoosters.appendChild(clone);
    return li;
}

function createAnimalNestlingElement(animal) {
  // <li>
  const li = document.createElement("li");
  li.textContent = `${animal.name}`;
  return li;
}