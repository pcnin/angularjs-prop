besgamApp
	.controller("tipsterPanelTips", function( $scope, $http, dataFactory )
    {  
    	dataFactory.getDataJson().then( function(response)
        {
            $scope.dataJson = response.data;
        });

        $scope.eventSelected = function( id, sportID )
        {    	
    		dataFactory.getEventData(id, sportID)
            .then( function( res )
            {
                console.log(res);
            });
    		console.log(id, sportID);
    		

        }

    });