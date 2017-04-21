besgamApp
	.controller('tipsterFile', function( $scope, dataFactory, $route, tipster, tipsterOdds )
    {
        /* Instanciamos */
        $scope.aOdds = [];
        

        dataFactory.getDataFeed().then( function(res)
        {
            $scope.feed = res.data;

            /* Param identificador del tipster relacionado con el param del app.es */
            var nick = $route.current.params.nick;

            /* llamada al servicio */
            tipster.data($route.current.params.nick)
            .then(function(res)
            {
                $scope.tipster = {};

                

                if( typeof res != 'undefined' )
                {
                    var cTips, 
                        hTips,
                        data = res[0];
                    

                    tipster.gTips(data.tipster, 'C')
                        .then(function(res)
                        {
                            cTips = res;  

                            tipster.gTips(data.tipster, 'H')
                            .then(function(res)
                            {
                                hTips = res;

                                $scope.tipster = {
                                    data: data,
                                    cTips: cTips,
                                    hTips: hTips
                                };
                            });  

                        });
                }

                
            });

            $scope.getOdds = function( index, value )
            {
                /* llamamos al servicio */
                tipsterOdds.tipBets( value, $scope.feed )
                .then(function(res)
                {
                    $scope.aOdds[index] = res;
                });
            }

            var statisticData = function( obj )
            {
                var arr = [];

                angular.forEach(obj, function(value, key) 
                {
                    this.push({
                        key: key,
                        value: value
                    });
                }, arr);

                return arr;
            };
        });
    });