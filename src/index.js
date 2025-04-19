//Imports section
import { Todo } from './modules/logic/todo.js';
import { createLandingPage } from './modules/views/landing.js';
import './styles/styles.css';



if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

document.addEventListener('DOMContentLoaded', () => {

    const body = document.querySelector('body');
    const landingPage = createLandingPage();
    body.appendChild(landingPage);

});