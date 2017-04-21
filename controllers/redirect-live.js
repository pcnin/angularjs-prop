besgamApp    
    .controller("redirect-live", function( $scope, $route, $http, $interpolate, $sessionStorage, eventTrack )
    {
        var id_feed   = $route.current.params.id_feed,
            id_bet    = $route.current.params.id_bet,
            id_bid    = $route.current.params.id_bid,
            url       = null,
            confFeed  = {
                method: 'GET',
                url: 'json/feeds.json',
                headers: {
                   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };
         
        /* Traqueamos el evento */
        eventTrack.new({
            name: "redirect",
            category: "live",
            label: id_feed+"-"+id_bet
        });

        /* Carga de datos de feeds */
        $http(confFeed).
        success(function(dataFeed, status, headers, config) 
        {
            $scope.img_feed = dataFeed[ id_feed ].str_image;

            id_bid = dataFeed[ id_feed ].str_bid;

            var getBetSlip = {
                method: 'POST',
                url: 'php/redirect-live.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                data: "id_feed=" + id_feed + "&id_bet=" + id_bet + "&id_bid=" + id_bid + "&id_user=" + $sessionStorage.iduser
            }

            /* Recuperamos datos del evento */
            $http(getBetSlip).
            success(function(dataBet, status, headers, config) 
            {
                /* Componemos la url */
                url = $interpolate( dataBet.url )($scope);
                document.location.href = url;
            });
            
        });
    });