function DataFaker(app) {
    this.app = app;
}

DataFaker.prototype.search = function(searchQuery) {
    var results = this._getSearchResults(searchQuery);
    this.app.domElements.searchResults.empty();
    for (var i = 0, l = results.length; i < l; i++) {
        var result = results[i],
            element = $('<div class="ventu-map-search-result" onclick="ventu.service.select(\'' + result + '\')"><div class="ventu-map-search-result-text">' + result + '</div></div>');
        this.app.domElements.searchResults.append(element);
    }
};

DataFaker.prototype._getSearchResults = function(searchQuery) {
    // fake data
    return [
        'Amsterdam (stad)',
        'Amstelveen (stad)',
        'Amstelstraat (straat)',
        'Amstelgebouw (locatie)'
    ]
};

DataFaker.prototype.select = function(searchQuery) {
    var self = this,
        data = this._get(searchQuery);
    // update menu bar
    this.app.domElements.searchResults.empty();
    this.app.domElements.searchResults.hide();
    this.app.domElements.search.val(searchQuery);
    this.app.objects = [];
    this.app.cards = [];
    for (var i = 0, l = data.buildings.length; i < l; i++) {
        var building = new Building(this.app, data.buildings[i]);
        this.app.objects.push(building);
    }
    this.app.domElements.searchFeedback.html(data.buildings.length + ' objecten gevonden');

    this.app.map.draw(data);
    this._destroyCards();
    setTimeout(function(){
        self._createCards();
    }, 2000);

};

DataFaker.prototype.getList = function(type) {
    if (type === 'love') {
        var list = buildings.slice(1,4),
            toModel = [];
        for (var i = 0, l = list.length; i < l; i++) {
            toModel.push(new Building(this.app, list[i]));
        }
        return toModel;
    } else {
        return [];
    }
};

DataFaker.prototype._destroyCards = function() {
    for (var i = 0, l = this.app.cards.length; i < l; i++) {
        this.app.cards[i].destroy();
    }
    this.app.cards = [];
};

DataFaker.prototype._createCards = function() {
    for (var i = 0; i < this.app.settings.stack.n; i++) {
        this._createCard(this.app.objects[i], i);
    }
};

DataFaker.prototype._createCard = function(building, index) {
    // todo destroy old ones?
    var card = new Card(this.app, building, index);
    this.app.cards.push(card);
    // if first time:
    if (index === 0) {
        setTimeout(function () {
            card.float();
        }, 1000);
    }
};

DataFaker.prototype._get = function(searchQuery) {
    // fake data
    // http://nominatim.openstreetmap.org/details.php?place_id=158832524
    // http://polygons.openstreetmap.fr/index.py
    var poly = amsterdam,
        center = {lat: 52.3745403, lng: 5.09797550561798},
        zoom = 11;
    return {
        poly: poly,
        center: center,
        zoom: zoom,
        buildings: buildings
    }
};



DataFaker.prototype.translate = function(string) {
    // no need to translate in development modus
    return string;
};

DataFaker.prototype.post = function(id) {
    var n = Math.round((this.buildings.length - 1) * Math.random());
    this.app.objects.push(new Building(this.app, this.buildings[n]))
};

DataFaker.prototype.sessionStore = function(objects) {
    // do nothing
};