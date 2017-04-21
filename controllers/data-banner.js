besgamApp
	 .controller('dataBanner', function( $scope, $http, dataFactory )
    {
    	dataFactory.getDataJson().then( function( json )
    	{
    		dataFactory.getDataFeed().then( function( feed )
    		{
    			/* Ordenación por orden de importancia de las casas de apuestas */
    			var feedOrder = [];
    			for( it in feed.data )
    			{
    				if( Number(feed.data[it].id_feed) )
    					feedOrder[ feed.data[it].n_order ] = Number(feed.data[it].id_feed);
    			};

    			function feedOrdered()
    			{
    				var orderFeed = function( a, b )
				        {
				            return ( feedOrder.indexOf( a ) < feedOrder.indexOf( b ) ) ? -1 :
				                   ( feedOrder.indexOf( a ) > feedOrder.indexOf( b ) ) ? 1 : 0;
				        };

				    return function( a, b )
				    {
				        return ( a['n_odd'] < b['n_odd'] ) ? 1 : 
				               ( a['n_odd'] > b['n_odd'] ) ? -1 : 
				               orderFeed( a['id_feed'], b['id_feed'] );
				    }
    			}

    			dataFactory.getDataBanner().then( function( banner )
		        {	
		        	/* Instanciamos variables */
		        	var exit = false,
		        		infoBanner = [],
		        		find = 0,
		        		data = [];

		        	/* Recorremos los id banner */
		        	banner.data.map( function( item )
		        	{
		        		infoBanner.push( item.id_event );
		        	});

		        	for( var nCont = 0, len = json.data.length;
		        		 nCont < len && !exit;
		        		 nCont++ )
		        	{
		        		if( infoBanner.indexOf(json.data[nCont].id) != -1 )
		        		{
		        			var players = [],
		        				playersName = [],
		        				list_bets = [];

		        			/* Creamos los escudos y nombres */
		        			if( json.data[nCont].shields )
		        			{
		        				playersName = json.data[nCont].event.split(" vs ");
		        				
		        				players = [
									{name: playersName[0], image: json.data[nCont].shields[0] },
									{name: playersName[1], image: json.data[nCont].shields[1] }
								];
		        			}
		        			/* Creamos las cuotas */
		        			if( json.data[nCont].markets )
		        			{
		        				var bets = json.data[nCont].markets.str_bet;

		        				for(var index in bets)
		        				{
		        					/* Definimos su posición */
		        					var pos = index == '1' ? 0 : index == 'X' ? 1 : index == '2' && bets.length == 2 ? 1 : 2;

		        					/* Ordenamos las casas */
		        					bets[index].sort( feedOrdered() );

		        					/* Añadimos los datos */
		        					list_bets[ pos ] = {
		        						name: index,
		        						odd: bets[index][0].n_odd,
		        						namefeed: feed.data[bets[index][0].id_feed].str_feed,
		        						feed: bets[index][0].id_feed,
		        						txtimage: feed.data[bets[index][0].id_feed].str_image,
		        						title: index == 'X' ? 'Empate' : playersName[ parseInt(index)-1 ]
		        					};
		        				}
		        			}

		        			/* Creamos el destacado */
		        			data[infoBanner.indexOf(json.data[nCont].id)] = {
		        				idevent: json.data[nCont].id,
								id_market_type: banner.data[infoBanner.indexOf(json.data[nCont].id)].id_market_type,
								name: json.data[nCont].event,
								time: json.data[nCont].time,
								idleague: json.data[nCont].leagueID,
								league: json.data[nCont].league,
								sport: json.data[nCont].sport,
								idsport: json.data[nCont].sportID,
								players: players,
								list_bets: list_bets,
								url: json.data[nCont].url
		        			};

		        			/* Si tenemos todos los destacados salimos del loop */
							if( ++find == infoBanner.length ) exit = true;
		        		}

		        	}

		        	/* Salida al data  binding */
		            $scope.data = data.filter(Boolean);
		        });
    		});
    	});
    });