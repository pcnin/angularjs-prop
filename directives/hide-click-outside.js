besgamApp
	.directive("hideClickOutside", function( $document )
    {
        return {
            link: function (scope, element, attrs) 
            {
                $document.on('click', function (e) 
                {
                    if( !element[0].contains(e.target) ) 
                    {
                        scope.$apply(function () 
                        {
                            scope.search.tags = '';
                        });
                    }
                });

            }
        }
    });