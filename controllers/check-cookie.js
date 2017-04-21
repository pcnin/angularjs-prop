besgamApp
	.controller('checkCookie', function( $scope, $http, $window )
    {
        /* Ocular capa */
        $scope.layerCookie = false;

       /* Comprobar si el usuario tiene la cookie */
        if( getCookie("besgamCookies") == "" ) 
        {
            /* Mostar capa */
            $scope.layerCookie = true;
            
            angular.element($window).bind("scroll", function() 
            {
                 cookieSave();
            });

            angular.element($window).bind("click", function() 
            {
                 cookieSave();
            });
                
            function cookieSave()
            {
                /* Grabar cookie */
                setCookie("besgamCookies","cookePolitic", 3650);
                /* Ocular capa */
                $scope.layerCookie = false;
                $scope.$apply();  
            }
        }

        /* Damos valor a la cookie */
        function setCookie( cname, cvalue, exdays ) 
        {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "{expires:"+d.toUTCString()+"}";
            document.cookie = cname + "=" + escape(cvalue) + ";expires=" + expires;
        }

        /* Con esta función obtenemos la cookie */
        function getCookie( besgamCookies ) 
        {
            var name = besgamCookies + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
           return "";
        }
    });