from django.conf.urls import url
from . import views


urlpatterns = [
    # ex: /weather/ список датчиков
    url(r'^$', views.index, name='index'),
    # ex: /weather/1/ возврат значения температуры не работает
    #url(r'^(?P<sensor_id>[0-9]+)/$', views.sensorname, name='sensorname'),
    # ex: /weather/results/ значения температуры не работает
    url(r'^results/$', views.results, name='results'),
    # ex: /weather/addvalue/ добавление значения
    url(r'^addvalue/$', views.addvalue, name='addvalue'),
]
