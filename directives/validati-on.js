besgamApp
	.directive('validatiOn', function () 
    {
        return {
            restrict: 'A',
            require: '^form', /*  */
            link: function (scope, el, attrs, form) 
            {
                /* Cogemos el elemento input dentro de 'el', que es el contenedor (coge el que tiene el atributo 'name')... */
                var inputEl = el[0].querySelector('[name]'),
                /* lo convertimos en elemento de angular */
                    inputNgEl = angular.element(inputEl),
                /* Cogemos el atributo 'name' para validar en el formulario más abajo */
                    inputName = inputNgEl.attr('name');

                /* Cuando el usuario sale del elemento, aplica la clase .has-error a la capa que contiene el input */
                inputNgEl.bind('blur', function () 
                {
                    el.toggleClass('has-error', form[inputName].$invalid);
                });
                
                /* Cuando se fuerza el evento con $scope.broadcast lanza esta función */
                scope.$on('validate-form', function( event, formName ) 
                {
                    if( form.$name == formName )
                        el.toggleClass('has-error', form[inputName].$invalid);
                });
            }
        };
    });