from django.db import models

# Create your models here.

class Spread(models.Model):
    created_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    creator = models.ForeignKey('User')
    name = models.CharField(max_length=255, unique=True)
    updated_time = models.DateTimeField(auto_now=True, auto_now_add=True)
    usage_count = models.PositiveIntegerField(default=1)

    def creator_fb_id(self):
        return self.creator.fb_id

class CardPosition(models.Model):
    left = models.FloatField()
    meaning = models.CharField(max_length=255)
    sn = models.PositiveIntegerField()
    spread = models.ForeignKey('Spread')
    top = models.FloatField()

    def spread_name(self):
        return self.spread.name

class User(models.Model):
    fb_id = models.PositiveIntegerField(unique=True)
