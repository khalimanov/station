from django.db import models


class Sensor(models.Model):
    sensor_name = models.CharField(max_length=100)
    sensor_id_const = models.IntegerField()

class Values(models.Model):
    sensor = models.ForeignKey(Sensor)
    temp = models.FloatField()
    hum = models.FloatField()
    date = models.DateTimeField(auto_now=True)