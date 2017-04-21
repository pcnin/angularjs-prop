besgamApp
	.controller("bonosController", function( $scope, $http, $location, dataFactory )
    {
        
        $scope.data = [];
        
        /* Datos de los bonos */
        var confBono = {
                method: 'GET',
                url: 'json/dataBono.json',
                params: {'_':new Date().getTime()}, 
                headers: {
                   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };

        /* Se hace la llamada para obtener la info */
        dataFactory.getDataFeed().then( function(response)
        {
            $scope.feed = response.data;

            $http(confBono).
            success(function(data, status, headers, config) 
            {
               
                $scope.besgamSize = 10;
                $scope.data = data;

                $scope.currentPage = 1;

                /*if($scope.besgamSize >= $scope.data.length)
                    $scope.numPerPage = $scope.data.length - 1;
                else*/
                    $scope.numPerPage = $scope.besgamSize;


                $scope.maxSize = 5;

                $scope.setPage = function (pageNo) 
                {
                    window.scrollTo(0,0);
                    //console.log('setpage:' + pageNo);
                    $scope.currentPage = pageNo;
                };
                
                $scope.setPage($scope.currentPage);

            }).
            error(function(data, status, headers, config) 
            {
                                                
            });
     
        });    
    });