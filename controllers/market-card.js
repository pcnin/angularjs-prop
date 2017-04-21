besgamApp
	.controller("marketCard", function( $scope, $http, $location, $rootScope, $sessionStorage, dataFactory )
    {
        $scope.$storage = $sessionStorage;

        $scope.$on( 'LOAD', function(){ $scope.loading = true } );
        $scope.$on( 'UNLOAD', function(){ $scope.loading = false } );

        $scope.$emit('LOAD');
        
        //$localStorage.$reset();
        var expreg   = new RegExp("^/apuestas/([^/]*)/([^/]*)/([^/]*)/([^/]*)/$"),
            excrt    = new RegExp("com/(.*?)/"),
            getCtr   = excrt.exec($location.$$absUrl),
            country  = getCtr == null ? 'com' : getCtr[1],
            param    = expreg.exec($location.url()),
            id       = param[3],
            sportID  = param[4], 
            confEvent = {
                method: 'GET',
                url: 'json/events/'+id+'.json', 
                params: {'_':new Date().getTime()}, 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            },
            confUser = {
                method: 'POST',
                url: 'php/getFavorites.php', 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                data :'iduser ='+ $scope.$storage.iduser
            },
            confGetEvent = {
                method: 'POST',
                url: 'php/getEvent.php', 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                data: 'id=' + id + '&sportID=' + sportID + "&country=" + country + "&markets[]"
            };

        /* Variables globales */
        $scope.id = id;
        $scope.sportID = sportID;
        $rootScope = new Array();
        $scope.selected = 0;
        $scope.is_favorite = 0;             // si es el filtro de favoritos
        $scope.exist_favorite = 0;          // si existen cuotas en los mercados favoritos
        $scope.draw_filter = new Array();   // filtros con cuotas
        $scope.is_promo = 0;                // saber si el evento tiene o no promos


        /* Comprobar si el evento esta caducado */
        dataFactory.getDataJson().then( function( response )
        {
            var dataPortrait = response.data;
            var date_event_update = null;
            var exist_event = false;
            for(var i=0;i< dataPortrait.length; i++)
            {
                if(dataPortrait[i]['id'] == $scope.id)
                {
                    date_event_update = dataPortrait[i]['update']; 
                    exist_event = true;
                    $scope.is_promo = dataPortrait[i]['promo'];
                    break;
                }    
            }

            if(!exist_event)
                /* Evento caducado */
                document.location.href = "./expired-event";
                //$location.path("expired-event");

            /* Carga de datos de feeds */
            dataFactory.getDataFeed().then( function(response)
            {
                $scope.feed = response.data;

                /* Carga de datos de filtros */
                dataFactory.getDataMarkets().then( function(response)
                {
                    $scope.filter = response.data.filters[$scope.sportID].filters;

                    $scope.filter.selected = 0;

                    /* Carga evento */
                    $http(confEvent).
                    success(function(dataOneEvent, statusEvent, headers, config) 
                    {
                        if( headers()['content-Type'] != 'application/json' )
                            exist_event = false;
                        
                        /* status 200 o 302 */
                        var date_event_file = headers()['last-modified'],
                            dateJS = new Date(date_event_file),
                            yearJS = dateJS.getUTCFullYear(),
                            monthJS = dateJS.getUTCMonth(),
                            dayJS = dateJS.getUTCDate(),
                            hourJS = dateJS.getUTCHours(),
                            minuteJS = dateJS.getUTCMinutes(),
                            secondJS = dateJS.getUTCSeconds();
                        /* Fecha UTC del json de la ficha */
                        var date_event_file = new Date( yearJS, monthJS,dayJS, hourJS, minuteJS, secondJS );

                        if(exist_event) date_event_update = new Date (date_event_update);

                        if(!exist_event || date_event_file < date_event_update)
                        {
                            /* Generar evento */
                            $http(confGetEvent).
                            success(function(dataTwoEvent, status, headers, config) 
                            {
                                 $scope.getFavorites(dataTwoEvent);
                            }).
                            error(function(data, status, headers, config) 
                            {
                                            
                            });
                        }
                        else
                            $scope.getFavorites(dataOneEvent);

                        $scope.$emit('UNLOAD');
                    }).
                    error(function(data, status, headers, config) 
                    {
                        /* NO EXISTE JSON */
                        /* Generar evento */
                        $http(confGetEvent).
                        success(function(dataTwoEvent, status, headers, config) 
                        {
                            $scope.getFavorites(dataTwoEvent);

                            $scope.$emit('UNLOAD');
                        }).
                        error(function(data, status, headers, config) 
                        {
                            $scope.$emit('UNLOAD');  
                        });
                    });
                    
                });
            });
        });
      
        $scope.getFavorites = function(dataEvent)
        {
            /* Buscar los favoritos del usuario */
            /* Primero se buscan en el localStorage. Si no estan, entonces se va al servidor */
            if($sessionStorage == null)
            {
                $http(confUser).
                    success(function(dataUser, status, headers, config) 
                    {
                        /* Se guardan los datos de los favoritos y del usuario en el localStorage */
                        $sessionStorage.favorites = dataUser.list;
                        $sessionStorage.$save();
                        /* Se gestionan los favoritos de la ficha */
                        $scope.assignFavorites(dataEvent, dataUser.list);
                    }).
                    error(function(data, status, headers, config) 
                    {
                                                                
                    });
            }
            else
            {
                $scope.assignFavorites(dataEvent, $sessionStorage.favorites); 
            }
        };

        $scope.assignFavorites = function (dataEvent, dataFavorites)
        {
            /* Se guardan los datos del evento y del usuario para la ficha */
            $scope.data = dataEvent; 
            $scope.data.favorites = dataFavorites;

            /* Mercados favoritos global para acceder desde cualquier scope */
            $scope.fav_filter_show = dataFavorites;

            /* Index del mercado 'favoritos' */
            $scope.index_favorite = $scope.filter.length -1;

            /* Si hay favoritos, se activa su filtro */
            if($scope.data.favorites!= "" && $scope.data.favorites!= null)
            {
                $scope.filter.selected = $scope.index_favorite;
                
                $scope.filter_show = $scope.data.favorites;
                $scope.selected = $scope.index_favorite;
                $scope.is_favorite = 1;
                $scope.exist_favorite = 0;
                /* Comprobar si hay cuotas de los mercados favoritos */
                angular.forEach($scope.data.markets, function(value, key) 
                {
                    if($scope.data.favorites.indexOf(value.id_market) > -1)
                        $scope.exist_favorite = 1; 
                });     
            }
            else
            {
                /* Mercados del primer filtro */
                $scope.filter_show = $scope.filter[0].list;
                $scope.is_favorite = 0;
                $scope.selected = 0;
            }
            /* Se recorren los datos de los mercados para  pintar o no los filtros */
            angular.forEach($scope.filter, function(valueF, keyF) 
            {
                angular.forEach($scope.data.markets, function(valueM, keyM) 
                {
                    if(valueF.list.indexOf(valueM.id_market) > -1)
                        $scope.draw_filter.push(keyF);
                });
            });   

        };

        /* Filtros de mercados */
        $scope.showFilter = function (nIndex)
        {
            if(nIndex < $scope.index_favorite)
            {
                /* Filtro de un mercado cualquiera */
                $scope.filter_show = $scope.filter[nIndex].list;
                $scope.is_favorite = 0;
                /* comprobar que hay datos de los mercados del filtro */
                $scope.exist_favorite = 0;
                angular.forEach($scope.data.markets, function(value, key) 
                {
                    if($scope.filter_show.indexOf(value.id_market) > -1)
                        $scope.exist_favorite = 1;
                });
            }
            else
            {
                /* Es el filtro de los mercados favoritos */
                $scope.filter_show = $scope.fav_filter_show;
                $scope.is_favorite = 1;
                /* comprobar que hay datos de los mercados del filtro */
                $scope.exist_favorite = 0;
                if($scope.filter_show!= null)
                {
                    angular.forEach($scope.data.markets, function(value, key) 
                    {
                        if($scope.filter_show.indexOf(value.id_market) > -1)
                            $scope.exist_favorite = 1;
                    });
                }
                else
                    $scope.exist_favorite = 1;   
            }
        };

        // /* Indicar si el filtro esta seleccionado */
        // $scope.isSelected = function(nSelection)
        // {
        //     return $scope.selected === nSelection;
        // };

        // /* Selecciona el filtro */
        // $scope.setSelection = function(nSelection)
        // {
        //     $scope.selected = nSelection;
        // };

        /* Añadir/eliminar favorito */
        $scope.checkFavorite = function( nMarket , nType)
        {

            /* Convertir el valor booleano a uno numerico */
            var option= (nType) ? 1 : 0;
                    
            /* Eliminar/añadir el mercado favorito */ 
            var confMarketFavorite = {
                    method: 'POST',
                    url: 'php/getFavorites.php', 
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    data: 'id_market='+nMarket+'&option='+option + '&iduser='+$scope.$storage.iduser
                };

            $http(confMarketFavorite).
            success(function(data, status, headers, config) 
            {
                /* Se actualiza la lista de favoritos */
                $scope.fav_filter_show = data.list;

                /* Se guarda en el localStorage */
                $sessionStorage.favorites = data.list;
                $sessionStorage.$save();
                $scope.$storage.favorites = data.list;
                
               
                /* comprobar que hay datos de los mercados del filtro */
                $scope.exist_favorite = 0;
                if($scope.fav_filter_show != null){
                    // Hay mercados favoritos
                    angular.forEach($scope.data.markets, function(value, key) {
                            if($scope.fav_filter_show.indexOf(value.id_market) > -1)
                               $scope.exist_favorite = 1;
                    });
                }
                else
                    $scope.exist_favorite = 1; 
                
            }).
            error(function(data, status, headers, config) 
            {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };
        
        $scope.getFavoriteContent = function()
        {
            $scope.favText =! $scope.favText;
        };

        
        $scope.trimChar = function( str, len )
        {
            var subStr; 

            if( screen.width < 400 )
            {
                var subStr = str.substr( 0, len );

                if( str.length > len )
                    subStr += "...";
            }
            else
                subStr = str;

            return subStr;
        };

        /* Quita caracteres de una cadena */
        $scope.cutChar = function( str, nChar )
        {
            var temp = str.substr( nChar );

            if( temp.indexOf('|') == -1 )
                return temp;
            else
            {
                var strName = temp.split('|');
                return strName[1];
            }

        };

        $scope.cutIdName = function( str )
        {
            var temp = str.split('|');

            return temp[0].substr(2);
        };


        /* Añade caracteres a una cadena */
        $scope.addChar = function( str, strAdd )
        {
            if( str )
            {
                var str = str.split(".");
                return str[0]+"_on."+str[1];
            }
        };

        $scope.displayRow = function ( position ) 
        {
            /* Visualizar las filas de 3 columnas en el ganador de la competicion */
            if(position%3==0)
                return true;
            else 
                return false;
        };

        // $scope.displayCell = function ( positionRow, index )
        // {
        //     /* Visulaizar las columnas de las filas de 3 en el ganador de la competicion */
        //     if(index >= positionRow && index <= ( positionRow + 2 ) )
        //         return true;
        //     else
        //         return false;
        // };

        // $scope.emptyCells = function ( position )
        // {
        //     if( !$scope.data) return;

        //     /* Calcula el numero de celdas vacias para completar una fila */ 
        //     var length_data = Object.keys($scope.data.markets[position].str_bet).length;
           
        //     return ( 3 - length_data % 3 ) ;
        // };

        // $scope.numberRow = function ( position )
        // {
        //     /* Calcula el index de la fila donde añadir las celdas vacias*/
        //     var length_data = Object.keys($scope.data.markets[position].str_bet).length;
            
        //     return ( Math.floor(length_data / 3 ) * 3);
        // };

        // $scope.getInfo = function ( index )
        // {
        //     /* Retorna el texto de info del mercado por su identificador */
        //     return $scope.infoMarket[index];
        // };       
    });