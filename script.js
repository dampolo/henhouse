const selectAnimal = document.getElementById('animals');
const animalInput = document.querySelector('.name-new-hen')
const eggsInput = document.querySelector('.eggs-new-hen');

selectAnimal.addEventListener('change', () => {
    if (selectAnimal.value === 'cock') {
        eggsInput.disabled = true;
        eggsInput.value = ''; // optional: clear value
    } else {
        eggsInput.disabled = false;
    }
});

function addNewHen() {
    animalInput.value = "";
    eggsInput.value = "";
}