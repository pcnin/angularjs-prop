besgamApp
	.controller('userAcademy', function( $scope, $http, $location, $sessionStorage, timeOut) 
    {
        /* Controlar que se esta en sesion */
        var session = timeOut.timeOut();

        $scope.data = [];
        $scope.$storage = $sessionStorage;
        
         
        /* Obtenemos los post de worpress */
        var confWordpress = {
                method: 'POST',
                url: 'php/dashboard/getBlogPost.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };


        $http(confWordpress).
            success(function(data, status, headers, config) 
            {
                data.map( function(item)
                {
                    /* Cambiamos la dirección del blog */
                    var strLink = item.link.split("blog");
                    item.link = './blog/post' + strLink[1];
                    /* Modificamos la imagen */
                    item.imgUrl = item.imgUrl ? item.imgUrl : '/img/blog/default.png';
                });

                /* Se guardan los datos */
                $scope.data = data;

                /* Paginacion */
                $scope.totalData = ($scope.data.length-9);
                $scope.currentPage = 1;
                $scope.numPerPage = 9;
                $scope.maxSize = 5;

                $scope.setPage = function (pageNo) 
                {
                    window.scrollTo(0,0);  
                    $scope.currentPage = pageNo;
                };
                
                $scope.setPage($scope.currentPage);
                
            }).
            error(function(data, status, headers, config) 
            {
                        
            });
    });