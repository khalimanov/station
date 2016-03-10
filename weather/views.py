# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from .models import Sensor, Values
import datetime
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt # Чтобы работал тест запросов


def index(request):
    sensor_list = Sensor.objects.all()
    context = {'sensor_list': sensor_list}
    return render(request, 'weather/index.html', context)


def results(request):
    values_list = Values.objects.reverse()[:20:-1]
    context = {'values_list': values_list}
    return render(request, 'weather/results.html', context)


def month_results(request, sensor_id):
    date_month = datetime.datetime.now() - datetime.timedelta(days=30)
    values_list = Values.objects.filter(date__gte=date_month).filter(sensor=Sensor.objects.filter(sensor_id_const=sensor_id))
    context = {'values_list': values_list}
    return render(request, 'weather/results.html', context)


def month_results_json(request, sensor_id):
    date_month = datetime.datetime.now() - datetime.timedelta(days=30)
    values_list = Values.objects.filter(date__gte=date_month).filter(sensor=Sensor.objects.filter(sensor_id_const=sensor_id))
    dictionaries = [obj.as_dict() for obj in values_list]
    return JsonResponse(dictionaries, safe=False)

def day_results_json(request, sensor_id):
    date_month = datetime.datetime.now() - datetime.timedelta(days=1)
    values_list = Values.objects.filter(date__gte=date_month).filter(sensor=Sensor.objects.filter(sensor_id_const=sensor_id))
    dictionaries = [obj.as_dict() for obj in values_list]
    return JsonResponse(dictionaries, safe=False)


@csrf_exempt
def addvalue(request):
    if request.method != 'POST':
        return HttpResponse('request need to be POST')
    sensor_id = request.POST.get("sensor_id", 0)
    temp = request.POST.get('temp', 0)
    hum = request.POST.get('hum', 0)
    params = str(sensor_id) + " " + str(temp) + " " + str(hum)
    if sensor_id == 0 or hum == 0:
        return HttpResponse('Bad info: ' + params)
    sensor = Sensor.objects.get(sensor_id_const=sensor_id)
    new_value = Values()
    new_value.sensor = sensor
    new_value.temp = temp
    new_value.hum = hum
    new_value.date = timezone.now()
    new_value.save()
    return HttpResponse('200 ok ' + str(new_value.date))
