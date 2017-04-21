besgamApp
	.controller("redirect", function( $scope, $http, $route, $interpolate, $sessionStorage, $filter, eventTrack, dataFactory )
    {
        var id_feed   = $route.current.params.id_feed,
            id_league = $route.current.params.id_league,
            id_event  = $route.current.params.id_event,
            id_bet    = $route.current.params.id_bet,
            id_bid    = $route.current.params.id_bid,
            url       = null,
            getDataEvent = {
                    method: 'POST',
                    url: 'php/redirect.php', 
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    data: 'id_feed=' + id_feed + '&id_league=' + id_league + "&id_event=" + id_event
                },
            getBetSlip = {
                    method: 'POST',
                    url: 'php/betSlip.php',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    data: 'id_feed=' + id_feed + "&id_bet=" + id_bet + "&id_event=" + id_event + "&id_bid=" + id_bid + "&id_user=" + $sessionStorage.iduser
            }

        /* Traqueamos el evento */
        eventTrack.new({
            name: "redirect",
            category: "prematch",
            label: id_feed+"-"+id_league+"-"+id_event+"-"+id_bet+"-"+id_bid
        });

        /* Carga de datos de feeds */
        dataFactory.getDataFeed().then( function(response)
        {
            var dataFeed = response.data;
            $scope.img_feed = dataFeed[ id_feed ].str_image;

            if( dataFeed[ id_feed ].str_link_bag != "" )
            {
                url = dataFeed[ id_feed ].str_link_bag;

                /* Recuperamos datos del evento */
                $http(getBetSlip).
                success(function(dataBet, status, headers, config) 
                {
                    $scope.id_event = $filter('trim')(id_event);
                    $scope.id_bet = $filter('trim')(dataBet.id_bet);
                    $scope.id_market = $filter('trim')(dataBet.id_market);
                    $scope.str_bid = $filter('trim')(dataBet.str_bid) || $filter('trim')(dataFeed[ id_feed ].str_bid);

                    switch( parseInt(id_feed) ) 
                    {
                        /* INTERWETTEN */
                        case 5:
                            /* Recuperamos datos del evento */
                            $http(getDataEvent).
                            success(function(dataEvent, status, headers, config) 
                            {
                                 /* Control para eventos caducados */
                                if( dataEvent.length == 0)
                                {
                                    dataEvent[0] = {
                                        "id_league": 0,
                                        "id_event": 0,
                                        "link_event": ''
                                    };

                                }

                                $scope.id_feed = id_feed;
                                $scope.id_league = dataEvent[0]['id_league'];
                                $scope.id_event = dataEvent[0]['id_event'];
                                /* Componemos la url */
                                url = $interpolate(url)($scope); 
                                document.location.href = url;
                            });
                        break;
                        default:
                            /* Componemos la url */
                            url = $interpolate(url)($scope);
                            document.location.href = url;
                        break

                    }
                });
            }
            else if( dataFeed[ id_feed ].str_link_event != "" )
            {
                url = dataFeed[ id_feed ].str_link_event;

                /* Recuperamos datos del evento */
                $http(getDataEvent).
                success(function(dataEvent, status, headers, config) 
                {
                    /* Control para eventos caducados */
                    if( dataEvent.length == 0)
                    {
                        dataEvent[0] = {
                            "id_league": 0,
                            "id_event": 0,
                            "link_event": ''
                        };

                    }

                    $scope.id_feed = id_feed;
                    $scope.id_league = dataEvent[0]['id_league'];
                    $scope.id_event = dataEvent[0]['id_event'];
                    switch( parseInt(id_feed) ) 
                    {
                        /* William Hill */
                        case 3:
                            if( dataEvent[0]['link_event'] != "" )
                            {
                                // http://sports.williamhill.com/bet/en-gb/betting/e/8153439/Lee%2dSelby%2dv%2dFernando%2dMontiel
                                var strFrag = dataEvent[0]['link_event'].split(/\/e\//),
                                    strLink = strFrag[1].split('/');

                                $scope.id_event = strLink[0];
                            }
                        break;
                    }
                    /* Componemos la url */
                    url = $interpolate(url)($scope); 
                    document.location.href = url;
                });
            }
            else
            {
                //url = dataFeed[ id_feed ].str_link;
                url = dataFeed[ id_feed ].str_link_bonus;
                document.location.href = url;
            }
        });
    });