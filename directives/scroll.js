besgamApp
	.directive("scroll", function($window, $rootScope) 
    {
        return function(scope, element, attrs) 
        {
            // var userAgent   = $window.navigator.userAgent,
            //     browsers    = ["Mobile","iPhone","iPod","BlackBerry","Opera Mini","Sony","MOT","Nokia","samsung"],
            //     typeMobile  = false;

            // for(var key in browsers) 
            // {
            //     if( userAgent.indexOf(browsers[key]) != -1 )
            //     {
            //        typeMobile = true;
            //     }
            //     break;
            // };    


            angular.element($window).bind("scroll", function() 
            {
                if (this.pageYOffset > 273) 
                     $rootScope.fScrollData = true;
                else
                     $rootScope.fScrollData = false;

                scope.$apply();
            });
        };
    });