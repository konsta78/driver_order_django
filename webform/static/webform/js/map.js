const labels = {
    'A': "B",
    'B': "A"
};

let currentMarker = 'A',    // активный маркер
    markerA, markerB,       // маркеры на карте
    map,                    // карта
    markers = [];           // список установленных на карте маркеров

// установка маркеров и обработка событий карты
DG.then(function () {
    let iconMarkerA = DG.icon({
            iconUrl: 'static/webform/icons/markerA2.gif',
            iconSize: [35, 58],
            iconAnchor: [17, 58],
        }),
        iconMarkerB = DG.icon({
            iconUrl: 'static/webform/icons/markerB3.gif',
            iconSize: [35, 58],
            iconAnchor: [17, 58],
        });

    map = DG.map('map', {
        center: [59.94, 50.32],
        zoom: 10
    });

    // установка центра карты в зависисмости от местонахождения
    map.locate({setView: true});

    map.on('click', function (e) {
        if (!currentMarker) return;

        let x = e.latlng.lat, // координата X (mouse-click)
            y = e.latlng.lng; // координата Y (mouse-click)

        if (markers.includes("markerA") && currentMarker == "A") {
            markerA.setLatLng([x, y]);
        } else if (!markers.includes("markerA") && currentMarker == "A") {
            markerA = DG.marker([x, y], {
                icon: iconMarkerA,
                draggable: false,
                title: "Начало маршрута"
            }).addTo(map);
            markers[0] = "markerA";
        } else if (markers.includes("markerB") && currentMarker == "B") {
            markerB.setLatLng([x, y]);
        } else {
            markerB = DG.marker([x, y], {
                icon: iconMarkerB,
                draggable: false,
                title: "Пункт назначения"
            }).addTo(map);
            markers[1] = "markerB";
        }
        
        document.querySelector(`#pos_x${currentMarker}`).setAttribute("value", x);
        document.querySelector(`#pos_y${currentMarker}`).setAttribute("value", y);
        getAddresses(x, y, 50);
    });
});

// получение первого адреса по координатам с определенным радиусом 'r'
function getAddresses(x, y, r) {
    let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
    let token = "da2abae2d95b2225964c094e4b151a6c174f4d5b";
    let query = {
        lat: x,
        lon: y,
        radius_meters: r
    };

    let options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify(query)
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            let currentInput = document.querySelector(`#address_${currentMarker}`);
            currentInput.value = data.suggestions[0].value;
        })

        .catch(error => console.log("error", error));
}

// переключение класса отображения строки таблицы с данными точки маршрута
function changeClassView(label1, label2) {
    document.querySelector(`[data-point_${label1}]`).classList.add('label_checked'),
    document.querySelector(`[data-point_${label2}]`).classList.remove('label_checked');
}

// смена маркера между "А" и "В" при нажатии на метку    
function toogleMarker() {
    switch (this.id) {
        case "labelA":
            currentMarker = "A";
            changeClassView('A', 'B');
            if (markerA) map.setView(markerA.getLatLng());
            break;
        case "labelB":
            currentMarker = "B";
            changeClassView('B', 'A');
            if (markerB) map.setView(markerB.getLatLng());
            break;
    }
}

// удаление маркеров с карты
function deleteMarker() {
    switch (this.id) {
        case "delMarkerA":
            changeClassView('A', 'B');
            document.querySelector(`#address_A`).value = "";
            if (markerA) markerA.removeFrom(map);
            markers[0] = "";
            break;
        case "delMarkerB":
            changeClassView('B', 'A');
            document.querySelector(`#address_B`).value = "";
            if (markerB) markerB.removeFrom(map);
            markers[1] = "";
            break;
    }
}

