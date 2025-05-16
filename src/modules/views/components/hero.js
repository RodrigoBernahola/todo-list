//Esta función se encarga de crear y exportar el hero de la landing page.
import '../../../styles/hero.css';


export function createHero() {

    const hero = document.createElement('div');
    hero.classList.add('hero');

    const h1 = document.createElement('h1');
    h1.textContent = 'Welcome to the To-Do List';

    const button = document.createElement('button');
    button.textContent = 'Create a new project';


    hero.appendChild(h1);
    hero.appendChild(button);

    return hero;

}