import { createHero } from './hero.js';
import { createGrid } from './cardGrid.js';
import { createFooter } from './footer.js';

export function createLandingPage() {

    const hero = createHero();
    const gridContainer = createGrid();
    const footer = createFooter();

    const container = document.createElement('div');
    container.classList.add('landing-page');

    container.appendChild(hero);
    container.appendChild(gridContainer);
    container.appendChild(footer);

    return container;

}