besgamApp
    .controller("blog-menu", function( $scope, blogContent, $location )
    {   

        blogContent.get( 'posts', { page:1, per_page:5 } ).then( function( posts )
        {
            $scope.recentposts = posts.data;
        });
        blogContent.get( 'categories' ).then( function( categories )
        {
            $scope.categories = categories.data;
        });

        blogContent.get( 'tags', { orderby:'count', per_page:20, order:'desc' } ).then( function( tags )
        {
            $scope.tags = tags.data; 
        });

       $scope.search = function(text) {
        if(text!=undefined)
            location.href="./blog/search/"+text+"/1/";
        };
    });