const itemListURL = "https://raw.githubusercontent.com/spoonerton/Spoons-Shop/master/StoreItems.json";
const eventListURL = "https://raw.githubusercontent.com/spoonerton/Spoons-Shop/master/StoreIncidents.json";
const shopExtURL = "https://raw.githubusercontent.com/spoonerton/Spoons-Shop/master/ShopExt.json";

let itemList = null;
$.getJSON(itemListURL, function(data) {
    var options = {
        valueNames: ['abr', 'price', 'category'],
        item: '<tr><td class="abr" scope="row"></td><td class="price"></td><td class="category"></td></tr>'
    };

    var itemData = [];
    $.each(data.items, function(index, value) {
        if (value["price"] > 0) {
            itemData.push(value);
        }
    });

    itemList = new List('items', options, itemData);
});

let eventList = null;
$.getJSON(eventListURL, function(data) {
    var options = {
        valueNames: ['abr', 'price', 'karmatype'],
        item: '<tr><td class="abr" scope="row"></td><td class="price"></td><td class="karmatype"></td></tr>'
    };

    var eventData = [];
    $.each(data.incitems, function(index, value) {

        //evblacklist//
        var evBlacklist = ['trait', 'removetrait', 'pawn', 'replacetrait', 'backpack'];
        if (evBlacklist.indexOf(value["abr"]) != -1){
            return;
        }

        if (value["price"] > 0) {
            eventData.push(value);
        }
    });

    eventList = new List('events', options, eventData);
});

let traitList = null;
let raceList = null;
$.getJSON(shopExtURL, function(data) {    
    var options = {
        valueNames: ['name', 'addPrice', 'removePrice'],
        item: '<tr><td class="name" scope="row"></td><td class="addPrice"></td><td class="removePrice"></td></tr>'
    };
    var traitData = [];
    $.each(data.traits, function(index, value) {
        if (value["addPrice"] > 0) {
            traitData.push(value);
        }
    });

    traitList = new List('traits', options, traitData);

    options = {
        valueNames: ['defName', 'price'],
        item: '<tr><td class="defName" scope="row"></td><td class="price"></td>'
    };
    var racesData = [];
    $.each(data.races, function(index, value) {
        if (value["price"] > 0) {
            racesData.push(value);
        }
    });

    racesList = new List('races', options, racesData);
});

$("#item-price-min").keyup(function() {
    updateItemFilter();
});

$("#item-price-max").keyup(function() {
    updateItemFilter();
});

function updateItemFilter() {
    var minPrice = $("#item-price-min").val();
    var maxPrice = $("#item-price-max").val();
    itemList.filter(function(item) {
        var allow = true;
        if (minPrice != "" && parseInt(item.values().price) < minPrice) {
            allow = false;
        }
        if (maxPrice != "" && parseInt(item.values().price) > maxPrice) {
            allow = false;
        }
        return allow;
    });
    eventList.filter(function(item) {
        var allow = true;
        if (minPrice != "" && parseInt(item.values().price) < minPrice) {
            allow = false;
        }
        if (maxPrice != "" && parseInt(item.values().price) > maxPrice) {
            allow = false;
        }
        return allow;
    });
    traitList.filter(function(item) {
        var allow = true;
        if (minPrice != "" && parseInt(item.values().price) < minPrice) {
            allow = false;
        }
        if (maxPrice != "" && parseInt(item.values().price) > maxPrice) {
            allow = false;
        }
        return allow;
    });
    raceList.filter(function(item) {
        var allow = true;
        if (minPrice != "" && parseInt(item.values().price) < minPrice) {
            allow = false;
        }
        if (maxPrice != "" && parseInt(item.values().price) > maxPrice) {
            allow = false;
        }
        return allow;
    });
}

var tabs = angular.module('tabs', [])
    .controller('tabCtrl', function($scope) {
        $scope.selected = "1";
    });