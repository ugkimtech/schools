from django.db import models
from school.models import SchoolProfile


class Department(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    dep_name = models.CharField(max_length=50)
    dep_head = models.ForeignKey("staff.Staff", on_delete=models.SET_NULL, null=True, related_name='head_of_department')