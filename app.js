var besgamApp = angular
    /************************************************************************/
    /*                              Aplicación                              */
    /************************************************************************/
    /* Modulo */
    .module( "besgam", ["wp.api", "infinite-scroll", "pascalprecht.translate", "tmh.dynamicLocale", "ngSanitize", "vcRecaptcha", "ngAnimate", "ui.bootstrap", "ui.bootstrap.tpls", "ngTagsInput", "angularRangeSlider", "nvd3", "angulartics", "angulartics.google.tagmanager", "angular-flexslider", "slick", "visibilityChange", "duScroll", "ngImgCrop"], function( $httpProvider )
    {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    })
    /* Configuración */
    .config( ["$translateProvider", "tmhDynamicLocaleProvider", "pathProvider", function( $translateProvider, tmhDynamicLocaleProvider, pathProvider )
    {
        pathProvider.set("http://www.besgam.com/blog/wp-json/wp/v2");

        $translateProvider
            .useLoader( "angularTranslateAsyncLoader" )
            .useSanitizeValueStrategy('escaped')
            .usePostCompiling(true);

        tmhDynamicLocaleProvider.localeLocationPattern( "/src/lib/locale/angular-locale_{{ locale }}.js" );
        //tmhDynamicLocaleProvider.localeLocationPattern( "https://code.angularjs.org./1.5.0/i18n/angular-locale_{{ locale }}.js");

    }])
    /* Inicio */
    .run(["$templateCache", "$rootScope", "$filter", "uibPaginationConfig", "uibPagerConfig", "VisibilityChange", function( $templateCache, $rootScope, $filter, uibPaginationConfig, uibPagerConfig, VisibilityChange ) 
    {
        VisibilityChange.configure({broadcast: true});
        
        $templateCache.put("uib/template/rating/rating.html", '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <span ng-repeat-start="r in range track by $index" class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    <i ng-repeat-end ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="star-rating" ng-class="$index < value && (r.stateOn || \'fa-star\') || (r.stateOff || \'fa-star-o\')" ng-attr-title="{{r.title}}" aria-valuetext="{{r.title}}"></i>\n</span>\n');

        // $rootScope.$on("$routeChangeStart", function()
        // {
        //     window.scrollTo(0,0);
        // });

        $rootScope.$on('$translateChangeSuccess', function()
        {
            uibPaginationConfig.previousText = $filter('translate')('pagination.previous');
            uibPaginationConfig.nextText = $filter('translate')('pagination.next');

            uibPagerConfig.previousText = $filter('translate')('pagination.previous');
            uibPagerConfig.nextText = $filter('translate')('pagination.next');
        });


        FastClick.attach(document.body);
    }])

    /************************************************************************/
    /*                               TIPSTER                                */
    /************************************************************************/

//     .controller('tipsterGraphic', function( $scope )
//     {
//         $scope.options = {
//             chart: {
//                 type: 'pieChart',
//                 height: 450,
//                 donut: true,
//                 x: function(d)
//                 {
//                     return d.key;
//                 },
//                 y: function(d)
//                 {
//                     return d.y;
//                 },
//                 showLabels: true,

//                 pie: 
//                 {
//                     startAngle: function(d) 
//                     { 
//                         return d.startAngle/2 -Math.PI/2 
//                     },
//                     endAngle: function(d) 
//                     { 
//                         return d.endAngle/2 -Math.PI/2 
//                     }
//                 },
//                 duration: 500,
//                 color: ['#179ab5','#6bbbbc'],
//                 showLegend: false,
//             }
            
//         };

//         $scope.data = [
//             {
//                 key: "Acumulado",
//                 y: 5
//             },
//             {
//                 key: "Falta",
//                 y: 2
//             }
//         ];

//         $scope.Rssoptions = {
//             chart: {
//                 type: 'pieChart',
//                 height: 450,
//                 x: function(d){return d.key;},
//                 y: function(d){return d.y;},
//                 showLabels: true,
//                 duration: 500,
//                 labelThreshold: 0.01,
//                 labelSunbeamLayout: true,
//                 showLegend: false,
//                 color: ['#e59c46','#09789d','#ff6364','#32bca7']
//             }
//         };

//         $scope.Rssdata = [
//             {
//                 key: "Facebook",
//                 y: 2
//             },
//             {
//                 key: "Twitter",
//                 y: 2
//             },
//             {
//                 key: "Besgam",
//                 y: 9
//             },
//             {
//                 key: "Seguidores",
//                 y: 7
//             }
//         ];
//         $scope.earnOptions = {
//             chart: {
//                 type: 'cumulativeLineChart',
//                 height: 250,
//                 margin : {
//                     top: 20,
//                     right: 20,
//                     bottom: 60,
//                     left: 65
//                 },
//                 x: function(d){ return d[0]; },
//                 y: function(d){ return d[1]/100; },
//                 average: function(d) { return d.mean/100; },

//                 color: d3.scale.category10().range(),
//                 duration: 300,
//                 useInteractiveGuideline: true,
//                 clipVoronoi: false,

//                 xAxis: {
//                     axisLabel: 'X Axis',
//                     tickFormat: function(d) {
//                         return d3.time.format('%m/%d/%y')(new Date(d))
//                     },
//                     showMaxMin: false,
//                     staggerLabels: true
//                 },

//                 yAxis: {
//                     axisLabel: 'Y Axis',
//                     tickFormat: function(d){
//                         return d3.format(',.1%')(d);
//                     },
//                     axisLabelDistance: 20
//                 },
//                 showLegend: false,
//                 showYAxis: false,
//                 showXAxis: false
//             }
//     };

//     $scope.earndata = [
//         {
//             key: "Seguidores",
//             values: [ 
//             [ 1083297600000 , 0] , 
//             [ 1085976000000 , 10] , 
//             [ 1088568000000 , 30] , 
//             [ 1091246400000 , 50] , 
//             [ 1093924800000 , 63] , 
//             [ 1096516800000 , 64] , 
//             [ 1099195200000 , 64] , 
//             [ 1101790800000 , 64] , 
//             [ 1104469200000 , 64] , 
//             [ 1107147600000 , 70] , 
//             [ 1109566800000 , 71] , 
//             [ 1112245200000 , 72] , 
//             [ 1114833600000 , 72] , 
//             [ 1117512000000 , 74] , 
//             [ 1120104000000 , 75] , 
//             [ 1122782400000 , 78] , 
//             [ 1125460800000 , 78] , 
//             [ 1128052800000 , 90] , 
//             [ 1130734800000 , 91] , 
//             [ 1133326800000 , 95] , 
//             [ 1136005200000 , 97] , 
//             [ 1138683600000 , 127] , 
//             [ 1141102800000 , 128] , 
//             [ 1143781200000 , 130] , 
//             [ 1146369600000 , 140] , 
//             [ 1149048000000 , 156] , 
//             [ 1151640000000 , 179] , 
//             [ 1154318400000 , 190] , 
//             [ 1156996800000 , 210] , 
//             ],
//             mean: 250
//         },
//         {
//             key: "Facebook",
//             values: [ 
//             [ 1083297600000 , 0] , 
//             [ 1085976000000 , 1] , 
//             [ 1088568000000 , 3] , 
//             [ 1091246400000 , 5] , 
//             [ 1093924800000 , 10] , 
//             [ 1096516800000 , 20] , 
//             [ 1099195200000 , 21] , 
//             [ 1101790800000 , 40] , 
//             [ 1104469200000 , 50] , 
//             [ 1107147600000 , 50] , 
//             [ 1109566800000 , 53] , 
//             [ 1112245200000 , 59] , 
//             [ 1114833600000 , 63] , 
//             [ 1117512000000 , 64] , 
//             [ 1120104000000 , 66] , 
//             [ 1122782400000 , 73] , 
//             [ 1125460800000 , 71] , 
//             [ 1128052800000 , 71] , 
//             [ 1130734800000 , 77] , 
//             [ 1133326800000 , 95] , 
//             [ 1136005200000 , 107] , 
//             [ 1138683600000 , 127] , 
//             [ 1141102800000 , 122] , 
//             [ 1143781200000 , 126] , 
//             [ 1146369600000 , 132] , 
//             [ 1149048000000 , 133] , 
//             [ 1151640000000 , 133] , 
//             [ 1154318400000 , 133] , 
//             [ 1156996800000 , 133] , 
//             ],
//             mean: -60
//         },


