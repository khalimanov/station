# -*- coding: utf-8 -*-
from django.db import models


class Sensor(models.Model):
    sensor_name = models.CharField(max_length=100)
    sensor_id_const = models.IntegerField()


class Values(models.Model):
    class Meta:
        ordering = ['id']

    sensor = models.ForeignKey(Sensor)
    temp = models.FloatField()
    hum = models.FloatField()
    date = models.DateTimeField(auto_now=True)

    def as_dict(self):
        return {
            "temp": self.temp,
            "hum": self.hum,
            "date": self.date,
            # other stuff
        }
