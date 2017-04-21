besgamApp
	.controller("blog-categories", function( $scope, $location, blogContent, $route, $q )
    {  

        $scope.$on( 'LOAD', function(){ $scope.loading = true } );
        $scope.$on( 'UNLOAD', function(){ $scope.loading = false } );

        $scope.$emit('LOAD');



        var id_elem=0;
        $scope.elem="";
        if($route.current.params.category==undefined){
            elem="tags";
            $scope.elem="tag";
            id_elem=$route.current.params.tag;
        }
        else{
            elem="categories";
            $scope.elem="category";
            id_elem=$route.current.params.category;
        }
            $scope.id_elem=id_elem;
       
         blogContent.get( elem, {slug:id_elem} ).then( function( resp )
        {
            id_element=resp.data[0].id;

            if(elem=="categories"){
                getPostsC(id_element); 
            }
            else if (elem=="tags"){
                getPostsT(id_element); 
            }
            
        });

        $scope.number_page=parseInt($route.current.params.page_number);
        if($route.current.params.page_number==undefined)
        {
            $scope.number_page=1;
        }

        function getPostsC(idelem){
            blogContent.get('posts', {categories:idelem, page:$scope.number_page, per_page:12}).then(function successCallback(posts){
               
                var mediaItems = [], 
                pagination = posts.headers(),
                posts = posts.data;

                $scope.topPag = pagination["x-wp-totalpages"];

                 //PAGINACION
                $scope.pagination=Array();
                var limit = $scope.topPag;
                for($i=1; $i<=limit; $i++)
                {
                    // valores para actual
                    // 0 -> pagina actual
                    // 1 -> se muestra
                    // 2 -> no se muestra
                    // 3 -> ...
                    actual=1;
                    if($i==$scope.number_page){
                        actual=0;
                        limit=$i+3;
                        if(limit>$scope.topPag)
                        {
                            limit=$scope.topPag;
                        }
                    }
                    if($i<($scope.number_page-2)){
                        actual=2;
                    }
                    if($i==limit){
                        if(limit==$scope.topPag)
                        {
                            actual=1;
                        }
                        else
                        {
                            actual=3;
                        }
                    }
                    var b={'number':$i, 'orden':actual};
                    $scope.pagination.push(b);
                }

                /* Recorremos los post y recogemos su identificador */
                posts.map(function( post )
                {
                    mediaItems.push( post.featured_media );
                });

                /* Hacemos una llamada por cada imagen que queremos traer */
                getMedia( mediaItems ).then(function( data )
                {
                    data.map( function( value, key )
                    {   
                        if( typeof value != undefined )
                            posts[key].image = value;
                        /* ELSE -> añadimos la imagen por defecto */
                    });
                    /* Creamos el obj final */
                    $scope.posts = posts;
                     $scope.$emit('UNLOAD');
                });
            }, function errorCallback(err){
                $scope.posts="";
            });
        }
        function getPostsT(idelem){
            blogContent.get('posts', {tags:idelem, page:$scope.number_page, per_page:12}).then(function successCallback(posts){
               
                var mediaItems = [], 
                pagination = posts.headers(),
                posts = posts.data;

                $scope.topPag = pagination["x-wp-totalpages"];

                 //PAGINACION
                $scope.pagination=Array();
                var limit = $scope.topPag;
                for($i=1; $i<=limit; $i++)
                {
                    // valores para actual
                    // 0 -> pagina actual
                    // 1 -> se muestra
                    // 2 -> no se muestra
                    // 3 -> ...
                    actual=1;
                    if($i==$scope.number_page){
                        actual=0;
                        limit=$i+3;
                        if(limit>$scope.topPag)
                        {
                            limit=$scope.topPag;
                        }
                    }
                    if($i<($scope.number_page-2)){
                        actual=2;
                    }
                    if($i==limit){
                        if(limit==$scope.topPag)
                        {
                            actual=1;
                        }
                        else
                        {
                            actual=3;
                        }
                    }
                    var b={'number':$i, 'orden':actual};
                    $scope.pagination.push(b);
                }


                /* Recorremos los post y recogemos su identificador */
                posts.map(function( post )
                {
                    mediaItems.push( post.featured_media );
                });

                /* Hacemos una llamada por cada imagen que queremos traer */
                getMedia( mediaItems ).then(function( data )
                {
                    data.map( function( value, key )
                    {   
                        if( typeof value != undefined )
                            posts[key].image = value;
                        /* ELSE -> añadimos la imagen por defecto */
                    });
                    /* Creamos el obj final */
                    $scope.posts = posts;
                     $scope.$emit('UNLOAD');
                });
            }, function errorCallback(err){
                $scope.posts="";
            });
        }

         /* LLamadas a la imagenes */
        function getMedia( medias )
        {
            var promises = medias.map( function( id )
            {
                var deffered  = $q.defer();
                if(id!=0){
                     blogContent.get('media', id )
                    .then(function successCallback( res ) 
                    {
                        /* Devolvemos el json */
                        return deffered.resolve( res.data.source_url );
                    }, function errorCallback( err ) 
                    {
                        return deffered.resolve( "/img/blog/default.png");
                    });
                 }
                 else
                 {
                    return deffered.resolve( "/img/blog/default.png");
                 }
                return deffered.promise;

               
            });
        
            return $q.all( promises );
        }
        
    });