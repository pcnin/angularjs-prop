besgamApp
	.controller('userHome', function( $scope, $http, $location, dataFactory, $sessionStorage, $route, timeOut, $translate) 
    {
        
        $scope.dataWordpress = [];
        $scope.user_sports = "";

        /* Se viene de facebook o de twitter */
        if(angular.isDefined($route.current.params.iduser))
        {

            /* Obtener los datos del usuario */
            var confUser = {
                method: 'POST',
                url: 'php/dashboard/getDataUser.php',
                data: 'iduser=' + $route.current.params.iduser, 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }
            $http(confUser).
            success(function(data, status, headers, config) 
            {
                $translate('dashboard.header.count').then(function (translation) // "Evento no disponible en "+feed; 
                {
                    /* Borramos el local storage */
                    $sessionStorage.$reset();

                    /* Aplicamos el localStorage de favoritos , deportes, y demas datos del iduser */
                    $sessionStorage.favorites = data.a_markets;
                    $sessionStorage.iduser = data.iduser;
                    $sessionStorage.str_name = data.str_name;
                    $sessionStorage.str_email = data.str_email;
                    $sessionStorage.a_sports = data.a_sport;
                    $sessionStorage.other_sport = data.str_other_sport;
                    $sessionStorage.nameuser = !(data.str_name) ? translation : data.str_name.substr(0,6) + "...";
                    $sessionStorage.sessionid = data.iduser;
                    $sessionStorage.login_external = 1;
                    /* Controlar el tiempo de sesion */
                    var time_in = new Date();
                    $sessionStorage.expired = time_in.getTime();
                    /* Guardamos los valores */
                    $sessionStorage.$save();
                    $scope.$storage = $sessionStorage;
                    
                    /* Datos del usuario y de sus deportes */
                    $scope.user_sports = (!$scope.$storage.a_sports) ? [] : $scope.$storage.a_sports.replace('[','').replace(']','').split(',');
                });
          
            })
            .
            error(function(data, status, headers, config) 
            {
                        
            });

        }
        else
        {
            /* Controlar que se esta en sesion */
            var session = timeOut.timeOut();
            $scope.$storage = $sessionStorage;
            /* Datos del usuario y de sus deportes */
            $scope.user_sports = (!$scope.$storage.a_sports) ? [] : $scope.$storage.a_sports.replace('[','').replace(']','').split(',');
          
        }

        var  confWordpress = {
                method: 'POST',
                url: 'php/dashboard/getBlogPostHome.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            },
            confPromo = {
                method: 'GET',
                url: 'json/dataPromo.json',
                params: {'_':new Date().getTime()}, 
                headers: {
                   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };


        /* Promociones */
        dataFactory.getDataFeed().then( function(response)
        {
            /* Datos de las casas */
            $scope.feed = response.data;

            $http(confPromo).
            success(function(data, status, headers, config) 
            {
                /* Se guardan los datos .Primero las que son para usuarios registrados, luego las destacadas y luego las demas */
                $scope.promos = [];
                var not_two = !($scope.promos.length == 2);
                var no_more = true;
                var promos_add = [];
                var limit = 2;
                var index_register = 0;
                var index_imp = 0;
                var index = 0;

                while(not_two) 
                {
                    /* Usuarios registrados */
                    index_register = 0;

                    while(index_register < data.length && not_two)
                    {
                        /* No esta añadida */
                        if(data[index_register]['user_registered'] == 1 && promos_add.indexOf(data[index_register]['id_promo'])== -1)
                        {
                            $scope.promos.push(data[index_register]);
                            promos_add.push(data[index_register]['id_promo']);
                        }
                        not_two = !($scope.promos.length == limit);
                        index_register++;  
                    }
                    /* Destacadas */
                    index_imp = 0;

                    while(index_imp < data.length && not_two)
                    {
                        if(data[index_imp]['is_important'] == 1 && promos_add.indexOf(data[index_imp]['id_promo'])== -1)
                        {
                            $scope.promos.push(data[index_imp]);
                            promos_add.push(data[index_imp]['id_promo']);
                        }
                        not_two = !($scope.promos.length == limit);
                        index_imp++;  
                    }

                    /* Resto por si no hay */
                    index = 0;
                    
                    while(index < data.length && not_two)
                    {
                        if(promos_add.indexOf(data[index]['id_promo']) == -1)
                        {
                            $scope.promos.push(data[index]);
                            promos_add.push(data[index]['id_promo']);
                        }
                        not_two = !($scope.promos.length == limit);
                        index++;  
                    }
                }
            }).
            error(function(data, status, headers, config) 
            {
                        
            });
        });

        /* Post de la zona tipster */
        $http(confWordpress).
            success(function(data, status, headers, config) 
            {
                data.map( function(item)
                {
                    /* Cambiamos la dirección del blog */
                    var strLink = item.link.split("blog");
                    item.link = './blog/post' + strLink[1];
                    /* Modificamos la imagen */
                    item.imgUrl = item.imgUrl ? item.imgUrl : '/img/blog/default.png';
                });

                /* Se guardan los datos */
                $scope.dataWordpress = data;
            }).
            error(function(data, status, headers, config) 
            {
                        
            });

        
        $scope.$watch('user_sport', function()
        {
            if($scope.user_sport != "")
            {
                dataFactory.getDataJson().then( function(response)
                {

                    /* Si el usuario tiene deportes, los proximos eventos de esos deportes */
                    /* Si no, los proximos eventos como en la portada */
                    /* Primero hay que ordenar los eventos del json por fecha */

                    var dataEventOrder = response.data;
                    var limit = 13; 

                    dataEventOrder.sort(function (a, b) {
                    return (a['orderTime'] > b['orderTime']) ? 1 : ((a['orderTime'] < b['orderTime']) ? -1 : 0);
                    });
                 
                    $scope.events = [];

                    if($scope.user_sports.length == 0)
                    {
                        /* Los 10 primeros */
                        for(var index = 0; index < limit; index++)
                        {
                            $scope.events.push(dataEventOrder[index]);
                        }
                    }
                    else
                    {
                        /* Lista de deporte y condicion de parada */
                        var list_sports_stop = new Object();

                        for(var index=0; index < $scope.user_sports.length; index++)
                        {

                            list_sports_stop[$scope.user_sports[index]] = false;
                        }

                        var not_ten = true; //condicion de parada por tamaño
                        var exist_more = false; //condicion de parada por deporte
                        var list_id_add = new Array();//lista de eventos añadidos
                       

                        /* Mientras no haya 10 eventos y existan eventos para los deportes del usuario */

                        while (not_ten && !exist_more)
                        {
                            /* Para cada deporte */
                            angular.forEach(list_sports_stop, function(value, key) 
                            {
                                /* Para cada evento del portal */
                                if(!value)
                                {
                                    var find_event = value;
                                    for(var id_event = 0; id_event < dataEventOrder.length ; id_event++)
                                    {   
                                        /* Evento del deporte y aun no añadido */
                                        if(dataEventOrder[id_event]['sportID'] == key && 
                                            list_id_add.indexOf(dataEventOrder[id_event]['id']) == -1 && 
                                            $scope.events.length < limit)
                                            {
                                                $scope.events.push(dataEventOrder[id_event]);
                                                list_id_add.push(dataEventOrder[id_event]['id']);
                                                find_event = true;
                                                break;
                                            }
                                    }
                                    list_sports_stop[key] = !find_event;
                                }
                            });
                            
                            /* Comprobar parada por deporte */
                            var continue_sport = false;
                            angular.forEach(list_sports_stop, function(value, key) 
                            {
                                continue_sport = continue_sport || !value;
                                
                            });
                            exist_more = !continue_sport;

                          
                            /* Comprobar parada por eventos */
                            if($scope.events.length >= limit)
                                not_ten = false;
                            
                        }

                        if($scope.events.length <= parseInt(limit,10) -1)
                        {
                            
                            /* Rellenamos por si no tenemos 10 eventos*/
                            var not_enough = true;
                            var index = 0;
                            while(not_enough && index < dataEventOrder.length)
                            {
                                if(list_id_add.indexOf(dataEventOrder[index]['id']) == -1)
                                {
                                    $scope.events.push(dataEventOrder[index]);
                                }
                                    
                                index++;
                                not_enough = !($scope.events.length == limit);
                            } 
                        }  
                    }
                });
            }     
        });

        $scope.selectTitle = function(id, titleFeed, titlePersonal)
        {
            if (parseInt(id,10) > 0)
                return $translate.instant('bonus.generalPage.homeBonus.title'); //"Consigue tu bono de "+ titleFeed + " apuestas";
            else if(parseInt(id,10)== 0)
                return $translate.instant('promotions.linkTitle'); //"Promoción de Besgam";
            else
                return titlePersonal;

        };
    });