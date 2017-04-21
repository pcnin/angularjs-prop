besgamApp
	.controller("blog-post", function( $scope , $location, blogContent, $q, $route, $rootScope, $http)
    {  

        /* type     : 'posts','categories','tags','users' */
        /* id       : number */
        /* filters  : page, per_page, search, orderby */
       $scope.texto="<p>La NBA nos regala todas las noches un sinf\u00edn de jugadas espectaculares. Aqu\u00ed te traemos las mejores de la \u00faltima semana. Raci\u00f3n de Antetokoumpo, Curry, un descarado de Portland y un aficionado que ahora vive bastante m\u00e1s c\u00f3modamente.<!--more--><\/p>\n<blockquote class=\"twitter-tweet\" data-lang=\"es\">\n<p dir=\"ltr\" lang=\"es\">Meyers Leonard machaca ante dos MVP&#8217;s como si nada&#8230; <a href=\"https:\/\/t.co\/apUESZTAmS\">https:\/\/t.co\/apUESZTAmS<\/a> [v\u00eda <a href=\"https:\/\/twitter.com\/ESPNNBA\">@ESPNNBA<\/a>]<\/p>\n<p>\u2014 BesGam (@BesgamCom) <a href=\"https:\/\/twitter.com\/BesgamCom\/status\/816940555552878592\">5 de enero de 2017<\/a><\/p><\/blockquote>\n<p><script async src=\"\/\/platform.twitter.com\/widgets.js\" charset=\"utf-8\"><\/script><\/p>\n<p>A Meyers Leonard no le import\u00f3 tener delante a Durant y Curry y machaca en sus caras.<\/p>\n<blockquote class=\"twitter-tweet\" data-width=\"550\"><p lang=\"es\" dir=\"ltr\">Meyers Leonard machaca ante dos MVP&#39;s como si nada&#8230; <a href=\"https:\/\/t.co\/apUESZTAmS\">https:\/\/t.co\/apUESZTAmS<\/a> [v\u00eda <a href=\"https:\/\/twitter.com\/ESPNNBA\">@ESPNNBA<\/a>]<\/p>\n<p>&mdash; BesGam (@BesgamCom) <a href=\"https:\/\/twitter.com\/BesgamCom\/status\/816940555552878592\">January 5, 2017<\/a><\/p><\/blockquote>\n<p><script async src=\"\/\/platform.twitter.com\/widgets.js\" charset=\"utf-8\"><\/script><\/p>\n<p>La raci\u00f3n semanal de la magia de Stephen Curry.<\/p>\n<blockquote class=\"twitter-tweet\" data-width=\"550\"><p lang=\"es\" dir=\"ltr\">Steph es un mago del bal\u00f3n y cada d\u00eda busca nuevos trucos para sorprendernos <a href=\"https:\/\/t.co\/phT51N8jtT\">https:\/\/t.co\/phT51N8jtT<\/a> [v\u00eda <a href=\"https:\/\/twitter.com\/BleacherReport\">@BleacherReport<\/a>]<\/p>\n<p>&mdash; BesGam (@BesgamCom) <a href=\"https:\/\/twitter.com\/BesgamCom\/status\/816951879292846080\">January 5, 2017<\/a><\/p><\/blockquote>\n<p><script async src=\"\/\/platform.twitter.com\/widgets.js\" charset=\"utf-8\"><\/script><\/p>";
        /* Cargamos los posts */
        blogContent.get( 'posts', {slug:$route.current.params.post_title} ).then( function( posts )
        {
            var tagsItems =[], tags =[];

            $scope.posts = posts.data; 

             $scope.texto=$scope.posts[0].content.rendered;
             
            if(posts.data[0].featured_media!=0)
            {
                getMedia(posts.data[0].featured_media); /*Obtenemos la imagen principal*/
            }
            else
            {
                $scope.media="/img/blog/default.png";
            }
            
            posts.data[0].tags.map(function( post )
            {
                tagsItems.push( post );
            });

            getTags( tagsItems ).then(function( data )
            {
                data.map( function( value, key )
                {   
                    if( typeof value != undefined ){
                        var tag={'id':value.id,'name':value.name,'slug':value.slug};
                        tags.push(tag);
                    }   
                });
                $scope.tags = tags;
            });    

            var params = {
                    method: 'POST',
                    url: 'php/loveCount.php',
                    data: 'idpost='+posts.data[0].id+'&loveclick=false'
                };
                $http( params )
                .success(function(data, status, headers, params) 
                {
                    $scope.n_count = data;
                })
                .error(function(data, status, headers, config) 
                {
                    console.log("error");
                });
        });

        function getMedia(idmedia){
            blogContent.get('media', idmedia).then(function successCallback(media){
                $scope.media=media.data.guid.rendered;        
            }, function errorCallback(err){
                $scope.media="/img/blog/default.png";
            });
        }

        function getTags( idtags )
        {
            var promises = idtags.map( function( id )
            {
                var deffered  = $q.defer();
      
                blogContent.get('tags', id )
                    .then(function successCallback( res ) 
                    {
                        /* Devolvemos el json */
                        return deffered.resolve( res.data );
                    }, function errorCallback( err ) 
                    {
                        return deffered.resolve( undefined );
                    });
              
                return deffered.promise;
            });
        
            return $q.all( promises );
        }

        $scope.loveCount = function (idpost)
        {
            idpost = idpost.toString();
            var cookieValue = $.cookie(idpost);
            
            if(cookieValue != 'true')
            {   
                var params = {
                    method: 'POST',
                    url: 'php/loveCount.php',
                    data: 'idpost='+idpost+'&loveclick=true'
                };
                $http( params )
                .success(function(data, status, headers, params) 
                {
                    $.cookie(idpost, true);
                    $scope.n_count = data;
                })
                .error(function(data, status, headers, config) 
                {
                    console.log("error");
                });
            }
            else
            {
                alert("No more clicks");
            }
        }
    });