besgamApp
	.controller('tipster', function($scope, dataFactory, $route, tipsterOdds, tipster)
    {
        $scope.aOdds = [];
        $scope.events = [];
        $scope.filterEvent = [];

        $scope.selectedInput = {};

        $scope.$on( 'LOAD', function(){ $scope.loading = true } );
        $scope.$on( 'UNLOAD', function(){ $scope.loading = false } );

        $scope.$emit('LOAD');

        $scope.rangeOdd = [
            { odd: 1.1 },
            { odd: 1.2 },
            { odd: 1.4 },
            { odd: 1.6 },
            { odd: 1.8 },
            { odd: 2.0 },
            { odd: 2.2 },
            { odd: 2.5 },
            { odd: 3.0 },
            { odd: 3.5 },
            { odd: 4.0 },
            { odd: 4.5 },
            { odd: 5.0 },
            { odd: 6.0 },
            { odd: 7.0 },
            { odd: 8.0 },
            { odd: 9.0 },
            { odd: 10.0 },
            { odd: 15.0 },
            { odd: 20.0 },
            { odd: 100}
        ];

        $scope.item = [{
            name  : 'RangeOddLow',
            value : 0
        },
        {
            name  : 'rangeOddHigh',
            value : 20
        }];        

        $scope.getOdds = function( id )
        {
            var itemData = $scope.items[id],
                // declaramos la variable aSendData como un array 
                aSendData = [];

            // recorremos el array
            for( var nCont = 0, len = itemData.bet.length;
                nCont < len;
                nCont++)
            {
                // cortamos la cadena por los " | "
                var aTokens = itemData.bet[nCont];  

                // formamos un objeto y le hacemos un push de los cortes de aTokens para poderlos usar 
                aSendData.push( aTokens );
            }

            // llamamos al servicio
            tipsterOdds.tipBets( aSendData, $scope.feed )
            .then(function(res)
            {
                $scope.aOdds[id] = res;
            },
            function(err)
            {
                $scope.aOdds[id].push(res);
            });
        };

        dataFactory.getDataFeed().then( function(res)
        {
            $scope.feed = res.data;

            dataFactory.getDataJson().then( function(res)
            {
                /* Paginación */
                $scope.currentPage = 1;
                $scope.numPerPage = 10;
                $scope.maxSize = 5;

                $scope.setPage = function (pageNo) 
                {
                    //window.scrollTo(0,0);
                    $scope.currentPage = pageNo;
                };

                $scope.events = res.data; //todos los eventos

                $scope.filterEvent = res.data; //todos los eventos que ya están filtrados

                $scope.events.map(function(it)
                {
                    if( it.markets != null )
                        it.tips = parseInt(it.markets.str_bet['1'][0].n_odd);
                    else
                        it.tips = 0;   
                });

                /* Ordenación */
                var orderObj = ['-tips','orderTime'];
                $scope.setOrdered = function( obj )
                {
                    orderObj = obj;
                };
                $scope.ordered = function()
                {
                    return orderObj;
                };
                $scope.changeOrder = function()
                {  
                    if( $scope.selectedInput.date == 1 && $scope.selectedInput.tips == 1 )
                    {
                        $scope.setOrdered(['tips','-orderTime']);
                    }
                    else if( $scope.selectedInput.date == 1 && $scope.selectedInput.tips != 1 )
                    {
                        $scope.setOrdered(['-tips','-orderTime']);
                    }
                    else if( $scope.selectedInput.date != 1 && $scope.selectedInput.tips != 1 )
                    {
                        $scope.setOrdered(['-tips','orderTime']);
                    }                
                    else
                    {
                        $scope.setOrdered(['tips','orderTime']);
                    }   
                };

                /* Ordenación top tipsters acierto, deporte, beneficio, seguidores */
                var orderTip = ['ranking', '-tips.ok', '!-sport[1]', '-sport[1]', '-benefit','-followers'];
                $scope.setOrderedTip = function( obj )
                {
                    orderTip = obj;
                };
                $scope.orderedTip = function()
                {
                    return orderTip;
                };
                $scope.changeTipster = function( filter )
                {
                    if( filter.substring(0, 7) == '-sport[' ) //cogemos los caracateres del string entre las posiciones 0 y 5 y comprobamos que sea igual a sport[
                    {
                        orderTip.map( function ( value, index ) //VALUE es el elemento actual del array que se está procesando // INDEX posición actual del value
                        {
                            if( value.substring(0, 7) == '-sport[' || value.substring(0, 8) == '!-sport[' )
                                orderTip.splice( index, 1 ); //Slice() elimina elementos del array, tanto como hayas indicado en los parámetros
                        }); 

                        orderTip.unshift( filter ); //unshift añade elementos al principio del array
                        orderTip.unshift( '!'+filter ); //unshift añade elementos al principio del array
                    }
                    else
                    {
                        var filterAux;
                        //buscamos el caracter '_' Si no lo tiene, lo añade y viceversa
                        if( filter.charAt(0) != '-' )
                            filterAux = '-'+filter;
                        else
                            filterAux = filter.substr(1);

                        //Recorremos el array orderTip
                        orderTip.map( function ( value, index ) //VALUE es el elemento actual del array que se está procesando // INDEX posición actual del value
                        {
                            if( filter == value || filterAux == value )
                            {
                                orderTip.splice( index, 1 ); //Slice() elimina elementos del array, tanto como hayas indicado en los parámetros
                                orderTip.unshift( filter ); //unshift añade elementos al principio del array
                            }
                        });    
                    }              
                };

                /* Deportes */
                $scope.prematchSports = $scope.events.reduce(function(sum, place) 
                {
                    if(sum.indexOf( place.sportID ) < 0) sum.push( place.sportID );

                    return sum;
                }, []);

                /* Lista de ligas */
                listPrematchLeagues();

                $scope.$emit('UNLOAD');
            });
        });

        var listPrematchDataFilter = function( data )
        {
            var dataFilter = [];

            if( $scope.selectedInput.league != "" )
            {
                angular.forEach(data, function(value, key) 
                {
                    if( value.league == $scope.selectedInput.league )
                        dataFilter.push(value);
                });
            }
            else if( $scope.selectedInput.sport != "" )
            {
                angular.forEach(data, function(value, key) 
                {
                    if( value.sportID == $scope.selectedInput.sport )
                        dataFilter.push(value);
                });
            }
            else
            {
                dataFilter = data;
            }

            return changeRange(dataFilter);
        };

        var listPrematchLeagues = function()
        {
            $scope.prematchLeagues = $scope.events.reduce(function(sum, place) 
            {
                if( place.league != null )
                {
                    if( $scope.selectedInput.sport && $scope.selectedInput.sport != "" )
                    {
                        if (sum.indexOf( place.league ) < 0 && $scope.selectedInput.sport == place.sportID )
                            sum.push( place.league );
                    }
                    else
                    {
                        if (sum.indexOf( place.league ) < 0) 
                            sum.push( place.league );
                    }
                }
                return sum;
            }, []);
        };

        var changeRange = function( data )
        {
            var dataFilter = [];

            angular.forEach( data, function(value, key)
            {
                var fInsert = false;

                if( value.markets )
                {
                    angular.forEach( value.markets.str_bet, function( bet, keyBet)
                    {
                        if( bet[0].n_odd <= parseFloat($scope.rangeOdd[$scope.item[1].value].odd) && bet[0].n_odd >= parseFloat($scope.rangeOdd[$scope.item[0].value].odd) ) fInsert = true;
                    });
                }
                else
                  fInsert = true  

                if( fInsert ) dataFilter.push( value );
            });

            return dataFilter;
        };

        $scope.changeListPrematch = function()
        {  
            /* Lista de ligas */
            listPrematchLeagues();

            $scope.filterEvent = listPrematchDataFilter($scope.events );
        };
        

    });