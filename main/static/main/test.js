$(function () {
    var x = [];
    var hum = [];
    var temp = [];

    $.getJSON('/weather/results_day_json/1/', function (data) {
        data.forEach(function(item, i, arr) {
                var date = Date.parse(item.date);
                // var dateStr = "Date.UTC(" + item.date.substring(0,4)+","+item.date.substring(5,7)+","+item.date.substring(8,10)+","+item.date.substring(11,13)+","+item.date.substring(14,16)+")";
                // dateStr = "Date.UTC(" + item.date.substring(0,4)+","+item.date.substring(5,7)+","+item.date.substring(8,10)+")";
                // dateStr = item.date.substring(0,4)+","+item.date.substring(5,7)+","+item.date.substring(8,10);
                // x.push(new Date(Date.parse(item.date)));
                hum.push([date, item.hum]);
                temp.push([date, item.temp]);
        });
        // alert(hum);
        $('#container').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Температура и влажность'
            },
            subtitle: {
                text: 'Зал'
            },
            xAxis: [{
                type: 'datetime',
                // format: '{value: %d %b %H:%M} NNN',
                dateTimeLabelFormats: { // don't display the dummy year
                     minute: '%H:%M',
                     hour: '%H',
                     day: '%A, %b %e',
                    month: '%e. %b',
                    year: '%b'
                },
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}°C',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Температура',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Влажность',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true,
                headerFormat: '<b>{point.x:%d %b %H:%M}</b><br>',
                //pointFormat: '{point.y:.2f} m '
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 100,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                name: 'Влажность',
                type: 'areaspline',
                yAxis: 1,
                data: hum,
                tooltip: {
                    valueSuffix: '%'
                }

            }, {
                name: 'Температура',
                type: 'spline',
                data: temp,
                tooltip: {
                    valueSuffix: '°C'
                }
            }]
        });
    });
});