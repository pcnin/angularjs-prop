besgamApp
	.controller('ratingCtrl', function( $scope, $http, $sce, $sessionStorage, $location, $translate )
    {
        var params = $location.search();
        var id_feed = params['feed'];

        /* Ponemos el ratin a solo letura y comprobamos el usuario */
        $scope.isReadonly = true;
        $scope.tooltipText = $sce.trustAsHtml('Inicia sesión<br>para poder votar');

        /* Recogemos los varlos de inicio */
        var loadDataFeed = {
            method: 'POST',
            url: 'php/loadDataRating.php',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: 'id_feed=' + id_feed
        };

        $http(loadDataFeed).
        success(function(data, status, headers, config) 
        {
            $scope.rate = data.rate;
        });

        $scope.max = 5;
        $scope.id_feed = id_feed;

        /* Si es un usuario registrado, le permitimos votar */
        if( $sessionStorage.sessionid ) 
        {
            $scope.isReadonly = false;
            $translate('bonus.score').then(function (translation) // 'Haz click para puntuar'
            {
                $scope.tooltipText = $sce.trustAsHtml( translation );
            });
        }

        $scope.ratingClick = function( value )
        {
            /* Si es un usuario registrado, le permitimos votar */
            if( $sessionStorage.sessionid ) 
            {
                var setDataFeed = {  
                    method: 'POST',
                    url: 'php/setDataRating.php',
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    data: 'n_rate=' + value + '&id_feed=' + $scope.id_feed
                };

                $http(setDataFeed).
                  success(function(data, status, headers, config) 
                  {
                      $scope.rate = data.rate;
                  });

                $translate('bonus.vote').then(function (translation) //'Voto emitido<br>Sólo puedes votar una vez cada casa.');
                {
                    $scope.tooltipText = $sce.trustAsHtml( translation );
                });
            }

        };

        $scope.hoveringOver = function(value) 
        {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
        ];
    });