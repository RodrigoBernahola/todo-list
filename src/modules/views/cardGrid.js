export function createGrid() {

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('gridContainer');

    const button = document.createElement('button');
    button.textContent = 'View Projects';

    const divGrid = document.createElement('div');

    const defaultCard = document.createElement('div');
    defaultCard.classList.add('card');
    defaultCard.textContent = 'Default projects';

    gridContainer.appendChild(button);
    divGrid.appendChild(defaultCard)
    gridContainer.appendChild(divGrid);

    return gridContainer

}