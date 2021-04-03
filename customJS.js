const itemListURL = "https://raw.githubusercontent.com/spoonerton/Spoons-Shop/master/StoreItems.json";
const eventListURL = "https://raw.githubusercontent.com/spoonerton/Spoons-Shop/master/StoreIncidents.json";

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
        //blacklist//
        if (value["abr"] == ('pawn' || 'trait' || 'surgery' || 'replacetrait' || 'removetrait' || 'backpack')){
            return;
        }

        if (value["price"] > 0) {
            eventData.push(value);
        }
    });

    eventList = new List('events', options, eventData);
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
}

var tabs = angular.module('tabs', [])
    .controller('tabCtrl', function($scope) {
        $scope.selected = "1";
    });