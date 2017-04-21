besgamApp
	.controller('tipster-list', function($scope, dataFactory, $route, tipster)
    {   
        dataFactory.getDataFeed().then( function(res)
        {
            $scope.feed = res.data;

            dataFactory.getDataJson().then( function(res)
            {
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
                //listPrematchLeagues();

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

        tipster.data().then(function(res)
        {
           $scope.tipster = res;

           /* Paginación */
            $scope.currentTipsterPage = 1;
            $scope.numTipPerPage = 5;
            //$scope.maxSize = 5;

            $scope.setPage = function (pageNo) 
            {
                //window.scrollTo(0,0);
                $scope.currentTipsterPage = pageNo;
                $scope.currentPage = $scope.currentTipsterPage;
            };

            $scope.currentPage = $scope.currentTipsterPage;
            $scope.numPerPage = $scope.numTipPerPage;
            
        });

        $scope.viewPredictions = function(index, eventID)
        {
            $scope.items = [];

            if( $scope.tipsDrp != index )
            {
                $scope.tipsDrp = index;

                //predicciones
                tipster.eTips( eventID )
                .then(function(res)
                {
                   res.map(function(it)
                   {
                        tipster.data( it.tipster )
                        .then(function(resT)
                        {
                            $scope.items.push({

                                ranking: resT[0].ranking,
                                nick: resT[0].nick,
                                mail: resT[0].mail,
                                img: resT[0].img,
                                tipBenefit: resT[0].benefit,
                                tipYield: resT[0].yield,
                                tipStake: resT[0].stake,
                                tips: resT[0].tips,
                                sport: resT[0].sport,

                                comment: it.comment,
                                tipster: it.tipster,
                                stake: it.stake,
                                cuote: it.cuote,
                                bet: it.bet
                            });
                        })
                        .catch(function( e )
                        {
                            console.log("ocurrio un error %s en tipster.data", e );
                        });
                    });
                })
                .catch(function( e )
                {
                    console.log("ocurrio un error %s en tipster.eTips", e );
                });

            }
            else
                $scope.tipsDrp = -1; 

        };

    });