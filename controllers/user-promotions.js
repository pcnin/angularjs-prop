besgamApp
	.controller("userPromotions", function( $scope, $http, $location, dataFactory, $sessionStorage, $translate, timeOut)
    {

        /* Controlar que se esta en sesion */
        var session = timeOut.timeOut();

        $scope.dataPromo = [];
        $scope.textInfo ="Cargando datos...";
        $scope.$storage = $sessionStorage;
        
        var confPromo = {
            /* Datos de las promociones */
                method: 'GET',
                url: 'json/dataPromo.json',
                params: {'_':new Date().getTime()}, 
                headers: {
                   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };
           
        
        /* Se hace la llamada para obtener la info  de las casas y de las promos*/
        dataFactory.getDataFeed().then( function(response)
        {
            /* Datos de las casas */
            $scope.feed = response.data;

            $http(confPromo).
            success(function(data, status, headers, config) 
            {
                /* Guardar las promos */

                $scope.dataPromo = data;

                /* Expirar las promociones desde el cliente */
                var today = new Date();

                angular.forEach($scope.dataPromo, function(value, key) {
                    if(new Date(value.date_end) < today)
                    {
                            value.is_expired = 1;
                    } 
                });


                /* Paginacion */
                $scope.totalData = ($scope.dataPromo.length-10);
                $scope.currentPage = 1;
                $scope.numPerPage = 10;
                $scope.maxSize = 5;

                $scope.setPage = function (pageNo) 
                {
                    window.scrollTo(0,0);
                    $scope.currentPage = pageNo;
                };
                
                $scope.setPage($scope.currentPage);
                $translate('promotions.noPromo').then(function (translation) //"Actualmente no tenemos promociones disponibles.";
                {
                    $scope.textInfo = translation;
                });

            }).
            error(function(data, status, headers, config) 
            {
                                                
            });
     
        });

       

        /* Cambiar los estilos d elas promo segun su tipo */
        $scope.changeClassGround = function(is_important,is_registered, is_expired)
        {
            if(is_important==1)
                return 'user-promo-dest';
            else
                if(is_registered=='1' && is_expired==0)
                    return 'user-promo-favorite';
                else
                    return 'user-promo';
        }

        $scope.changeClassPromo = function(is_important)
        {
            if(is_important==1)
                return 'imagen-casa';
            else if(is_important==0)
                return 'user-imagen-casa-promo';

        }
    });