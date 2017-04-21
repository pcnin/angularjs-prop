besgamApp
	.controller('recoveryController', function( $scope, $http, $route ) 
    {
        /* Inicializamos variables */
        $scope.showLogin = false;

        /* Recuperamos los parametros */
        var token = $route.current.params.token;

        $scope.submit = function(form) 
        {
            /* Inicializamos el formulario */
            form.rePass.$setValidity('equal', true);
            form.pass.$setValidity('unexpected', true);
            form.pass.$setValidity('tokenOut', true);

            var method = "POST",
                url    = "php/recovery.php",
                data   = "pass="+this.pass+"&token="+token;

            /* Controlamos que las contraseñas coincidan */
            if( this.pass != this.rePass )
                form.rePass.$setValidity('equal', false);

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
            .success( function(data, status, headers, params )
            {
                /* Si nos devuelve un error */
                if( data.error || !angular.isDefined( data.error ) )
                {
                    /* Dependiendo de la respuesta damos el error */
                    switch(data.type) 
                    {
                        case 'TOKEN_ERROR': // El token no es correcto o ha caducado.
                            form.pass.$setValidity('tokenOut', false);
                            break;
                        default: // Error por defecto
                            form.pass.$setValidity('unexpected', false);
                    } 

                    /* Comprobamos errores */
                    $scope.$broadcast('validate-form', form.$name );
                }
                /* Si todo ha ido bien */
                else
                {
                    /* Enseñamos el texto de correcto */
                    $scope.showLogin = true;
                }
            });

        };

        $scope.iniLogin = function() 
        {
            /* Redirigimos al login */
            document.location.href = "./register";
        };
    });