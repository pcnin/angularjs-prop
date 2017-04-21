/**
 * @module wp.api
 */
angular.module( "wp.api", [
	"wp.services",
	"ngResource",
	"ngSanitize"
] )

.provider("path", function() 
{
    var provider = {};
    var config   = { src : "http://" };

    provider.set = function( url ) 
    {
        config.src = url;
    }

    provider.$get = function() 
    {
        var service = {};

        service.get = function() 
        {
            return config.src;
        }

        return service;
    }

    return provider;
})

/**
 * @name have-item-wp
 *
 * @description
 *
 * The `haveWp` directive is a WordPress loop.
 *
 * **Attributes**
 *
 * | Attribute    | Type   | Details                                                        |
 * |--------------|--------|----------------------------------------------------------------|
 * | wp-type      | string | `posts` or `pages` or `media` or custom post type.             |
 * | wp-per-page  | number | The number of posts per page. Default is 10.                   |
 * | wp-offset    | number | The number of post to displace or pass over. Default is 0.     |
 * | wp-id        | number | The ID of the post.                                            |
 * | wp-filter    | object | The object of the filter.                                      |
 *
 * @example
 *
 * ```html
 * <have-wp wp-type="posts">
 *   <wp-title></wp-title>
 *   <wp-content></wp-content>
 * </have-wp>
 * ```
 *
 * If you want to get single post, you can use `id`.
 *
 * ```html
 * <have-wp wp-type="posts" wp-id="123">
 *   <wp-title></wp-title>
 *   <wp-content></wp-content>
 * </have-wp>
 * ```
 *
 * You can pass filters to
 * [WP_Query](https://codex.wordpress.org/Class_Reference/WP_Query)
 * through via the `filter` argument.
 *
 * ```html
 * <have-wp wp-type="posts" wp-filter="{ order: 'ASC', cat: 123 }">
 *   <wp-title></wp-title>
 *   <wp-content></wp-content>
 * </have-wp>
 * ```
 *
 */
.directive( "haveWp", [ "WP", function( WP ) 
{
	return {
		restrict: "E",
		replace: true,
		transclude: true,
		scope: {
			wpType 		: '@',
			wpId 		: '@',
			wpPerPage 	: '@',
			wpOffset 	: '@',
			wpFilter 	: '='
		},
		controller: [ "$scope", function( $scope ) 
		{
			$scope.load = function() 
			{
				if ( $scope.query == $scope.last_query ) return;

				$scope.last_query = $scope.query;

				if ( $scope.wpId ) 
				{
					WP.Query( WP.path ).get( $scope.query ).$promise
						.then( function( items ) 
						{
							$scope.wpitems.push( items );
						});
				} 
				else if ( $scope.filter && $scope.filter.name ) 
				{
					WP.Query( WP.path ).query( $scope.query ).$promise
						.then( function( items ) 
						{
							if ( items.length ) 
							{
								$scope.is_nextpage = false;
								$scope.wpitems = items;
							}
						});
				} 
				else 
				{
					WP.Query( WP.path ).query( $scope.query ).$promise
						.then( function( items ) 
						{
							if ( items.length ) 
							{
								$scope.is_nextpage = true;
								$scope.wpitems = $scope.wpitems.concat( items );
								$scope.last_query = {};
								$scope.query.offset = parseInt( $scope.query.offset )
													+ parseInt( $scope.perPage);
								// for ionic framework
								$scope.$broadcast( 'scroll.infiniteScrollComplete' );
								$scope.$broadcast( 'scroll.refreshComplete');
							} 
							else 
							{
								$scope.is_nextpage = false;
							}
						});
				}
			}
		}],
		compile: function( tElement, tAttrs, transclude ) 
		{
			return {
				pre: function preLink( scope, element, attrs, controller ) 
				{
					scope.wpitems = [];
					if ( scope.wpId ) 
					{
						scope.query = {
							'endpoint': scope.wpType,
							'id': scope.wpId,
							'_embed': true
						}
					} 
					else 
					{
						if ( ! scope.wpPerPage ) 
							scope.wpPerPage = 10;
						if ( ! scope.wpOffset ) 
							scope.wpOffset = 0;

						var query = {
							'endpoint': scope.wpType,
							'per_page': scope.wpPerPage,
							'offset': scope.wpOffset,
							'filter[orderby]': 'date',
							'filter[order]': 'DESC',
							'_embed': true
						}

						scope.query = angular.extend(
							query,
							WP.parseFilters( scope.wpFilter )
						);
					}
					scope.load();
				}
			}
		},
		link: function( $scope ) 
		{
			$scope.$watch( 'filter', function( newValue ) 
			{
				$scope.wpitems = [];
				scope.query = angular.extend(
					scope.query,
					WP.parseFilters( newValue )
				);
				scope.load();
			} );
		},
		template: function( tElement, tAttrs )
		{
			return "<div class=\"have-wp\">"
				 + "<article class=\"{{ wpType }}"
				 + " post-{{ wpitem.id }}\" ng-repeat=\"wpitem in wpitems\">"
				 + "<div ng-transclude></div></article>"
				 + "</div>";
		}
	}
} ] )

