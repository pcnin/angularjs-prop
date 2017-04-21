besgamApp
	.controller("surebet", function( $scope, $http, $location ,$localStorage, $filter, dataFactory )
    {
        $scope.surebets = [];
        $scope.imgLoad = 0;
        $scope.$on( 'LOAD', function(){ $scope.loading = true } );
        $scope.$on( 'UNLOAD', function(){ $scope.loading = false } );


        $scope.$emit('LOAD');
        /* Cargamos los datos de las feed */
        dataFactory.getDataFeed().then( function(response)
        {    
            $scope.feed = response.data;
            /* Cargamos los datos de las feed */
            dataFactory.getDataFeed().then( function(response)
            {    
                $scope.feed = response.data;
                dataFactory.getDataJson().then( function(response)
                {
                    var data  = response.data,
                        aData = [];

                    for( var nCont = 0, len = data.length;
                         nCont < len;
                         nCont++ )
                    {
                        if( data[nCont].markets )
                        {
                            var uno   = 0,
                                pro   = 0,
                                cuota = 0;

                            for(var index in data[nCont].markets.str_bet) 
                            { 
                                uno += 1/data[nCont].markets.str_bet[index][0].n_odd;
                                prob = 1/data[nCont].markets.str_bet[index][0].n_odd;
                                cuota = data[nCont].markets.str_bet[index][0].n_odd;
                            }

                            if( uno < 1 )
                            {
                                var str_bet = {},
                                    auxBet = {},
                                    keys = [],
                                    name = null;

                                for(var index in data[nCont].markets.str_bet) 
                                { 
                                    name    = (index == "1") ? "011" : (index == "X") ? "02X" : "032";

                                    prob    = 1/data[nCont].markets.str_bet[index][0].n_odd;
                                    resProb = (prob*100)/uno;

                                    data[nCont].markets.str_bet[index][0]["prob"] = $filter("setDecimal")( resProb, 2 );

                                    str_bet[ name ] = data[nCont].markets.str_bet[index];
                                    keys.push( name );
                                }

                                keys.sort();

                                for( var nSubContKeys = 0, lenKeys = keys.length;
                                     nSubContKeys < lenKeys;
                                     nSubContKeys++ )
                                {
                                    auxBet[ keys[nSubContKeys] ] = str_bet[ keys[nSubContKeys] ];
                                }

                                 var prob = (prob*100)/uno,
                                    profit = (prob*cuota)-100;

                                aData.push({
                                    "n_id_sport": data[nCont].sportID,
                                    "str_sport": data[nCont].sport,
                                    "id_league": data[nCont].leagueID,
                                    "str_league": data[nCont].league,
                                    "n_id_event": data[nCont].id,
                                    "str_name_event": data[nCont].event,
                                    "str_time_event": data[nCont].orderTime,
                                    "profit": $filter("setDecimal")(profit, 2),
                                    "str_market_name": data[nCont].markets.str_market,
                                    "str_market_short": data[nCont].markets.str_market_short,
                                    "n_result_market": data[nCont].markets.str_bet.length,
                                    "a_markets": {
                                        "id_market": data[nCont].markets.id_market,
                                        "str_market": data[nCont].markets.str_market,
                                        "str_market_short": data[nCont].markets.str_market_short,
                                        "str_description": data[nCont].markets.str_description,
                                        "id_market_group": data[nCont].markets.id_market_group,
                                        "n_order": data[nCont].markets.n_order,
                                        "char_order": data[nCont].markets.char_order,
                                        "str_bet": auxBet
                                    }
                                });
                            }
                        }
                    }

                    $scope.imgLoad = (aData.length == 0) ? 1 : 0;

                    $scope.surebets = aData;
                    $scope.totalData = (aData.length-5);

                    $scope.currentPage = 1;
                    $scope.numPerPage = 6;
                    $scope.maxSize = 5;

                    $scope.setPage = function (pageNo) 
                    {
                        window.scrollTo(0,0);
                        //console.log('setpage:' + pageNo);
                        $scope.currentPage = pageNo;
                    };
                
                    $scope.setPage($scope.currentPage);

                    $scope.$emit('UNLOAD');
                });
            });
        });

        /* Quita caracteres de una cadena */
        $scope.cutChar = function( str, nChar )
        {
            return str.substr( nChar );

        }

        $scope.getIdName = function( id_event, id_market, str_bet )
        {
            return id_event+"|"+id_market+"|"+str_bet;
        };
    });