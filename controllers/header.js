besgamApp 
    .controller("header", function( $scope, $localStorage, $sessionStorage, $location, $http )
    {
        $scope.$lStorage = $localStorage;
        $scope.$storage = $sessionStorage;

        var url = $location.url(),
            endUrl = url.split("?");

        $scope.isNotHome = function()
        {
            if( ( endUrl[0] == "/search" || endUrl[0] == "/home" || endUrl[0] == "/" ) && !$scope.fScrollData )
                return false;
            else
                return true;
        };

        $scope.$storage = $sessionStorage;

        /* Cerrar la sesion del usuario */
        $scope.closeSession= function()
        {
            /* Si todo ha ido bien, se redirecciona al index y se borra el localStorage*/
            
            $sessionStorage.iduser = null;

            $sessionStorage.expired = 0;
            $sessionStorage.favorites = null;
            $sessionStorage.str_name = null;
            $sessionStorage.str_email = null;
            $sessionStorage.a_sports = null;
            $sessionStorage.other_sport = null;
            $sessionStorage.nameuser = null;
            $sessionStorage.sessionid = null;
            $sessionStorage.$save();
            $sessionStorage.$reset();

            document.location.href = "./";
                    
        };

        $scope.getStrUTC = function()
        {
            var strUTC = (($localStorage.timeZoneOffset / 1000) / 60) / 60,
                strSignal = strUTC < 0 ? '' : '+';

            return 'UTC'+strSignal+strUTC;
        };
    });