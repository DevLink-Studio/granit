// section_07/script

document.addEventListener('DOMContentLoaded', () => {
    const awardsGrid = document.querySelector('.portfolio__grid');
    awardsGrid.addEventListener('click', (e) => {

        // Обработка кликов по сетке наград
        const item = e.target.closest('.portfolio__item');
        if (item) {
            const imgElement = item.querySelector('.portfolio__image');
            if (imgElement && imgElement.dataset.fullsize) {
                window.open(imgElement.dataset.fullsize, '_blank');
            }
        }
    });
});