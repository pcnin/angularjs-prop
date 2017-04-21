besgamApp
    .directive('bodyOverflow', function( $document, $rootScope )
    {
        return function( scope, element, attrs )
        {
            var  body = angular.element( $document[0].body );

            scope.$watch('showSearchMobile', function()
            {
                if( $rootScope.showSearchMobile )
                    body.addClass('overflow-hidden-search');
                else
                    body.removeClass('overflow-hidden-search');
            });
        };
    });