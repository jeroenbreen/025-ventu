function App() {
    this.config = null;
    this.user = null;
    this.guide = null;
    this.service = null;
    this.map = null;
    this.domElements = {
        search: $('#input-search-address'),
        searchResults: $('#ventu-search-result'),
        searchFeedback: $('.ventu-search-results-feedback'),
        dynamicContent: $('#dynamic-content')
    };
    this.objects = [];
    this.list = {
        found: [],
        love: null,
        hate: null
    };
    this.init();
}

App.prototype.init = function() {
    // this.config = new Config(this);
    // this.user = new User(this, user);
    // this.guide = new Guide(this);
    // this.service = this._getService();
    //
    //
    // if (this.config.device.type === 0) {
    //     this.map = new MapMobile(this);
    // } else {
    //     this.map = new Map(this);
    // }

    this.map = new Map();
    
    // this._initDomElements();
    //
    // if (this.config.device.type === 0) {
    //     this.list.love = new ListMobile(this, 'love', 'Interesselijst');
    //     this.list.hate = new ListMobile(this, 'hate', 'Prullenbak');
    // } else {
    //     this.list.love = new List(this, 'love', 'Interesselijst');
    //     this.list.hate = new List(this, 'hate', 'Prullenbak');
    // }
};


App.prototype._getService = function() {
    if (window.ventuConfig.environment.development) {
        return new DataFaker(this);
    } else {
        return new DataService(this);
    }
};

App.prototype._initDomElements = function() {
    this.domElements.stack = $('#ventu-stack');
    this.domElements.bottomBar = $('#ventu-bottom-bar');
};



// search

App.prototype.search = function(event, element) {
    var self = this;
    if (event.keyCode === 13) {
        this.select(this.service.searchResults[0])
    } else {
        var searchQuery = $(element).val();
        this.service.getSearchResults(searchQuery, searchResultsCallback);


        function searchResultsCallback(results) {
            self.domElements.searchResults.empty();
            for (var i = 0, l = results.length; i < l; i++) {
                var result = results[i],
                    resultElement = $('<div class="ventu-map-search-result" onclick="ventu.select(\'' + result + '\', \'poly\')"><div class="ventu-map-search-result-text">' + result + '</div></div>');
                self.domElements.searchResults.append(resultElement);
            }
        }
    }

};



// select

App.prototype.select = function(searchQuery) {
    var self = this;

    function selectCallback(searchData) {
        self._updateMenuBar(searchQuery, searchData.markers.length);
        self.objects = searchData.objects;
        self.map.draw(searchData);
        if (!self.isMobile()) {
            self.user.startTimer('filter')
        }
    }

    if (this.page !== 'application') {
        // ajax transition to application
        $.get('./application.html').done(function(result){
            var html = $(result).filter('#dynamic-content').children();
            self.domElements.dynamicContent.html(html);
            filterListeners();
            self.init();
            $('body').removeClass().addClass('ventu-application');
            self.page = 'application';
            self.service.getSelectResults(searchQuery, selectCallback);
        });

    } else {
        this.service.getSelectResults(searchQuery, selectCallback);
    }
};


App.prototype._updateMenuBar = function(searchQuery, n) {
    var string = searchQuery;
    this.domElements.searchResults.empty();
    this.domElements.searchResults.hide();
    if (this.service.filter.searchArea.type === 'circle') {
        string += ' +' + this.service.filter.searchArea.km1 + 'km'
    } else if (this.service.filter.searchArea.type === 'rect') {
        string += ' +' + this.service.filter.searchArea.km1 + '×' + this.service.filter.searchArea.km2 + 'km'
    }
    this.domElements.search.val(string);
    this.domElements.searchFeedback.html(n + ' objecten gevonden');
};

// helpers

App.prototype.isMobile = function() {
    return this.config.device.type === 0;
};