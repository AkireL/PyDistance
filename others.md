console.log(location.coords.latitude);
    console.log(location.coords.longitude);



const draw = (map) => {
    places.forEach(item => {
        var marker = new google.maps.Marker({
            position: { lat: item[1], lng: item[2] }
            , map: map
            , title: item[0]
            , zIndex: item[3]
        });

        var infowindow = new google.maps.InfoWindow({
            content: item[0]
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    })
}