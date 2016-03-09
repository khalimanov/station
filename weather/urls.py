from django.conf.urls import url
from . import views


urlpatterns = [
    # ex: /weather/ список датчиков
    url(r'^$', views.index, name='index'),
    
    # ex: /weather/1/ возврат значения температуры не работает
    #url(r'^(?P<sensor_id>[0-9]+)/$', views.sensorname, name='sensorname'),
    
    # ex: /weather/results/ значения температуры не работает
    url(r'^results/$', views.results, name='results'),
    
	# ex: /weather/results_month/ значения температуры не работает
    url(r'^results_month/(?P<sensor_id>[0-9]+)/$', views.month_results, name='month_results'),

    # ex: /weather/results_month_json/ значения температуры не работает
    url(r'^results_month_json/(?P<sensor_id>[0-9]+)/$', views.month_results_json, name='month_results_json'),

    # ex: /weather/addvalue/ добавление значения
    url(r'^addvalue/$', views.addvalue, name='addvalue'),
]
