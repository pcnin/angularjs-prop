besgamApp
	.directive('betinput', function( $window )
    {
        return {
            template: '<input type="tel" ng-model="bet" ng-init="bet=0" maxlength="9">',
            restrict: 'E', //<betinput></betinput> hace referencia a un elemento/etiqueta html
            require: 'ngModel',
            replace: true,
            link: function( scope, element, attrs, modelCtrl ) 
            {
                modelCtrl.$parsers.push(function (inputValue) 
                {
                    var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;

                    if (transformedInput!=inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });

                // element.bind("focus", function() 
                // {
                //     if (!$window.getSelection().toString()) 
                //       this.setSelectionRange(0, 9)
                // });

                element.bind("click", function() 
                {
                    if (!$window.getSelection().toString()) 
                      this.setSelectionRange(0, this.value.length)
                });

                
            }

        };
    });