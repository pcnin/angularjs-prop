besgamApp
	.directive("inputHeaderSearch", function($window, $location, $anchorScroll) 
    {
        return function( scope, element, attrs) 
        {
            var userAgent   = $window.navigator.userAgent,
                browsers    = ["Mobile","iPhone","iPod","BlackBerry","Opera Mini","Sony","MOT","Nokia","samsung"];

            for(var key in browsers) 
            {
                if( userAgent.indexOf(browsers[key]) != -1 )
                {
                   element.attr("disabled", "disabled");
                }
                break;
            };    

            element.bind("touchend", function()
            {
                document.location.href = "search.html"; 
            });
        };
    });