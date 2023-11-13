(() => {
    const calcOffset = (element) => {
        let top = 0;
        let left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while(element);
        return {top, left};
    }
    const els = document.getElementsByClassName('title');
    for (let i=0;i< els.length;i++) {
        const element = els.item(i);
        element.addEventListener('mouseout', () => {
            element.classList.toggle('active');
        });
        element.previousElementSibling.addEventListener('mouseover', () => {
            element.classList.toggle('active');
            const offset = calcOffset(element.previousElementSibling);
            element.setAttribute('style', 'left:'+offset.left+'px; top:'+offset.top+'px');
        });
        element.previousElementSibling.addEventListener('click', () => {
            element.classList.toggle('active');
            const offset = calcOffset(element.previousElementSibling);
            element.setAttribute('style', 'left:'+offset.left+'px; top:'+offset.top+'px');
        });
    }
})();