//         {
//             key: "Twitter",
//             mean: 125,
//             values: [ 
//             [ 1083297600000 , 0] , 
//             [ 1085976000000 , 85] , 
//             [ 1088568000000 , 86] , 
//             [ 1091246400000 , 86] , 
//             [ 1093924800000 , 86] , 
//             [ 1096516800000 , 86] , 
//             [ 1099195200000 , 99] , 
//             [ 1101790800000 , 99] , 
//             [ 1104469200000 , 99] , 
//             [ 1107147600000 , 99] , 
//             [ 1109566800000 , 122] , 
//             [ 1112245200000 , 122] , 
//             [ 1114833600000 , 123] , 
//             [ 1117512000000 , 125] , 
//             [ 1120104000000 , 130] , 
//             [ 1122782400000 , 130] , 
//             [ 1125460800000 , 130] , 
//             [ 1128052800000 , 130] , 
//             [ 1130734800000 , 142] , 
//             [ 1133326800000 , 143] , 
//             [ 1136005200000 , 143] , 
//             [ 1138683600000 , 243] , 
//             [ 1141102800000 , 243] , 
//             [ 1143781200000 , 245] , 
//             [ 1146369600000 , 245] , 
//             [ 1149048000000 , 245] , 
//             [ 1151640000000 , 246] , 
//             [ 1154318400000 , 350] , 
//             [ 1156996800000 , 363] , 
//             ]
//         },
//         {
//             key: "Besgam",
//             values: [ 
//             [ 1083297600000 , 60] , 
//             [ 1085976000000 , 65] , 
//             [ 1088568000000 , 65] , 
//             [ 1091246400000 , 65] , 
//             [ 1093924800000 , 66] , 
//             [ 1096516800000 , 67] , 
//             [ 1099195200000 , 68] , 
//             [ 1101790800000 , 68] , 
//             [ 1104469200000 , 68] , 
//             [ 1107147600000 , 68] , 
//             [ 1109566800000 , 72] , 
//             [ 1112245200000 , 89] , 
//             [ 1114833600000 , 89] , 
//             [ 1117512000000 , 89] , 
//             [ 1120104000000 , 89] , 
//             [ 1122782400000 , 89] , 
//             [ 1125460800000 , 92] , 
//             [ 1128052800000 , 92] , 
//             [ 1130734800000 , 95] , 
//             [ 1133326800000 , 96] , 
//             [ 1136005200000 , 97] , 
//             [ 1138683600000 , 105] , 
//             [ 1141102800000 , 125] , 
//             [ 1143781200000 , 125] , 
//             [ 1146369600000 , 125] , 
//             [ 1149048000000 , 139] , 
//             [ 1151640000000 , 147] , 
//             [ 1154318400000 , 148] , 
//             [ 1156996800000 , 180] , 
//             ],
//              mean: 250
//         }
//     ];
// })


    





















    // .controller('tipsterGallery', function( $scope, $translate )
    // {
    //     $scope.tipGallery = [
    //         {
    //             image: '/img/besgam-icons/icons/gallery-tipster-1.jpg',
    //             title: "tipster.howWork.gallery.title1",
    //             text: "tipster.howWork.gallery.text1"

    //         },
    //         {
    //             image: '/img/besgam-icons/icons/gallery-tipster-2.jpg',
    //             title: "tipster.howWork.gallery.title2",
    //             text: "tipster.howWork.gallery.text2"
    //         },
    //         {
    //             image: '/img/besgam-icons/icons/gallery-tipster-3.jpg',
    //             title: "tipster.howWork.gallery.title3",
    //             text: "tipster.howWork.gallery.text3"
    //         }
    //     ];

    //     // $translate('tipster.howWork.gallery.text3').then(function (translation) // "Deporte";
    //     // {
    //     //     $scope.titleSport = translation;
    //     // }); 


    //     $scope.aBefore = function()
    //     {
    //         $scope.varPrueba=true;
    //     }

    //     $scope.aAfter = function()
    //     {
    //         $scope.varPrueba = false;
    //     }

    // })

    // .controller('tipsterFile', function( $scope, dataFactory, $route, tipster, tipsterOdds )
    // {
    //     /* Instanciamos */
    //     $scope.aOdds = [];
        

    //     dataFactory.getDataFeed().then( function(res)
    //     {
    //         $scope.feed = res.data;

    //         /* Param identificador del tipster relacionado con el param del app.es */
    //         var nick = $route.current.params.nick;

    //         /* llamada al servicio */
    //         tipster.data($route.current.params.nick)
    //         .then(function(res)
    //         {
    //             $scope.tipster = {};

                

    //             if( typeof res != 'undefined' )
    //             {
    //                 var cTips, 
    //                     hTips,
    //                     data = res[0];
                    

    //                 tipster.gTips(data.tipster, 'C')
    //                     .then(function(res)
    //                     {
    //                         cTips = res;  

    //                         tipster.gTips(data.tipster, 'H')
    //                         .then(function(res)
    //                         {
    //                             hTips = res;

    //                             $scope.tipster = {
    //                                 data: data,
    //                                 cTips: cTips,
    //                                 hTips: hTips
    //                             };
    //                         });  

    //                     });
    //             }

                
    //         });

    //         $scope.getOdds = function( index, value )
    //         {
    //             /* llamamos al servicio */
    //             tipsterOdds.tipBets( value, $scope.feed )
    //             .then(function(res)
    //             {
    //                 $scope.aOdds[index] = res;
    //             });
    //         }

    //         var statisticData = function( obj )
    //         {
    //             var arr = [];

    //             angular.forEach(obj, function(value, key) 
    //             {
    //                 this.push({
    //                     key: key,
    //                     value: value
    //                 });
    //             }, arr);

    //             return arr;
    //         };
    //     });
    // })

    // .controller('tipster', function($scope, dataFactory, $route, tipsterOdds, tipster)
    // {
    //     $scope.aOdds = [];
    //     $scope.events = [];
    //     $scope.filterEvent = [];

    //     $scope.selectedInput = {};

    //     $scope.$on( 'LOAD', function(){ $scope.loading = true } );
    //     $scope.$on( 'UNLOAD', function(){ $scope.loading = false } );

    //     $scope.$emit('LOAD');

    //     $scope.rangeOdd = [
    //         { odd: 1.1 },
    //         { odd: 1.2 },
    //         { odd: 1.4 },
    //         { odd: 1.6 },
    //         { odd: 1.8 },
    //         { odd: 2.0 },
    //         { odd: 2.2 },
    //         { odd: 2.5 },
    //         { odd: 3.0 },
    //         { odd: 3.5 },
    //         { odd: 4.0 },
    //         { odd: 4.5 },
    //         { odd: 5.0 },
    //         { odd: 6.0 },
    //         { odd: 7.0 },
    //         { odd: 8.0 },
    //         { odd: 9.0 },
    //         { odd: 10.0 },
    //         { odd: 15.0 },
    //         { odd: 20.0 },
    //         { odd: 100}
    //     ];

    //     $scope.item = [{
    //         name  : 'RangeOddLow',
    //         value : 0
    //     },
    //     {
    //         name  : 'rangeOddHigh',
    //         value : 20
    //     }];        

    //     $scope.getOdds = function( id )
    //     {
    //         var itemData = $scope.items[id],
    //             // declaramos la variable aSendData como un array 
    //             aSendData = [];

    //         // recorremos el array
    //         for( var nCont = 0, len = itemData.bet.length;
    //             nCont < len;
    //             nCont++)
    //         {
    //             // cortamos la cadena por los " | "
    //             var aTokens = itemData.bet[nCont];  

    //             // formamos un objeto y le hacemos un push de los cortes de aTokens para poderlos usar 
    //             aSendData.push( aTokens );
    //         }

    //         // llamamos al servicio
    //         tipsterOdds.tipBets( aSendData, $scope.feed )
    //         .then(function(res)
    //         {
    //             $scope.aOdds[id] = res;
    //         },
    //         function(err)
    //         {
    //             $scope.aOdds[id].push(res);
    //         });
    //     };

    //     dataFactory.getDataFeed().then( function(res)
    //     {
    //         $scope.feed = res.data;

    //         dataFactory.getDataJson().then( function(res)
    //         {
    //             /* Paginación */
    //             $scope.currentPage = 1;
    //             $scope.numPerPage = 10;
    //             $scope.maxSize = 5;

    //             $scope.setPage = function (pageNo) 
    //             {
    //                 window.scrollTo(0,0);
    //                 $scope.currentPage = pageNo;
    //             };

    //             $scope.events = res.data; //todos los eventos

    //             $scope.filterEvent = res.data; //todos los eventos que ya están filtrados

    //             $scope.events.map(function(it)
    //             {
    //                 if( it.markets != null )
    //                     it.tips = parseInt(it.markets.str_bet['1'][0].n_odd);
    //                 else
    //                     it.tips = 0;   
    //             });

    //             /* Ordenación */
    //             var orderObj = ['-tips','orderTime'];
    //             $scope.setOrdered = function( obj )
    //             {
    //                 orderObj = obj;
    //             };
    //             $scope.ordered = function()
    //             {
    //                 return orderObj;
    //             };
    //             $scope.changeOrder = function()
    //             {  
    //                 if( $scope.selectedInput.date == 1 && $scope.selectedInput.tips == 1 )
    //                 {
    //                     $scope.setOrdered(['tips','-orderTime']);
    //                 }
    //                 else if( $scope.selectedInput.date == 1 && $scope.selectedInput.tips != 1 )
    //                 {
    //                     $scope.setOrdered(['-tips','-orderTime']);
    //                 }
    //                 else if( $scope.selectedInput.date != 1 && $scope.selectedInput.tips != 1 )
    //                 {
    //                     $scope.setOrdered(['-tips','orderTime']);
    //                 }                
    //                 else
    //                 {
    //                     $scope.setOrdered(['tips','orderTime']);
    //                 }   
    //             };

    //             /* Ordenación top tipsters acierto, deporte, beneficio, seguidores */
    //             var orderTip = ['ranking', '-tips.ok', '!-sport[1]', '-sport[1]', '-benefit','-followers'];
    //             $scope.setOrderedTip = function( obj )
    //             {
    //                 orderTip = obj;
    //             };
    //             $scope.orderedTip = function()
    //             {
    //                 return orderTip;
    //             };
    //             $scope.changeTipster = function( filter )
    //             {
    //                 if( filter.substring(0, 7) == '-sport[' ) //cogemos los caracateres del string entre las posiciones 0 y 5 y comprobamos que sea igual a sport[
    //                 {
    //                     orderTip.map( function ( value, index ) //VALUE es el elemento actual del array que se está procesando // INDEX posición actual del value
    //                     {
    //                         if( value.substring(0, 7) == '-sport[' || value.substring(0, 8) == '!-sport[' )
    //                             orderTip.splice( index, 1 ); //Slice() elimina elementos del array, tanto como hayas indicado en los parámetros
    //                     }); 

    //                     orderTip.unshift( filter ); //unshift añade elementos al principio del array
    //                     orderTip.unshift( '!'+filter ); //unshift añade elementos al principio del array
    //                 }
    //                 else
    //                 {
    //                     var filterAux;
    //                     //buscamos el caracter '_' Si no lo tiene, lo añade y viceversa
    //                     if( filter.charAt(0) != '-' )
    //                         filterAux = '-'+filter;
    //                     else
    //                         filterAux = filter.substr(1);

    //                     //Recorremos el array orderTip
    //                     orderTip.map( function ( value, index ) //VALUE es el elemento actual del array que se está procesando // INDEX posición actual del value
    //                     {
    //                         if( filter == value || filterAux == value )
    //                         {
    //                             orderTip.splice( index, 1 ); //Slice() elimina elementos del array, tanto como hayas indicado en los parámetros
    //                             orderTip.unshift( filter ); //unshift añade elementos al principio del array
    //                         }
    //                     });    
    //                 }              
    //             };

    //             /* Deportes */
    //             $scope.prematchSports = $scope.events.reduce(function(sum, place) 
    //             {
    //                 if(sum.indexOf( place.sportID ) < 0) sum.push( place.sportID );

    //                 return sum;
    //             }, []);

    //             /* Lista de ligas */
    //             listPrematchLeagues();

    //             $scope.$emit('UNLOAD');
    //         });
    //     });

    //     var listPrematchDataFilter = function( data )
    //     {
    //         var dataFilter = [];

    //         if( $scope.selectedInput.league != "" )
    //         {
    //             angular.forEach(data, function(value, key) 
    //             {
    //                 if( value.league == $scope.selectedInput.league )
    //                     dataFilter.push(value);
    //             });
    //         }
    //         else if( $scope.selectedInput.sport != "" )
    //         {
    //             angular.forEach(data, function(value, key) 
    //             {
    //                 if( value.sportID == $scope.selectedInput.sport )
    //                     dataFilter.push(value);
    //             });
    //         }
    //         else
    //         {
    //             dataFilter = data;
    //         }

    //         return changeRange(dataFilter);
    //     };

    //     var listPrematchLeagues = function()
    //     {
    //         $scope.prematchLeagues = $scope.events.reduce(function(sum, place) 
    //         {
    //             if( place.league != null )
    //             {
    //                 if( $scope.selectedInput.sport && $scope.selectedInput.sport != "" )
    //                 {
    //                     if (sum.indexOf( place.league ) < 0 && $scope.selectedInput.sport == place.sportID )
    //                         sum.push( place.league );
    //                 }
    //                 else
    //                 {
    //                     if (sum.indexOf( place.league ) < 0) 
    //                         sum.push( place.league );
    //                 }
    //             }
    //             return sum;
    //         }, []);
    //     };

    //     var changeRange = function( data )
    //     {
    //         var dataFilter = [];

    //         angular.forEach( data, function(value, key)
    //         {
    //             var fInsert = false;

    //             if( value.markets )
    //             {
    //                 angular.forEach( value.markets.str_bet, function( bet, keyBet)
    //                 {
    //                     if( bet[0].n_odd <= parseFloat($scope.rangeOdd[$scope.item[1].value].odd) && bet[0].n_odd >= parseFloat($scope.rangeOdd[$scope.item[0].value].odd) ) fInsert = true;
    //                 });
    //             }
    //             else
    //               fInsert = true  

    //             if( fInsert ) dataFilter.push( value );
    //         });

    //         return dataFilter;
    //     };

    //     $scope.changeListPrematch = function()
    //     {  
    //         /* Lista de ligas */
    //         listPrematchLeagues();

    //         $scope.filterEvent = listPrematchDataFilter($scope.events );
    //     };
        
    //     tipster.data()
    //     .then(function(res)
    //     {
    //        $scope.tipster = res;

    //        /* Paginación */
    //         $scope.currentTipsterPage = 1;
    //         $scope.numTipPerPage = 8;
    //         $scope.maxSize = 5;

    //         $scope.setTipPage = function (pageNo) 
    //         {
    //             window.scrollTo(0,0);
    //             $scope.currentTipsterPage = pageNo;
    //         };
            
    //     });

    //     $scope.viewPredictions = function(index, eventID)
    //     {
    //         $scope.items = [];

    //         if( $scope.tipsDrp != index )
    //         {
    //             $scope.tipsDrp = index;

    //             //predicciones
    //             tipster.eTips( eventID )
    //             .then(function(res)
    //             {
    //                res.map(function(it)
    //                {
    //                     tipster.data( it.tipster )
    //                     .then(function(resT)
    //                     {
    //                         $scope.items.push({

    //                             ranking: resT[0].ranking,
    //                             nick: resT[0].nick,
    //                             mail: resT[0].mail,
    //                             img: resT[0].img,
    //                             tipBenefit: resT[0].benefit,
    //                             tipYield: resT[0].yield,
    //                             tipStake: resT[0].stake,
    //                             tips: resT[0].tips,
    //                             sport: resT[0].sport,

    //                             comment: it.comment,
    //                             tipster: it.tipster,
    //                             stake: it.stake,
    //                             cuote: it.cuote,
    //                             bet: it.bet
    //                         });
    //                     })
    //                     .catch(function( e )
    //                     {
    //                         console.log("ocurrio un error %s en tipster.data", e );
    //                     });
    //                 });
    //             })
    //             .catch(function( e )
    //             {
    //                 console.log("ocurrio un error %s en tipster.eTips", e );
    //             });

    //         }
    //         else
    //             $scope.tipsDrp = -1; 

    //     };

    // })

    /************************************************************************/
    /*                              LIVE                                    */
    /************************************************************************/

    // .controller('realTimeCard', function($scope, $http, $route, $filter, $timeout, $translate, socket, dataFactory, $route, VisibilityChange) 
    // {
    //     /* Instanciamos */
    //     var host = 'http://des.besgam.com:8080',
    //         livevent = $route.current.params.livevent,
    //         fileChartData = host + "/file/" + livevent + ".txt",
    //         chartData = [];

    //     /* Reinicializamos */
    //     $scope.item = null;
    //     $scope.payout = 0;
    //     $scope.chartData = null;
    //     $scope.active = {
    //         marketID: null
    //     };

    //     $scope.$on( 'LOAD'  , function(){ $scope.loading = true } );
    //     $scope.$on( 'UNLOAD', function(){ $scope.loading = false } );
    //     $scope.$on( 'PING'  , function(){ $scope.close   = false } );
    //     $scope.$on( 'LEAVE' , function(){ $scope.close   = true } );

    //     $scope.$emit('LOAD');

    //     VisibilityChange.onVisible(function() 
    //     {
    //         $route.reload();
    //         //$scope.$emit('LOAD');
    //         //socket.emit("subscribe", livevent);
    //         //console.log("onVisible...");
    //     });

    //     VisibilityChange.onHidden(function() 
    //     {
    //         socket.emit('unsubscribe', livevent);
    //         //console.log("onHidden...");
    //     });

    //     /* Carga de datos de feeds */
    //     dataFactory.getDataFeed().then( function( afeed )
    //     {
    //         $scope.feed = afeed.data;
    //         /* Nos suscribimos al live */
    //         socket.emit("subscribe", livevent);
    //     });

    //     $scope.$on('$destroy', function() 
    //     {
    //         //$scope = $scope.$new(true);
    //         socket.emit('unsubscribe', livevent);
    //     });

    //     socket.on('leave-room', function()
    //     {
    //         if( $scope.loading )
    //             document.location.href = "./#!/live-list-search";

    //         //$scope.active.marketID = -1;
    //         $scope.$emit('LEAVE');
    //     });

    //     socket.on('reconnect', function(err)
    //     {
    //         console.log("reconnect: %s", err);
    //         $scope.$emit('LOAD');
    //         socket.emit('subscribe', livevent);
    //     });

    //     socket.on('reconnecting', function(err)
    //     {
    //         console.log("reconnecting: %s", err);
    //         $route.reload();
    //     });

    //     socket.on('message', function (data) 
    //     {
    //         //console.log(data);

    //         $scope.$emit('PING');

    //         if( typeof(data.markets) == 'undefined' )
    //             return data;

    //         /*******************************************/
    //         /* Quitamos las casas que no sean del pais */
    //         /*******************************************/
    //         for( var nCont = 0, len = data.markets.length;
    //              nCont < len;
    //              nCont++ )
    //         {
    //             for( var nContBet = 0, lenBet = data.markets[ nCont ].bets.length;
    //                  nContBet < lenBet;
    //                  nContBet++ )
    //             {
    //                 for( var nContData = data.markets[ nCont ].bets[nContBet].data.length-1;
    //                  nContData >= 0;
    //                  nContData-- )
    //                 {
    //                     if( !$scope.feed[data.markets[ nCont ].bets[nContBet].data[nContData].id_feed] )
    //                     {
    //                         data.markets[ nCont ].bets[nContBet].data.splice(nContData, 1);
    //                     }
    //                 }
    //             }
    //         }



    //         if( $scope.item == null )
    //         {
    //             $scope.chartData = null;

    //             $scope.chartOptions = {
    //                 chart: {
    //                     type: 'lineChart',
    //                     height: 205,
    //                     margin : {
    //                         top: 10,
    //                         right: 0,
    //                         bottom: 50,
    //                         left: 33
    //                     },
    //                     color: ['#69c198','#ff6868','#757575'],
    //                     showLegend: true,
    //                     showYAxis: true,
    //                     showXAxis: true,
    //                     useInteractiveGuideline: true,
    //                     xAxis: {
    //                         axisLabel: '',
    //                         tickFormat: function(d) 
    //                         {
    //                             var score = null;
                                
    //                             angular.forEach( $scope.chartData[ $scope.active.marketID ], function( value, key )
    //                             {
    //                                 angular.forEach( value.values, function( data, key )
    //                                 {
    //                                     if( data.x == d )
    //                                         score = data.score;
    //                                 });
    //                             });

    //                             return d3.time.format('%H:%M:%S')(new Date(d)) + " - " + score;
    //                         },
    //                         ticks: 15,
    //                     },
    //                     yAxis: {
    //                         //showMaxMin: false,
    //                         tickFormat: function(d)
    //                         {
    //                             //return parseFloat(d).toFixed(2);

    //                             return $filter("oddsConverter")(d,2);
    //                         },
    //                         ticks: 5,
    //                     },
    //                     tooltip: {
    //                         gravity: 'n'
    //                     },

    //                     // legend: {
    //                     //     vers: 'furious'
    //                     // },
    //                     legendPosition: 'right'                        
    //                 }
    //             };

    //             $scope.getMinMax = function( name )
    //             {
    //                 if( $scope.chartData == null || $scope.active.marketID == null )
    //                     return {
    //                         min: 0,
    //                         max: 0
    //                     };

    //                 var maxVal = null, 
    //                     minVal = null;

    //                 if( name == 'Draw' ) name = $translate.instant('graphicMarket.draw');

    //                 angular.forEach( $scope.chartData[ $scope.active.marketID ], function( bet )
    //                 {
    //                     if( bet.key == name )
    //                     {
    //                         angular.forEach( bet.values, function( value )
    //                         {
    //                             minVal = (!minVal || value.y < minVal) ? value.y : minVal;
    //                             maxVal = (!maxVal || value.y > maxVal) ? value.y : maxVal;
    //                         });
    //                     }
    //                 });

    //                 return {
    //                     min: minVal,
    //                     max: maxVal
    //                 }
    //             };


    //             $http.get(fileChartData)
    //                 .then( function processFile(response)
    //                 {
    //                     var fileList = response.data.split('\n');
                      
    //                     for( var nCont = 0, len = fileList.length;
    //                          nCont < len;
    //                          nCont++ )
    //                     {
    //                         var tokens = fileList[nCont].split('|');

    //                         for( var nToken = 2, lenToken = tokens.length-1;
    //                              nToken < lenToken;
    //                              nToken++ )
    //                         {
    //                             var aux         = tokens[ nToken ].split('$'),
    //                                 idMarket    = parseInt(aux[0]),
    //                                 datas       = aux[1].split(',');

    //                             if( !chartData[ idMarket ] )
    //                             {
    //                                 chartData[ idMarket ] = [];

    //                                 if( datas.length-1 == 2 )
    //                                 {
    //                                     chartData[ idMarket ].push({ values: [], key: data.participants[0].name });
    //                                     chartData[ idMarket ].push({ values: [], key: data.participants[1].name });
    //                                 }
    //                                 else
    //                                 {
    //                                     chartData[ idMarket ].push({ values: [], key: data.participants[0].name });
    //                                     chartData[ idMarket ].push({ values: [], key: $translate.instant('graphicMarket.draw') });
    //                                     chartData[ idMarket ].push({ values: [], key: data.participants[1].name });
    //                                 }
    //                             }

    //                             if(idMarket == 1 || idMarket == 4 || idMarket == 5 || idMarket == 7 )
    //                             {
    //                                 for( var nValues = 0, lenValues = datas.length-1;
    //                                      nValues < lenValues;
    //                                      nValues++ )
    //                                 {
    //                                     if( chartData[ idMarket ][nValues] )
    //                                         chartData[ idMarket ][nValues].values.push({x: parseInt(tokens[0]), y: $filter("setDecimal")( parseFloat(datas[nValues]), 2 ), score: tokens[1] });
    //                                 }
    //                             }
    //                         }
    //                     }

    //                     if( typeof($scope.active) != 'undefined' )
    //                     {
    //                         /* Grafica por defecto */
    //                         switch( data.sportID )
    //                         {
    //                             case 1:
    //                                 $scope.active.marketID = 1;
    //                             break;
    //                             case 2:
    //                                 $scope.active.marketID = 7;
    //                             break;
    //                             case 3:
    //                                 $scope.active.marketID = 7;
    //                             break;
    //                         }
    //                     }   

    //                     $scope.chartData = chartData;        
    //                 });

    //             /* Carga de datos de feeds */
    //             dataFactory.getDataFeed().then( function( afeed )
    //             {
    //                 $scope.feed = afeed.data;

    //                 dataFactory.getDataMarkets().then( function( amarket )
    //                 {
    //                     $scope.marketsData = amarket.data.markets;

    //                     $scope.filterList = (function( filters, markets, data )
    //                     {
    //                         var aFilters = [];

    //                         angular.forEach( filters.filters, function(filter, key) 
    //                         {
    //                             if( filter.name != 'Favoritos' )
    //                             {
    //                                 var aMarkets = [],
    //                                     fFind = false;

    //                                 angular.forEach( filter.list, function( market, key )
    //                                 {
    //                                     angular.forEach( data.markets, function( dMarket, key )
    //                                     {
    //                                         if( market == dMarket.id )
    //                                         {
    //                                             aMarkets.push( markets[ market ] );
    //                                             fFind = true;
    //                                         }
    //                                     });
    //                                 });

    //                                 if( fFind )
    //                                 {
    //                                     aFilters.push({
    //                                         id: filter.idFilter,
    //                                         name: filter.name,
    //                                         markets: aMarkets
    //                                     });
    //                                 }
    //                             }
    //                         });

    //                         return aFilters;
                            
    //                     })( amarket.data.filters[ data.sportID ], amarket.data.markets, data );
    //                 });
    //             });
    //         }
    //         else
    //         {
    //             if( $scope.chartData )
    //             {
    //                 var dd = angular.copy($scope.chartData); 
    //                 // for( var nCont = 0, len = $scope.item.markets.length;
    //                 //      nCont < len;
    //                 //      nCont++ )
    //                 // {
    //                 //     for( var nContBet = 0, lenBet = $scope.item.markets[ nCont ].bets.length;
    //                 //          nContBet < lenBet;
    //                 //          nContBet++ )
    //                 //     {
    //                 //         dd[nCont].values.push({x: parseInt(Date.now()), y: parseFloat($scope.item.markets[nCont].bets[nCont].data[0].n_odd) });
    //                 //     }
    //                 // }

    //                 angular.forEach( $scope.item.markets, function(market, marketKey) 
    //                 {
    //                     if(market.id == 1 || market.id == 4 || market.id == 5 || market.id == 7 )
    //                     {
    //                         angular.forEach( market.bets, function(bet, betKey) 
    //                         {
    //                             var score = null;

    //                             if( $scope.item.info.score == null ) 
    //                                 score = '';
    //                             else
    //                             {
    //                                 if( $scope.item.sportID != 3 )
    //                                     score = $scope.item.info.score.replace(/ /g, '');
    //                                 else
    //                                 {
    //                                     var set = $scope.item.info.set != null ? " ( " + $scope.item.info.set + " )" : '';

    //                                     score = $scope.item.info.score.replace(/ /g, '') + set;
    //                                 }
    //                             }

    //                             if( typeof(dd[market.id]) != 'undefined')
    //                                 dd[ market.id ][betKey].values.push({x: parseInt(Date.now()), y: $filter("setDecimal")( parseFloat(bet.data[0].n_odd), 2 ), score: score });
    //                             //$scope.chartData[ market.id ][betKey].values.push({x: parseInt(Date.now()), y: parseFloat(bet.data[0].n_odd), score: score });
    //                         });
    //                     }
    //                 });

    //                 $scope.chartData = angular.copy(dd); 
    //             }
    //         }

    //         $scope.item = getData( data );
    //         $scope.log = $filter('orderBy')( $scope.item.log, 'id', true ) || null;
    //         $scope.titleLog = ($scope.log != null && $scope.log.length > 0) ? $scope.log[0].message : null;
            
    //         function getData( data )
    //         {
    //             if( typeof($scope.marketsTabs) == 'undefined' )
    //             {
    //                 $scope.marketsTabs = [];
    //                 $scope.marketsPayOut = [];

    //                 for( var nMarkets = 0, lenMarkets = data.markets.length;
    //                      nMarkets < lenMarkets;
    //                      nMarkets++)
    //                 {
    //                     $scope.marketsTabs.push([]);
    //                     $scope.marketsPayOut.push([]);

    //                     for( var nBets = 0, lenBets = data.markets[nMarkets].bets.length;
    //                          nBets < lenBets;
    //                          nBets++)
    //                     {
    //                         $scope.marketsTabs[ nMarkets ].push(false);
    //                         $scope.marketsPayOut[ nMarkets ].push(false);
    //                     }
    //                 }
    //             }
    //             else if( $scope.marketsTabs.length < data.markets.length )
    //             {
    //                 for( var nMarkets = $scope.marketsTabs.length, lenMarkets = data.markets.length;
    //                      nMarkets < lenMarkets;
    //                      nMarkets++)
    //                 {
    //                     $scope.marketsTabs.push([]);
    //                     $scope.marketsPayOut.push([]);

    //                     for( var nBets = 0, lenBets = data.markets[nMarkets].bets.length;
    //                          nBets < lenBets;
    //                          nBets++)
    //                     {
    //                         $scope.marketsTabs[ nMarkets ].push(false);
    //                         $scope.marketsPayOut[ nMarkets ].push(false);
    //                     }
    //                 }
    //             }

    //             angular.forEach( data.markets, function( market, mkey )
    //             {
    //                 var prob = null;

    //                 angular.forEach( market.bets, function( bet, bkey)
    //                 {
    //                     prob += 1/bet.data[0].n_odd;
    //                 });

    //                 var payout = (1/prob)*100;

    //                 angular.forEach( market.bets, function( bet, bkey)
    //                 {
    //                     bet.prob = parseInt( (1/bet.data[0].n_odd)*payout );
    //                 });

    //                 market.payout = parseInt(payout);
    //             });

    //             //var data = [];
    //             if( $scope.auxData != null )
    //             {
    //                 for( var nCont = 0, len = data.markets.length;
    //                      nCont < len;
    //                      nCont++ )
    //                 {
    //                     for( var nSubCont = 0, lenSub = $scope.auxData.markets.length, fFind = false;
    //                         nSubCont < lenSub && fFind == false;
    //                         nSubCont++ )
    //                     {
    //                         if( data.markets[nCont].id == $scope.auxData.markets[nSubCont].id )
    //                         {
    //                             for( var nBetCont = 0, lenBet = data.markets[nCont].bets.length;
    //                                  nBetCont < lenBet;
    //                                  nBetCont++ )
    //                             {
    //                                 for( var nBetSubCont = 0, lenSubBet = $scope.auxData.markets[nSubCont].bets.length;
    //                                  nBetSubCont < lenSubBet;
    //                                  nBetSubCont++ )
    //                                 {
    //                                     if( data.markets[nCont].bets[nBetCont].name == $scope.auxData.markets[nSubCont].bets[nBetSubCont].name)
    //                                     {
    //                                         if( data.markets[nCont].bets[nBetCont].data[0].n_odd < $scope.auxData.markets[nSubCont].bets[nBetSubCont].data[0].n_odd )
    //                                             data.markets[nCont].bets[nBetCont].data[0].diff = 'down';
    //                                         else if( data.markets[nCont].bets[nBetCont].data[0].n_odd > $scope.auxData.markets[nSubCont].bets[nBetSubCont].data[0].n_odd )
    //                                             data.markets[nCont].bets[nBetCont].data[0].diff = 'high';
    //                                         else
    //                                             data.markets[nCont].bets[nBetCont].data[0].diff = 'equal';

    //                                         // for( var nBetDataCont = 0, lenBetData = data.markets[nCont].bets[nBetCont].data.length;
    //                                         //      nBetDataCont < lenBetData;
    //                                         //      nBetDataCont++ )
    //                                         // {
    //                                         //     if( data.markets[nCont].bets[nBetCont].data[nBetDataCont].n_odd < $scope.auxData.markets[nSubCont].bets[nBetSubCont].data[nBetDataCont].n_odd )
    //                                         //         data.markets[nCont].bets[nBetCont].data[nBetDataCont].diff = 'down';
    //                                         //     else if( data.markets[nCont].bets[nBetCont].data[nBetDataCont].n_odd > $scope.auxData.markets[nSubCont].bets[nBetSubCont].data[nBetDataCont].n_odd )
    //                                         //         data.markets[nCont].bets[nBetCont].data[nBetDataCont].diff = 'high';
    //                                         //     else
    //                                         //         data.markets[nCont].bets[nBetCont].data[nBetDataCont].diff = 'equal';
    //                                         // }
    //                                     }
    //                                 }
    //                             }

    //                             fFind = true;
    //                         }
    //                     }
    //                 }
    //             }

    //             $scope.$emit('UNLOAD');

    //             return data;
    //         };

    //         /* Reemplezamos los datos */
    //         $scope.auxData = $scope.item;
    //     });

    //     $scope.mActive = function( active )
    //     {
    //         if( !active ) return true;

    //         var fFind = false;

    //         for( nCont = 0, len = $scope.item.markets.length;
    //              nCont < len && fFind == false;
    //              nCont++ )
    //         {
    //             if( $scope.item.markets[nCont].id == active )
    //                 fFind = true;
    //         }

    //         return fFind;
    //     };

    //     $scope.getLiveDrop = function( parent, id )
    //     {
    //         return $scope.marketsTabs[parent][id] =! $scope.marketsTabs[parent][id];
    //     }
    //     $scope.getLivePayOut = function( parent, id)
    //     {
    //         return $scope.marketsPayOut[parent][id] =! $scope.marketsPayOut[parent][id];
    //     }

    // })

    // .controller('realTimeList', function( $scope, $window, $translate, dataFactory, socket, $route, VisibilityChange )
    // {
    //     $scope.data = null;
    //     $scope.auxData = null;
    //     $scope.dataFilter = null;
    //     $scope.selectedInput = [];
    //     $scope.$on( 'LOAD', function(){ $scope.loading = true } );
    //     $scope.$on( 'UNLOAD', function(){ $scope.loading = false } );

    //     /* Paginación */
    //     $scope.totalData = 0;
    //     $scope.currentPage = 1;
    //     $scope.numPerPage = 10;
    //     $scope.maxSize = 5;

    //     $scope.setPage = function (pageNo) 
    //     {
    //         window.scrollTo(0,0);
    //         $scope.currentPage = pageNo;
    //     };
    //     //$scope.setPage($scope.currentPage);

    //     var nameSport = [
    //         "",
    //         "futbol",
    //         "baloncesto",
    //         "tenis"
    //     ];

    //     $scope.$emit('LOAD');

    //     VisibilityChange.onVisible(function() 
    //     {
    //         //$window.location.reload();
    //         $route.reload();
    //         //$scope.$emit('LOAD');
    //         //socket.emit("subscribe", 'list-data-live');
    //         //console.log("onVisible...");
    //     });

    //     VisibilityChange.onHidden(function() 
    //     {
    //         socket.emit('unsubscribe', 'list-data-live');
    //         //console.log("onHidden...");
    //     });


    //     $scope.$on('$destroy', function() 
    //     {
    //         //$scope = $scope.$new(true);
    //         socket.emit('unsubscribe', 'list-data-live');
    //     });

    //     /* Carga de datos de feeds */
    //     dataFactory.getDataFeed().then( function( afeed )
    //     {
    //         $scope.feed = afeed.data;
    //         /* Nos suscribimos al live */
    //         socket.emit('subscribe', 'list-data-live');
    //     });

    //     // socket.on('connect', function()
    //     // {
    //     //     socket.emit('subscribe', 'list-data-live');
    //     // });

    //     socket.on('disconnect', function(err)
    //     {
    //         console.log("disconnect: %s", err);
    //     });

    //     socket.on('reconnect', function(err)
    //     {
    //         console.log("reconnect: %s", err);
    //         $scope.$emit('LOAD');
    //         socket.emit('subscribe', 'list-data-live');
    //     });

    //     socket.on('reconnecting', function(err)
    //     {
    //         console.log("reconnecting: %s", err);
    //         $route.reload();
    //     });

    //     socket.on('leave-room', function()
    //     {
    //         //document.location.href = "./#!";
    //     });

    //     socket.on('message', function (data)
    //     {
    //         //console.log( data );

    //         $scope.data = [];

    //         for( var nCont = 0, len = data.length;
    //              nCont < len;
    //              nCont++ )
    //         {
    //             var info = data[nCont].info;

    //             for( var nContBet = 0, lenBet = data[nCont].markets.length;
    //                  nContBet < lenBet;
    //                  nContBet++ )
    //             {
    //                 if( data[nCont].markets[nContBet].id == 1 ||
    //                     data[nCont].markets[nContBet].id == 7 )
    //                 {

    //                     /*******************************************/
    //                     /* Quitamos las casas que no sean del pais */
    //                     /*******************************************/
    //                     for( var nContData = 0, lenData = data[nCont].markets[nContBet].bets.length;
    //                          nContData < lenData;
    //                          nContData++ )
    //                     {
    //                         for( var nContOdd = data[nCont].markets[nContBet].bets[nContData].data.length-1;
    //                          nContOdd >= 0;
    //                          nContOdd-- )
    //                         {
    //                             if( !$scope.feed[data[nCont].markets[nContBet].bets[nContData].data[nContOdd].id_feed] )
    //                             {
    //                                 data[nCont].markets[nContBet].bets[nContData].data.splice(nContOdd, 1);
    //                             }
    //                         }
    //                     }

    //                     if( data[nCont].markets[nContBet].bets[0].data.length > 0 )
    //                     {
    //                         $scope.data.push({
    //                             idSport: data[nCont].sportID,
    //                             sportType: data[nCont].sport,
    //                             info: info,
    //                             league: data[ nCont ].league,
    //                             event: data[ nCont].event,
    //                             bets: data[nCont].markets[nContBet].bets
    //                         });
    //                     }
    //                 }
    //             }  
    //         }

    //         if( $scope.auxData != null )
    //         {
    //             for( var nCont = 0, len = $scope.data.length;
    //                  nCont < len;
    //                  nCont++ )
    //             {
    //                 for( var nSubCont = 0, lenSub = $scope.auxData.length, fFind = false;
    //                     nSubCont < lenSub && fFind == false;
    //                     nSubCont++ )
    //                 {
    //                     if( $scope.data[nCont].event == $scope.auxData[nSubCont].event )
    //                     {
    //                         for( var nBetCont = 0, lenBet = $scope.data[nCont].bets.length;
    //                              nBetCont < lenBet;
    //                              nBetCont++ )
    //                         {
    //                             for( var nBetSubCont = 0, lenSubBet = $scope.auxData[nSubCont].bets.length;
    //                              nBetSubCont < lenSubBet;
    //                              nBetSubCont++ )
    //                             {
    //                                 if( $scope.data[nCont].bets[nBetCont].name == $scope.auxData[nSubCont].bets[nBetSubCont].name)
    //                                 {
    //                                     if( $scope.data[nCont].bets[nBetCont].data[0].n_odd < $scope.auxData[nSubCont].bets[nBetSubCont].data[0].n_odd )
    //                                         $scope.data[nCont].bets[nBetCont].data[0].diff = 'down';
    //                                     else if( $scope.data[nCont].bets[nBetCont].data[0].n_odd > $scope.auxData[nSubCont].bets[nBetSubCont].data[0].n_odd )
    //                                         $scope.data[nCont].bets[nBetCont].data[0].diff = 'high';
    //                                     else
    //                                         $scope.data[nCont].bets[nBetCont].data[0].diff = 'equal';
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }

    //         /* Reemplezamos los datos */
    //         $scope.auxData = $scope.data;
    //         $scope.dataFilter = listLiveDataFilter( $scope.auxData );
    //         $scope.totalData = ($scope.dataFilter.length-10);


    //         $scope.liveSports = $scope.data.reduce(function(sum, place) 
    //         {
    //             if(sum.indexOf( place.idSport ) < 0) sum.push( place.idSport );

    //             return sum;
    //         }, []);

    //         /* Lista de ligas */
    //         listLiveLeagues();
    //     });

    //     $scope.getSport = function( id )
    //     {
    //         return nameSport[ id ];
    //     };

    //     var listLiveDataFilter = function( data )
    //     {
    //         var dataFilter = [];

    //         if( $scope.selectedInput.league != "" )
    //         {
    //             angular.forEach(data, function(value, key) 
    //             {
    //                 if( value.league == $scope.selectedInput.league )
    //                     dataFilter.push(value);
    //             });
    //         }
    //         else if( $scope.selectedInput.sport != "" )
    //         {
    //             angular.forEach(data, function(value, key) 
    //             {
    //                 if( value.idSport == $scope.selectedInput.sport )
    //                     dataFilter.push(value);
    //             });
    //         }
    //         else
    //         {
    //             angular.forEach(data, function(value, key) 
    //             {
    //                 dataFilter.push(value);
    //             });
    //         }

    //         // if( $scope.selectedInput.sport != "" && $scope.selectedInput.league != "" )
    //         // {
    //         //     angular.forEach(data, function(value, key) 
    //         //     {
    //         //         if(value.sport == $scope.selectedInput.sport && value.league == $scope.selectedInput.league )
    //         //             dataFilter.push(value);
    //         //     });
                
    //         // }
    //         // else if( $scope.selectedInput.sport != "" )
    //         // {
    //         //     angular.forEach(data, function(value, key) 
    //         //     {
    //         //         if( value.sport == $scope.selectedInput.sport )
    //         //             dataFilter.push(value);
    //         //     });
    //         // }
    //         // else if( $scope.selectedInput.sport == "" )
    //         // {
    //         //     angular.forEach(data, function(value, key) 
    //         //     {
    //         //         dataFilter.push(value);
    //         //     });

    //         // }

    //         if( data.length == 0 && dataFilter.length == 0 )
    //             $scope.$emit('UNLOAD');
    //         else if( data.length > 0 && dataFilter.length > 0 )
    //             $scope.$emit('UNLOAD');

    //         return dataFilter;
    //     };

    //     var listLiveLeagues = function()
    //     {
    //         $scope.liveLeagues = $scope.data.reduce(function(sum, place) 
    //         {
    //             if( place.league != null )
    //             {
    //                 if( $scope.selectedInput.sport && $scope.selectedInput.sport != "" )
    //                 {
    //                     if (sum.indexOf( place.league ) < 0 && $scope.selectedInput.sport == place.idSport )
    //                         sum.push( place.league ); 
    //                 }
    //                 else
    //                 {
    //                     if (sum.indexOf( place.league )  < 0) sum.push( place.league ); 
    //                 }
    //             }
    //             return sum;
    //         }, []);
    //     };

    //     $scope.changeListLive = function()
    //     {  
    //         /* Lista de ligas */
    //         listLiveLeagues();

    //         /* Lista de Eventos */
    //         $scope.dataFilter = listLiveDataFilter( $scope.auxData );
    //     };

    //     /* Cargamos los datos de las feed */
    //     dataFactory.getDataFeed().then( function(response)
    //     {
    //         $scope.feed = response.data;
    //     });
    // })

    // .controller("redirect-live", function( $scope, $route, $http, $interpolate, $sessionStorage, eventTrack )
    // {
    //     var id_feed   = $route.current.params.id_feed,
    //         id_bet    = $route.current.params.id_bet,
    //         id_bid    = $route.current.params.id_bid,
    //         url       = null,
    //         confFeed  = {
    //             method: 'GET',
    //             url: 'json/feeds.json',
    //             headers: {
    //                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         };
         
    //     /* Traqueamos el evento */
    //     eventTrack.new({
    //         name: "redirect",
    //         category: "live",
    //         label: id_feed+"-"+id_bet
    //     });

    //     /* Carga de datos de feeds */
    //     $http(confFeed).
    //     success(function(dataFeed, status, headers, config) 
    //     {
    //         $scope.img_feed = dataFeed[ id_feed ].str_image;

    //         id_bid = dataFeed[ id_feed ].str_bid;

    //         var getBetSlip = {
    //             method: 'POST',
    //             url: 'php/redirect-live.php',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             },
    //             data: "id_feed=" + id_feed + "&id_bet=" + id_bet + "&id_bid=" + id_bid + "&id_user=" + $sessionStorage.iduser
    //         }

    //         /* Recuperamos datos del evento */
    //         $http(getBetSlip).
    //         success(function(dataBet, status, headers, config) 
    //         {
    //             /* Componemos la url */
    //             url = $interpolate( dataBet.url )($scope);
    //             document.location.href = url;
    //         });
            
    //     });
    // })

    /************************************************************************/
    /*                              Includes                                */
    /************************************************************************/
    // .controller("header", function( $scope, $localStorage, $sessionStorage, $location, $http )
    // {
    //     $scope.$lStorage = $localStorage;
    //     $scope.$storage = $sessionStorage;

    //     var url = $location.url(),
    //         endUrl = url.split("?");

    //     $scope.isNotHome = function()
    //     {
    //         if( ( endUrl[0] == "/search" || endUrl[0] == "/home" || endUrl[0] == "/" ) && !$scope.fScrollData )
    //             return false;
    //         else
    //             return true;
    //     };

    //     $scope.$storage = $sessionStorage;

    //     /* Cerrar la sesion del usuario */
    //     $scope.closeSession= function()
    //     {
    //          Si todo ha ido bien, se redirecciona al index y se borra el localStorage
            
    //         $sessionStorage.iduser = null;

    //         $sessionStorage.expired = 0;
    //         $sessionStorage.favorites = null;
    //         $sessionStorage.str_name = null;
    //         $sessionStorage.str_email = null;
    //         $sessionStorage.a_sports = null;
    //         $sessionStorage.other_sport = null;
    //         $sessionStorage.nameuser = null;
    //         $sessionStorage.sessionid = null;
    //         $sessionStorage.$save();
    //         $sessionStorage.$reset();

    //         document.location.href = "./#!";
                    
    //     } 
    // })

    // .controller('checkCookie', function( $scope, $http, $window )
    // {
    //     /* Ocular capa */
    //     $scope.layerCookie = false;

    //    /* Comprobar si el usuario tiene la cookie */
    //     if( getCookie("besgamCookies") == "" ) 
    //     {
    //         /* Mostar capa */
    //         $scope.layerCookie = true;
            
    //         angular.element($window).bind("scroll", function() 
    //         {
    //              cookieSave();
    //         });

    //         angular.element($window).bind("click", function() 
    //         {
    //              cookieSave();
    //         });
                
    //         function cookieSave()
    //         {
    //             /* Grabar cookie */
    //             setCookie("besgamCookies","cookePolitic", 3650);
    //             /* Ocular capa */
    //             $scope.layerCookie = false;
    //             $scope.$apply();  
    //         }
    //     }

    //     /* Damos valor a la cookie */
    //     function setCookie( cname, cvalue, exdays ) 
    //     {
    //         var d = new Date();
    //         d.setTime(d.getTime() + (exdays*24*60*60*1000));
    //         var expires = "{expires:"+d.toUTCString()+"}";
    //         document.cookie = cname + "=" + escape(cvalue) + ";expires=" + expires;
    //     }

    //     /* Con esta función obtenemos la cookie */
    //     function getCookie( besgamCookies ) 
    //     {
    //         var name = besgamCookies + "=";
    //         var ca = document.cookie.split(';');
    //         for(var i=0; i<ca.length; i++) {
    //             var c = ca[i];
    //             while (c.charAt(0)==' ') c = c.substring(1);
    //             if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    //         }
    //        return "";
    //     }
    // })

    // .controller('tweets', function( $scope, dataFactory )
    // {
    //     var now = new Date();
    //     $scope.offsetutc = now.getTimezoneOffset();

    //     dataFactory.getDataTwitter().then( function(response)
    //     {
    //         $scope.tweets = response.data;
    //     });

    //     $scope.submit = function(form)
    //     {
    //         var href = "./#!newsletter/" + $scope.email;

    //         document.location.href = href;
    //         //document.forms[form].submit();
    //     };
    // })

    // .controller('flexslider', function( $scope, dataFactory )
    // {
    //     $scope.slides = [];

    //     dataFactory.getDataFeed().then( function( response )
    //     {
    //         angular.forEach( response.data, function( value, key )
    //         {
    //             $scope.slides.push( value );
    //         });
    //     });
    // })
    
    // .controller('tweets-slick', function( $scope, dataFactory)
    // {

    //     dataFactory.getDataTwitter().then( function(response)
    //     {
    //         $scope.tweets = response.data;
    //     });

    // })
    /************************************************************************/
    /*                              Servicios                               */
    /************************************************************************/


    // .service('tipster', function( $localStorage, $q, dateTime )
    // {
    //     var tipsterData = [
    //         {
    //             tipster : 1,
    //             nick: 'Anton_Siruelas',
    //             mail: 'asiruela@besgam.com',
    //             img: 'fer.jpg',
    //             ranking: 8,
    //             benefit: 121.73,
    //             yield: 8.50,
    //             stake: 1.55,
    //             followers: 105,
    //             tips: {
    //                 total: 18,
    //                 ok: 5,
    //                 cancel: 3,
    //                 ko: 10
    //             },
    //             sport: [{
    //                 type: 'Fútbol',
    //                 percent: 70
    //             },
    //             {
    //                 type: 'Baloncesto',
    //                 percent: 30
    //             }],
    //             betHouse:[{
    //                 id_feed: 7,
    //                 percent: 80 
    //             },
    //             {
    //                 id_feed: 2,
    //                 percent: 10 
    //             },
    //             {
    //                 id_feed: 4,
    //                 percent: 10 
    //             }]
    //         },
    //         {
    //             tipster : 2,
    //             nick: 'Marcel_Duchamp',
    //             mail: 'asiruela@besgam.com',
    //             img: 'fer.jpg',
    //             ranking: 5,
    //             benefit: 12.73,
    //             yield: 28.50,
    //             stake: 16.55,
    //             followers: 207,
    //             tips: {
    //                 total: 45,
    //                 ok: 20,
    //                 cancel: 0,
    //                 ko: 25
    //             },
    //             sport: [{
    //                 type: 'Fútbol',
    //                 percent: 20
    //             },
    //             {
    //                 type: 'Baloncesto',
    //                 percent: 50
    //             },
    //             {
    //                 type: 'Tenis',
    //                 percent: 6
    //             }],
    //             betHouse:[{
    //                 id_feed: 13,
    //                 percent: 80 
    //             },
    //             {
    //                 id_feed: 2,
    //                 percent: 10 
    //             },
    //             {
    //                 id_feed: 6,
    //                 percent: 10 
    //             }]
    //         },
    //         {
    //             tipster : 3,
    //             nick: 'patricio',
    //             mail: 'patricio@besgam.com',
    //             img: 'fer.jpg',
    //             ranking: 4,
    //             benefit: 1.73,
    //             yield: 28.50,
    //             stake: 16.55,
    //             followers: 207,
    //             tips: {
    //                 total: 45,
    //                 ok: 20,
    //                 cancel: 0,
    //                 ko: 25
    //             },
    //             sport: [{
    //                 type: 'Boxeo',
    //                 percent: 100
    //             }],
    //             betHouse:[{
    //                 id_feed: 2,
    //                 percent: 80 
    //             },
    //             {
    //                 id_feed: 10,
    //                 percent: 10 
    //             },
    //             {
    //                 id_feed: 4,
    //                 percent: 10 
    //             }]
    //         },
    //         {
    //             tipster : 4,
    //             nick: 'Lucas',
    //             mail: 'lucas@besgam.com',
    //             img: 'fer.jpg',
    //             ranking: 2,
    //             benefit: 1.73,
    //             yield: 28.50,
    //             stake: 16.55,
    //             followers: 207,
    //             tips: {
    //                 total: 45,
    //                 ok: 20,
    //                 cancel: 0,
    //                 ko: 25
    //             },
    //             sport: [{
    //                 type: 'Boxeo',
    //                 percent: 100
    //             }],
    //             betHouse:[{
    //                 id_feed: 2,
    //                 percent: 80 
    //             },
    //             {
    //                 id_feed: 10,
    //                 percent: 10 
    //             },
    //             {
    //                 id_feed: 4,
    //                 percent: 10 
    //             }]
    //         },
    //         {
    //             tipster : 5,
    //             nick: 'Marcos',
    //             mail: 'patricio@besgam.com',
    //             img: 'fer.jpg',
    //             ranking: 5,
    //             benefit: 1.73,
    //             yield: 28.50,
    //             stake: 16.55,
    //             followers: 207,
    //             tips: {
    //                 total: 45,
    //                 ok: 20,
    //                 cancel: 0,
    //                 ko: 25
    //             },
    //             sport: [{
    //                 type: 'Boxeo',
    //                 percent: 100
    //             }],
    //             betHouse:[{
    //                 id_feed: 2,
    //                 percent: 80 
    //             },
    //             {
    //                 id_feed: 10,
    //                 percent: 10 
    //             },
    //             {
    //                 id_feed: 4,
    //                 percent: 10 
    //             }]
    //         },
    //         {
    //             tipster : 6,
    //             nick: 'Lorena Garcís',
    //             mail: 'patricio@besgam.com',
    //             img: 'fer.jpg',
    //             ranking: 10,
    //             benefit: 1.73,
    //             yield: 28.50,
    //             stake: 16.55,
    //             followers: 207,
    //             tips: {
    //                 total: 45,
    //                 ok: 20,
    //                 cancel: 0,
    //                 ko: 25
    //             },
    //             sport: [{
    //                 type: 'Boxeo',
    //                 percent: 100
    //             }],
    //             betHouse:[{
    //                 id_feed: 2,
    //                 percent: 80 
    //             },
    //             {
    //                 id_feed: 10,
    //                 percent: 10 
    //             },
    //             {
    //                 id_feed: 4,
    //                 percent: 10 
    //             }]
    //         },
    //         {
    //             tipster : 7,
    //             nick: 'Alfonso',
    //             mail: 'patricio@besgam.com',
    //             img: 'fer.jpg',
    //             ranking: 10,
    //             benefit: 1.73,
    //             yield: 28.50,
    //             stake: 16.55,
    //             followers: 207,
    //             tips: {
    //                 total: 45,
    //                 ok: 20,
    //                 cancel: 0,
    //                 ko: 25
    //             },
    //             sport: [{
    //                 type: 'Boxeo',
    //                 percent: 100
    //             }],
    //             betHouse:[{
    //                 id_feed: 2,
    //                 percent: 80 
    //             },
    //             {
    //                 id_feed: 10,
    //                 percent: 10 
    //             },
    //             {
    //                 id_feed: 4,
    //                 percent: 10 
    //             }]
    //         },
    //         {
    //             tipster : 8,
    //             nick: 'Rocío',
    //             mail: 'patricio@besgam.com',
    //             img: 'fer.jpg',
    //             ranking: 14,
    //             benefit: 1.73,
    //             yield: 28.50,
    //             stake: 16.55,
    //             followers: 207,
    //             tips: {
    //                 total: 45,
    //                 ok: 20,
    //                 cancel: 0,
    //                 ko: 25
    //             },
    //             sport: [{
    //                 type: 'Boxeo',
    //                 percent: 100
    //             }],
    //             betHouse:[{
    //                 id_feed: 2,
    //                 percent: 80 
    //             },
    //             {
    //                 id_feed: 10,
    //                 percent: 10 
    //             },
    //             {
    //                 id_feed: 4,
    //                 percent: 10 
    //             }]
    //         },
    //         {
    //             tipster : 9,
    //             nick: 'Aarón Sánchez',
    //             mail: 'patricio@besgam.com',
    //             img: 'fer.jpg',
    //             ranking: 7,
    //             benefit: 1.73,
    //             yield: 28.50,
    //             stake: 16.55,
    //             followers: 207,
    //             tips: {
    //                 total: 45,
    //                 ok: 20,
    //                 cancel: 0,
    //                 ko: 25
    //             },
    //             sport: [{
    //                 type: 'Boxeo',
    //                 percent: 100
    //             }],
    //             betHouse:[{
    //                 id_feed: 2,
    //                 percent: 80 
    //             },
    //             {
    //                 id_feed: 10,
    //                 percent: 10 
    //             },
    //             {
    //                 id_feed: 4,
    //                 percent: 10 
    //             }]
    //         },
    //         {
    //             tipster : 10,
    //             nick: 'Leonor',
    //             mail: 'patricio@besgam.com',
    //             img: 'fer.jpg',
    //             ranking: 3,
    //             benefit: 1.73,
    //             yield: 28.50,
    //             stake: 16.55,
    //             followers: 207,
    //             tips: {
    //                 total: 45,
    //                 ok: 20,
    //                 cancel: 0,
    //                 ko: 25
    //             },
    //             sport: [{
    //                 type: 'Boxeo',
    //                 percent: 100
    //             }],
    //             betHouse:[{
    //                 id_feed: 2,
    //                 percent: 80 
    //             },
    //             {
    //                 id_feed: 10,
    //                 percent: 10 
    //             },
    //             {
    //                 id_feed: 4,
    //                 percent: 10 
    //             }]
    //         },
    //         {
    //             tipster : 11,
    //             nick: 'Bob Esponja',
    //             mail: 'patricio@besgam.com',
    //             img: 'fer.jpg',
    //             ranking: 5,
    //             benefit: 1.73,
    //             yield: 28.50,
    //             stake: 16.55,
    //             followers: 207,
    //             tips: {
    //                 total: 45,
    //                 ok: 20,
    //                 cancel: 0,
    //                 ko: 25
    //             },
    //             sport: [{
    //                 type: 'Boxeo',
    //                 percent: 100
    //             }],
    //             betHouse:[{
    //                 id_feed: 2,
    //                 percent: 80 
    //             },
    //             {
    //                 id_feed: 10,
    //                 percent: 10 
    //             },
    //             {
    //                 id_feed: 4,
    //                 percent: 10 
    //             }]
    //         },
    //         {
    //             tipster : 12,
    //             nick: 'Tipster 1',
    //             mail: 'patricio@besgam.com',
    //             img: 'fer.jpg',
    //             ranking: 15,
    //             benefit: 1.73,
    //             yield: 28.50,
    //             stake: 16.55,
    //             followers: 207,
    //             tips: {
    //                 total: 45,
    //                 ok: 20,
    //                 cancel: 0,
    //                 ko: 25
    //             },
    //             sport: [{
    //                 type: 'Boxeo',
    //                 percent: 100
    //             }],
    //             betHouse:[{
    //                 id_feed: 2,
    //                 percent: 80 
    //             },
    //             {
    //                 id_feed: 10,
    //                 percent: 10 
    //             },
    //             {
    //                 id_feed: 4,
    //                 percent: 10 
    //             }]
    //         },
    //         {
    //             tipster : 13,
    //             nick: 'Tipster 2',
    //             mail: 'patricio@besgam.com',
    //             img: 'fer.jpg',
    //             ranking: 16,
    //             benefit: 1.73,
    //             yield: 28.50,
    //             stake: 16.55,
    //             followers: 207,
    //             tips: {
    //                 total: 45,
    //                 ok: 20,
    //                 cancel: 0,
    //                 ko: 25
    //             },
    //             sport: [{
    //                 type: 'Boxeo',
    //                 percent: 100
    //             }],
    //             betHouse:[{
    //                 id_feed: 2,
    //                 percent: 80 
    //             },
    //             {
    //                 id_feed: 10,
    //                 percent: 10 
    //             },
    //             {
    //                 id_feed: 4,
    //                 percent: 10 
    //             }]
    //         }
    //     ]

    //     var tipsPrediction = [
    //         {
    //             eventID: [21394],
    //             tipster: 1,

    //             comment: [
    //             {
    //                 text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod incidunt ut dolore setibus sum loquid et magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut nulis quod.',
    //                 time: 'Sat Oct 29 2016 20:00:00',
    //                 min_cuote: 2
    //             }],
    //             stake: 5,
    //             cuote: 2.5,
    //             bet: [{
    //                 id_league: 67,
    //                 id_event: 21394,
    //                 str_event: 'Tyson Fury vs Wladimir Klitschko',
    //                 id_market: 22,
    //                 str_market: 'Ganador',
    //                 str_bet: '1',
    //                 str_bet_feed: 'Tyson Fury',
    //                 time: 'Sat Oct 29 2016 20:00:00',
    //                 sportID: 7,
    //                 sport: 'Boxeo',
    //                 cuote: 2.5,
    //             },
    //             {
    //                 id_league: 67,
    //                 id_event: 21394,
    //                 str_event: 'Tyson Fury2 vs Wladimir Klitschko',
    //                 id_market: 22,
    //                 str_market: 'Ganador',
    //                 str_bet: '1',
    //                 str_bet_feed: 'Wladimir Klitschko',
    //                 time: 'Sat Oct 30 2016 20:00:00',
    //                 sportID: 7,
    //                 sport: 'Boxeo',
    //                 cuote: 2.5,
    //             }]
    //         },
    //         {
    //             eventID: [21394],
    //             tipster: 1,

    //             comment: [
    //             {
    //                 text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod incidunt ut dolore setibus sum loquid et magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut nulis quod.',
    //                 time: 'Sat Oct 29 2016 20:00:00',
    //                 min_cuote: 2
    //             },
    //             {
    //                 text: ' Otro ng repeat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod incidunt ut dolore setibus sum loquid et magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut nulis quod.',
    //                 time: 'Fri Oct 28 2016 19:00:00',
    //                 min_cuote: 1
    //             }],
    //             stake: 5,
    //             cuote: 2.5,
    //             bet: [{
    //                 id_league: 67,
    //                 id_event: 21394,
    //                 str_event: 'Tyson Fury vs Wladimir Klitschko',
    //                 id_market: 22,
    //                 str_market: 'Ganador',
    //                 str_bet: '1',
    //                 str_bet_feed: 'NO Tyson Fury',
    //                 time: 'Thu Aug 25 2016 17:00:00',
    //                 sportID: 7,
    //                 sport: 'Boxeo',
    //                 cuote: 2.5,
    //             }]
    //         },
    //         {
    //             eventID: [21394, 27092, 27093],
    //             tipster: 1,
    //             comment: [{
    //                 text: '2º Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod incidunt ut dolore setibus sum loquid et magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut nulis quod.',
    //                 time: 'Sat Oct 29 2016 20:00:00',
    //                 min_cuote: 2
    //             }],
    //             stake: 7,
    //             cuote: 3.5,
    //             bet: [
    //             {
    //                 id_league: 67,
    //                 id_event: 21394,
    //                 str_event: 'Tyson Fury vs Wladimir Klitschko',
    //                 id_market: 22,
    //                 str_market: 'Ganador',
    //                 str_bet: '1',
    //                 str_bet_feed: 'Tyson Fury',
    //                 time: 'Sat Oct 29 2016 20:00:00',
    //                 sportID: 7,
    //                 sport: 'Boxeo',
    //                 cuote: 2.5
    //             },
    //             {
    //                 id_league: 67,
    //                 id_event: 27092,
    //                 str_event: 'Tyson Fury vs Wladimir Klitschko',
    //                 id_market: 22,
    //                 str_market: 'Ganador',
    //                 str_bet: '1',
    //                 str_bet_feed: 'Tyson Fury',
    //                 time: 'Thu Aug 25 2016 17:00:00',
    //                 sportID: 7,
    //                 sport: 'Boxeo',
    //                 cuote: 2.5
    //             },
    //             {
    //                 id_league: 21,
    //                 id_event: 27093,
    //                 str_event: 'Ganador de la competición',
    //                 id_market: 8,
    //                 str_market: 'Ganador',
    //                 str_bet: 'Mercedes',
    //                 str_bet_feed: 'Mercedes',
    //                 time: 'Sun Nov 20 2016 13:00:00',
    //                 sportID: 5,
    //                 sport: 'Formula 1',
    //                 cuote: 2.5
    //             }]
    //         }
    //     ]

    //     /* -- datos de los tipster -- */
    //     this.data = function( id ) // String -> Nick || Numerico -> id
    //     {
    //         var defered = $q.defer();
    //         try
    //         {
    //             var data;

    //             if( typeof id == 'undefined' )
    //                 data = tipsterData;
    //             else
    //             {
    //                 // filter recorre un array como map pero adems filtra
    //                 data = tipsterData.filter( function(it)
    //                 {
    //                     if( it.nick === id || it.tipster === id )
    //                         return it;
    //                 });
    //             }
    //             defered.resolve( data );
    //         }
    //         catch( e )
    //         {
    //             defered.reject( e.message );
    //         }

    //         return defered.promise;
    //     };

    //     /* -- predicciones de un determinado evento -- */
    //     this.eTips = function( id_event )
    //     {
    //         var defered = $q.defer();

    //         try
    //         {
    //             var data = tipsPrediction.filter( function( it )
    //             {
    //                 var fFind = false; 

    //                 it.eventID.map( function( value )
    //                 {
    //                     if( value == id_event ) fFind = true;
    //                 });

    //                 if( fFind ) return it;
    //             });

    //             defered.resolve( data );
    //         }
    //         catch( e )
    //         {
    //             defered.reject( e.message );
    //         }

    //         return defered.promise;
    //     }
    //     /* H || A */
    //     this.gTips = function( id_tipster, type )
    //     {
    //         var defered = $q.defer();

    //         try
    //         {
    //             var data = tipsPrediction.filter( function( it )
    //             {
    //                 if( it.tipster == id_tipster)
    //                 {
    //                     var fFind = false;

    //                     it.bet.filter(function( date )
    //                     {
    //                         if( dateTime.fExpiration(date.time) ) fFind = true;                         
    //                     });
                    
    //                     /* Expirado -> True && type == H (historicas) */
    //                     if( fFind && type == 'H' ) 
    //                         return it; // Añadir
    //                     /* Expirado -> False && type == C (Curren --> actuales) */
    //                     else if (!fFind && type == 'C') 
    //                         return it; // Añadir 
    //                 }
    //             });

    //             defered.resolve( data );
    //         }
    //         catch( e )
    //         {
    //             defered.reject( e.message );
    //         }

    //         // function fExpiration( strTime )
    //         // {
    //         //     if( !strTime ) return;  // Control para evitar vacios
    //         //     var targetTime = new Date( strTime ),
    //         //         offsetTime = new Date( targetTime.getTime() + $localStorage.timeZoneOffset ),
    //         //         today      = new Date();

    //         //     return (offsetTime > today ) ? 0 : 1;
    //         // };

    //         return defered.promise;
    //     }
    // })

    // .service('dateTime', function( $localStorage )
    // {
    //     this.fExpiration = function( strTime )
    //     {
    //         if( !strTime ) return;  // Control para evitar vacios

    //         /* Hora del evento + UTC */
    //         var targetTime = new Date( strTime ),
    //             offsetTime = new Date( targetTime.getTime() + $localStorage.timeZoneOffset );

    //         /* NOW + UTC */
    //         var now     = new Date(),
    //             nowUTC  = new Date( now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds() ),
    //             today   = new Date( nowUTC.getTime() + $localStorage.timeZoneOffset );

    //         return (offsetTime > today ) ? 0 : 1;
    //     };
    // })

    // .service('eventTrack', function( $analytics ) 
    // {
    //     this.new = function( obj )
    //     {
    //         $analytics.eventTrack( obj.name, 
    //         {
    //             category: obj.category,
    //             label: obj.label
    //         });
    //     } 
    // })

    // .service('tipsterOdds', function( $http, $q )
    // {
    //     this.tipBets = function( params, feeds )
    //     {
    //         var deferred = $q.defer(),
    //             objParams = new Object(params);

    //         $http({
    //             method : 'POST',
    //             url : '/php/getOddsTips.php',
    //             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //             data : $.param(objParams)
    //         }).then(
    //         function success(res)
    //         {
    //             var data = res.data,
    //                 exit = [];

    //             data.map(function(items)
    //             {
    //                 items.map( function(item)
    //                 {
    //                     if( data.length == 1 )
    //                     {
    //                         exit.push({
    //                             "id_bet": [item.id_bet],
    //                             "id_feed": item.id_feed,
    //                             "n_odd": item.n_odd
    //                         });
    //                     }
    //                     else
    //                     {
    //                         var fFind = false;

    //                         exit.map( function(exitItem )
    //                         {
    //                             if( exitItem.id_feed == item.id_feed )
    //                             {
    //                                 exitItem.id_bet.push( item.id_bet );
    //                                 exitItem.n_odd = exitItem.n_odd * item.n_odd;
    //                                 fFind = true;
    //                             }
    //                         });
    //                         /* Si no encontramos */
    //                         if( !fFind )
    //                         {
    //                             exit.push({
    //                                 "id_bet": [item.id_bet],
    //                                 "id_feed": item.id_feed,
    //                                 "n_odd": item.n_odd
    //                             });
    //                         }
    //                     }

                        
    //                 });
    //             });

    //             /*******************************************/
    //             /* Quitamos las casas que no sean del pais */
    //             /*******************************************/
    //             exit = exit.filter(function( it, id )
    //             {
    //                 if( feeds[ it.id_feed ] ) return it;
    //             });
    //             /*******************************************/
    //             /* Ordenamos por la cuota descendente      */
    //             /*******************************************/
    //             exit.sort( function(a, b)
    //             {
    //                 var _a = a.n_odd,
    //                     _b = b.n_odd;

    //                 return _a > _b ? -1 : _a < _b ? 1 : 0;
    //             });

    //             deferred.resolve( exit );

    //         },
    //         function error(res)
    //         {
    //             console.log('¡¡¡error!!!');
    //             deferred.reject( 'hay un error' );
    //         });

    //         return deferred.promise;
    //     }
    //     // this.tipBets = function( patricio1 )
    //     // {
    //     //     $http({
    //     //         method : 'POST',
    //     //         url : 'patricia.php',
    //     //         data : {
    //     //             param1 : patricio1
    //     //         }
    //     //     }).then(
    //     //     function success(res)
    //     //     {
    //     //         return [
    //     //                     {
    //     //                         "id_bet": [6058363, 6058363],
    //     //                         "id_feed": 4,
    //     //                         "n_odd": 2.35
    //     //                     },
    //     //                     {
    //     //                         "id_bet": [6059778, 6058363],
    //     //                         "id_feed": 3,
    //     //                         "n_odd": 2.2
    //     //                     }
    //     //                 ];
    //     //     },
    //     //     function error(res)
    //     //     {
    //     //         console.log('¡¡¡error!!!');
    //     //     });
    //     // }

    // })



    // //[{"id_bet":6058363,"id_feed":4,"n_odd":2.35},{"id_bet":6059778,"id_feed":3,"n_odd":2.2}]


    /************************************************************************/
    /*                              Factorias                               */
    /************************************************************************/

    // .factory('socket', function ($rootScope) 
    // {
    //     var socket = io.connect('http://des.besgam.com:8080');

    //     return {
    //         on: function (eventName, callback) 
    //         {
    //             socket.on(eventName, function () 
    //             {
    //                 var args = arguments;
    //                 $rootScope.$apply(function () 
    //                 {
    //                     callback.apply(socket, args);
    //                 });
    //             });
    //         },
    //         emit: function (eventName, data, callback) 
    //         {
    //             socket.emit(eventName, data, function () 
    //             {
    //                 var args = arguments;
    //                 $rootScope.$apply(function () 
    //                 {
    //                     if (callback)
    //                     {
    //                         callback.apply(socket, args);
    //                     }
    //                 });
    //             })
    //         },
    //         destroy: function()
    //         {
    //             socket.disconnet(); 
    //         }
    //     };
    // })

    // .factory('metas', function( $location ) 
    // {
    //     var title = '',
    //         description = '',
    //         keywords = '',
    //         base = '';

    //     return {
    //         title: function() 
    //         { 
    //             return title; 
    //         },
    //         description: function() 
    //         { 
    //             return description; 
    //         },
    //         keywords: function() { return keywords; },
    //         robots: function()
    //         {
    //             if( $location.host() == 'www.besgam.com' )
    //                 return 'index, follow';
    //             else
    //                 return 'noindex, nofollow';
    //         },
    //         reset: function() 
    //         {
    //             title = '';
    //             description = '';
    //             keywords = '';
    //             base = '';
    //         },
    //         setTitle: function( newTitle )
    //         {
    //             title = newTitle;
    //         },
    //         setMetaDescription: function(newMetaDescription) 
    //         {
    //             description = newMetaDescription;
    //         },
    //         setKeywords: function(newKeywords) 
    //         {
    //             keywords = newKeywords;
    //         }
    //     };
    // })

    // .factory('dataFactory', function( $http ) 
    // {
    //     var dataJson = $http({
    //             method: 'GET',
    //             url: './json/data.json', 
    //             params: {'_':new Date().getTime()}, 
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         }).success(function (data) { return data; }),
    //         dataBanner = $http({
    //             method: 'GET',
    //             url: './json/dataBanner.json', 
    //             params: {'_':new Date().getTime()}, 
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         }).success(function (data) { return data; }),
    //         dataFeed = $http.get('./json/feeds.json').success(function (data) 
    //         {
    //             return data;
    //         }),
    //         dataTwitter = $http.get('./php/twitter.php').success(function (data) 
    //         {
    //             return data;
    //         }),
    //         dataBonos = $http.get('./json/dataBono.json').success(function (data) 
    //         {
    //             return data;         
    //         }),
    //         dataMarkets = $http.get('./json/markets.json').success(function (data)
    //         {
    //             return data; 
    //         });

    //     return {
    //         getDataJson: function() { return dataJson ; },
    //         getDataBanner: function() { return dataBanner ; },
    //         getDataFeed: function() { return dataFeed ; },
    //         getDataTwitter: function() { return dataTwitter ; },
    //         getDataBonos: function() { return dataBonos ; },
    //         getDataMarkets: function() { return dataMarkets ; }
    //     }
    // })

    // .factory( "angularTranslateAsyncLoader", function( $q, $http )
    // {
    //     return function( options )
    //     {
    //         var deferred = $q.defer();

    //         $http
    //             .get( "/src/lang/" + options.key + ".json" )
    //             .success( function( data )
    //             {   
    //                 deferred.resolve( data );
    //             })
    //             .error( function() 
    //             {
    //                 deferred.reject( options.key );
    //             });

    //         return deferred.promise;
    //     }
    // })
    // .factory ('timeOut', function($location, $sessionStorage)
    // {
    //     /* Comprobar el timepo de session y echarte si se ha cumplido */
    //     return {
    //         timeOut:function()
    //         {
                
    //             if(angular.isUndefined($sessionStorage.expired) || $sessionStorage.expired == 0 || 
    //                 angular.isUndefined($sessionStorage.iduser) || $sessionStorage.iduser == 0 ||
    //                 angular.isUndefined($sessionStorage.sessionid) || $sessionStorage.sessionid == 0)
    //             {
    //                 $location.path('register').replace();
    //             }
    //             else
    //             {
    //                 var now = new Date();
    //                 var time_now = now.getTime();
    //                 var expired = $sessionStorage.expired;
                  
    //                 var longSession = 1440*60000 // 60.000 seg que es 1 minuto * 3 minutos

    //                 var time_session = expired + longSession ;
    //                 if(time_session < time_now)
    //                 {
    //                     /* La sesion ha caducado */
    //                     $sessionStorage.iduser = null;

    //                     $sessionStorage.expired = 0;
    //                     $sessionStorage.favorites = null;
    //                     $sessionStorage.str_name = null;
    //                     $sessionStorage.str_email = null;
    //                     $sessionStorage.a_sports = null;
    //                     $sessionStorage.other_sport = null;
    //                     $sessionStorage.nameuser = null;
    //                     $sessionStorage.sessionid = null;
    //                     $sessionStorage.$save();
    //                     $sessionStorage.$reset();
    //                     $location.path('register').replace();
    //                 }
    //                 else
    //                     return true;
    //             }
    //         }
    //     }
    // })

    // .factory ('device', function( $window )
    // {
    //     var userAgent   = $window.navigator.userAgent,
    //         browsers    = ["Mobile","iPhone","iPod","BlackBerry","Opera Mini","Sony","MOT","Nokia","samsung"],
    //         typeMobile  = false;

    //         for(var key in browsers) 
    //         {
    //             if( userAgent.indexOf(browsers[key]) != -1 )
    //             {
    //                typeMobile = true;
    //             }
    //             break;
    //         };

    //     return {
    //         is: function()
    //         {
    //             return typeMobile;
    //         }
    //     } 
    // })
    
    /************************************************************************/
    /*                             Directivas                               */
    /************************************************************************/


    // .directive("focusMe", function ( $timeout, $parse, $rootScope ) 
    // {
    //     return {  
    //         // scope: '=focusMe', 
    //         // link: function (scope, element, attrs) 
    //         // {
    //         //     var model = $parse(attrs.focusMe);
    //         //     scope.$watch(model, function (value) 
    //         //     {
    //         //         console.log('value=', value);
    //         //         if (value === true) 
    //         //         {
    //         //             $timeout(function () 
    //         //             {  
    //         //                 element[0].focus();
    //         //                 scope.$apply(model.assign(scope, true));
    //         //             }, 250);
    //         //         }
    //         //     });

    //         //     element.bind('blur', function () 
    //         //     {
    //         //         console.log('blur');
    //         //         scope.$apply(model.assign(scope, false));
    //         //     });
    //         // }
       
    //         // scope: { trigger: '=focusMe' },
    //         // link: function(scope, element) 
    //         // {
    //         //     scope.$watch('trigger', function(value) 
    //         //     {
    //         //         if(value === true) 
    //         //         {
    //         //             console.log('trigger',value);
    //         //             $timeout(function() {
    //         //                 element[0].focus();
    //         //                 //scope.trigger = false;
    //         //             });
    //         //         }
    //         //     });
    //         // }

    //         // link: function( scope, element, attr )
    //         // {
    //         //     element.on("touchstart", function(event)
    //         //     {
    //         //         event.preventDefault();
    //         //         event.stopPropagation();

    //         //         $rootScope.showSearchMobile = true;
    //         //         scope.$apply();

    //         //         var el = document.getElementById("target");
    //         //         el.focus();
    //         //     });

    //         //     element.on("touchend", function(event)
    //         //     {
    //         //         //return false;
    //         //         // event.preventDefault();
    //         //         // event.stopPropagation();
    //         //     });
    //         // }
    //     };
    // })

    // .directive("headerScroll", function ($window) 
    // {
    //     return function(scope, element, attrs) 
    //     {
    //         angular.element($window).bind("scroll", function() 
    //         {
    //             if (this.pageYOffset > 273) 
    //                  scope.headerFixedChangeClass = true;
    //             else
    //                  scope.headerFixedChangeClass = false;

    //             scope.$apply();
    //         });
    //     };
    // })

    // .directive('totalShopBetsIn', function( $window, $document, $rootScope )
    // {
    //     return function( scope, element, attrs )
    //     {
    //         var w = angular.element($window),
    //             body = angular.element( $document[0].body );
                
    //         // scope.getWindowDimensions = function () 
    //         // {
    //         //     return {
    //         //         'h': w.height(),
    //         //         'w': w.width()
    //         //     };
    //         // };
    //         // scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) 
    //         // {
    //         //     scope.windowHeight = newValue.h;
    //         //     scope.windowWidth = newValue.w;

    //         //     scope.style = function () {
    //         //         return {
    //         //             'height': (newValue.h - 100) + 'px',
    //         //             'width': (newValue.w - 100) + 'px'
    //         //         };
    //         //     };

    //         // }, true);

    //         w.bind('resize', function( scope ) 
    //         {
    //             if( $window.innerWidth <= 680 && $rootScope.showBag )
    //                 element.attr( 'style', 'max-height: ' + ($window.innerHeight - getHeightBag() ) + 'px' );
    //             else
    //                 element.attr( 'style', 'max-height: 450px' );
    //         });

    //         scope.$watch('showBag', function()
    //         {
    //             if( $window.innerWidth <= 680 && $rootScope.showBag )
    //             {
    //                 body.addClass('overflow-hidden-bag');
    //                 element.attr( 'style', 'max-height: ' + ($window.innerHeight - getHeightBag() ) + 'px' );
    //             }
    //             else
    //                 body.removeClass('overflow-hidden-bag');
    //         });

    //         scope.$watch('changeView', function()
    //         {
    //             if( $window.innerWidth <= 680 && $rootScope.showBag )
    //                 element.attr( 'style', 'max-height: ' + ($window.innerHeight - getHeightBag() ) + 'px' );
    //         });

    //         getHeightBag = function()
    //         {
    //             return $rootScope.changeView == 'simple' ? 135 : 112;
    //         };

    //     };
    // })

    // .directive('bodyOverflow', function( $document, $rootScope )
    // {
    //     return function( scope, element, attrs )
    //     {
    //         var  body = angular.element( $document[0].body );

    //         scope.$watch('showSearchMobile', function()
    //         {
    //             if( $rootScope.showSearchMobile )
    //                 body.addClass('overflow-hidden-search');
    //             else
    //                 body.removeClass('overflow-hidden-search');
    //         });
    //     };
    // })

    // .directive("hideClickOutside", function( $document )
    // {
    //     return {
    //         link: function (scope, element, attrs) 
    //         {
    //             $document.on('click', function (e) 
    //             {
    //                 if( !element[0].contains(e.target) ) 
    //                 {
    //                     scope.$apply(function () 
    //                     {
    //                         scope.search.tags = '';
    //                     });
    //                 }
    //             });

    //         }
    //     }
    // })

    // .directive('hideFilterOutside', function( $document, $parse ) 
    // {
    //     return {
    //         link: function postLink(scope, element, attrs) 
    //         {
    //             var first = true;   // Primer click
    //             /* Observadores */
    //             scope.$watch( attrs.hideFilterOutside, function( newValue, oldValue)
    //             {
    //                 if (newValue !== oldValue && newValue == true)
    //                     $document.bind('click', onClick);       // Creamos evento
    //                 else if (newValue !== oldValue && newValue == false)
    //                 {
    //                     /* Inicializamos */
    //                     first = true;
    //                     $document.unbind('click', onClick);     // Drestruimos evento
    //                 }
    //             });
    //             /* Se utiliza SOLO cuando se selecciona un filtro */
    //             scope.$watch( 'filter.selected', function( newValue, oldValue)
    //             {
    //                 if (newValue !== oldValue && oldValue !== undefined )
    //                 {
    //                     /* Inicializamos */
    //                     first = true;
    //                     $document.unbind('click', onClick);     // Drestruimos evento
    //                     scope.$parent.prematchMarketFilter = false;
    //                 }
    //             });

    //             /* Evento on click */
    //             var onClick = function (event) 
    //             {
    //                 /* Instanciamos */
    //                 var isChild = $(element).has(event.target).length > 0,
    //                     isSelf = element[0] == event.target,
    //                     isInside = isChild || isSelf;

    //                 if( !isInside && !first ) 
    //                 {
    //                     switch( attrs.hideFilterOutside )
    //                     {
    //                         case '$parent.liveListFilter':
    //                             scope.$parent.liveListFilter = false;
    //                         break;
    //                         case '$parent.liveMarketFilter':
    //                             scope.$parent.liveMarketFilter = false;
    //                         break;
    //                         case 'menuFilter':
    //                             scope.menuFilter = false;
    //                         break;
    //                         case '$parent.prematchListFilter':
    //                             scope.$parent.prematchListFilter = false;
    //                         break;
    //                         case '$parent.prematchMarketFilter':
    //                             scope.$parent.prematchMarketFilter = false;
    //                         break;
    //                         case '$parent.tipsterFilter':
    //                             scope.$parent.tipsterFilter = false;
    //                         break;
    //                         case '$parent.tipsterTopFilter':
    //                             scope.$parent.tipsterTopFilter = false;
    //                         break;
    //                         case 'predictiveSearch':
    //                             scope.search.tags = '';
    //                             scope.predictiveSearch = false;
    //                         break;
    //                         case 'predictiveCentralSearch':
    //                             scope.search.tags = '';
    //                             scope.predictiveCentralSearch = false;
    //                         break;
    //                     }
    //                     /* Inicializamos */
    //                     first = true;
    //                     /* Aplicamos scope */
    //                     scope.$apply();
    //                 }
    //                 else
    //                     /* No es la primera vez */
    //                     first = false;
    //             }
    //         }
    //     };
    // })

    // .directive("tooltipTouchChart", function( $document )
    // {
    //     return {
    //         link: function (scope, element, attrs) 
    //         {
    //             element.on('touchstart', function (e) 
    //             {
    //                 angular.element(element).find('.nvtooltip').css("display", "block");
    //             });

    //             element.on('touchend', function (e) 
    //             {
    //                angular.element(element).find('.nvtooltip').css("display", "none");
    //             });

    //         }
    //     }
    // })

    // .directive("hideFilterOutside", function( $document )
    // {
    //     return {
    //         link: function (scope, element, attrs) 
    //         {
    //             $document.on('click', function (e) 
    //             {
    //                 scope.$apply(function () 
    //                 {
    //                     if( !element[0].contains(e.target) )
    //                     {
    //                         switch( e.target.lang )
    //                         {
    //                             case 'live-list-filter':
    //                                 scope.$parent.liveListFilter = true;
    //                             break;
    //                             case 'live-market-filter':
    //                                 scope.$parent.liveMarketFilter = true;
    //                             break;
    //                             case 'menu-filter':
    //                                 scope.menuFilter = true;
    //                             break;
    //                             case 'prematch-list-filter':
    //                                 scope.$parent.prematchListFilter = true;
    //                             break;
    //                             case 'prematch-market-filter':
    //                                 scope.$parent.prematchMarketFilter = true;
    //                             break;
    //                             case 'tipster-filter':
    //                                 scope.$parent.tipsterFilter = true;
    //                             break;
    //                             case 'tipster-top-filter':
    //                                 scope.$parent.$parent.tipsterTopFilter = true;
    //                             break;
    //                             default:
    //                                 /* Control de submenus */
    //                                 if( scope.menuFilter == true && scope.mblInter == true )
    //                                     scope.mblInter = false;
    //                                 /* Ocultamos */
    //                                 scope.$parent.liveListFilter = false;
    //                                 scope.$parent.liveMarketFilter = false;
    //                                 scope.menuFilter = false;
    //                                 scope.$parent.prematchListFilter = false;
    //                                 scope.$parent.prematchMarketFilter = false;
    //                                 scope.$parent.tipsterFilter = false;
    //                                 scope.$parent.tipsterTopFilter = false;
    //                             break;
    //                         }
    //                     }
    //                 });
    //             });
    //         }
    //     }
    // })

    // .directive("scroll", function($window, $rootScope) 
    // {
    //     return function(scope, element, attrs) 
    //     {
    //         // var userAgent   = $window.navigator.userAgent,
    //         //     browsers    = ["Mobile","iPhone","iPod","BlackBerry","Opera Mini","Sony","MOT","Nokia","samsung"],
    //         //     typeMobile  = false;

    //         // for(var key in browsers) 
    //         // {
    //         //     if( userAgent.indexOf(browsers[key]) != -1 )
    //         //     {
    //         //        typeMobile = true;
    //         //     }
    //         //     break;
    //         // };    


    //         angular.element($window).bind("scroll", function() 
    //         {
    //             if (this.pageYOffset > 273) 
    //                  $rootScope.fScrollData = true;
    //             else
    //                  $rootScope.fScrollData = false;

    //             scope.$apply();
    //         });
    //     };
    // })

    // .directive("inputHeaderSearch", function($window, $location, $anchorScroll) 
    // {
    //     return function( scope, element, attrs) 
    //     {
    //         var userAgent   = $window.navigator.userAgent,
    //             browsers    = ["Mobile","iPhone","iPod","BlackBerry","Opera Mini","Sony","MOT","Nokia","samsung"];

    //         for(var key in browsers) 
    //         {
    //             if( userAgent.indexOf(browsers[key]) != -1 )
    //             {
    //                element.attr("disabled", "disabled");
    //             }
    //             break;
    //         };    

    //         element.bind("touchend", function()
    //         {
    //             document.location.href = "search.html"; 
    //         });
    //     };
    // })

    // .directive('activeBet', function( $localStorage ) 
    // {
    //    return {
    //         restrict: 'A',
    //         link: function (scope, element, attrs) 
    //         {
    //             var id = attrs['id'],
    //                 el = element;

    //             angular.forEach($localStorage.simple, function(value, key) 
    //             {
    //                 if( id == value.id_element )
    //                 {
    //                     el.toggleClass('betslip-active', true );
    //                 }
    //             });
                
    //             /* Cuando se fuerza el evento con $scope.broadcast lanza esta función */
    //             scope.$on('del-active-betslip', function( event, id ) 
    //             {
    //                 if( el[0].id == id )
    //                 {
    //                     el.toggleClass('betslip-active', false );
    //                 }
    //             });

    //             /* Cuando se fuerza el evento con $scope.broadcast lanza esta función */
    //             scope.$on('add-active-betslip', function( event, id ) 
    //             {
    //                 if( el[0].id == id )
    //                 {
    //                     el.toggleClass('betslip-active', true );
    //                 }
    //             });
    //         }
    //     };
    // })

    // .directive('betinput', function( $window )
    // {
    //     return {
    //         template: '<input type="tel" ng-model="bet" ng-init="bet=0" maxlength="9">',
    //         restrict: 'E', //<betinput></betinput> hace referencia a un elemento/etiqueta html
    //         require: 'ngModel',
    //         replace: true,
    //         link: function( scope, element, attrs, modelCtrl ) 
    //         {
    //             modelCtrl.$parsers.push(function (inputValue) 
    //             {
    //                 var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;

    //                 if (transformedInput!=inputValue) {
    //                     modelCtrl.$setViewValue(transformedInput);
    //                     modelCtrl.$render();
    //                 }

    //                 return transformedInput;
    //             });

    //             // element.bind("focus", function() 
    //             // {
    //             //     if (!$window.getSelection().toString()) 
    //             //       this.setSelectionRange(0, 9)
    //             // });

    //             element.bind("click", function() 
    //             {
    //                 if (!$window.getSelection().toString()) 
    //                   this.setSelectionRange(0, this.value.length)
    //             });

                
    //         }

    //     };
    // })

    // .directive('validatiOn', function () 
    // {
    //     return {
    //         restrict: 'A',
    //         require: '^form', /*  */
    //         link: function (scope, el, attrs, form) 
    //         {
    //             /* Cogemos el elemento input dentro de 'el', que es el contenedor (coge el que tiene el atributo 'name')... */
    //             var inputEl = el[0].querySelector('[name]'),
    //             /* lo convertimos en elemento de angular */
    //                 inputNgEl = angular.element(inputEl),
    //             /* Cogemos el atributo 'name' para validar en el formulario más abajo */
    //                 inputName = inputNgEl.attr('name');

    //             /* Cuando el usuario sale del elemento, aplica la clase .has-error a la capa que contiene el input */
    //             inputNgEl.bind('blur', function () 
    //             {
    //                 el.toggleClass('has-error', form[inputName].$invalid);
    //             });
                
    //             /* Cuando se fuerza el evento con $scope.broadcast lanza esta función */
    //             scope.$on('validate-form', function( event, formName ) 
    //             {
    //                 if( form.$name == formName )
    //                     el.toggleClass('has-error', form[inputName].$invalid);
    //             });
    //         }
    //     };
    // })
    // /************************************************************************/
    // /*                             Filtros                                  */
    // /************************************************************************/
    // .filter('trim', function () 
    // {
    //     return function(value) 
    //     {
    //         if(!angular.isString(value)) 
    //             return value;

    //         return value.replace(/^\s+|\s+$/g, ''); // no utilizamos trim()
    //     };
    // })
    
    // .filter('replaceName', function()
    // {
    //     return function (input) {

    //         if(!input) return;

    //         return input.toLowerCase()
    //                     .replace(/[áàäâå]/g, 'a')
    //                     .replace(/[éèëê]/g, 'e')
    //                     .replace(/[íìïî]/g, 'i')
    //                     .replace(/[óòöô]/g, 'o')
    //                     .replace(/[úùüû]/g, 'u')
    //                     .replace(/[ýÿ]/g, 'y')
    //                     .replace(/[ñ]/g, 'n')
    //                     .replace(/[ç]/g, 'c')
    //                     .replace(/['"]/g, '')
    //                     .replace(/\//g, "")
    //                     .replace(/ /g, '-');
    //     };
    // })

    // .filter('cutTwoPoints', function()
    // {
    //     return function( input, position ) {

    //         if( !input || !position ) return;

    //         var info = input.split(" : ");

    //         if( info.length == 1 )
    //             info = input.split(":");

    //         if( info.length == 1 ) return;

    //         if( position == 'left' )
    //             return info[0] == '' ? '-' : info[0];
    //         else if( position == 'right' )
    //             return info[1] == '' ? '-' : info[1];
    //         else
    //             return;
    //     }
    // })

    // .filter('infoSets', function()
    // {
    //     return function (input) {

    //         if(!input) return;

    //         var exit = "";

    //         for( var nCont = 0, len = input.length;
    //              nCont < len;
    //              nCont++ )
    //         {
    //             exit += input[nCont].replace(/ /g, '') + " ";
    //         }

    //         return exit;
    //     }
    // })

    // .filter('timeZoneOffset', function( $localStorage )
    // {
    //     return function( input )
    //     {
    //         if( !input ) return;  // Control para evitar vacios
    //         var targetTime = new Date( input ),
    //             timeZoneOffset = $localStorage.timeZoneOffset || 0,
    //             offsetTime = new Date( targetTime.getTime() + timeZoneOffset );
    //             //format     = format || "dd/mm HH:MM";
        
    //        //return offsetTime.format( format );
    //        return offsetTime;
    //     }
    // })

    // .filter('oddsConverter', function( $localStorage )
    // {
    //     function reduce(a,b) 
    //     {
    //         var n  = new Array(2);
    //         var f = GCD(a,b);
    //         n[0] = a/f;
    //         n[1] = b/f;
    //         return n;
    //     }
    //     function GCD(num1,num2) 
    //     {
    //         var a; var b;
    //         if (num1 < num2) {a = num2; b = num1;}
    //         else if (num1 > num2) {a = num1; b = num2;}
    //         else if (num1 == num2) {return num1;}

    //         while(1) 
    //         {
    //             if (b == 0)
    //                 return a;
    //             else
    //             {
    //                 var temp = b;
    //                 b = a % b;
    //                 a = temp;
    //             }
    //         }
    //     }

    //     return function( input, places )
    //     {
    //         if( angular.isUndefined(input) || input == null )
    //             return;

    //         var type = $localStorage.oddsType || "decimal",
    //             places = angular.isUndefined(places) ? 2 : places;

    //         switch( type )
    //         {
    //             case "us":
    //                 input-=1;
    //                 if(input < 1)
    //                     return('-'+(100/input).toFixed(2));
    //                 else
    //                     return('+'+(input*100).toFixed(2));

    //             break;
    //             case "fraction":
    //                 input = parseFloat(input).toFixed(2);
    //                 var num = (input-1) * 10000;
    //                 var dom = 10000;

    //                 num = Math.round(num);
    //                 dom = Math.round(dom);

    //                 var a = reduce(num,dom);
    //                 num = a[0];
    //                 dom = a[1];

    //                 return(num+'/'+dom);
    //             break;
    //             default:
    //                 return parseFloat(input.toFixed( places ))+' ';
    //             break;
    //         }
    //     };
    // })

    // .filter('setBetSlipDecimal', function ($filter) 
    // {
    //     return function( input, places )
    //     {
    //         if(isNaN(input) || input === null ) return input;
    //         return input.toFixed( places );
    //     };
    // })

    // .filter('isArray', function() 
    // {
    //     return function (input) {
    //         return angular.isArray(input);
    //     };
    // })

    // .filter('startFrom', function() 
    // {
    //     return function(input, start) 
    //     {
    //         if( !input ) return;  // Control para evitar vacios
    //         start = +start; //parse to int
    //         return input.slice(start);
    //     }
    // })

    // .filter('toArray', function () 
    // {
    //     'use strict';

    //     return function (obj) 
    //     {
    //         if (!(obj instanceof Object)) 
    //             return obj;

    //         return Object.keys(obj).map(function (key) 
    //         {
    //             return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
    //         });
    //     }
    // })

    // .filter('orderObjectBy', function() 
    // {
    //     return function(items, field, reverse) 
    //     {
    //         var filtered = [];
    //         angular.forEach(items, function(item) 
    //         {
    //             filtered.push(item);
    //         });

    //         filtered.sort(function (a, b) 
    //         {
    //             return (a[field] > b[field]) ? 1 : ((a[field] < b[field]) ? -1 : 0);
    //         });

    //         if(reverse) filtered.reverse();

    //         return filtered;
    //     };
    // })

    // .filter('range', function() 
    // {
    //     return function(input, total) 
    //     {
    //         total = parseInt(total);
    //         for (var i=0; i<total; i++)
    //             input.push(i);

    //         return input;
    //     };
    // })

    // .filter('reverse', function() 
    // {
    //     return function(items) 
    //     {
    //         return items.slice().reverse();
    //     };
    // })

    // .filter('setTextual', function ($filter)
    // {
    //     return function ( input, nChar ) 
    //     {
    //         if( !input ) return input;
    //         var text,
    //             nch = nChar-3;
    //         if( input.length > nch )
    //             return input.substr(0, nch) + "...";
    //         else
    //             return input;
    //     };
    // })

    // .filter('setDecimal', function ($filter) 
    // {
    //     return function (input, places) 
    //     {
    //         if (isNaN(input)) return input;

    //         var factor = "1" + Array(+(places > 0 && places + 1)).join("0");

    //         return Math.round(input * factor) / factor;
    //     };
    // })

    // .filter('nospace', function () 
    // {
    //     return function (value) 
    //     {
    //         return (!value) ? '' : value.replace(/ /g, '');
    //     };
    // })

    // .filter('startFromMarket', [function() 
    // {
    //     return function(obj, limit)
    //     {
    //         var keys = Object.keys(obj);
    //         if(keys.length < 1)
    //             return [];

    //         var ret = new Object,
    //         count = 0;

    //         angular.forEach(keys, function(key, arrayIndex)
    //         {
    //             if(count < limit)
    //                 count++;
    //             else
    //             {
    //                 ret[key] = obj[key];
    //                 count++;
    //             }
    //         });
            
    //         return ret;
    //     };       
    // }])

    // .filter('myLimitTo', [function()
    // {
    //     return function(obj, limit)
    //     {
    //         var keys = Object.keys(obj);
    //         if(keys.length < 1){
    //             return [];
    //         }

    //         var ret = new Object,
    //         count = 0;
    //         angular.forEach(keys, function(key, arrayIndex)
    //         {
    //             if(count >= limit)
    //                 return false;
    //             ret[key] = obj[key];
    //             count++;
    //         });
            
    //         return ret;
    //     };
    // }])

    // .filter('reverseAnything', function() 
    // {
    //     return function(items) 
    //     {
    //         if(typeof items === 'undefined') { return; }
    //         return angular.isArray(items) ? 
    //                items.slice().reverse() : // If it is an array, split and reverse it
    //                (items + '').split('').reverse().join(''); // else make it a string (if it isn't already), and reverse it
    //     };
    // })

    // .filter('limitText', function () 
    // {
    //     return function (value) 
    //     {
    //         value = String(value).replace(/<[^>]+>/gm, '');
            
    //         var limit = 210;

    //         if(value.length > limit)
    //             return value.substr(0,limit) + " ...";
    //         else
    //         {
    //             var diff = limit - parseInt(value.length);
                
    //             var white ="";
    //             for(var index = 0; index < diff; index++)
    //             {
    //                 white += " &nbsp";
    //             }
                
    //             return value + white ;
    //         }
    //     };
    // })

    // .filter('filterMarkets', function () 
    // {
    //     return function (items, group) 
    //     {
    //         var filtered = [];

    //         angular.forEach(items, function(value, key) 
    //         {
    //             angular.forEach(group, function(valueGroup, keyGroup) 
    //             {
    //                 if(value.id_market == valueGroup)
    //                     filtered.push(value); 
    //             });    
    //         });     

    //         return filtered;
    //     };
    // })

    // .filter( 'shortName', function()
    // {
    //     var limitChar = 10;

    //     function cutName( str, limit )
    //     {
    //         str = str.substr(0, limit-3 );
    //         str += "...";

    //         return str;
    //     };

    //     return function( input, order )
    //     {
    //         var player = input.split(" vs "),
    //             plus0 = 0,
    //             plus1 = 0;

    //         if( player[0].length < limitChar )
    //             plus1 = limitChar - player[0].length;
    //         if( player[1].length < limitChar )
    //             plus0 = limitChar - player[1].length;

    //         if( player[0].length > limitChar )
    //             player[0] = cutName( player[0], limitChar+plus0 );
    //         if( player[1].length > limitChar )
    //             player[1] = cutName( player[1], limitChar+plus1 );

    //         if( order == 1 )
    //           return player[0];

    //         return player[1];
    //     };
    // })
    // /* Para pormociones. Sustituye el tag <strong> por <span> con negrita */
    // .filter('replaceTagHTML', function()
    // {   
    //     return function(textHTML)
    //     {
    //         var begin = textHTML.replace(/<strong>/gi, "<span class='strong'>"); 
    //         return begin.replace(/<\/strong>/gi, "</span>");
    //     }
    // })
    /************************************************************************/
    /*                              Controladores                           */
    /************************************************************************/
    // .controller('metaTags', function( $scope, $location, $rootElement , $http, $rootScope) 
    // { 
    //     /* Realizar base name */
    //     var metaFragment = document.getElementsByTagName('meta')[1],
    //         el = document.createElement("base");

    //     if( $location.host() == "des.besgam.com" )
    //         el.setAttribute("href", "//des.besgam.com/");
    //     else
    //         el.setAttribute("href", "//www.besgam.com/");

    //     metaFragment.parentNode.insertBefore(el, metaFragment.nextSibling);

        
    //     if($location.host() == "des.besgam.com")
    //         $scope.metadata = {
    //             'content' : 'noindex, nofollow'
                 
    //         };
    //     else
    //         $scope.metadata = {
    //             'content' : 'index, follow'
    //         };
        
       
    //     /* SEO PARA LA FICHA DEL EVENTO */
    //     $scope.capitalize = function(dataString)
    //     {

    //         var all = dataString.split(" ");
    //         var result = "";

    //         angular.forEach(all, function(value, key) {
    //                 all[key] = value.substr(0,1).toUpperCase()+value.substr(1,value.length) + " ";
    //             });   
           
    //         all = all.join(" ");
    //         all = all.substr(0, all.length - 1);
    //         return all;    

    //     }
     
    //     /* Titulo de la ficha */

    //     var url_event = $location.url();
    //     url_event = url_event.split('/');
        

    //     if(url_event[1]=="apuestas" && url_event.length > 6)
    //     {

    //         /* Obtener datos de los equipos, deportes y ligas */
    //         var league_card = url_event[2].replace(/-/g," ");
    //         var event_card = url_event[3].replace(/-/g," ");
    //         var event_card = event_card.split('vs');

    //         var team1 = "";
    //         var team2 = "";

    //         if(event_card.length >1){
    //             team2 = event_card[1].replace(/(^\s*)|(\s*$)/g,""); 
    //         }
    //         team1 = event_card[0].replace(/(^\s*)|(\s*$)/g,""); 


    //         var idsport_card = parseInt(url_event[5],10) - 1;
            
           
    //         var dataSport = {
    //             method: 'GET',
    //             url: 'json/sports.json',
    //             cache: true,
    //             headers: {
    //                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         };

    //         /* Segun el deporte se añaden los meta y los keywords*/
    //         $http(dataSport).
    //         success(function(data, status, headers, config) 
    //         {
    //             sport_card = data[idsport_card].sportName ; 
    //             document.querySelector('title').innerHTML  = "Apuesta al "+  $scope.capitalize(team1) + " " +  $scope.capitalize(team2) + " "+ sport_card + " " +  $scope.capitalize(league_card) +
    //              " tras conocer con Besgam las mejores cuotas";

    //             var description = document.querySelector("meta[name=description]");
    //             var txt_team2 = (team2!="") ? $scope.capitalize(team2) + " " : "";
    //             var txt_description = "Busca en Besgam las mejores cuotas del  mercado para "+  $scope.capitalize(team1) +" " 
    //                     +  txt_team2  + sport_card + " " +  $scope.capitalize(league_card) + 
    //                     ". Compara y consigue el mayor rendimiento en tus apuestas deportivas";

    //                 description.setAttribute('content', txt_description);

    //             var keywords = document.querySelector("meta[name=keywords]");
    //             var txt_team2 = (team2!="") ? $scope.capitalize(team2) + ", " : "";
    //                 keywords.setAttribute('content', 
    //                                     $scope.capitalize(team1) + ", " +  
    //                                     txt_team2 + 
    //                                     sport_card + ", " +  
    //                                     $scope.capitalize(league_card) + 
    //                                     ", besgam, apuestas, rendimiento, comparador de cuotas, casas apuestas, comparador apuestas, apuestas deportivas");
                        
                        
    //         }).
    //         error(function(data, status, headers, config)  
    //         {
                                                
    //         });

    //     }
    // })
    
    // .controller("besgamSearch", function( $rootScope, $scope, $http, $location, $translate, $route, dataFactory )
    // {        
    //     var now = new Date(),
    //         url = $location.url(),
    //         endUrl = url.split("?");

    //     $scope.placeholder = $route.current.params.target;

    //     $scope.isNotHome = function()
    //     {
    //         if( ( endUrl[0] == "/search" || endUrl[0] == "/home" || endUrl[0] == "/" ) && !$scope.fScrollData )
    //             return false;
    //         else
    //             return true;
    //     };

    //     $translate('controller.search.param1').then(function (translation) 
    //     {
    //         $scope.placeholder = ($route.current.params.target == translation || angular.isUndefined($route.current.params.target)) ? 'header.betFinderM.search' : $route.current.params.target;
    //     });

    //     $translate('centralFinder.filter.sport').then(function (translation) // "Deporte";
    //     {
    //         $scope.titleSport = translation;
    //     });
    //     $translate('centralFinder.filter.competition').then(function (translation) // "Competición";
    //     {
    //         $scope.titleLeague = translation;
    //     });

    //     $scope.search = [];

    //     $scope.submit = function(form)
    //     {
    //         if( typeof($scope.search.tags) == 'undefined' || $scope.search.tags == '' ) $scope.search.tags = $translate.instant('controller.search.param1');
    //         if( typeof($scope.search.sport) == 'undefined' || $scope.search.sport == '' ) $scope.search.sport = $translate.instant('controller.search.param2');
    //         if( typeof($scope.search.league) == 'undefined' || $scope.search.league == '' ) $scope.search.league = $translate.instant('controller.search.param3');

    //         var href = "./#!search";

    //         if( $scope.search.tags != "" )
    //             href += "/" + $scope.search.tags;
    //         if( $scope.search.sport != "" )
    //             href += "/" + $scope.search.sport;
    //         if( $scope.search.league != "" )
    //             href += "/" + $scope.search.league;

    //         document.location.href = href;
    //         //document.forms[form].submit();
    //     };

    //     dataFactory.getDataJson().then( function(response)
    //     {
    //         $scope.dataJson = response.data;

    //         $scope.sports = $scope.dataJson.reduce(function(sum, place) 
    //         {
    //             if (sum.indexOf( place.sport ) < 0) sum.push( place.sport );
    //             return sum;
    //         }, []);
    //         $scope.createLeagues();
    //     });
        
    //     $scope.createLeagues = function()
    //     {   
    //         if( typeof $scope.search != 'undefined' )
    //             $scope.titleSport = ( $scope.search.sport == "" ) ? $translate.instant('centralFinder.filter.sport') : $scope.search.sport;
           
    //         $scope.leagues = $scope.dataJson.reduce(function(sum, place) 
    //         {
    //             if( typeof $scope.search.sport != 'undefined' && $scope.search.sport != "" )
    //             {
    //                 if (sum.indexOf( place.league ) < 0 && $scope.search.sport == place.sport )
    //                     sum.push( place.league );
    //             }
    //             else
    //             {
    //                 if (sum.indexOf( place.league )  < 0) sum.push( place.league );
    //             }       
                    
    //             return sum;
    //         }, []);

    //         $scope.search.league = "";
    //     };

    //     $scope.selectLeagues = function()
    //     {
    //         $scope.titleLeague = ($scope.search.league == "") ? $translate.instant('centralFinder.filter.competition') : $scope.search.league;
    //     };
    // })
    
    // .controller("betslip", function( $scope, $rootScope, $http, $window, $localStorage, $location, $timeout, $translate, dataFactory, dateTime, device )
    // {
    //     $scope.$lStorage = $localStorage;
    //     $scope.isArray = angular.isArray;
    //     $scope.tabActive = 0;

    //     $scope.resetData = function()
    //     {
    //         $scope.$lStorage.simple = [];
    //         $scope.$lStorage.combined = [
    //             {"bets": -1, "betSlip": [], "totalCombined": {} },
    //             {"bets": -1, "betSlip": [], "totalCombined": {} },
    //             {"bets": -1, "betSlip": [], "totalCombined": {} },
    //             {"bets": -1, "betSlip": [], "totalCombined": {} }
    //         ];
    //         $scope.$lStorage.tabActive = 0;
    //     };

    //     /* Definimos el localStorage */
    //     if( angular.isUndefined( $scope.$lStorage.simple ) || 
    //         angular.isUndefined( $scope.$lStorage.combined ) )
    //     {
    //         $scope.resetData();
    //     }
    //     /* Control de eventos caducados */
    //     else
    //     {
    //         if( $scope.$lStorage.simple.length > 0 )
    //         {
    //             var expirationSimple = false;

    //             /* Comprobamos si ya existe */
    //             angular.forEach( $scope.$lStorage.simple, function(value, key) 
    //             {
    //                 var isExpiration = dateTime.fExpiration( value.expiration );

    //                 if( isExpiration )
    //                 {
    //                     value.is_expiration = isExpiration;
    //                     expirationSimple = true;
    //                 }
    //             });

    //             /* Solo buscamos eventos caducados en las cestas combinadas */
    //             /* si hemos encontrado algun evento caducado en las simples */
    //             if( expirationSimple )
    //             {
    //                 /* Buscamos en las apuestas de combinadas */
    //                 angular.forEach( $scope.$lStorage.combined, function(value, key) 
    //                 {
    //                     angular.forEach( value.bets, function(bet, betKey)
    //                     {
    //                         bet.is_expiration = dateTime.fExpiration( bet.expiration );
    //                     });
    //                 });
    //             }
    //         }
    //     }

    //      /* Cargamos los datos de las feed */
    //     dataFactory.getDataFeed().then( function(response)
    //     {
    //         $scope.feed = response.data;
    //     });

    //     $rootScope.getIdName = function( id_event, id_market, str_bet )
    //     {
    //         return id_event+"|"+id_market+"|"+str_bet;
    //     };

    //     $rootScope.addLocal = function( id_element, id_sport, id_league, str_league, id_event, str_event, str_market, str_bet, bet, dt_expiration, default_feed )
    //     {
    //         var addSimple = true,      // Inicializamos a TRUE para insertar en simple
    //             addCombined = true;

    //         if( $scope.$lStorage.simple.length > 0 )
    //         {
    //             /* Comprobamos si ya existe */
    //             angular.forEach( $scope.$lStorage.simple, function(value, key) 
    //             {
    //                 if( value.id_element == id_element )
    //                 {
    //                     addSimple = false;
    //                     addCombined = false;
    //                     $scope.delSimple( key );

    //                     // if( $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].bets != -1 )
    //                     // {
    //                     //     angular.forEach( $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].bets, function( bet, key )
    //                     //     {
    //                     //         if( bet.id_element == id_element )
    //                     //         {
    //                     //             addCombined = false;
    //                     //         }

    //                     //     });
    //                     // }
    //                 }
    //             });
    //         }

    //         if( addSimple || addCombined )
    //         {
    //             var bets = {
    //                 "id_element": id_element,
    //                 "id_sport": id_sport,
    //                 "id_league": id_league,
    //                 "str_league": str_league,
    //                 "id_event": id_event,
    //                 "str_event":  str_event,
    //                 "str_market": str_market,
    //                 "str_bet": str_bet,
    //                 "expiration": dt_expiration,
    //                 "is_expiration": 0,
    //                 "focus_bet": {
    //                     "id_feed": bet[0].id_feed,
    //                     "n_odd": bet[0].n_odd,
    //                     "id_bet": bet[0].id_bet,
    //                     "is": 1
    //                 },
    //                 "simple_bet": bet[default_feed],
    //                 "bet": bet,
    //                 "duplicate": 0
    //             };

    //             /* Comprobamos si tenemos otro apuesta del mismo evento */
    //             bets.duplicate = $scope.duplicate( id_event, $scope.$lStorage.tabActive, 'add' );
    //             bets.is_expiration = dateTime.fExpiration( dt_expiration );

    //             /* Se guarda en el localStorage */
    //             if( addSimple )     // Simple
    //                 $scope.$lStorage.simple.push(bets);

    //             if( addCombined )
    //             {
    //                 /* Comprobamos que sea array */
    //                 if( $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].bets == -1 )
    //                     $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].bets = [];

    //                 $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].bets.push(bets);
    //                 $scope.addBetSlip( bets.bet );
    //             }

    //             /* Salvamos el localStorage */
    //             $scope.$lStorage.$save();

    //             /* Visualizamos la cesta por primera vez */
    //             /* Y que no sea un dispositivo */
    //             if( $scope.$lStorage.simple.length == 1 && !device.is() )
    //                 $rootScope.showBag = 1;

    //             /* Eliminamos de la directiva */
    //             $rootScope.$broadcast('add-active-betslip', bets.id_element );
    //         }
    //     };

    //     // function fExpiration( strTime )
    //     // {
    //     //     if( !strTime ) return;  // Control para evitar vacios

    //     //     /* Hora del evento + UTC */
    //     //     var targetTime = new Date( strTime ),
    //     //         offsetTime = new Date( targetTime.getTime() + $localStorage.timeZoneOffset );

    //     //     /* NOW + UTC */
    //     //     var now     = new Date(),
    //     //         nowUTC  = new Date( now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds() ),
    //     //         today   = new Date( nowUTC.getTime() + $localStorage.timeZoneOffset );

    //     //     return (offsetTime > today ) ? 0 : 1;
    //     // };

    //     $scope.duplicate = function( id_event, tabActive, action )
    //     {
    //         var duplicate = 0,
    //             duplicates = [];

    //         /* Comprobamos si ya tenemos el evento de otra apuesta */
    //         angular.forEach( $scope.$lStorage.combined[ tabActive ].bets, function(value, key) 
    //         {
    //             if( value.id_event == id_event )
    //             {
    //                 if( action == 'add' )
    //                 {
    //                     value.duplicate = 1;
    //                     duplicate = 1;
    //                 }
    //                 else if( action == 'delete' )
    //                 {
    //                     duplicates.push( key );
    //                 }
    //             }
    //         });

    //         if( duplicates.length < 3 )
    //         {
    //             for( var nCont = 0, len = duplicates.length;
    //                  nCont < len;
    //                  nCont++ )
    //             {
    //                 $scope.$lStorage.combined[ tabActive ].bets[ duplicates[nCont] ].duplicate = 0;
    //             }
    //         }


    //         return duplicate;
    //     };

    //     $scope.getMsg = function( focus_bet, duplicate, expiration, feed, str_event )
    //     {
    //         if( expiration )
    //         {
    //             return $translate.instant('controller.msg-betslip.msg1');
    //         }
    //         else if( focus_bet )
    //         {
    //             return $translate.instant('controller.msg-betslip.msg2') + feed;
    //         }
    //         else
    //         {
    //             return $translate.instant('controller.msg-betslip.msg3') + str_event;
    //         }
    //     };

    //     $scope.delSimple = function( id )
    //     {
    //         $timeout(function()
    //         {
    //             /* Eliminamos de la directiva */
    //             $rootScope.$broadcast('del-active-betslip', $scope.$lStorage.simple[ id ].id_element );

    //             /* Buscamos en las apuestas de combinadas */
    //             angular.forEach( $scope.$lStorage.combined, function(value, key) 
    //             {
    //                 angular.forEach( value.bets, function(bet, betKey)
    //                 {
    //                     /* Si encontramos la apuesta */
    //                     if( bet.id_element == $scope.$lStorage.simple[ id ].id_element )
    //                     {
    //                         /* Comprobamos eventos duplicados de un mismo evento */
    //                         $scope.duplicate( $scope.$lStorage.combined[ key ].bets[betKey].id_event, key, 'delete' );

    //                         $scope.delBetSlip( $scope.$lStorage.combined[ key ].bets[betKey].bet, key );

    //                         /* Eliminamos la apuesta de la combinada */
    //                         $scope.$lStorage.combined[ key ].bets.splice( betKey, 1);                        
    //                     }
    //                 });
    //             });

    //             /* Eliminamos del array simple */
    //             $scope.$lStorage.simple.splice(id, 1);

    //             if( $scope.$lStorage.simple.length == 0 )
    //                 $scope.resetData();

    //             $scope.$lStorage.$save();
    //         },400);
    //     };

    //     $scope.delSimpleCombined = function( id, tabActive )
    //     {
    //         var fSearch = false;

    //         /* Buscamos en las apuestas de combinadas */
    //         angular.forEach( $scope.$lStorage.combined, function(value, key) 
    //         {
    //             angular.forEach( value.bets, function(bet, betKey)
    //             {
    //                 /* Si encontramos la apuesta */
    //                 if( bet.id_element == $scope.$lStorage.combined[ tabActive ].bets[id].id_element && key != tabActive )
    //                     fSearch = true;             
    //             });
    //         });

    //         /* Si no encontramos la apuesta en otra vista borramos de la simple */
    //         if( !fSearch )
    //         {
    //             angular.forEach( $scope.$lStorage.simple, function(value, key) 
    //             {
    //                 /* Si encontramos la apuesta */
    //                 if( value.id_element == $scope.$lStorage.combined[ tabActive ].bets[id].id_element )
    //                 {
    //                     /* Eliminamos de la directiva */
    //                     $rootScope.$broadcast('del-active-betslip', $scope.$lStorage.simple[ key ].id_element );

    //                     /* Eliminamos la apuesta de la simple */
    //                     $scope.$lStorage.simple.splice(key, 1);
    //                 }
    //             });
    //         }
    //     };

    //     $scope.delCombined = function( id, tabActive )
    //     {
    //         $timeout(function()
    //         {
    //             /* Comprobamos eventos duplicados de un mismo evento */
    //             $scope.duplicate( $scope.$lStorage.combined[ tabActive ].bets[id].id_event, tabActive, 'delete' );

    //             $scope.delSimpleCombined( id, tabActive );
                
    //             if( $scope.$lStorage.simple.length == 0 )
    //                 $scope.resetData();
    //             else
    //             {
    //                 $scope.delBetSlip( $scope.$lStorage.combined[ tabActive ].bets[id].bet, tabActive );
    //                 $scope.$lStorage.combined[ tabActive ].bets.splice(id, 1);

    //                 if( $scope.$lStorage.combined[ tabActive ].bets.length == 0 )
    //                     $scope.$lStorage.combined[ tabActive ] = {"bets": -1, "betSlip": [], "totalCombined": {} };
    //             }

    //             $localStorage.$save();
    //         },400);
    //     };

    //     $scope.delTab = function( id )
    //     {
    //         angular.forEach( $scope.$lStorage.combined[ id ].bets, function(bet, bKey)
    //         {
    //             $scope.delSimpleCombined( bKey, id);
    //         });

    //         $scope.$lStorage.combined[ id ] = {"bets": -1, "betSlip": [], "totalCombined": {} };

    //         $scope.$lStorage.$save();
    //     };

    //     $scope.copyTab = function( active, id )
    //     {
    //         if( angular.isArray( $scope.$lStorage.combined[ id ].bets ) )
    //         {
    //             $scope.$lStorage.combined[ active ] = angular.copy( $scope.$lStorage.combined[ id ] );

    //             $scope.$lStorage.$save();

    //         }
    //     };
       
    //     $scope.changeSimple = function( idBet, id )
    //     {
    //         $scope.$lStorage.simple[ idBet ].simple_bet = $scope.$lStorage.simple[ idBet ].bet[ id ];
    //         $scope.$lStorage.$save();
    //     };

    //     $scope.totalCombined = function( odd, feed, tabActive )
    //     {
    //         var total = 0,
    //             exit = false;

    //         if( angular.isUndefined( tabActive) )
    //             tabActive = $scope.$lStorage.tabActive;

    //         if( angular.isUndefined( feed ) && angular.isUndefined( odd ) )
    //         {
    //             angular.forEach( $scope.$lStorage.combined[ tabActive ].betSlip, function(value, key) 
    //             {
    //                 if( value.n_odd > total )
    //                 {
    //                     total = value.n_odd;
    //                     $scope.$lStorage.combined[ tabActive ].totalCombined = {
    //                         "value": value.n_odd,
    //                         "feed": value.id_feed
    //                     };
    //                 }
    //             });
    //         }
    //         else
    //         {
    //             $scope.$lStorage.combined[ tabActive ].totalCombined = {
    //                 "value": odd,
    //                 "feed": feed
    //             };
    //         }

    //         /* Modificamos el foco */
    //         angular.forEach( $scope.$lStorage.combined[ tabActive ].bets, function(value, key) 
    //         {
    //             for( var nCont = 0, len = value.bet.length;
    //                  nCont < len && !exit; nCont++ )
    //             {
    //                 if( value.bet[nCont].id_feed == $scope.$lStorage.combined[ tabActive ].totalCombined.feed )
    //                 {
    //                     value.focus_bet.id_feed = value.bet[nCont].id_feed;
    //                     value.focus_bet.n_odd   = value.bet[nCont].n_odd;
    //                     value.focus_bet.id_bet  = value.bet[nCont].id_bet;
    //                     value.focus_bet.is      = 1;
    //                     exit = true;
    //                 }
    //             }

    //             /* No existe la apuesta para la casa seleccionada */
    //             if( !exit ) value.focus_bet.is = 0;

    //             /* Volvemos a iniciar la salida */
    //             exit = false;
    //         });

    //         $scope.$lStorage.$save();
    //     };

    //     $scope.addBetSlip = function( bets )
    //     {
    //         var obj = {},           // Obj para insertar en nuestro boleto
    //             fSearch = false;    // Comprobar si ya tenemos ese feed

    //         angular.forEach(bets, function(bet, bKey) 
    //         {
    //             angular.forEach( $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].betSlip, function( value, key )
    //             {
    //                 if( bet.id_feed == value.id_feed )
    //                 {
    //                     value.n_odd = value.n_odd * bet.n_odd;
    //                     fSearch = true;
    //                 }
    //             });

    //             /* Si no lo encontramos lo insertamos */
    //             if( !fSearch )
    //                 $scope.$lStorage.combined[ $scope.$lStorage.tabActive ].betSlip.push({
    //                     "id_feed": bet.id_feed,
    //                     "n_odd": bet.n_odd
    //                 });

    //             fSearch = false;
    //         });

    //         $scope.totalCombined();
    //     };

    //     $scope.delBetSlip = function( bets, tabActive )
    //     {
    //         angular.forEach(bets, function(bet, bKey) 
    //         {
    //             angular.forEach( $scope.$lStorage.combined[ tabActive ].betSlip, function( value, key )
    //             {
    //                 if( bet.id_feed == value.id_feed )
    //                 {
    //                     value.n_odd = value.n_odd / bet.n_odd;

    //                     if( value.n_odd <= 1 )
    //                         $scope.$lStorage.combined[ tabActive ].betSlip.splice(key, 1);
    //                 }
    //             });
    //         });

    //         $scope.totalCombined( undefined, undefined, tabActive );
    //     };

    //     $scope.locationTo = function( str_league, str_event, id_event, id_sport )
    //     {
    //         str_league = str_league.replace(/\//g,"-");
    //         str_league = str_league.replace(/ /g,"-");
    //         str_event = str_event.replace(/\//g,"-");
    //         str_event = str_event.replace(/ /g,"-");

    //         window.location = "./#!apuestas/" + angular.lowercase(str_league) + "/" + angular.lowercase(str_event) + "/" + id_event + "/" + id_sport + "/"
    //     };

    //     $scope.submit = function( type )
    //     {
    //         var url = "",
    //             host = $location.$$absUrl.split("#");

    //         if( type == 'simple')
    //         {
    //             url = "./#!redirect/" +
    //                   this.simple.simple_bet.id_feed + "/" +
    //                   this.simple.id_league + "/" +
    //                   this.simple.id_event + "/" +
    //                   this.simple.simple_bet.id_bet + "/" +
    //                   "0/";
    //         }
    //         else if( type == 'combined' )
    //         {
    //             var bets = [];

    //             for( var nCont = 0, len = this.bagCombined.bets.length;
    //                  nCont < len;
    //                  nCont++ )
    //             {
    //                 if( this.bagCombined.bets[nCont].focus_bet.is )
    //                     bets.push( this.bagCombined.bets[nCont].focus_bet.id_bet );
    //             }

    //             url = "./#!redirect/" +
    //                   this.bagCombined.totalCombined.feed + "/" +
    //                   this.bagCombined.bets[0].id_league + "/" +
    //                   this.bagCombined.bets[0].id_event + "/" +
    //                   bets.join() + "/" +
    //                   "0/";
    //         }

    //         $window.open( host[0]+url, '_blank' );
    //     };
    // })

    // .controller("redirect", function( $scope, $http, $route, $interpolate, $sessionStorage, $filter, eventTrack, dataFactory )
    // {
    //     var id_feed   = $route.current.params.id_feed,
    //         id_league = $route.current.params.id_league,
    //         id_event  = $route.current.params.id_event,
    //         id_bet    = $route.current.params.id_bet,
    //         id_bid    = $route.current.params.id_bid,
    //         url       = null,
    //         getDataEvent = {
    //                 method: 'POST',
    //                 url: 'php/redirect.php', 
    //                 headers: {
    //                     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //                 },
    //                 data: 'id_feed=' + id_feed + '&id_league=' + id_league + "&id_event=" + id_event
    //             },
    //         getBetSlip = {
    //                 method: 'POST',
    //                 url: 'php/betSlip.php',
    //                 headers: {
    //                     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //                 },
    //                 data: 'id_feed=' + id_feed + "&id_bet=" + id_bet + "&id_event=" + id_event + "&id_bid=" + id_bid + "&id_user=" + $sessionStorage.iduser
    //         }

    //     /* Traqueamos el evento */
    //     eventTrack.new({
    //         name: "redirect",
    //         category: "prematch",
    //         label: id_feed+"-"+id_league+"-"+id_event+"-"+id_bet+"-"+id_bid
    //     });

    //     /* Carga de datos de feeds */
    //     dataFactory.getDataFeed().then( function(response)
    //     {
    //         var dataFeed = response.data;
    //         $scope.img_feed = dataFeed[ id_feed ].str_image;

    //         if( dataFeed[ id_feed ].str_link_bag != "" )
    //         {
    //             url = dataFeed[ id_feed ].str_link_bag;

    //             /* Recuperamos datos del evento */
    //             $http(getBetSlip).
    //             success(function(dataBet, status, headers, config) 
    //             {
    //                 $scope.id_event = $filter('trim')(id_event);
    //                 $scope.id_bet = $filter('trim')(dataBet.id_bet);
    //                 $scope.id_market = $filter('trim')(dataBet.id_market);
    //                 $scope.str_bid = $filter('trim')(dataBet.str_bid) || $filter('trim')(dataFeed[ id_feed ].str_bid);

    //                 switch( parseInt(id_feed) ) 
    //                 {
    //                     /* INTERWETTEN */
    //                     case 5:
    //                         /* Recuperamos datos del evento */
    //                         $http(getDataEvent).
    //                         success(function(dataEvent, status, headers, config) 
    //                         {
    //                              /* Control para eventos caducados */
    //                             if( dataEvent.length == 0)
    //                             {
    //                                 dataEvent[0] = {
    //                                     "id_league": 0,
    //                                     "id_event": 0,
    //                                     "link_event": ''
    //                                 };

    //                             }

    //                             $scope.id_feed = id_feed;
    //                             $scope.id_league = dataEvent[0]['id_league'];
    //                             $scope.id_event = dataEvent[0]['id_event'];
    //                             /* Componemos la url */
    //                             url = $interpolate(url)($scope); 
    //                             document.location.href = url;
    //                         });
    //                     break;
    //                     default:
    //                         /* Componemos la url */
    //                         url = $interpolate(url)($scope);
    //                         document.location.href = url;
    //                     break

    //                 }
    //             });
    //         }
    //         else if( dataFeed[ id_feed ].str_link_event != "" )
    //         {
    //             url = dataFeed[ id_feed ].str_link_event;

    //             /* Recuperamos datos del evento */
    //             $http(getDataEvent).
    //             success(function(dataEvent, status, headers, config) 
    //             {
    //                 /* Control para eventos caducados */
    //                 if( dataEvent.length == 0)
    //                 {
    //                     dataEvent[0] = {
    //                         "id_league": 0,
    //                         "id_event": 0,
    //                         "link_event": ''
    //                     };

    //                 }

    //                 $scope.id_feed = id_feed;
    //                 $scope.id_league = dataEvent[0]['id_league'];
    //                 $scope.id_event = dataEvent[0]['id_event'];
    //                 switch( parseInt(id_feed) ) 
    //                 {
    //                     /* William Hill */
    //                     case 3:
    //                         if( dataEvent[0]['link_event'] != "" )
    //                         {
    //                             // http://sports.williamhill.com/bet/en-gb/betting/e/8153439/Lee%2dSelby%2dv%2dFernando%2dMontiel
    //                             var strFrag = dataEvent[0]['link_event'].split(/\/e\//),
    //                                 strLink = strFrag[1].split('/');

    //                             $scope.id_event = strLink[0];
    //                         }
    //                     break;
    //                 }
    //                 /* Componemos la url */
    //                 url = $interpolate(url)($scope); 
    //                 document.location.href = url;
    //             });
    //         }
    //         else
    //         {
    //             //url = dataFeed[ id_feed ].str_link;
    //             url = dataFeed[ id_feed ].str_link_bonus;
    //             document.location.href = url;
    //         }
    //     });
    // })

    // .controller("changeType", function( $scope, $localStorage, $filter, $translate, $route )
    // {
    //    // var filter = $filter('oddsConverter');

    //     $scope.updateOdd = function( type )
    //     {

    //         $localStorage.oddsType = type;
    //         $localStorage.$save();
    //         //$scope.$digest();
    //         // $scope.model = $filter('oddsConverter')($scope.model);
    //         // $scope.$apply();
    //         //filter();
    //         //$route.reload();

    //     };
    //     $scope.optionOdd = function( type )
    //     {
    //         if( type == $localStorage.oddsType )
    //             return true;
    //     };

    //     $scope.updateLocale = function( type )
    //     {
    //         // $scope.$apply =
    //         $localStorage.language = type;
    //         $localStorage.locale = type;
    //         $localStorage.$save();

    //         $translate.use( $localStorage.language );
    //     };

    //     $scope.optionLocale = function( type )
    //     {
    //         if( type == $localStorage.language )
    //             return true;
    //     };

    //     $scope.changeTimeOffset = function( offset )
    //     {
    //         $localStorage.timeZoneOffset = offset;
    //         $localStorage.$save();
    //     };
    //     $scope.timeZoneOffset = function( offset )
    //     {
    //         if( offset == $localStorage.timeZoneOffset )
    //             return true;
    //     }
    // })

    // .controller("bonusController", function( $scope, $http, $location)
    // {

    //     var confBono = {
    //             method: 'GET',
    //             url: 'json/dataBono.json', 
    //             params: {'_':new Date().getTime()}, 
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         };

    //     $http(confBono).
    //     success(function(data, status, headers, config) 
    //     {
    //         for ( var index = 0; index < data.length; index ++)
    //         {
    //             if(data[index].id_bono == id_bono)
    //             {
    //                 $scope.bonus = data[index];
    //                 $scope.id_feed = $scope.bonus.id_feed;
    //                 break;
                    
    //                 document.querySelector('title').innerHTML  = $scope.bonus.str_title_web ;

    //                 var description = document.querySelector("meta[name=description]");
    //                 description.setAttribute('content', $scope.bonus.str_description );

    //                 if($scope.bonus.str_keywords)
    //                 {
    //                         var keywords = document.querySelector("meta[name=keywords]");
    //                         keywords.setAttribute('content', "apuestas deportivas, bonos bienvenida, regalos, casas apuestas, promociones, apuestas en directo, ofertas, juego online, " + 
    //                         $scope.bonus.str_feed.toLowerCase() + ", " + $scope.bonus.str_keywords);
    //                 }
    //             }
    //         }
    //     }).
    //     error(function(data, status, headers, config) 
    //     {
                        
    //     });
    // })

    // .controller('dataBanner', function( $scope, $http, dataFactory )
    // {
    //     dataFactory.getDataBanner().then( function(response)
    //     {
    //         $scope.data = response.data;
    //     });
    // })
    
    // .controller("besgamSearchList", function( $rootScope, $scope, $http, $route, $translate, dataFactory )
    // {
    //     var now = new Date(),
    //         target = '',
    //         sportGo = '',
    //         leagueGo = '';

    //     $scope.$on( 'LOAD', function(){ $scope.loading = true } );
    //     $scope.$on( 'UNLOAD', function(){ $scope.loading = false } );

    //     $scope.$emit('LOAD');

    //     $scope.rangeOdd = [
    //         { odd: 1.1 },
    //         { odd: 1.2 },
    //         { odd: 1.4 },
    //         { odd: 1.6 },
    //         { odd: 1.8 },
    //         { odd: 2.0 },
    //         { odd: 2.2 },
    //         { odd: 2.5 },
    //         { odd: 3.0 },
    //         { odd: 3.5 },
    //         { odd: 4.0 },
    //         { odd: 4.5 },
    //         { odd: 5.0 },
    //         { odd: 6.0 },
    //         { odd: 7.0 },
    //         { odd: 8.0 },
    //         { odd: 9.0 },
    //         { odd: 10.0 },
    //         { odd: 15.0 },
    //         { odd: 20.0 },
    //         { odd: 100}
    //     ];

    //     $scope.item = [{
    //         name  : 'RangeOddLow',
    //         value : 0
    //     },
    //     {
    //         name  : 'rangeOddHigh',
    //         value : 20
    //     }];

    //     dataFactory.getDataJson().then( function(response)
    //     {
    //         $translate('controller.search.param1').then(function (translation) 
    //         {
    //             target = ($route.current.params.target == translation || angular.isUndefined($route.current.params.target)) ? '' : $route.current.params.target;

    //             $translate('controller.search.param2').then(function (translation) 
    //             {
    //                 sportGo = ($route.current.params.sport == translation || angular.isUndefined($route.current.params.sport)) ? '' : $route.current.params.sport;

    //                 $translate('controller.search.param3').then(function (translation) 
    //                 {
    //                     leagueGo = ($route.current.params.league == translation || angular.isUndefined($route.current.params.league)) ? '' : $route.current.params.league;

    //                     /* Instanciamos */
    //                     $scope.search = {"league":leagueGo,"sport":sportGo,"tags":target};
    //                     $scope.data = response.data;
    //                     $scope.aux = $scope.$eval("filtered = (data | filter:search:strict)");
    //                     $scope.selectedInput = {};
    //                     $scope.totalData = ($scope.aux.length-10);
    //                     $scope.currentPage = 1;
    //                     $scope.numPerPage = 10;
    //                     $scope.maxSize = 5;

    //                     $scope.setPage = function (pageNo) 
    //                     {
    //                         window.scrollTo(0,0);
    //                         $scope.currentPage = pageNo;
    //                     };
    //                     $scope.setPage($scope.currentPage);

    //                     /* Ordenación */
    //                     var orderObj = ['orderTime','event'];
    //                     $scope.setOrdered = function( obj )
    //                     {
    //                         orderObj = obj;
    //                     };
    //                     $scope.ordered = function()
    //                     {
    //                         return orderObj;
    //                     };
    //                     $scope.chageOrder = function()
    //                     {
    //                         if( $scope.selectedInput.date == '1' )
    //                             $scope.setOrdered(['-orderTime','event']);
    //                         else
    //                             $scope.setOrdered(['orderTime','event']);
    //                     };
    //                     /* Deportes */
    //                     $scope.prematchSports = $scope.aux.reduce(function(sum, place) 
    //                     {
    //                         if(sum.indexOf( place.sportID ) < 0) sum.push( place.sportID );

    //                         return sum;
    //                     }, []);

    //                     /* Lista de ligas */
    //                     listPrematchLeagues();

    //                     $scope.$emit('UNLOAD');
    //                 });
                    
    //             });
    //         });
    //     });

    //     var listPrematchDataFilter = function( data )
    //     {
    //         var dataFilter = [];

    //         if( $scope.selectedInput.league != "" )
    //         {
    //             angular.forEach(data, function(value, key) 
    //             {
    //                 if( value.league == $scope.selectedInput.league )
    //                     if( $scope.selectedInput.promo && value.promo ) dataFilter.push(value);
    //                     else if( !$scope.selectedInput.promo ) dataFilter.push(value);
    //             });
    //         }
    //         else if( $scope.selectedInput.sport != "" )
    //         {
    //             angular.forEach(data, function(value, key) 
    //             {
    //                 if( value.sportID == $scope.selectedInput.sport )
    //                     if( $scope.selectedInput.promo && value.promo ) dataFilter.push(value);
    //                     else if( !$scope.selectedInput.promo ) dataFilter.push(value);
    //             });
    //         }
    //         else
    //         {
    //             angular.forEach(data, function(value, key) 
    //             {
    //                 if( $scope.selectedInput.promo && value.promo ) dataFilter.push(value);
    //                 else if( !$scope.selectedInput.promo ) dataFilter.push(value);
    //             });
    //         }

    //         return changeRange(dataFilter);
    //     };

    //     var listPrematchLeagues = function()
    //     {
    //         $scope.prematchLeagues = $scope.aux.reduce(function(sum, place) 
    //         {
    //             if( place.league != null )
    //             {
    //                 if( $scope.selectedInput.sport && $scope.selectedInput.sport != "" )
    //                 {
    //                     if (sum.indexOf( place.league ) < 0 && $scope.selectedInput.sport == place.sportID )
    //                     {
    //                         if( $scope.selectedInput.promo && place.promo ) sum.push( place.league ); 
    //                         else if( !$scope.selectedInput.promo ) sum.push( place.league ); 
    //                     }
    //                 }
    //                 else
    //                 {
    //                     if (sum.indexOf( place.league ) < 0) 
    //                         if( $scope.selectedInput.promo && place.promo ) sum.push( place.league ); 
    //                         else if( !$scope.selectedInput.promo ) sum.push( place.league ); 
    //                 }
    //             }
    //             return sum;
    //         }, []);
    //     };

    //     var changeRange = function( data )
    //     {
    //         var dataFilter = [];

    //         angular.forEach( data, function(value, key)
    //         {
    //             var fInsert = false;

    //             if( value.markets )
    //             {
    //                 angular.forEach( value.markets.str_bet, function( bet, keyBet)
    //                 {
    //                     if( bet[0].n_odd <= parseFloat($scope.rangeOdd[$scope.item[1].value].odd) && bet[0].n_odd >= parseFloat($scope.rangeOdd[$scope.item[0].value].odd) ) fInsert = true;
    //                 });
    //             }
    //             else
    //               fInsert = true  

    //             if( fInsert ) dataFilter.push( value );
    //         });

    //         return dataFilter;
    //     };

    //     $scope.changeListPrematch = function()
    //     {  
    //         /* Lista de ligas */
    //         listPrematchLeagues();

    //         $scope.filtered = listPrematchDataFilter($scope.aux );
    //     };
    //     $scope.reset = function()
    //     {
    //         $scope.selectedInput = {
    //             sport: "",
    //             league: "",
    //             date: "",
    //             promo: false
    //         };

    //         $scope.changeListPrematch();
    //     };
    // })

    // .controller("surebet", function( $scope, $http, $location ,$localStorage, $filter, dataFactory )
    // {
    //     $scope.surebets = [];
    //     $scope.imgLoad = 0;
    //     $scope.$on( 'LOAD', function(){ $scope.loading = true } );
    //     $scope.$on( 'UNLOAD', function(){ $scope.loading = false } );


    //     $scope.$emit('LOAD');
    //     /* Cargamos los datos de las feed */
    //     dataFactory.getDataFeed().then( function(response)
    //     {    
    //         $scope.feed = response.data;
    //         /* Cargamos los datos de las feed */
    //         dataFactory.getDataFeed().then( function(response)
    //         {    
    //             $scope.feed = response.data;
    //             dataFactory.getDataJson().then( function(response)
    //             {
    //                 var data  = response.data,
    //                     aData = [];

    //                 for( var nCont = 0, len = data.length;
    //                      nCont < len;
    //                      nCont++ )
    //                 {
    //                     if( data[nCont].markets )
    //                     {
    //                         var uno   = 0,
    //                             pro   = 0,
    //                             cuota = 0;

    //                         for(var index in data[nCont].markets.str_bet) 
    //                         { 
    //                             uno += 1/data[nCont].markets.str_bet[index][0].n_odd;
    //                             prob = 1/data[nCont].markets.str_bet[index][0].n_odd;
    //                             cuota = data[nCont].markets.str_bet[index][0].n_odd;
    //                         }

    //                         if( uno < 1 )
    //                         {
    //                             var str_bet = {},
    //                                 auxBet = {},
    //                                 keys = [],
    //                                 name = null;

    //                             for(var index in data[nCont].markets.str_bet) 
    //                             { 
    //                                 name    = (index == "1") ? "011" : (index == "X") ? "02X" : "032";

    //                                 prob    = 1/data[nCont].markets.str_bet[index][0].n_odd;
    //                                 resProb = (prob*100)/uno;

    //                                 data[nCont].markets.str_bet[index][0]["prob"] = $filter("setDecimal")( resProb, 2 );

    //                                 str_bet[ name ] = data[nCont].markets.str_bet[index];
    //                                 keys.push( name );
    //                             }

    //                             keys.sort();

    //                             for( var nSubContKeys = 0, lenKeys = keys.length;
    //                                  nSubContKeys < lenKeys;
    //                                  nSubContKeys++ )
    //                             {
    //                                 auxBet[ keys[nSubContKeys] ] = str_bet[ keys[nSubContKeys] ];
    //                             }

    //                              var prob = (prob*100)/uno,
    //                                 profit = (prob*cuota)-100;

    //                             aData.push({
    //                                 "n_id_sport": data[nCont].sportID,
    //                                 "str_sport": data[nCont].sport,
    //                                 "id_league": data[nCont].leagueID,
    //                                 "str_league": data[nCont].league,
    //                                 "n_id_event": data[nCont].id,
    //                                 "str_name_event": data[nCont].event,
    //                                 "str_time_event": data[nCont].orderTime,
    //                                 "profit": $filter("setDecimal")(profit, 2),
    //                                 "str_market_name": data[nCont].markets.str_market,
    //                                 "str_market_short": data[nCont].markets.str_market_short,
    //                                 "n_result_market": data[nCont].markets.str_bet.length,
    //                                 "a_markets": {
    //                                     "id_market": data[nCont].markets.id_market,
    //                                     "str_market": data[nCont].markets.str_market,
    //                                     "str_market_short": data[nCont].markets.str_market_short,
    //                                     "str_description": data[nCont].markets.str_description,
    //                                     "id_market_group": data[nCont].markets.id_market_group,
    //                                     "n_order": data[nCont].markets.n_order,
    //                                     "char_order": data[nCont].markets.char_order,
    //                                     "str_bet": auxBet
    //                                 }
    //                             });
    //                         }
    //                     }
    //                 }

    //                 $scope.imgLoad = (aData.length == 0) ? 1 : 0;

    //                 $scope.surebets = aData;
    //                 $scope.totalData = (aData.length-5);

    //                 $scope.currentPage = 1;
    //                 $scope.numPerPage = 6;
    //                 $scope.maxSize = 5;

    //                 $scope.setPage = function (pageNo) 
    //                 {
    //                     window.scrollTo(0,0);
    //                     //console.log('setpage:' + pageNo);
    //                     $scope.currentPage = pageNo;
    //                 };
                
    //                 $scope.setPage($scope.currentPage);

    //                 $scope.$emit('UNLOAD');
    //             });
    //         });
    //     });

    //     /* Quita caracteres de una cadena */
    //     $scope.cutChar = function( str, nChar )
    //     {
    //         return str.substr( nChar );

    //     }

    //     $scope.getIdName = function( id_event, id_market, str_bet )
    //     {
    //         return id_event+"|"+id_market+"|"+str_bet;
    //     };
    // })

    // .controller("promotions", function( $scope, $http, $route, $translate, dataFactory )
    // {
    //     var id_event = $route.current.params.record;
    //     $scope.data = [];
    //     $translate('controller.text-result').then(function (translation) // "Cargando datos...";
    //     {
    //         $scope.textInfo = translation;
    //     });

    //     /* Datos de las promociones */
    //     var confPromo = {
    //             method: 'GET',
    //             url: 'json/dataPromo.json',
    //             params: {'_':new Date().getTime()}, 
    //             headers: {
    //                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         };

    //     /* Cargamos los datos de las feed */
    //     dataFactory.getDataFeed().then( function(response)
    //     {    
    //         $scope.feed = response.data;

    //         $http(confPromo).
    //         success(function(data, status, headers, config) 
    //         {
    //            /* Los datos son diferentes si se llega desde el menu o desde el buscador/ficha */
    //            /* Se llega desde el buscador o desde la ficha */
    //             if(typeof(id_event) != "undefined")
    //             {
    //                 var data_event = new Array();
    //                 angular.forEach(data, function(value, key) {
    //                     if(value.id_event==id_event)
    //                     {
    //                         value.is_important = 1;
    //                         data_event.push(value);
    //                     }
    //                 });
    //                 $scope.data = data_event;     
    //             }    
    //             else
    //                 $scope.data = data;


    //              Expirar las promociones desde el cliente 
    //             var today = new Date();

    //             angular.forEach($scope.data, function(value, key) {
    //                 if(new Date(value.date_end) < today)
    //                 {
    //                         value.is_expired = 1;
    //                 } 
    //             });


    //             $scope.currentPage = 1;
    //             $scope.numPerPage = 10;
    //             $scope.maxSize = 5;

    //             $scope.setPage = function (pageNo) 
    //             {
    //                 window.scrollTo(0,0);
    //                 //console.log('setpage:' + pageNo);
    //                 $scope.currentPage = pageNo;
    //             };
                
    //             $scope.setPage($scope.currentPage);
    //             $translate('promotions.noPromo').then(function (translation) //"Actualmente no tenemos promociones disponibles";
    //             {
    //                 $scope.textInfo = translation;
    //             });
    //         }).
    //         error(function(data, status, headers, config) 
    //         {
                                                
    //         });
     
    //     });

    //     $scope.changeClassGround = function(is_important,is_registered, is_expired)
    //     {
    //         if(is_important==1)
    //             return 'promo-dest';
    //         else
    //             if(is_registered=='1' && is_expired==0)
    //                 return 'user-promo-favorite';
    //             else
    //                 return 'promo';

    //     }

    //     $scope.changeClassPromo = function(is_important)
    //     {
    //         if(is_important==1)
    //             return 'imagen-casa';
    //         else if(is_important==0)
    //             return 'imagen-casa-promo';

    //     }
    // })
  
    // .controller("bonosController", function( $scope, $http, $location, dataFactory )
    // {
        
    //     $scope.data = [];
        
    //     /* Datos de los bonos */
    //     var confBono = {
    //             method: 'GET',
    //             url: 'json/dataBono.json',
    //             params: {'_':new Date().getTime()}, 
    //             headers: {
    //                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         };

    //     /* Se hace la llamada para obtener la info */
    //     dataFactory.getDataFeed().then( function(response)
    //     {
    //         $scope.feed = response.data;

    //         $http(confBono).
    //         success(function(data, status, headers, config) 
    //         {
               
    //             $scope.besgamSize = 10;
    //             $scope.data = data;

    //             $scope.currentPage = 1;

    //             /*if($scope.besgamSize >= $scope.data.length)
    //                 $scope.numPerPage = $scope.data.length - 1;
    //             else*/
    //                 $scope.numPerPage = $scope.besgamSize;


    //             $scope.maxSize = 5;

    //             $scope.setPage = function (pageNo) 
    //             {
    //                 window.scrollTo(0,0);
    //                 //console.log('setpage:' + pageNo);
    //                 $scope.currentPage = pageNo;
    //             };
                
    //             $scope.setPage($scope.currentPage);

    //         }).
    //         error(function(data, status, headers, config) 
    //         {
                                                
    //         });
     
    //     });    
    // })

    // .controller("bonusControllerFeed", function( $scope, $http, $sce, $sessionStorage, $route, dataFactory)
    // {
    //     $scope.bonus = {};

    //     dataFactory.getDataBonos().then(function(response)
    //     {
    //         for ( var index = 0; index < response.data.length; index ++)
    //         {
    //             if(response.data[index].id_bono == $route.current.params.record )
    //             {
    //                 return $scope.bonus = response.data[index];   
    //             }
    //         }
    //     });      
    // })

    // .controller('ratingCtrl', function( $scope, $http, $sce, $sessionStorage, $location, $translate )
    // {
    //     var params = $location.search();
    //     var id_feed = params['feed'];

    //     /* Ponemos el ratin a solo letura y comprobamos el usuario */
    //     $scope.isReadonly = true;
    //     $scope.tooltipText = $sce.trustAsHtml('Inicia sesión<br>para poder votar');

    //     /* Recogemos los varlos de inicio */
    //     var loadDataFeed = {
    //         method: 'POST',
    //         url: 'php/loadDataRating.php',
    //         headers: {
    //            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //         },
    //         data: 'id_feed=' + id_feed
    //     };

    //     $http(loadDataFeed).
    //     success(function(data, status, headers, config) 
    //     {
    //         $scope.rate = data.rate;
    //     });

    //     $scope.max = 5;
    //     $scope.id_feed = id_feed;

    //     /* Si es un usuario registrado, le permitimos votar */
    //     if( $sessionStorage.sessionid ) 
    //     {
    //         $scope.isReadonly = false;
    //         $translate('bonus.score').then(function (translation) // 'Haz click para puntuar'
    //         {
    //             $scope.tooltipText = $sce.trustAsHtml( translation );
    //         });
    //     }

    //     $scope.ratingClick = function( value )
    //     {
    //         /* Si es un usuario registrado, le permitimos votar */
    //         if( $sessionStorage.sessionid ) 
    //         {
    //             var setDataFeed = {  
    //                 method: 'POST',
    //                 url: 'php/setDataRating.php',
    //                 headers: {
    //                      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //                 },
    //                 data: 'n_rate=' + value + '&id_feed=' + $scope.id_feed
    //             };

    //             $http(setDataFeed).
    //               success(function(data, status, headers, config) 
    //               {
    //                   $scope.rate = data.rate;
    //               });

    //             $translate('bonus.vote').then(function (translation) //'Voto emitido<br>Sólo puedes votar una vez cada casa.');
    //             {
    //                 $scope.tooltipText = $sce.trustAsHtml( translation );
    //             });
    //         }

    //     };

    //     $scope.hoveringOver = function(value) 
    //     {
    //         $scope.overStar = value;
    //         $scope.percent = 100 * (value / $scope.max);
    //     };

    //     $scope.ratingStates = [
    //         {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    //         {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    //         {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    //         {stateOn: 'glyphicon-heart'},
    //         {stateOff: 'glyphicon-off'}
    //     ];
    // })

    // .controller("metaController", function( $scope, DataOne )
    // {
    //     $scope.bonus = {};

    //     // DataOne.one_bonus().then(function(response)
    //     // {
    //     //     $scope.bonus = response;
            
    //     //     /* Añadimos el title, la descripcion y los keywords */
    //     //     document.querySelector('title').innerHTML  = $scope.bonus.str_title_web ;

    //     //     var description = document.querySelector("meta[name=description]");
    //     //     description.setAttribute('content', $scope.bonus.str_description );

    //     //     if($scope.bonus.str_keywords)
    //     //     {
    //     //         var keywords = document.querySelector("meta[name=keywords]");
    //     //         keywords.setAttribute('content', "apuestas deportivas, bonos bienvenida, regalos, casas apuestas, promociones, apuestas en directo, ofertas, juego online, " + 
    //     //         $scope.bonus.str_feed.toLowerCase() + ", " + $scope.bonus.str_keywords);
    //     //     }
        
    //     // });   
    // })

    // .controller("marketCard", function( $scope, $http, $location, $rootScope, $sessionStorage, dataFactory )
    // {
    //     $scope.$storage = $sessionStorage;

    //     $scope.$on( 'LOAD', function(){ $scope.loading = true } );
    //     $scope.$on( 'UNLOAD', function(){ $scope.loading = false } );

    //     $scope.$emit('LOAD');
        
    //     //$localStorage.$reset();
    //     var expreg   = new RegExp("^/apuestas/([^/]*)/([^/]*)/([^/]*)/([^/]*)/$"),
    //         excrt    = new RegExp("com/(.*?)/#!"),
    //         getCtr   = excrt.exec($location.$$absUrl),
    //         country  = getCtr == null ? 'com' : getCtr[1],
    //         param    = expreg.exec($location.url()),
    //         id       = param[3],
    //         sportID  = param[4], 
    //         confEvent = {
    //             method: 'GET',
    //             url: 'json/events/'+id+'.json', 
    //             params: {'_':new Date().getTime()}, 
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         },
    //         confUser = {
    //             method: 'POST',
    //             url: 'php/getFavorites.php', 
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             },
    //             data :'iduser ='+ $scope.$storage.iduser
    //         },
    //         confGetEvent = {
    //             method: 'POST',
    //             url: 'php/getEvent.php', 
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             },
    //             data: 'id=' + id + '&sportID=' + sportID + "&country=" + country + "&markets[]"
    //         };

    //     /* Variables globales */
    //     $scope.id = id;
    //     $scope.sportID = sportID;
    //     $rootScope = new Array();
    //     $scope.selected = 0;
    //     $scope.is_favorite = 0;             // si es el filtro de favoritos
    //     $scope.exist_favorite = 0;          // si existen cuotas en los mercados favoritos
    //     $scope.draw_filter = new Array();   // filtros con cuotas
    //     $scope.is_promo = 0;                // saber si el evento tiene o no promos


    //     /* Comprobar si el evento esta caducado */
    //     dataFactory.getDataJson().then( function( response )
    //     {
    //         var dataPortrait = response.data;
    //         var date_event_update = null;
    //         var exist_event = false;
    //         for(var i=0;i< dataPortrait.length; i++)
    //         {
    //             if(dataPortrait[i]['id'] == $scope.id)
    //             {
    //                 date_event_update = dataPortrait[i]['update']; 
    //                 exist_event = true;
    //                 $scope.is_promo = dataPortrait[i]['promo'];
    //                 break;
    //             }    
    //         }

    //         if(!exist_event)
    //             /* Evento caducado */
    //             document.location.href = "./#!/expired-event";
    //             //$location.path("expired-event");

    //         /* Carga de datos de feeds */
    //         dataFactory.getDataFeed().then( function(response)
    //         {
    //             $scope.feed = response.data;

    //             /* Carga de datos de filtros */
    //             dataFactory.getDataMarkets().then( function(response)
    //             {
    //                 $scope.filter = response.data.filters[$scope.sportID].filters;

    //                 $scope.filter.selected = 0;

    //                 /* Carga evento */
    //                 $http(confEvent).
    //                 success(function(dataOneEvent, statusEvent, headers, config) 
    //                 {
    //                     /* status 200 o 302 */
    //                     var date_event_file = headers()['last-modified'],
    //                         dateJS = new Date(date_event_file),
    //                         yearJS = dateJS.getUTCFullYear(),
    //                         monthJS = dateJS.getUTCMonth(),
    //                         dayJS = dateJS.getUTCDate(),
    //                         hourJS = dateJS.getUTCHours(),
    //                         minuteJS = dateJS.getUTCMinutes(),
    //                         secondJS = dateJS.getUTCSeconds();
    //                     /* Fecha UTC del json de la ficha */
    //                     var date_event_file = new Date( yearJS, monthJS,dayJS, hourJS, minuteJS, secondJS );

    //                     if(exist_event) date_event_update = new Date (date_event_update);

    //                     if(!exist_event || date_event_file < date_event_update)
    //                     {
    //                         /* Generar evento */
    //                         $http(confGetEvent).
    //                         success(function(dataTwoEvent, status, headers, config) 
    //                         {
    //                              $scope.getFavorites(dataTwoEvent);
    //                         }).
    //                         error(function(data, status, headers, config) 
    //                         {
                                            
    //                         });
    //                     }
    //                     else
    //                         $scope.getFavorites(dataOneEvent);

    //                     $scope.$emit('UNLOAD');
    //                 }).
    //                 error(function(data, status, headers, config) 
    //                 {
    //                     /* NO EXISTE JSON */
    //                     /* Generar evento */
    //                     $http(confGetEvent).
    //                     success(function(dataTwoEvent, status, headers, config) 
    //                     {
    //                         $scope.getFavorites(dataTwoEvent);

    //                         $scope.$emit('UNLOAD');
    //                     }).
    //                     error(function(data, status, headers, config) 
    //                     {
    //                         $scope.$emit('UNLOAD');  
    //                     });
    //                 });
                    
    //             });
    //         });
    //     });
      
    //     $scope.getFavorites = function(dataEvent)
    //     {
    //         /* Buscar los favoritos del usuario */
    //         /* Primero se buscan en el localStorage. Si no estan, entonces se va al servidor */
    //         if($sessionStorage == null)
    //         {
    //             $http(confUser).
    //                 success(function(dataUser, status, headers, config) 
    //                 {
    //                     /* Se guardan los datos de los favoritos y del usuario en el localStorage */
    //                     $sessionStorage.favorites = dataUser.list;
    //                     $sessionStorage.$save();
    //                     /* Se gestionan los favoritos de la ficha */
    //                     $scope.assignFavorites(dataEvent, dataUser.list);
    //                 }).
    //                 error(function(data, status, headers, config) 
    //                 {
                                                                
    //                 });
    //         }
    //         else
    //         {
    //             $scope.assignFavorites(dataEvent, $sessionStorage.favorites); 
    //         }
    //     };

    //     $scope.assignFavorites = function (dataEvent, dataFavorites)
    //     {
    //         /* Se guardan los datos del evento y del usuario para la ficha */
    //         $scope.data = dataEvent; 
    //         $scope.data.favorites = dataFavorites;

    //         /* Mercados favoritos global para acceder desde cualquier scope */
    //         $scope.fav_filter_show = dataFavorites;

    //         /* Index del mercado 'favoritos' */
    //         $scope.index_favorite = $scope.filter.length -1;

    //         /* Si hay favoritos, se activa su filtro */
    //         if($scope.data.favorites!= "" && $scope.data.favorites!= null)
    //         {
    //             $scope.filter.selected = $scope.index_favorite;
                
    //             $scope.filter_show = $scope.data.favorites;
    //             $scope.selected = $scope.index_favorite;
    //             $scope.is_favorite = 1;
    //             $scope.exist_favorite = 0;
    //             /* Comprobar si hay cuotas de los mercados favoritos */
    //             angular.forEach($scope.data.markets, function(value, key) 
    //             {
    //                 if($scope.data.favorites.indexOf(value.id_market) > -1)
    //                     $scope.exist_favorite = 1; 
    //             });     
    //         }
    //         else
    //         {
    //             /* Mercados del primer filtro */
    //             $scope.filter_show = $scope.filter[0].list;
    //             $scope.is_favorite = 0;
    //             $scope.selected = 0;
    //         }
    //         /* Se recorren los datos de los mercados para  pintar o no los filtros */
    //         angular.forEach($scope.filter, function(valueF, keyF) 
    //         {
    //             angular.forEach($scope.data.markets, function(valueM, keyM) 
    //             {
    //                 if(valueF.list.indexOf(valueM.id_market) > -1)
    //                     $scope.draw_filter.push(keyF);
    //             });
    //         });   

    //     };

    //     /* Filtros de mercados */
    //     $scope.showFilter = function (nIndex)
    //     {
    //         if(nIndex < $scope.index_favorite)
    //         {
    //             /* Filtro de un mercado cualquiera */
    //             $scope.filter_show = $scope.filter[nIndex].list;
    //             $scope.is_favorite = 0;
    //             /* comprobar que hay datos de los mercados del filtro */
    //             $scope.exist_favorite = 0;
    //             angular.forEach($scope.data.markets, function(value, key) 
    //             {
    //                 if($scope.filter_show.indexOf(value.id_market) > -1)
    //                     $scope.exist_favorite = 1;
    //             });
    //         }
    //         else
    //         {
    //             /* Es el filtro de los mercados favoritos */
    //             $scope.filter_show = $scope.fav_filter_show;
    //             $scope.is_favorite = 1;
    //             /* comprobar que hay datos de los mercados del filtro */
    //             $scope.exist_favorite = 0;
    //             if($scope.filter_show!= null)
    //             {
    //                 angular.forEach($scope.data.markets, function(value, key) 
    //                 {
    //                     if($scope.filter_show.indexOf(value.id_market) > -1)
    //                         $scope.exist_favorite = 1;
    //                 });
    //             }
    //             else
    //                 $scope.exist_favorite = 1;   
    //         }
    //     };

    //     // /* Indicar si el filtro esta seleccionado */
    //     // $scope.isSelected = function(nSelection)
    //     // {
    //     //     return $scope.selected === nSelection;
    //     // };

    //     // /* Selecciona el filtro */
    //     // $scope.setSelection = function(nSelection)
    //     // {
    //     //     $scope.selected = nSelection;
    //     // };

    //     /* Añadir/eliminar favorito */
    //     $scope.checkFavorite = function( nMarket , nType)
    //     {

    //         /* Convertir el valor booleano a uno numerico */
    //         var option= (nType) ? 1 : 0;
                    
    //         /* Eliminar/añadir el mercado favorito */ 
    //         var confMarketFavorite = {
    //                 method: 'POST',
    //                 url: 'php/getFavorites.php', 
    //                 headers: {
    //                     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //                 },
    //                 data: 'id_market='+nMarket+'&option='+option + '&iduser='+$scope.$storage.iduser
    //             };

    //         $http(confMarketFavorite).
    //         success(function(data, status, headers, config) 
    //         {
    //             /* Se actualiza la lista de favoritos */
    //             $scope.fav_filter_show = data.list;

    //             /* Se guarda en el localStorage */
    //             $sessionStorage.favorites = data.list;
    //             $sessionStorage.$save();
    //             $scope.$storage.favorites = data.list;
                
               
    //             /* comprobar que hay datos de los mercados del filtro */
    //             $scope.exist_favorite = 0;
    //             if($scope.fav_filter_show != null){
    //                 // Hay mercados favoritos
    //                 angular.forEach($scope.data.markets, function(value, key) {
    //                         if($scope.fav_filter_show.indexOf(value.id_market) > -1)
    //                            $scope.exist_favorite = 1;
    //                 });
    //             }
    //             else
    //                 $scope.exist_favorite = 1; 
                
    //         }).
    //         error(function(data, status, headers, config) 
    //         {
    //             // called asynchronously if an error occurs
    //             // or server returns response with an error status.
    //         });
    //     };
        
    //     $scope.getFavoriteContent = function()
    //     {
    //         $scope.favText =! $scope.favText;
    //     };

        
    //     $scope.trimChar = function( str, len )
    //     {
    //         var subStr; 

    //         if( screen.width < 400 )
    //         {
    //             var subStr = str.substr( 0, len );

    //             if( str.length > len )
    //                 subStr += "...";
    //         }
    //         else
    //             subStr = str;

    //         return subStr;
    //     };

    //     /* Quita caracteres de una cadena */
    //     $scope.cutChar = function( str, nChar )
    //     {
    //         var temp = str.substr( nChar );

    //         if( temp.indexOf('|') == -1 )
    //             return temp;
    //         else
    //         {
    //             var strName = temp.split('|');
    //             return strName[1];
    //         }

    //     };

    //     $scope.cutIdName = function( str )
    //     {
    //         var temp = str.split('|');

    //         return temp[0].substr(2);
    //     };


    //     /* Añade caracteres a una cadena */
    //     $scope.addChar = function( str, strAdd )
    //     {
    //         if( str )
    //         {
    //             var str = str.split(".");
    //             return str[0]+"_on."+str[1];
    //         }
    //     };

    //     $scope.displayRow = function ( position ) 
    //     {
    //         /* Visualizar las filas de 3 columnas en el ganador de la competicion */
    //         if(position%3==0)
    //             return true;
    //         else 
    //             return false;
    //     };

    //     // $scope.displayCell = function ( positionRow, index )
    //     // {
    //     //     /* Visulaizar las columnas de las filas de 3 en el ganador de la competicion */
    //     //     if(index >= positionRow && index <= ( positionRow + 2 ) )
    //     //         return true;
    //     //     else
    //     //         return false;
    //     // };

    //     // $scope.emptyCells = function ( position )
    //     // {
    //     //     if( !$scope.data) return;

    //     //     /* Calcula el numero de celdas vacias para completar una fila */ 
    //     //     var length_data = Object.keys($scope.data.markets[position].str_bet).length;
           
    //     //     return ( 3 - length_data % 3 ) ;
    //     // };

    //     // $scope.numberRow = function ( position )
    //     // {
    //     //     /* Calcula el index de la fila donde añadir las celdas vacias*/
    //     //     var length_data = Object.keys($scope.data.markets[position].str_bet).length;
            
    //     //     return ( Math.floor(length_data / 3 ) * 3);
    //     // };

    //     // $scope.getInfo = function ( index )
    //     // {
    //     //     /* Retorna el texto de info del mercado por su identificador */
    //     //     return $scope.infoMarket[index];
    //     // };       
    // })

    // .controller("load", function( $scope, $http)
    // {
    //     $scope.showMessageLoading=true;
                
                
    //     $scope.isLoading = function () 
    //     {
    //         return $http.pendingRequests.length > 0;
    //     };

    //     $scope.$watch($scope.isLoading, function (v)
    //     {    
    //         $scope.showMessageLoading=v;              
    //     })
    // })

    // .controller('newsletter', function( $scope, $http, $route, $log, vcRecaptchaService )
    // {
    //     $scope.email    = $route.current.params.email;
    //     $scope.response = null;
    //     $scope.widgetId = null;
       
    //     $scope.model = {
    //         key: '6LfuiAgTAAAAABTVAVcs1h1SEtBNTnhAT1gHi3uv'
    //     };

    //     $scope.setResponse = function (response) {
    //         console.info('Response available');
    //         $scope.response = response;
    //     };
    //     $scope.setWidgetId = function (widgetId) {
    //         console.info('Created widget ID: %s', widgetId);
    //         $scope.widgetId = widgetId;
    //     };

    //     $scope.submit = function(form) 
    //     {
    //       /* Inicializamos valores del formulario */
    //       form.captcha.$setValidity('recaptcha', true);
    //       form.email.$setValidity('recurrent', true); 
    //       form.email.$setValidity('unexpected', true); 
    //       form.email.$setValidity('sessionko', true);

    //       /* Controlamos el CaptCha */
    //       if( !$scope.response || form.$error.recaptcha )
    //           form.captcha.$setValidity('recaptcha', false);

    //       /* Comprobamos errores */
    //       $scope.$broadcast('validate-form', form.$name );

    //       /* Controlamos la validación del formulario */
    //       if (form.$invalid)
    //         return;

    //       /* Configuración del envío */
    //       var params = {
    //         method: 'POST',
    //         url: 'php/newsletter.php',
    //         headers: {
    //                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             },
    //         data: 'email='+this.email+'&resp='+$scope.response
    //       }  

    //       /* Llamada al modelo */
    //       $http( params )
    //         .success(function(data, status, headers, params) 
    //         {
    //             /* Si nos devuelve un error */
    //             if( data.error || !angular.isDefined( data.error ) )
    //             {
    //                  Dependiendo de la respuesta damos el error 
    //                 switch(data.type) 
    //                 {
    //                     case 'ALREADY-EXISTS': // El email ya ha sido registrado
    //                         form.email.$setValidity('recurrent', false); 
    //                         break;
    //                     case 'CAPTCHA-KO': // La respuesta del Captcha no es correcta.
    //                         form.captcha.$setValidity('recaptcha', false);
    //                         break;
    //                     case 'SESSION-KO': // Solo se permite 1 inscripción por sesión
    //                         form.email.$setValidity('sessionko', false);
    //                         break;
    //                     default: // Error por defecto
    //                         form.email.$setValidity('unexpected', false);
    //                 }

    //                 /* Reiniciamos el captCha */
    //                 $scope.response = null;
    //                 vcRecaptchaService.reload(0);

    //                 /* Creamos los mensajes de error */
    //                 $scope.$broadcast('validate-form', form.$name );

    //             }
    //             else
    //               $scope.respOK = true;

    //             /* Recogamos el error, si el estatus no es OK */
    //             if (status != 200) 
    //                 $log.error(data);
    //         })
    //         .error(function(data, status, headers, config) 
    //         {
    //           $log.error(data);
    //         });
    //     };

    //     $scope.back = function()
    //     {
    //       $scope.send = 0;
    //     };

    //     /* Envio de parametros en un formulario */
    //     var param = function(data) 
    //     {
    //       var returnString = '';
    //       for (d in data)
    //       {
    //           if (data.hasOwnProperty(d))
    //              returnString += d + '=' + data[d] + '&';
    //       }
    //       // Remove last ampersand and return
    //       return returnString.slice( 0, returnString.length - 1 );
    //     };
    // })
    /********************************** PANEL DE USUARIO **********************************************/
    
    // .controller('loginController', function( $scope, $localStorage, $location, $http, $sessionStorage, vcRecaptchaService, $translate, $route) 
    // {

    //     /* Controlar el pais */
    //     /* La forma de saber el pais es con el primer parametro de la url  */
    //     var absUrl = $location.absUrl().replace("http://",'').split('/');

    //     $scope.country = absUrl[1];
    //     /* Links de facebook y twitter */
    //     $scope.linkFacebook = function()
    //     {
    //         document.location.href="php/connectFacebook.php?locale=" + $scope.country;
    //     }
        
    //     $scope.linkTwitter= function()
    //     {
    //         document.location.href="php/connectTwitter.php?locale=" + $scope.country;
    //     }

    //     /* Controlar los errores de login con facebook o twitter */
        

    //     if(angular.isDefined($route.current.params.exit))
    //     {
    //         switch($route.current.params.exit)
    //         {
    //             case "1":
    //                 $translate('register.errorLoginExternal.bbdd').then(function (translation)
    //                 {
    //                     $scope.errorExternal = translation;
    //                 });
    //                 break;
    //             case "2":
    //                 $translate('register.errorLoginExternal.facebookConnect').then(function (translation)
    //                 {
    //                     $scope.errorExternal = translation;
    //                 });
    //                 break;
    //             case "3":
    //                 $translate('register.errorLoginExternal.facebookData').then(function (translation)
    //                 {
    //                     $scope.errorExternal = translation;
    //                 });
    //                 break;
    //             case "4":
    //                 $translate('register.errorLoginExternal.userPass').then(function (translation)
    //                 {
    //                     $scope.errorExternal = translation;
    //                 });
    //                 break;
    //             case "6":
    //                 $translate('register.errorLoginExternal.twitterConnect').then(function (translation)
    //                 {
    //                     $scope.errorExternal = translation;
    //                 });
    //                 break;
    //             case "7":
    //                 $translate('register.errorLoginExternal.twitterData').then(function (translation)
    //                 {
    //                     $scope.errorExternal = translation;
    //                 });
    //                 break;
    //             default:
    //                 $scope.errorExternal = "";
    //         }
    //         $scope.errorLoginExternal = true;
            
    //     }

        
    //     $scope.response = null;
    //     $scope.widgetId = null;

    //     $sessionStorage.$reset();

    //     $scope.model = {
    //         key: '6LfuiAgTAAAAABTVAVcs1h1SEtBNTnhAT1gHi3uv'
    //     };


    //     $scope.setResponse = function (response) {
    //         //console.info('Response available');
    //         $scope.response = response;
    //     };
    //     $scope.setWidgetId = function (widgetId) {
    //         //console.info('Created widget ID: %s', widgetId);
    //         $scope.widgetId = widgetId;
    //     };

    //     $scope.submit = function(form) 
    //     {
    //         switch (form.$name)
    //         {
    //             case "loginForm":
                    
    //                 /* Inicializamos valores del formulario */
    //                 form.passLogin.$setValidity('sqlEmpty', true);
    //                 form.passLogin.$setValidity('unexpected', true);

    //                 var method = "POST",
    //                     url    = "php/login.php",
    //                     data   = "user="+this.userLogin+"&pass="+this.passLogin + "&locale=" + $scope.country;

    //             break;
    //             case "recoverForm":

    //                 /* Inicializamos valores del formulario */
    //                 form.hRecover.$setValidity('recaptcha', true);
    //                 form.userRecover.$setValidity('sqlEmpty', true);
    //                 form.userRecover.$setValidity('unexpected', true);
    //                 $scope.send = false;

    //                 var method = "POST",
    //                     url    = "php/recover.php",
    //                     data   = "user="+this.userRecover+"&resp="+$scope.response;

    //                 /* Controlamos el CaptCha */
    //                 if( !$scope.response || form.$error.recaptcha )
    //                     form.hRecover.$setValidity('recaptcha', false);
    //             break;
    //             case "createForm":

    //                  /* Inicializamos valores del formulario */
    //                 form.hCreate.$setValidity('recaptcha', true);
    //                 form.createRePass.$setValidity('equal', true);
    //                 form.createUser.$setValidity('recurrent', true);
    //                 form.createUser.$setValidity('unexpected', true);

    //                 var method = "POST",
    //                     url    = "php/register.php",
    //                     data   = "user="+this.createUser+"&pass="+this.createPass+"&newsletter="+this.newsletter+
    //                              "&robinson="+this.robinson+"&resp="+$scope.response +"&locale=" + $scope.country;

    //                 /* Controlamos el CaptCha */
    //                 if( !$scope.response || form.$error.recaptcha )
    //                     form.hCreate.$setValidity('recaptcha', false);

    //                 /* Controlamos que las contraseñas coincidan */
    //                 if( this.createPass != this.createRePass )
    //                     form.createRePass.$setValidity('equal', false);
    //             break;

    //         }

    //         /* Comprobamos errores */
    //        $scope.$broadcast('validate-form', form.$name );

    //         /* Control de formulario */
    //         if( form.$invalid )
    //             return false;

    //         /* Instanciamos datos de la llamada */
    //         var params = {
    //             method: method,
    //             url: url,
    //             data: data
    //         };
                              
    //         /* Llamada al modelo */

    //         $http( params )
    //         .success(function(data, status, headers, params)
    //         {
               
    //             switch( form.$name )
    //             {
    //                 case "loginForm":
    //                     /* Si nos devuelve un error */
    //                     if( data.error || !angular.isDefined( data.error ) )
    //                     {
    //                          Dependiendo de la respuesta damos el error 
    //                         switch(data.type) 
    //                         {
    //                             case 'EMPTY_ERROR': // El usuario o la clave no son correctos.
    //                                 form.passLogin.$setValidity('sqlEmpty', false);
    //                                 break;
    //                             default: // Error por defecto
    //                                 form.passLogin.$setValidity('unexpected', false);
    //                         } 
    //                     }
    //                     /* Si todo ha ido bien */
    //                     else
    //                     {
    //                         $translate('dashboard.header.count').then(function (translation)
    //                         {
    //                             /* Borramos el local storage */
    //                             $sessionStorage.$reset();
                              
    //                             /* Aplicamos el localStorage de favoritos , deportes, y demas datos del iduser */
    //                             $sessionStorage.favorites = data.markets;
    //                             $sessionStorage.iduser = data.iduser;
    //                             $sessionStorage.str_name = data.str_name;
    //                             $sessionStorage.str_email = data.str_email;
    //                             $sessionStorage.a_sports = data.a_sports;
    //                             $sessionStorage.other_sport = data.other_sport;
    //                             $sessionStorage.nameuser = !(data.str_name) ? translation : data.str_name.substr(0,6) + "...";
    //                             $sessionStorage.sessionid = data.iduser;
    //                             /* Controlar el tiempo de sesion */
    //                             var time_in = new Date();
    //                             $sessionStorage.expired = time_in.getTime();
    //                             /* Guardamos los valores */
    //                             $sessionStorage.$save();
    //                             /* Redirigimos a la home */
    //                             $location.path('userHome').replace();
    //                         }); 
    //                     }  

    //                 break;
    //                 case "recoverForm":
    //                     /* Si nos devuelve un error */
    //                     if( data.error || !angular.isDefined( data.error ) )
    //                     {
    //                         /* Dependiendo de la respuesta damos el error */
    //                         switch(data.type) 
    //                         {
    //                             case 'EMPTY_ERROR': // El usuario o la clave no son correctos.
    //                                 form.userRecover.$setValidity('sqlEmpty', false); 
    //                                 break;
    //                             case 'CAPTCHA_KO': // La respuesta del Captcha no es correcta.
    //                                 form.hRecover.$setValidity('recaptcha', false);
    //                                 break;
    //                             default: // Error por defecto
    //                                 form.userRecover.$setValidity('unexpected', false);
    //                         }    
    //                     }
    //                     /* Si todo ha ido bien */
    //                     else
    //                     {
    //                         $scope.send = true;
    //                     }

    //                     /* Reiniciamos el captCha */
    //                     $scope.response = null;
    //                     vcRecaptchaService.reload(0);

    //                 break;
    //                 case "createForm":
    //                     /* Si nos devuelve un error */
    //                     if( data.error || !angular.isDefined( data.error ) )
    //                     {
    //                         /* Dependiendo de la respuesta damos el error */
    //                         switch(data.type) 
    //                         {
    //                             case 'EMAIL_RECURRENT': // La dirección de correo ya existe.
    //                                 form.createUser.$setValidity('recurrent', false);
    //                                 break;
    //                             case 'CAPTCHA_KO': // La respuesta del Captcha no es correcta.
    //                                 form.hCreate.$setValidity('recaptcha', false);
    //                                 break;
    //                             default: // Error por defecto
    //                                 form.createUser.$setValidity('unexpected', false);
    //                         }

    //                         /* Reiniciamos el captCha */
    //                         $scope.response = null;
    //                         vcRecaptchaService.reload(1);

    //                     }
    //                     /* Si todo ha ido bien */
    //                     else
    //                     {

    //                         $translate('dashboard.header.count').then(function (translation) // "Evento no disponible en "+feed; 
    //                         {
    //                             /* Borramos el local storage */
    //                             $sessionStorage.$reset();
    //                             /* Aplicamos el localStorage de favoritos y iduser y demas datos*/
    //                             $sessionStorage.favorites = data.markets;
    //                             $sessionStorage.iduser = data.iduser;
    //                             $sessionStorage.nameuser = translation;
    //                             $sessionStorage.sessionid = data.iduser;
    //                             $sessionStorage.str_email = data.str_email;
    //                             $sessionStorage.str_name = "";
    //                             /* Controlar el tiempo de sesion */
    //                             var time_in = new Date();
    //                             $sessionStorage.expired = time_in.getTime();
    //                             /* Guardamos los valores */
    //                             $sessionStorage.$save();
    //                             /* Redirigimos a la home */
    //                             $location.path('showElection').replace();
    //                         });
    //                     }

    //                 break;

    //             }     

    //             $scope.$broadcast('validate-form', form.$name );                                   
    //         })
    //         .error(function(data, status, headers, config)
    //         {
    //           //$scope.dataReg = data;
    //         });
                     
    //      };

        
    // })

    // .controller('recoveryController', function( $scope, $http, $route ) 
    // {
    //     /* Inicializamos variables */
    //     $scope.showLogin = false;

    //     /* Recuperamos los parametros */
    //     var token = $route.current.params.token;

    //     $scope.submit = function(form) 
    //     {
    //         /* Inicializamos el formulario */
    //         form.rePass.$setValidity('equal', true);
    //         form.pass.$setValidity('unexpected', true);
    //         form.pass.$setValidity('tokenOut', true);

    //         var method = "POST",
    //             url    = "php/recovery.php",
    //             data   = "pass="+this.pass+"&token="+token;

    //         /* Controlamos que las contraseñas coincidan */
    //         if( this.pass != this.rePass )
    //             form.rePass.$setValidity('equal', false);

    //         /* Comprobamos errores */
    //         $scope.$broadcast('validate-form', form.$name );

    //         /* Control de formulario */
    //         if( form.$invalid )
    //             return false;

    //         /* Instanciamos datos de la llamada */
    //         var params = {
    //             method: method,
    //             url: url,
    //             data: data
    //         };
                                  
    //           Llamada al modelo 
    //         $http( params )
    //         .success( function(data, status, headers, params )
    //         {
    //             /* Si nos devuelve un error */
    //             if( data.error || !angular.isDefined( data.error ) )
    //             {
    //                 /* Dependiendo de la respuesta damos el error */
    //                 switch(data.type) 
    //                 {
    //                     case 'TOKEN_ERROR': // El token no es correcto o ha caducado.
    //                         form.pass.$setValidity('tokenOut', false);
    //                         break;
    //                     default: // Error por defecto
    //                         form.pass.$setValidity('unexpected', false);
    //                 } 

    //                 /* Comprobamos errores */
    //                 $scope.$broadcast('validate-form', form.$name );
    //             }
    //             /* Si todo ha ido bien */
    //             else
    //             {
    //                 /* Enseñamos el texto de correcto */
    //                 $scope.showLogin = true;
    //             }
    //         });

    //     };

    //     $scope.iniLogin = function() 
    //     {
    //         /* Redirigimos al login */
    //         document.location.href = "./#!register";
    //     };
    // })

    // .controller('electionUser', function($scope, $location, $http, $sessionStorage, $filter, timeOut, dataFactory) 
    // {
    //     /* Controlar que se esta en sesion */
    //     var session = timeOut.timeOut();

    //     $scope.user_sports = [];
    //     $scope.user_feeds = [];
    //     $scope.dataSettings = {};

    //     var confSport = {
    //             method: 'POST',
    //             url: 'php/dashboard/getDataUserSettings.php', 
    //             data: 'iduser='+ $sessionStorage.iduser ,
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         };


    //     $http(confSport).
    //     success(function(data, status, headers, config) 
    //     {
    //         $scope.dataSettings.sport = data.sport;
    //     }).
    //     error(function(data, status, headers, config) 
    //     {
                    
    //     });

    //     dataFactory.getDataFeed().then( function( listFeed )
    //     {
    //         $scope.dataSettings.feed = listFeed.data;
    //     });
    //     /* Modificar el src de la img de los deportes */
    //     $scope.selectUrl = function (item,sport)
    //     {
           
    //          if($scope.user_sports.indexOf(item) !== -1 )
    //             return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(sport)+'-on.svg';
    //         else
    //             return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(sport)+'-off.svg';
    //     };

    //     /* Actualizar el array de deportes */
    //     $scope.updateValue = function (structure,valueAdd,strData)
    //     {
    //         var index = structure.indexOf(valueAdd);
           
    //         if( index === -1 )
    //         {
    //              structure.push(valueAdd); 
    //              if( strData != "" )
    //                 return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(strData)+'-on.svg';
    //              else
    //                 return 1;       
    //         }
    //         else if( index !== -1 ) 
    //         {
    //             structure.splice(index, 1);
    //             if(strData!="")
    //                 return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(strData)+'-off.svg';
    //             else
    //                 return 1;
    //         } 
    //     };
            

    //     $scope.submit = function(form) 
    //     {
    //         /* Recoger los datos de los otros deportes */
    //         var str_others = "";

    //         angular.forEach(this.others, function(value, key) {
    //             if(str_others=="")
    //                 str_others = str_others + value.text ;
    //             else
    //                 str_others = str_others + "," +value.text;
    //         }); 

    //         var params = {
    //             method: "POST",
    //             url: "php/election.php",
    //             data: "&user_sports=" + $scope.user_sports + "&user_feeds=" + $scope.user_feeds 
    //                             + "&others="+ str_others +"&iduser="+ $sessionStorage.iduser 
    //         };

    //         $http( params )
    //         .success(function(data, status, headers, params)
    //         {
    //             if(data.error)
    //             {
    //                 /* Error al registrar las casas y deportes */
    //             }
    //             else
    //             {
    //                 /* Guardar la info del usuario en la sesion */
    //                 $sessionStorage.str_name = data.dataUser.str_name;
    //                 $sessionStorage.str_email = data.dataUser.str_email;
    //                 $sessionStorage.a_sports = data.dataUser.a_sports;
    //                 $sessionStorage.$save();

    //                 $location.path('userHome').replace();
    //             }
                
    //         }).
    //         error(function(data, status, headers, config)
    //         {
               

    //         });   
    //     };
    // })
    /************************************************* PANEL DE USUARIO ***********************************/

    // .controller('userHome', function( $scope, $http, $location, dataFactory, $sessionStorage, $route, timeOut, $translate) 
    // {
        
    //     $scope.dataWordpress = [];
    //     $scope.user_sports = "";

    //     /* Se viene de facebook o de twitter */
    //     if(angular.isDefined($route.current.params.iduser))
    //     {

    //         /* Obtener los datos del usuario */
    //         var confUser = {
    //             method: 'POST',
    //             url: 'php/dashboard/getDataUser.php',
    //             data: 'iduser=' + $route.current.params.iduser, 
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         }
    //         $http(confUser).
    //         success(function(data, status, headers, config) 
    //         {
    //             $translate('dashboard.header.count').then(function (translation) // "Evento no disponible en "+feed; 
    //             {
    //                 /* Borramos el local storage */
    //                 $sessionStorage.$reset();

    //                 /* Aplicamos el localStorage de favoritos , deportes, y demas datos del iduser */
    //                 $sessionStorage.favorites = data.a_markets;
    //                 $sessionStorage.iduser = data.iduser;
    //                 $sessionStorage.str_name = data.str_name;
    //                 $sessionStorage.str_email = data.str_email;
    //                 $sessionStorage.a_sports = data.a_sport;
    //                 $sessionStorage.other_sport = data.str_other_sport;
    //                 $sessionStorage.nameuser = !(data.str_name) ? translation : data.str_name.substr(0,6) + "...";
    //                 $sessionStorage.sessionid = data.iduser;
    //                 $sessionStorage.login_external = 1;
    //                 /* Controlar el tiempo de sesion */
    //                 var time_in = new Date();
    //                 $sessionStorage.expired = time_in.getTime();
    //                 /* Guardamos los valores */
    //                 $sessionStorage.$save();
    //                 $scope.$storage = $sessionStorage;
                    
    //                 /* Datos del usuario y de sus deportes */
    //                 $scope.user_sports = (!$scope.$storage.a_sports) ? [] : $scope.$storage.a_sports.replace('[','').replace(']','').split(',');
    //             });
          
    //         })
    //         .
    //         error(function(data, status, headers, config) 
    //         {
                        
    //         });

    //     }
    //     else
    //     {
    //         /* Controlar que se esta en sesion */
    //         var session = timeOut.timeOut();
    //         $scope.$storage = $sessionStorage;
    //         /* Datos del usuario y de sus deportes */
    //         $scope.user_sports = (!$scope.$storage.a_sports) ? [] : $scope.$storage.a_sports.replace('[','').replace(']','').split(',');
          
    //     }

    //     var  confWordpress = {
    //             method: 'POST',
    //             url: 'php/dashboard/getBlogPostHome.php',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         },
    //         confPromo = {
    //             method: 'GET',
    //             url: 'json/dataPromo.json',
    //             params: {'_':new Date().getTime()}, 
    //             headers: {
    //                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         };


    //     /* Promociones */
    //     dataFactory.getDataFeed().then( function(response)
    //     {
    //         /* Datos de las casas */
    //         $scope.feed = response.data;

    //         $http(confPromo).
    //         success(function(data, status, headers, config) 
    //         {
    //             /* Se guardan los datos .Primero las que son para usuarios registrados, luego las destacadas y luego las demas */
    //             $scope.promos = [];
    //             var not_two = !($scope.promos.length == 2);
    //             var no_more = true;
    //             var promos_add = [];
    //             var limit = 2;
    //             var index_register = 0;
    //             var index_imp = 0;
    //             var index = 0;

    //             while(not_two) 
    //             {
    //                 /* Usuarios registrados */
    //                 index_register = 0;

    //                 while(index_register < data.length && not_two)
    //                 {
    //                     /* No esta añadida */
    //                     if(data[index_register]['user_registered'] == 1 && promos_add.indexOf(data[index_register]['id_promo'])== -1)
    //                     {
    //                         $scope.promos.push(data[index_register]);
    //                         promos_add.push(data[index_register]['id_promo']);
    //                     }
    //                     not_two = !($scope.promos.length == limit);
    //                     index_register++;  
    //                 }
    //                 /* Destacadas */
    //                 index_imp = 0;

    //                 while(index_imp < data.length && not_two)
    //                 {
    //                     if(data[index_imp]['is_important'] == 1 && promos_add.indexOf(data[index_imp]['id_promo'])== -1)
    //                     {
    //                         $scope.promos.push(data[index_imp]);
    //                         promos_add.push(data[index_imp]['id_promo']);
    //                     }
    //                     not_two = !($scope.promos.length == limit);
    //                     index_imp++;  
    //                 }

    //                 /* Resto por si no hay */
    //                 index = 0;
                    
    //                 while(index < data.length && not_two)
    //                 {
    //                     if(promos_add.indexOf(data[index]['id_promo']) == -1)
    //                     {
    //                         $scope.promos.push(data[index]);
    //                         promos_add.push(data[index]['id_promo']);
    //                     }
    //                     not_two = !($scope.promos.length == limit);
    //                     index++;  
    //                 }
    //             }
    //         }).
    //         error(function(data, status, headers, config) 
    //         {
                        
    //         });
    //     });

    //     /* Post de la zona tipster */
    //     $http(confWordpress).
    //         success(function(data, status, headers, config) 
    //         {
    //             /* Se guardan los datos */
    //             $scope.dataWordpress = data;
    //         }).
    //         error(function(data, status, headers, config) 
    //         {
                        
    //         });

        
    //     $scope.$watch('user_sport', function()
    //     {
    //         if($scope.user_sport != "")
    //         {
    //             dataFactory.getDataJson().then( function(response)
    //             {

    //                 /* Si el usuario tiene deportes, los proximos eventos de esos deportes */
    //                 /* Si no, los proximos eventos como en la portada */
    //                 /* Primero hay que ordenar los eventos del json por fecha */

    //                 var dataEventOrder = response.data;
    //                 var limit = 13; 

    //                 dataEventOrder.sort(function (a, b) {
    //                 return (a['orderTime'] > b['orderTime']) ? 1 : ((a['orderTime'] < b['orderTime']) ? -1 : 0);
    //                 });
                 
    //                 $scope.events = [];

    //                 if($scope.user_sports.length == 0)
    //                 {
    //                     /* Los 10 primeros */
    //                     for(var index = 0; index < limit; index++)
    //                     {
    //                         $scope.events.push(dataEventOrder[index]);
    //                     }
    //                 }
    //                 else
    //                 {
    //                     /* Lista de deporte y condicion de parada */
    //                     var list_sports_stop = new Object();

    //                     for(var index=0; index < $scope.user_sports.length; index++)
    //                     {

    //                         list_sports_stop[$scope.user_sports[index]] = false;
    //                     }

    //                     var not_ten = true; //condicion de parada por tamaño
    //                     var exist_more = false; //condicion de parada por deporte
    //                     var list_id_add = new Array();//lista de eventos añadidos
                       

    //                     /* Mientras no haya 10 eventos y existan eventos para los deportes del usuario */

    //                     while (not_ten && !exist_more)
    //                     {
    //                         /* Para cada deporte */
    //                         angular.forEach(list_sports_stop, function(value, key) 
    //                         {
    //                             /* Para cada evento del portal */
    //                             if(!value)
    //                             {
    //                                 var find_event = value;
    //                                 for(var id_event = 0; id_event < dataEventOrder.length ; id_event++)
    //                                 {   
    //                                     /* Evento del deporte y aun no añadido */
    //                                     if(dataEventOrder[id_event]['sportID'] == key && 
    //                                         list_id_add.indexOf(dataEventOrder[id_event]['id']) == -1 && 
    //                                         $scope.events.length < limit)
    //                                         {
    //                                             $scope.events.push(dataEventOrder[id_event]);
    //                                             list_id_add.push(dataEventOrder[id_event]['id']);
    //                                             find_event = true;
    //                                             break;
    //                                         }
    //                                 }
    //                                 list_sports_stop[key] = !find_event;
    //                             }
    //                         });
                            
    //                         /* Comprobar parada por deporte */
    //                         var continue_sport = false;
    //                         angular.forEach(list_sports_stop, function(value, key) 
    //                         {
    //                             continue_sport = continue_sport || !value;
                                
    //                         });
    //                         exist_more = !continue_sport;

                          
    //                         /* Comprobar parada por eventos */
    //                         if($scope.events.length >= limit)
    //                             not_ten = false;
                            
    //                     }

    //                     if($scope.events.length <= parseInt(limit,10) -1)
    //                     {
                            
    //                         /* Rellenamos por si no tenemos 10 eventos*/
    //                         var not_enough = true;
    //                         var index = 0;
    //                         while(not_enough && index < dataEventOrder.length)
    //                         {
    //                             if(list_id_add.indexOf(dataEventOrder[index]['id']) == -1)
    //                             {
    //                                 $scope.events.push(dataEventOrder[index]);
    //                             }
                                    
    //                             index++;
    //                             not_enough = !($scope.events.length == limit);
    //                         } 
    //                     }  
    //                 }
    //             });
    //         }     
    //     });

    //     $scope.selectTitle = function(id, titleFeed, titlePersonal)
    //     {
    //         if (parseInt(id,10) > 0)
    //             return $translate.instant('bonus.generalPage.homeBonus.title'); //"Consigue tu bono de "+ titleFeed + " apuestas";
    //         else if(parseInt(id,10)== 0)
    //             return $translate.instant('promotions.linkTitle'); //"Promoción de Besgam";
    //         else
    //             return titlePersonal;

    //     };
    // })

    // .controller('userSettings', function( $scope, $http, $location, $sessionStorage, vcRecaptchaService, timeOut, $filter, $translate, dataFactory) 
    // {

    //     /* Controlar que se esta en sesion */
    //     var session = timeOut.timeOut();

    //     /* Si se ha entrado por facebook o twitter no se puede cambiar la contraseña */
    //     $scope.showPassBlock = angular.isDefined($sessionStorage.login_external) && $sessionStorage.login_external == 1 ? false : true;

    //     /* Datos del captcha */
    //     $scope.response = null;
    //     $scope.widgetId = null;
    //     /* Datos de los mercados y filtros */
    //     $scope.selected_sport  = 0;
    //     $scope.selected_filter  = 1;
    //     $scope.selected_market = 1;

    //     /* Variables para la visualizacion de mensajes */
    //     $scope.update_favorites = false;
    //     $scope.error_update_favorites = true; 
    //     $scope.update_settings = false;
    //     $scope.error_update_settings = true; 
    //     $scope.update_user = false;

    //     $scope.error_delete = true; 
    //     $scope.delete_user = false;
        
    //     $scope.$storage = $sessionStorage;

    //     /* Primer elto del acordeon abierto*/
    //     $scope.status = {
    //         isFirstOpen: true
    //     };

    //     $scope.model = {
    //         key: '6LfuiAgTAAAAABTVAVcs1h1SEtBNTnhAT1gHi3uv'
    //     };

    //     var confUser = {
    //             method: 'POST',
    //             url: 'php/dashboard/getDataUser.php',
    //             data:'iduser='+ $scope.$storage.iduser,
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         };
        
    //     var confSport = {
    //             method: 'POST',
    //             url: 'php/dashboard/getDataUserSettings.php',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         };
    //     // var confMarkets = {
    //     //         method: 'GET',
    //     //         url: 'json/markets.json', 
    //     //         headers: {
    //     //             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //     //         }
    //     //     } 

    //     $scope.setResponse = function (response) {
    //         //console.info('Response available');
    //         $scope.response = response;
    //     };
    //     $scope.setWidgetId = function (widgetId) {
    //         //console.info('Created widget ID: %s', widgetId);
    //         $scope.widgetId = widgetId;
    //     };

    //     /* Modificar el src de la img de los deportes */
    //     $scope.selectUrl = function (item,sport){
           
    //          if($scope.user_sports.indexOf(item) !== -1 )
    //             return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(sport)+'-on.svg';
    //         else
    //             return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(sport)+'-off.svg';
    //     };

    //     /* Hacemos las llamadas para obtener los datos del usuario */
    //     $http(confUser).
    //         success(function(data, status, headers, config) 
    //         {   
    //             $translate('dashboard.header.count').then(function (translation) // "Evento no disponible en "+feed; 
    //             {
    //                 $sessionStorage.nameuser = ! (data.str_name) ? translation : data.str_name.substr(0,6) +"...";
    //                 $sessionStorage.$save();
    //             });

    //             $scope.str_name = (!data.str_name) ? "" : data.str_name;
    //             $scope.str_email = data.str_email;
    //             $scope.iduser = data.iduser;

    //             /*$scope.str_pass = data.str_pass;
    //             $scope.str_pass_two = data.str_pass;*/
    //             $scope.str_pass = "";
    //             $scope.str_pass_two = "";
    //             $scope.actualpass="00000000";

    //             $scope.robinson = (data.robinson == "0") ? 0: 1;
    //             $scope.newsletter = data.newsletter;

              
    //             $scope.user_favorites = (!data.a_markets) ? [] : data.a_markets.replace('[','').replace(']','').split(',');
    //             for (elem_market in $scope.user_favorites ) {
    //                $scope.user_favorites[elem_market] = parseInt($scope.user_favorites[elem_market], 10); 
    //             }
    //             $scope.user_feeds = (!data.a_feed) ? [] : data.a_feed.replace('[','').replace(']','').split(',');
    //             $scope.user_sports = (!data.a_sport) ? [] : data.a_sport.replace('[','').replace(']','').split(',');
            
    //             if(!data.str_other_sport)
    //                $scope.user_others = [];
    //             else
    //                $scope.user_others = data.str_other_sport.split(',');

                
    //             /* Datos de las casas, deportes y los filtros de mercados */
    //             $http(confSport).
    //                 success(function(data, status, headers, config)
    //                 {
    //                     $scope.dataSettings = data;
    //                     //console.log($scope.dataSettings);
    //                     dataFactory.getDataFeed().then( function( listFeed )
    //                     {
    //                         $scope.dataSettings.feed = listFeed.data;
    //                     });

    //                      dataFactory.getDataMarkets().then( function( dataMarketsJSON )
    //                     {
                        
    //                         $scope.dataFilters = dataMarketsJSON.data.filters;
    //                         $scope.dataMarkets = dataMarketsJSON.data.markets;
    //                         //console.log($scope.dataFilters) ;
    //                         //console.log($scope.dataMarkets) ;     
    //                     });
                       
    //                 }).
    //                 error(function(data, status, headers, config)
    //                 {

    //                 });

    //         }).
    //         error(function(data, status, headers, config) 
    //         {
                        
    //         });

    //     /* Actualizar el array de deportes */
    //     $scope.updateValue = function (structure,valueAdd,strData)
    //     {
    //         var index = structure.indexOf(valueAdd);
           
    //         if(index === -1){
               
    //              structure.push(valueAdd); 
    //              if(strData!=""){
    //                 return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(strData)+'-on.svg';
    //              }  
    //              else{
    //                  return 1;  
    //              }
                    
    //         }
    //         else if (index !== -1) 
    //         {
    //             structure.splice(index, 1);
    //             if(strData!="")
    //             {
    //                 return '/img/besgam-icons/sport-icons/sport-icons-register/icon-'+$filter('replaceName')(strData)+'-off.svg';
    //             }
    //             else{
    //                  return 1;  
    //              }
    //         }
               
    //         //console.log(structure);   
    //     };

    //     /*Seleccion de deportes */
    //     $scope.isSportSelected = function(nSelection)
    //     {
            
    //         return $scope.selected_sport == nSelection;
    //     };

    //     $scope.setSportSelected = function(nSelection)
    //     {
    //         /*$scope.selected_sport = nSelection;
    //         $scope.selected_filter = 1;
    //         $scope.selected_market = 1;*/
    //         $scope.selected_sport = nSelection;
    //         $scope.selected_filter = 1;
    //         $scope.selected_market = 1;
    //     };

    //     /* Seleccion de filtros */
    //     $scope.isFilterSelected = function(nFilter,nSport)
    //     {
    //         return $scope.selected_sport == nSport && $scope.selected_filter == nFilter;
    //     };

    //     $scope.setFilterSelected = function(nFilter,nSport)
    //     {
    //          $scope.selected_sport = nSport;
    //          $scope.selected_filter = nFilter;
    //     };

    //     /* Indicar si el mercado esta seleccionado */
    //     $scope.isMarketSelected = function(nFilter,nSport)
    //     {
            
    //         return $scope.selected_sport == nSport && $scope.selected_filter == nFilter;
    //     };
        
    //     /* Actualizar el array de deportes */
    //     $scope.updateFavorites = function(nMarket)
    //     {
    //         //console.log($scope.user_favorites);

    //         var index = $scope.user_favorites.indexOf(nMarket);

    //         if(index === -1)
    //             $scope.user_favorites.push(nMarket); 
    //         else
    //             $scope.user_favorites.splice(index, 1); 

    //         //console.log($scope.user_favorites);
    //     };


    //     /* Envio de los 3 posibles formularios */
    //     $scope.submit = function(form) 
    //     {
    //         switch (form.$name)
    //         {
    //             case 'editForm':

    //                 /* Se envian los datos para actualizar al usuario */
    //                 var change_pass = 1;
    //                 var reload = 0;

    //                 form.editCaptcha.$setValidity('recaptcha', true);
    //                 form.str_pass_two.$setValidity('equal', true);
    //                 form.str_pass_two.$setValidity('unexpected', true);

    //                 /* Comprobar si se ha modificado la password*/
    //                 /*if($scope.str_pass == this.str_pass)
    //                     change_pass = 0;*/
    //                 if(this.str_pass=="" && this.str_pass_two=="")
    //                     change_pass = 0;

    //                  Comprobar si se ha modificado el nombre o correo para recargar o no la pagina 
    //                 if($scope.str_name != this.str_name || $scope.str_email != this.str_email)
    //                     reload = 1;

    //                 /* Validar captcha e igualdad de passwords */
    //                 if( !$scope.response || form.$error.recaptcha )
    //                     form.editCaptcha.$setValidity('recaptcha', false);
                    
    //                 if( this.str_pass != this.str_pass_two )
    //                     form.str_pass_two.$setValidity('equal', false);

    //                 $scope.$broadcast('validate-form', form.$name );

    //                 if( form.$invalid )
    //                     return false;

    //                 var params = {
    //                     method: "POST",
    //                     url: "php/dashboard/updateUser.php",
    //                     data: "iduser="+this.iduser+"&str_name="+this.str_name+"&str_email="+this.str_email+"&str_pass="+this.str_pass+
    //                              "&robinson="+this.robinson+"&newsletter="+this.newsletter+"&change="+change_pass+"&resp="+$scope.response
                                 
    //                 };
                                   
    //                 $http( params )
    //                 .success(function(data, status, headers, params)
    //                 {
    //                     /* Si nos devuelve un error */
    //                     if( data.error )
    //                     {
    //                         /* Dependiendo de la respuesta damos el error */
    //                         switch(data.type) 
    //                         {
    //                             case 'EMPTY_ERROR':
    //                                 form.name.$setValidity("unexpected", false);
    //                                 break;
    //                             case 'CAPTCHA_KO': // La respuesta del Captcha no es correcta.
    //                                 form.editCaptcha.$setValidity('recaptcha', false);
    //                                 break;
    //                             default: // Error por defecto
    //                                 form.str_pass_two.$setValidity('unexpected', false);
    //                         }    
    //                     }
    //                     else
    //                     {
    //                         $translate('dashboard.header.count').then(function (translation) // "Evento no disponible en "+feed; 
    //                         {
    //                             $sessionStorage.nameuser = !(data.str_name) ? translation : data.str_name.substr(0,6)+"...";
    //                             $sessionStorage.$save();
    //                             $scope.$storage =  $sessionStorage;
    //                         });

    //                         $scope.update_user = true;
    //                     }

    //                     $scope.response = null;
    //                     vcRecaptchaService.reload(0);

    //                     $scope.$broadcast('validate-form', form.$name );                               
    //                 })
    //                 .error(function(data, status, headers, config)
    //                 {
    //                     $scope.response = null;
    //                     vcRecaptchaService.reload(0);
    //                     form.name.$setValidity("unexpected", false);
    //                     $scope.$broadcast('validate-form', form.$name );    
    //                 });

    //             break;

    //             case 'settingsForm':

    //                 /* Enviamos los datos para actualizar las casas y deportes del usuario */

    //                 /* Creamos la lista de deportes textuales */
    //                 var str_others = "";

    //                 angular.forEach(this.user_others, function(value, key) {
    //                     if(str_others=="")
    //                         str_others = str_others + value.text ;
    //                     else
    //                         str_others = str_others + "," +value.text;
    //                 });     

    //                 var params = {
    //                     method: "POST",
    //                     url: "php/dashboard/updateUserSettings.php",
    //                     data:"iduser="+this.iduser+"&user_sports="+$scope.user_sports+"&user_feeds="+ $scope.user_feeds 
    //                             + "&user_others="+ str_others 
    //                 };

    //                 $http( params )
    //                 .success(function(data, status, headers, params)
    //                 {
    //                     /* Activamos la visualizacion de mensajes de respuesta segun el resultado de la llamada */
    //                     if( data.msg == "KAO")
    //                         $scope.error_update_settings = true; 
    //                     else
    //                     {
    //                          $scope.error_update_settings = false;
    //                          $sessionStorage.a_sports = "[" + $scope.user_sports + "]";
    //                          $sessionStorage.$save();
    //                     }
                           
    //                     $scope.update_settings = true;
                      
    //                 }).error(function(data, status, headers, config)
    //                 {
    //                     $scope.error_update_settings = true;
    //                     $scope.update_settings = true;
    //                 });       
                
    //                 break;

    //             case 'favoritesForm':

    //                 /* Enviamos los datos para actualizar los favoritos */

    //                 var params = {
    //                     method: "POST",
    //                     url: "php/dashboard/updateUserFavorites.php",
    //                     data: "iduser="+this.iduser+"&user_markets="+$scope.user_favorites
    //                 };

    //                 $http( params )
    //                 .success(function(data, status, headers, params)
    //                 {
    //                     /* Activamos la visualizacion de los mensajes de respuesta segun se hayan podido o no
    //                     actualizar los favoritos */

    //                     if( data.msg == "KAO" )
    //                        $scope.error_update_favorites = true;
    //                     else
    //                     {
    //                         $scope.error_update_favorites = false;

    //                         $sessionStorage.favorites = $scope.user_favorites;
    //                         $sessionStorage.$save();
    //                     }
                           

    //                     $scope.update_favorites = true;
                      
    //                 }).error(function(data, status, headers, config)
    //                 {
    //                     $scope.error_update_favorites = true;
    //                     $scope.update_favorites = true;
    //                 });       
    //                 break;

    //             case 'deleteForm':

    //                 form.deleteCaptcha.$setValidity('recaptcha', true);

    //                 /* Validar captcha */
    //                 if( !$scope.response || form.$error.recaptcha )
    //                     form.deleteCaptcha.$setValidity('recaptcha', false);

    //                 $scope.$broadcast('validate-form', form.$name );

    //                 if( form.$invalid )
    //                     return false;


    //                 /*Enviamos los datos para borrar el usuario */
    //                 var params = {
    //                     method: "POST",
    //                     url: "php/dashboard/deleteUser.php",
    //                     data: "iduser="+this.iduser+"&resp="+$scope.response
    //                 };

    //                 $http( params )
    //                 .success(function(data, status, headers, params)
    //                 {
    //                     /* Activamos la visualizacion de los mensajes de respuesta segun se haya podido o no dar de baja */

    //                     if( data.msg == "KAO-BBDD" )
    //                        $scope.error_delete = true;
    //                     else if(data.msg == "KAO-CAPTCHA")
    //                        form.deleteCaptcha.$setValidity('recaptcha', false);
    //                     else
    //                     {
    //                         /* Borrar la sesion del navegador */
    //                         $sessionStorage.favorites = null;
    //                         $sessionStorage.iduser = null;
    //                         $sessionStorage.nameuser = null;
    //                         $sessionStorage.str_name = null;
    //                         $sessionStorage.str_email = null;
    //                         $sessionStorage.a_sports = null;
    //                         $sessionStorage.sessionid = null;
    //                         $sessionStorage.other_sport = null;
    //                         $sessionStorage.expired = 0;
    //                         $sessionStorage.$save();
    //                         $sessionStorage.$reset();

    //                         $location.path('deleteUser').replace();
    //                     }
    //                     $scope.response = null;
    //                     vcRecaptchaService.reload(1);

    //                     $scope.$broadcast('validate-form', form.$name );    
                                              
    //                 }).error(function(data, status, headers, config)
    //                 {
    //                     $scope.delete_user= true;
    //                     $scope.error_delete = true;
    //                     $scope.response = null;
    //                     vcRecaptchaService.reload(1);
                        
    //                 });  

    //                 break;
    //         }                     
    //     }; 
    // })

    // .controller("userPromotions", function( $scope, $http, $location, dataFactory, $sessionStorage, $translate, timeOut)
    // {

    //     /* Controlar que se esta en sesion */
    //     var session = timeOut.timeOut();

    //     $scope.dataPromo = [];
    //     $scope.textInfo ="Cargando datos...";
    //     $scope.$storage = $sessionStorage;
        
    //     var confPromo = {
    //         /* Datos de las promociones */
    //             method: 'GET',
    //             url: 'json/dataPromo.json',
    //             params: {'_':new Date().getTime()}, 
    //             headers: {
    //                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         };
           
        
    //     /* Se hace la llamada para obtener la info  de las casas y de las promos*/
    //     dataFactory.getDataFeed().then( function(response)
    //     {
    //         /* Datos de las casas */
    //         $scope.feed = response.data;

    //         $http(confPromo).
    //         success(function(data, status, headers, config) 
    //         {
    //             /* Guardar las promos */

    //             $scope.dataPromo = data;

    //             /* Expirar las promociones desde el cliente */
    //             var today = new Date();

    //             angular.forEach($scope.dataPromo, function(value, key) {
    //                 if(new Date(value.date_end) < today)
    //                 {
    //                         value.is_expired = 1;
    //                 } 
    //             });


    //              Paginacion 
    //             $scope.totalData = ($scope.dataPromo.length-10);
    //             $scope.currentPage = 1;
    //             $scope.numPerPage = 10;
    //             $scope.maxSize = 5;

    //             $scope.setPage = function (pageNo) 
    //             {
    //                 window.scrollTo(0,0);
    //                 $scope.currentPage = pageNo;
    //             };
                
    //             $scope.setPage($scope.currentPage);
    //             $translate('promotions.noPromo').then(function (translation) //"Actualmente no tenemos promociones disponibles.";
    //             {
    //                 $scope.textInfo = translation;
    //             });

    //         }).
    //         error(function(data, status, headers, config) 
    //         {
                                                
    //         });
     
    //     });

       

    //     /* Cambiar los estilos d elas promo segun su tipo */
    //     $scope.changeClassGround = function(is_important,is_registered, is_expired)
    //     {
    //         if(is_important==1)
    //             return 'user-promo-dest';
    //         else
    //             if(is_registered=='1' && is_expired==0)
    //                 return 'user-promo-favorite';
    //             else
    //                 return 'user-promo';
    //     }

    //     $scope.changeClassPromo = function(is_important)
    //     {
    //         if(is_important==1)
    //             return 'imagen-casa';
    //         else if(is_important==0)
    //             return 'user-imagen-casa-promo';

    //     }
    // })

    // .controller('userAcademy', function( $scope, $http, $location, $sessionStorage, timeOut) 
    // {
    //     /* Controlar que se esta en sesion */
    //     var session = timeOut.timeOut();

    //     $scope.data = [];
    //     $scope.$storage = $sessionStorage;
        
         
    //     /* Obtenemos los post de worpress */
    //     var confWordpress = {
    //             method: 'POST',
    //             url: 'php/dashboard/getBlogPost.php',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //             }
    //         };


    //     $http(confWordpress).
    //         success(function(data, status, headers, config) 
    //         {
    //             /* Se guardan los datos */
    //             $scope.data = data;

    //             /* Paginacion */
    //             $scope.totalData = ($scope.data.length-9);
    //             $scope.currentPage = 1;
    //             $scope.numPerPage = 9;
    //             $scope.maxSize = 5;

    //             $scope.setPage = function (pageNo) 
    //             {
    //                 window.scrollTo(0,0);  
    //                 $scope.currentPage = pageNo;
    //             };
                
    //             $scope.setPage($scope.currentPage);
                
    //         }).
    //         error(function(data, status, headers, config) 
    //         {
                        
    //         });
    // })
    // .controller('nivelesCtrl', function($scope, $window, dataFactory) 
    // {
    //     /* Instanciamos variables */
    //     $scope.dataJson = [];
    //     $scope.limit = 3;
    //     $scope.maxLimit = 8;
    //     $scope.eventBlock = [];
    //     $scope.eventData = [];
    //     $scope.betSlip = [];
    //     $scope.totalCombined = [];
    //     $scope.msgActive = false;
    //     $scope.sportSelect = 0;

    //     $scope.items = [{
    //         name  : 'RangeTime',
    //         value : 3
    //     },
    //     {
    //         name  : 'RangeOddLow',
    //         value : 4
    //     },
    //     {
    //         name  : 'rangeOddHigh',
    //         value : 11
    //     }];

    //     $scope.rangeTime = [
    //         { diff: 3600,       range: 1, srange: "hora" },
    //         { diff: 3600*6,     range: 6, srange: "horas" },
    //         { diff: 3600*24,    range: 24, srange: "horas" },
    //         { diff: 3600*48,    range: 48, srange: "horas" },
    //         { diff: 3600*72,    range: 72, srange: "horas" },
    //         { diff: 3600*24*7,  range: 7, srange: "días" }
    //     ];

    //     $scope.rangeOdd = [
    //         { odd: 1.2 },
    //         { odd: 1.4 },
    //         { odd: 1.6 },
    //         { odd: 1.8 },
    //         { odd: 2.0 },
    //         { odd: 2.2 },
    //         { odd: 2.5 },
    //         { odd: 3.0 },
    //         { odd: 3.5 },
    //         { odd: 4.0 },
    //         { odd: 4.5 },
    //         { odd: 5.0 },
    //         { odd: 6.0 },
    //         { odd: 7.0 },
    //         { odd: 8.0 },
    //         { odd: 9.0 },
    //         { odd: 10.0 }
    //     ];

    //     /* Cargamos los datos de las feed */
    //     dataFactory.getDataFeed().then( function(response)
    //     {
    //         $scope.feed = response.data;
        
    //         /* Cargamos las apuestas */
    //         dataFactory.getDataJson().then( function(response)
    //         {
    //             $scope.dataJson = response.data;

    //             $scope.sports = $scope.dataJson.reduce(function(sum, place) 
    //             {
    //                 if( sum.indexOf( place.sport ) < 0 ) sum.push(place.sport);

    //                 return sum;
    //             }, []);

    //             $scope.getData = function()
    //             {
    //                 $scope.list = $scope.dataJson.reduce(function(sum, place) 
    //                 {
    //                     if( !place.markets || ($scope.sportSelect != 0 && $scope.sportSelect != place.sport ) ) return sum;

    //                     if( fInTime( place.time, $scope.rangeTime[$scope.items[0].value].diff ) )
    //                     {
    //                         var addBet = [],
    //                             objAux = {};

    //                         if( place.markets.str_bet[1][0].n_odd >=  $scope.rangeOdd[$scope.items[1].value].odd && 
    //                             place.markets.str_bet[1][0].n_odd <= $scope.rangeOdd[$scope.items[2].value].odd )
    //                         {
    //                             addBet.push({
    //                                 betName: '1',
    //                                 bet: place.markets.str_bet[1]
    //                             });
    //                         }
    //                        if( place.markets.str_bet[2][0].n_odd >= $scope.rangeOdd[$scope.items[1].value].odd && 
    //                             place.markets.str_bet[2][0].n_odd <= $scope.rangeOdd[$scope.items[2].value].odd )
    //                         {
    //                             addBet.push({
    //                                 betName: '2',
    //                                 bet: place.markets.str_bet[2]
    //                             });
    //                         }
    //                         if( place.markets.str_bet['X'] && 
    //                             place.markets.str_bet['X'][0].n_odd >= $scope.rangeOdd[$scope.items[1].value].odd && 
    //                             place.markets.str_bet['X'][0].n_odd <= $scope.rangeOdd[$scope.items[2].value].odd )
    //                         {
    //                             addBet.push({
    //                                 betName: 'X',
    //                                 bet: place.markets.str_bet['X']
    //                             });
    //                         }

    //                         if( addBet.length > 0 )
    //                         {
    //                             objAux = {
    //                                 sport: place.sport,
    //                                 sportID: place.sportID,
    //                                 leagueID: place.leagueID,
    //                                 league: place.league,
    //                                 id: place.id,
    //                                 eventN: place.event,
    //                                 market: place.markets.str_market_short,
    //                                 is_available: 1
    //                             };

    //                             shuffleArray(addBet);
    //                             objAux.betName = addBet[0].betName;
    //                             objAux.bet = addBet[0].bet;
    //                             objAux.focus_bet = {
    //                                 id_feed: addBet[0].bet[0].id_feed,
    //                                 n_odd: addBet[0].bet[0].n_odd,
    //                                 id_bet: addBet[0].bet[0].id_bet
    //                             }

    //                             sum.push( objAux );
    //                         }
    //                     }
    //                     return sum;
    //                 }, []);

    //                 shuffleArray($scope.list);

    //                 $scope.list.sort( function( a, b)
    //                 {
    //                     if( a["bet"].length > b["bet"].length ) return -1;
    //                     if( a["bet"].length < b["bet"].length ) return 1;
    //                     return 0;
    //                 });

    //                 if( $scope.list.length >= $scope.limit )
    //                 {

    //                     for( var nCont = 0, len = $scope.limit;
    //                          nCont < len;
    //                          nCont++ )
    //                     {
    //                         if( !$scope.eventBlock[ nCont ] )
    //                         {
    //                             $scope.eventData[ nCont ] = $scope.list[ nCont ];
    //                         }
    //                     }

    //                     $scope.betSlip = [];
    //                     for( var nCont = 0, len = $scope.eventData.length;
    //                          nCont < len;
    //                          nCont++ )
    //                     {
    //                         $scope.addBetSlip( $scope.eventData[nCont].bet );
    //                     }

    //                     return $scope.eventData;
    //                 }
    //                 else
    //                     $scope.msgActive = true;
    //             }

    //             $scope.getData();
    //         });

    //         $scope.addEvent = function()
    //         {
    //             if( $scope.list[ $scope.limit ] && $scope.limit < $scope.maxLimit )
    //             {
    //                 $scope.eventData.push( $scope.list[ $scope.limit ] );
    //                 $scope.addBetSlip( $scope.list[ $scope.limit ].bet );
    //                 $scope.limit++;
    //             }
    //             else
    //                 $scope.msgActive = true;
    //         }

    //         $scope.delEvent = function( id )
    //         {
    //             $scope.delBetSlip( $scope.eventData[id].bet );
    //             $scope.eventData.splice(id, 1);
    //             $scope.eventBlock.splice(id, 1);
    //             $scope.list.splice(id, 1);
    //             $scope.limit--; 
    //         };

    //         var fInTime = function( strTime, rangeTime )
    //         {
    //             if( !strTime ) return;  // Control para evitar vacios
    //             var targetTime = new Date( strTime ),
    //                 offsetTime = new Date(targetTime.getTime() + (targetTime.getTimezoneOffset() * 60 * 1000) * -1 ),
    //                 today      = new Date(),
    //                 diffTime   = new Date(today.getTime() + (rangeTime * 1000) );


    //             return (offsetTime > today && offsetTime < diffTime ) ? 1 : 0;
    //         };

    //         var shuffleArray = function(array) 
    //         {
    //             var m = array.length, t, i;

    //             while (m) 
    //             {
    //                 i = Math.floor(Math.random() * m--);

    //                 t = array[m];
    //                 array[m] = array[i];
    //                 array[i] = t;
    //             }

    //             return array;
    //         };

    //         $scope.totalCombinedData = function( odd, feed )
    //         {
    //             var total = 0,
    //                 exit = false;

    //             if( angular.isUndefined( feed ) && angular.isUndefined( odd ) )
    //             {
    //                 angular.forEach($scope.betSlip, function(value, key) 
    //                 {
    //                     if( value.n_odd > total )
    //                     {
    //                         total = value.n_odd;
    //                         $scope.totalCombined = {
    //                             "value": value.n_odd,
    //                             "feed": value.id_feed
    //                         };
    //                     }
    //                 });
    //             }
    //             else
    //             {
    //                 $scope.totalCombined = {
    //                     "value": odd,
    //                     "feed": feed
    //                 };
    //             }

    //             /* Modificamos el foco */
    //             angular.forEach($scope.eventData, function(value, key) 
    //             {
    //                 for( var nCont = 0, len = value.bet.length;
    //                      nCont < len && !exit; nCont++ )
    //                 {
    //                     if( value.bet[nCont].id_feed == $scope.totalCombined.feed )
    //                     {
    //                         value.focus_bet.id_feed = value.bet[nCont].id_feed;
    //                         value.focus_bet.n_odd   = value.bet[nCont].n_odd;
    //                         value.focus_bet.id_bet  = value.bet[nCont].id_bet;
    //                         value.is_available = 1;
    //                         exit = true;
    //                     }
    //                 }

    //                 /* No existe la apuesta para la casa seleccionada */
    //                 if( !exit ) value.is_available = 0;

    //                 /* Volvemos a iniciar la salida */
    //                 exit = false;
    //             });


    //         };

    //         $scope.addBetSlip = function( bets )
    //         {
    //             var obj = {},           // Obj para insertar en nuestro boleto
    //                 fSearch = false;    // Comprobar si ya tenemos ese feed

    //             angular.forEach(bets, function(bet, bKey) 
    //             {
    //                 angular.forEach( $scope.betSlip, function( value, key )
    //                 {
    //                     if( bet.id_feed == value.id_feed )
    //                     {
    //                         value.n_odd = value.n_odd * bet.n_odd;
    //                         fSearch = true;
    //                     }
    //                 });

    //                 /* Si no lo encontramos lo insertamos */
    //                 if( !fSearch )
    //                     $scope.betSlip.push({
    //                         "id_feed": bet.id_feed,
    //                         "n_odd": bet.n_odd
    //                     });

    //                 fSearch = false;
    //             });

    //             $scope.totalCombinedData();
    //         };

    //         $scope.delBetSlip = function( bets )
    //         {
    //             angular.forEach(bets, function(bet, bKey) 
    //             {
    //                 angular.forEach( $scope.betSlip, function( value, key )
    //                 {
    //                     if( bet.id_feed == value.id_feed )
    //                     {
    //                         value.n_odd = value.n_odd / bet.n_odd;

    //                         if( value.n_odd <= 1 )
    //                             $scope.betSlip.splice(key, 1);
    //                     }
    //                 });
    //             });

    //             $scope.totalCombinedData();
    //         };

    //         $scope.locationTo = function( str_league, str_event, id_event, id_sport )
    //         {
    //             str_league = str_league.replace(/\//g,"-");
    //             str_league = str_league.replace(/ /g,"-");
    //             str_event = str_event.replace(/\//g,"-");

    //             window.open( './#!apuestas/' + angular.lowercase(str_league) + '/' + angular.lowercase(str_event) + '/' + id_event + '/' + id_sport + '/', '_blank');
    //         };

    //         $scope.submit = function(form)
    //         {
    //             var id_feed = this.id_feed,
    //                 id_league = this.id_league,
    //                 id_event = this.id_event,
    //                 id_bet = [];

    //             for( var nCont = 0, len = $scope.eventData.length;
    //                  nCont < len;
    //                  nCont++ )
    //             {
    //                 id_bet.push( $scope.eventData[nCont].focus_bet.id_bet );
    //             }

    //             url = "./#!redirect/" +
    //                 id_feed + "/" +
    //                 id_league + "/" +
    //                 id_event + "/" +
    //                 id_bet.join() + "/" +
    //                 "0/";

    //             $window.open( url, '_blank' );
    //         };
    //     });
    // })
;