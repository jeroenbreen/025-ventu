function Map(app) {
    this.app = app;
    this.poly = null;
    this.map = null;
    this.marker = {
        standard: './img/markers/standard-marker.png',
        selected: './img/markers/selected-marker.png'
    };
    this.init();
}

Map.prototype.init = function() {
    var myOptions = {
        zoom: 8,
        center: new google.maps.LatLng(51.7,4.6),
        sensor: 'true',
        draggable: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        }
    };
    this.map = new google.maps.Map(document.getElementById("ventu-canvas"), myOptions);
};

Map.prototype.drawPoly = function(data) {
    this.poly = new google.maps.Polygon({
        paths: data.poly,
        strokeColor: 'transparent',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#000',
        fillOpacity: 0.4
    });
    this.poly.setMap(this.map);
    this.map.setCenter(data.center);
    this.map.setZoom(data.zoom);
};

Map.prototype.placeMarkerset = function(markers) {
    var self = this,
        counter = 0,
        timer;
    this.clearMarkers();
    timer = setInterval(function(){
            var icon = counter === 0 ? self.marker.selected : self.marker.standard;
            self._placeMarker(markers[counter], icon);
            counter++;
            if (counter === markers.length) {
                clearInterval(timer);
            }
        }, 100)
};

Map.prototype._placeMarker = function(markerData, icon) {
    var marker = new google.maps.Marker({
        position: markerData.coordinates,
        map: this.map,
        icon: icon,
        title: ''
    });

};

Map.prototype.clearMarkers = function(marker) {

};