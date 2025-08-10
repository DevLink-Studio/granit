// Загрузка Яндекс.Карта
function initYandexMap() {
    ymaps.ready(function() {
        const myMap = new ymaps.Map('map', {
            center: [52.015254, 113.505505],
            zoom: 17,
            controls: ['zoomControl', 'fullscreenControl'],
            behaviors: ['dblClickZoom']
        });

        const myPlacemark = new ymaps.Placemark([52.015254, 113.505505], {
            balloonContent: '<strong>ГРАНИТ</strong><br>г. Чита, ул. Меховой переулок, д. 13<br>'
        }, {
            preset: 'islands#redDotIcon'
        });

        myMap.geoObjects.add(myPlacemark);
        myPlacemark.balloon.open();

        // Блокировка взаимодействий
        const disabledBehaviors = [
            'drag',
            'multiTouch',
            'rightMouseButtonMagnifier',
            'scrollZoom'
        ];

        disabledBehaviors.forEach(behavior => {
            myMap.behaviors.disable(behavior);
        });
    });
}

// Проверяем глобальную доступность ymaps
if (window.ymaps) {
    initYandexMap();
} else {
    document.addEventListener('yandexmapsloaded', initYandexMap);
}