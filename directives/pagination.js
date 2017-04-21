besgamApp
    .directive("pagination", function( $window, $timeout ) 
	{
		return {
    		restrict: 'E',
            bindToController: true, //permite pasar los scopes del controller a la directiva que estamos usando
            templateUrl: '/pagination.html',
    		link: function(scope, element, attrs) 
    		{
                attrs.$observe('paginationtotalresult', function (value) 
                {
                    scope.paginationtotalresult = value;
                });

                angular.element($window).bind('resize orientationchange start', function() //cuando la página carga, cambia de tamaño o de posición el evento se lanza
                {
                    var afterElement = window.getComputedStyle( element[0], ':after'), //el elemento de la directiva tiene la clase :after en el css y dentro de ella el valor content
                        contentValue = afterElement.getPropertyValue('content').replace(/\"/g, ""), // se recoge el valor content y se eliminan las comillas dobles
                        uibPagination = angular.element(element[0].querySelector("ul")), //seleccionamos los ul que hay dentro de la directiva y se convierte a un angular element para poder comunicarlo con jquery
                        maxSize = 0;


                    /* según el content de la media query, cambia el tamaño de la paginación */

                    switch( contentValue )
                    {
                        case "p-large":
                            uibPagination.removeClass();
                            uibPagination.addClass("pagination pagination-sm");
                            maxSize = 5;
                        break;
                         case "p-medium":
                            uibPagination.removeClass();
                            uibPagination.addClass("pagination pagination-sm");
                            maxSize = 3;
                        break;
                         case "p-mobile":
                            uibPagination.removeClass();
                            uibPagination.addClass("pagination pagination-mobile");
                            maxSize = 0;
                        break;
                        default:
                            uibPagination.removeClass();
                            uibPagination.addClass("pagination pagination-mobile");
                        break;
                    }

                    $timeout(function()
                    {
                        scope.maxSize = maxSize;
                    });
                });
                /* el evento start se lanza */

                scope.start = function () 
                {
                    angular.element(element[0]).trigger("start");
                }

                /* establecer página activa */

                /* si el scope de la directiva no existe, los eventos no se ejecutan */

                scope.$on("$destroy", function()
                {
                    angular.element($window).unbind('resize orientationchange start');
                }); 

    		}   
  		};
	})