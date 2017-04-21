besgamApp
	.controller("besgamSearch", function( $rootScope, $scope, $http, $location, $translate, $route, dataFactory )
    {      
        var now = new Date(),
            url = $location.url(),
            endUrl = url.split("?");

        $scope.placeholder = $route.current.params.target;

        $scope.isNotHome = function()
        {
            if( ( endUrl[0] == "/search" || endUrl[0] == "/home" || endUrl[0] == "/" ) && !$scope.fScrollData )
                return false;
            else
                return true;
        };

        $translate('controller.search.param1').then(function (translation) 
        {
            $scope.placeholder = ($route.current.params.target == translation || angular.isUndefined($route.current.params.target)) ? 'header.betFinderM.search' : $route.current.params.target;
        });

        $translate('centralFinder.filter.sport').then(function (translation) // "Deporte";
        {
            $scope.titleSport = translation;
        });
        $translate('centralFinder.filter.competition').then(function (translation) // "Competición";
        {
            $scope.titleLeague = translation;
        });

        $scope.search = [];

        $scope.placeholderTxt = function()
        {
            return $scope.placeholder || 'header.betFinderM.search';
        };

        $scope.submit = function(form)
        {
            if( typeof($scope.search.tags) == 'undefined' || $scope.search.tags == '' ) $scope.search.tags = $translate.instant('controller.search.param1');
            if( typeof($scope.search.sport) == 'undefined' || $scope.search.sport == '' ) $scope.search.sport = $translate.instant('controller.search.param2');
            if( typeof($scope.search.league) == 'undefined' || $scope.search.league == '' ) $scope.search.league = $translate.instant('controller.search.param3');

            var href = "search";

            if( $scope.search.tags != "" )
                href += "/" + $scope.search.tags;
            if( $scope.search.sport != "" )
                href += "/" + $scope.search.sport;
            if( $scope.search.league != "" )
                href += "/" + $scope.search.league;

            $location.path( href );
            // location.href = './seach' + href;
            //document.location.href = href;
            //document.forms[form].submit();
        };

        dataFactory.getDataJson().then( function(response)
        {
            $scope.dataJson = response.data;

            $scope.sports = $scope.dataJson.reduce(function(sum, place) 
            {
                if (sum.indexOf( place.sport ) < 0) sum.push( place.sport );
                return sum;
            }, []);
            $scope.createLeagues();
        });

    
        // dataFactory.getDataJson().then( function(response)
        // {
        //     dataFactory.getLastModified( './json/data.json', function( res )
        //     {
        //         if( new Date(response.headers()['last-modified']) < res )
        //         {
        //             dataFactory.setDataJson().then( function(response)
        //             {
        //                 console.log( response );

        //                 $scope.dataJson = response.data;

        //                 $scope.sports = $scope.dataJson.reduce(function(sum, place) 
        //                 {
        //                     if (sum.indexOf( place.sport ) < 0) sum.push( place.sport );
        //                     return sum;
        //                 }, []);
        //                 $scope.createLeagues();
        //             });
        //         } 
        //         else
        //         {
        //             $scope.dataJson = response.data;

        //             $scope.sports = $scope.dataJson.reduce(function(sum, place) 
        //             {
        //                 if (sum.indexOf( place.sport ) < 0) sum.push( place.sport );
        //                 return sum;
        //             }, []);
        //             $scope.createLeagues();
        //         }
        //     });
        // });
        
        $scope.createLeagues = function()
        {   
            if( typeof $scope.search != 'undefined' )
                $scope.titleSport = ( $scope.search.sport == "" ) ? $translate.instant('centralFinder.filter.sport') : $scope.search.sport;
           
            $scope.leagues = $scope.dataJson.reduce(function(sum, place) 
            {
                if( typeof $scope.search.sport != 'undefined' && $scope.search.sport != "" )
                {
                    if (sum.indexOf( place.league ) < 0 && $scope.search.sport == place.sport )
                        sum.push( place.league );
                }
                else
                {
                    if (sum.indexOf( place.league )  < 0) sum.push( place.league );
                }       
                    
                return sum;
            }, []);

            $scope.search.league = "";
        };

        $scope.selectLeagues = function()
        {
            $scope.titleLeague = ($scope.search.league == "") ? $translate.instant('centralFinder.filter.competition') : $scope.search.league;
        };
    });