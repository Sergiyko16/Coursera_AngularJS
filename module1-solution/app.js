(function(){
  'use strict';

  angular.module('LunchCheck', []).controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope)
{
  $scope.message = "";
  $scope.lunch_content = "";

  $scope.check_amount = function()
  {
    var lunchItems = getLunchItems($scope.lunch_content)

    if (lunchItems.length == 0)
    {
      $scope.message = "Please enter data first";      
    }
    else if (lunchItems.length <= 3)
    {
      $scope.message = "Enjoy!";
    }
    else {
       $scope.message = "Too much!";
    }
  };
};

// Removing empty records so that situation like "item1,,,item2" is processed correctly
function getLunchItems(lunchContent)
{
  var originalLunchItems = lunchContent.split(',');

  var polishedLunchItems = new Array();
  for (var i = 0; i < originalLunchItems.length; i++) {
    if (originalLunchItems[i]) {
      polishedLunchItems.push(originalLunchItems[i]);
    }
  }

  return polishedLunchItems;
}

})();
