besgamApp
	.controller("bonusControllerFeed", function( $rootScope, $scope, $http, $route, dataFactory)
    {
        $scope.bonus = {};

        dataFactory.getDataBonos().then(function(response)
        {
            for ( var index = 0; index < response.data.length; index ++)
            {
                if(response.data[index].id_bono == $route.current.params.record )
                {
                    $rootScope.title = response.data[index].str_title_web;
                    $rootScope.description = response.data[index].str_description;
                    $rootScope.keywords = response.data[index].str_keywords;

                    return $scope.bonus = response.data[index];   
                }
            }
        });      
    });