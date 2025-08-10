// section_06/script

document.addEventListener('DOMContentLoaded', () => {
    const awardsGrid = document.querySelector('.awards__grid');
    awardsGrid.addEventListener('click', (e) => {

        // Обработка кликов по сетке наград
        const item = e.target.closest('.awards__item');
        if (item) {
            const imgElement = item.querySelector('.awards__image');
            if (imgElement && imgElement.dataset.fullsize) {
                window.open(imgElement.dataset.fullsize, '_blank');
            }
        }
    });
});