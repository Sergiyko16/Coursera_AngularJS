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
    if ($scope.lunch_content == "")
    {
      $scope.message = "Please enter data first";
      return;
    }

    var lunchItems = $scope.lunch_content.split(',');

    if (lunchItems.length <= 3)
    {
      $scope.message = "Enjoy!";
    }
    else {
       $scope.message = "Too much!";
    }
  };
};

})();
