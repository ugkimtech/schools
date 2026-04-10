from django.db import models
from school.models import SchoolProfile
from django.contrib.auth import get_user_model
User = get_user_model()


class Department(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    dep_name = models.CharField(max_length=50)
    dep_head = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='head_of_department')