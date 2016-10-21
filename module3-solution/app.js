(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .directive('foundItems', FoundItems);

function FoundItems()
{
  var ddo = {
    restrict: 'E',
    scope: {
      items: '<found'
    },
    templateUrl: 'foundItems.html'
  };

  return ddo;
};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService)
{
  var controller = this;

  controller.searchTerm = "";
  controller.found = [];

  controller.searchItems = function()
  {
      var searchPromise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);

      searchPromise.then(function(items)
      {
        controller.found = items;

        console.log(controller.found);
      });
  }
};

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http)
{
  var service = this;

  var serviceUrl = 'https://davids-restaurant.herokuapp.com/menu_items.json';

  service.getMatchedMenuItems = function(searchTerm)
  {
    console.log(searchTerm);

    return $http(
      {
        method: 'GET',
        url: serviceUrl
      }
    ).then(function (response) {
    var allItems = response.data.menu_items;

    var filteredItems = [];

    for (var i = 0; i < allItems.length; i++) {
      var name = allItems[i].name;
      if (name.toLowerCase().indexOf(searchTerm) !== -1) {
        filteredItems.push(allItems[i]);
      }
    }

    console.log(allItems);
    console.log(filteredItems);
        // return processed items
    return filteredItems;
  });

  };
}

})();
