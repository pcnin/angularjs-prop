besgamApp
	.controller('flexslider', function( $scope, dataFactory )
    {
        $scope.slides = [];

        dataFactory.getDataFeed().then( function( response )
        {
            angular.forEach( response.data, function( value, key )
            {
                $scope.slides.push( value );
            });
        });
    });