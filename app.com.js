angular
    .module( "besgam-com", ["besgam", "pascalprecht.translate", "tmh.dynamicLocale", "ngRoute", "ngStorage", "angulartics", "angulartics.google.tagmanager"] )
    .config( function( $translateProvider, $routeProvider, $locationProvider, tmhDynamicLocaleProvider, $analyticsProvider, $provide )
    {
        $translateProvider.preferredLanguage( "en-gb" );

        // $provide.decorator('$sniffer', function($delegate) 
        // {
        //     $delegate.history = false;
        //     return $delegate;
        // });

        $routeProvider
            .when("/", {
                //controller: "index",
                //controllerAs: "vm",
                templateUrl: "/home.html"
            })
            .when("/surebet", {
                templateUrl: "/surebet.html"
            })
            .when("/blog", {
                templateUrl: "/blog-home.html"
            })
            .when("/blog/page/:page_number/", {
                templateUrl: "/blog-home.html"
            })
            .when("/blog/category/:category/", {
                templateUrl: "/blog-categories.html"
            })
            .when("/blog/tag/:tag/", {
                templateUrl: "/blog-categories.html"
            })
            .when("/blog/search/:search/", {
                templateUrl: "/blog-search.html"
            })
            .when("/blog/post/:post_title/", {
                templateUrl: "/blog-post.html"
            })
            .when("/apuestas/:league/:event/:id/:sportID/", {
                templateUrl: "/market.html"
            })
            .when("/redirect/:id_feed/:id_leaguet/:id_event/:id_bet/:bid/", {
                templateUrl: "/redirect.html"
            })
            .when("/redirect-live/:id_feed/:id_bet/", {
                templateUrl: "/redirect-live.html"
            })
            .when("/promotions", {
                templateUrl: "/promotions.html"
            })
            .when("/promotions/:record/", {
                templateUrl: "/promotions.html"
            })
            .when("/bonus", {
                templateUrl: "/bonus.html"
            })
            .when("/bono-feed/:record/", {
                templateUrl: "/bono-feed.html"
            })
            .when("/como-funciona", {
                templateUrl: "/como-funciona.html"
            })
            .when("/aboutus", {
                templateUrl: "/aboutus.html"
            })
            .when("/terms", {
                templateUrl: "terms.html"
            })
            .when("/newsletter/:email/", {
                templateUrl: "/newsletter.html"
            })
            .when("/register/:exit?", {
                templateUrl: "/register.html"
            })
            .when("/recovery/:token", {
                templateUrl: "/recovery.html"
            })
            .when("/showElection", {
                templateUrl: "/showElection.html"
            })
            .when("/faq", {
                templateUrl: "/faq.html"
            })
            .when("/glossary", {
                templateUrl: "/glossary.html"
            })
            .when("/marketHelp", {
                templateUrl: "/marketHelp.html"
            })
            .when("/search", {
                templateUrl: "/search.html"
            })
            .when("/search/:target/:sport/:league/", {
                templateUrl: "/search.html"
            })
            .when("/error-page", {
                templateUrl: "/error-page.html"
            })
            .when("/section-widget", {
                templateUrl: "/section-widget.html"
            })
            .when("/combinator", {
                templateUrl: "/combinator.html"
            })
            .when("/expired-event", {
                templateUrl: "/expired-event.html"
            })
            .when("/userHome/:iduser?", {
                templateUrl: "/userHome.html"
            })
            .when("/userSettings", {
                templateUrl: "/userSettings.html",
            })
            .when("/userAcademy", {
                templateUrl: "/userAcademy.html"
            })
            .when("/userPromotions", {
                templateUrl: "/userPromotions.html"
            })
            .when("/live-market/:livevent/", {
                templateUrl: "/live-market.html"
            })
            .when("/maqueta-live", {
                templateUrl: "/maqueta-live.html"
            })
            //zona tipster
            .when("/tipster-zone", {
                templateUrl: "/tipster-zone.html"
            })
            //file tipster
            .when("/tipster-file/:nick/", {
                templateUrl: "/tipster-file.html"
            })
            //registro tipster
            .when("/tipster-register", {
                templateUrl: "/tipster-register.html"
            })
            //tipster como funciona
            .when("/tipster-como-funciona", {
                templateUrl: "/tipster-como-funciona.html"
            })
            //tipster panel tips
            .when("/tipster-panel-tips", {
                templateUrl: "/tipster-panel-tips.html"
            })
            //tipster panel históricos
            .when("/tipster-panel-historic", {
                templateUrl: "/tipster-panel-historic.html"
            })
            //tipster panel ajustes
            .when("/tipster-panel-settings", {
                templateUrl: "/tipster-panel-settings.html"
            })
            //tipster panel ajustes
            .when("/tipster-panel-accumulated", {
                templateUrl: "/tipster-panel-accumulated.html"
            })
            .when("/live-list-search", {
                templateUrl: "/live-list-search.html"
            })
            .when("/deleteUser", {
                templateUrl: "/deleteUser.html"
            })
            .when("/widget-admin",
            {
                templateUrl: function()
                {
                    document.location.href = "http://feed1.besgam.com/widget-admin/";
                    //document.location.href = "http://www.besgam.com/widget-admin/";
                }
            })
            /* Espacio para el blog */
            .when("/google", {
                templateUrl: function()
                {
                    document.location.href = "http://www.google.com";
                }
            })
            .when("/blog2", {
                templateUrl: "/blog/"
            })
            .otherwise({ redirectTo: '/error-page' });

            $locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });

            $locationProvider.hashPrefix('!');
    })

    .run(function($localStorage, $translate, tmhDynamicLocale, $rootScope, $window, $location, GoogleTagManager, metas, dataFactory) 
    {
        var now = new Date(),
            offsetutc = (now.getTimezoneOffset() * 60 * 1000) * -1;

        //$localStorage.timeZoneOffset = $localStorage.timeZoneOffset || 0;
        $localStorage.timeZoneOffset = offsetutc;
        $localStorage.oddsType = $localStorage.oddsType || "fraction";
        $localStorage.language = $localStorage.language || "en-gb";
        $localStorage.locale = $localStorage.locale || "en-gb";
        $localStorage.$save();

        $translate.use( $localStorage.language );
        tmhDynamicLocale.set( $localStorage.locale ); // en-gb, en-us

        $rootScope.$on("$routeChangeStart", function()
        {
            switch( $location.path() )
            {
                case "/":
                    metas.setTitle("Comparador apuestas deportivas - Besgam");
                    metas.setMetaDescription("Mejora el nivel en tus apuestas deportivas de la mano de Besgam, el comparador de cuotas mas completo del mercado. No te quedes atras en tus apuestas");
                    metas.setKeywords("apuestas deportivas, buscador, comparador de cuotas, casas apuestas, Besgam, mercado, mundo apuestas, apuestas, rentabilidad, subir de nivel");
                break;
                case "/surebet":
                    metas.setTitle("Surebet para las apuestas deportivas - Besgam");
                    metas.setMetaDescription("Mejora tus apuestas con las surebets");
                    metas.setKeywords("apuestas deportivas, surebets, apuesta segura");
                break;
                default:
                    metas.setTitle("Comparador apuestas deportivas - Besgam");
                    metas.setMetaDescription("Mejora el nivel en tus apuestas deportivas de la mano de Besgam, el comparador de cuotas mas completo del mercado. No te quedes atras en tus apuestas");
                    metas.setKeywords("apuestas deportivas, buscador, comparador de cuotas, casas apuestas, Besgam, mercado, mundo apuestas, apuestas, rentabilidad, subir de nivel");
                break;
            } 

            $rootScope.title = metas.title();
            $rootScope.description = metas.description();
            $rootScope.keywords = metas.keywords();
            $rootScope.robots = metas.robots();
        });

        $rootScope.$on('$routeChangeSuccess', function()
        {
            dataFactory.setDataJson();
        });

        $rootScope.$on('$viewContentLoaded', function() 
        {
            var path = $location.path(),
                absUrl = $location.absUrl(),
                virtualUrl = absUrl.substring(absUrl.indexOf(path));
            GoogleTagManager.push({ event: 'virtualPageView', virtualUrl: virtualUrl });
        });

        /* Modificamos el baseName */
        document.getElementsByTagName("base")[0].setAttribute("href", "//" + $location.host());

    })

    .service('GoogleTagManager', function($window) 
    {
        this.push = function(data) 
        {
            try 
            {
                $window.dataLayer.push(data);
            } 
            catch (e) {}
        };
    })
;