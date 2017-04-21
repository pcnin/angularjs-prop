besgamApp
	.controller('newsletter', function( $scope, $http, $route, $log, vcRecaptchaService )
    {
        $scope.email    = $route.current.params.email;
        $scope.response = null;
        $scope.widgetId = null;
       
        $scope.model = {
            key: '6LfuiAgTAAAAABTVAVcs1h1SEtBNTnhAT1gHi3uv'
        };

        $scope.setResponse = function (response) {
            console.info('Response available');
            $scope.response = response;
        };
        $scope.setWidgetId = function (widgetId) {
            console.info('Created widget ID: %s', widgetId);
            $scope.widgetId = widgetId;
        };

        $scope.submit = function(form) 
        {
          /* Inicializamos valores del formulario */
          form.captcha.$setValidity('recaptcha', true);
          form.email.$setValidity('recurrent', true); 
          form.email.$setValidity('unexpected', true); 
          form.email.$setValidity('sessionko', true);

          /* Controlamos el CaptCha */
          if( !$scope.response || form.$error.recaptcha )
              form.captcha.$setValidity('recaptcha', false);

          /* Comprobamos errores */
          $scope.$broadcast('validate-form', form.$name );

          /* Controlamos la validación del formulario */
          if (form.$invalid)
            return;

          /* Configuración del envío */
          var params = {
            method: 'POST',
            url: 'php/newsletter.php',
            headers: {
                   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
            data: 'email='+this.email+'&resp='+$scope.response
          }  

          /* Llamada al modelo */
          $http( params )
            .success(function(data, status, headers, params) 
            {
                /* Si nos devuelve un error */
                if( data.error || !angular.isDefined( data.error ) )
                {
                    /* Dependiendo de la respuesta damos el error */
                    switch(data.type) 
                    {
                        case 'ALREADY-EXISTS': // El email ya ha sido registrado
                            form.email.$setValidity('recurrent', false); 
                            break;
                        case 'CAPTCHA-KO': // La respuesta del Captcha no es correcta.
                            form.captcha.$setValidity('recaptcha', false);
                            break;
                        case 'SESSION-KO': // Solo se permite 1 inscripción por sesión
                            form.email.$setValidity('sessionko', false);
                            break;
                        default: // Error por defecto
                            form.email.$setValidity('unexpected', false);
                    }

                    /* Reiniciamos el captCha */
                    $scope.response = null;
                    vcRecaptchaService.reload(0);

                    /* Creamos los mensajes de error */
                    $scope.$broadcast('validate-form', form.$name );

                }
                else
                  $scope.respOK = true;

                /* Recogamos el error, si el estatus no es OK */
                if (status != 200) 
                    $log.error(data);
            })
            .error(function(data, status, headers, config) 
            {
              $log.error(data);
            });
        };

        $scope.back = function()
        {
          $scope.send = 0;
        };

        /* Envio de parametros en un formulario */
        var param = function(data) 
        {
          var returnString = '';
          for (d in data)
          {
              if (data.hasOwnProperty(d))
                 returnString += d + '=' + data[d] + '&';
          }
          // Remove last ampersand and return
          return returnString.slice( 0, returnString.length - 1 );
        };
    });