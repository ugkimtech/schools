from django.db import models
from school.models import SchoolProfile

class Events(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    date = models.DateField()
    event = models.CharField(max_length=100)
    details = models.CharField(max_length=100, null=True)