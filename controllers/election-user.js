besgamApp
	.controller('electionUser', function($scope, $location, $http, $sessionStorage, $filter, timeOut, dataFactory) 
    {
        /* Controlar que se esta en sesion */
        var session = timeOut.timeOut();

        $scope.user_sports = [];
        $scope.user_feeds = [];
        $scope.dataSettings = {};

        var confSport = {
                method: 'POST',
                url: 'php/dashboard/getDataUserSettings.php', 
                data: 'iduser='+ $sessionStorage.iduser ,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };


        $http(confSport).
        success(function(data, status, headers, config) 
        {
            $scope.dataSettings.sport = data.sport;
        }).
        error(function(data, status, headers, config) 
        {
                    
        });

        dataFactory.getDataFeed().then( function( listFeed )
        {
            $scope.dataSettings.feed = listFeed.data;
        });
        /* Modificar el src de la img de los deportes */
        $scope.selectUrl = function (item,sport)
        {
           
             if($scope.user_sports.indexOf(item) !== -1 )
                return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(sport)+'-on.svg';
            else
                return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(sport)+'-off.svg';
        };

        /* Actualizar el array de deportes */
        $scope.updateValue = function (structure,valueAdd,strData)
        {
            var index = structure.indexOf(valueAdd);
           
            if( index === -1 )
            {
                 structure.push(valueAdd); 
                 if( strData != "" )
                    return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(strData)+'-on.svg';
                 else
                    return 1;       
            }
            else if( index !== -1 ) 
            {
                structure.splice(index, 1);
                if(strData!="")
                    return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(strData)+'-off.svg';
                else
                    return 1;
            } 
        };
            

        $scope.submit = function(form) 
        {
            /* Recoger los datos de los otros deportes */
            var str_others = "";

            angular.forEach(this.others, function(value, key) {
                if(str_others=="")
                    str_others = str_others + value.text ;
                else
                    str_others = str_others + "," +value.text;
            }); 

            var params = {
                method: "POST",
                url: "php/election.php",
                data: "&user_sports=" + $scope.user_sports + "&user_feeds=" + $scope.user_feeds 
                                + "&others="+ str_others +"&iduser="+ $sessionStorage.iduser 
            };

            $http( params )
            .success(function(data, status, headers, params)
            {
                if(data.error)
                {
                    /* Error al registrar las casas y deportes */
                }
                else
                {
                    /* Guardar la info del usuario en la sesion */
                    $sessionStorage.str_name = data.dataUser.str_name;
                    $sessionStorage.str_email = data.dataUser.str_email;
                    $sessionStorage.a_sports = data.dataUser.a_sports;
                    $sessionStorage.$save();

                    $location.path('userHome').replace();
                }
                
            }).
            error(function(data, status, headers, config)
            {
               

            });   
        };
    });