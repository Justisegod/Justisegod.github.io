
function countryLinkActive() {
    const countryLinks = document.querySelectorAll('.experiances__country-link');
    const activeElement = countryLinks[0];

    countryLinks.forEach( item => {
        item.addEventListener('click', () => {
            item.classList.remove();
            item.classList.add('experiances__country--active');
            console.log(item);
        });
    });
}

countryLinkActive();