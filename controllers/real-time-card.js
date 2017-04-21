besgamApp
	.controller('realTimeCard', function( $scope, $rootScope, $http, $route, $filter, $timeout, $translate, socket, dataFactory, $route, $location ) 
    {
        /* Instanciamos */
        var host = 'http://' + $location.host() + ':8080',
            livevent = $route.current.params.livevent,
            fileChartData = host + "/file/" + livevent + ".txt",
            chartData = [];

        /* Reinicializamos */
        $scope.item = null;
        $scope.payout = 0;
        $scope.chartData = null;
        $scope.active = {
            marketID: null
        };

        $scope.$on( 'LOAD'  , function(){ $scope.loading = true } );
        $scope.$on( 'UNLOAD', function(){ $scope.loading = false } );
        $scope.$on( 'PING'  , function(){ $scope.close   = false } );
        $scope.$on( 'LEAVE' , function(){ $scope.close   = true } );

        $scope.$emit('LOAD');

        var pageBecameVisible = $rootScope.$on('pageBecameVisible', function() 
        {
            //$window.location.reload();
            //$route.reload();
            $scope.$emit('LOAD');
            socket.emit("subscribe", livevent);
            //console.log("onVisible...");
        });

        var pageBecameHidden = $rootScope.$on('pageBecameHidden', function() 
        {
            socket.emit('unsubscribe', livevent);
            //console.log("onHidden...");
        });

        // VisibilityChange.onVisible(function() 
        // {
        // 	//$window.location.reload();
        //     //$route.reload();
        //     $scope.$emit('LOAD');
        //     socket.emit("subscribe", livevent);
        //     //console.log("onVisible...");
        // });

        // VisibilityChange.onHidden(function() 
        // {
        //     socket.emit('unsubscribe', livevent);
        //     //console.log("onHidden...");
        // });

        /* Carga de datos de feeds */
        dataFactory.getDataFeed().then( function( afeed )
        {
            $scope.feed = afeed.data;
            /* Nos suscribimos al live */
            socket.emit("subscribe", livevent);
        });

        $scope.$on('$destroy', function() 
        {
            pageBecameVisible();
            pageBecameHidden();

            //$scope = $scope.$new(true);
            socket.emit('unsubscribe', livevent);
            socket.removeListener();
        });

        socket.on('leave-room', function()
        {
            //$scope.$emit('LEAVE');
            
            if( $scope.loading )
            {
                document.location.href = "./live-list-search";
            }

            //$scope.active.marketID = -1;
        });

        socket.on('reconnect', function(err)
        {
            console.log("reconnect: %s", err);
            $scope.$emit('LOAD');
            socket.emit('subscribe', livevent);
        });

        socket.on('reconnecting', function(err)
        {
            console.log("reconnecting: %s", err);
            $route.reload();
        });

        socket.on('message', function (data) 
        {
            //console.log(data);

            $scope.$emit('PING');

            if( typeof(data.markets) == 'undefined' )
                return data;

            /*******************************************/
            /* Quitamos las casas que no sean del pais */
            /*******************************************/
            for( var nCont = 0, len = data.markets.length;
                 nCont < len;
                 nCont++ )
            {
                for( var nContBet = 0, lenBet = data.markets[ nCont ].bets.length;
                     nContBet < lenBet;
                     nContBet++ )
                {
                    for( var nContData = data.markets[ nCont ].bets[nContBet].data.length-1;
                     nContData >= 0;
                     nContData-- )
                    {
                        if( !$scope.feed[data.markets[ nCont ].bets[nContBet].data[nContData].id_feed] )
                        {
                            data.markets[ nCont ].bets[nContBet].data.splice(nContData, 1);
                        }
                    }
                }
            }



            if( $scope.item == null )
            {
                $scope.chartData = null;

                $scope.chartOptions = {
                    chart: {
                        type: 'lineChart',
                        height: 205,
                        margin : {
                            top: 10,
                            right: 0,
                            bottom: 50,
                            left: 33
                        },
                        color: ['#69c198','#ff6868','#757575'],
                        showLegend: true,
                        showYAxis: true,
                        showXAxis: true,
                        useInteractiveGuideline: true,
                        xAxis: {
                            axisLabel: '',
                            tickFormat: function(d) 
                            {
                                var score = null;
                                
                                angular.forEach( $scope.chartData[ $scope.active.marketID ], function( value, key )
                                {
                                    angular.forEach( value.values, function( data, key )
                                    {
                                        if( data.x == d )
                                            score = data.score;
                                    });
                                });

                                return d3.time.format('%H:%M:%S')(new Date(d)) + " - " + score;
                            },
                            ticks: 15,
                        },
                        yAxis: {
                            //showMaxMin: false,
                            tickFormat: function(d)
                            {
                                //return parseFloat(d).toFixed(2);

                                return $filter("oddsConverter")(d,2);
                            },
                            ticks: 5,
                        },
                        tooltip: {
                            gravity: 'n'
                        },

                        // legend: {
                        //     vers: 'furious'
                        // },
                        legendPosition: 'right'                        
                    }
                };

                $scope.getMinMax = function( name )
                {
                    if( $scope.chartData == null || $scope.active.marketID == null )
                        return {
                            min: 0,
                            max: 0
                        };

                    var maxVal = null, 
                        minVal = null;

                    if( name == 'Draw' ) name = $translate.instant('graphicMarket.draw');

                    angular.forEach( $scope.chartData[ $scope.active.marketID ], function( bet )
                    {
                        if( bet.key == name )
                        {
                            angular.forEach( bet.values, function( value )
                            {
                                minVal = (!minVal || value.y < minVal) ? value.y : minVal;
                                maxVal = (!maxVal || value.y > maxVal) ? value.y : maxVal;
                            });
                        }
                    });

                    return {
                        min: minVal,
                        max: maxVal
                    }
                };


                $http.get(fileChartData)
                    .then( function processFile(response)
                    {
                        var fileList = response.data.split('\n');
                      
                        for( var nCont = 0, len = fileList.length;
                             nCont < len;
                             nCont++ )
                        {
                            var tokens = fileList[nCont].split('|');

                            for( var nToken = 2, lenToken = tokens.length-1;
                                 nToken < lenToken;
                                 nToken++ )
                            {
                                var aux         = tokens[ nToken ].split('$'),
                                    idMarket    = parseInt(aux[0]),
                                    datas       = aux[1].split(',');

                                if( !chartData[ idMarket ] )
                                {
                                    chartData[ idMarket ] = [];

                                    if( datas.length-1 == 2 )
                                    {
                                        chartData[ idMarket ].push({ values: [], key: data.participants[0].name });
                                        chartData[ idMarket ].push({ values: [], key: data.participants[1].name });
                                    }
                                    else
                                    {
                                        chartData[ idMarket ].push({ values: [], key: data.participants[0].name });
                                        chartData[ idMarket ].push({ values: [], key: $translate.instant('graphicMarket.draw') });
                                        chartData[ idMarket ].push({ values: [], key: data.participants[1].name });
                                    }
                                }

                                if(idMarket == 1 || idMarket == 4 || idMarket == 5 || idMarket == 7 )
                                {
                                    for( var nValues = 0, lenValues = datas.length-1;
                                         nValues < lenValues;
                                         nValues++ )
                                    {
                                        if( chartData[ idMarket ][nValues] )
                                            chartData[ idMarket ][nValues].values.push({x: parseInt(tokens[0]), y: $filter("setDecimal")( parseFloat(datas[nValues]), 2 ), score: tokens[1] });
                                    }
                                }
                            }
                        }

                        if( typeof($scope.active) != 'undefined' )
                        {
                            /* Grafica por defecto */
                            switch( data.sportID )
                            {
                                case 1:
                                    $scope.active.marketID = 1;
                                break;
                                case 2:
                                    $scope.active.marketID = 7;
                                break;
                                case 3:
                                    $scope.active.marketID = 7;
                                break;
                            }
                        }   

                        $scope.chartData = chartData;        
                    });

                /* Carga de datos de feeds */
                dataFactory.getDataFeed().then( function( afeed )
                {
                    $scope.feed = afeed.data;

                    dataFactory.getDataMarkets().then( function( amarket )
                    {
                        $scope.marketsData = amarket.data.markets;

                        $scope.filterList = (function( filters, markets, data )
                        {
                            var aFilters = [];

                            angular.forEach( filters.filters, function(filter, key) 
                            {
                                if( filter.name != 'Favoritos' )
                                {
                                    var aMarkets = [],
                                        fFind = false;

                                    angular.forEach( filter.list, function( market, key )
                                    {
                                        angular.forEach( data.markets, function( dMarket, key )
                                        {
                                            if( market == dMarket.id )
                                            {
                                                aMarkets.push( markets[ market ] );
                                                fFind = true;
                                            }
                                        });
                                    });

                                    if( fFind )
                                    {
                                        aFilters.push({
                                            id: filter.idFilter,
                                            name: filter.name,
                                            markets: aMarkets
                                        });
                                    }
                                }
                            });

                            return aFilters;
                            
                        })( amarket.data.filters[ data.sportID ], amarket.data.markets, data );
                    });
                });
            }
            else
            {
                if( $scope.chartData )
                {
                    var dd = angular.copy($scope.chartData); 
                    // for( var nCont = 0, len = $scope.item.markets.length;
                    //      nCont < len;
                    //      nCont++ )
                    // {
                    //     for( var nContBet = 0, lenBet = $scope.item.markets[ nCont ].bets.length;
                    //          nContBet < lenBet;
                    //          nContBet++ )
                    //     {
                    //         dd[nCont].values.push({x: parseInt(Date.now()), y: parseFloat($scope.item.markets[nCont].bets[nCont].data[0].n_odd) });
                    //     }
                    // }

                    angular.forEach( $scope.item.markets, function(market, marketKey) 
                    {
                        if(market.id == 1 || market.id == 4 || market.id == 5 || market.id == 7 )
                        {
                            angular.forEach( market.bets, function(bet, betKey) 
                            {
                                var score = null;

                                if( $scope.item.info.score == null ) 
                                    score = '';
                                else
                                {
                                    if( $scope.item.sportID != 3 )
                                        score = $scope.item.info.score.replace(/ /g, '');
                                    else
                                    {
                                        var set = $scope.item.info.set != null ? " ( " + $scope.item.info.set + " )" : '';

                                        score = $scope.item.info.score.replace(/ /g, '') + set;
                                    }
                                }

                                if( typeof(dd[market.id]) != 'undefined')
                                    dd[ market.id ][betKey].values.push({x: parseInt(Date.now()), y: $filter("setDecimal")( parseFloat(bet.data[0].n_odd), 2 ), score: score });
                                //$scope.chartData[ market.id ][betKey].values.push({x: parseInt(Date.now()), y: parseFloat(bet.data[0].n_odd), score: score });
                            });
                        }
                    });

                    $scope.chartData = angular.copy(dd); 
                }
            }

            $scope.item = getData( data );
            $scope.log = $filter('orderBy')( $scope.item.log, 'id', true ) || null;
            $scope.titleLog = ($scope.log != null && $scope.log.length > 0) ? $scope.log[0].message : null;
            
            function getData( data )
            {
                if( typeof($scope.marketsTabs) == 'undefined' )
                {
                    $scope.marketsTabs = [];
                    $scope.marketsPayOut = [];

                    for( var nMarkets = 0, lenMarkets = data.markets.length;
                         nMarkets < lenMarkets;
                         nMarkets++)
                    {
                        $scope.marketsTabs.push([]);
                        $scope.marketsPayOut.push([]);

                        for( var nBets = 0, lenBets = data.markets[nMarkets].bets.length;
                             nBets < lenBets;
                             nBets++)
                        {
                            $scope.marketsTabs[ nMarkets ].push(false);
                            $scope.marketsPayOut[ nMarkets ].push(false);
                        }
                    }
                }
                else if( $scope.marketsTabs.length < data.markets.length )
                {
                    for( var nMarkets = $scope.marketsTabs.length, lenMarkets = data.markets.length;
                         nMarkets < lenMarkets;
                         nMarkets++)
                    {
                        $scope.marketsTabs.push([]);
                        $scope.marketsPayOut.push([]);

                        for( var nBets = 0, lenBets = data.markets[nMarkets].bets.length;
                             nBets < lenBets;
                             nBets++)
                        {
                            $scope.marketsTabs[ nMarkets ].push(false);
                            $scope.marketsPayOut[ nMarkets ].push(false);
                        }
                    }
                }

                angular.forEach( data.markets, function( market, mkey )
                {
                    var prob = null;

                    angular.forEach( market.bets, function( bet, bkey)
                    {
                        prob += 1/bet.data[0].n_odd;
                    });

                    var payout = (1/prob)*100;

                    angular.forEach( market.bets, function( bet, bkey)
                    {
                        bet.prob = parseInt( (1/bet.data[0].n_odd)*payout );
                    });

                    market.payout = parseInt(payout);
                });

                //var data = [];
                if( $scope.auxData != null )
                {
                    for( var nCont = 0, len = data.markets.length;
                         nCont < len;
                         nCont++ )
                    {
                        for( var nSubCont = 0, lenSub = $scope.auxData.markets.length, fFind = false;
                            nSubCont < lenSub && fFind == false;
                            nSubCont++ )
                        {
                            if( data.markets[nCont].id == $scope.auxData.markets[nSubCont].id )
                            {
                                for( var nBetCont = 0, lenBet = data.markets[nCont].bets.length;
                                     nBetCont < lenBet;
                                     nBetCont++ )
                                {
                                    for( var nBetSubCont = 0, lenSubBet = $scope.auxData.markets[nSubCont].bets.length;
                                     nBetSubCont < lenSubBet;
                                     nBetSubCont++ )
                                    {
                                        if( data.markets[nCont].bets[nBetCont].name == $scope.auxData.markets[nSubCont].bets[nBetSubCont].name)
                                        {
                                            if( data.markets[nCont].bets[nBetCont].data[0].n_odd < $scope.auxData.markets[nSubCont].bets[nBetSubCont].data[0].n_odd )
                                                data.markets[nCont].bets[nBetCont].data[0].diff = 'down';
                                            else if( data.markets[nCont].bets[nBetCont].data[0].n_odd > $scope.auxData.markets[nSubCont].bets[nBetSubCont].data[0].n_odd )
                                                data.markets[nCont].bets[nBetCont].data[0].diff = 'high';
                                            else
                                                data.markets[nCont].bets[nBetCont].data[0].diff = 'equal';

                                            // for( var nBetDataCont = 0, lenBetData = data.markets[nCont].bets[nBetCont].data.length;
                                            //      nBetDataCont < lenBetData;
                                            //      nBetDataCont++ )
                                            // {
                                            //     if( data.markets[nCont].bets[nBetCont].data[nBetDataCont].n_odd < $scope.auxData.markets[nSubCont].bets[nBetSubCont].data[nBetDataCont].n_odd )
                                            //         data.markets[nCont].bets[nBetCont].data[nBetDataCont].diff = 'down';
                                            //     else if( data.markets[nCont].bets[nBetCont].data[nBetDataCont].n_odd > $scope.auxData.markets[nSubCont].bets[nBetSubCont].data[nBetDataCont].n_odd )
                                            //         data.markets[nCont].bets[nBetCont].data[nBetDataCont].diff = 'high';
                                            //     else
                                            //         data.markets[nCont].bets[nBetCont].data[nBetDataCont].diff = 'equal';
                                            // }
                                        }
                                    }
                                }

                                fFind = true;
                            }
                        }
                    }
                }

                $scope.$emit('UNLOAD');

                return data;
            };

            /* Reemplezamos los datos */
            $scope.auxData = $scope.item;
        });

        $scope.mActive = function( active )
        {
            if( !active ) return true;

            var fFind = false;

            for( nCont = 0, len = $scope.item.markets.length;
                 nCont < len && fFind == false;
                 nCont++ )
            {
                if( $scope.item.markets[nCont].id == active )
                    fFind = true;
            }

            return fFind;
        };

        $scope.getLiveDrop = function( parent, id )
        {
            return $scope.marketsTabs[parent][id] =! $scope.marketsTabs[parent][id];
        }
        $scope.getLivePayOut = function( parent, id)
        {
            return $scope.marketsPayOut[parent][id] =! $scope.marketsPayOut[parent][id];
        }

    });