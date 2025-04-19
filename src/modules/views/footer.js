import '../../styles/footer.css';

export function createFooter() {

    const footer = document.createElement('footer');

    const p = document.createElement('p');
    p.textContent = 'This page was made by: Rodrigol \n © All rights reserved';

    footer.appendChild(p);

    return footer;

}