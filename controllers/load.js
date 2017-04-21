besgamApp
	.controller("load", function( $scope, $http)
    {
        $scope.showMessageLoading=true;
                
                
        $scope.isLoading = function () 
        {
            return $http.pendingRequests.length > 0;
        };

        $scope.$watch($scope.isLoading, function (v)
        {    
            $scope.showMessageLoading=v;              
        })
    });