(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService)
{
  var controller = this;

  controller.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

  controller.buyItem = function(index)
  {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService)
{
  var controller = this;

  controller.itemsBought = ShoppingListCheckOffService.getItemsBought();
}

function ShoppingListCheckOffService()
{
  var service = this;

  var itemsToBuy = [];
  var itemsBought = [];

  service.getItemsToBuy = function()
  {
    return itemsToBuy;
  };

  service.getItemsBought = function()
  {
    return itemsBought;
  };

  service.buyItem = function(index)
  {
    var item = itemsToBuy[index];

    itemsBought.push(item);
    itemsToBuy.splice(index, 1);
  }

  itemsToBuy.push({
      name:"Sharks",
      quantity: 10,
  });

  itemsToBuy.push({
      name:"Pokemons",
      quantity: 13,
  });

  itemsToBuy.push({
      name:"Magnets",
      quantity: 3,
  });

  itemsToBuy.push({
      name:"Toothpicks",
      quantity: 5555,
  });

  itemsToBuy.push({
      name:"Rockets",
      quantity: 7,
  });
}

})();
