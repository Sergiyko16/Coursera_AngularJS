(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .directive('foundItems', FoundItems)
  .controller('FoundItemsController', FoundItemsController)
  .constant('ServiceUrl','https://davids-restaurant.herokuapp.com/menu_items.json');

function FoundItems()
{
  var ddo = {
    restrict: 'E',
    scope: {
      items: '<found',
      remove: '&',
    },
    templateUrl: 'foundItems.html',
    controller: FoundItemsController,
    controllerAs: 'ctrl',
    bindToController : true
  };

  return ddo;
};

function FoundItemsController()
{
  var ctrl = this;
}

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
      });
  }

  controller.remove = function(index)
  {
    controller.found.splice(index, 1);
  }
};

MenuSearchService.$inject = ['$http', 'ServiceUrl'];
function MenuSearchService($http, serviceUrl)
{
  var service = this;

  service.getMatchedMenuItems = function(searchTerm)
  {
    return $http(
      {
        method: 'GET',
        url: serviceUrl
      }
    ).then(function (response) {
        var allItems = response.data.menu_items;

        var filteredItems = [];

        for (var i = 0; i < allItems.length; i++) {
          var name = allItems[i].description;
          if (name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            filteredItems.push(allItems[i]);
          }
        }

        return filteredItems;
      });
  };
}

})();
