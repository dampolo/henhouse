function createAnimalHenElement(animal) {
  // Create <li>
  const li = document.createElement("li");
  li.classList.add("animal");

  // store a reference so we can update later
  animal.element = li;

  // Paragraph 1
  const p1 = document.createElement("p");
  p1.textContent = `Hen ${animal.name} laid ${animal.current_eggs} eggs.`;
  li.appendChild(p1);

  // Paragraph 2
  const p2 = document.createElement("p");
  p2.textContent = `Total: ${animal.total_eggs} eggs.`;
  li.appendChild(p2);

  // Div.input-fields
  const div = document.createElement("div");
  div.className = "input-fields";

  // Input
  const input = document.createElement("input");
  input.name = "number";
  input.type = "number";
  input.min = "1";
  div.appendChild(input);

  // Collect button
  const collectBtn = document.createElement("button");
  collectBtn.disabled = true;
  collectBtn.textContent = "COLLECT EGGS";
  div.appendChild(collectBtn);

  // Wire input to enable/disable button
  input.addEventListener("input", () => {
    const value = Number(input.value, 10);
    collectBtn.disabled = !Number.isInteger(value) || value <= 0 || value > animal.current_eggs;  
  });

  // Wire button to collection logic
  collectBtn.addEventListener("click", () => collectEggsDirectlyFromHen(li, animal, input, collectBtn));

  // Died button
  const diedBtn = document.createElement("button");
  diedBtn.textContent = "DIED";
  diedBtn.addEventListener("click", () => animalDied(li, animal));
  div.appendChild(diedBtn);

  // Append div to li
  li.appendChild(div);

  return li;
}


function createAnimalRoosterElement(animal) {
  // <li>
  const li = document.createElement("li");
  li.className = 'animal';

  li.textContent = `Rooster ${animal.name} `;

  // Died button
  const diedBtn = document.createElement("button");
  diedBtn.textContent = "DIED";
  diedBtn.addEventListener("click", () => animalDied(li, animal));

  // Append button to li
  li.appendChild(diedBtn);

  return li;
}

function createAnimalNestlingElement(animal) {
  // <li>
  const li = document.createElement("li");
  li.textContent = `${animal.name}`;
  return li;
}