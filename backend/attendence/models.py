from django.db import models
from school.models import SchoolProfile
from django.contrib.auth import get_user_model
User = get_user_model()
from student.models import StudentProfile
from academics.models import Term


class StudentAttendence(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    session = models.CharField(max_length=100, null=True)
    checkin = models.DateTimeField(auto_now_add=True)
    checkout = models.DateTimeField(auto_now_add=True)
    total_attendence = models.IntegerField()

class StaffAttendence(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
    staff_member = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    session = models.CharField(max_length=100, null=True)
    checkin = models.DateTimeField(auto_now_add=True)
    checkout = models.DateTimeField(auto_now_add=True)
    total_attendence = models.IntegerField()
    

# should
# allow
# session based
# attendence
# recording