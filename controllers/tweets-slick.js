besgamApp
	 .controller('tweets-slick', function( $scope, dataFactory)
    {

        dataFactory.getDataTwitter().then( function(response)
        {
            $scope.tweets = response.data;
        });

    });