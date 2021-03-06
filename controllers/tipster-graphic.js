besgamApp
    .controller('tipsterGraphic', function( $scope )
    {
        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 450,
                //width: 400,
                donut: true,
                x: function(d)
                {
                    return d.key;
                },
                y: function(d)
                {
                    return d.y;
                },
                showLabels: true,

                pie: 
                {
                    startAngle: function(d) 
                    { 
                        return d.startAngle/2 -Math.PI/2 
                    },
                    endAngle: function(d) 
                    { 
                        return d.endAngle/2 -Math.PI/2 
                    }
                },
                duration: 500,
                color: ['#179ab5','#6bbbbc'],
                showLegend: false,
            }
            
        };

        $scope.data = [
            {
                key: "Acumulado",
                y: 5
            },
            {
                key: "Falta",
                y: 2
            }
        ];

        $scope.Rssoptions = {
            chart: {
                type: 'pieChart',
                height: 450,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                showLegend: false,
                color: ['#e59c46','#09789d','#ff6364','#32bca7']
            }
        };

        $scope.Rssdata = [
            {
                key: "Facebook",
                y: 2
            },
            {
                key: "Twitter",
                y: 2
            },
            {
                key: "Besgam",
                y: 9
            },
            {
                key: "Seguidores",
                y: 7
            }
        ];
        $scope.earnOptions = {
            chart: {
                type: 'cumulativeLineChart',
                height: 250,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 65
                },
                x: function(d){ return d[0]; },
                y: function(d){ return d[1]/100; },
                average: function(d) { return d.mean/100; },

                color: d3.scale.category10().range(),
                duration: 300,
                useInteractiveGuideline: true,
                clipVoronoi: false,

                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        return d3.time.format('%m/%d/%y')(new Date(d))
                    },
                    showMaxMin: false,
                    staggerLabels: true
                },

                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format(',.1%')(d);
                    },
                    axisLabelDistance: 20
                },
                showLegend: false,
                showYAxis: false,
                showXAxis: false
            }
    };

    $scope.earndata = [
        {
            key: "Seguidores",
            values: [ 
            [ 1083297600000 , 0] , 
            [ 1085976000000 , 10] , 
            [ 1088568000000 , 30] , 
            [ 1091246400000 , 50] , 
            [ 1093924800000 , 63] , 
            [ 1096516800000 , 64] , 
            [ 1099195200000 , 64] , 
            [ 1101790800000 , 64] , 
            [ 1104469200000 , 64] , 
            [ 1107147600000 , 70] , 
            [ 1109566800000 , 71] , 
            [ 1112245200000 , 72] , 
            [ 1114833600000 , 72] , 
            [ 1117512000000 , 74] , 
            [ 1120104000000 , 75] , 
            [ 1122782400000 , 78] , 
            [ 1125460800000 , 78] , 
            [ 1128052800000 , 90] , 
            [ 1130734800000 , 91] , 
            [ 1133326800000 , 95] , 
            [ 1136005200000 , 97] , 
            [ 1138683600000 , 127] , 
            [ 1141102800000 , 128] , 
            [ 1143781200000 , 130] , 
            [ 1146369600000 , 140] , 
            [ 1149048000000 , 156] , 
            [ 1151640000000 , 179] , 
            [ 1154318400000 , 190] , 
            [ 1156996800000 , 210] , 
            ],
            mean: 250
        },
        {
            key: "Facebook",
            values: [ 
            [ 1083297600000 , 0] , 
            [ 1085976000000 , 1] , 
            [ 1088568000000 , 3] , 
            [ 1091246400000 , 5] , 
            [ 1093924800000 , 10] , 
            [ 1096516800000 , 20] , 
            [ 1099195200000 , 21] , 
            [ 1101790800000 , 40] , 
            [ 1104469200000 , 50] , 
            [ 1107147600000 , 50] , 
            [ 1109566800000 , 53] , 
            [ 1112245200000 , 59] , 
            [ 1114833600000 , 63] , 
            [ 1117512000000 , 64] , 
            [ 1120104000000 , 66] , 
            [ 1122782400000 , 73] , 
            [ 1125460800000 , 71] , 
            [ 1128052800000 , 71] , 
            [ 1130734800000 , 77] , 
            [ 1133326800000 , 95] , 
            [ 1136005200000 , 107] , 
            [ 1138683600000 , 127] , 
            [ 1141102800000 , 122] , 
            [ 1143781200000 , 126] , 
            [ 1146369600000 , 132] , 
            [ 1149048000000 , 133] , 
            [ 1151640000000 , 133] , 
            [ 1154318400000 , 133] , 
            [ 1156996800000 , 133] , 
            ],
            mean: 133
        },


        {
            key: "Twitter",
            mean: 363,
            values: [ 
            [ 1083297600000 , 0] , 
            [ 1085976000000 , 85] , 
            [ 1088568000000 , 86] , 
            [ 1091246400000 , 86] , 
            [ 1093924800000 , 86] , 
            [ 1096516800000 , 86] , 
            [ 1099195200000 , 99] , 
            [ 1101790800000 , 99] , 
            [ 1104469200000 , 99] , 
            [ 1107147600000 , 99] , 
            [ 1109566800000 , 122] , 
            [ 1112245200000 , 122] , 
            [ 1114833600000 , 123] , 
            [ 1117512000000 , 125] , 
            [ 1120104000000 , 130] , 
            [ 1122782400000 , 130] , 
            [ 1125460800000 , 130] , 
            [ 1128052800000 , 130] , 
            [ 1130734800000 , 142] , 
            [ 1133326800000 , 143] , 
            [ 1136005200000 , 143] , 
            [ 1138683600000 , 243] , 
            [ 1141102800000 , 243] , 
            [ 1143781200000 , 245] , 
            [ 1146369600000 , 245] , 
            [ 1149048000000 , 245] , 
            [ 1151640000000 , 246] , 
            [ 1154318400000 , 350] , 
            [ 1156996800000 , 363] , 
            ]
        },
        {
            key: "Besgam",
            values: [ 
            [ 1083297600000 , 60] , 
            [ 1085976000000 , 65] , 
            [ 1088568000000 , 65] , 
            [ 1091246400000 , 65] , 
            [ 1093924800000 , 66] , 
            [ 1096516800000 , 67] , 
            [ 1099195200000 , 68] , 
            [ 1101790800000 , 68] , 
            [ 1104469200000 , 68] , 
            [ 1107147600000 , 68] , 
            [ 1109566800000 , 72] , 
            [ 1112245200000 , 89] , 
            [ 1114833600000 , 89] , 
            [ 1117512000000 , 89] , 
            [ 1120104000000 , 89] , 
            [ 1122782400000 , 89] , 
            [ 1125460800000 , 92] , 
            [ 1128052800000 , 92] , 
            [ 1130734800000 , 95] , 
            [ 1133326800000 , 96] , 
            [ 1136005200000 , 97] , 
            [ 1138683600000 , 105] , 
            [ 1141102800000 , 125] , 
            [ 1143781200000 , 125] , 
            [ 1146369600000 , 125] , 
            [ 1149048000000 , 139] , 
            [ 1151640000000 , 147] , 
            [ 1154318400000 , 148] , 
            [ 1156996800000 , 180] , 
            ],
             mean: 180
        }
    ];
});