/**
 * @name wp-title
 *
 * @description
 *
 * Displays the post title of the current post.
 * This tag must be used within The `<have-wp>`.
 *
 * **Attributes**
 *
 * | Attribute | Type   | Details                                                        |
 * |-----------|--------|----------------------------------------------------------------|
 * | href      | string | Specify a link URL like `#/app/posts/:id`.                     |
 *
 * @example
 *
 * ```html
 * <wp-title></wp-title>
 * ```
 * Then:
 * ```html
 * <div class="wp-title">Hello World</div>
 * ```
 * If you need a link to the post on your app. Please add `href` as attribute.
 * ```html
 * <wp-title href="#/posts/:id"></wp-title>
 * ```
 * Then:
 * ```html
 * <div class="wp-title"><a href="#/posts/123">Hello World</a></div>
 * ```
 * `:id` is a placeholder of the post's id. You can use `:slug` as post's slug too.
 * ```html
 * <wp-title href="#/posts/:slug"></wp-title>
 * ```
 * Then:
 * ```html
 * <div class="wp-title"><a href="#/posts/hello-world">Hello World</a></div>
 * ```
 */
.directive( "wpTitle", [ "$sce", function( $sce ) 
{
	return{
		restrict:'E',
		replace: true,
		require : '^haveWp',
		transclude: true,
		compile: function( tElement, tAttrs, transclude ) 
		{
			return {
				post: function postLink( scope, element, attrs, controller ) 
				{
					var wpitem = scope.$parent.wpitem;
					scope.title = wpitem.title.rendered;
					if ( tAttrs.href ) 
					{
						scope.permalink = tAttrs.href;
						scope.permalink = scope.permalink.replace( ':id', wpitem.id );
						scope.permalink = scope.permalink.replace( ':slug', wpitem.slug );
					} 
					else 
					{
						scope.permalink = '';
					}
				}
			}
		},
		template: function( tElement, tAttrs ) 
		{
			if ( tAttrs.href ) 
			{
				return "<div class=\"wp-title\">"
					 + "<a ng-href=\"{{ permalink }}\" ng-bind-html=\"title\">"
					 + "{{ title }}</a></div>"
			} 
			else 
			{
				return "<div class=\"wp-title\" ng-bind-html=\"title\">"
					 + "{{ title }}</div>"
			}
		}
	}
} ] )

/**
 * @name wp-content
 *
 * @description
 *
 * Displays the post content of the current post.
 * This tag must be used within The `<have-wp>`.
 *
 * @example
 *
 * ```html
 * <wp-content></wp-content>
 * ```
 * Then:
 * ```html
 * <div class="wp-content"><p>Hello World</p></div>
 * ```
 */
.directive( "wpContent", [ "$sce", function( $sce ) 
{
	return{
		restrict:'E',
		replace: true,
		require : '^haveWp',
		compile: function( tElement, tAttrs, transclude ) 
		{
			return {
				post: function postLink( scope, element, attrs, controller ) 
				{
					var wpitem = scope.$parent.wpitem;
					scope.content = $sce.trustAsHtml( wpitem.content.rendered );
				}
			}
		},
		template: "<div class=\"wp-content\" ng-bind-html=\"content\">"
				+ "{{ content }}</div>"
	}
} ] )

