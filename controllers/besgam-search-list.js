besgamApp
	.controller("besgamSearchList", function( $rootScope, $scope, $http, $route, $translate, dataFactory, loadData )
    {
        var now = new Date(),
            target = '',
            sportGo = '',
            leagueGo = '';

        $scope.$on( 'LOAD', function(){ $scope.loading = true } );
        $scope.$on( 'UNLOAD', function(){ $scope.loading = false } );

        $scope.$emit('LOAD');

        $scope.rangeOdd = [
            { odd: 1.1 },
            { odd: 1.2 },
            { odd: 1.4 },
            { odd: 1.6 },
            { odd: 1.8 },
            { odd: 2.0 },
            { odd: 2.2 },
            { odd: 2.5 },
            { odd: 3.0 },
            { odd: 3.5 },
            { odd: 4.0 },
            { odd: 4.5 },
            { odd: 5.0 },
            { odd: 6.0 },
            { odd: 7.0 },
            { odd: 8.0 },
            { odd: 9.0 },
            { odd: 10.0 },
            { odd: 15.0 },
            { odd: 20.0 },
            { odd: 100}
        ];

        $scope.item = [{
            name  : 'RangeOddLow',
            value : 0
        },
        {
            name  : 'rangeOddHigh',
            value : 20
        }];

        dataFactory.getDataJson().then( function(response)
        {
            $translate('controller.search.param1').then(function (translation) 
            {
                target = ($route.current.params.target == translation || angular.isUndefined($route.current.params.target)) ? '' : $route.current.params.target;

                $translate('controller.search.param2').then(function (translation) 
                {
                    sportGo = ($route.current.params.sport == translation || angular.isUndefined($route.current.params.sport)) ? '' : $route.current.params.sport;

                    $translate('controller.search.param3').then(function (translation) 
                    {
                        leagueGo = ($route.current.params.league == translation || angular.isUndefined($route.current.params.league)) ? '' : $route.current.params.league;

                        /* Instanciamos */
                        $scope.search = {"league":leagueGo,"sport":sportGo,"tags":target};
                        $scope.data = response.data || response;
                        $scope.aux = $scope.$eval("filtered = (data | filter:search:strict)");
                        $scope.selectedInput = {};
                        $scope.totalData = ($scope.aux.length-10);
                        $scope.currentPage = 1;
                        $scope.numPerPage = 10;
                        $scope.maxSize = 5;

                        $scope.setPage = function (pageNo) 
                        {
                            window.scrollTo(0,0);
                            $scope.currentPage = pageNo;
                        };
                        $scope.setPage($scope.currentPage);

                        /* Ordenación */
                        var orderObj = ['orderTime','event'];
                        $scope.setOrdered = function( obj )
                        {
                            orderObj = obj;
                        };
                        $scope.ordered = function()
                        {
                            return orderObj;
                        };
                        $scope.chageOrder = function()
                        {
                            if( $scope.selectedInput.date == '1' )
                                $scope.setOrdered(['-orderTime','event']);
                            else
                                $scope.setOrdered(['orderTime','event']);
                        };
                        /* Deportes */
                        $scope.prematchSports = $scope.aux.reduce(function(sum, place) 
                        {
                            if(sum.indexOf( place.sportID ) < 0) sum.push( place.sportID );

                            return sum;
                        }, []);

                        /* Lista de ligas */
                        listPrematchLeagues();

                        $scope.$emit('UNLOAD');
                    });
                    
                });
            });

        });

        var listPrematchDataFilter = function( data )
        {
            var dataFilter = [];

            if( $scope.selectedInput.league != "" )
            {
                angular.forEach(data, function(value, key) 
                {
                    if( value.league == $scope.selectedInput.league )
                        if( $scope.selectedInput.promo && value.promo ) dataFilter.push(value);
                        else if( !$scope.selectedInput.promo ) dataFilter.push(value);
                });
            }
            else if( $scope.selectedInput.sport != "" )
            {
                angular.forEach(data, function(value, key) 
                {
                    if( value.sportID == $scope.selectedInput.sport )
                        if( $scope.selectedInput.promo && value.promo ) dataFilter.push(value);
                        else if( !$scope.selectedInput.promo ) dataFilter.push(value);
                });
            }
            else
            {
                angular.forEach(data, function(value, key) 
                {
                    if( $scope.selectedInput.promo && value.promo ) dataFilter.push(value);
                    else if( !$scope.selectedInput.promo ) dataFilter.push(value);
                });
            }

            return changeRange(dataFilter);
        };

        var listPrematchLeagues = function()
        {
            $scope.prematchLeagues = $scope.aux.reduce(function(sum, place) 
            {
                if( place.league != null )
                {
                    if( $scope.selectedInput.sport && $scope.selectedInput.sport != "" )
                    {
                        if (sum.indexOf( place.league ) < 0 && $scope.selectedInput.sport == place.sportID )
                        {
                            if( $scope.selectedInput.promo && place.promo ) sum.push( place.league ); 
                            else if( !$scope.selectedInput.promo ) sum.push( place.league ); 
                        }
                    }
                    else
                    {
                        if (sum.indexOf( place.league ) < 0) 
                            if( $scope.selectedInput.promo && place.promo ) sum.push( place.league ); 
                            else if( !$scope.selectedInput.promo ) sum.push( place.league ); 
                    }
                }
                return sum;
            }, []);
        };

        var changeRange = function( data )
        {
            var dataFilter = [];

            angular.forEach( data, function(value, key)
            {
                var fInsert = false;

                if( value.markets )
                {
                    angular.forEach( value.markets.str_bet, function( bet, keyBet)
                    {
                        if( bet[0].n_odd <= parseFloat($scope.rangeOdd[$scope.item[1].value].odd) && bet[0].n_odd >= parseFloat($scope.rangeOdd[$scope.item[0].value].odd) ) fInsert = true;
                    });
                }
                else
                  fInsert = true  

                if( fInsert ) dataFilter.push( value );
            });

            return dataFilter;
        };

        $scope.changeListPrematch = function()
        {  
            /* Lista de ligas */
            listPrematchLeagues();

            $scope.filtered = listPrematchDataFilter($scope.aux );
        };
        $scope.reset = function()
        {
            $scope.selectedInput = {
                sport: "",
                league: "",
                date: "",
                promo: false
            };

            $scope.changeListPrematch();
        };
    });