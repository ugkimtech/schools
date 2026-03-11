from django.db import models
from school.models import SchoolProfile
from student.models import StudentProfile
#from staff.models import Staff


class Term(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    term_name = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    year = models.CharField(max_length=10)
    is_promotional = models.BooleanField()


class Subject(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=50)
    meta_data = models.JSONField(default=dict, null=True)
    
    
class Exam(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    exam_name = models.CharField(max_length=50)
    max_marks = models.DecimalField(max_digits=5, decimal_places=2)


class Results(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    term = models.ForeignKey(Term, on_delete=models.SET_NULL, null=True)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    marks = models.DecimalField(max_digits=5, decimal_places=2)
    remarks = models.TextField(blank=True, null=True)
    teacher = models.ForeignKey('staff.Staff', on_delete=models.SET_NULL, null=True)


class GradingScale(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    min_mark = models.DecimalField(max_digits=5, decimal_places=2)
    max_mark = models.DecimalField(max_digits=5, decimal_places=2)
    remarks = models.CharField(max_length=100)