export function createGrid() {

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('gridContainer');

    const divGrid = document.createElement('div');

    gridContainer.appendChild(divGrid);

    return gridContainer

}