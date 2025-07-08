import { createHero } from './hero.js';
import { createGrid } from './cardGrid.js';

export function createLandingPage() {

    const hero = createHero();
    const gridContainer = createGrid();

    const container = document.createElement('main');
    container.classList.add('landing-page');    

    container.appendChild(hero);
    container.appendChild(gridContainer);

    return container;

}