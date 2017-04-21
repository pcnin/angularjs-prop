besgamApp
    .controller('realTimeList', function( $scope, $rootScope, $window, $translate, dataFactory, socket, $route, $filter )
    {
        $scope.data = null;
        $scope.auxData = null;
        $scope.dataFilter = null;
        $scope.selectedInput = [];
        $scope.$on( 'LOAD', function(){ $scope.loading = true } );
        $scope.$on( 'UNLOAD', function(){ $scope.loading = false } );

        /* Paginación */
        $scope.totalData = 0;
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;

        $scope.setPage = function (pageNo) 
        {
            window.scrollTo(0,0);
            $scope.currentPage = pageNo;
        };
        //$scope.setPage($scope.currentPage);

        var nameSport = [
            "",
            "futbol",
            "baloncesto",
            "tenis"
        ];

        $scope.$emit('LOAD');

        var pageBecameVisible = $rootScope.$on('pageBecameVisible', function() 
        {
            //$window.location.reload();
            //$route.reload();
            $scope.$emit('LOAD');
            socket.emit("subscribe", 'list-data-live');
            //console.log("onVisible...");
        });

        var pageBecameHidden = $rootScope.$on('pageBecameHidden', function() 
        {
            socket.emit('unsubscribe', 'list-data-live');
            //console.log("onHidden...");
        });

        // VisibilityChange.onVisible(function() 
        // {
        //     //$window.location.reload();
        //     //$route.reload();
        //     $scope.$emit('LOAD');
        //     socket.emit("subscribe", 'list-data-live');
        //     //console.log("onVisible...");
        // });

        // VisibilityChange.onHidden(function() 
        // {
        //     socket.emit('unsubscribe', 'list-data-live');
        //     //console.log("onHidden...");
        // });


        $scope.$on('$destroy', function() 
        {
            pageBecameVisible();
            pageBecameHidden();
            //$scope = $scope.$new(true);
            socket.emit('unsubscribe', 'list-data-live');
            socket.removeListener();
        });

        /* Carga de datos de feeds */
        dataFactory.getDataFeed().then( function( afeed )
        {
            $scope.feed = afeed.data;
            /* Nos suscribimos al live */
            socket.emit('subscribe', 'list-data-live');
        });

        // socket.on('connect', function()
        // {
        //     socket.emit('subscribe', 'list-data-live');
        // });

        socket.on('disconnect', function(err)
        {
            console.log("disconnect: %s", err);
        });

        socket.on('reconnect', function(err)
        {
            console.log("reconnect: %s", err);
            $scope.$emit('LOAD');
            socket.emit('subscribe', 'list-data-live');
        });

        socket.on('reconnecting', function(err)
        {
            console.log("reconnecting: %s", err);
            $route.reload();
        });

        socket.on('leave-room', function()
        {
            //document.location.href = "./";
        });

        socket.on('message', function (data)
        {
            //console.log( data );

            $scope.data = [];

            for( var nCont = 0, len = data.length;
                 nCont < len;
                 nCont++ )
            {
                var info = data[nCont].info;

                for( var nContBet = 0, lenBet = data[nCont].markets.length;
                     nContBet < lenBet;
                     nContBet++ )
                {
                    if( data[nCont].markets[nContBet].id == 1 ||
                        data[nCont].markets[nContBet].id == 7 )
                    {

                        /*******************************************/
                        /* Quitamos las casas que no sean del pais */
                        /*******************************************/
                        for( var nContData = 0, lenData = data[nCont].markets[nContBet].bets.length;
                             nContData < lenData;
                             nContData++ )
                        {
                            for( var nContOdd = data[nCont].markets[nContBet].bets[nContData].data.length-1;
                             nContOdd >= 0;
                             nContOdd-- )
                            {
                                if( !$scope.feed[data[nCont].markets[nContBet].bets[nContData].data[nContOdd].id_feed] )
                                {
                                    data[nCont].markets[nContBet].bets[nContData].data.splice(nContOdd, 1);
                                }
                            }
                        }

                        if( data && data[nCont].markets[nContBet].bets[0].data && data[nCont].markets[nContBet].bets[0].data.length > 0 )
                        {
                            $scope.data.push({
                                idSport: data[nCont].sportID,
                                sportType: data[nCont].sport,
                                info: info,
                                league: data[ nCont ].league,
                                event: data[ nCont].event,
                                bets: data[nCont].markets[nContBet].bets
                            });
                        }
                    }
                }  
            }

            if( $scope.auxData != null )
            {
                for( var nCont = 0, len = $scope.data.length;
                     nCont < len;
                     nCont++ )
                {
                    for( var nSubCont = 0, lenSub = $scope.auxData.length, fFind = false;
                        nSubCont < lenSub && fFind == false;
                        nSubCont++ )
                    {
                        if( $scope.data[nCont].event == $scope.auxData[nSubCont].event )
                        {
                            for( var nBetCont = 0, lenBet = $scope.data[nCont].bets.length;
                                 nBetCont < lenBet;
                                 nBetCont++ )
                            {
                                for( var nBetSubCont = 0, lenSubBet = $scope.auxData[nSubCont].bets.length;
                                 nBetSubCont < lenSubBet;
                                 nBetSubCont++ )
                                {
                                    if( $scope.data[nCont].bets[nBetCont].name == $scope.auxData[nSubCont].bets[nBetSubCont].name)
                                    {
                                        if( $scope.data[nCont].bets[nBetCont].data[0].n_odd < $scope.auxData[nSubCont].bets[nBetSubCont].data[0].n_odd )
                                            $scope.data[nCont].bets[nBetCont].data[0].diff = 'down';
                                        else if( $scope.data[nCont].bets[nBetCont].data[0].n_odd > $scope.auxData[nSubCont].bets[nBetSubCont].data[0].n_odd )
                                            $scope.data[nCont].bets[nBetCont].data[0].diff = 'high';
                                        else
                                            $scope.data[nCont].bets[nBetCont].data[0].diff = 'equal';
                                    }
                                }
                            }
                        }
                    }
                }
            }

            /* Reemplezamos los datos */
            $scope.auxData = $scope.data;
            $scope.dataFilter = listLiveDataFilter( $scope.auxData );
            $scope.totalData = ($scope.dataFilter.length-10);

            $scope.dataFilter = $filter('orderBy')($scope.dataFilter, ['idSport','event'] );

            //console.log( $scope.dataFilter );


            $scope.liveSports = $scope.data.reduce(function(sum, place) 
            {
                if(sum.indexOf( place.idSport ) < 0) sum.push( place.idSport );

                return sum;
            }, []);

            /* Lista de ligas */
            listLiveLeagues();
        });

        $scope.getSport = function( id )
        {
            return nameSport[ id ];
        };

        var listLiveDataFilter = function( data )
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
                    if( value.idSport == $scope.selectedInput.sport )
                        dataFilter.push(value);
                });
            }
            else
            {
                angular.forEach(data, function(value, key) 
                {
                    dataFilter.push(value);
                });
            }

            // if( $scope.selectedInput.sport != "" && $scope.selectedInput.league != "" )
            // {
            //     angular.forEach(data, function(value, key) 
            //     {
            //         if(value.sport == $scope.selectedInput.sport && value.league == $scope.selectedInput.league )
            //             dataFilter.push(value);
            //     });
                
            // }
            // else if( $scope.selectedInput.sport != "" )
            // {
            //     angular.forEach(data, function(value, key) 
            //     {
            //         if( value.sport == $scope.selectedInput.sport )
            //             dataFilter.push(value);
            //     });
            // }
            // else if( $scope.selectedInput.sport == "" )
            // {
            //     angular.forEach(data, function(value, key) 
            //     {
            //         dataFilter.push(value);
            //     });

            // }

            if( data.length == 0 && dataFilter.length == 0 )
                $scope.$emit('UNLOAD');
            else if( data.length > 0 && dataFilter.length > 0 )
                $scope.$emit('UNLOAD');

            return dataFilter;
        };

        var listLiveLeagues = function()
        {
            $scope.liveLeagues = $scope.data.reduce(function(sum, place) 
            {
                if( place.league != null )
                {
                    if( $scope.selectedInput.sport && $scope.selectedInput.sport != "" )
                    {
                        if (sum.indexOf( place.league ) < 0 && $scope.selectedInput.sport == place.idSport )
                            sum.push( place.league ); 
                    }
                    else
                    {
                        if (sum.indexOf( place.league )  < 0) sum.push( place.league ); 
                    }
                }
                return sum;
            }, []);
        };

        $scope.changeListLive = function()
        {  
            /* Lista de ligas */
            listLiveLeagues();

            /* Lista de Eventos */
            $scope.dataFilter = listLiveDataFilter( $scope.auxData );
        };

        /* Cargamos los datos de las feed */
        dataFactory.getDataFeed().then( function(response)
        {
            $scope.feed = response.data;
        });
    });