/**
 * @name wp-post-thumbnail
 *
 * @description
 *
 * Displays the post thumbnail of the current post.
 * This tag must be used within The `<have-wp>`.
 *
 * **Attributes**
 *
 * | Attribute | Type   | Details                                                        |
 * |-----------|--------|----------------------------------------------------------------|
 * | size      | string | Size of the post thumbnail. Default is `full`.                 |
 * |           |        | full, large, medium, medium_large, post-thumbnail, thumbnail   |
 * | href      | string | Specify a link URL like `#/app/posts/:id`.                     |
 *
 * @example
 *
 * ```html
 * <wp-post-thumbnail></wp-post-thumbnail>
 * ```
 * Then:
 * ```
 * <div class="wp-post-thumbnail"><img src="http://example.com/image.jpg"></div>
 * ```
 * Uses `size` attribute.
 * ```html
 * <wp-post-thumbnail size="full"></wp-post-thumbnail>
 * ```
 * Then:
 * ```
 * <div class="wp-post-thumbnail"><img src="http://example.com/image.jpg"></div>
 * ```
 * If you need a link to the post on your app. Please add `href` as attribute.
 * ```html
 * <wp-post-thumbnail href="#/posts/:id"></wp-post-thumbnail>
 * ```
 * Then:
 * ```html
 * <div class="wp-post-thumbnail">
 *   <a href="#/posts/123"><img src="http://example.com/image.jpg"></a>
 * </div>
 * ```
 * `:id` is a placeholder of the post's id. You can use `:slug` as post's slug too.
 *
 * ```html
 * <wp-post-thumbnail href="#/posts/:slug"></wp-post-thumbnail>
 * ```
 * Then:
 * ```html
 * <div class="wp-post-thumbnail">
 *   <a href="#/posts/hello-world"><img src="http://example.com/image.jpg"></a>
 * </div>
 * ```
 */
.directive( "wpPostThumbnail", [ function() 
{
	return{
		restrict:'E',
		replace: true,
		require : '^haveWp',
		compile: function( tElement, tAttrs, transclude ) 
		{
			return {
				post: function postLink( scope, element, attrs, controller ) 
				{
					if ( ! attrs.size ) 
					{
						attrs.size = 'post-thumbnail';
					}
					var scheme = 'wp:featuredmedia',
						_embedded = scope.$parent.wpitem._embedded,
						img;
					if ( _embedded && _embedded[scheme] && _embedded[scheme].length ) 
					{
						if ( _embedded[scheme][0].media_details.sizes[attrs.size] ) 
						{
							img = _embedded[scheme][0].media_details
									.sizes[attrs.size].source_url;
						} 
						else 
						{
							img = _embedded[scheme][0].media_details
									.sizes['full'].source_url;
						}
					}
					if ( img )
						scope.image_src = img;

					var wpitem = scope.$parent.wpitem;
					if ( tAttrs.href ) 
					{
						scope.permalink = tAttrs.href;
						scope.permalink = scope.permalink.replace( ':id', wpitem.id );
						scope.permalink = scope.permalink.replace( ':slug', wpitem.slug );
					} 
					else 
					{
						scope.permalink = '';
					}
				}
			}
		},
		template: function( tElement, tAttrs ) 
		{
			if ( tAttrs.href ) 
			{
				return "<div class=\"wp-post-thumbnail\">"
					 + "<a ng-href=\"{{ permalink }}\">"
					 + "<img ng-src=\"{{ image_src }}\"></a></div>"
			}
			else 
			{
				return "<div class=\"wp-post-thumbnail\">"
					 + "<img ng-src=\"{{ image_src }}\"></div>"
			}
		}
	}
} ] )

/**
 * @name wp-author
 *
 * @description
 *
 * Displays the author of the current post.
 * This tag must be used within The `<have-wp>`.
 *
 * @example
 *
 * Place the code like following into your HTML.
 * ```
 * <wp-author></wp-author>
 * ```
 * Then you will get like following.
 * ```
 * <div class="wp-author"><p>Jhon Doe</p></div>
 * ```
 */
