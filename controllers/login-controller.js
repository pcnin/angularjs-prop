besgamApp
	.controller('loginController', function( $scope, $localStorage, $location, $http, $sessionStorage, vcRecaptchaService, $translate, $route) 
    {
        /* Controlar el pais */
        /* La forma de saber el pais es con el primer parametro de la url  */
        var absUrl = $location.absUrl().replace("http://",'').split('/');

        $scope.country = absUrl[1];
        /* Links de facebook y twitter */
        $scope.linkFacebook = function()
        {
            document.location.href="php/connectFacebook.php?locale=" + $scope.country;
        }
        
        $scope.linkTwitter= function()
        {
            document.location.href="php/connectTwitter.php?locale=" + $scope.country;
        }

        /* Controlar los errores de login con facebook o twitter */
        if(angular.isDefined($route.current.params.exit))
        {
            switch($route.current.params.exit)
            {
                case "1":
                    $translate('register.errorLoginExternal.bbdd').then(function (translation)
                    {
                        $scope.errorExternal = translation;
                    });
                    break;
                case "2":
                    $translate('register.errorLoginExternal.facebookConnect').then(function (translation)
                    {
                        $scope.errorExternal = translation;
                    });
                    break;
                case "3":
                    $translate('register.errorLoginExternal.facebookData').then(function (translation)
                    {
                        $scope.errorExternal = translation;
                    });
                    break;
                case "4":
                    $translate('register.errorLoginExternal.userPass').then(function (translation)
                    {
                        $scope.errorExternal = translation;
                    });
                    break;
                case "6":
                    $translate('register.errorLoginExternal.twitterConnect').then(function (translation)
                    {
                        $scope.errorExternal = translation;
                    });
                    break;
                case "7":
                    $translate('register.errorLoginExternal.twitterData').then(function (translation)
                    {
                        $scope.errorExternal = translation;
                    });
                    break;
                default:
                    $scope.errorExternal = "";
            }
            $scope.errorLoginExternal = true;
            
        }

        
        $scope.response = null;
        $scope.widgetId = null;

        $sessionStorage.$reset();

        $scope.model = {
            key: '6LfuiAgTAAAAABTVAVcs1h1SEtBNTnhAT1gHi3uv'
        };


        $scope.setResponse = function (response) {
            //console.info('Response available');
            $scope.response = response;
        };
        $scope.setWidgetId = function (widgetId) {
            //console.info('Created widget ID: %s', widgetId);
            $scope.widgetId = widgetId;
        };

        $scope.submit = function(form) 
        {
            switch (form.$name)
            {
                case "loginForm":
                    
                    /* Inicializamos valores del formulario */
                    form.passLogin.$setValidity('sqlEmpty', true);
                    form.passLogin.$setValidity('unexpected', true);

                    var method = "POST",
                        url    = "php/login.php",
                        data   = "user="+this.userLogin+"&pass="+this.passLogin + "&locale=" + $scope.country;

                break;
                case "recoverForm":

                    /* Inicializamos valores del formulario */
                    form.hRecover.$setValidity('recaptcha', true);
                    form.userRecover.$setValidity('sqlEmpty', true);
                    form.userRecover.$setValidity('unexpected', true);
                    $scope.send = false;

                    var method = "POST",
                        url    = "php/recover.php",
                        data   = "user="+this.userRecover+"&resp="+$scope.response;

                    /* Controlamos el CaptCha */
                    if( !$scope.response || form.$error.recaptcha )
                        form.hRecover.$setValidity('recaptcha', false);
                break;
                case "createForm":

                     /* Inicializamos valores del formulario */
                    form.hCreate.$setValidity('recaptcha', true);
                    form.createRePass.$setValidity('equal', true);
                    form.createUser.$setValidity('recurrent', true);
                    form.createUser.$setValidity('unexpected', true);

                    var method = "POST",
                        url    = "php/register.php",
                        data   = "user="+this.createUser+"&pass="+this.createPass+"&newsletter="+this.newsletter+
                                 "&robinson="+this.robinson+"&resp="+$scope.response +"&locale=" + $scope.country;

                    /* Controlamos el CaptCha */
                    if( !$scope.response || form.$error.recaptcha )
                        form.hCreate.$setValidity('recaptcha', false);

                    /* Controlamos que las contraseñas coincidan */
                    if( this.createPass != this.createRePass )
                        form.createRePass.$setValidity('equal', false);
                break;

            }

            /* Comprobamos errores */
           $scope.$broadcast('validate-form', form.$name );

            /* Control de formulario */
            if( form.$invalid )
                return false;

            /* Instanciamos datos de la llamada */
            var params = {
                method: method,
                url: url,
                data: data
            };
                              
            /* Llamada al modelo */

            $http( params )
            .success(function(data, status, headers, params)
            {
               
                switch( form.$name )
                {
                    case "loginForm":
                        /* Si nos devuelve un error */
                        if( data.error || !angular.isDefined( data.error ) )
                        {
                            /* Dependiendo de la respuesta damos el error */
                            switch(data.type) 
                            {
                                case 'EMPTY_ERROR': // El usuario o la clave no son correctos.
                                    form.passLogin.$setValidity('sqlEmpty', false);
                                    break;
                                default: // Error por defecto
                                    form.passLogin.$setValidity('unexpected', false);
                            } 
                        }
                        /* Si todo ha ido bien */
                        else
                        {
                            $translate('dashboard.header.count').then(function (translation)
                            {
                                /* Borramos el local storage */
                                $sessionStorage.$reset();
                              
                                /* Aplicamos el localStorage de favoritos , deportes, y demas datos del iduser */
                                $sessionStorage.favorites = data.markets;
                                $sessionStorage.iduser = data.iduser;
                                $sessionStorage.str_name = data.str_name;
                                $sessionStorage.str_email = data.str_email;
                                $sessionStorage.a_sports = data.a_sports;
                                $sessionStorage.other_sport = data.other_sport;
                                $sessionStorage.nameuser = !(data.str_name) ? translation : data.str_name.substr(0,6) + "...";
                                $sessionStorage.sessionid = data.iduser;
                                /* Controlar el tiempo de sesion */
                                var time_in = new Date();
                                $sessionStorage.expired = time_in.getTime();
                                /* Guardamos los valores */
                                $sessionStorage.$save();
                                /* Redirigimos a la home */
                                $location.path('userHome').replace();
                            }); 
                        }  

                    break;
                    case "recoverForm":
                        /* Si nos devuelve un error */
                        if( data.error || !angular.isDefined( data.error ) )
                        {
                            /* Dependiendo de la respuesta damos el error */
                            switch(data.type) 
                            {
                                case 'EMPTY_ERROR': // El usuario o la clave no son correctos.
                                    form.userRecover.$setValidity('sqlEmpty', false); 
                                    break;
                                case 'CAPTCHA_KO': // La respuesta del Captcha no es correcta.
                                    form.hRecover.$setValidity('recaptcha', false);
                                    break;
                                default: // Error por defecto
                                    form.userRecover.$setValidity('unexpected', false);
                            }    
                        }
                        /* Si todo ha ido bien */
                        else
                        {
                            $scope.send = true;
                        }

                        /* Reiniciamos el captCha */
                        $scope.response = null;
                        vcRecaptchaService.reload(0);

                    break;
                    case "createForm":
                        /* Si nos devuelve un error */
                        if( data.error || !angular.isDefined( data.error ) )
                        {
                            /* Dependiendo de la respuesta damos el error */
                            switch(data.type) 
                            {
                                case 'EMAIL_RECURRENT': // La dirección de correo ya existe.
                                    form.createUser.$setValidity('recurrent', false);
                                    break;
                                case 'CAPTCHA_KO': // La respuesta del Captcha no es correcta.
                                    form.hCreate.$setValidity('recaptcha', false);
                                    break;
                                default: // Error por defecto
                                    form.createUser.$setValidity('unexpected', false);
                            }

                            /* Reiniciamos el captCha */
                            $scope.response = null;
                            vcRecaptchaService.reload(1);

                        }
                        /* Si todo ha ido bien */
                        else
                        {

                            $translate('dashboard.header.count').then(function (translation) // "Evento no disponible en "+feed; 
                            {
                                /* Borramos el local storage */
                                $sessionStorage.$reset();
                                /* Aplicamos el localStorage de favoritos y iduser y demas datos*/
                                $sessionStorage.favorites = data.markets;
                                $sessionStorage.iduser = data.iduser;
                                $sessionStorage.nameuser = translation;
                                $sessionStorage.sessionid = data.iduser;
                                $sessionStorage.str_email = data.str_email;
                                $sessionStorage.str_name = "";
                                /* Controlar el tiempo de sesion */
                                var time_in = new Date();
                                $sessionStorage.expired = time_in.getTime();
                                /* Guardamos los valores */
                                $sessionStorage.$save();
                                /* Redirigimos a la home */
                                $location.path('showElection').replace();
                            });
                        }

                    break;

                }     

                $scope.$broadcast('validate-form', form.$name );                                   
            })
            .error(function(data, status, headers, config)
            {
              //$scope.dataReg = data;
            });
                     
         };
    });