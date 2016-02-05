# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from .models import Sensor, Values
import time
from django.views.decorators.csrf import csrf_exempt # Чтобы работал тест запросов


def index(request):
    sensor_list = Sensor.objects.all()
    context = {'sensor_list': sensor_list}
    return render(request, 'weather/index.html', context)


@csrf_exempt
def addvalue(request):
    if request.method != 'POST':
        return HttpResponse('request need to be POST')
    sensor_id = request.POST.get("sensor_id", 0)
    temp = request.POST.get('temp', 0)
    hum = request.POST.get('hum', 0)
    if sensor_id == 0 or hum == 0:
        return HttpResponse('Bad info')
    sensor = Sensor.objects.get(sensor_id_const=sensor_id)
    new_value = Values()
    new_value.sensor = sensor
    new_value.temp = temp
    new_value.hum = hum
    new_value.date = round(time.time() - time.timezone)
    new_value.save()
    return HttpResponse('200 OK')
