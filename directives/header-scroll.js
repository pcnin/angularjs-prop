besgamApp
	.directive("headerScroll", function ($window) 
    {
        return function(scope, element, attrs) 
        {
            angular.element($window).bind("scroll", function() 
            {
                if (this.pageYOffset > 273) 
                     scope.headerFixedChangeClass = true;
                else
                     scope.headerFixedChangeClass = false;

                scope.$apply();
            });
        };
    });


//273