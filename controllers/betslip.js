besgamApp
	.controller("betslip", function( $scope, $rootScope, $http, $window, $localStorage, $location, $timeout, $translate, dataFactory, dateTime, device )
    {
        $scope.$lStorage = $localStorage;
        $scope.isArray = angular.isArray;
        $scope.tabActive = 0;

        $scope.resetData = function()
        {
            $scope.$lStorage.simple = [];
            $scope.$lStorage.combined = [
                {"bets": -1, "betSlip": [], "totalCombined": {} },
                {"bets": -1, "betSlip": [], "totalCombined": {} },
                {"bets": -1, "betSlip": [], "totalCombined": {} },
                {"bets": -1, "betSlip": [], "totalCombined": {} }
            ];
            $scope.$lStorage.tabActive = 0;
        };

        /* Definimos el localStorage */
        if( angular.isUndefined( $scope.$lStorage.simple ) || 
            angular.isUndefined( $scope.$lStorage.combined ) )
        {
            $scope.resetData();
        }
        /* Control de eventos caducados */
        else
        {
            if( $scope.$lStorage.simple.length > 0 )
            {
                var expirationSimple = false;

                /* Comprobamos si ya existe */
                angular.forEach( $scope.$lStorage.simple, function(value, key) 
                {
                    var isExpiration = dateTime.fExpiration( value.expiration );

                    if( isExpiration )
                    {
                        value.is_expiration = isExpiration;
                        expirationSimple = true;
                    }
                });

                /* Solo buscamos eventos caducados en las cestas combinadas */
                /* si hemos encontrado algun evento caducado en las simples */
                if( expirationSimple )
                {
                    /* Buscamos en las apuestas de combinadas */
                    angular.forEach( $scope.$lStorage.combined, function(value, key) 
                    {
                        angular.forEach( value.bets, function(bet, betKey)
                        {
                            bet.is_expiration = dateTime.fExpiration( bet.expiration );
                        });
                    });
                }
            }
        }

         /* Cargamos los datos de las feed */
        dataFactory.getDataFeed().then( function(response)
        {
            $scope.feed = response.data;
        });

        $rootScope.getIdName = function( id_event, id_market, str_bet )
        {
            return id_event+"|"+id_market+"|"+str_bet;
        };

        $rootScope.addLocal = function( id_element, id_sport, id_league, str_league, id_event, str_event, str_market, str_bet, bet, dt_expiration, default_feed )
        {
            var addSimple = true,      // Inicializamos a TRUE para insertar en simple
                addCombined = true;

            if( $scope.$lStorage.simple.length > 0 )
            {
                /* Comprobamos si ya existe */
                angular.forEach( $scope.$lStorage.simple, function(value, key) 
                {
                    if( value.id_element == id_element )
                    {
                        addSimple = false;
                        addCombined = false;
                        $scope.delSimple( key );

                        // if( $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].bets != -1 )
                        // {
                        //     angular.forEach( $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].bets, function( bet, key )
                        //     {
                        //         if( bet.id_element == id_element )
                        //         {
                        //             addCombined = false;
                        //         }

                        //     });
                        // }
                    }
                });
            }

            if( addSimple || addCombined )
            {
                var bets = {
                    "id_element": id_element,
                    "id_sport": id_sport,
                    "id_league": id_league,
                    "str_league": str_league,
                    "id_event": id_event,
                    "str_event":  str_event,
                    "str_market": str_market,
                    "str_bet": str_bet,
                    "expiration": dt_expiration,
                    "is_expiration": 0,
                    "focus_bet": {
                        "id_feed": bet[0].id_feed,
                        "n_odd": bet[0].n_odd,
                        "id_bet": bet[0].id_bet,
                        "is": 1
                    },
                    "simple_bet": bet[default_feed],
                    "bet": bet,
                    "duplicate": 0
                };

                /* Comprobamos si tenemos otro apuesta del mismo evento */
                bets.duplicate = $scope.duplicate( id_event, $scope.$lStorage.tabActive, 'add' );
                bets.is_expiration = dateTime.fExpiration( dt_expiration );

                /* Se guarda en el localStorage */
                if( addSimple )     // Simple
                    $scope.$lStorage.simple.push(bets);

                if( addCombined )
                {
                    /* Comprobamos que sea array */
                    if( $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].bets == -1 )
                        $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].bets = [];

                    $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].bets.push(bets);
                    $scope.addBetSlip( bets.bet );
                }

                /* Salvamos el localStorage */
                $scope.$lStorage.$save();

                /* Visualizamos la cesta por primera vez */
                /* Y que no sea un dispositivo */
                if( $scope.$lStorage.simple.length == 1 && !device.is() )
                    $rootScope.showBag = 1;

                /* Eliminamos de la directiva */
                $rootScope.$broadcast('add-active-betslip', bets.id_element );
            }
        };

        // function fExpiration( strTime )
        // {
        //     if( !strTime ) return;  // Control para evitar vacios

        //     /* Hora del evento + UTC */
        //     var targetTime = new Date( strTime ),
        //         offsetTime = new Date( targetTime.getTime() + $localStorage.timeZoneOffset );

        //     /* NOW + UTC */
        //     var now     = new Date(),
        //         nowUTC  = new Date( now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds() ),
        //         today   = new Date( nowUTC.getTime() + $localStorage.timeZoneOffset );

        //     return (offsetTime > today ) ? 0 : 1;
        // };

        $scope.duplicate = function( id_event, tabActive, action )
        {
            var duplicate = 0,
                duplicates = [];

            /* Comprobamos si ya tenemos el evento de otra apuesta */
            angular.forEach( $scope.$lStorage.combined[ tabActive ].bets, function(value, key) 
            {
                if( value.id_event == id_event )
                {
                    if( action == 'add' )
                    {
                        value.duplicate = 1;
                        duplicate = 1;
                    }
                    else if( action == 'delete' )
                    {
                        duplicates.push( key );
                    }
                }
            });

            if( duplicates.length < 3 )
            {
                for( var nCont = 0, len = duplicates.length;
                     nCont < len;
                     nCont++ )
                {
                    $scope.$lStorage.combined[ tabActive ].bets[ duplicates[nCont] ].duplicate = 0;
                }
            }


            return duplicate;
        };

        $scope.getMsg = function( focus_bet, duplicate, expiration, feed, str_event )
        {
            if( expiration )
            {
                return $translate.instant('controller.msg-betslip.msg1');
            }
            else if( focus_bet )
            {
                return $translate.instant('controller.msg-betslip.msg2') + feed;
            }
            else
            {
                return $translate.instant('controller.msg-betslip.msg3') + str_event;
            }
        };

        $scope.delSimple = function( id )
        {
            $timeout(function()
            {
                /* Eliminamos de la directiva */
                $rootScope.$broadcast('del-active-betslip', $scope.$lStorage.simple[ id ].id_element );

                /* Buscamos en las apuestas de combinadas */
                angular.forEach( $scope.$lStorage.combined, function(value, key) 
                {
                    angular.forEach( value.bets, function(bet, betKey)
                    {
                        /* Si encontramos la apuesta */
                        if( bet.id_element == $scope.$lStorage.simple[ id ].id_element )
                        {
                            /* Comprobamos eventos duplicados de un mismo evento */
                            $scope.duplicate( $scope.$lStorage.combined[ key ].bets[betKey].id_event, key, 'delete' );

                            $scope.delBetSlip( $scope.$lStorage.combined[ key ].bets[betKey].bet, key );

                            /* Eliminamos la apuesta de la combinada */
                            $scope.$lStorage.combined[ key ].bets.splice( betKey, 1);                        
                        }
                    });
                });

                /* Eliminamos del array simple */
                $scope.$lStorage.simple.splice(id, 1);

                if( $scope.$lStorage.simple.length == 0 )
                    $scope.resetData();

                $scope.$lStorage.$save();
            },400);
        };

        $scope.delSimpleCombined = function( id, tabActive )
        {
            var fSearch = false;

            /* Buscamos en las apuestas de combinadas */
            angular.forEach( $scope.$lStorage.combined, function(value, key) 
            {
                angular.forEach( value.bets, function(bet, betKey)
                {
                    /* Si encontramos la apuesta */
                    if( bet.id_element == $scope.$lStorage.combined[ tabActive ].bets[id].id_element && key != tabActive )
                        fSearch = true;             
                });
            });

            /* Si no encontramos la apuesta en otra vista borramos de la simple */
            if( !fSearch )
            {
                angular.forEach( $scope.$lStorage.simple, function(value, key) 
                {
                    /* Si encontramos la apuesta */
                    if( value.id_element == $scope.$lStorage.combined[ tabActive ].bets[id].id_element )
                    {
                        /* Eliminamos de la directiva */
                        $rootScope.$broadcast('del-active-betslip', $scope.$lStorage.simple[ key ].id_element );

                        /* Eliminamos la apuesta de la simple */
                        $scope.$lStorage.simple.splice(key, 1);
                    }
                });
            }
        };

        $scope.delCombined = function( id, tabActive )
        {
            $timeout(function()
            {
                /* Comprobamos eventos duplicados de un mismo evento */
                $scope.duplicate( $scope.$lStorage.combined[ tabActive ].bets[id].id_event, tabActive, 'delete' );

                $scope.delSimpleCombined( id, tabActive );
                
                if( $scope.$lStorage.simple.length == 0 )
                    $scope.resetData();
                else
                {
                    $scope.delBetSlip( $scope.$lStorage.combined[ tabActive ].bets[id].bet, tabActive );
                    $scope.$lStorage.combined[ tabActive ].bets.splice(id, 1);

                    if( $scope.$lStorage.combined[ tabActive ].bets.length == 0 )
                        $scope.$lStorage.combined[ tabActive ] = {"bets": -1, "betSlip": [], "totalCombined": {} };
                }

                $localStorage.$save();
            },400);
        };

        $scope.delTab = function( id )
        {
            angular.forEach( $scope.$lStorage.combined[ id ].bets, function(bet, bKey)
            {
                $scope.delSimpleCombined( bKey, id);
            });

            $scope.$lStorage.combined[ id ] = {"bets": -1, "betSlip": [], "totalCombined": {} };

            $scope.$lStorage.$save();
        };

        $scope.copyTab = function( active, id )
        {
            if( angular.isArray( $scope.$lStorage.combined[ id ].bets ) )
            {
                $scope.$lStorage.combined[ active ] = angular.copy( $scope.$lStorage.combined[ id ] );

                $scope.$lStorage.$save();

            }
        };
       
        $scope.changeSimple = function( idBet, id )
        {
            $scope.$lStorage.simple[ idBet ].simple_bet = $scope.$lStorage.simple[ idBet ].bet[ id ];
            $scope.$lStorage.$save();
        };

        $scope.totalCombined = function( odd, feed, tabActive )
        {
            var total = 0,
                exit = false;

            if( angular.isUndefined( tabActive) )
                tabActive = $scope.$lStorage.tabActive;

            if( angular.isUndefined( feed ) && angular.isUndefined( odd ) )
            {
                angular.forEach( $scope.$lStorage.combined[ tabActive ].betSlip, function(value, key) 
                {
                    if( value.n_odd > total )
                    {
                        total = value.n_odd;
                        $scope.$lStorage.combined[ tabActive ].totalCombined = {
                            "value": value.n_odd,
                            "feed": value.id_feed
                        };
                    }
                });
            }
            else
            {
                $scope.$lStorage.combined[ tabActive ].totalCombined = {
                    "value": odd,
                    "feed": feed
                };
            }

            /* Modificamos el foco */
            angular.forEach( $scope.$lStorage.combined[ tabActive ].bets, function(value, key) 
            {
                for( var nCont = 0, len = value.bet.length;
                     nCont < len && !exit; nCont++ )
                {
                    if( value.bet[nCont].id_feed == $scope.$lStorage.combined[ tabActive ].totalCombined.feed )
                    {
                        value.focus_bet.id_feed = value.bet[nCont].id_feed;
                        value.focus_bet.n_odd   = value.bet[nCont].n_odd;
                        value.focus_bet.id_bet  = value.bet[nCont].id_bet;
                        value.focus_bet.is      = 1;
                        exit = true;
                    }
                }

                /* No existe la apuesta para la casa seleccionada */
                if( !exit ) value.focus_bet.is = 0;

                /* Volvemos a iniciar la salida */
                exit = false;
            });

            $scope.$lStorage.$save();
        };

        $scope.addBetSlip = function( bets )
        {
            var obj = {},           // Obj para insertar en nuestro boleto
                fSearch = false;    // Comprobar si ya tenemos ese feed

            angular.forEach(bets, function(bet, bKey) 
            {
                angular.forEach( $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].betSlip, function( value, key )
                {
                    if( bet.id_feed == value.id_feed )
                    {
                        value.n_odd = value.n_odd * bet.n_odd;
                        fSearch = true;
                    }
                });

                /* Si no lo encontramos lo insertamos */
                if( !fSearch )
                    $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].betSlip.push({
                        "id_feed": bet.id_feed,
                        "n_odd": bet.n_odd
                    });

                fSearch = false;
            });

            $scope.totalCombined();
        };

        $scope.delBetSlip = function( bets, tabActive )
        {
            angular.forEach(bets, function(bet, bKey) 
            {
                angular.forEach( $scope.$lStorage.combined[ tabActive ].betSlip, function( value, key )
                {
                    if( bet.id_feed == value.id_feed )
                    {
                        value.n_odd = value.n_odd / bet.n_odd;

                        if( value.n_odd <= 1 )
                            $scope.$lStorage.combined[ tabActive ].betSlip.splice(key, 1);
                    }
                });
            });

            $scope.totalCombined( undefined, undefined, tabActive );
        };

        $scope.locationTo = function( str_league, str_event, id_event, id_sport )
        {
            str_league = str_league.replace(/\//g,"-");
            str_league = str_league.replace(/ /g,"-");
            str_event = str_event.replace(/\//g,"-");
            str_event = str_event.replace(/ /g,"-");

            window.location = "./apuestas/" + angular.lowercase(str_league) + "/" + angular.lowercase(str_event) + "/" + id_event + "/" + id_sport + "/"
        };

        $scope.submit = function( type )
        {
            var url = "",
                host = $location.$$absUrl.split("#");

            if( type == 'simple')
            {
                url = "./redirect/" +
                      this.simple.simple_bet.id_feed + "/" +
                      this.simple.id_league + "/" +
                      this.simple.id_event + "/" +
                      this.simple.simple_bet.id_bet + "/" +
                      "0/";
            }
            else if( type == 'combined' )
            {
                var bets = [];

                for( var nCont = 0, len = this.bagCombined.bets.length;
                     nCont < len;
                     nCont++ )
                {
                    if( this.bagCombined.bets[nCont].focus_bet.is )
                        bets.push( this.bagCombined.bets[nCont].focus_bet.id_bet );
                }

                url = "./redirect/" +
                      this.bagCombined.totalCombined.feed + "/" +
                      this.bagCombined.bets[0].id_league + "/" +
                      this.bagCombined.bets[0].id_event + "/" +
                      bets.join() + "/" +
                      "0/";
            }

            $window.open( url, '_blank' );
        };
    });