besgamApp
	.directive('totalShopBetsIn', function( $window, $document, $rootScope )
    {
        return function( scope, element, attrs )
        {
            var w = angular.element($window),
                body = angular.element( $document[0].body );
                
            // scope.getWindowDimensions = function () 
            // {
            //     return {
            //         'h': w.height(),
            //         'w': w.width()
            //     };
            // };
            // scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) 
            // {
            //     scope.windowHeight = newValue.h;
            //     scope.windowWidth = newValue.w;

            //     scope.style = function () {
            //         return {
            //             'height': (newValue.h - 100) + 'px',
            //             'width': (newValue.w - 100) + 'px'
            //         };
            //     };

            // }, true);

            w.bind('resize', function( scope ) 
            {
                if( $window.innerWidth <= 680 && $rootScope.showBag )
                    element.attr( 'style', 'max-height: ' + ($window.innerHeight - getHeightBag() ) + 'px' );
                else
                    element.attr( 'style', 'max-height: 450px' );
            });

            scope.$watch('showBag', function()
            {
                if( $window.innerWidth <= 680 && $rootScope.showBag )
                {
                    body.addClass('overflow-hidden-bag');
                    element.attr( 'style', 'max-height: ' + ($window.innerHeight - getHeightBag() ) + 'px' );
                }
                else
                    body.removeClass('overflow-hidden-bag');
            });

            scope.$watch('changeView', function()
            {
                if( $window.innerWidth <= 680 && $rootScope.showBag )
                    element.attr( 'style', 'max-height: ' + ($window.innerHeight - getHeightBag() ) + 'px' );
            });

            getHeightBag = function()
            {
                return $rootScope.changeView == 'simple' ? 135 : 112;
            };

        };
    });