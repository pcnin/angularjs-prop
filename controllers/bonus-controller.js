besgamApp
	.controller("bonusController", function( $scope, $http, $location)
    {

        var confBono = {
                method: 'GET',
                url: 'json/dataBono.json', 
                params: {'_':new Date().getTime()}, 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };

        $http(confBono).
        success(function(data, status, headers, config) 
        {
            for ( var index = 0; index < data.length; index ++)
            {
                if(data[index].id_bono == id_bono)
                {
                    $scope.bonus = data[index];
                    $scope.id_feed = $scope.bonus.id_feed;
                    break;
                    
                    document.querySelector('title').innerHTML  = $scope.bonus.str_title_web ;

                    var description = document.querySelector("meta[name=description]");
                    description.setAttribute('content', $scope.bonus.str_description );

                    if($scope.bonus.str_keywords)
                    {
                            var keywords = document.querySelector("meta[name=keywords]");
                            keywords.setAttribute('content', "apuestas deportivas, bonos bienvenida, regalos, casas apuestas, promociones, apuestas en directo, ofertas, juego online, " + 
                            $scope.bonus.str_feed.toLowerCase() + ", " + $scope.bonus.str_keywords);
                    }
                }
            }
        }).
        error(function(data, status, headers, config) 
        {
                        
        });
    });