(() => {
    const els = document.getElementsByClassName('title');
    for (let i=0;i< els.length;i++) {
        const element = els.item(i);
        element.addEventListener('mouseout', () => {
            element.classList.toggle('active');
        });
        element.previousElementSibling.addEventListener('mouseover', () => {
            element.classList.toggle('active');
        });
        element.previousElementSibling.addEventListener('click', () => {
            element.classList.toggle('active');
        });
    }
})();