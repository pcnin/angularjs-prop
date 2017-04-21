besgamApp
	.controller('nivelesCtrl', function($scope, $window, dataFactory) 
    {
        /* Instanciamos variables */
        $scope.dataJson = [];
        $scope.limit = 3;
        $scope.maxLimit = 8;
        $scope.eventBlock = [];
        $scope.eventData = [];
        $scope.betSlip = [];
        $scope.totalCombined = [];
        $scope.msgActive = false;
        $scope.sportSelect = 0;

        $scope.items = [{
            name  : 'RangeTime',
            value : 3
        },
        {
            name  : 'RangeOddLow',
            value : 4
        },
        {
            name  : 'rangeOddHigh',
            value : 11
        }];

        $scope.rangeTime = [
            { diff: 3600,       range: 1, srange: "hora" },
            { diff: 3600*6,     range: 6, srange: "horas" },
            { diff: 3600*24,    range: 24, srange: "horas" },
            { diff: 3600*48,    range: 48, srange: "horas" },
            { diff: 3600*72,    range: 72, srange: "horas" },
            { diff: 3600*24*7,  range: 7, srange: "días" }
        ];

        $scope.rangeOdd = [
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
            { odd: 10.0 }
        ];

        /* Cargamos los datos de las feed */
        dataFactory.getDataFeed().then( function(response)
        {
            $scope.feed = response.data;
        
            /* Cargamos las apuestas */
            dataFactory.getDataJson().then( function(response)
            {
                $scope.dataJson = response.data;

                $scope.sports = $scope.dataJson.reduce(function(sum, place) 
                {
                    if( sum.indexOf( place.sport ) < 0 ) sum.push(place.sport);

                    return sum;
                }, []);

                $scope.getData = function()
                {
                    $scope.list = $scope.dataJson.reduce(function(sum, place) 
                    {
                        if( !place.markets || ($scope.sportSelect != 0 && $scope.sportSelect != place.sport ) ) return sum;

                        if( fInTime( place.time, $scope.rangeTime[$scope.items[0].value].diff ) )
                        {
                            var addBet = [],
                                objAux = {};

                            if( place.markets.str_bet[1][0].n_odd >=  $scope.rangeOdd[$scope.items[1].value].odd && 
                                place.markets.str_bet[1][0].n_odd <= $scope.rangeOdd[$scope.items[2].value].odd )
                            {
                                addBet.push({
                                    betName: '1',
                                    bet: place.markets.str_bet[1]
                                });
                            }
                           if( place.markets.str_bet[2][0].n_odd >= $scope.rangeOdd[$scope.items[1].value].odd && 
                                place.markets.str_bet[2][0].n_odd <= $scope.rangeOdd[$scope.items[2].value].odd )
                            {
                                addBet.push({
                                    betName: '2',
                                    bet: place.markets.str_bet[2]
                                });
                            }
                            if( place.markets.str_bet['X'] && 
                                place.markets.str_bet['X'][0].n_odd >= $scope.rangeOdd[$scope.items[1].value].odd && 
                                place.markets.str_bet['X'][0].n_odd <= $scope.rangeOdd[$scope.items[2].value].odd )
                            {
                                addBet.push({
                                    betName: 'X',
                                    bet: place.markets.str_bet['X']
                                });
                            }

                            if( addBet.length > 0 )
                            {
                                objAux = {
                                    sport: place.sport,
                                    sportID: place.sportID,
                                    leagueID: place.leagueID,
                                    league: place.league,
                                    id: place.id,
                                    eventN: place.event,
                                    market: place.markets.str_market_short,
                                    is_available: 1
                                };

                                shuffleArray(addBet);
                                objAux.betName = addBet[0].betName;
                                objAux.bet = addBet[0].bet;
                                objAux.focus_bet = {
                                    id_feed: addBet[0].bet[0].id_feed,
                                    n_odd: addBet[0].bet[0].n_odd,
                                    id_bet: addBet[0].bet[0].id_bet
                                }

                                sum.push( objAux );
                            }
                        }
                        return sum;
                    }, []);

                    shuffleArray($scope.list);

                    $scope.list.sort( function( a, b)
                    {
                        if( a["bet"].length > b["bet"].length ) return -1;
                        if( a["bet"].length < b["bet"].length ) return 1;
                        return 0;
                    });

                    if( $scope.list.length >= $scope.limit )
                    {

                        for( var nCont = 0, len = $scope.limit;
                             nCont < len;
                             nCont++ )
                        {
                            if( !$scope.eventBlock[ nCont ] )
                            {
                                $scope.eventData[ nCont ] = $scope.list[ nCont ];
                            }
                        }

                        $scope.betSlip = [];
                        for( var nCont = 0, len = $scope.eventData.length;
                             nCont < len;
                             nCont++ )
                        {
                            $scope.addBetSlip( $scope.eventData[nCont].bet );
                        }

                        return $scope.eventData;
                    }
                    else
                        $scope.msgActive = true;
                }

                $scope.getData();
            });

            $scope.addEvent = function()
            {
                if( $scope.list[ $scope.limit ] && $scope.limit < $scope.maxLimit )
                {
                    $scope.eventData.push( $scope.list[ $scope.limit ] );
                    $scope.addBetSlip( $scope.list[ $scope.limit ].bet );
                    $scope.limit++;
                }
                else
                    $scope.msgActive = true;
            }

            $scope.delEvent = function( id )
            {
                $scope.delBetSlip( $scope.eventData[id].bet );
                $scope.eventData.splice(id, 1);
                $scope.eventBlock.splice(id, 1);
                $scope.list.splice(id, 1);
                $scope.limit--; 
            };

            var fInTime = function( strTime, rangeTime )
            {
                if( !strTime ) return;  // Control para evitar vacios
                var targetTime = new Date( strTime ),
                    offsetTime = new Date(targetTime.getTime() + (targetTime.getTimezoneOffset() * 60 * 1000) * -1 ),
                    today      = new Date(),
                    diffTime   = new Date(today.getTime() + (rangeTime * 1000) );


                return (offsetTime > today && offsetTime < diffTime ) ? 1 : 0;
            };

            var shuffleArray = function(array) 
            {
                var m = array.length, t, i;

                while (m) 
                {
                    i = Math.floor(Math.random() * m--);

                    t = array[m];
                    array[m] = array[i];
                    array[i] = t;
                }

                return array;
            };

            $scope.totalCombinedData = function( odd, feed )
            {
                var total = 0,
                    exit = false;

                if( angular.isUndefined( feed ) && angular.isUndefined( odd ) )
                {
                    angular.forEach($scope.betSlip, function(value, key) 
                    {
                        if( value.n_odd > total )
                        {
                            total = value.n_odd;
                            $scope.totalCombined = {
                                "value": value.n_odd,
                                "feed": value.id_feed
                            };
                        }
                    });
                }
                else
                {
                    $scope.totalCombined = {
                        "value": odd,
                        "feed": feed
                    };
                }

                /* Modificamos el foco */
                angular.forEach($scope.eventData, function(value, key) 
                {
                    for( var nCont = 0, len = value.bet.length;
                         nCont < len && !exit; nCont++ )
                    {
                        if( value.bet[nCont].id_feed == $scope.totalCombined.feed )
                        {
                            value.focus_bet.id_feed = value.bet[nCont].id_feed;
                            value.focus_bet.n_odd   = value.bet[nCont].n_odd;
                            value.focus_bet.id_bet  = value.bet[nCont].id_bet;
                            value.is_available = 1;
                            exit = true;
                        }
                    }

                    /* No existe la apuesta para la casa seleccionada */
                    if( !exit ) value.is_available = 0;

                    /* Volvemos a iniciar la salida */
                    exit = false;
                });


            };

            $scope.addBetSlip = function( bets )
            {
                var obj = {},           // Obj para insertar en nuestro boleto
                    fSearch = false;    // Comprobar si ya tenemos ese feed

                angular.forEach(bets, function(bet, bKey) 
                {
                    angular.forEach( $scope.betSlip, function( value, key )
                    {
                        if( bet.id_feed == value.id_feed )
                        {
                            value.n_odd = value.n_odd * bet.n_odd;
                            fSearch = true;
                        }
                    });

                    /* Si no lo encontramos lo insertamos */
                    if( !fSearch )
                        $scope.betSlip.push({
                            "id_feed": bet.id_feed,
                            "n_odd": bet.n_odd
                        });

                    fSearch = false;
                });

                $scope.totalCombinedData();
            };

            $scope.delBetSlip = function( bets )
            {
                angular.forEach(bets, function(bet, bKey) 
                {
                    angular.forEach( $scope.betSlip, function( value, key )
                    {
                        if( bet.id_feed == value.id_feed )
                        {
                            value.n_odd = value.n_odd / bet.n_odd;

                            if( value.n_odd <= 1 )
                                $scope.betSlip.splice(key, 1);
                        }
                    });
                });

                $scope.totalCombinedData();
            };

            $scope.locationTo = function( str_league, str_event, id_event, id_sport )
            {
                str_league = str_league.replace(/\//g,"-");
                str_league = str_league.replace(/ /g,"-");
                str_event = str_event.replace(/\//g,"-");

                window.open( './apuestas/' + angular.lowercase(str_league) + '/' + angular.lowercase(str_event) + '/' + id_event + '/' + id_sport + '/', '_blank');
            };

            $scope.submit = function(form)
            {
                var id_feed = this.id_feed,
                    id_league = this.id_league,
                    id_event = this.id_event,
                    id_bet = [];

                for( var nCont = 0, len = $scope.eventData.length;
                     nCont < len;
                     nCont++ )
                {
                    id_bet.push( $scope.eventData[nCont].focus_bet.id_bet );
                }

                url = "./redirect/" +
                    id_feed + "/" +
                    id_league + "/" +
                    id_event + "/" +
                    id_bet.join() + "/" +
                    "0/";

                $window.open( url, '_blank' );
            };
        });
    });