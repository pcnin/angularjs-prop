besgamApp
	.controller('tweets', function( $scope, dataFactory )
    {
        var now = new Date();
        $scope.offsetutc = now.getTimezoneOffset();

        dataFactory.getDataTwitter().then( function(response)
        {
            $scope.tweets = response.data;
        });

        $scope.submit = function(form)
        {
            var href = "./newsletter/" + $scope.email;

            document.location.href = href;
            //document.forms[form].submit();
        };
    });