besgamApp
	.controller("changeType", function( $scope, $localStorage, $filter, $translate, $route )
    {
       // var filter = $filter('oddsConverter');

        $scope.updateOdd = function( type )
        {

            $localStorage.oddsType = type;
            $localStorage.$save();
            //$scope.$digest();
            // $scope.model = $filter('oddsConverter')($scope.model);
            // $scope.$apply();
            //filter();
            //$route.reload();

        };
        $scope.optionOdd = function( type )
        {
            if( type == $localStorage.oddsType )
                return true;
        };

        $scope.updateLocale = function( type )
        {
            // $scope.$apply =
            $localStorage.language = type;
            $localStorage.locale = type;
            $localStorage.$save();

            $translate.use( $localStorage.language );
        };

        $scope.optionLocale = function( type )
        {
            if( type == $localStorage.language )
                return true;
        };

        $scope.changeTimeOffset = function( offset )
        {
            $localStorage.timeZoneOffset = offset;
            $localStorage.$save();
        };

        $scope.timeZoneOffset = function( offset )
        {
            if( offset == $localStorage.timeZoneOffset )
                return true;
        }
    });