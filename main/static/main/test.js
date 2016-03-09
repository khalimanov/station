$(function () {
    var x = [];
    var hum = [];
    var temp = [];
	// $.ajax({
 //        url: 'http://127.0.0.1:8000/weather/results_month_json/1/',             // указываем URL и
 //        dataType : "json",                     // тип загружаемых данных
 //        success: function (data, textStatus) { // вешаем свой обработчик на функцию success
 //            $.each(data, function(i, val) {    // обрабатываем полученные данные
 //                x.push(val.date);
 //                hum.push(val.hum);
 //                temp.push(val.temp);
 //            });
 //        } 
 //    });
    $.getJSON('/weather/results_month_json/1/', function (data) {
        data.forEach(function(item, i, arr) {
                x.push(new Date(Date.parse(item.date)));
                hum.push(item.hum);
                temp.push(item.temp);
        });
        $('#container').highcharts({
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Температура и влажность'
            },
            subtitle: {
                text: 'Зал'
            },
            xAxis: [{
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    day: '%A, %b %e',
                    month: '%e. %b',
                    year: '%b'
                },
                //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                //    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                categories: x,
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
                    text: 'Temperature',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Rainfall',
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
                shared: true
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
            series: [{
                name: 'Humidity',
                type: 'column',
                yAxis: 1,
                //data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                data: hum,
                tooltip: {
                    valueSuffix: ' mm'
                }

            }, {
                name: 'Temperature',
                type: 'spline',
                // data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                data: temp,
                tooltip: {
                    valueSuffix: '°C'
                }
            }]
        });
    });
});