.directive( "wpAuthor", [ '$sce', function( $sce ) 
{
	return {
		restrict:'E',
		replace: true,
		require : '^haveWp',
		compile: function( tElement, tAttrs, transclude ) 
		{
			return {
				post: function postLink( scope, element, attrs, controller ) 
				{
					var scheme = 'author',
						_embedded = scope.$parent.wpitem._embedded,
						author;
					if ( _embedded && _embedded[scheme] && _embedded[scheme].length ) 
					{
						author = _embedded[scheme][0];
					}
					if( author )
						scope.author = author;
				}
			}
		},
		template: "<span class=\"wp-author\" ng-bind-html=\"author.name\">"
				  + "{{ author.name }}</span>"
	}
} ] )


/**
 * @name wp-excerpt
 *
 * @description
 *
 * Displays the excerpt of the current post.
 * This tag must be used within The `<have-wp>`.
 *
 * @example
 *
 * Place the code like following into your HTML.
 * ```
 * <wp-excerpt></wp-excerpt>
 * ```
 * Then you will get like following.
 * ```
 * <div class="wp-excerpt"><p>Hello World.</p></div>
 * ```
 */
.directive( "wpExcerpt", [ '$sce', function( $sce ) 
{
	return {
		restrict:'E',
		replace: true,
		require : '^haveWp',
		compile: function( tElement, tAttrs, transclude ) 
		{
			return {
				post: function postLink( scope, element, attrs, controller ) 
				{
					var wpitem = scope.$parent.wpitem;
					scope.excerpt = $sce.trustAsHtml( wpitem.excerpt.rendered );
				}
			}
		},
		template: "<span class=\"wp-excerpt\" ng-bind-html=\"excerpt\">"
				  + "{{ excerpt }}</span>"
	}
} ] )

/**
 * @name wp-date
 *
 * @description
 *
 * Displays the date of the current post.
 * This tag must be used within The `<have-wp>`.
 *
 * **Attributes**
 *
 * | Attribute | Type   | Details                                                        |
 * |-----------|--------|----------------------------------------------------------------|
 * | format    | string | See https://docs.angularjs.org/api/ng/filter/date              |
 *
 * @example
 *
 * Place the code like following into your HTML.
 * ```
 * <wp-date></wp-date>
 * ```
 * Then you will get like following.
 * ```
 * <div class="wp-date">2016-02-16 13:54:13</div>
 * ```
 *
 * You can set format string like following.
 * See https://docs.angularjs.org/api/ng/filter/date.
 * ```
 * <wp-date format="yyyy/MM/dd"></wp-date>
 * ```
 * Then you will get like following.
 * ```
 * <div class="wp-date">2016-02-16</div>
 * ```
 */
.directive( "wpDate", [ function() 
{
	return{
		restrict:'E',
		replace: true,
		require : '^haveWp',
		compile: function( tElement, tAttrs, transclude ) 
		{
			return {
				post: function postLink( scope, element, attrs, controller ) 
				{
					if ( ! attrs.format ) {
						scope.format = "yyyy/MM/ddTH:mm:ssZ";
					} else {
						scope.format = attrs.format;
					}
					var date = scope.$parent.wpitem.date_gmt + "Z";
					scope.date = date;
				}
			}
		},
		template: "<span class=\"the-date\">{{ date | date: format }}</span>"
	}
} ] )

;


/**
 * @module wp.services
 */
angular.module( "wp.services", [ "ngResource" ] )

.service( "WP", [ "$resource", "path", function( $resource, path ) 
{
	this.path = path.get();

	/**
	 * @name WP.Query
	 *
	 * @description
	 * Gets the WordPress objects from wp-api.
	 */
	this.Query = function( apiRoot ) 
	{
		var api = apiRoot + "/:endpoint/:id";
		var params = {
			endpoint: '@endpoint',
			id: '@id'
		};
		var actions = {};
		return $resource( api, params, actions );
	}

	this.parseFilters = function( filters ) 
	{

		var filter_strings = {};
		for ( var key in filters ) {
			filter_strings[ 'filter[' + key + ']' ] = filters[key];
		}

		return filter_strings;
	}
}])

;