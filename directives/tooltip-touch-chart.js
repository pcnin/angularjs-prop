besgamApp
	.directive("tooltipTouchChart", function( $document )
    {
        return {
            link: function (scope, element, attrs) 
            {
                element.on('touchstart', function (e) 
                {
                    angular.element(element).find('.nvtooltip').css("display", "block");
                });

                element.on('touchend', function (e) 
                {
                   angular.element(element).find('.nvtooltip').css("display", "none");
                });

            }
        }
    });