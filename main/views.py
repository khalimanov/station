# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from weather.models import Sensor, Values


def index(request):
    values_list = Values.objects.reverse()[:5:-1]
    context = {'values_list':values_list}
    return render(request, 'main/index.html',context)