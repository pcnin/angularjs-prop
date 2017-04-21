besgamApp
	.directive('activeBet', function( $localStorage ) 
    {
       return {
            restrict: 'A',
            link: function (scope, element, attrs) 
            {
                var id = attrs['id'],
                    el = element;

                angular.forEach($localStorage.simple, function(value, key) 
                {
                    if( id == value.id_element )
                    {
                        el.toggleClass('betslip-active', true );
                    }
                });
                
                /* Cuando se fuerza el evento con $scope.broadcast lanza esta función */
                scope.$on('del-active-betslip', function( event, id ) 
                {
                    if( el[0].id == id )
                    {
                        el.toggleClass('betslip-active', false );
                    }
                });

                /* Cuando se fuerza el evento con $scope.broadcast lanza esta función */
                scope.$on('add-active-betslip', function( event, id ) 
                {
                    if( el[0].id == id )
                    {
                        el.toggleClass('betslip-active', true );
                    }
                });
            }
        };
    });