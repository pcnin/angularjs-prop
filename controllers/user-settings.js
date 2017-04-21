besgamApp
	.controller('userSettings', function( $scope, $http, $location, $sessionStorage, vcRecaptchaService, timeOut, $filter, $translate, dataFactory) 
    {

        /* Controlar que se esta en sesion */
        var session = timeOut.timeOut();

        /* Si se ha entrado por facebook o twitter no se puede cambiar la contraseña */
        $scope.showPassBlock = angular.isDefined($sessionStorage.login_external) && $sessionStorage.login_external == 1 ? false : true;

        /* Datos del captcha */
        $scope.response = null;
        $scope.widgetId = null;
        /* Datos de los mercados y filtros */
        $scope.selected_sport  = 0;
        $scope.selected_filter  = 1;
        $scope.selected_market = 1;

        /* Variables para la visualizacion de mensajes */
        $scope.update_favorites = false;
        $scope.error_update_favorites = true; 
        $scope.update_settings = false;
        $scope.error_update_settings = true; 
        $scope.update_user = false;

        $scope.error_delete = true; 
        $scope.delete_user = false;
        
        $scope.$storage = $sessionStorage;

        /* Primer elto del acordeon abierto*/
        $scope.status = {
            isFirstOpen: true
        };

        $scope.model = {
            key: '6LfuiAgTAAAAABTVAVcs1h1SEtBNTnhAT1gHi3uv'
        };

        var confUser = {
                method: 'POST',
                url: 'php/dashboard/getDataUser.php',
                data:'iduser='+ $scope.$storage.iduser,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };
        
        var confSport = {
                method: 'POST',
                url: 'php/dashboard/getDataUserSettings.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };
        // var confMarkets = {
        //         method: 'GET',
        //         url: 'json/markets.json', 
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        //         }
        //     } 

        $scope.setResponse = function (response) {
            //console.info('Response available');
            $scope.response = response;
        };
        $scope.setWidgetId = function (widgetId) {
            //console.info('Created widget ID: %s', widgetId);
            $scope.widgetId = widgetId;
        };

        /* Modificar el src de la img de los deportes */
        $scope.selectUrl = function (item,sport){
           
             if($scope.user_sports.indexOf(item) !== -1 )
                return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(sport)+'-on.svg';
            else
                return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(sport)+'-off.svg';
        };

        /* Hacemos las llamadas para obtener los datos del usuario */
        $http(confUser).
            success(function(data, status, headers, config) 
            {   
                $translate('dashboard.header.count').then(function (translation) // "Evento no disponible en "+feed; 
                {
                    $sessionStorage.nameuser = ! (data.str_name) ? translation : data.str_name.substr(0,6) +"...";
                    $sessionStorage.$save();
                });

                $scope.str_name = (!data.str_name) ? "" : data.str_name;
                $scope.str_email = data.str_email;
                $scope.iduser = data.iduser;

                /*$scope.str_pass = data.str_pass;
                $scope.str_pass_two = data.str_pass;*/
                $scope.str_pass = "";
                $scope.str_pass_two = "";
                $scope.actualpass="00000000";

                $scope.robinson = (data.robinson == "0") ? 0: 1;
                $scope.newsletter = data.newsletter;

              
                $scope.user_favorites = (!data.a_markets) ? [] : data.a_markets.replace('[','').replace(']','').split(',');
                for (elem_market in $scope.user_favorites ) {
                   $scope.user_favorites[elem_market] = parseInt($scope.user_favorites[elem_market], 10); 
                }
                $scope.user_feeds = (!data.a_feed) ? [] : data.a_feed.replace('[','').replace(']','').split(',');
                $scope.user_sports = (!data.a_sport) ? [] : data.a_sport.replace('[','').replace(']','').split(',');
            
                if(!data.str_other_sport)
                   $scope.user_others = [];
                else
                   $scope.user_others = data.str_other_sport.split(',');

                
                /* Datos de las casas, deportes y los filtros de mercados */
                $http(confSport).
                    success(function(data, status, headers, config)
                    {
                        $scope.dataSettings = data;
                        //console.log($scope.dataSettings);
                        dataFactory.getDataFeed().then( function( listFeed )
                        {
                            $scope.dataSettings.feed = listFeed.data;
                        });

                         dataFactory.getDataMarkets().then( function( dataMarketsJSON )
                        {
                        
                            $scope.dataFilters = dataMarketsJSON.data.filters;
                            $scope.dataMarkets = dataMarketsJSON.data.markets;
                            //console.log($scope.dataFilters) ;
                            //console.log($scope.dataMarkets) ;     
                        });
                       
                    }).
                    error(function(data, status, headers, config)
                    {

                    });

            }).
            error(function(data, status, headers, config) 
            {
                        
            });

        /* Actualizar el array de deportes */
        $scope.updateValue = function (structure,valueAdd,strData)
        {
            var index = structure.indexOf(valueAdd);
           
            if(index === -1){
               
                 structure.push(valueAdd); 
                 if(strData!=""){
                    return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(strData)+'-on.svg';
                 }  
                 else{
                     return 1;  
                 }
                    
            }
            else if (index !== -1) 
            {
                structure.splice(index, 1);
                if(strData!="")
                {
                    return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(strData)+'-off.svg';
                }
                else{
                     return 1;  
                 }
            }
               
            //console.log(structure);   
        };

        /*Seleccion de deportes */
        $scope.isSportSelected = function(nSelection)
        {
            
            return $scope.selected_sport == nSelection;
        };

        $scope.setSportSelected = function(nSelection)
        {
            /*$scope.selected_sport = nSelection;
            $scope.selected_filter = 1;
            $scope.selected_market = 1;*/
            $scope.selected_sport = nSelection;
            $scope.selected_filter = 1;
            $scope.selected_market = 1;
        };

        /* Seleccion de filtros */
        $scope.isFilterSelected = function(nFilter,nSport)
        {
            return $scope.selected_sport == nSport && $scope.selected_filter == nFilter;
        };

        $scope.setFilterSelected = function(nFilter,nSport)
        {
             $scope.selected_sport = nSport;
             $scope.selected_filter = nFilter;
        };

        /* Indicar si el mercado esta seleccionado */
        $scope.isMarketSelected = function(nFilter,nSport)
        {
            
            return $scope.selected_sport == nSport && $scope.selected_filter == nFilter;
        };
        
        /* Actualizar el array de deportes */
        $scope.updateFavorites = function(nMarket)
        {
            //console.log($scope.user_favorites);

            var index = $scope.user_favorites.indexOf(nMarket);

            if(index === -1)
                $scope.user_favorites.push(nMarket); 
            else
                $scope.user_favorites.splice(index, 1); 

            //console.log($scope.user_favorites);
        };


        /* Envio de los 3 posibles formularios */
        $scope.submit = function(form) 
        {
            switch (form.$name)
            {
                case 'editForm':

                    /* Se envian los datos para actualizar al usuario */
                    var change_pass = 1;
                    var reload = 0;

                    form.editCaptcha.$setValidity('recaptcha', true);
                    form.str_pass_two.$setValidity('equal', true);
                    form.str_pass_two.$setValidity('unexpected', true);

                    /* Comprobar si se ha modificado la password*/
                    /*if($scope.str_pass == this.str_pass)
                        change_pass = 0;*/
                    if(this.str_pass=="" && this.str_pass_two=="")
                        change_pass = 0;

                    /* Comprobar si se ha modificado el nombre o correo para recargar o no la pagina */
                    if($scope.str_name != this.str_name || $scope.str_email != this.str_email)
                        reload = 1;

                    /* Validar captcha e igualdad de passwords */
                    if( !$scope.response || form.$error.recaptcha )
                        form.editCaptcha.$setValidity('recaptcha', false);
                    
                    if( this.str_pass != this.str_pass_two )
                        form.str_pass_two.$setValidity('equal', false);

                    $scope.$broadcast('validate-form', form.$name );

                    if( form.$invalid )
                        return false;

                    var params = {
                        method: "POST",
                        url: "php/dashboard/updateUser.php",
                        data: "iduser="+this.iduser+"&str_name="+this.str_name+"&str_email="+this.str_email+"&str_pass="+this.str_pass+
                                 "&robinson="+this.robinson+"&newsletter="+this.newsletter+"&change="+change_pass+"&resp="+$scope.response
                                 
                    };
                                   
                    $http( params )
                    .success(function(data, status, headers, params)
                    {
                        /* Si nos devuelve un error */
                        if( data.error )
                        {
                            /* Dependiendo de la respuesta damos el error */
                            switch(data.type) 
                            {
                                case 'EMPTY_ERROR':
                                    form.name.$setValidity("unexpected", false);
                                    break;
                                case 'CAPTCHA_KO': // La respuesta del Captcha no es correcta.
                                    form.editCaptcha.$setValidity('recaptcha', false);
                                    break;
                                default: // Error por defecto
                                    form.str_pass_two.$setValidity('unexpected', false);
                            }    
                        }
                        else
                        {
                            $translate('dashboard.header.count').then(function (translation) // "Evento no disponible en "+feed; 
                            {
                                $sessionStorage.nameuser = !(data.str_name) ? translation : data.str_name.substr(0,6)+"...";
                                $sessionStorage.$save();
                                $scope.$storage =  $sessionStorage;
                            });

                            $scope.update_user = true;
                        }

                        $scope.response = null;
                        vcRecaptchaService.reload(0);

                        $scope.$broadcast('validate-form', form.$name );                               
                    })
                    .error(function(data, status, headers, config)
                    {
                        $scope.response = null;
                        vcRecaptchaService.reload(0);
                        form.name.$setValidity("unexpected", false);
                        $scope.$broadcast('validate-form', form.$name );    
                    });

                break;

                case 'settingsForm':

                    /* Enviamos los datos para actualizar las casas y deportes del usuario */

                    /* Creamos la lista de deportes textuales */
                    var str_others = "";

                    angular.forEach(this.user_others, function(value, key) {
                        if(str_others=="")
                            str_others = str_others + value.text ;
                        else
                            str_others = str_others + "," +value.text;
                    });     

                    var params = {
                        method: "POST",
                        url: "php/dashboard/updateUserSettings.php",
                        data:"iduser="+this.iduser+"&user_sports="+$scope.user_sports+"&user_feeds="+ $scope.user_feeds 
                                + "&user_others="+ str_others 
                    };

                    $http( params )
                    .success(function(data, status, headers, params)
                    {
                        /* Activamos la visualizacion de mensajes de respuesta segun el resultado de la llamada */
                        if( data.msg == "KAO")
                            $scope.error_update_settings = true; 
                        else
                        {
                             $scope.error_update_settings = false;
                             $sessionStorage.a_sports = "[" + $scope.user_sports + "]";
                             $sessionStorage.$save();
                        }
                           
                        $scope.update_settings = true;
                      
                    }).error(function(data, status, headers, config)
                    {
                        $scope.error_update_settings = true;
                        $scope.update_settings = true;
                    });       
                
                    break;

                case 'favoritesForm':

                    /* Enviamos los datos para actualizar los favoritos */

                    var params = {
                        method: "POST",
                        url: "php/dashboard/updateUserFavorites.php",
                        data: "iduser="+this.iduser+"&user_markets="+$scope.user_favorites
                    };

                    $http( params )
                    .success(function(data, status, headers, params)
                    {
                        /* Activamos la visualizacion de los mensajes de respuesta segun se hayan podido o no
                        actualizar los favoritos */

                        if( data.msg == "KAO" )
                           $scope.error_update_favorites = true;
                        else
                        {
                            $scope.error_update_favorites = false;

                            $sessionStorage.favorites = $scope.user_favorites;
                            $sessionStorage.$save();
                        }
                           

                        $scope.update_favorites = true;
                      
                    }).error(function(data, status, headers, config)
                    {
                        $scope.error_update_favorites = true;
                        $scope.update_favorites = true;
                    });       
                    break;

                case 'deleteForm':

                    form.deleteCaptcha.$setValidity('recaptcha', true);

                    /* Validar captcha */
                    if( !$scope.response || form.$error.recaptcha )
                        form.deleteCaptcha.$setValidity('recaptcha', false);

                    $scope.$broadcast('validate-form', form.$name );

                    if( form.$invalid )
                        return false;


                    /*Enviamos los datos para borrar el usuario */
                    var params = {
                        method: "POST",
                        url: "php/dashboard/deleteUser.php",
                        data: "iduser="+this.iduser+"&resp="+$scope.response
                    };

                    $http( params )
                    .success(function(data, status, headers, params)
                    {
                        /* Activamos la visualizacion de los mensajes de respuesta segun se haya podido o no dar de baja */

                        if( data.msg == "KAO-BBDD" )
                           $scope.error_delete = true;
                        else if(data.msg == "KAO-CAPTCHA")
                           form.deleteCaptcha.$setValidity('recaptcha', false);
                        else
                        {
                            /* Borrar la sesion del navegador */
                            $sessionStorage.favorites = null;
                            $sessionStorage.iduser = null;
                            $sessionStorage.nameuser = null;
                            $sessionStorage.str_name = null;
                            $sessionStorage.str_email = null;
                            $sessionStorage.a_sports = null;
                            $sessionStorage.sessionid = null;
                            $sessionStorage.other_sport = null;
                            $sessionStorage.expired = 0;
                            $sessionStorage.$save();
                            $sessionStorage.$reset();

                            $location.path('deleteUser').replace();
                        }
                        $scope.response = null;
                        vcRecaptchaService.reload(1);

                        $scope.$broadcast('validate-form', form.$name );    
                                              
                    }).error(function(data, status, headers, config)
                    {
                        $scope.delete_user= true;
                        $scope.error_delete = true;
                        $scope.response = null;
                        vcRecaptchaService.reload(1);
                        
                    });  

                    break;
            }                     
        }; 
    });