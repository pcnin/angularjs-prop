besgamApp
	.directive('hideFilterOutside', function( $document, $parse ) 
    {
        return {
            link: function postLink(scope, element, attrs) 
            {
                var first = true;   // Primer click
                /* Observadores */
                scope.$watch( attrs.hideFilterOutside, function( newValue, oldValue)
                {
                    if (newValue !== oldValue && newValue == true)
                        $document.bind('click', onClick);       // Creamos evento
                    else if (newValue !== oldValue && newValue == false)
                    {
                        /* Inicializamos */
                        first = true;
                        $document.unbind('click', onClick);     // Drestruimos evento
                    }
                });
                /* Se utiliza SOLO cuando se selecciona un filtro */
                scope.$watch( 'filter.selected', function( newValue, oldValue)
                {
                    if (newValue !== oldValue && oldValue !== undefined )
                    {
                        /* Inicializamos */
                        first = true;
                        $document.unbind('click', onClick);     // Drestruimos evento
                        scope.$parent.prematchMarketFilter = false;
                    }
                });

                /* Evento on click */
                var onClick = function (event) 
                {
                    /* Instanciamos */
                    var isChild = $(element).has(event.target).length > 0,
                        isSelf = element[0] == event.target,
                        isInside = isChild || isSelf;

                    if( !isInside && !first ) 
                    {
                        switch( attrs.hideFilterOutside )
                        {
                            case '$parent.liveListFilter':
                                scope.$parent.liveListFilter = false;
                            break;
                            case '$parent.liveMarketFilter':
                                scope.$parent.liveMarketFilter = false;
                            break;
                            case 'menuFilter':
                                scope.menuFilter = false;
                            break;
                            case '$parent.prematchListFilter':
                                scope.$parent.prematchListFilter = false;
                            break;
                            case '$parent.prematchMarketFilter':
                                scope.$parent.prematchMarketFilter = false;
                            break;
                            case '$parent.tipsterFilter':
                                scope.$parent.tipsterFilter = false;
                            break;
                            case '$parent.tipsterTopFilter':
                                scope.$parent.tipsterTopFilter = false;
                            break;
                            case 'predictiveSearch':
                                scope.search.tags = '';
                                scope.predictiveSearch = false;
                            break;
                            case 'predictiveCentralSearch':
                                scope.search.tags = '';
                                scope.predictiveCentralSearch = false;
                            break;
                        }
                        /* Inicializamos */
                        first = true;
                        /* Aplicamos scope */
                        scope.$apply();
                    }
                    else
                        /* No es la primera vez */
                        first = false;
                }
            }
        };
    });