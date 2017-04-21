angular
    .module( "besgam-es", ["besgam", "pascalprecht.translate", "tmh.dynamicLocale", "ngRoute", "ngStorage", "angulartics", "angulartics.google.tagmanager"] )
    .config( function( $translateProvider, $routeProvider, $locationProvider, tmhDynamicLocaleProvider, $analyticsProvider, $provide )
    {
        $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
        $analyticsProvider.withAutoBase(true);  /* Records full path */

        //$translateProvider.preferredLanguage( "es-es" );
        //tmhDynamicLocaleProvider.localeLocationPattern( "/src/lib/locale/angular-locale_{{ locale }}.js" );

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
            //surebet
            .when("/surebet", {
                templateUrl: "/surebet.html"
            })
            //market
            .when("/apuestas/:league/:event/:id/:sportID/", {
                templateUrl: "/market.html"
            })
            //redirect
            .when("/redirect/:id_feed/:id_league/:id_event/:id_bet/:id_bid/", {
                templateUrl: "/redirect.html"
            })
            //redirect-live
            .when("/redirect-live/:id_feed/:id_bet/", {
                templateUrl: "/redirect-live.html"
            })
            //promotions
            .when("/promociones-apuestas-deportivas", {
                templateUrl: "/promotions.html"
            })
            .when("/promociones-apuestas-deportivas/:record/", {
                templateUrl: "/promotions.html"
            })
            //como-funciona
            .when("/como-funciona-besgam", {
                templateUrl: "/como-funciona.html"
            })
            //bonus
            .when("/bonos-apuestas-deportivas", {
                templateUrl: "/bonus.html"
            })
            .when("/bonos-apuestas-deportivas/:record/", {
                templateUrl: "/bono-feed.html"
            })
            //aboutus
            .when("/todo-sobre-besgam", {
                templateUrl: "/aboutus.html"
            })
            //terms
            .when("/terminos-y-condiciones-de-besgam", {
                templateUrl: "/terms.html"
            })
            //newsletter
            .when("/newsletter/:email/", {
                templateUrl: "/newsletter.html"
            })
            //register
            .when("/registro-de-besgam/:exit?/", {
                templateUrl: "/register.html"
            })
            //recovery
            .when("/recovery/:token", {
                templateUrl: "/recovery.html"
            })
            //showElection
            .when("/selecciona-casas-de-apuestas-deportivas", {
                templateUrl: "/showElection.html"
            })
            //faq
            .when("/preguntas-frecuentes-apuestas-deportivas", {
                templateUrl: "/faq.html"
            })
            //glossary
            .when("/glosario-de-apuestas-deportivas", {
                templateUrl: "/glossary.html"
            })
            //marketHelp
            .when("/mercados-apuestas", {
                templateUrl: "/marketHelp.html"
            })
            //search
            .when("/comparador-apuestas-deportivas", {
                templateUrl: "/search.html"
            })
            .when("/comparador-apuestas-deportivas/:target/:sport/:league/", {
                templateUrl: "/search.html"
            })
            //error-page
            .when("/pagina-de-error", {
                templateUrl: "/error-page.html"
            })
            //section widget
            .when("/widget-de-besgam", {
                templateUrl: "/section-widget.html"
            })
            //combinator
            .when("/generador-apuestas-combinadas", {
                templateUrl: "/combinator.html"
            })
            //expired event
            .when("/evento-caducado", {
                templateUrl: "/expired-event.html"
            })
            //user home
            .when("/panel-de-usuario/:iduser?/", {
                templateUrl: "/userHome.html"
            })
            //user settings
            .when("/ajustes-del-panel-de-usuario", {
                templateUrl: "/userSettings.html",
            })
            //user academy
            .when("/blog-de-apuestas-deportivas-besgam", {
                templateUrl: "/userAcademy.html"
            })
            //user promotions
            .when("/promociones-apuestas-deportivas-panel-de-usuario-besgam", {
                templateUrl: "/userPromotions.html"
            })
            //market live
            .when("/live-market/:livevent/", {
                templateUrl: "/live-market.html"
            })
            //maquetalive
            .when("/maqueta-live", {
                templateUrl: "/maqueta-live.html"
            })
            //zona tipster
            .when("/tipsters", {
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
            //searchlive
            .when("/live-list-search", {
                templateUrl: "/live-list-search.html"
            })
            //delete user
            .when("/usuario-eliminado", {
                templateUrl: "/deleteUser.html"
            })
            // Blog
            .when("/blog", {
                templateUrl: "/blog-home.html"
            })
            .when("/blog/page/:page_number/", {
                templateUrl: "/blog-home.html"
            })
            .when("/blog/category/:category/:page_number/", {
                templateUrl: "/blog-categories.html"
            })
            .when("/blog/tag/:tag/:page_number/", {
                templateUrl: "/blog-categories.html"
            })
            .when("/blog/search/:search/:page_number/", {
                templateUrl: "/blog-search.html"
            })
            .when("/blog/post/:post_title/", {
                templateUrl: "/blog-post.html"
            })
            .when("/widget-admin",
            {
                templateUrl: function()
                {
                    document.location.href = 'http://www.besgam.com/widget-admin/login.html';
                    //document.location.href = 'http://new.besgam.com/es/widget-admin/';
                    //document.location.href = 'http://www.besgam.com/es/widget-admin/';
                }
            })
            /* Espacio para el blog */
            .when("/google", {
                templateUrl: function()
                {
                    document.location.href = "http://www.google.com";
                }
            })
            .otherwise({ redirectTo: '/error-page' });

            $locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });
            
            $locationProvider.hashPrefix('!');
    })

    .run(function($localStorage, $translate, tmhDynamicLocale, $rootScope, $location, GoogleTagManager, metas, dataFactory) 
    {
        var now = new Date(),
            offsetutc = (now.getTimezoneOffset() * 60 * 1000) * -1;

        //$localStorage.timeZoneOffset = $localStorage.timeZoneOffset || offsetutc;
        $localStorage.timeZoneOffset = offsetutc;
        $localStorage.oddsType = $localStorage.oddsType || "decimal";
        $localStorage.language = $localStorage.language || "es-es";
        $localStorage.locale = $localStorage.locale || "es-es";
        $localStorage.$save();

        $translate.use( $localStorage.language );
        tmhDynamicLocale.set( $localStorage.locale ); // en-gb, en-us

        $rootScope.$on("$routeChangeStart", function()
        {
            var token = $location.path().split("/"),
                firstT = token[1],
                params = token.slice(2, token.length).join("/");

            switch( firstT )
            {
                /* Metas SEO */
                case "":
                    metas.setTitle("Comparador de apuestas y cuotas deportivas - Besgam");
                    metas.setMetaDescription("Besgam, el comparador que busca por ti las mejores cuotas de apuestas deportivas. Pronósticos deportivos de los mejores expertos. ¡Entra, compara y gana!");
                    metas.setKeywords("besgam, apuestas deportivas, apuestas, comparador de apuestas, comparador apuestas deportivas, pronosticos deportivos, pronosticos apuestas, cuotas, comparador de cuotas, comparador cuotas, cuotas apuestas, cuotas deportivas");
                break;
                case "pagina-de-error":
                    metas.setTitle("Ha ocurrido un error con la búsqueda");
                    metas.setMetaDescription("Ocurrió un error con la búsqueda. Mientras tanto ¡sigue jugando en Besgam!");
                    metas.setKeywords("besgam, apuestas deportivas, apuestas, comparador de apuestas, comparador apuestas deportivas, pronosticos deportivos, pronosticos apuestas, cuotas, comparador de cuotas, comparador cuotas, cuotas apuestas, cuotas deportivas");
                break;
                case "surebet":
                    metas.setTitle("Surebets de Besgam - Apuestas deportivas seguras");
                    metas.setMetaDescription("Con las surebets de Besgam asegurarás tus ganancias en cualquier evento. Apuestas deportivas seguras para que siempre ganes. ¡Entra, apuesta y gana!");
                    metas.setKeywords("surebets, apuestas deportivas seguras, apuestas deportivas, surebet");
                break;
                case "widget-de-besgam":
                    metas.setTitle("Widget de Besgam, comparador de apuestas deportivas");
                    metas.setMetaDescription("Genera tu propio widget a través de Besgam y obtén la mejor cuota en tus apuestas deportivas");
                    metas.setKeywords("widget, apuestas deportivas, comparador de apuestas, besgam");
                break;
                case "mercados-apuestas":
                    metas.setTitle("Mercados de apuestas deportivas Besgam");
                    metas.setMetaDescription("Conoce todos los mercados para Cuotas deportivas y decide a cuál apostar.");
                    metas.setKeywords("mercados apuestas, apuestas deportivas cuotas, apuestas deportivas, mercado Cuotas");
                break;
                case "glosario-de-apuestas-deportivas":
                    metas.setTitle("Glosario de apuestas deportivas Besgam");
                    metas.setMetaDescription("Amplía tus conocimientos sobre apuestas deportivas en el glosario de Besgam.");
                    metas.setKeywords("glosario apuestas, apuestas deportivas cuotas, apuestas deportivas, glosario Cuotas");
                break;
                case "preguntas-frecuentes-apuestas-deportivas":
                    metas.setTitle("Preguntas frecuentes de apuestas deportivas");
                    metas.setMetaDescription("Resuelve tus dudas y Preguntas en las apuestas deportivas");
                    metas.setKeywords("faq, faq apuestas deportivas, preguntas frecuentes apuestas deportivas, faqs, preguntas frecuentes");
                break;
                 case "generador-apuestas-combinadas":
                    metas.setTitle("Combinador apuestas deporivas - Besgam");
                    metas.setMetaDescription("Con el combinator de Besgam podrás generar combinadas de apuestas deportivas.");
                    metas.setKeywords("combinador, apuestas deportivas combiandas, apuestas deportivas, combinadas");
                break;
                case "terminos-y-condiciones-de-besgam":
                    metas.setTitle("Términos y condiciones de Besgam - Apuestas y cuotas deportivas");
                    metas.setMetaDescription("Conoce los términos y condiciones de Besgam, el comparador de apuestas deportivas");
                    metas.setKeywords("besgam, apuestas deportivas, apuestas, comparador de apuestas, comparador apuestas deportivas, pronosticos deportivos, pronosticos apuestas, cuotas, comparador de cuotas, comparador cuotas, cuotas apuestas, cuotas deportivas");
                break;
                case "todo-sobre-besgam":
                    metas.setTitle("Todo sobre Besgam Comparador apuestas deportivas");
                    metas.setMetaDescription("Qué es Besgam, el comparador de cuotas");
                    metas.setKeywords("besgam, apuestas deportivas, apuestas, comparador de apuestas, comparador apuestas deportivas, pronosticos deportivos, pronosticos apuestas, cuotas, comparador de cuotas, comparador cuotas, cuotas apuestas, cuotas deportivas");
                break;
                case "como-funciona-besgam":
                    metas.setTitle("Cómo funciona Besgam Comparador de cuotas");
                    metas.setMetaDescription("Aprende cómo funciona Besgam, Comparador de cuotas y apuestas deportivas. Saca el mayor rendimiento a las apuestas deportivas");
                    metas.setKeywords("besgam, apuestas deportivas, apuestas, comparador de apuestas, comparador apuestas deportivas, pronosticos deportivos, pronosticos apuestas, cuotas, comparador de cuotas, comparador cuotas, cuotas apuestas, cuotas deportivas");
                break;
                case "promociones-apuestas-deportivas":
                    metas.setTitle("Promociones especiales para tus apuestas deportivas");
                    metas.setMetaDescription("Promociones y ofertas para tus apuestas deportivas. En Besgam tenemos las mejores promociones y ofertas de las mejores casas de apuestas deportivas.");
                    metas.setKeywords("promociones apuestas deportivas, ofertas apuestas deportivas");
                break;
                case "apuestas":

                    /* Obtener datos de los equipos, deportes y ligas */
                    var str_league = token[2].replace(/-/g," "),
                        str_event = token[3].replace(/-/g," "),
                        aEvent = str_event.split('vs');

                    metas.setTitle("Eventos de apuestas deportivas. Apuesta al " +  aEvent[0] + " vs " + aEvent[1] + " de " + str_league + " tras conocer con Besgam las mejores cuotas");
                    metas.setMetaDescription("Busca en Besgam las mejores cuotas del  mercado para " +  aEvent[0] + " vs " + aEvent[1] + " de " + str_league + ". Compara y consigue el mayor rendimiento en tus apuestas deportivas");
                    metas.setKeywords(aEvent[0] + ", " + aEvent[1] + ", " + str_league + ", besgam, apuestas, rendimiento, comparador de cuotas, casas apuestas, comparador apuestas, apuestas deportivas");
                break;
                case "bonos-apuestas-deportivas":
                    metas.setTitle("Bonos exlusivos de casas de apuestas deportivas - Besgam");
                    metas.setMetaDescription("Besgam te ofrece los bonos más exlusivos de las mejores casas de apuestas deportivas: Sportium, Bet365, William Hill, Luckia,  Paf, 888sport, Titanbet…");
                    metas.setKeywords("bonos apuestas deportivas, bonos apuestas, bonos casas apuestas,bono apuestas, bonos de apuestas");
                break;
                case "comparador-apuestas-deportivas":


                    metas.setTitle("Comparador de apuestas y cuotas deportivas - Besgam");
                    metas.setMetaDescription("Besgam, el comparador que busca por ti las mejores cuotas de apuestas deportivas. Pronósticos deportivos de los mejores expertos. ¡Entra, compara y gana!");
                    metas.setKeywords("besgam, apuestas deportivas, apuestas, comparador de apuestas, comparador apuestas deportivas, pronosticos deportivos, pronosticos apuestas, cuotas, comparador de cuotas, comparador cuotas, cuotas apuestas, cuotas deportivas");
                break;
                case "evento-caducado":
                    metas.setTitle("Eventos de apuestas deportivas - Besgam");
                    metas.setMetaDescription("Besgam, el comparador que busca por ti las mejores cuotas de apuestas deportivas. Pronósticos deportivos de los mejores expertos. ¡Entra, compara y gana!");
                    metas.setKeywords("besgam, apuestas deportivas, apuestas, comparador de apuestas, comparador apuestas deportivas, pronosticos deportivos, pronosticos apuestas, cuotas, comparador de cuotas, comparador cuotas, cuotas apuestas, cuotas deportivas");
                break;
                case "panel-de-usuario":
                    metas.setTitle("Panel de usuario de Besgam - Comparador apuestas deportivas");
                    metas.setMetaDescription("Besgam, el comparador que busca por ti las mejores cuotas de apuestas deportivas. Pronósticos deportivos de los mejores expertos. ¡Entra, compara y gana!");
                    metas.setKeywords("besgam, apuestas deportivas, apuestas, comparador de apuestas, comparador apuestas deportivas, pronosticos deportivos, pronosticos apuestas, cuotas, comparador de cuotas, comparador cuotas, cuotas apuestas, cuotas deportivas");
                break;
                case "ajustes-del-panel-de-usuario":
                    metas.setTitle("Panel de usuario de Besgam - Comparador apuestas deportivas");
                    metas.setMetaDescription("Besgam, el comparador que busca por ti las mejores cuotas de apuestas deportivas. Pronósticos deportivos de los mejores expertos. ¡Entra, compara y gana!");
                    metas.setKeywords("besgam, apuestas deportivas, apuestas, comparador de apuestas, comparador apuestas deportivas, pronosticos deportivos, pronosticos apuestas, cuotas, comparador de cuotas, comparador cuotas, cuotas apuestas, cuotas deportivas");
                break;
                case "blog-de-apuestas-deportivas-besgam":
                    metas.setTitle("Panel de usuario de Besgam - Comparador apuestas deportivas");
                    metas.setMetaDescription("Blog de apuestas deportivas, pronósticos deportivos, escuela, promociones, eventos y la pizarra de Jaime Ugarte. Con Besgam tus apuestas valen oro.");
                    metas.setKeywords("bonos apuestas deportivas, bonos apuestas, bonos casas apuestas,bono apuestas, bonos de apuestas");
                break;
                case "promociones-apuestas-deportivas-panel-de-usuario-besgam":
                    metas.setTitle("Promociones especiales para tus apuestas deportivas");
                    metas.setMetaDescription("Promociones y ofertas para tus apuestas deportivas. En Besgam tenemos las mejores promociones y ofertas de las mejores casas de apuestas deportivas.");
                    metas.setKeywords("promociones apuestas deportivas, ofertas apuestas deportivas");
                break;
                case "usuario-eliminado":
                    metas.setTitle("Comparador de apuestas y cuotas deportivas - Besgam");
                    metas.setMetaDescription("Besgam, el comparador que busca por ti las mejores cuotas de apuestas deportivas. Pronósticos deportivos de los mejores expertos. ¡Entra, compara y gana!");
                    metas.setKeywords("besgam, apuestas deportivas, apuestas, comparador de apuestas, comparador apuestas deportivas, pronosticos deportivos, pronosticos apuestas, cuotas, comparador de cuotas, comparador cuotas, cuotas apuestas, cuotas deportivas");
                break;
                case "registro-de-besgam":
                    metas.setTitle("Regístrate en el Comparador de apuestas y cuotas deportivas - Besgam");
                    metas.setMetaDescription("Besgam, el comparador que busca por ti las mejores cuotas de apuestas deportivas. Pronósticos deportivos de los mejores expertos. ¡Regísterate, compara y gana!");
                    metas.setKeywords("besgam, apuestas deportivas, apuestas, comparador de apuestas, comparador apuestas deportivas, pronosticos deportivos, pronosticos apuestas, cuotas, comparador de cuotas, comparador cuotas, cuotas apuestas, cuotas deportivas");
                break;
                case "selecciona-casas-de-apuestas-deportivas":
                    metas.setTitle("Elige en que casas de apuestas deportivas estas registrado");
                    metas.setMetaDescription("Selecciona las casas de apuestas deportivas en las que estés registrado y empieza a apostar");
                    metas.setKeywords("besgam, apuestas deportivas, apuestas, bet365, williamhill, pronosticos deportivos, interwetten, cuotas, comparador de cuotas, luckia, betfair, goldenpark");
                break;

                /* Redireccionamientos */
                case "search":
                    $location.path("/comparador-apuestas-deportivas/" + params );
                break;
                case "combinator":
                    $location.path("/generador-apuestas-combinadas");
                break;
                case "error-page":
                    $location.path("/pagina-de-error");
                break;
                case "expired-event":
                    $location.path("/evento-caducado");
                break;
                case "faq":
                    $location.path("/preguntas-frecuentes-apuestas-deportivas");
                break;
                case "marketHelp":
                    $location.path("/mercados-apuestas");
                break;
                case "glossary":
                    $location.path("/glosario-de-apuestas-deportivas");
                break;
                case "section-widget":
                    $location.path("/widget-de-besgam");
                break;
                case "como-funciona":
                    $location.path("/como-funciona-besgam");
                break;
                case "aboutus":
                    $location.path("/todo-sobre-besgam");
                break;
                case "terms":
                    $location.path("/terminos-y-condiciones-de-besgam");
                break;
                case "promotions":
                    $location.path("/promociones-apuestas-deportivas/" + params );
                break;
                case "bonus":
                    $location.path("/bonos-apuestas-deportivas");
                break;
                case "bono-feed":
                    $location.path("/bonos-apuestas-deportivas/" + params );
                break;
                case "userHome":
                    $location.path("/panel-de-usuario/" + params );
                break;
                case "userSettings":
                    $location.path("/ajustes-del-panel-de-usuario");
                break;
                case "userAcademy":
                    $location.path("/blog-de-apuestas-deportivas-besgam");
                break;
                case "userPromotions":
                    $location.path("/promociones-apuestas-deportivas-panel-de-usuario-besgam");
                break;
                case "deleteUser":
                    $location.path("/usuario-eliminado");
                break;
                case "register":
                    $location.path("/registro-de-besgam/" + params );
                break;
                case "showElection":
                    $location.path("/selecciona-casas-de-apuestas-deportivas");
                break;
                /* Por defecto */
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
        document.getElementsByTagName("base")[0].setAttribute("href", "//" + $location.host() + "/es/" );
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