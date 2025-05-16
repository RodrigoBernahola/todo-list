export function createGrid() {

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('gridContainer');

    const divGrid = document.createElement('div');

    const defaultCard = document.createElement('div');
    defaultCard.classList.add('card');
    defaultCard.textContent = 'Default projects';

    divGrid.appendChild(defaultCard)
    gridContainer.appendChild(divGrid);

    return gridContainer

}