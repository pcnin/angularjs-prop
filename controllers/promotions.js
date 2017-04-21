besgamApp
	.controller("promotions", function( $scope, $http, $route, $translate, dataFactory )
    {

        var id_promos = $route.current.params.record;
        $scope.data = [];
        $translate('controller.text-result').then(function (translation) // "Cargando datos...";
        {
            $scope.textInfo = translation;
        });

        /* Datos de las promociones */
        var confPromo = {
                method: 'GET',
                url: 'json/dataPromo.json',
                params: {'_':new Date().getTime()}, 
                headers: {
                   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };

        /* Cargamos los datos de las feed */
        dataFactory.getDataFeed().then( function(response)
        {    
            $scope.feed = response.data;

            $http(confPromo).
            success(function(data, status, headers, config) 
            {
               /* Los datos son diferentes si se llega desde el menu o desde el buscador/ficha */
               /* Se llega desde el buscador o desde la ficha */
                if(typeof(id_promos) != "undefined")
                {
                    var a_promos = id_promos.split(','),
                        data_event = [];
                    angular.forEach(data, function(value, key) 
                    {
                        //if(value.id_promo==id_promo)
                        if( a_promos.indexOf( value.id_promo ) != -1 )
                        {
                            value.is_important = 1;
                            data_event.push(value);
                        }
                    });

                    $scope.data = data_event;     
                }    
                else
                    $scope.data = data;


                /* Expirar las promociones desde el cliente */
                var today = new Date();

                angular.forEach($scope.data, function(value, key) {
                    if(new Date(value.date_end) <= today)
                    {
                            value.is_expired = 1;
                    } 
                });


                $scope.currentPage = 1;
                $scope.numPerPage = 10;
                //$scope.maxSize = 5;
               


                $scope.setPage = function (pageNo) 
                {
                    window.scrollTo(0,0);
                    //console.log('setpage:' + pageNo);
                    $scope.currentPage = pageNo;
                };
                
                $scope.setPage($scope.currentPage);
                $translate('promotions.noPromo').then(function (translation) //"Actualmente no tenemos promociones disponibles";
                {
                    $scope.textInfo = translation;
                });
            }).
            error(function(data, status, headers, config) 
            {
                                                
            });
     
        });

        $scope.changeClassGround = function(is_important,is_registered, is_expired)
        {
            if(is_important==1)
                return 'promo-dest';
            else
                if(is_registered=='1' && is_expired==0)
                    return 'user-promo-favorite';
                else
                    return 'promo';

        }

        $scope.changeClassPromo = function(is_important)
        {
            if(is_important==1)
                return 'imagen-casa';
            else if(is_important==0)
                return 'imagen-casa-promo';

        }
    });